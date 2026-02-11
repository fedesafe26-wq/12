# 📊 Flujo de Datos: Desde Formulario a Excel

## Visión General

```
USUARIO LLENA FORMULARIO en navegador
        ↓
JAVASCRIPT (script.js) captura datos
        ↓
ENVÍA JSON por POST a http://localhost:3000/api/save-license
        ↓
SERVIDOR (server.js) procesa con dropboxService
        ↓
GENERA 3 SALIDAS:
  1. Excel local: exports/Nombre_Apellido/Registro_*.xlsx
  2. Dropbox: /Licencias Instituto/Nombre_Apellido/Registro_*.xlsx
  3. JSON backup: licencias_data.json
```

---

## Datos Capturados por Campo

### SECCIÓN 1: Información Básica

| Campo HTML | Capturado en | Guardado en Excel |
|---|---|---|
| `<input name="nombre" ...>` | `licenseData.nombre` | DATOS PERSONALES → Nombre |
| `<input name="apellido" ...>` | `licenseData.apellido` | DATOS PERSONALES → Apellido |
| `<input name="dni" ...>` | `licenseData.dni` | DATOS PERSONALES → DNI |
| `<input name="email" ...>` | `licenseData.email` | DATOS PERSONALES → Email |
| `<input name="celular" ...>` | `licenseData.celular` | DATOS PERSONALES → Celular |

**Ejemplo:**
```javascript
// En script.js
data.nombre = document.querySelector('input[name="nombre"]').value;  // "Juan"
data.apellido = document.querySelector('input[name="apellido"]').value;  // "Pérez"
```

**Excel:**
```
Nombre    | Juan
Apellido  | Pérez
DNI       | 12345678
Email     | juan@instituto.edu
Celular   | 1234567890
```

---

### SECCIÓN 2: Ausencia

| Campo HTML | Capturado en | Guardado en Excel |
|---|---|---|
| `<input name="fechaInicio" ...>` | `licenseData.fechaInicio` | DATOS DE LA AUSENCIA → Fecha de Inicio |
| `<input name="fechaFin" ...>` | `licenseData.fechaFin` | DATOS DE LA AUSENCIA → Fecha de Fin |
| `<select name="motivo" ...>` | `licenseData.motivo` | DATOS DE LA AUSENCIA → Motivo |
| `<input name="articulo" ...>` | `licenseData.articulo` | DATOS DE LA AUSENCIA → Artículo |

**Ejemplo:**
```javascript
// En script.js
data.fechaInicio = "15/02/2026";
data.fechaFin = "20/02/2026";
data.motivo = "Licencia médica";
data.articulo = "Art. 123";
```

**Excel:**
```
Fecha de Inicio | 15/02/2026
Fecha de Fin    | 20/02/2026
Motivo          | Licencia médica
Artículo        | Art. 123
```

---

### SECCIÓN 3: Funciones, Subespacios y Comisiones ⭐⭐⭐

Esta es la **sección crítica** donde se capturan los Subespacios y Comisiones.

#### Entrada en Formulario HTML
```html
<div id="funciones-container">
  <!-- Para cada función seleccionada -->
  <div class="funcion-item">
    <h4>Docente Primer Año</h4>
    
    <!-- Captura 1: Subespacio -->
    <select class="subespacio-select" id="subespacio_0" name="subespacio_0">
      <option value="">-- Seleccionar --</option>
      <option value="FM I GIMNASIA">FM I GIMNASIA</option>
      <option value="FMII VOLEIBOL">FMII VOLEIBOL</option>
      <option value="Otro">Otro</option>
    </select>
    
    <!-- Captura 2: Comisión -->
    <select class="comision-select" id="comision_0" name="comision_0">
      <option value="">-- Seleccionar --</option>
      <option value="A">Comisión A</option>
      <option value="B">Comisión B</option>
      <option value="C">Comisión C</option>
      <option value="Otro">Otro</option>
    </select>
    
    <!-- Captura 3: Observaciones -->
    <textarea id="observaciones_0" name="observaciones_0" placeholder="Observaciones...">
    Detalles específicos
    </textarea>
  </div>
</div>
```

