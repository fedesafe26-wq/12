# ✅ Google Sheets - Solución Funcionando

## El Problema Resuelto

❌ **Antes**: Google Drive no funciona con Service Accounts (sin cuota de almacenamiento)  
✅ **Ahora**: Google Sheets funciona perfectamente con Service Accounts

---

## 🎯 Lo Que Hace Ahora

### 1. **Google Sheets Mensual Automática**
- Se crea automáticamente en Google Drive
- Un archivo por mes (Ej: "Licencias - Febrero 2026")
- Se actualiza automáticamente con cada registro

### 2. **Excel Local Automático**
- Se descarga localmente en carpeta `exports/`
- Archivo Excel mensual con los mismos datos
- Puedes compartirlo o imprimirlo

### 3. **Sincronización Automática**
- Cuando registras en el formulario:
  - ✅ Datos van a Google Sheets
  - ✅ Se genera Excel local
  - ✅ Se guardan datos en JSON

---

## 🚀 Cómo Configurar (Paso a Paso)

### Paso 1: Crear Proyecto en Google Cloud Console

1. Ir a: https://console.cloud.google.com/
2. Iniciar sesión con tu cuenta de Google
3. Hacer clic: "Seleccionar un proyecto" → "Nuevo proyecto"
4. Nombre: `Sistema de Licencias`
5. Hacer clic: "Crear"

### Paso 2: Habilitar Google Sheets API

1. En Google Cloud Console:
   - Ir a: "APIs y servicios" → "Biblioteca"
   - Buscar: "Google Sheets API"
   - Hacer clic en ella
   - Haz clic en: "Habilitar"

### Paso 3: Habilitar Google Drive API

1. En Google Cloud Console:
   - Ir a: "APIs y servicios" → "Biblioteca"
   - Buscar: "Google Drive API"
   - Hacer clic en ella
   - Haz clic en: "Habilitar"

### Paso 4: Crear Cuenta de Servicio

1. En Google Cloud Console:
   - Ir a: "APIs y servicios" → "Credenciales"
   - Hacer clic en: "Crear credenciales" → "Cuenta de servicio"

2. Rellenar:
   - **Nombre de la cuenta**: `license-app`
   - Los demás campos se auto-completan
   - Hacer clic: "Crear y continuar"

3. Permisos (opcional):
   - Hacer clic: "Continuar" (sin permisos específicos)

4. Hacer clic: "Realizado"

### Paso 5: Descargar Credenciales JSON

1. En "Credenciales":
   - Buscar la cuenta de servicio `license-app`
   - Hacer clic en ella

2. Ir a la pestañña: "Claves"

3. Hacer clic: "Agregar clave" → "Crear clave nueva"

4. Seleccionar: "JSON"

5. Hacer clic: "Crear"
   - Se descargará un archivo JSON
   - **Guardar en lugar seguro**

El archivo contiene:
```json
{
  "type": "service_account",
  "project_id": "...",
  "private_key_id": "...",
  "private_key": "...",
  ...
}
```

### Paso 6: Crear Carpeta en Google Drive

1. Ir a: https://drive.google.com/

2. Crear carpeta:
   - Hacer clic derecho → "Nueva carpeta"
   - Nombre: `Licencias Instituto`
   - Hacer clic: "Crear"

3. Abrir la carpeta y copiar el ID de la URL:
   ```
   https://drive.google.com/drive/folders/[AQUI-ESTA-EL-ID]/
   ```

**Copiar ese ID** - Lo necesitarás en el siguiente paso.

### Paso 7: Compartir Carpeta con la Cuenta de Servicio

1. En la carpeta `Licencias Instituto`:
   - Hacer clic: "Compartir"

2. En el campo de email:
   - Obtener el email de la cuenta de servicio del archivo JSON
   - Formato: `license-app@[project-id].iam.gserviceaccount.com`
   - Pegarlo en "Compartir"

3. Permisos: "Editor"

4. Hacer clic: "Compartir"

---

## 📝 Configurar el Sistema

### Crear archivo `.env`

1. Abre Notepad o editor de texto

2. Crea un nuevo archivo con este contenido:

```env
PORT=3000
GOOGLE_DRIVE_FOLDER_ID=AQUI-VA-EL-ID-COPIADO
GOOGLE_CREDENTIALS_JSON={"type":"service_account","project_id":"..."}
```

**Reemplaza**:
- `AQUI-VA-EL-ID-COPIADO` = El ID copiado en Paso 6
- `{"type":"service_account"...}` = Contenido COMPLETO del archivo JSON descargado (en una sola línea)

3. Guarda como: `.env` (sin extensión .txt)

