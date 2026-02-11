# ✅ OneDrive - Integración Completada

## ¿Qué Cambió?

En lugar de Excel local, ahora:
- ✅ **Excel se sincroniza automáticamente a tu OneDrive**
- ✅ **Accesible desde cualquier dispositivo**
- ✅ **Backup automático en la nube**
- ✅ **Compartible fácilmente**

---

## 🚀 Configuración de OneDrive (Paso a Paso)

### Paso 1: Crear Aplicación en Azure Portal

1. Ir a: https://portal.azure.com/
2. Iniciar sesión con tu cuenta Microsoft (Office 365/OneDrive)
3. En el menú, buscar: **"Registros de aplicaciones"**
4. Hacer clic: **"Nuevo registro"**

### Paso 2: Llenar Detalles de Aplicación

1. **Nombre**: `Sistema de Licencias`
2. **Tipos de cuenta admitidos**: Selecciona `Cuentas en este directorio organizativo únicamente`
3. **URI de redirección**: Selecciona **Web** y escribe:
   ```
   http://localhost:3000
   ```
4. Hacer clic: **"Registrar"**

### Paso 3: Obtener el Tenant ID

Cuando se cree la aplicación, verás:
- **ID de aplicación (cliente)** → Copiar esto
- **ID del directorio (inquilino)** → Copiar esto también

Guarda ambos. Los usarás en el `.env`

### Paso 4: Crear Secreto de Cliente

1. En la página de la aplicación, ir a: **"Certificados y secretos"**
2. Hacer clic: **"Nuevo secreto de cliente"**
3. **Descripción**: `Sistema Licencias`
4. **Expira**: Selecciona `24 meses`
5. Hacer clic: **"Agregar"**

Se creará un secreto. **COPIA EL VALOR** (no el ID del secreto)
- ⚠️ **Solo se muestra una vez**, guárdalo bien

### Paso 5: Dar Permisos de API

1. En la página de la aplicación, ir a: **"Permisos de API"**
2. Hacer clic: **"Agregar un permiso"**
3. Selecciona: **"Microsoft Graph"**
4. Selecciona: **"Permisos de aplicación"**

Busca y selecciona estos permisos:
- `Files.ReadWrite.All` (Leer y escribir archivos)
- `Sites.ReadWrite.All` (Leer y escribir sitios)

5. Hacer clic: **"Agregar permisos"**

### Paso 6: Dar Consentimiento del Administrador

1. En la página de permisos, verás un botón: **"Conceder consentimiento del administrador para [Tu Empresa]"**
2. Hacer clic en él
3. Confirmar

---

## 📝 Configurar el Sistema

### Crear archivo `.env`

1. Abre Notepad

2. Copia esto:

```env
PORT=3000
AZURE_TENANT_ID=aqui-tu-tenant-id
AZURE_CLIENT_ID=aqui-tu-client-id
AZURE_CLIENT_SECRET=aqui-tu-client-secret
ONEDRIVE_FOLDER_PATH=/Licencias Instituto
```

3. **Reemplaza**:
   - `aqui-tu-tenant-id` = ID del directorio (Paso 3)
   - `aqui-tu-client-id` = ID de aplicación (Paso 3)
   - `aqui-tu-client-secret` = Secreto creado (Paso 4)
   - `/Licencias Instituto` = Nombre de la carpeta (puede cambiar)

### Ejemplo `.env`:

```env
PORT=3000
AZURE_TENANT_ID=12345678-1234-1234-1234-123456789012
AZURE_CLIENT_ID=87654321-4321-4321-4321-210987654321
AZURE_CLIENT_SECRET=abc123XyZ_9876543210abcdef.
ONEDRIVE_FOLDER_PATH=/Licencias Instituto
```

4. Guarda como: `.env` (sin extensión .txt)
5. Coloca en: `c:\Projects\Form\.env`

---

## ✅ Probando

### Paso 1: Actualizar dependencias

```powershell
cd c:\Projects\Form
npm install
```

### Paso 2: Reiniciar servidor

```powershell
npm start
```

Deberías ver:
```
✓ Autenticación con Azure inicializada correctamente
  - Usuario: [Tu Nombre]
```

### Paso 3: Probar formulario

1. Abre: http://localhost:3000
2. Completa el formulario
3. Haz clic: "Registrar Licencia"
4. Verás: "✓ ¡Registrado Exitosamente!"

### Paso 4: Verificar en OneDrive

1. Abre: https://onedrive.live.com/
2. Busca la carpeta: **"Licencias Instituto"**
3. Dentro encontrarás: `Licencias - Febrero 2026.xlsx` (o el mes actual)
4. Abre el archivo → Verás los datos

### Paso 5: Verificar local