#### Captura en script.js
```javascript
// En script.js, función collectFormData()

// Obtener el índice de función
const index = 0;  // Primera función

// Capturar selects
const subespacioSelect = document.querySelector(`#subespacio_${index}`);
const comisionSelect = document.querySelector(`#comision_${index}`);
const observacionesTextarea = document.querySelector(`#observaciones_${index}`);

// Crear objeto con datos de función
const funcion = {
  tipo: "docente_primer_año",
  label: "Docente Primer Año",
  
  // ⭐ CAPTURA DEL SUBESPACIO (línea ~471 en script.js)
  subespacio: subespacioSelect?.value === 'Otro' 
    ? document.querySelector(`#subespacio-otro_${index}`)?.value 
    : subespacioSelect?.value,
  
  // ⭐ CAPTURA DE COMISIÓN (línea ~475 en script.js)
  comision: comisionSelect?.value === 'Otro'
    ? document.querySelector(`#comision-otro_${index}`)?.value
    : comisionSelect?.value,
  
  // ⭐ CAPTURA DE OBSERVACIONES (línea ~479 en script.js)
  observaciones: observacionesTextarea?.value || ''
};

// Agregar a array
data.funciones.push(funcion);
```

#### JSON Enviado al Servidor
```javascript
// POST /api/save-license
{
  "nombre": "Juan",
  "apellido": "Pérez",
  "dni": "12345678",
  "email": "juan@instituto.edu",
  "celular": "1234567890",
  "fechaInicio": "15/02/2026",
  "fechaFin": "20/02/2026",
  "motivo": "Licencia médica",
  "articulo": "Art. 123",
  "observacionesGenerales": "",
  
  // ⭐⭐⭐ FUNCIONES CON SUBESPACIOS Y COMISIONES
  "funciones": [
    {
      "tipo": "docente_primer_año",
      "label": "Docente Primer Año",
      "subespacio": "FM I GIMNASIA",        // ← AQUÍ
      "comision": "A",                      // ← AQUÍ
      "observaciones": "Detalles"           // ← AQUÍ
    },
    {
      "tipo": "docente_segundo_año",
      "label": "Docente Segundo Año",
      "subespacio": "FMII VOLEIBOL",        // ← AQUÍ
      "comision": "B",                      // ← AQUÍ
      "observaciones": "Notas"              // ← AQUÍ
    }
  ]
}
```

#### Procesamiento en dropboxService.js
```javascript
// En generateLocalExcel(licenseData)

// Línea ~190: Crear tabla de funciones
licenseData.funciones.forEach(funcion => {
  worksheet.getCell(row, 1).value = funcion.label;           // "Docente Primer Año"
  worksheet.getCell(row, 2).value = funcion.subespacio || ''; // "FM I GIMNASIA" ⭐
  worksheet.getCell(row, 3).value = funcion.comision || '';    // "A" ⭐
  worksheet.getCell(row, 4).value = funcion.observaciones || ''; // "Detalles" ⭐
  row++;
});
```

#### Excel Generado
```
┌─────────────────────┬──────────────────┬──────────┬──────────────┐
│ Función             │ Subespacio       │ Comisión │ Observaciones│
├─────────────────────┼──────────────────┼──────────┼──────────────┤
│ Docente Primer Año  │ FM I GIMNASIA    │ A        │ Detalles     │
│ Docente Segundo Año │ FMII VOLEIBOL    │ B        │ Notas        │
└─────────────────────┴──────────────────┴──────────┴──────────────┘
```

---

### SECCIÓN 4: Observaciones Generales

| Campo HTML | Capturado en | Guardado en Excel |
|---|---|---|
| `<textarea name="observacionesGenerales" ...>` | `licenseData.observacionesGenerales` | OBSERVACIONES GENERALES |

**Ejemplo:**
```javascript
// En script.js
data.observacionesGenerales = "Observación general sobre la licencia...";
```

**Excel:**
```
OBSERVACIONES GENERALES