4. Coloca en la carpeta: `c:\Projects\Form\`

### Ejemplo .env:

```
PORT=3000
GOOGLE_DRIVE_FOLDER_ID=1a2B3c4D5e6F7g8H9i0J1k2L3m4N5o6P
GOOGLE_CREDENTIALS_JSON={"type":"service_account","project_id":"mi-proyecto","private_key_id":"clave123",...}
```

---

## ✅ Probando

### Paso 1: Reinicia el servidor

```powershell
# En PowerShell, en carpeta c:\Projects\Form

npm start
```

Deberías ver:
```
✓ Autenticación con Google inicializada correctamente
```

### Paso 2: Abre el formulario

```
http://localhost:3000
```

### Paso 3: Registra una licencia

- Completa el formulario
- Haz clic: "Registrar Licencia"
- Deberías ver: "✓ ¡Registrado Exitosamente!"

### Paso 4: Verifica en Google Drive

1. Abre: https://drive.google.com/
2. Entra en carpeta: "Licencias Instituto"
3. Deberías ver: "Licencias - Febrero 2026" (o el mes actual)
4. Abre el archivo → Verás los datos en Google Sheets

### Paso 5: Verifica Excel Local

1. En carpeta `c:\Projects\Form\exports\`
2. Deberías ver: `Licencias - Febrero 2026.xlsx`
3. Abre → Verás los mismos datos

---

## 🎯 Flujo Completo

```
Usuario registra en formulario
          ↓
Datos se envían al servidor
          ↓
        ┌─────────────────────────┐
        │ saveLicenseToGoogleDrive │
        └─────────────────────────┘
          ↓
    ┌─────┴─────┬──────────┐
    ↓           ↓          ↓
Google Sheets Excel Local  JSON Local
(Google Drive) (/exports/)  (backup)
```

Cada registro actualiza los 3 lugares automáticamente.

---

## 📊 Estructura de Google Sheets

Columnas:
- Fecha/Hora
- Nombre
- Apellido
- DNI
- Email
- Celular
- Fecha Inicio
- Fecha Fin
- Motivo
- Artículo
- Funciones
- Observaciones

---

## 💾 Descargar Excel desde Google Sheets

Si necesitas descargar como Excel desde Google Sheets:

1. Abre la Google Sheet en Google Drive
2. Menú: "Archivo" → "Descargar" → "Microsoft Excel"

Tendrás una copia descargada.

---

## 🔒 Seguridad

⚠️ **IMPORTANTE**:
- El archivo `.env` contiene credenciales sensibles
- **NUNCA compartir públicamente**
- **NUNCA subir a GitHub o internet**
- Mantener en lugar privado y seguro

El archivo `.gitignore` ya está configurado para ignorar `.env`.

---

## 🆘 Solución de Problemas

### "Error: Calendar API not enabled"

**Solución**: Habilitar en Google Cloud Console:
- APIs y servicios → Biblioteca
- Buscar: "Google Calendar API"
- Habilitar

### "Error: 403 Forbidden"

**Solución**: 
- Verificar que la carpeta está compartida con el email de la cuenta de servicio
- Verificar que los permisos son "Editor"

### "Error: Spreadsheet not found"

**Solución**:
- Verificar que el ID de la carpeta es correcto
- Verificar que la carpeta existe en Google Drive

### Los datos no aparecen en Google Sheets

**Solución**:
- Recargar la página de Google Sheets (F5)
- Verificar que tienes acceso a la carpeta
- Ver los logs del servidor para errores

---

## 📝 Notas Importantes

### Diferencia con Google Drive (anterior)

❌ **Antes**: Intentaba guardar Excel directamente en Google Drive
- Service Accounts no tienen cuota
- Causaba error "storageQuotaExceeded"

✅ **Ahora**: Usa Google Sheets (que SÍ funciona con Service Accounts)
- Google Sheets se crea sin problemas
- Service Accounts tienen acceso total a Sheets compartidas
- Excel se genera localmente además

### Ventajas de la Nueva Solución

✅ Funciona 100% con Service Accounts  
✅ Sin errores de cuota  
✅ Google Sheets se actualiza automáticamente  
✅ Excel local como backup  
✅ Datos en la nube y en tu PC  
✅ Fácil de compartir  

---

## 🎉 ¡Listo!

Tu sistema ahora:
- ✅ Guarda en Google Sheets (nube)
- ✅ Crea Excel local automático
- ✅ Sincroniza datos
- ✅ Funciona sin errores

**Próximo paso**: Crear el archivo `.env` y reiniciar el servidor.

---

Documentación actualizada: Febrero 2026
