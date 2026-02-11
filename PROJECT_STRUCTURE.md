# Estructura Visual del Proyecto

## 📊 Vista General

```
┌─────────────────────────────────────────────────────────────┐
│                  SISTEMA DE CONTROL DE LICENCIAS             │
│                      Instituto Educativo                      │
└─────────────────────────────────────────────────────────────┘
                              │
                              ├─ Frontend
                              ├─ Backend
                              └─ Base de Datos
```

---

## 🏗️ Arquitectura

```
USUARIO (Navegador)
   │
   └─ http://localhost:3000
        │
        ├─ index.html        (Interfaz)
        ├─ styles.css        (Diseño)
        └─ script.js         (Lógica cliente)
        
                │
                ├─ (Envía formulario)
                │
                ↓
        
SERVER (Node.js)
   │
   ├─ server.js              (Servidor principal)
   ├─ googleDriveService.js  (Integración nube)
   └─ package.json           (Dependencias)
   
                │
                ├─ POST /api/save-license
                │
                ├─ Valida datos
                │
                ├─ Guarda en:
                │
                ├─ Google Drive (si configurado)
                │  └─ Excel mensual
                │
                └─ Local (siempre)
                   └─ licencias_data.json
```

---

## 📁 Árbol de Archivos

```
c:\Projects\Form\
│
├── 📄 Archivos Principales
│   ├── index.html              Formulario web
│   ├── styles.css              Estilos CSS
│   ├── script.js               Lógica JavaScript
│   ├── server.js               Servidor Express
│   ├── googleDriveService.js   Integración Google
│   └── package.json            Dependencias npm
│
├── 📋 Configuración
│   ├── .env                    Config (crear manualmente)
│   ├── .env.example            Template de .env
│   └── .gitignore              Archivos a ignorar
│
├── 📚 Documentación
│   ├── INDEX.md                Esta - punto de inicio
│   ├── QUICKSTART.md           Inicio rápido (5 min)
│   ├── SETUP_WINDOWS.md        Instalación detallada
│   ├── CUSTOMIZATION.md        Guía de personalización
│   └── README.md               Documentación completa
│
├── 💾 Datos
│   └── licencias_data.json     Datos locales (auto-generado)
│
└── 📦 node_modules/            Dependencias (auto-generado)
    └── [múltiples paquetes]
```

---

## 🔄 Flujo de Control

### 1. Usuario Abre la Aplicación

```
Usuario abre Chrome
    ↓
Navega a: http://localhost:3000
    ↓
index.html se carga
    ↓
script.js se ejecuta
    ↓
Formulario listo para usar
```

### 2. Usuario Completa Formulario

```
Usuario selecciona función
    ↓
script.js detecta cambio
    ↓
Campos dinámicos aparecen
    ↓
Usuario completa todos los datos
    ↓
Usuario hace click en "Registrar"
    ↓
script.js valida datos
```

### 3. Envío de Datos

```
Datos válidos
    ↓
Se envía al servidor via POST
    ↓
server.js recibe datos
    ↓
googleDriveService.js procesa
    ↓
Decide dónde guardar:
    ├─ Google Drive (si existe .env)
    │  └─ Crea/actualiza Excel
    │
    └─ Local (siempre)
       └─ Actualiza licencias_data.json
```

### 4. Confirmación

```
Datos guardados exitosamente
    ↓
Servidor envía respuesta
    ↓
JavaScript muestra modal de éxito
    ↓
Usuario ve: "¡Registrado exitosamente!"
```

---

## 🔌 Integración de Componentes

