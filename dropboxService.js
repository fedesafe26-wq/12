/**
 * Servicio de Integración con Dropbox
 * Sincroniza archivos Excel automáticamente a Dropbox
 */

const { Dropbox } = require('dropbox');
const fs = require('fs');
const path = require('path');
const ExcelJS = require('exceljs');
const PDFDocument = require('pdfkit');

let dropboxClient = null;
let isAuthenticated = false;

/**
 * Inicializar autenticación con Dropbox
 */
async function initializeAuth() {
    try {
        const refreshToken = process.env.DROPBOX_REFRESH_TOKEN;
        const appKey = process.env.DROPBOX_APP_KEY;
        const appSecret = process.env.DROPBOX_APP_SECRET;

        if (!refreshToken) {
            console.log('⚠️  Refresh token de Dropbox no configurado');
            console.log('   Guardando datos solo localmente');
            return false;
        }

        if (!appKey || !appSecret) {
            console.log('⚠️  Faltan DROPBOX_APP_KEY o DROPBOX_APP_SECRET');
            console.log('   Guardando datos solo localmente');
            return false;
        }

        // Crear cliente de Dropbox (OAuth con refresh token)
        dropboxClient = new Dropbox({
            refreshToken,
            clientId: appKey,
            clientSecret: appSecret
        });

        // Verificar que funciona
        const user = await dropboxClient.usersGetCurrentAccount();

        console.log('✓ Autenticación con Dropbox inicializada correctamente');
        console.log(`  - Usuario: ${user.result.name.display_name}`);
        console.log(`  - Email: ${user.result.email}`);

        isAuthenticated = true;
        return true;
    } catch (error) {
        console.error('Error al inicializar autenticación Dropbox:', error.message);
        console.log('💾 Cambiar a almacenamiento solo local');
        isAuthenticated = false;
        return false;
    }
}

/**
 * Subir archivo Excel a Dropbox con estructura de carpetas por persona
 */
async function uploadExcelToDropbox(filePath, licenseData) {
    try {
        if (!isAuthenticated) return null;

        const folderBasePath = process.env.DROPBOX_FOLDER_PATH || '/Licencias Instituto';
        const personaFolder = `${licenseData.nombre}_${licenseData.apellido}`;
        const fileName = path.basename(filePath);
        
        // Ruta completa en Dropbox: /Licencias Instituto/Nombre_Apellido/Registro_...xlsx
        const dropboxPersonaPath = `${folderBasePath}/${personaFolder}`;
        const dropboxFilePath = `${dropboxPersonaPath}/${fileName}`;

        const fileContent = fs.readFileSync(filePath);

        // Crear o asegurar que existe la carpeta de la persona
        try {
            await dropboxClient.filesCreateFolderV2({
                path: dropboxPersonaPath
            });
            console.log(`✓ Carpeta creada en Dropbox: ${personaFolder}`);
        } catch (error) {
            // Si la carpeta ya existe, continuamos (error 409)
            if (error.status !== 409) {
                throw error;
            }
        }

        // Subir o actualizar archivo en la carpeta de la persona
        // Usar 'autorename: true' para evitar conflictos 409
        const response = await dropboxClient.filesUpload({
            path: dropboxFilePath,
            contents: fileContent,
            mode: { '.tag': 'add' },
            autorename: true
        }).catch(async (error) => {
            // Si el archivo ya existe, actualizarlo
            if (error.status === 409) {
                return await dropboxClient.filesUpload({
                    path: dropboxFilePath,
                    contents: fileContent,
                    mode: { '.tag': 'overwrite' },
                    autorename: true
                });
            }
            throw error;
        });

        console.log(`✓ Archivo subido a Dropbox: ${personaFolder}/${fileName}`);
        console.log(`  Ruta: ${dropboxFilePath}`);
        
        return response.result.id;
    } catch (error) {
        console.error('Error al subir a Dropbox:', error.message);
        return null;
    }
}

/**
 * Generar archivo Excel con estructura completa
 */
