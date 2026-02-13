const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');
const fs = require('fs');
const crypto = require('crypto');
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

const downloadTokens = new Map();
const DOWNLOAD_TTL_MS = 30 * 60 * 1000;

function registerDownload(filePath) {
    if (!filePath) return null;
    const token = crypto.randomUUID ? crypto.randomUUID() : crypto.randomBytes(16).toString('hex');
    const expiresAt = Date.now() + DOWNLOAD_TTL_MS;

    downloadTokens.set(token, { filePath, expiresAt });
    setTimeout(() => {
        downloadTokens.delete(token);
    }, DOWNLOAD_TTL_MS).unref();

    return token;
}

function buildMailTransporter() {
    const host = process.env.SMTP_HOST;
    const port = Number(process.env.SMTP_PORT || 587);
    const secure = String(process.env.SMTP_SECURE || '').toLowerCase() === 'true';
    const user = process.env.SMTP_USER;
    const pass = process.env.SMTP_PASS;

    if (!host || !user || !pass) {
        return null;
    }

    return nodemailer.createTransport({
        host,
        port,
        secure,
        auth: { user, pass },
        connectionTimeout: 10000,
        greetingTimeout: 10000,
        socketTimeout: 15000
    });
}


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

        // Generar PDF para descarga del usuario (usando el mismo timestamp que el Excel)
        let pdfPath = null;
        try {
            pdfPath = await dropboxService.generateLocalPDF(licenseData, result.uniqueTimestamp);
            console.log('✓ PDF generado para descarga del usuario');
        } catch (pdfError) {
            console.error('Error al generar PDF:', pdfError.message);
            // Si falla el PDF, usamos el Excel como fallback
            pdfPath = result.localPath;
        }

        if (pdfPath) {
            const token = registerDownload(pdfPath);
            if (token) {
                result.downloadUrl = `/api/download/${token}`;
            }
        }

        const warning = result.warning || null;

        res.json({ 
            success: true, 
            message: 'Licencia registrada exitosamente',
            data: result,
            warning
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

app.get('/api/download/:token', (req, res) => {
    const { token } = req.params;
    const entry = downloadTokens.get(token);
    if (!entry) {
        return res.status(404).json({ error: 'Archivo no disponible' });
    }

    if (Date.now() > entry.expiresAt) {
        downloadTokens.delete(token);
        return res.status(410).json({ error: 'Enlace expirado' });
    }

    if (!fs.existsSync(entry.filePath)) {
        downloadTokens.delete(token);
        return res.status(404).json({ error: 'Archivo no disponible' });
    }

    return res.download(entry.filePath, path.basename(entry.filePath));
});

// Ruta de prueba
app.get('/api/health', (req, res) => {
    res.json({ status: 'OK', message: 'Servidor funcionando correctamente' });
});

// Ruta para obtener configuración (para pruebas)
app.get('/api/config', (req, res) => {
    const isConfigured = !!(
        process.env.DROPBOX_REFRESH_TOKEN &&
        process.env.DROPBOX_APP_KEY &&
        process.env.DROPBOX_APP_SECRET
    );
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
