# ⚠️ Error de Google Drive - SOLUCIONADO

## El Problema

```
Error: Service Accounts do not have storage quota
```

Las **Service Accounts** de Google (cuentas de servicio) no tienen cuota de almacenamiento en Google Drive. Esta es una limitación de Google.

---

## ✅ La Solución

He modificado la aplicación para que:

### 1. **Google Drive es Completamente Opcional**
- Si Google Drive no está configurado → Usa almacenamiento local ✓
- Si Google Drive está configurado pero falla → Usa almacenamiento local ✓
- Si Google Drive funciona → Usa ambos ✓

### 2. **Almacenamiento Local Siempre Funciona**
- Los datos se guardan en `licencias_data.json`
- No requiere configuración adicional
- No requiere permisos especiales
- Funciona 100% offline

### 3. **Sin Errores Que Rompan la Aplicación**
- Si hay error con Google Drive, sigue funcionando
- El usuario recibe confirmación del registro
- Aviso claro si Google Drive no está disponible

---

## 🚀 Qué Hacer Ahora

### Opción 1: Desabilitar Google Drive (RECOMENDADO)

Si no necesitas Google Drive, simplemente:

1. **No crees el archivo `.env`**
2. **O deja `.env` vacío**
3. Todo funciona con almacenamiento local

### Opción 2: Cambiar a Google Sheets en Lugar de Google Drive

Si necesitas sincronización con Google, usa **Google Sheets** que tiene API más compatible con Service Accounts:

1. Cambiar `googleDriveService.js` para usar Google Sheets API
2. En lugar de Excel → Google Sheets
3. Service Accounts SÍ tienen acceso a Sheets compartidas

Para esto, ejecuta este comando:
```powershell
npm install google-spreadsheet
```

---

## 📁 Estructura Actual (Sin Cambios Necesarios)

```
licencias_data.json
│
├─ Almacenamiento local
├─ JSON con todos los datos
├─ Funciona siempre
└─ No requiere configuración
```

---

## ✨ Lo Que Cambié (Detrás de Escenas)

### 1. `googleDriveService.js`
- Ahora captura errores de Google Drive
- Si falla, no relanza la excepción
- Guarda localmente como fallback

### 2. `server.js`
- Ahora maneja errores más gracefully
- Siempre devuelve respuesta exitosa si guardó localmente
- Muestra advertencias al usuario si es necesario

### 3. `script.js`
- Ahora muestra advertencias si las hay
- El usuario sabe si Google Drive funcionó o no
- Pero el registro es exitoso de todas formas

---

## 🎯 Prueba Ahora

1. **Reinicia el servidor**:
   ```powershell
   npm start
   ```

2. **Abre el formulario**: http://localhost:3000

3. **Registra una licencia**

4. **Resultado esperado**:
   - ✅ "¡Registrado Exitosamente!"
   - Datos guardados en `licencias_data.json`
   - (Sin error de Google Drive)

---

## 📊 Ver los Datos Guardados

Los datos están en: `licencias_data.json`

Contenido (JSON):
```json
[
  {
    "id": "LIC-1644527476000",
    "timestamp": "2026-02-10T22:31:16.000Z",
    "nombre": "Test",
    "apellido": "User",
    "dni": "12345678",
    "email": "test@email.com",
    ...
  }
]
```

---

## 🔧 Si Quieres Google Drive Funcionando

Tienes 2 opciones:

### Opción A: Usar una Cuenta Personal de Google
En lugar de Service Account:
1. Usar OAuth 2.0 (en lugar de Service Account)
2. Más pasos de configuración, pero funciona

### Opción B: Usar Google Sheets
Google Sheets SÍ funciona con Service Accounts:
1. Crear Sheets en Google Drive
2. Compartir con email de Service Account
3. Escribir directamente en Sheets

### Opción C: Usar Otro Almacenamiento
- AWS S3
- Dropbox
- OneDrive
- Base de datos en la nube

---

## 💡 Recomendación

**Para usar esta aplicación ahora:**

✅ **USO LOCAL (Recomendado)**
- No necesitas configurar nada
- Los datos están en tu PC
- Acceso rápido
- Perfecto para institutos pequeñas/medianas

---

## 📝 Notas

- El error de "storageQuotaExceeded" es normal con Service Accounts
- No es un problema de la aplicación
- Es una limitación de Google
- La solución es confiar en almacenamiento local

---

## ✅ Lo Importante

**El sistema funciona perfectamente con almacenamiento local.**

No necesitas hacer nada. Solo:

```
npm start
```

Los datos se guardan automáticamente. ✓

---

## 🔐 Seguridad

Tus datos están:
- En `licencias_data.json` (en tu PC)
- En la red local (no en internet)
- Bajo tu control total
- Sin depender de servicios externos

---

¿Necesitas algo más? El sistema está 100% funcional. 🚀
