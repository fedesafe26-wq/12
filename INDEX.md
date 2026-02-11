# 📋 Sistema de Control de Licencias - Instituto Educativo

**Versión**: 1.0.0  
**Estado**: ✅ Listo para usar  
**Última actualización**: Febrero 2026

---

## 🎯 ¿Qué es esto?

Una **aplicación web moderna y fácil de usar** para que el personal de un instituto educativo registre sus licencias de ausencia de forma digital, organizada y automática.

**Sin complicaciones, sin burocracia innecesaria.**

---

## ⚡ Comienza Aquí

### Opción 1: Inicio Rápido (5 minutos)

1. Abre PowerShell en `c:\Projects\Form`
2. Ejecuta:
   ```powershell
   npm install
   npm start
   ```
3. Abre: **http://localhost:3000**

✅ ¡Listo! Funciona sin Google Drive (datos en tu PC)

### Opción 2: Con Google Drive (15 minutos)

Sigue [SETUP_WINDOWS.md](SETUP_WINDOWS.md) para guardar datos automáticamente en Google Drive.

---

## 📚 Documentación

| Documento | Para quién | Contenido |
|-----------|-----------|----------|
| **[QUICKSTART.md](QUICKSTART.md)** | Principiantes | Empezar en 5 minutos |
| **[SETUP_WINDOWS.md](SETUP_WINDOWS.md)** | Instalación | Guía paso a paso en Windows |
| **[CUSTOMIZATION.md](CUSTOMIZATION.md)** | Personalizadores | Cambiar colores, campos, funciones |
| **[README.md](README.md)** | Referencia | Documentación completa |

---

## ✨ Características Principales

### 📝 Formulario Completo

Recopia exactamente la información que necesitas:

```
┌─ Datos Personales ─────────────────┐
│ • Nombre, Apellido, DNI            │
│ • Email, Celular                   │
└────────────────────────────────────┘

┌─ Fechas de Licencia ────────────────┐
│ • Fecha inicio y fin                │
└────────────────────────────────────┘

┌─ Motivo de Ausencia ────────────────┐
│ • Descripción del motivo            │
│ • Número de artículo (opcional)     │
└────────────────────────────────────┘

┌─ Funciones ─────────────────────────┐
│ ☐ Docente 1° año                   │
│ ☐ Docente 2° año                   │
│ ☐ Personal de Gestión              │
│ ☐ Otros...                         │
└────────────────────────────────────┘
```

### 🎯 Campos Dinámicos

El formulario se adapta automáticamente:

```
Si selecciona Docente 1° año Ed. Física:
↓
Aparecen campos para:
  • Seleccionar subespacio (FM I GIMNASIA, DAC I FÚTBOL, ...)
  • Elegir comisión (A, B, C, ...)
  • Agregar observaciones

Si selecciona Asistente escolar:
↓
Solo aparece:
  • Campo de observaciones
```

### 📊 Almacenamiento Automático

**Sin Google Drive**:
```
Datos → licencias_data.json (en tu PC)
```

**Con Google Drive**:
```
Datos → Archivo Excel Mensual en Google Drive
       (se crea automáticamente cada mes)
```

### ✅ Validación Completa

- ✓ Email válido
- ✓ Fechas lógicas
- ✓ Campos requeridos
- ✓ Información consistente

### 📱 Responsive

```
🖥️ Desktop  → Diseño óptimo
📱 Mobile   → Funciona perfecto
⌨️ Tablet   → Totalmente adaptable
```

---

## 🚀 Cómo Usar

### Primer Uso

```
1. npm install          ← Instalar dependencias
2. npm start            ← Iniciar servidor
3. Navega a:
   http://localhost:3000
4. ¡Usa el formulario!
```

### Uso Diario

```
1. Abre PowerShell en c:\Projects\Form
2. npm start
3. Accede a http://localhost:3000
4. El servidor está corriendo (no cierres)
5. Para detener: Ctrl + C
```

---

## 📁 Archivos Importantes

```
Form/
├── 📄 index.html              ← Lo que ves (el formulario)
├── 🎨 styles.css              ← Diseño y colores
├── ⚙️  script.js              ← Lógica del formulario
├── 🔧 server.js              ← Servidor (backend)
├── 📦 package.json            ← Dependencias
├── ⚡ googleDriveService.js  ← Integración Google Drive
├── 📋 licencias_data.json     ← Datos guardados localmente
├── 🔐 .env                    ← Configuración (crear tú)
└── 📚 README.md              ← Documentación detallada
```

---

## 🎨 Personalización Fácil

### Cambiar Colores

Editar `styles.css` línea 8:

```css
--primary-color: #3498db;        /* Azul */
--secondary-color: #2ecc71;      /* Verde */
```

### Cambiar Título

Editar `index.html` línea 28:

```html
<h1>Mi Instituto - Control de Licencias</h1>
```

### Agregar Campos

Editar `index.html` y `script.js`  
(Ver [CUSTOMIZATION.md](CUSTOMIZATION.md) para detalles)

---

## 🔒 Google Drive (Opcional)

