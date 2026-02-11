# 🚀 DROPBOX - Guía Rápida (5 Minutos)

## ✨ Lo Más Simple Posible

**Dropbox es la opción más fácil**:
- ✅ Sin verificación de identidad
- ✅ Token generado en segundos
- ✅ Gratuito (2 GB)
- ✅ Funciona inmediatamente

---

## 5 Pasos Rápidos

### 1️⃣ Abre Dropbox Developers
```
https://www.dropbox.com/developers/apps
```

Inicia sesión (crea cuenta si no tienes)

### 2️⃣ Crea Aplicación
- Clic: **"Create App"**
- Elige: **"Scoped access"** + **"Full Dropbox"**
- Nombre: `Sistema de Licencias`
- Clic: **"Create app"**

### 3️⃣ Genera Token
- Sección: **"OAuth 2"**
- Clic: **"Generate"** (en Access tokens)
- **COPIA el token** (aparece una sola vez)

Ejemplo:
```
sl.B1a2C3d4E5f6G7h8I9j0K1l2M3n4O5p6Q7r8S9t0U
```

### 4️⃣ Crea `.env`
Abre Notepad y escribe:

```env
PORT=3000
DROPBOX_ACCESS_TOKEN=sl.tuTokenAqui
DROPBOX_FOLDER_PATH=/Licencias Instituto
```

Reemplaza `sl.tuTokenAqui` con tu token.

Guarda como **`.env`** en `c:\Projects\Form\`

### 5️⃣ ¡Listo!
```powershell
npm install
npm start
```

Abre: http://localhost:3000

---

## ✅ Verificar que Funciona

```powershell
node test-dropbox-connection.js
```

Debería ver verde:
```
✓ Usuario autenticado correctamente
✓ Acceso a archivos OK
✅ TODAS LAS VERIFICACIONES PASARON
```

---

## 📍 Dónde Aparecen los Archivos

Después de registrar una licencia:

**En Dropbox (nube)**:
- https://www.dropbox.com/
- Carpeta: `/Licencias Instituto`
- Archivo: `Licencias - Febrero 2026.xlsx`

**En tu PC (local)**:
- `c:\Projects\Form\exports\Licencias - Febrero 2026.xlsx`

**JSON backup**:
- `c:\Projects\Form\licencias_data.json`

---

## 🎯 Flujo

```
Usuario registra
    ↓
Excel se crea
    ↓
Sube a Dropbox automáticamente ☁️
    ↓
Guardacopia local
    ↓
Respaldo en JSON
```

Cada registro agrega una línea nueva.

---

## 🆘 Si Algo Falla

| Error | Solución |
|-------|----------|
| "DROPBOX_ACCESS_TOKEN not in .env" | Crear `.env` con el token |
| "Invalid access token" | Copiar token sin espacios/caracteres |
| No sincroniza a Dropbox | Ejecutar `test-dropbox-connection.js` |
| "File exists" | Normal, se actualiza automático |

---

## 💡 Ventajas

✅ **Gratuito** - 2 GB es suficiente  
✅ **Rápido** - Sin complicaciones  
✅ **Confiable** - Dropbox es sólido  
✅ **Acceso móvil** - App de Dropbox  
✅ **Historial** - Guarda versiones viejas  

---

## 📚 Documentación Completa

Para detalles: [DROPBOX_SETUP.md](DROPBOX_SETUP.md)

---

**¿Listo?** Son solo **5 pasos y funciona** ✅
