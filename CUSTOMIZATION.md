# Guía de Personalización

## 🎨 Cambiar Apariencia

### 1. Cambiar Colores Principales

Editar el archivo `styles.css` (desde línea 8):

```css
:root {
    --primary-color: #2c3e50;        /* Azul oscuro - títulos */
    --secondary-color: #3498db;      /* Azul claro - botones */
    --accent-color: #27ae60;         /* Verde - confirmación */
    --danger-color: #e74c3c;         /* Rojo - errores */
    --warning-color: #f39c12;        /* Naranja - advertencias */
    --background-color: #ecf0f1;     /* Gris claro - fondo */
}
```

**Colores recomendados:**

Tema Profesional (actual):
```css
--primary-color: #2c3e50;     --secondary-color: #3498db;
```

Tema Verde (Naturaleza):
```css
--primary-color: #27ae60;     --secondary-color: #2ecc71;
```

Tema Rojo (Urgente):
```css
--primary-color: #c0392b;     --secondary-color: #e74c3c;
```

Tema Púrpura (Moderno):
```css
--primary-color: #8e44ad;     --secondary-color: #9b59b6;
```

### 2. Cambiar Logo/Título

Editar `index.html` línea 28:

```html
<h1>Mi Nombre de Instituto</h1>
<p class="subtitle">Control de Licencias 2024</p>
```

### 3. Cambiar Tamaño de Fuente

En `styles.css`, buscar `.header h1` (línea 61):

```css
.header h1 {
    font-size: 3em;  /* Aumentar para más grande */
}
```

---

## 📝 Agregar o Modificar Funciones

### Agregar Nueva Función Docente

1. **Editar `index.html`** - agregar checkbox en sección de funciones (línea ~240):

```html
<label class="checkbox-item">
    <input type="checkbox" name="funciones" 
           value="docente_quinto_año" 
           data-type="docente_quinto_año">
    <span>Docente de quinto año Ed. Física</span>
</label>
```

2. **Editar `script.js`** - agregar subespacios (después de línea 10):

```javascript
const SUBESPACIOS = {
    // ... existentes ...
    docente_quinto_año: [
        'MATERIA 1',
        'MATERIA 2',
        'MATERIA 3',
        'Otro'
    ]
};
```

3. **Agregar comisiones**:

```javascript
const COMISIONES = {
    // ... existentes ...
    docente_quinto_año: ['A', 'B', 'C', 'Otro']
};
```

### Agregar Nueva Función Simple (sin subespacios)

1. **En `index.html`**, agregar checkbox:

```html
<label class="checkbox-item">
    <input type="checkbox" name="funciones" 
           value="personal_cafeteria" 
           data-type="simple">
    <span>Personal de Cafetería</span>
</label>
```

No necesita cambios en `script.js` - se maneja automáticamente con el campo de observaciones.

---

## 🔧 Cambiar Campos del Formulario

### Agregar un Nuevo Campo

**En `index.html`**, dentro de una sección (ejemplo: Datos Personales):

```html
<div class="form-row">
    <div class="form-group">
        <label for="departamento">Departamento</label>
        <input type="text" id="departamento" 
               name="departamento" required>
    </div>
</div>
```

**Luego, en `script.js`** (función `handleFormSubmit`), agregar a `data`:

```javascript
const data = {
    // ... existentes ...
    departamento: formData.get('departamento'),
};
```

### Hacer un Campo Opcional

Cambiar `required` a `optional`:

```html
<!-- Requerido -->
<input type="text" required>

<!-- Opcional -->
<input type="text">  <!-- sin required -->
```

### Cambiar Tipo de Campo

```html
<!-- Texto corto -->
<input type="text">

<!-- Texto largo -->
<textarea rows="4"></textarea>

<!-- Número -->
<input type="number">

<!-- Fecha -->
<input type="date">

<!-- Email -->
<input type="email">

<!-- Teléfono -->
<input type="tel">

<!-- Desplegable -->
<select>
    <option value="">Seleccione</option>
    <option value="op1">Opción 1</option>
    <option value="op2">Opción 2</option>
</select>
```

---

## 💾 Cambiar Almacenamiento

### Cambiar Nombre de Archivo Local

En `googleDriveService.js` (línea 108):

```javascript
const dataFile = path.join(__dirname, 'licencias_data.json');
// Cambiar a:
const dataFile = path.join(__dirname, 'mis_licencias.json');
```

### Cambiar Nombre de Archivo Excel Mensual

En `googleDriveService.js` (línea 72):