### ¿Por qué?
- Datos en la nube
- Acceso desde cualquier lugar
- Archivo Excel mensual automático
- Sincronización automática

### ¿Cómo?
Sigue [SETUP_WINDOWS.md](SETUP_WINDOWS.md) - Paso 4  
(Toma ~15 minutos, una sola vez)

### ¿Es obligatorio?
**NO**. Los datos se guardan localmente sin Google Drive.  
Google Drive es opcional para quien lo necesite.

---

## ⚠️ Solución de Problemas

| Problema | Solución |
|----------|----------|
| "npm no se reconoce" | Instalar Node.js desde nodejs.org |
| Puerto 3000 en uso | Cambiar PORT en .env a 3001 |
| Página en blanco | Verificar que npm start está ejecutándose |
| Google Drive no funciona | Es normal - funciona sin él |

---

## 👥 Para Usuarios Finales

### El formulario es:
✅ **Intuitivo**: Aparecen solo los campos que necesitas  
✅ **Rápido**: Se completa en 2-3 minutos  
✅ **Seguro**: Los datos se guardan automáticamente  
✅ **Claro**: Instrucciones en cada paso  

### La experiencia es:
- Sin errores confusos
- Sin campos innecesarios
- Sin burocracia digital
- Sin complicaciones técnicas

---

## 👨‍💻 Para Administradores

### Configuración
- Instalación automática con `npm install`
- Configuración en archivo `.env` (sencilla)
- Documentación clara y detallada

### Mantenimiento
- Copias de seguridad automáticas
- Logs claros en consola
- Fácil de personalizar
- Sin dependencias complejas

### Escalabilidad
- Funciona sin Google Drive
- Integración con Google Drive opcional
- Fácil de expandir

---

## 📊 Datos Generados

### En el Archivo Excel
```
┌────────────┬────────┬────────┬───────┬────────┬──────────────┐
│ Fecha/Hora │ Nombre │ Función│ Fechas│ Motivo │ Observaciones│
├────────────┼────────┼────────┼───────┼────────┼──────────────┤
│ 10/02/2024 │ Juan   │ Docente│ ...   │ Médico │ ...          │
│ 11/02/2024 │ María  │ Admin  │ ...   │ Otro   │ ...          │
└────────────┴────────┴────────┴───────┴────────┴──────────────┘
```

### En licencias_data.json
```json
{
  "timestamp": "2024-02-10T14:30:00Z",
  "nombre": "Juan",
  "apellido": "Pérez",
  "email": "juan@email.com",
  "funciones": [...]
}
```

---

## 🔄 Flujo de Datos

```
Usuario           Servidor          Almacenamiento
   │                 │                    │
   │ Completa form   │                    │
   │──────────────→ │                    │
   │                 │ Valida datos       │
   │                 │                    │
   │                 │ ¿Google Drive?     │
   │                 │─────────────────→ │
   │                 │ Google Drive       ✓
   │                 │ (Excel mensual)    │
   │                 │                    │
   │                 │ Backup local       ✓
   │                 │ (JSON)             │
   │ ✓ Confirmación  │                    │
   │←──────────────│                    │
```

---

## 🛠️ Stack Técnico

### Frontend
- **HTML5**: Estructura
- **CSS3**: Diseño responsivo
- **JavaScript**: Lógica dinámica

### Backend
- **Node.js**: Runtime
- **Express**: Servidor web
- **ExcelJS**: Generación de Excel
- **Google Sheets API**: Integración Google Drive

### Almacenamiento
- **JSON**: Datos locales
- **Excel**: Datos en Google Drive
- **Google Drive**: Nube

### Características
- ✅ Sin base de datos compleja
- ✅ Fácil de instalar
- ✅ Bajo consumo de recursos
- ✅ Funciona offline (excepto Google Drive)

---

## 📞 Soporte

### ¿No entiende algo?
→ Ver [QUICKSTART.md](QUICKSTART.md)

### ¿Quiere personalizar?
→ Ver [CUSTOMIZATION.md](CUSTOMIZATION.md)

### ¿Quiere instalar desde cero?
→ Ver [SETUP_WINDOWS.md](SETUP_WINDOWS.md)

### ¿Quiere documentación completa?
→ Ver [README.md](README.md)

---

## ✅ Checklist Pre-Producción

- [ ] npm install (ejecutado)
- [ ] npm start (funciona)
- [ ] Formulario carga en http://localhost:3000
- [ ] Puedo completar y enviar datos
- [ ] Los datos se guardan en licencias_data.json
- [ ] (Opcional) Google Drive configurado
- [ ] Cambié colores/título si lo necesité
- [ ] Usuarios entienden cómo usar

---

## 🎉 ¡Listo para Usar!

```
┌─────────────────────────────────────────┐
│   Tu sistema está listo para usar       │
│                                         │
│   npm start                              │
│   http://localhost:3000                 │
│                                         │
│   ¡Disfruta! 🚀                         │
└─────────────────────────────────────────┘
```

---

**Creado**: Febrero 2026  
**Para**: Instituto Educativo  
**Propósito**: Simplificar gestión de licencias del personal