async function generateLocalExcel(licenseData, uniqueTimestamp = null) {
    try {
        // Crear carpeta por persona
        const personaFolder = `${licenseData.nombre}_${licenseData.apellido}`;
        const exportsDir = path.join(__dirname, 'exports', personaFolder);

        if (!fs.existsSync(exportsDir)) {
            fs.mkdirSync(exportsDir, { recursive: true });
        }

        // Usar timestamp único proporcionado o generar uno nuevo
        if (!uniqueTimestamp) {
            const now = new Date();
            const timestamp = now.toISOString().replace(/[:.]/g, '-');
            const random = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
            uniqueTimestamp = `${timestamp}_${random}`;
        }
        const fileName = `Registro_${uniqueTimestamp}.xlsx`;
        const filePath = path.join(exportsDir, fileName);

        // Crear workbook
        const workbook = new ExcelJS.Workbook();
        const worksheet = workbook.addWorksheet('Licencia');

        // SECCIÓN 1: DATOS PERSONALES
        // Encabezado de sección
        let row = 1;
        worksheet.mergeCells(`A${row}:B${row}`);
        const headerCell = worksheet.getCell(`A${row}`);
        headerCell.value = 'DATOS PERSONALES';
        headerCell.font = { bold: true, color: { argb: 'FFFFFFFF' }, size: 12 };
        headerCell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FF2C3E50' } };
        headerCell.alignment = { horizontal: 'center', vertical: 'center' };
        row++;

        // Datos personales
        const personalData = [
            ['Nombre', licenseData.nombre],
            ['Apellido', licenseData.apellido],
            ['DNI', licenseData.dni],
            ['Email', licenseData.email],
            ['Celular', licenseData.celular]
        ];

        personalData.forEach(([label, value]) => {
            worksheet.getCell(`A${row}`).value = label;
            worksheet.getCell(`B${row}`).value = value;
            worksheet.getCell(`A${row}`).font = { bold: true };
            row++;
        });

        row++; // Espacio

        // SECCIÓN 2: DATOS DE LA AUSENCIA
        worksheet.mergeCells(`A${row}:B${row}`);
        const ausenciaHeader = worksheet.getCell(`A${row}`);
        ausenciaHeader.value = 'DATOS DE LA AUSENCIA';
        ausenciaHeader.font = { bold: true, color: { argb: 'FFFFFFFF' }, size: 12 };
        ausenciaHeader.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FF2C3E50' } };
        ausenciaHeader.alignment = { horizontal: 'center', vertical: 'center' };
        row++;

        const ausenciaData = [
            ['Fecha de Inicio', licenseData.fechaInicio],
            ['Fecha de Fin', licenseData.fechaFin],
            ['Motivo', licenseData.motivo],
            ['Artículo', licenseData.articulo || '']
        ];

        ausenciaData.forEach(([label, value]) => {
            worksheet.getCell(`A${row}`).value = label;
            worksheet.getCell(`B${row}`).value = value;
            worksheet.getCell(`A${row}`).font = { bold: true };
            row++;
        });

        row++; // Espacio

        // SECCIÓN 3: FUNCIONES CON SUBESPACIOS Y COMISIONES
        worksheet.mergeCells(`A${row}:E${row}`);
        const funcionesHeader = worksheet.getCell(`A${row}`);
        funcionesHeader.value = 'FUNCIONES, SUBESPACIOS Y COMISIONES';
        funcionesHeader.font = { bold: true, color: { argb: 'FFFFFFFF' }, size: 12 };
        funcionesHeader.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FF2C3E50' } };
        funcionesHeader.alignment = { horizontal: 'center', vertical: 'center' };
        row++;

        // Encabezados de tabla
        const tableHeaders = ['Función', 'Subespacio', 'Comisión', 'ID Comisión', 'Observaciones'];
        tableHeaders.forEach((header, index) => {
            const cell = worksheet.getCell(row, index + 1);
            cell.value = header;
            cell.font = { bold: true, color: { argb: 'FFFFFFFF' } };
            cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FF34495E' } };
            cell.alignment = { horizontal: 'center', vertical: 'center', wrapText: true };
        });
        row++;

        let maxIdLineLength = 0;
        let maxIdLines = 1;

        // Data de funciones
        licenseData.funciones.forEach(funcion => {
            const comisionValue = Array.isArray(funcion.comision)
                ? funcion.comision.join(', ')
                : (funcion.comision || '');
            
            // Manejar IDs: puede venir en comisionIds (docentes) o en funcionId (personal)
            let comisionIdsValue = '';
            const comisionIdsLines = [];
            
            if (funcion.funcionId) {
                // Para funciones con ID simple (asistente, personal, etc.)
                comisionIdsValue = funcion.funcionId;
                comisionIdsLines.push(funcion.funcionId);
            } else if (Array.isArray(funcion.comisionIds)) {
                // Para funciones docentes con comisiones múltiples
                const lines = funcion.comisionIds
                    .map(item => (item && item.id ? `${item.comision || ''}${item.comision ? ': ' : ''}${item.id}` : ''))
                    .filter(Boolean);
                comisionIdsValue = lines.join('\n');
                comisionIdsLines.push(...lines);
            }

            if (comisionIdsLines.length > 0) {
                maxIdLines = Math.max(maxIdLines, comisionIdsLines.length);
                comisionIdsLines.forEach(line => {
                    maxIdLineLength = Math.max(maxIdLineLength, line.length);
                });
            }

            worksheet.getCell(row, 1).value = funcion.label;
            worksheet.getCell(row, 2).value = funcion.subespacio || '';
            worksheet.getCell(row, 3).value = comisionValue;
            worksheet.getCell(row, 4).value = comisionIdsValue;
            worksheet.getCell(row, 5).value = funcion.observaciones || '';

            // Formato
            [1, 2, 4, 5].forEach(col => {
                worksheet.getCell(row, col).alignment = { wrapText: true, vertical: 'top' };
            });
            worksheet.getCell(row, 3).alignment = { wrapText: true, vertical: 'top', horizontal: 'center' };

            if (comisionIdsLines.length > 1) {
                const rowRef = worksheet.getRow(row);
                const targetHeight = 15 * comisionIdsLines.length;
                rowRef.height = Math.max(rowRef.height || 0, targetHeight);
            }

            row++;
        });

        row++; // Espacio

        // SECCIÓN 4: OBSERVACIONES GENERALES
        if (licenseData.observacionesGenerales) {
            worksheet.mergeCells(`A${row}:B${row}`);
            const obsHeader = worksheet.getCell(`A${row}`);
            obsHeader.value = 'OBSERVACIONES GENERALES';
            obsHeader.font = { bold: true, color: { argb: 'FFFFFFFF' }, size: 12 };
            obsHeader.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FF2C3E50' } };
            obsHeader.alignment = { horizontal: 'center', vertical: 'center' };
            row++;

            worksheet.mergeCells(`A${row}:B${row + 2}`);
            const obsCell = worksheet.getCell(`A${row}`);
            obsCell.value = licenseData.observacionesGenerales;
            obsCell.alignment = { wrapText: true, vertical: 'top' };
            row += 3;
        }

        // Ajustar ancho de columnas
        const idColumnWidth = Math.min(40, Math.max(20, maxIdLineLength + 2));
        worksheet.columns = [
            { width: 20 },
            { width: 30 },
            { width: 15 },
            { width: idColumnWidth },
            { width: 30 }
        ];

        // Guardar archivo
        await workbook.xlsx.writeFile(filePath);
        console.log(`✓ Excel creado: ${personaFolder}/${fileName}`);

        return filePath;
    } catch (error) {
        console.error('Error al generar Excel local:', error.message);
        throw error;
    }
}

