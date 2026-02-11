# Inicio Rápido

## ⚡ En 5 minutos (sin Google Drive)

### 1. Instalación
```powershell
cd c:\Projects\Form
npm install
```

### 2. Ejecutar
```powershell
npm start
```

### 3. Usar
Abrir: http://localhost:3000

✅ ¡Listo! El formulario está funcionando.

Los datos se guardan en `licencias_data.json`

---

## 🚀 Con Google Drive (10 minutos más)

Si necesitas guardar en Google Drive automáticamente:

### 1. Preparar credenciales Google (una sola vez)
- [Seguir los pasos en SETUP_WINDOWS.md](SETUP_WINDOWS.md) - Paso 4

### 2. Crear archivo .env
En la carpeta del proyecto, crear archivo `.env`:

```env
PORT=3000
GOOGLE_DRIVE_FOLDER_ID=mi-id-de-carpeta
GOOGLE_CREDENTIALS_JSON={"type":"service_account",...}
```

### 3. Reiniciar servidor
```powershell
npm start
```

✅ Ahora los datos se guardan en Google Drive automáticamente.

---

## 📋 Funcionalidades

### El formulario incluye:

✓ **Datos Personales**: Nombre, Apellido, DNI, Email, Celular  
✓ **Fechas**: Inicio y fin de licencia  
✓ **Motivo**: Descripción y número de artículo  
✓ **Funciones**: Opciones múltiples con campos dinámicos  
✓ **Validación**: Verificación automática de datos  
✓ **Almacenamiento**: Excel mensual automático en Google Drive  

### Campos dinámicos por función:

- **Docente 1°/2°/3°/4° año**: Subespacios + Comisión + Observaciones
- **Docente Periodismo/Natación**: Solo observaciones
- **Otros roles**: Solo observaciones

---

## 🔧 Comandos Útiles

```powershell
# Instalar dependencias
npm install

# Iniciar servidor
npm start

# Iniciar con auto-reinicio (requiere instalar nodemon)
npm run dev

# Instalar nodemon
npm install --save-dev nodemon
```

---

## 📁 Estructura

```
Form/
├── index.html              # Formulario (lo que ve el usuario)
├── styles.css              # Estilos
├── script.js               # Lógica del formulario
├── server.js               # Servidor
├── googleDriveService.js   # Integración Google Drive
├── package.json            # Dependencias
├── .env                    # Configuración (crear tú mismo)
├── licencias_data.json     # Datos guardados localmente
└── README.md               # Documentación completa
```

---

## 🆘 Problemas Comunes

| Problema | Solución |
|----------|----------|
| "npm no se reconoce" | Instalar Node.js desde nodejs.org |
| Puerto 3000 en uso | Cambiar PORT en .env a 3001 |
| Google Drive no funciona | Es normal - funciona sin él. Ver README si necesitas configurar |
| Datos no se guardan | Verificar que npm start está ejecutándose |

---

## 📚 Documentación Completa

- **README.md**: Guía completa con todas las características
- **SETUP_WINDOWS.md**: Instalación detallada paso a paso
- **googleDriveService.js**: Código de integración Google Drive

---

## ✨ Personalización Fácil

### Cambiar colores
Editar `styles.css`:
```css
--primary-color: #tu-color;
--secondary-color: #tu-color;
```

### Agregar/quitar campos
Editar `index.html` (las secciones)

### Cambiar funciones o subespacios
Editar `script.js` (SUBESPACIOS y COMISIONES)

---

¿Preguntas? Revisar README.md o SETUP_WINDOWS.md
