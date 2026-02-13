# 🌐 APP LISTA PARA HOSTING - INSTRUCCIONES FINALES

**Tu aplicación está lista para ir a internet. Aquí están los últimos pasos.**

---

## ✅ Verificación Pre-Deploy

Antes de subir a hosting, asegúrate de:

### 1. Obtener Token de Dropbox
```
1. Ir a: https://www.dropbox.com/developers/apps
2. Click "Create app"
3. Seleccionar:
   - Scoped access
   - Full Dropbox
   - Full access
4. Nombre: "Licencias Instituto" (o el que quieras)
5. Click "Create app"
6. Tab "Settings" → "Generate" (bajo OAuth 2)
7. Copiar el token (empieza con "sl.")
```

**Guardalo en un lugar seguro.** Lo necesitarás para configurar hosting.

### 2. Verificar que Todo Funciona Localmente
```bash
cd c:\Projects\Form

# Crear .env mínimo:
echo DROPBOX_ACCESS_TOKEN=sl.tuTokenAqui > .env
echo PORT=3000 >> .env

# Iniciar:
npm start

# Probar:
# Abre: http://localhost:3000
# Llena formulario
# Verifica que Excel se crea en Dropbox
```

### 3. Limpiar Archivos Locales (No Subir a Hosting)
```bash
# Eliminar archivos que no deben ir:
del licencias_data.json
del exports/*.xlsx
rmdir /s exports

# Git ignorará automáticamente (ver .gitignore)
```

---

## 🚀 OPCIÓN RÁPIDA: Heroku (Recomendado)

### Paso 1: Instalar Git y Heroku CLI
```
Git: https://git-scm.com/downloads
Heroku CLI: https://devcenter.heroku.com/articles/heroku-cli

Verificar:
git --version
heroku --version
```

### Paso 2: Inicializar Git en Tu Carpeta
```bash
cd c:\Projects\Form

# Crear repositorio:
git init
git add .
git commit -m "Upload licencias app to hosting"

# Verificar:
git log (debe mostrar 1 commit)
```

### Paso 3: Crear Cuenta en Heroku
```
https://www.heroku.com
Sign up con email
Confirmar email
```

### Paso 4: Login y Crear App
```bash
heroku login
# Se abre navegador, confirmar

# Crear app (nombre único):
heroku create mi-app-licencias

# Resultado: 
# Created https://mi-app-licencias.herokuapp.com/
```

### Paso 5: Agregar Token Dropbox
```bash
heroku config:set DROPBOX_ACCESS_TOKEN=sl.tuTokenAqui
# Reemplazar con tu token real
```

### Paso 6: Subir Código
```bash
git push heroku master
# O si tu rama es 'main':
git push heroku main

# Esperar compilación... (2-3 minutos)
```

### Paso 7: ¡Ya Está!
```bash
# Ver en navegador:
heroku open

# URL = https://mi-app-licencias.herokuapp.com
```

**¡Tu app está online!** 🎉

---

## 🌐 OPCIÓN 2: Vercel (Alternativa)

```bash
npm install -g vercel

cd c:\Projects\Form

vercel

# Preguntas:
# - Scope: personal
# - Project name: licencias-app
# - Directory: . (punto actual)
# - Override settings: N (no)

# En dashboard.vercel.com:
# 1. Proyecto → Settings → Environment Variables
# 2. Add: DROPBOX_ACCESS_TOKEN = sl.tuTokenAqui
# 3. Redeploy

vercel --prod
# URL = https://licencias-app.vercel.app
```

---

## 📋 OPCIÓN 3: Render (Alternativa)

1. https://render.com
2. Sign up
3. New → Web Service
4. Connect GitHub o "Public Git repository"
5. Configure:
   - Name: licencias-app
   - Build: `npm install`
   - Start: `npm start`
6. Environment Variables:
   - DROPBOX_ACCESS_TOKEN = sl.tuTokenAqui
7. Deploy

URL: `https://licencias-app.onrender.com`

---

## 🔧 Verificación Post-Deploy

Después de desplegar, verifica que funciona:

### 1. Abrir URL en Navegador
```
https://tu-app.herokuapp.com (o vercel.app, onrender.com)
```

### 2. Probando Formulario
- Completar todos los campos
- Seleccionar funciones y subespacios/comisiones
- Enviar