Observación general sobre la licencia...
```

---

## Punto Crítico: Validación de Subespacios y Comisiones

### Checklist de Validación

Para asegurar que Subespacios y Comisiones se capturan correctamente:

#### En Navegador (F12 Console)
```javascript
// Después de llenar formulario y antes de enviar:

// 1. Verificar que forma tiene datos
const form = document.querySelector('form');
console.log('Form data:', form);

// 2. Buscar selects de subespacios
const subespacios = document.querySelectorAll('.subespacio-select');
console.log('Selects de Subespacios:', subespacios.length);
subespacios.forEach((s, i) => console.log(`[${i}]`, s.value));

// 3. Buscar selects de comisiones  
const comisiones = document.querySelectorAll('.comision-select');
console.log('Selects de Comisiones:', comisiones.length);
comisiones.forEach((c, i) => console.log(`[${i}]`, c.value));

// 4. Si alguno muestra null, el usuario NO seleccionó un valor
```

#### En Servidor (PowerShell)
```bash
# Ver logs cuando se envía formulario
# En PowerShell donde corre npm start, debe ver:

# ✓ Excel creado: Juan_Pérez/Registro_*.xlsx
# ✓ Datos guardados en JSON
# ✓ (Si Dropbox configurado) Archivo subido a Dropbox
```

#### En Excel Generado
```
Abrir el Registro_*.xlsx y verificar:
- Sección 3: Tabla tiene valores en columnas "Subespacio" y "Comisión"
- Si están vacías: El usuario NO seleccionó en el formulario
```

---

## Ejemplo Completo de Flujo

### 1️⃣ Usuario ingresa datos
```
Nombre: Juan
Apellido: Pérez
DNI: 12345678
Email: juan@instituto.edu
Celular: 1234567890

Fecha Inicio: 15/02/2026
Fecha Fin: 20/02/2026
Motivo: Licencia médica
Artículo: Art. 123

Funciones seleccionadas:
- ☑️ Docente Primer Año → Subespacio: "FM I GIMNASIA" → Comisión: "A"
- ☑️ Docente Segundo Año → Subespacio: "FMII VOLEIBOL" → Comisión: "B"
- ☑️ Preceptor → Subespacio: "PISO 2" → Comisión: "C"

Observaciones:
- Docente P.A.: "Cubrir clases"
- Docente S.A.: "Coordinar con dirección"
- Preceptor: ""
```

### 2️⃣ JavaScript captura en array
```javascript
data.funciones = [
  {
    tipo: "docente_primer_año",
    label: "Docente Primer Año",
    subespacio: "FM I GIMNASIA",
    comision: "A",
    observaciones: "Cubrir clases"
  },
  {
    tipo: "docente_segundo_año",
    label: "Docente Segundo Año",
    subespacio: "FMII VOLEIBOL",
    comision: "B",
    observaciones: "Coordinar con dirección"
  },
  {
    tipo: "preceptor",
    label: "Preceptor",
    subespacio: "PISO 2",
    comision: "C",
    observaciones: ""
  }
]
```

### 3️⃣ Servidor genera Excel
```
ARCHIVO: exports/Juan_Pérez/Registro_2026-02-10T14-32-15.xlsx

SECCIÓN 1: DATOS PERSONALES
┌──────────┬───────────────────────┐
│ Nombre   │ Juan                  │
│ Apellido │ Pérez                 │
│ DNI      │ 12345678              │
│ Email    │ juan@instituto.edu    │
│ Celular  │ 1234567890            │
└──────────┴───────────────────────┘

SECCIÓN 2: DATOS DE LA AUSENCIA
┌───────────────────┬───────────────────┐
│ Fecha de Inicio   │ 15/02/2026        │
│ Fecha de Fin      │ 20/02/2026        │
│ Motivo            │ Licencia médica   │
│ Artículo          │ Art. 123          │
└───────────────────┴───────────────────┘

