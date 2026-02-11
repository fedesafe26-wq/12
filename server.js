const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Servir archivos estáticos
app.use(express.static(path.join(__dirname)));

// Importar servicio de Dropbox
const dropboxService = require('./dropboxService');

// Ruta para guardar licencia
app.post('/api/save-license', async (req, res) => {
    try {
        const licenseData = req.body;
        
        // Validar que los datos necesarios estén presentes
        if (!licenseData.nombre || !licenseData.apellido || !licenseData.dni) {
            return res.status(400).json({ 
                error: 'Datos incompletos' 
            });
        }

        // Guardar los datos (Dropbox + Excel local + JSON)
        const result = await dropboxService.saveLicenseToDropbox(licenseData);

        res.json({ 
            success: true, 
            message: 'Licencia registrada exitosamente',
            data: result,
            warning: result.warning || null
        });
    } catch (error) {
        console.error('Error en /api/save-license:', error);
        
        // Intentar guardar localmente como último recurso
        try {
            const licenseData = req.body;
            const dataFile = require('path').join(__dirname, 'licencias_data.json');
            const fs = require('fs');
            
            let licenses = [];
            if (fs.existsSync(dataFile)) {
                const fileContent = fs.readFileSync(dataFile, 'utf8');
                licenses = JSON.parse(fileContent);
            }
            
            licenses.push({
                ...licenseData,
                id: `LIC-${Date.now()}`
            });
            
            fs.writeFileSync(dataFile, JSON.stringify(licenses, null, 2), 'utf8');
            
            return res.json({
                success: true,
                message: 'Licencia registrada localmente (Dropbox no disponible)',
                warning: 'Usando almacenamiento local'
            });
        } catch (fallbackError) {
            return res.status(500).json({ 
                error: 'Error al guardar la licencia: ' + error.message 
            });
        }
    }
});

// Ruta de prueba
app.get('/api/health', (req, res) => {
    res.json({ status: 'OK', message: 'Servidor funcionando correctamente' });
});

// Ruta para obtener configuración (para pruebas)
app.get('/api/config', (req, res) => {
    const isConfigured = !!process.env.DROPBOX_ACCESS_TOKEN;
    res.json({ 
        dropboxConfigured: isConfigured,
        message: isConfigured ? 'Dropbox está configurado' : 'Dropbox no está configurado. Ver instrucciones en DROPBOX_SETUP.md'
    });
});

// Iniciar servidor
app.listen(PORT, () => {
    console.log(`\n╔════════════════════════════════════════════╗`);
    console.log(`║   Sistema de Control de Licencias          ║`);
    console.log(`║   Servidor ejecutándose en:                ║`);
    console.log(`║   http://localhost:${PORT}${' '.repeat(10 - String(PORT).length)}    ║`);
    console.log(`╚════════════════════════════════════════════╝\n`);
});

module.exports = app;
