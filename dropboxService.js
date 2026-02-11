/**
 * Servicio de Integración con Dropbox
 * Sincroniza archivos Excel automáticamente a Dropbox
 */

const { Dropbox } = require('dropbox');
const fs = require('fs');
const path = require('path');
const ExcelJS = require('exceljs');

let dropboxClient = null;
let isAuthenticated = false;

/**
 * Inicializar autenticación con Dropbox
 */
async function initializeAuth() {
    try {
        const accessToken = process.env.DROPBOX_ACCESS_TOKEN;
        const refreshToken = process.env.DROPBOX_REFRESH_TOKEN;
        const appKey = process.env.DROPBOX_APP_KEY;
        const appSecret = process.env.DROPBOX_APP_SECRET;

        if (!accessToken && !refreshToken) {
            console.log('⚠️  Token de Dropbox no configurado');
            console.log('   Guardando datos solo localmente');
            return false;
        }

        // Crear cliente de Dropbox
        if (refreshToken) {
            if (!appKey || !appSecret) {
                console.log('⚠️  Faltan DROPBOX_APP_KEY o DROPBOX_APP_SECRET');
                console.log('   Guardando datos solo localmente');
                return false;
            }

            dropboxClient = new Dropbox({
                refreshToken,
                clientId: appKey,
                clientSecret: appSecret
            });
        } else {
            dropboxClient = new Dropbox({ accessToken });
        }

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
        const response = await dropboxClient.filesUpload({
            path: dropboxFilePath,
            contents: fileContent,
            mode: { '.tag': 'add' },
            autorename: false
        }).catch(async (error) => {
            // Si el archivo ya existe, actualizarlo
            if (error.status === 409) {
                return await dropboxClient.filesUpload({
                    path: dropboxFilePath,
                    contents: fileContent,
                    mode: { '.tag': 'overwrite' }
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
async function generateLocalExcel(licenseData) {
    try {
        // Crear carpeta por persona
        const personaFolder = `${licenseData.nombre}_${licenseData.apellido}`;
        const exportsDir = path.join(__dirname, 'exports', personaFolder);

        if (!fs.existsSync(exportsDir)) {
            fs.mkdirSync(exportsDir, { recursive: true });
        }

        // Crear nombre de archivo con timestamp
        const timestamp = new Date().toISOString().replace(/[:.]/g, '-').slice(0, -5);
        const fileName = `Registro_${timestamp}.xlsx`;
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
        worksheet.mergeCells(`A${row}:D${row}`);
        const funcionesHeader = worksheet.getCell(`A${row}`);
        funcionesHeader.value = 'FUNCIONES, SUBESPACIOS Y COMISIONES';
        funcionesHeader.font = { bold: true, color: { argb: 'FFFFFFFF' }, size: 12 };
        funcionesHeader.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FF2C3E50' } };
        funcionesHeader.alignment = { horizontal: 'center', vertical: 'center' };
        row++;

        // Encabezados de tabla
        const tableHeaders = ['Función', 'Subespacio', 'Comisión', 'Observaciones'];
        tableHeaders.forEach((header, index) => {
            const cell = worksheet.getCell(row, index + 1);
            cell.value = header;
            cell.font = { bold: true, color: { argb: 'FFFFFFFF' } };
            cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FF34495E' } };
            cell.alignment = { horizontal: 'center', vertical: 'center', wrapText: true };
        });
        row++;

        // Data de funciones
        licenseData.funciones.forEach(funcion => {
            worksheet.getCell(row, 1).value = funcion.label;
            worksheet.getCell(row, 2).value = funcion.subespacio || '';
            worksheet.getCell(row, 3).value = funcion.comision || '';
            worksheet.getCell(row, 4).value = funcion.observaciones || '';

            // Formato
            [1, 2, 3, 4].forEach(col => {
                worksheet.getCell(row, col).alignment = { wrapText: true, vertical: 'top' };
            });

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
        worksheet.columns = [
            { width: 20 },
            { width: 30 },
            { width: 15 },
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
 * Guardar licencia en Dropbox + local
 */
async function saveLicenseToDropbox(licenseData) {
    try {
        // Generar Excel local con estructura de carpetas
        const localPath = await generateLocalExcel(licenseData);

        // Intentar subir a Dropbox
        let dropboxSynced = false;
        if (isAuthenticated) {
            const uploaded = await uploadExcelToDropbox(localPath, licenseData);
            if (uploaded) {
                dropboxSynced = true;
            }
        }

        // Guardar en JSON (backup)
        saveLocalLicense(licenseData);

        if (dropboxSynced) {
            return {
                mode: 'dropbox_excel',
                message: 'Licencia guardada en Dropbox y Excel local',
                synced: true,
                person: `${licenseData.nombre} ${licenseData.apellido}`
            };
        } else {
            return {
                mode: 'local_excel',
                message: 'Licencia guardada en Excel local (Dropbox no disponible)',
                synced: false,
                person: `${licenseData.nombre} ${licenseData.apellido}`
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
    generateLocalExcel
};