```
┌─────────────────────────────────────────────────────────┐
│                      FRONTEND                            │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐  │
│  │  index.html  │  │  styles.css  │  │  script.js   │  │
│  │              │  │              │  │              │  │
│  │ • Estructura │  │ • Colores    │  │ • Eventos    │  │
│  │ • Campos     │  │ • Responsive │  │ • Validación │  │
│  │ • Labels     │  │ • Animación  │  │ • Envío      │  │
│  └──────────────┘  └──────────────┘  └──────────────┘  │
└─────────────────────────────────────────────────────────┘
                       ↓ HTTP POST ↓
┌─────────────────────────────────────────────────────────┐
│                      BACKEND                             │
│              Node.js + Express                           │
│  ┌──────────────────────────────────────────────────┐   │
│  │              server.js                           │   │
│  │ • Puerto 3000                                    │   │
│  │ • Rutas /api/save-license                        │   │
│  │ • Manejo de solicitudes                          │   │
│  └──────────────────────────────────────────────────┘   │
│                       ↓ Procesa ↓                        │
│  ┌──────────────────────────────────────────────────┐   │
│  │          googleDriveService.js                   │   │
│  │ • Autentica Google Drive                         │   │
│  │ • Crea carpeta mensual                           │   │
│  │ • Genera Excel                                   │   │
│  │ • Guarda JSON local                              │   │
│  └──────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────┘
```

---

## 📈 Funciones Dinámicas

```
Usuario selecciona:
┌────────────────────────────────────────────┐
│ ☐ Docente 1° año                          │
│ ☐ Docente 2° año                          │
│ ☐ Docente 3° año                          │
│ ☐ Personal de Gestión                     │
│ ☐ Personal de Biblioteca                  │
│ ...                                        │
└────────────────────────────────────────────┘
        ↓ script.js maneja cambios
        ↓
Para cada selección:

├─ Docente 1°/2°/3°/4° año
│  ├─ Mostrar: Select Subespacios
│  ├─ Mostrar: Select Comisión
│  └─ Mostrar: Textarea Observaciones
│
├─ Docente Periodismo/Natación
│  └─ Mostrar: Textarea Observaciones (solo)
│
└─ Otros roles
   └─ Mostrar: Textarea Observaciones (solo)
```

---

## 🌐 Almacenamiento

```
                    Datos del Formulario
                            │
                            ├─ Validación ✓
                            │
                    ┌───────┴──────┐
                    │              │
                    ↓              ↓
            
        SIN Google Drive    CON Google Drive
            (Simple)            (Óptimo)
        
        Local Storage       Cloud Storage
        │                   │
        ├─ licencias_data.json  ├─ Google Drive API
        │                   │
        ├─ Archivo JSON     ├─ Carpeta mensual
        │                   │
        ├─ Tu computadora   ├─ Excel automático
        │                   │
        └─ Siempre activo   └─ Sincronizado
```

---

## 🎨 Interfaz de Usuario

```
┌─────────────────────────────────────────────────────────┐
│  Sistema de Control de Licencias - Instituto Educativo  │
├─────────────────────────────────────────────────────────┤
│                                                         │
│  SECCIÓN 1: Datos Personales                           │
│  ┌─────────────────────────────────────────────────┐   │
│  │ [Nombre]              [Apellido]                │   │
│  │ [DNI]                 [Email]                   │   │
│  │ [Celular]                                       │   │
│  └─────────────────────────────────────────────────┘   │
│                                                         │
│  SECCIÓN 2: Fechas de Licencia                         │
│  ┌─────────────────────────────────────────────────┐   │
│  │ [Fecha Inicio]        [Fecha Fin]               │   │
│  └─────────────────────────────────────────────────┘   │
│                                                         │
│  SECCIÓN 3: Motivo de Ausencia                         │
│  ┌─────────────────────────────────────────────────┐   │
│  │ [Motivo...]                                     │   │
│  │ [Número de Artículo]                            │   │
│  └─────────────────────────────────────────────────┘   │
│                                                         │
│  SECCIÓN 4: Funciones                                  │
│  ┌─────────────────────────────────────────────────┐   │
│  │ ☐ Docente 1°        ☐ Docente 2°              │   │
│  │ ☐ Docente 3°        ☐ Personal Gestión        │   │
│  │ ...                                             │   │
│  └─────────────────────────────────────────────────┘   │
│                                                         │
│  SECCIÓN 5: Campos Dinámicos (aparecen según selección)│
│  ┌─────────────────────────────────────────────────┐   │
│  │ [Subespacios]         [Comisión]                │   │
│  │ [Observaciones...]                              │   │
│  └─────────────────────────────────────────────────┘   │
│                                                         │
│                [Limpiar] [Registrar Licencia]          │
├─────────────────────────────────────────────────────────┤
│ © 2026 Sistema de Control de Licencias                 │
└─────────────────────────────────────────────────────────┘
```