/**
 * Generar archivo PDF con estructura completa (para descarga del usuario)
 */
async function generateLocalPDF(licenseData, uniqueTimestamp = null) {
    try {
        // Crear carpeta por persona
        const personaFolder = `${licenseData.nombre}_${licenseData.apellido}`;
        const exportsDir = path.join(__dirname, 'exports', personaFolder);

        if (!fs.existsSync(exportsDir)) {
            fs.mkdirSync(exportsDir, { recursive: true });
        }

        // Usar timestamp único proporcionado o generar uno nuevo
        if (!uniqueTimestamp) {
            const now = new Date();
            const timestamp = now.toISOString().replace(/[:.]/g, '-');
            const random = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
            uniqueTimestamp = `${timestamp}_${random}`;
        }
        const fileName = `Registro_${uniqueTimestamp}.pdf`;
        const filePath = path.join(exportsDir, fileName);

        // Crear documento PDF
        const doc = new PDFDocument({ 
            size: 'A4',
            margins: { top: 50, bottom: 50, left: 50, right: 50 }
        });

        // Pipe a archivo
        const stream = fs.createWriteStream(filePath);
        doc.pipe(stream);

        // ENCABEZADO PRINCIPAL CON LOGO
        const logoPath = path.join(__dirname, '882f78e51403fb66a620edda9eb68c16.jpg');
        const logoHeight = 60;
        const logoWidth = 60;
        
        // Insertar logo a la izquierda
        doc.image(logoPath, 50, 40, { width: logoWidth, height: logoHeight });
        
        // Texto del encabezado a la derecha del logo
        const textStartX = 50 + logoWidth + 15; // Logo + espacio
        doc.fontSize(14)
           .font('Helvetica-Bold')
           .fillColor('#000000')
           .text('Sistema de Registro Licencias 2026', textStartX, 45, { width: 400 });
        
        doc.fontSize(10)
           .font('Helvetica')
           .fillColor('#666666')
           .text('I.S.E.F. Nro 27 Prof. Cesar S. Vasquez - Santa Fe Capital', textStartX, 65, { width: 400 });
        
        doc.moveDown(3);

        // SECCIÓN 1: DATOS PERSONALES
        doc.fontSize(12)
           .font('Helvetica-Bold')
           .fillColor('#000000')
           .text('DATOS PERSONALES', { underline: true });
        
        doc.moveDown(0.8);
        doc.fontSize(11)
           .font('Helvetica');

        const personalData = [
            ['Nombre:', licenseData.nombre],
            ['Apellido:', licenseData.apellido],
            ['DNI:', licenseData.dni],
            ['Email:', licenseData.email],
            ['Celular:', licenseData.celular]
        ];

        personalData.forEach(([label, value]) => {
            doc.font('Helvetica-Bold')
               .text(label, 55, doc.y, { continued: true, width: 120 })
               .font('Helvetica')
               .text(' ' + value);
            doc.moveDown(0.5);
        });

        doc.moveDown(1);

        // SECCIÓN 2: DATOS DE LA AUSENCIA
        doc.fontSize(12)
           .font('Helvetica-Bold')
           .fillColor('#000000')
           .text('DATOS DE LA AUSENCIA', { underline: true });
        
        doc.moveDown(0.8);
        doc.fontSize(11)
           .font('Helvetica');

        const ausenciaData = [
            ['Fecha de Inicio:', licenseData.fechaInicio],
            ['Fecha de Fin:', licenseData.fechaFin],
            ['Motivo:', licenseData.motivo],
            ['Artículo:', licenseData.articulo || 'N/A']
        ];

        ausenciaData.forEach(([label, value]) => {
            doc.font('Helvetica-Bold')
               .text(label, 55, doc.y, { continued: true, width: 120 })
               .font('Helvetica')
               .text(' ' + value);
            doc.moveDown(0.5);
        });

        doc.moveDown(1);

        // SECCIÓN 3: FUNCIONES CON SUBESPACIOS Y COMISIONES
        doc.fontSize(12)
           .font('Helvetica-Bold')
           .fillColor('#000000')
           .text('FUNCIONES, SUBESPACIOS Y COMISIONES', { underline: true });
        
        doc.moveDown(0.8);
        doc.fontSize(11)
           .font('Helvetica');

        if (licenseData.funciones && licenseData.funciones.length > 0) {
            licenseData.funciones.forEach((funcion, index) => {
                // Verificar si necesitamos nueva página
                if (doc.y > 700) {
                    doc.addPage();
                }

                doc.font('Helvetica-Bold')
                   .fontSize(11)
                   .text(`${index + 1}. Función: `, 55, doc.y, { continued: true })
                   .font('Helvetica')
                   .text(funcion.label || 'N/A');

                if (funcion.subespacio) {
                    doc.font('Helvetica-Bold')
                       .fontSize(11)
                       .text('   Subespacio: ', 55, doc.y, { continued: true })
                       .font('Helvetica')
                       .text(funcion.subespacio);
                }

                const comisionValue = Array.isArray(funcion.comision)
                    ? funcion.comision.join(', ')
                    : (funcion.comision || 'N/A');
                
                doc.font('Helvetica-Bold')
                   .fontSize(11)
                   .text('   Comisión: ', 55, doc.y, { continued: true })
                   .font('Helvetica')
                   .text(comisionValue);

                // Manejar IDs: puede venir en comisionIds (docentes) o en funcionId (personal)
                if (funcion.funcionId) {
                    // Para funciones con ID simple (asistente, personal, etc.)
                    doc.font('Helvetica-Bold')
                       .fontSize(11)
                       .text('   ID: ', 55, doc.y, { continued: true })
                       .font('Helvetica')
                       .text(funcion.funcionId);
                } else if (funcion.comisionIds && Array.isArray(funcion.comisionIds) && funcion.comisionIds.length > 0) {
                    // Para funciones docentes con comisiones múltiples
                    const comisionIdsLines = funcion.comisionIds
                        .map(item => (item && item.id ? `${item.comision || ''}${item.comision ? ': ' : ''}${item.id}` : ''))
                        .filter(Boolean);
                    
                    if (comisionIdsLines.length > 0) {
                        doc.font('Helvetica-Bold')
                           .fontSize(11)
                           .text('   ID Comisión: ', 55, doc.y, { continued: true })
                           .font('Helvetica')
                           .text(comisionIdsLines.join(', '));
                    }
                }

                if (funcion.observaciones) {
                    doc.font('Helvetica-Bold')
                       .fontSize(11)
                       .text('   Observaciones: ', 55, doc.y, { continued: true })
                       .font('Helvetica')
                       .text(funcion.observaciones, { width: 450 });
                }

                doc.moveDown(0.8);
            });
        } else {
            doc.font('Helvetica')
               .fontSize(11)
               .text('No se registraron funciones.', 55);
        }

        doc.moveDown(1);

        // SECCIÓN 4: OBSERVACIONES GENERALES
        if (licenseData.observacionesGenerales) {
            // Verificar si necesitamos nueva página
            if (doc.y > 650) {
                doc.addPage();
            }

            doc.fontSize(12)
               .font('Helvetica-Bold')
               .fillColor('#000000')
               .text('OBSERVACIONES GENERALES', { underline: true });
            
            doc.moveDown(0.8);
            doc.fontSize(11)
               .font('Helvetica');

            doc.text(licenseData.observacionesGenerales, 55, doc.y, { 
                   width: 495,
                   align: 'justify'
               });
        }

        // PIE DE PÁGINA
        doc.fontSize(8)
           .font('Helvetica')
           .fillColor('#7F8C8D')
           .text(
               `Documento generado el ${new Date().toLocaleString('es-AR')}`,
               50,
               doc.page.height - 30,
               { align: 'center' }
           );

        // Finalizar PDF
        doc.end();

        // Esperar a que se termine de escribir
        await new Promise((resolve, reject) => {
            stream.on('finish', resolve);
            stream.on('error', reject);
        });

        console.log(`✓ PDF creado: ${personaFolder}/${fileName}`);
        return filePath;
    } catch (error) {
        console.error('Error al generar PDF local:', error.message);
        throw error;
    }
}