SECCIÓN 3: FUNCIONES, SUBESPACIOS Y COMISIONES
┌──────────────────┬─────────────────┬──────────┬──────────────────────┐
│ Función          │ Subespacio      │ Comisión │ Observaciones        │
├──────────────────┼─────────────────┼──────────┼──────────────────────┤
│ Docente Pr. Año  │ FM I GIMNASIA   │ A        │ Cubrir clases        │
│ Docente Sg. Año  │ FMII VOLEIBOL   │ B        │ Coordinar con direc. │
│ Preceptor        │ PISO 2          │ C        │                      │
└──────────────────┴─────────────────┴──────────┴──────────────────────┘

SECCIÓN 4: OBSERVACIONES GENERALES
(vacío)
```

### 4️⃣ Se crea estructura de carpetas
```
exports/Juan_Pérez/Registro_2026-02-10T14-32-15.xlsx
licencias_data.json (contiene todo el JSON)
```

### 5️⃣ Se sube a Dropbox (si configurado)
```
/Licencias Instituto/Juan_Pérez/Registro_2026-02-10T14-32-15.xlsx
```

---

## Preguntas Frecuentes sobre el Flujo

### P: ¿Qué pasa si el usuario NO selecciona un Subespacio?
**R:** El campo quedará vacío en el Excel. El usuario DEBE seleccionar un valor.

### P: ¿Qué pasa si selecciona "Otro"?
**R:** Se captura el valor del campo de texto adicional que aparece.

### P: ¿Se sobrescriben registros del mismo usuario?
**R:** No. Cada registro tiene timestamp único: `Registro_2026-02-10T14-32-15.xlsx` vs `Registro_2026-02-10T15-45-22.xlsx`

### P: ¿Se pierden datos si Dropbox no está configurado?
**R:** No. Los datos se guardan localmente (Excel + JSON) aunque Dropbox falle.

### P: ¿Dónde se ve el error si Dropbox falla?
**R:** En la consola de PowerShell donde corre `npm start`, y el JSON se guarda como respaldo.

### P: ¿Se pueden cambiar los Subespacios/Comisiones después?
**R:** No. Se capturan en el formulario y se guardan. Si hay que cambiar, se hace en el Excel manualmente.

---

## Secuencia de Archivos Generados

Después de 1 usuario con 2 registros + 1 usuario con 1 registro:

```
c:\Projects\Form\
├── exports/
│   ├── Juan_Pérez/
│   │   ├── Registro_2026-02-10T14-32-15.xlsx (1er registro)
│   │   └── Registro_2026-02-10T15-45-22.xlsx (2do registro)
│   └── María_González/
│       └── Registro_2026-02-10T14-50-30.xlsx (1er registro)
├── licencias_data.json (contiene todos los registros en JSON)
└── .env (configuración)
```

**Dropbox:**
```
/Licencias Instituto/ (raíz)
├── Juan_Pérez/
│   ├── Registro_2026-02-10T14-32-15.xlsx
│   └── Registro_2026-02-10T15-45-22.xlsx
└── María_González/
    └── Registro_2026-02-10T14-50-30.xlsx
```

---

## Validación Técnica

Para confirmar que todo funciona:

```bash
# 1. Llenar formulario con datos claros
npm start
# http://localhost:3000
# Llenar todo, seleccionar Subespacios y Comisiones, enviar

# 2. Abrir el Excel generado
cd exports\Juan_Pérez
start Registro_*.xlsx

# 3. Verificar tabla en Sección 3
# Las columnas deben mostrar:
# - Función: visible
# - Subespacio: visible ⭐
# - Comisión: visible ⭐
# - Observaciones: visible

# 4. Si valores están vacíos, revisar:
# - ¿Se seleccionó en formulario? (revisar F12)
# - ¿El select tiene class="subespacio-select"?
# - ¿El valor se guardó antes de enviar?
```

---

**Última actualización:** 10/02/2026  
**Documentación de flujo:** Completa y detallada  
**Status:** Sistema listo para validación
