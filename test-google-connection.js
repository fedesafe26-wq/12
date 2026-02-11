/**
 * Script para verificar la conexión con Google Drive/Sheets
 * Ejecutar: node test-google-connection.js
 */

require('dotenv').config();
const { google } = require('googleapis');

async function testConnection() {
    try {
        console.log('\n🔍 Verificando configuración de Google...\n');

        // Verificar variables de entorno
        const credentialsJson = process.env.GOOGLE_CREDENTIALS_JSON;
        const folderId = process.env.GOOGLE_DRIVE_FOLDER_ID;

        if (!credentialsJson) {
            console.error('❌ Error: GOOGLE_CREDENTIALS_JSON no está en .env');
            return;
        }

        if (!folderId) {
            console.error('❌ Error: GOOGLE_DRIVE_FOLDER_ID no está en .env');
            return;
        }

        console.log('✓ Variables de entorno encontradas');
        console.log(`  - Folder ID: ${folderId}`);

        // Parsear credenciales
        let credentials;
        try {
            credentials = JSON.parse(credentialsJson);
            console.log('✓ Credenciales JSON parseadas correctamente');
            console.log(`  - Project: ${credentials.project_id}`);
            console.log(`  - Email: ${credentials.client_email}`);
        } catch (error) {
            console.error('❌ Error al parsear JSON:', error.message);
            console.log('\n💡 Solución: Verifica que GOOGLE_CREDENTIALS_JSON en .env sea un JSON válido en UNA línea');
            return;
        }

        // Crear cliente de Google Auth
        const googleAuth = new google.auth.GoogleAuth({
            credentials: credentials,
            scopes: [
                'https://www.googleapis.com/auth/drive',
                'https://www.googleapis.com/auth/spreadsheets'
            ]
        });

        console.log('✓ Google Auth inicializado');

        // Probar acceso a Drive
        const drive = google.drive({ version: 'v3', auth: googleAuth });

        console.log('\n📂 Verificando carpeta...');
        try {
            const folder = await drive.files.get({
                fileId: folderId,
                fields: 'id,name,owners'
            });

            console.log('✓ Carpeta encontrada');
            console.log(`  - Nombre: ${folder.data.name}`);
            console.log(`  - Propietario: ${folder.data.owners[0]?.displayName || 'Desconocido'}`);
        } catch (error) {
            console.error('❌ Error al acceder a la carpeta:', error.message);
            console.log('\n💡 Soluciones posibles:');
            console.log('  1. Verifica que el GOOGLE_DRIVE_FOLDER_ID sea correcto');
            console.log('  2. Verifica que compartiste la carpeta con:', credentials.client_email);
            console.log('  3. Verifica que los permisos son "Editor"');
            return;
        }

        // Verificar cuota de almacenamiento
        console.log('\n💾 Verificando cuota de almacenamiento...');
        try {
            const about = await drive.about.get({
                fields: 'storageQuota'
            });

            const quota = about.data.storageQuota;
            const usedGB = (quota.usageInDrive / (1024 ** 3)).toFixed(2);
            const totalGB = (quota.limit / (1024 ** 3)).toFixed(2);
            const percentUsed = ((quota.usageInDrive / quota.limit) * 100).toFixed(1);

            console.log(`✓ Cuota de almacenamiento:`);
            console.log(`  - Usado: ${usedGB} GB de ${totalGB} GB`);
            console.log(`  - Porcentaje: ${percentUsed}%`);

            if (percentUsed >= 100) {
                console.error('\n⚠️  ALERTA: Tu cuota está completa. Necesitas liberar espacio.');
                console.log('\n💡 Opciones:');
                console.log('  1. Eliminar archivos de Google Drive');
                console.log('  2. Comprar más almacenamiento');
                console.log('  3. Usar otra cuenta de Google con espacio disponible');
                return;
            }

            if (percentUsed >= 90) {
                console.warn('\n⚠️  ADVERTENCIA: Tu cuota está casi llena (>90%)');
            }
        } catch (error) {
            console.error('❌ Error al verificar cuota:', error.message);
        }

        // Probar creación de un archivo de prueba
        console.log('\n📝 Probando creación de archivo...');
        try {
            const testFile = await drive.files.create({
                requestBody: {
                    name: 'Test_File_' + Date.now() + '.txt',
                    mimeType: 'text/plain',
                    parents: [folderId]
                },
                media: {
                    mimeType: 'text/plain',
                    body: 'Test'
                }
            });

            console.log('✓ Archivo de prueba creado exitosamente');
            console.log(`  - ID: ${testFile.data.id}`);

            // Limpiar archivo de prueba
            await drive.files.delete({
                fileId: testFile.data.id
            });

            console.log('✓ Archivo de prueba eliminado');
        } catch (error) {
            console.error('❌ Error al crear archivo de prueba:', error.message);
            console.log('\n💡 Posible causa: ' + error.message);
            return;
        }

        console.log('\n✅ TODAS LAS VERIFICACIONES PASARON\n');
        console.log('Tu Google Drive está correctamente configurado.');
        console.log('Ahora puedes ejecutar: npm start\n');

    } catch (error) {
        console.error('❌ Error general:', error.message);
    }
}

testConnection();