/**
 * Actualizar Excel indice unico (agrega una fila por licencia)
 */
async function updateIndexExcel(licenseData) {
    try {
        const exportsDir = path.join(__dirname, 'exports');
        if (!fs.existsSync(exportsDir)) {
            fs.mkdirSync(exportsDir, { recursive: true });
        }

        const filePath = path.join(exportsDir, 'Indice_Licencias.xlsx');
        let hadExistingIndex = fs.existsSync(filePath);
        if (!hadExistingIndex && isAuthenticated) {
            hadExistingIndex = await downloadIndexFromDropbox(filePath);
        }
        const workbook = new ExcelJS.Workbook();
        let worksheet = null;

        if (fs.existsSync(filePath)) {
            await workbook.xlsx.readFile(filePath);
            worksheet = workbook.getWorksheet('Indice') || workbook.worksheets[0];
        }

        if (!worksheet) {
            worksheet = workbook.addWorksheet('Indice');
        }

        if (worksheet.rowCount === 0) {
            worksheet.addRow([
                'Fecha de carga',
                'Nombre',
                'Apellido',
                'DNI',
                'Fecha inicio',
                'Fecha fin'
            ]);
            worksheet.getRow(1).font = { bold: true };

            worksheet.columns = [
                { width: 15 },
                { width: 20 },
                { width: 20 },
                { width: 15 },
                { width: 15 },
                { width: 15 }
            ];
        }

        const now = new Date();
        const fechaCarga = formatDateLikeCarga(now);
        const fechaInicio = formatDateLikeCarga(licenseData.fechaInicio);
        const fechaFin = formatDateLikeCarga(licenseData.fechaFin);
        worksheet.addRow([
            fechaCarga,
            licenseData.nombre,
            licenseData.apellido,
            licenseData.dni,
            fechaInicio,
            fechaFin
        ]);

        await workbook.xlsx.writeFile(filePath);
        console.log('✓ Indice actualizado en Excel');

        return {
            filePath,
            rowCount: worksheet.rowCount,
            hadExistingIndex
        };
    } catch (error) {
        console.error('Error al actualizar indice Excel:', error.message);
        throw error;
    }
}

