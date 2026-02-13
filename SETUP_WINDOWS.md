# Guía de Instalación - Windows

## Paso 1: Instalar Node.js

1. Descargar desde [nodejs.org](https://nodejs.org/) la versión LTS
2. Ejecutar el instalador y seguir los pasos
3. Verificar que se instaló correctamente abriendo PowerShell o CMD y ejecutar:

```powershell
node --version
npm --version
```

## Paso 2: Descargar el Proyecto

1. La carpeta del proyecto ya está en: `c:\Projects\Form`
2. Abrir PowerShell o CMD en esa ruta:

```powershell
cd c:\Projects\Form
```

## Paso 3: Instalar Dependencias

```powershell
npm install
```

Esto descargará todos los paquetes necesarios.

## Paso 4: Configurar Google Drive (COMPLETAMENTE OPCIONAL)

⚠️ **IMPORTANTE**: 
- Google Drive es **100% opcional**
- Sin Google Drive, los datos se guardan en `licencias_data.json` (tu PC)
- El sistema funciona perfecto sin Google Drive

Si deseas que los datos se guarden en Google Drive, tienes estas opciones:

### Opción A: Usar Google Sheets (Recomendado con Service Account)
Google Sheets funciona mejor con Service Accounts.

### Opción B: Google Drive (Requiere más configuración)

Sigue estos pasos si quieres intentarlo:

### 4.1 Crear Proyecto en Google Cloud

1. Ir a https://console.cloud.google.com/
2. Iniciar sesión con cuenta de Google
3. Hacer clic en "Seleccionar un proyecto" → "Nuevo proyecto"
4. Nombre: `License Management System`
5. Hacer clic en "Crear"

### 4.2 Habilitar Google Drive API

1. En Google Cloud Console, ir a "APIs y servicios" → "Biblioteca"
2. Buscar "Google Drive API"
3. Hacer clic en ella
4. Hacer clic en "Habilitar"

### 4.3 Crear Credenciales

1. Ir a "APIs y servicios" → "Credenciales"
2. Hacer clic en "Crear credenciales" → "Cuenta de servicio"
3. Rellenar:
   - **Nombre de la cuenta de servicio**: `license-app`
   - **ID de la cuenta de servicio**: Se auto-completa
4. Hacer clic en "Crear y continuar"
5. En "Otorgar acceso a esta cuenta de servicio (opcional)", hacer clic en "Continuar"
6. Hacer clic en "Realizado"

### 4.4 Descargar Credenciales JSON

1. En Credenciales, buscar la cuenta de servicio `license-app` recién creada
2. Hacer clic en ella
3. Ir a la pestaña "Claves"
4. Hacer clic en "Agregar clave" → "Crear clave nueva"
5. Seleccionar formato "JSON"
6. Hacer clic en "Crear"
7. Se descargará un archivo JSON - **guardar en lugar seguro**

### 4.5 Crear Carpeta en Google Drive

1. Ir a https://drive.google.com/
2. Hacer clic derecho en el área vacía → "Nueva carpeta"
3. Nombre: `Instituto - Control de Licencias`
4. Hacer clic en "Crear"
5. Entrar en la carpeta
6. Copiar el ID de la URL (entre `/folders/` y `/edit`):
   ```
   https://drive.google.com/drive/folders/[AQUI-ESTA-EL-ID]/edit
   ```

### 4.6 Compartir Carpeta con la Cuenta de Servicio

1. En Google Drive, dentro de la carpeta `Instituto - Control de Licencias`
2. Hacer clic en "Compartir"
3. Email de la cuenta de servicio (está en el JSON): `license-app@[proyecto-id].iam.gserviceaccount.com`
4. Permisos: "Editor"
5. Hacer clic en "Compartir"

### 4.7 Crear archivo .env

1. Abrir editor de texto (Notepad)
2. Crear nuevo archivo con este contenido:

```env
PORT=3000
GOOGLE_DRIVE_FOLDER_ID=TU_FOLDER_ID_AQUI
GOOGLE_CREDENTIALS_JSON={"type":"service_account",...}
```

Reemplazar:
- `TU_FOLDER_ID_AQUI` con el ID copiado en 4.5
- `{"type":"service_account",...}` con el contenido completo del archivo JSON descargado en 4.4

3. Guardar como `.env` (sin extensión txt) en la carpeta `c:\Projects\Form\`

**IMPORTANTE**: El archivo `.env` contiene información sensible. **NUNCA compartir públicamente ni subirlo a internet**.

## Paso 5: Ejecutar la Aplicación

```powershell
cd c:\Projects\Form
npm start
```

Deberías ver algo como:

```
╔════════════════════════════════════════════╗
║   Sistema de Control de Licencias          ║
║   Servidor ejecutándose en:                ║
║   http://localhost:3000                    ║
╚════════════════════════════════════════════╝
```

## Paso 6: Acceder a la Aplicación

Abrir navegador en: **http://localhost:3000**

## Uso Daily

Cada vez que quieras usar la aplicación:

```powershell
cd c:\Projects\Form
npm start
```

El servidor se ejecutará en http://localhost:3000

Para detener el servidor: `Ctrl + C`

## Solución de Problemas Comunes

### "Error: Google Drive no está configurado"

**Solución**: Es NORMAL y ESPERADO. Las credenciales no están configuradas.
```
El sistema seguirá guardando localmente en licencias_data.json
Esto es perfectamente funcional.
```

Si deseas Google Drive:
- Ver: GOOGLE_DRIVE_ERROR_FIX.md

### "Error: Service Accounts do not have storage quota"

**Solución**: Las Service Accounts NO tienen cuota en Google Drive.

Opciones:
1. Usa almacenamiento local (recomendado)
2. Cambia a Google Sheets en lugar de Google Drive
3. Usa OAuth en lugar de Service Account

Ver: GOOGLE_DRIVE_ERROR_FIX.md para detalles.

### "npm: el término 'npm' no se reconoce"

**Solución**: Node.js no está instalado. Ir a paso 1.

### "Error: Cannot find module 'express'"

**Solución**: Las dependencias no se instalaron. Ejecutar:
```powershell
npm install
```

### "Error: EACCES: permission denied"

**Solución**: PowerShell requiere permisos. Ejecutar PowerShell como Administrador.

### "Error: listen EADDRINUSE: address already in use :::3000"

**Solución**: El puerto 3000 está en uso. Cambiar puerto en `.env`:
```env
PORT=3001
```

### Google Drive no funciona

**Solución**: 
1. Verificar que Google Drive no está configurado es NORMAL - la app seguirá funcionando con almacenamiento local
2. Si necesitas Google Drive, revisar que `.env` está correctamente configurado
3. Ver logs en PowerShell para mensajes de error específicos

## Información sobre Almacenamiento

### Sin Google Drive Configurado
- Los datos se guardan en `licencias_data.json`
- Local en tu computadora
- Perfecto para pruebas y uso offline

### Con Google Drive Configurado
- Se crea automáticamente carpeta con mes/año actual
- Se genera archivo Excel mensual
- Datos almacenados en la nube de forma segura
- Accesible desde cualquier lugar

## Cambiar Puerto

Si el puerto 3000 está en uso, editar `.env`:

```env
PORT=3001
```

Luego acceder a: http://localhost:3001

## Desarrollo

Si quieres modificar el código:

1. Instalar nodemon para auto-reinicio:
```powershell
npm install --save-dev nodemon
```

2. Ejecutar con:
```powershell
npm run dev
```

El servidor se reinicia automáticamente cuando cambias archivos.

## Notas de Seguridad

✅ **Haz esto**:
- Mantener `.env` privado
- No compartir credenciales de Google
- Usar carpetas compartidas solo con personal autorizado

❌ **NO hagas esto**:
- Subir `.env` a GitHub o compartir
- Incluir credenciales en emails
- Compartir URL del servidor con extraños

---

¿Necesitas ayuda? Revisar la sección "Solución de Problemas" en README.md