```javascript
const fileName = `Licencias - ${monthYear}.xlsx`;
// Cambiar a:
const fileName = `MisLicencias_${monthYear}.xlsx`;
```

### Cambiar Carpeta en Google Drive

En `.env`:

```env
# Obtener ID copiando de la URL de la carpeta en Google Drive
GOOGLE_DRIVE_FOLDER_ID=mi-otro-id-de-carpeta
```

---

## 🎯 Cambiar Validaciones

### Cambiar Longitud Mínima de DNI

En `script.js`, función `validateForm`:

```javascript
// Agregar validación
if (formData.dni.length < 8) {
    errors.push('El DNI debe tener al menos 8 caracteres');
}
```

### Hacer Campo Opcional

En `validateForm`, comentar o eliminar la validación:

```javascript
// if (!formData.nombre.trim()) errors.push('...');
```

### Agregar Validación Personalizada

```javascript
// Validar que el email sea de dominio específico
if (!formData.email.endsWith('@instituto.edu.ar')) {
    errors.push('Use email del instituto');
}
```

---

## 📊 Cambiar Formato de Excel

### Cambiar Columnas Incluidas

En `googleDriveService.js`, función `createOrUpdateExcelFile` (línea 98):

```javascript
worksheet.columns = [
    { header: 'Tu Columna', key: 'tu_campo', width: 20 },
    // Agregar o quitar columnas
];
```

### Cambiar Ancho de Columnas

```javascript
{ header: 'Nombre', key: 'nombre', width: 25 }  // Aumentar ancho
```

### Cambiar Color de Encabezados

```javascript
worksheet.getRow(1).fill = {
    type: 'pattern',
    pattern: 'solid',
    fgColor: { argb: 'FFFF0000' }  // Rojo: FFFF0000
};
```

**Códigos de color (Hex ARGB)**:
- FF0000 = Rojo
- 00FF00 = Verde
- 0000FF = Azul
- FFFF00 = Amarillo
- 000000 = Negro
- FFFFFF = Blanco

---

## 🌐 Cambiar Idioma

### Cambiar a Otro Idioma

En `script.js`, función `validateForm`, cambiar mensajes de error:

```javascript
// De español a inglés
if (!formData.nombre.trim()) errors.push('Name is required');
```

### Cambiar Formato de Fecha

En `googleDriveService.js` (línea 123):

```javascript
// Español
timestamp: new Date(licenseData.timestamp).toLocaleString('es-AR'),

// Inglés
timestamp: new Date(licenseData.timestamp).toLocaleString('en-US'),

// Personalizado
timestamp: new Date(licenseData.timestamp).toLocaleString('es-ES', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit'
})
```

---

## 🔐 Cambios de Seguridad

### Limitar Acceso a la Aplicación

En `server.js`, agregar autenticación básica:

```javascript
// Middleware de autenticación simple
app.use((req, res, next) => {
    const password = req.query.pwd;
    if (password !== 'tu-contraseña-aqui') {
        return res.status(403).json({ error: 'No autorizado' });
    }
    next();
});
```

Luego acceder a: `http://localhost:3000?pwd=tu-contraseña-aqui`

### Cambiar Puerto

En `.env`:

```env
PORT=8080  # En lugar de 3000
```

---

## 🚀 Cambios Avanzados

### Agregar Nueva Funcionalidad

Ejemplo: Enviar email al registrar

1. Instalar paquete de email:
```powershell
npm install nodemailer
```

2. En `server.js`:
```javascript
const nodemailer = require('nodemailer');

// Configurar
const transporter = nodemailer.createTransport({...});

// En la ruta /api/save-license:
await transporter.sendMail({
    to: licenseData.email,
    subject: 'Licencia registrada',
    text: 'Su registro ha sido completado'
});
```

### Agregar Base de Datos

En lugar de JSON, usar MongoDB:

1. Instalar:
```powershell
npm install mongoose
```

2. Configurar conexión en `server.js`

---

## ✅ Checklist de Cambios Comunes

- [ ] Cambié los colores
- [ ] Cambié el título/logo
- [ ] Agregué funciones
- [ ] Agregué campos
- [ ] Cambié carpeta de Google Drive
- [ ] Probé en navegador (http://localhost:3000)
- [ ] Los datos se guardan correctamente

---

## 📞 Ayuda

Si necesitas cambiar algo más complejo:

1. Revisar README.md
2. Ver los comentarios en el código
3. Probar cambios pequeños primero
4. Reiniciar servidor después de cambios

---

**Consejo**: Hacer cambios pequeños y probar antes de cambios grandes.
