# 🎉 OneDrive Implementado - Guía Rápida

## ✅ Lo Que Cambió

**ANTES**: Excel local + JSON  
**AHORA**: Excel sincronizado a OneDrive automáticamente + Excel local + JSON

---

## 🚀 Pasos Rápidos para Empezar

### 1️⃣ Configura Azure (5 minutos)
Lee: [ONEDRIVE_SETUP.md](ONEDRIVE_SETUP.md)

Obtén:
- `AZURE_TENANT_ID`
- `AZURE_CLIENT_ID`
- `AZURE_CLIENT_SECRET`

### 2️⃣ Crea archivo `.env`

```env
PORT=3000
AZURE_TENANT_ID=tu-tenant-id-aqui
AZURE_CLIENT_ID=tu-client-id-aqui
AZURE_CLIENT_SECRET=tu-secreto-aqui
ONEDRIVE_FOLDER_PATH=/Licencias Instituto
```

Guarda en: `c:\Projects\Form\.env`

### 3️⃣ Instala y prueba

```powershell
cd c:\Projects\Form
npm install
```

### 4️⃣ Verifica la conexión

```powershell
node test-onedrive-connection.js
```

Debería mostrar:
```
✓ Usuario autenticado correctamente
✓ OneDrive accesible
✅ TODAS LAS VERIFICACIONES PASARON
```

### 5️⃣ Inicia el servidor

```powershell
npm start
```

Debería mostrar:
```
✓ Autenticación con Azure inicializada correctamente
  - Usuario: Tu Nombre

╔════════════════════════════════════════════╗
║   Sistema de Control de Licencias          ║
║   Servidor ejecutándose en:                ║
║   http://localhost:3000                    ║
╚════════════════════════════════════════════╝
```

### 6️⃣ Prueba el formulario

1. Abre: http://localhost:3000
2. Completa el formulario
3. Haz clic: "Registrar Licencia"
4. Verifica en OneDrive: https://onedrive.live.com/

---

## 📊 Flujo de Datos

```
Registro en Formulario
  ↓
  ├─→ Excel → OneDrive (nube)
  ├─→ Excel → /exports/ (local)
  └─→ JSON → licencias_data.json (backup)
```

---

## 🔍 Verificación Final

Después de registrar una licencia:

- [ ] Modal "¡Registrado Exitosamente!" aparece
- [ ] Archivo Excel en OneDrive: `/Licencias Instituto/Licencias - [Mes].xlsx`
- [ ] Archivo Excel local: `c:\Projects\Form\exports\Licencias - [Mes].xlsx`
- [ ] Datos en JSON: `c:\Projects\Form\licencias_data.json`

Si todo está verde: **¡Sistema listo para producción!** ✅

---

## 📚 Documentación Completa

| Documento | Para Qué |
|-----------|----------|
| [ONEDRIVE_SETUP.md](ONEDRIVE_SETUP.md) | Configuración detallada de Azure |
| [test-onedrive-connection.js](test-onedrive-connection.js) | Verificar conexión |
| [oneDriveService.js](oneDriveService.js) | Código de integración |

---

## 💡 Características

✅ Excel sincronizado automáticamente  
✅ Acceso desde cualquier dispositivo (OneDrive)  
✅ Backup automático en la nube  
✅ Excel local como respaldo  
✅ Datos siempre disponibles (JSON backup)  
✅ Sin dependencia de cuota de almacenamiento personal  

---

## 🆘 Troubleshooting

### "Error: AZURE_TENANT_ID is not defined"
→ Falta el archivo `.env`  
→ Crear `.env` en `c:\Projects\Form\`

### "Error: Unauthorized"
→ Credenciales incorrectas  
→ Ejecutar: `node test-onedrive-connection.js`

### "OneDrive no sincroniza pero servidor funciona"
→ Permisos no asignados en Azure  
→ Ir a Azure Portal → Marcar "Conceder consentimiento del administrador"

### "Funciona sin OneDrive"
→ Eso es normal si no hay credenciales  
→ El sistema guarda localmente automáticamente

---

¿Listo? ¡Sigue los pasos en [ONEDRIVE_SETUP.md](ONEDRIVE_SETUP.md)! 🚀
