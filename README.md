# Sistema de Control de Licencias - Instituto Educativo

Una aplicación web moderna y fácil de usar para gestionar licencias de personal en institutos educativos.

## Características

✅ **Formulario Dinámico**: Los campos se adaptan según selecciona el usuario  
✅ **Validación Completa**: Verificación de datos en tiempo real  
✅ **Integración Google Drive**: Guarda automáticamente en archivos Excel mensuales  
✅ **Interfaz Responsive**: Funciona perfectamente en dispositivos móviles  
✅ **Diseño Intuitivo**: Fácil de usar sin instrucciones complicadas  
✅ **Almacenamiento Local**: Backup automático de datos  

## Requisitos

- Node.js (v14 o superior)
- npm (gestor de paquetes)
- Cuenta de Google Drive

## Instalación

### 1. Clonar o descargar el proyecto

```bash
cd c:\Projects\Form
```

### 2. Instalar dependencias

```bash
npm install
```

### 3. Configurar Google Drive (Opcional pero Recomendado)

#### Paso 1: Crear un proyecto en Google Cloud Console

1. Ir a [Google Cloud Console](https://console.cloud.google.com/)
2. Crear nuevo proyecto (ej: "License Management System")
3. Habilitar la API de Google Drive:
   - Buscar "Google Drive API"
   - Hacer clic en "Habilitar"
4. Crear credenciales:
   - Ir a "Credenciales"
   - Crear "Cuenta de servicio"
   - Nombre: "license-app"
   - Crear clave JSON
   - Descargar el archivo JSON

#### Paso 2: Crear carpeta en Google Drive

1. Acceder a google.com/drive
2. Crear nueva carpeta: "Instituto - Control de Licencias"
3. Copiar el ID de la carpeta de la URL (entre /folders/ y /edit)

#### Paso 3: Compartir carpeta con la cuenta de servicio

1. Obtener el email de la cuenta de servicio del archivo JSON descargado
2. Compartir la carpeta con ese email con permisos de editor

#### Paso 4: Configurar variables de entorno

1. Crear archivo `.env` en la raíz del proyecto:

```bash
# Copiar el contenido del archivo .env.example
copy .env.example .env
```

2. Editar `.env`:
```
GOOGLE_DRIVE_FOLDER_ID=TU_ID_DE_CARPETA_AQUI
GOOGLE_CREDENTIALS_JSON={"type":"service_account","project_id":"...", ... }
PORT=3000
```

## Uso

### Iniciar el servidor

```bash
npm start
```

O para desarrollo con auto-reinicio:

```bash
npm run dev
```

### Acceder a la aplicación

Abrir navegador en: **http://localhost:3000**

## Estructura del Formulario

### Información Personal (Obligatoria)
- Nombre, Apellido, DNI, Email, Celular

### Fechas de Licencia (Obligatorias)
- Fecha de inicio y fin

### Motivo de Ausencia (Obligatorio)
- Descripción del motivo
- Número de artículo (opcional)

### Funciones de Ausencia
El usuario puede seleccionar una o más funciones:
- **Docentes**: Mostrarán campos adicionales para subespacios y comisiones
- **Otros roles**: Solo mostrarán campo de observaciones

### Campos Dinámicos por Función

#### Docentes de Primer/Segundo/Tercer/Cuarto Año
- Seleccionar subespacios
- Elegir comisión
- Observaciones específicas

#### Otros Roles (Asistente, Personal, etc.)
- Solo campo de observaciones

## Almacenamiento de Datos

### Google Drive
- **Completamente opcional**
- Service Accounts tienen limitaciones con Google Drive
- Si necesitas la nube, considera Google Sheets en su lugar
- Ver: [GOOGLE_DRIVE_ERROR_FIX.md](GOOGLE_DRIVE_ERROR_FIX.md)

### Local (RECOMENDADO)
- `licencias_data.json` contiene todos los datos
- Se crea automáticamente
- Funciona sin configuración adicional
- Perfecto para uso institucional
- Backup automático

## Personalización

### Agregar nuevas funciones

Editar `script.js` y agregar en `SUBESPACIOS` y `COMISIONES`:

```javascript
const SUBESPACIOS = {
    tu_nueva_funcion: ['opción1', 'opción2', ...]
};

const COMISIONES = {
    tu_nueva_funcion: ['A', 'B', 'C', ...]
};
```

### Cambiar colores

Editar variables en `styles.css`:

```css
:root {
    --primary-color: #2c3e50;      /* Color principal */
    --secondary-color: #3498db;    /* Color secundario */
    --accent-color: #27ae60;       /* Color de acento */
}
```

### Modificar campos del formulario

Editar el HTML en `index.html` - agregar nuevos campos en las secciones correspondientes.

## Validación

El formulario valida automáticamente:
- Campos requeridos no vacíos
- Email válido
- Fechas lógicas (inicio < fin)
- Campos dinámicos según funciones seleccionadas

## Estructura de Archivo Excel

Las columnas del Excel incluyen:
- Fecha/Hora de registro
- Datos personales
- Fechas de licencia
- Motivo y artículo
- Funciones seleccionadas
- Observaciones

## Solución de Problemas

### "Error: Google Drive no está configurado"

**Solución**: Las credenciales no están configuradas. El sistema seguirá guardando localmente en `licencias_data.json`

### "Error al guardar los datos"

1. Verificar que el servidor está corriendo (`npm start`)
2. Revisar en la consola del navegador (F12) el mensaje de error
3. Asegurarse que las credenciales de Google Drive son válidas

### El archivo Excel no se actualiza

1. Verificar que la carpeta padre está compartida correctamente
2. Revisar permisos de la cuenta de servicio
3. Ver logs del servidor para más detalles

## Variables de Entorno

```env
PORT=3000                           # Puerto del servidor
GOOGLE_DRIVE_FOLDER_ID=            # ID de carpeta en Google Drive
GOOGLE_CREDENTIALS_JSON=           # JSON completo de credenciales
```

## Seguridad

⚠️ **IMPORTANTE**: 
- Nunca compartir el archivo `.env` públicamente
- No incluir credenciales en control de versiones
- Usar `.gitignore` para excluir archivos sensibles

Archivo `.gitignore`:
```
.env
node_modules/
licencias_data.json
temp_license.xlsx
```

## Licencia

MIT

## Soporte

Para problemas o sugerencias, revisar los logs en la consola del servidor o contactar al administrador del sistema.

---

**Versión**: 1.0.0  
**Última actualización**: Febrero 2026
