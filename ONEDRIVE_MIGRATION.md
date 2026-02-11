# 📝 Cambios Implementados - OneDrive Integration

## Resumen Ejecutivo

Se ha reemplazado la integración de Google Drive/Google Sheets con **OneDrive/Microsoft Graph API**.

**Por qué**: Google Drive no funciona con Service Accounts en cuentas personales. OneDrive sí, mediante Azure AD.

---

## 🔄 Cambios Principales

### 1. Nuevos Archivos
- ✅ **oneDriveService.js** - Integración con Microsoft Graph API
- ✅ **ONEDRIVE_SETUP.md** - Guía completa de configuración (8 pasos)
- ✅ **ONEDRIVE_QUICK_START.md** - Guía rápida
- ✅ **test-onedrive-connection.js** - Script de diagnóstico

### 2. Archivos Actualizados
- **server.js** - Ahora usa `oneDriveService` en lugar de `googleDriveService`
- **package.json** - Reemplazadas dependencias de Google por Azure:
  - ❌ `google-auth-library`
  - ❌ `google-spreadsheet`
  - ❌ `googleapis`
  - ✅ `@azure/identity`
  - ✅ `@microsoft/microsoft-graph-client`
- **.env.example** - Variables actualizadas para Azure

### 3. Archivos Removidos
- ~~googleDriveService.js~~ (reemplazado por oneDriveService.js)
- ~~test-google-connection.js~~ (reemplazado por test-onedrive-connection.js)
- ~~GOOGLE_SHEETS_SETUP.md~~ (reemplazado por ONEDRIVE_SETUP.md)

---

## 🔐 Variables de Entorno (Antes vs Después)

### ANTES (Google Drive)
```env
GOOGLE_DRIVE_FOLDER_ID=1a2B3c4D5e6F7...
GOOGLE_CREDENTIALS_JSON={"type":"service_account",...}
```

### AHORA (OneDrive)
```env
AZURE_TENANT_ID=12345678-1234-...
AZURE_CLIENT_ID=87654321-4321-...
AZURE_CLIENT_SECRET=abc123XyZ_...
ONEDRIVE_FOLDER_PATH=/Licencias Instituto
```

---

## 📊 Flujo de Datos (Antes vs Después)

### ANTES
```
Usuario Registra
     ↓
Intenta Google Sheets (Falla: No cuota)
     ↓
Excel Local + JSON
```

### AHORA
```
Usuario Registra
     ↓
Excel ↔ OneDrive (Microsoft Graph)
     ↓
Excel Local + JSON (Backup)
```

---

## ✨ Ventajas de OneDrive

| Feature | Google Drive | OneDrive |
|---------|--------------|----------|
| Service Accounts | ❌ Sin cuota | ✅ Completo acceso |
| Autenticación | ❌ Compleja | ✅ Azure AD |
| Sincronización | ❌ Problemas | ✅ Nativa |
| Costo | - | Gratuito (Microsoft 365) |
| Acceso móvil | ✅ | ✅ |

---

## 🚀 Cómo Migrar

### Si tienes el sistema antiguo:

1. **Hacer backup de datos**
   ```powershell
   Copy-Item licencias_data.json licencias_data.backup.json
   ```

2. **Actualizar código**
   ```powershell
   npm install
   ```

3. **Seguir ONEDRIVE_SETUP.md**
   - Crear aplicación en Azure
   - Obtener credenciales
   - Crear .env

4. **Probar**
   ```powershell
   node test-onedrive-connection.js
   npm start
   ```

---

## 📁 Estructura de Archivos (Nueva)

```
c:\Projects\Form\
├── index.html
├── styles.css
├── script.js
├── server.js
├── oneDriveService.js          ← NUEVO
├── package.json
├── .env                        ← Configuración (no subir a Git)
├── .env.example                ← Plantilla
├── .gitignore
├── licencias_data.json
├── exports/
│   └── Licencias - Febrero 2026.xlsx
├── ONEDRIVE_SETUP.md           ← NUEVO (8 pasos)
├── ONEDRIVE_QUICK_START.md     ← NUEVO (resumen rápido)
├── test-onedrive-connection.js ← NUEVO (diagnóstico)
└── docs/
    ├── README.md
    ├── SETUP_WINDOWS.md
    ├── USER_MANUAL.md
    └── ...
```

---

## 🔍 Verificación

### Logs Esperados (npm start)
```
✓ Autenticación con Azure inicializada correctamente
  - Usuario: Tu Nombre

╔════════════════════════════════════════════╗
║   Sistema de Control de Licencias          ║
║   Servidor ejecutándose en:                ║
║   http://localhost:3000                    ║
╚════════════════════════════════════════════╝
```

### Después de Registrar
```
✓ Excel local creado/actualizado: Licencias - Febrero 2026.xlsx
✓ Archivo subido a OneDrive: Licencias - Febrero 2026.xlsx
✓ Datos guardados en JSON
```

---

## 🛡️ Seguridad

✅ El secreto de Azure en `.env` es único por instalación  
✅ Credenciales no se comparten públicamente  
✅ `.gitignore` previene upload accidental  
✅ OneDrive proporciona auditoría de acceso  
✅ Microsoft 365 incluye encriptación  

---

## 📞 Soporte

### Si algo falla:

1. **Verificar variables de entorno**
   ```powershell
   Get-Content .env
   ```

2. **Ejecutar diagnóstico**
   ```powershell
   node test-onedrive-connection.js
   ```

3. **Ver logs del servidor**
   ```powershell
   npm start  # (salida en consola)
   ```

4. **Consultar documentación**
   - [ONEDRIVE_SETUP.md](ONEDRIVE_SETUP.md) - Guía completa
   - [ONEDRIVE_QUICK_START.md](ONEDRIVE_QUICK_START.md) - Guía rápida

---

## ✅ Checklist de Implantación

- [ ] Leer ONEDRIVE_SETUP.md
- [ ] Crear aplicación en Azure Portal
- [ ] Obtener Tenant ID, Client ID, Secret
- [ ] Crear archivo .env
- [ ] `npm install` (instalar dependencias)
- [ ] `node test-onedrive-connection.js` (verificar)
- [ ] `npm start` (iniciar servidor)
- [ ] Probar formulario
- [ ] Verificar en OneDrive
- [ ] Verificar archivos locales
- [ ] ¡Sistema listo!

---

## 📅 Timeline

- **Febrero 10, 2026**: Cambio de Google Drive a OneDrive
- **Razón**: Google Drive no funciona con Service Accounts personales
- **Solución**: Usar Microsoft Graph API con Azure AD
- **Status**: ✅ Implementado y documentado

---

## 🎯 Siguiente

1. Sigue los pasos en [ONEDRIVE_SETUP.md](ONEDRIVE_SETUP.md)
2. Configura Azure
3. Crea `.env`
4. Ejecuta `npm install && npm start`
5. ¡Disfruta OneDrive sincronizado automáticamente!

---

*Documentación: Febrero 2026*