function formatDateLikeCarga(value) {
    if (!value) return '';
    const date = value instanceof Date ? value : new Date(value);
    if (Number.isNaN(date.getTime())) return '';

    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
}

async function downloadIndexFromDropbox(localPath) {
    try {
        const folderBasePath = process.env.DROPBOX_FOLDER_PATH || '/Licencias Instituto';
        const dropboxFilePath = `${folderBasePath}/Indice_Licencias.xlsx`;
        const response = await dropboxClient.filesDownload({ path: dropboxFilePath });
        const fileBinary = response.result?.fileBinary || response.fileBinary;

        if (fileBinary) {
            fs.writeFileSync(localPath, fileBinary, 'binary');
            console.log('✓ Indice descargado desde Dropbox');
            return true;
        }
    } catch (error) {
        if (error.status !== 409 && error.status !== 404) {
            console.warn('No se pudo descargar el indice desde Dropbox:', error.message);
        }
    }

    return false;
}

/**
 * Subir indice Excel a Dropbox
 */
async function uploadIndexToDropbox(filePath, indexInfo = null) {
    try {
        if (!isAuthenticated) return null;

        const folderBasePath = process.env.DROPBOX_FOLDER_PATH || '/Licencias Instituto';
        const fileName = path.basename(filePath);
        const dropboxFilePath = `${folderBasePath}/${fileName}`;

        try {
            await dropboxClient.filesCreateFolderV2({
                path: folderBasePath
            });
        } catch (error) {
            if (error.status !== 409) {
                throw error;
            }
        }

        const fileContent = fs.readFileSync(filePath);

        if (indexInfo && !indexInfo.hadExistingIndex) {
            try {
                await dropboxClient.filesGetMetadata({ path: dropboxFilePath });
                console.warn('Indice en Dropbox ya existe. Evitando sobrescribirlo.');
                return null;
            } catch (error) {
                if (error.status !== 409 && error.status !== 404) {
                    throw error;
                }
            }
        }

        const response = await dropboxClient.filesUpload({
            path: dropboxFilePath,
            contents: fileContent,
            mode: { '.tag': 'overwrite' }
        });

        console.log(`✓ Indice subido a Dropbox: ${dropboxFilePath}`);
        return response.result.id;
    } catch (error) {
        console.error('Error al subir indice a Dropbox:', error.message);
        return null;
    }
}

