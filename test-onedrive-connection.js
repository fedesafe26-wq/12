/**
 * Script para verificar la conexión con OneDrive/Microsoft Graph
 * Ejecutar: node test-onedrive-connection.js
 */

require('dotenv').config();
const { ClientSecretCredential } = require('@azure/identity');
const { Client } = require('@microsoft/microsoft-graph-client');

async function testConnection() {
    try {
        console.log('\n🔍 Verificando configuración de Azure/OneDrive...\n');

        // Verificar variables de entorno
        const tenantId = process.env.AZURE_TENANT_ID;
        const clientId = process.env.AZURE_CLIENT_ID;
        const clientSecret = process.env.AZURE_CLIENT_SECRET;

        if (!tenantId || !clientId || !clientSecret) {
            console.error('❌ Error: Variables de Azure no configuradas en .env');
            console.log('\n💡 Verifica que .env contiene:');
            console.log('   - AZURE_TENANT_ID');
            console.log('   - AZURE_CLIENT_ID');
            console.log('   - AZURE_CLIENT_SECRET');
            return;
        }

        console.log('✓ Variables de entorno encontradas');
        console.log(`  - Tenant ID: ${tenantId.substring(0, 8)}...`);
        console.log(`  - Client ID: ${clientId.substring(0, 8)}...`);

        // Crear credenciales
        console.log('\n🔐 Autenticando con Azure...');
        const credential = new ClientSecretCredential(
            tenantId,
            clientId,
            clientSecret
        );

        // Crear cliente de Graph
        const graphClient = Client.initWithMiddleware({
            authProvider: {
                getAccessToken: async () => {
                    const token = await credential.getToken('https://graph.microsoft.com/.default');
                    return token.token;
                }
            }
        });

        // Probar acceso al usuario
        console.log('📧 Obteniendo información del usuario...');
        const user = await graphClient.api('/me').get();

        console.log('✓ Usuario autenticado correctamente');
        console.log(`  - Nombre: ${user.displayName}`);
        console.log(`  - Email: ${user.userPrincipalName}`);

        // Obtener información de OneDrive
        console.log('\n📁 Accediendo a OneDrive...');
        const drive = await graphClient.api('/me/drive').get();

        console.log('✓ OneDrive accesible');
        console.log(`  - Tipo: ${drive.driveType}`);
        console.log(`  - ID: ${drive.id.substring(0, 16)}...`);

        // Obtener espacio disponible
        console.log('\n💾 Verificando cuota de almacenamiento...');
        const quota = drive.quota;
        const usedGB = (quota.used / (1024 ** 3)).toFixed(2);
        const totalGB = (quota.total / (1024 ** 3)).toFixed(2);
        const percentUsed = ((quota.used / quota.total) * 100).toFixed(1);

        console.log(`✓ Cuota de almacenamiento:`);
        console.log(`  - Usado: ${usedGB} GB de ${totalGB} GB`);
        console.log(`  - Porcentaje: ${percentUsed}%`);

        if (percentUsed >= 100) {
            console.error('\n⚠️  ALERTA: Tu OneDrive está lleno');
            return;
        }

        if (percentUsed >= 90) {
            console.warn('\n⚠️  ADVERTENCIA: Tu OneDrive está casi lleno (>90%)');
        }

        // Intentar crear una carpeta de prueba
        console.log('\n📝 Probando creación de archivos...');
        try {
            const testFolderName = `Test_${Date.now()}`;
            
            const newFolder = await graphClient
                .api('/me/drive/root/children')
                .post({
                    name: testFolderName,
                    folder: {}
                });

            console.log('✓ Carpeta de prueba creada');

            // Crear archivo de prueba
            const testFileName = 'test.txt';
            const fileContent = Buffer.from('Test file');

            await graphClient
                .api(`/me/drive/items/${newFolder.id}:/${testFileName}:/content`)
                .put(fileContent);

            console.log('✓ Archivo de prueba creado');

            // Limpiar
            await graphClient
                .api(`/me/drive/items/${newFolder.id}`)
                .delete();

            console.log('✓ Archivos de prueba limpiados');
        } catch (error) {
            console.error('❌ Error al crear archivos de prueba:', error.message);
            return;
        }

        console.log('\n✅ TODAS LAS VERIFICACIONES PASARON\n');
        console.log('Tu OneDrive está correctamente configurado.');
        console.log('Ahora puedes ejecutar: npm start\n');

    } catch (error) {
        console.error('\n❌ Error:', error.message);
        console.log('\n💡 Posibles soluciones:');
        console.log('  1. Verificar que los valores en .env sean exactos');
        console.log('  2. Verificar que los permisos estén concedidos en Azure');
        console.log('  3. Verificar que marcaste "Conceder consentimiento del administrador"');
        console.log('  4. Esperar unos minutos para que los cambios se propague en Azure');
    }
}

testConnection();