### 3. Verificar Excel
- Ir a https://www.dropbox.com
- Navegar a `/Licencias Instituto/Nombre_Apellido/`
- Descargar `Registro_*.xlsx`
- Verificar que tiene datos

### 4. Ver Logs (si hay error)
```bash
# Heroku:
heroku logs --tail

# Vercel:
vercel logs

# Render:
Dashboard → Logs
```

---

## 🎯 Estructura de Tu Hosting

```
Hosting (Heroku/Vercel/Render)
    ↓
Ejecuta: node server.js
    ↓
    ├─ Sirve: index.html (formulario)
    ├─ Sirve: script.js (lógica)
    ├─ Sirve: styles.css (estilos)
    │
    └─ API /api/save-license
       └─ Conecta a Dropbox
          ├─ Crea carpeta usuario
          ├─ Genera Excel
          └─ Sube archivo
```

Los datos NUNCA se guardan en el servidor web (por eso no necesita DB).  
Todo va a **Dropbox** (cloud persistente).

---

## 🔒 Variables Sensibles (Token)

**NUNCA** hagas esto:
```javascript
const token = "sl.BkXXXXXXXXX"; // ❌ INCORRECTO
```

**Usa esto en lugar:**
```javascript
const token = process.env.DROPBOX_ACCESS_TOKEN; // ✅ CORRECTO
```

El token se guarda en las variables de entorno del hosting:
- **Heroku:** `heroku config:set`
- **Vercel:** Dashboard → Environment Variables
- **Render:** Web Service → Environment

**El archivo `.env` NUNCA se sube a Git** (está en `.gitignore`).

---

## 📊 Costos Estimados

| Hosting | Precio | Almacenamiento |
|---------|--------|----------------|
| Heroku | $0-7/mes | Ephemeral (no persiste) |
| Vercel | $0-20/mes | Almacenamiento ilimitado |
| Render | $0-7/mes | Persistente |
| Dropbox | $11.99/mes | 2TB (separado) |

**Total:** ~$20-30/mes para hosting + Dropbox (almacenamiento)

---

## 🎯 Checklist Final

- [ ] Token Dropbox obtenido y guardado
- [ ] `.env` tiene token correcto
- [ ] Probado localmente: `npm start`
- [ ] Formulario funciona
- [ ] Excel se genera en Dropbox
- [ ] Git inicializado: `git init`
- [ ] Primer commit hecho: `git commit -m "..."`
- [ ] Cuenta creada en Heroku (o Vercel/Render)
- [ ] Heroku CLI instalado: `heroku --version`
- [ ] App creada: `heroku create nombre`
- [ ] Token configurado: `heroku config:set`
- [ ] Código subido: `git push heroku main`
- [ ] App online: `heroku open`
- [ ] Probado en navegador la URL
- [ ] Formulario funciona en hosting
- [ ] Excel se guarda en Dropbox ✅

---

## 💡 Próximo Paso

**Elige tu hosting preferido e implementa usando:**

1. **Heroku (Fácil):** Lee [HEROKU_10MIN.md](HEROKU_10MIN.md)
2. **Vercel (Fácil):** Lee [HOSTING_GUIDE.md](HOSTING_GUIDE.md) - Opción 2
3. **Render (Fácil):** Lee [HOSTING_GUIDE.md](HOSTING_GUIDE.md) - Opción 3
4. **VPS Propio (Avanzado):** Lee [HOSTING_GUIDE.md](HOSTING_GUIDE.md) - Opción 4

---

## 🆘 Troubleshooting Rápido

### "Dice 'Application Error'"
```bash
heroku logs --tail
# Ver qué salió mal
```

### "Dropbox no sincroniza"
```bash
# Verificar token:
heroku config | grep DROPBOX

# Si está mal:
heroku config:set DROPBOX_ACCESS_TOKEN=nuevoToken
```

### "Cannot find module"
```bash
# Reinstalar:
rm -r node_modules
npm install
git add package-lock.json
git commit -m "Update deps"
git push heroku main
```

---

## 🎊 ¡Listo!

Tu aplicación está lista para internet.

**En 15-30 minutos:**
- ✅ Código en hosting
- ✅ Accesible desde URL
- ✅ Usuarios llenos formularios
- ✅ Excel en Dropbox automáticamente

**¡Elige un hosting y sigue los pasos!** 🚀

---

**Guía de Producción Completa**  
**Última actualización:** 10/02/2026  
**Status:** ✅ Listo para llevar a internet
