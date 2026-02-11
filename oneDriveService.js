/**
 * Servicio de Integración con OneDrive
 * Usa Microsoft Graph API para sincronizar archivos Excel
 */

const { Client } = require('@microsoft/microsoft-graph-client');
const { ClientSecretCredential } = require('@azure/identity');
const fs = require('fs');
const path = require('path');
const ExcelJS = require('exceljs');

let graphClient = null;
let isAuthenticated = false;

/**
 * Inicializar autenticación con Azure
 */
async function initializeAuth() {
    try {
        const tenantId = process.env.AZURE_TENANT_ID;
        const clientId = process.env.AZURE_CLIENT_ID;
        const clientSecret = process.env.AZURE_CLIENT_SECRET;

        if (!tenantId || !clientId || !clientSecret) {
            console.log('⚠️  Variables de Azure no configuradas');
            console.log('   Guardando datos solo localmente');
            return false;
        }

        // Crear credenciales de Azure
        const credential = new ClientSecretCredential(
            tenantId,
            clientId,
            clientSecret
        );

        // Crear cliente de Graph
        graphClient = Client.initWithMiddleware({
            authProvider: {
                getAccessToken: async () => {
                    const token = await credential.getToken('https://graph.microsoft.com/.default');
                    return token.token;
                }
            }
        });

        // Verificar que funciona
        const user = await graphClient.api('/me').get();
        console.log('✓ Autenticación con Azure inicializada correctamente');
        console.log(`  - Usuario: ${user.displayName}`);

        isAuthenticated = true;
        return true;
    } catch (error) {
        console.error('Error al inicializar autenticación Azure:', error.message);
        console.log('💾 Cambiar a almacenamiento solo local');
        isAuthenticated = false;
        return false;
    }
}

/**
 * Obtener o crear carpeta en OneDrive
 */
async function getOrCreateFolder() {
    try {
        if (!isAuthenticated) return null;

        const folderPath = process.env.ONEDRIVE_FOLDER_PATH || '/Licencias Instituto';

        // Obtener la carpeta raíz de OneDrive
        const drive = await graphClient.api('/me/drive').get();

        // Buscar o crear la carpeta
        try {
            const items = await graphClient
                .api(`/me/drive/root${folderPath}`)
                .get();
            
            console.log(`✓ Carpeta encontrada: ${folderPath}`);
            return items.id;
        } catch (error) {
            if (error.status === 404) {
                // Carpeta no existe, crearla
                console.log(`📁 Creando carpeta: ${folderPath}`);
                
                const folderName = path.basename(folderPath);
                const parentPath = path.dirname(folderPath);

                let parentId = 'root';
                if (parentPath !== '/' && parentPath !== '.') {
                    const parent = await graphClient
                        .api(`/me/drive/root${parentPath}`)
                        .get();
                    parentId = parent.id;
                }

                const newFolder = await graphClient
                    .api(`/me/drive/items/${parentId}/children`)
                    .post({
                        name: folderName,
                        folder: {}
                    });

                console.log(`✓ Carpeta creada: ${folderPath}`);
                return newFolder.id;
            } else {
                throw error;
            }
        }
    } catch (error) {
        console.error('Error al obtener/crear carpeta:', error.message);
        return null;
    }
}

/**
 * Subir archivo Excel a OneDrive
 */
async function uploadExcelToOneDrive(filePath, fileName) {
    try {
        if (!isAuthenticated) return null;

        const folderId = await getOrCreateFolder();
        if (!folderId) {
            console.log('⚠️  No se pudo obtener carpeta de OneDrive');
            return null;
        }

        // Leer archivo Excel
        const fileContent = fs.readFileSync(filePath);

        // Subir a OneDrive
        const uploadedFile = await graphClient
            .api(`/me/drive/items/${folderId}:/${fileName}:/content`)
            .put(fileContent);

        console.log(`✓ Archivo subido a OneDrive: ${fileName}`);
        return uploadedFile.id;
    } catch (error) {
        console.error('Error al subir a OneDrive:', error.message);
        return null;
    }
}

/**
 * Generar Excel local
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

        // Agregar fila de datos
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
 * Guardar licencia en OneDrive + local
 */
async function saveLicenseToOneDrive(licenseData) {
    try {
        const now = new Date();
        const monthYear = now.toLocaleString('es-ES', { month: 'long', year: 'numeric' });
        const fileName = `Licencias - ${monthYear}.xlsx`;

        // Generar Excel local
        const localPath = await generateLocalExcel(licenseData);

        // Intentar subir a OneDrive
        let oneDriveSynced = false;
        if (isAuthenticated) {
            const uploaded = await uploadExcelToOneDrive(localPath, fileName);
            if (uploaded) {
                oneDriveSynced = true;
            }
        }

        // Guardar en JSON (backup)
        saveLocalLicense(licenseData);

        if (oneDriveSynced) {
            return {
                mode: 'onedrive_excel',
                message: 'Licencia guardada en OneDrive y Excel local',
                synced: true
            };
        } else {
            return {
                mode: 'local_excel',
                message: 'Licencia guardada en Excel local (OneDrive no disponible)',
                synced: false
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
    saveLicenseToOneDrive,
    initializeAuth,
    getOrCreateFolder,
    uploadExcelToOneDrive,
    generateLocalExcel
};