---

## 📊 Datos en Excel

```
Licencias - Febrero 2026.xlsx
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

│ Fecha/Hora │ Nombre │ Apellido │ DNI │ Email │ Celular │ Fechas │ Motivo │ Observaciones │
├────────────┼────────┼──────────┼─────┼───────┼─────────┼────────┼────────┼───────────────┤
│ 10/02 14:30│ Juan   │ Pérez    │1234 │ juan@ │1123456  │ 12-20  │ Médico │ Cirugía menor │
│ 11/02 09:45│ María  │ González │5678 │ maria@│1198765  │ 14-28  │ Otra   │ Motivos pers. │
│ 12/02 11:20│ Pedro  │ Rodríguez│9012 │ pedro@│1156789  │ 15-17  │ Médico │ Odontología   │
├────────────┼────────┼──────────┼─────┼───────┼─────────┼────────┼────────┼───────────────┤
```

---

## 🔐 Variables de Entorno (en .env)

```
┌─────────────────────────────────────────────┐
│            CONFIGURACIÓN DEL SISTEMA        │
├─────────────────────────────────────────────┤
│                                             │
│ Puerto:                                    │
│ PORT=3000                                  │
│                                             │
│ Google Drive (solo si lo necesitas):       │
│ GOOGLE_DRIVE_FOLDER_ID=tuIDaqui           │
│ GOOGLE_CREDENTIALS_JSON={...}              │
│                                             │
└─────────────────────────────────────────────┘
```

---

## 🚀 Ciclo de Vida

```
1. INSTALACIÓN
   npm install
   ↓ Descarga dependencias
   
2. CONFIGURACIÓN
   Crear .env (opcional)
   ↓ Define puerto y Google Drive
   
3. INICIO
   npm start
   ↓ Arranca servidor en puerto 3000
   
4. USO
   http://localhost:3000
   ↓ Usuario completa formulario
   
5. GUARDADO
   POST /api/save-license
   ↓ Datos validados y guardados
   
6. ALMACENAMIENTO
   JSON local + Excel en Drive
   ↓ Backup automático
   
7. CONFIRMACIÓN
   Modal de éxito mostrado
   ↓ Usuario confirma
   
8. NUEVO REGISTRO
   Formulario limpio, listo para el siguiente
```

---

## 🔄 Relacionado con Funciones

```
Cada función en el sistema tiene un "tipo":

TIPO: docente_primer_año
├─ Subespacios: FM I GIMNASIA, FM I INFANTIL, ...
├─ Comisiones: A, B, C, D, ...
└─ Observaciones: Sí

TIPO: docente_segundo_año
├─ Subespacios: FM II GIMNASIA, FM II NATURALEZA, ...
├─ Comisiones: A, B, C, D, ...
└─ Observaciones: Sí

TIPO: docente_simple (Periodismo, Natación)
├─ Subespacios: No
├─ Comisiones: No
└─ Observaciones: Sí

TIPO: simple (Personal de Gestión, etc.)
├─ Subespacios: No
├─ Comisiones: No
└─ Observaciones: Sí
```

---

## 📞 Contacta Soporte

```
Archivo → Para qué
─────────────────────────────────────────────────
INDEX.md              → Visión general
QUICKSTART.md         → Primeros pasos (5 min)
SETUP_WINDOWS.md      → Instalación paso a paso
CUSTOMIZATION.md      → Personalización
README.md             → Documentación completa

¿No encuentras respuesta? Ver los comentarios en:
- index.html (estructura)
- styles.css (diseño)
- script.js (lógica cliente)
- server.js (lógica servidor)
```

---

**Última actualización**: Febrero 2026  
**Versión**: 1.0.0
