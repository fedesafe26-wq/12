const ExcelJS = require('exceljs');
const fs = require('fs');
const path = require('path');

/**
 * Sistema de Almacenamiento
 * 
 * NOTA: Google Drive con Service Accounts NO funciona en cuentas personales
 * Solo está disponible en Google Workspace con Shared Drives
 * 
 * Solución implementada:
 * ✅ Excel local en /exports/
 * ✅ JSON backup en licencias_data.json
 * 
 * Los usuarios pueden descargar y compartir el Excel manualmente
 */

async function initializeAuth() {
    // No se necesita autenticación de Google para esta versión
    console.log('✓ Sistema de almacenamiento local inicializado correctamente');
    return true;
}

/**
 * Obtener o crear Google Sheet para el mes actual
 * NOTA: Esta función ahora no hace nada, solo está para compatibilidad
 * Los datos se guardan directamente en Excel y JSON
 */
async function getOrCreateMonthSheet() {
    // No se implementa Google Sheets en versión local
    return null;
}

/**
 * Agregar datos a Google Sheet
 * NOTA: Esta función ahora no hace nada, solo está para compatibilidad
 */
async function addDataToSheet(doc, licenseData) {
    // No se implementa Google Sheets en versión local
    return null;
}

/**
 * Generar archivo Excel local
 */
async function generateLocalExcel(licenseData) {
    try {
        const now = new Date();
        const monthYear = now.toLocaleString('es-ES', { month: 'long', year: 'numeric' });
        const fileName = `Licencias - ${monthYear}.xlsx`;
        const filePath = path.join(__dirname, 'exports', fileName);
        const exportsDir = path.join(__dirname, 'exports');

        // Crear carpeta exports si no existe
        if (!fs.existsSync(exportsDir)) {
            fs.mkdirSync(exportsDir, { recursive: true });
        }

        // Leer archivo existente o crear uno nuevo
        let workbook;
        if (fs.existsSync(filePath)) {
            workbook = new ExcelJS.Workbook();
            await workbook.xlsx.readFile(filePath);
        } else {
            workbook = new ExcelJS.Workbook();
            const worksheet = workbook.addWorksheet('Licencias');

            // Definir columnas
            worksheet.columns = [
                { header: 'Fecha/Hora', key: 'timestamp', width: 20 },
                { header: 'Nombre', key: 'nombre', width: 15 },
                { header: 'Apellido', key: 'apellido', width: 15 },
                { header: 'DNI', key: 'dni', width: 12 },
                { header: 'Email', key: 'email', width: 25 },
                { header: 'Celular', key: 'celular', width: 15 },
                { header: 'Fecha Inicio', key: 'fechaInicio', width: 12 },
                { header: 'Fecha Fin', key: 'fechaFin', width: 12 },
                { header: 'Motivo', key: 'motivo', width: 30 },
                { header: 'Artículo', key: 'articulo', width: 12 },
                { header: 'Funciones', key: 'funciones', width: 40 },
                { header: 'Observaciones', key: 'observacionesGenerales', width: 30 }
            ];

            // Formatear encabezados
            const headerRow = worksheet.getRow(1);
            headerRow.font = { bold: true, color: { argb: 'FFFFFFFF' } };
            headerRow.fill = {
                type: 'pattern',
                pattern: 'solid',
                fgColor: { argb: 'FF2C3E50' }
            };
        }

        // Agregar fila de datos al primer worksheet
        const worksheet = workbook.worksheets[0];
        const rowData = {
            timestamp: new Date(licenseData.timestamp).toLocaleString('es-AR'),
            nombre: licenseData.nombre,
            apellido: licenseData.apellido,
            dni: licenseData.dni,
            email: licenseData.email,
            celular: licenseData.celular,
            fechaInicio: licenseData.fechaInicio,
            fechaFin: licenseData.fechaFin,
            motivo: licenseData.motivo,
            articulo: licenseData.articulo || '',
            funciones: licenseData.funciones.map(f => f.label).join(', '),
            observacionesGenerales: licenseData.observacionesGenerales || ''
        };

        worksheet.addRow(rowData);

        // Guardar
        await workbook.xlsx.writeFile(filePath);
        console.log(`✓ Excel local creado/actualizado: ${fileName}`);

        return filePath;
    } catch (error) {
        console.error('Error al generar Excel local:', error.message);
        throw error;
    }
}

/**
 * Guardar licencia (Excel local + JSON backup)
 */
async function saveLicenseToGoogleDrive(licenseData) {
    try {
        // Generar Excel local (acumula en archivo mensual)
        await generateLocalExcel(licenseData);

        // Guardar localmente como backup JSON
        saveLocalLicense(licenseData);

        console.log('✓ Licencia guardada: Excel + JSON');

        return {
            mode: 'local_excel',
            message: 'Licencia guardada en Excel local y JSON',
            success: true
        };
    } catch (error) {
        console.error('Error al guardar licencia:', error.message);
        
        // Guardar localmente como último recurso
        try {
            saveLocalLicense(licenseData);
        } catch (localError) {
            console.error('Error al guardar en JSON:', localError);
        }
        
        return {
            mode: 'local',
            message: 'Licencia guardada en JSON (error con Excel)',
            success: false,
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
        console.log('✓ Datos guardados localmente');

        return {
            mode: 'local',
            message: 'Datos guardados localmente',
            count: licenses.length
        };
    } catch (error) {
        console.error('Error al guardar localmente:', error);
        throw error;
    }
}

// Inicializar al cargar el módulo
initializeAuth().catch(error => {
    console.error('Error durante inicialización:', error.message);
});

module.exports = {
    saveLicenseToGoogleDrive,
    initializeAuth,
    getOrCreateMonthSheet,
    addDataToSheet,
    generateLocalExcel
};
