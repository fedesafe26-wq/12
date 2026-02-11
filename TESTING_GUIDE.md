# 🧪 Guía de Prueba: Sistema de Licencias con Organización por Persona

## Verificación Rápida (5 minutos)

### Paso 1: Preparar Entorno
```bash
# Abrir PowerShell en c:\Projects\Form

cd c:\Projects\Form

# Verificar que npm y Node.js están instalados
node --version    # Debe mostrarse versión (ej: v18.0.0)
npm --version     # Debe mostrarse versión (ej: 9.0.0)

# Instalar dependencias si falta algo
npm install

# Crear .env mínimo (sin Dropbox por ahora)
```

**Contenido de `.env` para prueba local:**
```
PORT=3000
```

### Paso 2: Iniciar Servidor
```bash
npm start
```

**Esperado:**
```
╔════════════════════════════════════════════╗
║   Sistema de Control de Licencias          ║
║   Servidor ejecutándose en:                ║
║   http://localhost:3000                    ║
╚════════════════════════════════════════════╝
```

### Paso 3: Probar Formulario
1. **Abrir navegador:** `http://localhost:3000`
2. **Llenar formulario COMPLETAMENTE:**

| Campo | Valor Ejemplo |
|---|---|
| Nombre | `Juan` |
| Apellido | `Pérez` |
| DNI | `12345678` |
| Email | `juan@instituto.edu` |
| Celular | `1234567890` |
| Fecha Inicio | `15/02/2026` |
| Fecha Fin | `20/02/2026` |
| Motivo | `Licencia médica` |
| Artículo | `Art. 123` |

3. **Seleccionar Funciones (marcar checkboxes):**
   - ☑️ Docente Primer Año
   - ☑️ Docente Segundo Año

4. **Para CADA función seleccionada, completar:**
   - **Subespacio:** Seleccionar uno (ej: `FM I GIMNASIA`)
   - **Comisión:** Seleccionar una (ej: `A`)
   - **Observaciones:** Escribir algo (opcional)

5. **Enviar formulario**

### Paso 4: Verificar Resultados

#### 4a. Verificar carpeta local
```bash
# En PowerShell, ir a:
cd c:\Projects\Form\exports

# Listar carpetas
dir

# Debe existir: Juan_Pérez (o con nombre que ingresó)
dir "Juan_Pérez"

# Debe existir archivo: Registro_*.xlsx
# Ejemplo: Registro_2026-02-10T14-32-15.xlsx
```

**If nothing appears, check:**
```bash
# Ver error en servidor
# Volver a PowerShell donde corre npm start y revisar
```

#### 4b. Abrir Excel generado
```bash
# Hacer doble-clic en: Registro_*.xlsx

# Debe ver 4 secciones:
# 1. DATOS PERSONALES (Nombre, Apellido, DNI, Email, Celular)
# 2. DATOS DE LA AUSENCIA (Fechas, Motivo, Artículo)
# 3. FUNCIONES, SUBESPACIOS Y COMISIONES (tabla con datos)
# 4. OBSERVACIONES GENERALES
```

**✅ Tabla debe verse así:**
```
Función              | Subespacio      | Comisión | Observaciones
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Docente Primer Año   | FM I GIMNASIA   | A        | Detalles...
Docente Segundo Año  | FMII VOLEIBOL   | B        | Más detalles...
```

---

## Prueba Avanzada: Múltiples Registros

### Prueba: Mismo Usuario - Múltiples Registros

1. **Llenar y enviar formulario 2da vez:**
   - Mismo nombre: `Juan`
   - Mismo apellido: `Pérez`
   - Diferentes funciones
   - Diferentes subespacios/comisiones

2. **Verificar:**
```bash
dir c:\Projects\Form\exports\Juan_Pérez

# Debe ver DOS archivos:
# - Registro_2026-02-10T14-32-15.xlsx (primero)
# - Registro_2026-02-10T15-45-22.xlsx (segundo)
```

**✅ Éxito:** Ambos archivos existen sin sobrescribirse

### Prueba: Diferente Usuario

1. **Llenar formulario con datos diferentes:**
   - Nombre: `María`
   - Apellido: `González`
   - Otras funciones

2. **Verificar:**
```bash
dir c:\Projects\Form\exports

# Debe ver carpetas:
# - Juan_Pérez (con 2 registros)
# - María_González (con 1 registro)
```

**✅ Éxito:** Estructura por persona mantiene datos separados

---

## Prueba con Dropbox (Opcional)

### Requisito
Tener token de Dropbox válido. Ver: [DROPBOX_SETUP.md](DROPBOX_SETUP.md)

### Paso 1: Conseguir Token
1. Ir a: https://www.dropbox.com/developers/apps
2. Click en "Create app"
3. Seleccionar: "Scoped access" → "Full Dropbox" → "Full access"
4. Copiar el token generado

### Paso 2: Actualizar .env
```bash
# Editar c:\Projects\Form\.env
```

```env
PORT=3000
DROPBOX_ACCESS_TOKEN=sl.BkXXXXXXXXXXXXXXXX... (tu token aquí)
```

### Paso 3: Probar Conexión
```bash
node test-dropbox-connection.js
```

**Esperado:**
```
✓ Autenticación con Dropbox exitosa
✓ Token válido
✓ Carpeta raíz verificada: /
```

