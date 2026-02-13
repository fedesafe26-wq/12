/**
 * Script para verificar la conexión con Dropbox
 * Ejecutar: node test-dropbox-connection.js
 */

require('dotenv').config();
const { Dropbox } = require('dropbox');

async function testConnection() {
    try {
        console.log('\n🔍 Verificando configuración de Dropbox...\n');

        // Verificar variables de entorno
        const refreshToken = process.env.DROPBOX_REFRESH_TOKEN;
        const appKey = process.env.DROPBOX_APP_KEY;
        const appSecret = process.env.DROPBOX_APP_SECRET;
        const folderPath = process.env.DROPBOX_FOLDER_PATH || '/Licencias Instituto';

        if (!refreshToken) {
            console.error('❌ Error: DROPBOX_REFRESH_TOKEN no está en .env');
            console.log('\n💡 Solución:');
            console.log('  1. Abre: https://www.dropbox.com/developers/apps');
            console.log('  2. Crea una aplicación');
            console.log('  3. Genera un refresh token');
            console.log('  4. Agrega a .env: DROPBOX_REFRESH_TOKEN=tu-refresh-token');
            return;
        }

        if (!appKey || !appSecret) {
            console.error('❌ Error: faltan DROPBOX_APP_KEY o DROPBOX_APP_SECRET en .env');
            console.log('\n💡 Solución:');
            console.log('  1. Abre: https://www.dropbox.com/developers/apps');
            console.log('  2. Copia el App key y App secret');
            console.log('  3. Agrega a .env:');
            console.log('     DROPBOX_APP_KEY=tu-app-key');
            console.log('     DROPBOX_APP_SECRET=tu-app-secret');
            return;
        }

        console.log('✓ Variable DROPBOX_REFRESH_TOKEN encontrada');
        console.log(`  Token: ${refreshToken.substring(0, 10)}...`);
        console.log('✓ Variables DROPBOX_APP_KEY y DROPBOX_APP_SECRET encontradas');
        console.log(`  Carpeta: ${folderPath}`);

        // Crear cliente de Dropbox
        const dropbox = new Dropbox({
            refreshToken,
            clientId: appKey,
            clientSecret: appSecret
        });

        // Probar autenticación
        console.log('\n🔐 Autenticando con Dropbox...');
        const user = await dropbox.usersGetCurrentAccount();

        console.log('✓ Usuario autenticado correctamente');
        console.log(`  - Nombre: ${user.result.name.display_name}`);
        console.log(`  - Email: ${user.result.email}`);

        // Verificar acceso de archivo
        console.log('\n📂 Verificando acceso a archivos...');
        try {
            // Intentar listar carpetas raíz
            const listResult = await dropbox.filesListFolder({
                path: ''
            });

            console.log('✓ Acceso a archivos OK');
            console.log(`  - Puedes ver archivos y carpetas`);
        } catch (error) {
            console.error('❌ Error al acceder a archivos:', error.message);
            return;
        }

        // Crear carpeta de prueba
        console.log('\n✨ Probando creación de archivos...');
        try {
            const testFolderName = `Test_${Date.now()}`;
            const testFolderPath = `/${testFolderName}`;

            // Crear carpeta
            const folderResult = await dropbox.filesCreateFolderV2({
                path: testFolderPath
            }).catch(async (error) => {
                // Si ya existe, continuar
                if (error.status === 409) {
                    return { result: { id: 'test-folder' } };
                }
                throw error;
            });

            console.log('✓ Carpeta de prueba creada');

            // Crear archivo
            const testFileName = 'test.txt';
            const testFilePath = `${testFolderPath}/${testFileName}`;
            const testContent = Buffer.from('Test file');

            await dropbox.filesUpload({
                path: testFilePath,
                contents: testContent,
                mode: { '.tag': 'add' }
            }).catch(async (error) => {
                if (error.status === 409) {
                    return await dropbox.filesUpload({
                        path: testFilePath,
                        contents: testContent,
                        mode: { '.tag': 'overwrite' }
                    });
                }
                throw error;
            });

            console.log('✓ Archivo de prueba creado');

            // Eliminar archivo
            await dropbox.filesDeleteV2({
                path: testFilePath
            });

            console.log('✓ Archivo de prueba eliminado');

            // Eliminar carpeta
            await dropbox.filesDeleteV2({
                path: testFolderPath
            });

            console.log('✓ Carpeta de prueba eliminada');
        } catch (error) {
            console.error('❌ Error al crear archivos:', error.message);
            return;
        }

        console.log('\n✅ TODAS LAS VERIFICACIONES PASARON\n');
        console.log('Tu Dropbox está correctamente configurado.');
        console.log('Ahora puedes ejecutar: npm start\n');

    } catch (error) {
        console.error('\n❌ Error:', error.message);
        console.log('\n💡 Posibles soluciones:');
        console.log('  1. Verificar que el refresh token sea correcto');
        console.log('  2. Generar nuevo refresh token en https://www.dropbox.com/developers/apps');
        console.log('  3. Verificar que la app tenga permisos de files.content.write');
        console.log('  4. Verificar conexión a internet');
    }
}

testConnection();