/**
 * Guardar licencia en Dropbox + local
 */
async function saveLicenseToDropbox(licenseData) {
    try {
        // Generar timestamp único para este registro (compartido entre Excel y PDF)
        const now = new Date();
        const timestamp = now.toISOString().replace(/[:.]/g, '-');
        const random = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
        const uniqueTimestamp = `${timestamp}_${random}`;

        // Generar Excel local con estructura de carpetas
        const localPath = await generateLocalExcel(licenseData, uniqueTimestamp);

        // Actualizar indice Excel unico
        const indexInfo = await updateIndexExcel(licenseData);
        const indexPath = indexInfo.filePath;

        // Intentar subir a Dropbox
        let dropboxSynced = false;
        if (isAuthenticated) {
            const uploaded = await uploadExcelToDropbox(localPath, licenseData);
            if (uploaded) {
                dropboxSynced = true;
            }

            await uploadIndexToDropbox(indexPath, indexInfo);
        }

        // Guardar en JSON (backup)
        saveLocalLicense(licenseData);

        if (dropboxSynced) {
            return {
                mode: 'dropbox_excel',
                message: 'Licencia guardada en Dropbox y Excel local',
                synced: true,
                person: `${licenseData.nombre} ${licenseData.apellido}`,
                localPath,
                indexPath,
                uniqueTimestamp  // Timestamp para usar en PDF
            };
        } else {
            return {
                mode: 'local_excel',
                message: 'Licencia guardada en Excel local (Dropbox no disponible)',
                synced: false,
                person: `${licenseData.nombre} ${licenseData.apellido}`,
                localPath,
                indexPath,
                uniqueTimestamp  // Timestamp para usar en PDF
            };
        }
    } catch (error) {
        console.error('Error al guardar licencia:', error.message);

        try {
            saveLocalLicense(licenseData);
        } catch (localError) {
            console.error('Error al guardar en JSON:', localError);
        }

        return {
            mode: 'local',
            message: 'Licencia guardada en JSON (error con Excel)',
            synced: false,
            warning: error.message
        };
    }
}

/**
 * Guardar licencia localmente (backup)
 */
function saveLocalLicense(licenseData) {
    try {
        const dataFile = path.join(__dirname, 'licencias_data.json');
        let licenses = [];

        // Leer datos existentes
        if (fs.existsSync(dataFile)) {
            const fileContent = fs.readFileSync(dataFile, 'utf8');
            licenses = JSON.parse(fileContent);
        }

        // Agregar nueva licencia
        licenses.push({
            ...licenseData,
            id: `LIC-${Date.now()}`
        });

        // Guardar datos
        fs.writeFileSync(dataFile, JSON.stringify(licenses, null, 2), 'utf8');
        console.log('✓ Datos guardados en JSON');

        return {
            mode: 'local',
            count: licenses.length
        };
    } catch (error) {
        console.error('Error al guardar JSON:', error);
        throw error;
    }
}

// Inicializar autenticación al cargar el módulo
initializeAuth().catch(error => {
    console.error('Error durante inicialización:', error.message);
});

module.exports = {
    saveLicenseToDropbox,
    initializeAuth,
    uploadExcelToDropbox,
    generateLocalExcel,
    generateLocalPDF,
    updateIndexExcel,
    uploadIndexToDropbox
};
