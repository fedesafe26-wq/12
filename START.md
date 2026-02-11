# 🎯 INICIO RÁPIDO - System Implementado con Dropbox

## ✅ Sistema Actualizado a Dropbox

Tu aplicación ahora usa **Dropbox** para sincronizar archivos Excel automáticamente.

**¿Por qué Dropbox?**
- ✅ Sin complicaciones (no requiere Azure)
- ✅ Súper fácil de configurar (5 pasos)
- ✅ Gratuito (2 GB)
- ✅ Confiable y rápido

---

## 🚀 Pasos para Empezar (5 Minutos)

### PASO 1: Abre [DROPBOX_QUICK_START.md](DROPBOX_QUICK_START.md)

Este archivo tiene los **5 pasos rápidos**:
1. Abrir Dropbox Developers
2. Crear aplicación
3. Generar token
4. Crear archivo `.env`
5. ¡Listo!

⏱️ **Tiempo**: ~5 minutos

---

### PASO 2: Obtén el Token

Al seguir DROPBOX_QUICK_START.md:
- Entrarás a https://www.dropbox.com/developers/apps
- Crearás una app
- Generarás un token
- Copiarás el token (formato: `sl.XXXXXX...`)

---

### PASO 3: Crea Archivo `.env`

**Abre Notepad** y escribe:

```env
PORT=3000
DROPBOX_ACCESS_TOKEN=sl.tuTokenAqui
DROPBOX_FOLDER_PATH=/Licencias Instituto
```

Reemplaza `sl.tuTokenAqui` con tu token.

**Guarda como**: `.env` (sin extensión .txt)  
**Ubicación**: `c:\Projects\Form\.env`

---

### PASO 4: Prueba la Conexión

En PowerShell:

```powershell
cd c:\Projects\Form
node test-dropbox-connection.js
```

Deberías ver:
```
✓ Usuario autenticado correctamente
✓ Acceso a archivos OK
✅ TODAS LAS VERIFICACIONES PASARON
```

Si hay error → lee el error o consulta DROPBOX_SETUP.md

---

### PASO 5: Inicia el Servidor

```powershell
npm install
npm start
```

Deberías ver:
```
✓ Autenticación con Dropbox inicializada correctamente
  - Usuario: Tu Nombre
  - Email: tu@email.com

╔════════════════════════════════════════════╗
║   Sistema de Control de Licencias          ║
║   Servidor ejecutándose en:                ║
║   http://localhost:3000                    ║
╚════════════════════════════════════════════╝
```

---

### PASO 6: Prueba el Formulario

1. Abre en navegador: http://localhost:3000
2. Completa el formulario
3. Haz clic: **"Registrar Licencia"**
4. Verás: "✓ ¡Registrado Exitosamente!"

---

### PASO 7: Verifica los Datos

Deberías encontrar:

**En Dropbox (nube)**:
- Abre https://www.dropbox.com/
- Carpeta: `/Licencias Instituto`
- Archivo: `Licencias - Febrero 2026.xlsx`

**En tu PC**:
- Carpeta: `c:\Projects\Form\exports\`
- Archivo: `Licencias - Febrero 2026.xlsx`

**En JSON**:
- Archivo: `c:\Projects\Form\licencias_data.json`

---

## 📚 Documentación

| Documento | Para |
|-----------|------|
| **[DROPBOX_QUICK_START.md](DROPBOX_QUICK_START.md)** | Los 5 pasos quick (LEE ESTO PRIMERO) |
| **[DROPBOX_SETUP.md](DROPBOX_SETUP.md)** | Guía detallada |
| **test-dropbox-connection.js** | Script para verificar |
| **dropboxService.js** | Código de integración |

---

## 🔍 Solución Rápida de Problemas

| Problema | Solución |
|----------|----------|
| "DROPBOX_ACCESS_TOKEN is not defined" | Crear archivo `.env` |
| "Invalid access token" | Copiar token sin espacios |
| "No sincroniza a Dropbox" | Ejecutar `node test-dropbox-connection.js` |
| "Solo guarda localmente" | Es normal si no hay token, verifica `.env` |

---

## 💡 En Resumen

```
Antes (Google Drive - NO funcionaba):
  ❌ Service Accounts sin cuota
  ❌ Errores de almacenamiento
  ❌ Sincronización fallida

Después (OneDrive - Complicado):
  ⚠️ Requería Azure
  ⚠️ Muchos pasos

Ahora (Dropbox - SIMPLE):
  ✅ Sin complicaciones
  ✅ 5 pasos
  ✅ Gratuito
  ✅ Funciona inmediatamente
```

---

## ✨ Lo Que Sucede Automáticamente

```
1. Usuario registra en formulario
        ↓
2. Sistema genera Excel ("Licencias - Febrero 2026.xlsx")
        ↓
3. Excel se sincroniza a Dropbox automáticamente ☁️
        ↓
4. Se guarda copia local (/exports/)
        ↓
5. Se respalda en JSON (licencias_data.json)
```

Cada registro agrega una fila nueva al Excel en Dropbox.

---

## 🎯 Próximo Paso

**→ Abre ahora: [DROPBOX_QUICK_START.md](DROPBOX_QUICK_START.md)**

Son solo **5 pasos y ~5 minutos**.

---

## 📞 Necesitas Ayuda?

1. **Lee DROPBOX_QUICK_START.md** - Pasos rápidos
2. **Consulta DROPBOX_SETUP.md** - Detalles completos
3. **Ejecuta**: `node test-dropbox-connection.js` - Diagnóstico automático
4. **Revisa los logs**: cuando ejecutas `npm start`

---

## ✅ Checklist Final

- [ ] Leí DROPBOX_QUICK_START.md
- [ ] Creé aplicación en https://www.dropbox.com/developers/apps
- [ ] Generé token de acceso
- [ ] Creé archivo `.env` con el token
- [ ] Ejecuté `npm install && npm start`
- [ ] Ejecuté `node test-dropbox-connection.js` (pasó)
- [ ] Probé el formulario (registré una licencia)
- [ ] Verifiqué Dropbox tiene el archivo
- [ ] Verifiqué archivo local en /exports/
- [ ] ¡SISTEMA LISTO! 🎉

---

**¿Listo? ⏱️ Tiempo estimado: 5-10 minutos**

→ [DROPBOX_QUICK_START.md](DROPBOX_QUICK_START.md)