### Paso 4: Enviar Registro por Dropbox
1. Rellenar y enviar formulario nuevamente
2. **Consola debe mostrar:**
```
✓ Excel creado: Juan_Pérez/Registro_2026-02-10T14-50-30.xlsx
✓ Carpeta creada en Dropbox: Juan_Pérez
✓ Archivo subido a Dropbox: Juan_Pérez/Registro_2026-02-10T14-50-30.xlsx
  Ruta: /Licencias Instituto/Juan_Pérez/Registro_2026-02-10T14-50-30.xlsx
```

### Paso 5: Verificar En Dropbox
1. Ir a: https://www.dropbox.com
2. Navegar a: `/Licencias Instituto/Juan_Pérez/`
3. **Debe ver:** `Registro_2026-02-10T14-50-30.xlsx`
4. Descargar y verificar que contiene datos

---

## Checklist de Validación

### ✅ Prueba Local (Sin Dropbox)
- [ ] Servidor arranca sin errores
- [ ] Formulario se abre en http://localhost:3000
- [ ] **Subespacios y Comisiones son seleccionables en formulario**
- [ ] Carpeta `Juan_Pérez` se crea en `exports/`
- [ ] Archivo `Registro_*.xlsx` existe en carpeta
- [ ] Excel abre correctamente
- [ ] Sección "DATOS PERSONALES" contiene valores
- [ ] Sección "DATOS DE LA AUSENCIA" contiene valores
- [ ] Sección "FUNCIONES..." tiene tabla con datos
  - [ ] Columna "Función" tiene nombres (Docente, etc.)
  - [ ] Columna "Subespacio" tiene valores (FM I GIMNASIA, etc.) ⭐
  - [ ] Columna "Comisión" tiene valores (A, B, C, etc.) ⭐
  - [ ] Columna "Observaciones" tiene valores (si se llenaron)
- [ ] Segundo registro da archivo diferente (diferente timestamp)
- [ ] Archivo `licencias_data.json` se crea con datos

### ✅ Prueba con Dropbox
- [ ] Token configurado en `.env`
- [ ] `node test-dropbox-connection.js` muestra ✓ exitoso
- [ ] Servidor arranca después de configurar Dropbox
- [ ] Enviando formulario muestra logs de "Carpeta creada" y "Archivo subido"
- [ ] En https://www.dropbox.com, carpeta `/Licencias Instituto/Juan_Pérez/` existe
- [ ] En Dropbox, archivo `Registro_*.xlsx` descargable
- [ ] Excel descargado de Dropbox tiene los mismos datos que local

### ⚠️ Si Algo Falla

#### "Carpeta no se crea"
```bash
# Verificar que exports/ existe
mkdir c:\Projects\Form\exports

# Verificar permisos (ejecutar como Admin si es necesario)
```

#### "Subespacio/Comisión están vacíos en Excel"
```bash
# Verificar en navegador que se selecciona valor
# Abrir consola (F12) y verificar que licenseData.funciones[] tiene esos valores

console.log('Data sent:', document.querySelector('form').data);
```

#### "Dropbox muestra error 403 Forbidden"
```bash
# Token no tiene permisos
# Ir a: https://www.dropbox.com/developers/apps
# Regenerar token con permisos:
# - files.content.write
# - files.content.read
```

#### "Archivo se sobrescribe"
```bash
# Verificar que timestamp cambia entre envíos
# Timestamp debe ser diferente para cada archivo
# Ej: ...T14-32-15 vs T15-45-22
```

---

## Información Técnica para Debugging

### Estructura de Envío de Datos
```javascript
{
  "nombre": "Juan",
  "apellido": "Pérez",
  "dni": "12345678",
  "email": "juan@instituto.edu",
  "celular": "1234567890",
  "fechaInicio": "2026-02-15",
  "fechaFin": "2026-02-20",
  "motivo": "Licencia médica",
  "articulo": "Art. 123",
  "observacionesGenerales": "Notas...",
  "funciones": [
    {
      "tipo": "docente_primer_año",
      "label": "Docente Primer Año",
      "subespacio": "FM I GIMNASIA",      // ⭐ Crítico
      "comision": "A",                    // ⭐ Crítico
      "observaciones": "Detalles..."
    },
    // ... más funciones si se selecciona
  ]
}
```

### Archivos Generados
```
c:\Projects\Form\
├── exports/
│   └── Juan_Pérez/
│       ├── Registro_2026-02-10T14-32-15.xlsx
│       └── Registro_2026-02-10T15-45-22.xlsx
├── licencias_data.json
└── ...
```

### Carpetas Dropbox
```
/Licencias Instituto/
├── Juan_Pérez/
│   ├── Registro_2026-02-10T14-32-15.xlsx
│   └── Registro_2026-02-10T15-45-22.xlsx
├── María_González/
│   └── Registro_2026-02-10T14-50-30.xlsx
└── ...
```

---

## Próximos Pasos Después de Validación

Si las pruebas pasan exitosamente:

- ✅ **Usar en producción:** Sistema está listo
- ☐ **Hacer respaldo:** Guardar los archivos Excel generados
- ☐ **Compartir con otros:** Dar acceso a http://IP:3000
- ☐ **Mejoramientos:** Agregar más Subespacios o Comisiones si es necesario

---

**Última actualización:** 10/02/2026  
**Sistema:** Completamente implementado y listo para probar