En `c:\Projects\Form\exports\` también verás el mismo Excel (copia local)

---

## 🎯 Flujo Completo

```
Usuario registra en formulario
          ↓
Datos se envían al servidor
          ↓
      oneDriveService
          ↓
    ┌─────┴─────┬──────────┐
    ↓           ↓          ↓
OneDrive  Excel Local  JSON Local
(Nube)    (/exports/)  (backup)
```

Cada registro:
1. Se sube a OneDrive (en la nube)
2. Se guarda localmente en Excel
3. Se respalda en JSON

---

## 📊 Estructura del Excel

El archivo Excel en OneDrive contiene:

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

## 🔄 Sincronización Automática

### Primero acceso
- Se crea carpeta `Licencias Instituto` en OneDrive
- Se crea archivo `Licencias - [Mes].xlsx`

### Registros posteriores
- Se abren automáticamente el archivo
- Se agrega una nueva fila
- Se sincroniza con OneDrive

### Si OneDrive no está disponible
- El sistema guarda localmente
- Cuando se reconecte, subirá los cambios
- No se pierden datos

---

## 🔒 Seguridad

⚠️ **IMPORTANTE**:
- El archivo `.env` contiene credenciales sensibles
- **NUNCA compartir públicamente**
- **NUNCA subir a GitHub o internet**
- El secreto en `.env` no se debe mostrar

El archivo `.gitignore` ya está configurado para ignorar `.env`.

### Renovar Secreto

Cada 24 meses, el secreto expira. Antes de que expire:
1. Ir a Azure Portal → Aplicación
2. Ir a: "Certificados y secretos"
3. Crear nuevo secreto
4. Actualizar el valor en `.env`

---

## 🆘 Solución de Problemas

### "Error: Unauthorized"
**Causa**: Las credenciales son incorrectas  
**Solución**:
- Verificar que `AZURE_CLIENT_ID`, `AZURE_CLIENT_SECRET` y `AZURE_TENANT_ID` sean exactos
- No deben tener espacios ni caracteres especiales
- Copiar desde Azure Portal nuevamente

### "Error: Permission denied"
**Causa**: Los permisos no están asignados  
**Solución**:
- En Azure Portal → Permisos de API
- Verificar que estén asignados:
  - `Files.ReadWrite.All`
  - `Sites.ReadWrite.All`
- Hacer clic: "Conceder consentimiento del administrador"

### "Servidor funciona pero OneDrive no se sincroniza"
**Causa**: Credenciales no configuradas  
**Solución**:
- Verificar que `.env` existe en `c:\Projects\Form\`
- Reiniciar com `npm start`
- Ver mensaje de inicio que debe decir: "Autenticación con Azure inicializada correctamente"

### "Error: The user's OneDrive quota has been exceeded"
**Causa**: Tu OneDrive está lleno  
**Solución**:
- Liberar espacio en OneDrive
- Eliminar archivos innecesarios
- Los datos seguirán guardándose localmente

### Los datos no aparecen en OneDrive pero sí localmente
**Causa**: Conexión a internet o problema temporal  
**Solución**:
- Reiniciar servidor: `npm start`
- Verificar conexión a internet
- Los datos ya están resguardados localmente

---

## 💡 Características Adicionales

### Descargar el Excel desde OneDrive
1. Abre OneDrive: https://onedrive.live.com/
2. Click derecho en archivo
3. Selecciona: "Descargar"

### Compartir con otros
1. Abre OneDrive
2. Click derecho en carpeta "Licencias Instituto"
3. "Compartir"
4. Ingresa emails de personas

### Acceder desde el móvil
1. Descarga app "OneDrive" (iOS/Android)
2. Inicia sesión con tu cuenta Microsoft
3. Verás la carpeta "Licencias Instituto"
4. Los datos se sincronizan automáticamente

---

## 📊 Resumen de Ventajas

✅ **Datos en la nube** - Accesibles desde cualquier lugar  
✅ **Sincronización automática** - No requiere acciones manuales  
✅ **Backup en OneDrive** - Seguridad adicional  
✅ **Excel local también** - Obra sin internet si es necesario  
✅ **Compartible** - Fácil compartir con el equipo  
✅ **Sin errores de cuota** - A diferencia de Google Drive  
✅ **Integración Microsoft** - Compatible con Office 365  

---

## 🎉 ¡Sistema Listo!

Tu sistema ahora:
- ✅ Excel se sincroniza a OneDrive automáticamente
- ✅ Datos resguardados en la nube
- ✅ Accesible desde cualquier dispositivo
- ✅ Backup local + JSON

**Próximo paso**: Crear el archivo `.env` con tus credenciales de Azure y reiniciar.

---

Documentación actualizada: Febrero 2026
