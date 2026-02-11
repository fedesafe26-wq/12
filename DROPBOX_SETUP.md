# ✅ Dropbox - Integración Simple y Rápida

## 🎯 Lo Que Hace Ahora

Con Dropbox:
- ✅ **Excel se sincroniza automáticamente a Dropbox**
- ✅ **Accesible desde cualquier dispositivo**
- ✅ **Backup automático en la nube**
- ✅ **Compartible fácilmente**
- ✅ **Configuración en 5 minutos**
- ✅ **Gratuito (hasta 2 GB)**

---

## 🚀 Configuración Rápida (5 Pasos)

### Paso 1: Abre Dropbox App Console

1. Ir a: https://www.dropbox.com/developers/apps
2. **Si no tienes cuenta**: Crear una en https://www.dropbox.com/
3. Iniciar sesión

### Paso 2: Crear Nueva Aplicación

1. Hacer clic: **"Create App"**
2. Selecciona:
   - **API**: `Scoped access`
   - **Type**: `Full Dropbox`
   - **Name**: `Sistema de Licencias`
3. Hacer clic: **"Create app"**

### Paso 3: Obtener Token de Acceso

1. En la página de la aplicación, ir a: **"OAuth 2"`**
2. En la sección **"Access tokens"**:
   - Hacer clic: **"Generate"** (en la sección de token de corta duración)
   - Se crea un token automáticamente

⚠️ **IMPORTANTE**: Copia ese token (aparece una sola vez)

Formato del token:
```
sl.XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
```

### Paso 4: Asignar Permisos

En la misma página, ve a **"Permissions"** y asegúrate que estén:
- ✅ `files.content.write` (escribir archivos)
- ✅ `files.content.read` (leer archivos)

Si no están, haz clic en **"Review"** y agrega los permisos.

### Paso 5: Crear Archivo `.env`

1. Abre Notepad
2. Escribe:

```env
PORT=3000
DROPBOX_ACCESS_TOKEN=sl.tuTokenAquiSinEspacios
DROPBOX_FOLDER_PATH=/Licencias Instituto
```

**Reemplaza**:
- `sl.tuTokenAquiSinEspacios` = Token obtenido en Paso 3

3. Guarda como: `.env` (sin extensión .txt)
4. Coloca en: `c:\Projects\Form\.env`

### Ejemplo `.env`:

```env
PORT=3000
DROPBOX_ACCESS_TOKEN=sl.B1a2C3d4E5f6G7h8I9j0K1l2M3n4O5p6Q7r8S9t0U
DROPBOX_FOLDER_PATH=/Licencias Instituto
```

---

## ✅ Verificando Que Funciona

### Paso 1: Reinstalar dependencias

```powershell
cd c:\Projects\Form
npm install
```

### Paso 2: Probar conexión

```powershell
node test-dropbox-connection.js
```

Debería ver:
```
✓ Usuario autenticado correctamente
✓ Acceso a Dropbox OK
✅ TODAS LAS VERIFICACIONES PASARON
```

### Paso 3: Iniciar servidor

```powershell
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

### Paso 4: Prueba el formulario

1. Abre: http://localhost:3000
2. Completa el formulario
3. Haz clic: "Registrar Licencia"
4. Verás: "✓ ¡Registrado Exitosamente!"

### Paso 5: Verifica en Dropbox

1. Abre: https://www.dropbox.com/
2. Busca la carpeta: **"Licencias Instituto"**
3. Abre la carpeta
4. Verás: `Licencias - Febrero 2026.xlsx`

---

## 🎯 Flujo Completo

```
Usuario registra en formulario
          ↓
Datos se envían al servidor
          ↓
      dropboxService
          ↓
    ┌─────┴─────┬──────────┐
    ↓           ↓          ↓
Dropbox   Excel Local  JSON Local
(Nube)    (/exports/)  (backup)
```

---

## 📊 Características del Excel

El archivo Excel en Dropbox contiene:

| Columna | Contenido |
|---------|-----------|
| Fecha/Hora | Cuándo se registró |
| Nombre | Nombre de la persona |
| Apellido | Apellido |
| DNI | Documento de identidad |
| Email | Correo electrónico |
| Celular | Teléfono |
| Fecha Inicio | Inicio de la licencia |
| Fecha Fin | Fin de la licencia |
| Motivo | Por qué se solicita |
| Artículo | Artículo asociado |
| Funciones | Funciones asignadas |
| Observaciones | Notas adicionales |

---

## 🔄 Cómo Funciona la Sincronización

### Primer registro
- Se crea carpeta `Licencias Instituto` en Dropbox
- Se crea archivo `Licencias - Febrero 2026.xlsx`
- Se agrega primer dato

### Registros posteriores
- Se abre el archivo Excel existente
- Se agrega nueva fila
- Se sincroniza con Dropbox automáticamente

### Si estás sin internet
- El archivo se guarda localmente
- Cuando reconecte, se sincronizará automáticamente

---

## 📱 Acceder desde Móvil

1. Descarga la app **"Dropbox"** (iOS/Android)
2. Inicia sesión con tu cuenta
3. Busca carpeta "Licencias Instituto"
4. Los archivos están sincroniados automáticamente
5. Puedes verlos incluso sin internet (si los descarga)

---

## 🔐 Seguridad

⚠️ **IMPORTANTE**:
- El archivo `.env` contiene el token de Dropbox
- **NUNCA compartir el token públicamente**
- **NUNCA subir .env a GitHub**
- El archivo `.gitignore` evita que se suba accidentalmente

### Si necesitas cambiar el token

1. Ir a: https://www.dropbox.com/developers/apps
2. Selecciona tu aplicación
3. En **"OAuth 2"**, busca el token anterior
4. Haz clic en la papelera (eliminar)
5. Genera un nuevo token
6. Actualiza `.env`

---

## 🆘 Solución de Problemas

### "Error: DROPBOX_ACCESS_TOKEN is not defined"
**Causa**: No existe `.env`  
**Solución**: Crear archivo `.env` en `c:\Projects\Form\`

### "Error: Invalid access token"
**Causa**: Token incorrecto o expirado  
**Solución**:
- Verificar que el token esté sin espacios ni caracteres especiales
- Generar un nuevo token en Dropbox App Console

### "Servidor funciona pero Dropbox no sincroniza"
**Causa**: Credenciales no configuradas  
**Solución**:
- Ejecutar: `node test-dropbox-connection.js`
- Ver los mensajes de error

### "Error: Path/conflict/file_exists"
**Causa**: El archivo ya existe  
**Solución**: Es normal, el sistema actualiza el archivo existente automáticamente

### Los datos se guardan localmente pero no en Dropbox
**Causa**: Token inválido o sin permisos  
**Solución**:
- Ejecutar diagnóstico: `node test-dropbox-connection.js`
- Verificar permisos en Dropbox App Console

---

## 💡 Ventajas de Dropbox

✅ **Gratuito** - 2 GB gratis (suficiente para Excel)  
✅ **Simple** - Solo necesitas generar un token  
✅ **Rápido** - Se sincroniza instantáneamente  
✅ **Confiable** - Dropbox es muy estable  
✅ **Multiplataforma** - Web, móvil, desktop  
✅ **Historial** - Dropbox guarda versiones antiguas  

---

## 🎉 ¡Listo!

Tu sistema ahora:
- ✅ Sincroniza Excel a Dropbox automáticamente
- ✅ Guarda copia local en `/exports/`
- ✅ Respalda datos en JSON
- ✅ Funciona sin Azure/Microsoft

**Próximo paso**: 
1. Seguir los 5 pasos anteriores
2. Crear `.env` con el token
3. Ejecutar `npm start`
4. ¡Disfrutar!

---

Documentación actualizada: Febrero 2026
