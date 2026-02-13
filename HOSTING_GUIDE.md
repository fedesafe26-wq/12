# 🌐 GUÍA DE HOSTING: Subir tu App a Internet

**Tu aplicación está lista para hosting.** Aquí te mostramos 3 opciones:

---

## 📋 Requisitos Antes de Subir

✅ Tienes token de Dropbox configurado  
✅ Has probado localmente (`npm start`)  
✅ Tienes cuenta en una plataforma de hosting

---

## 🚀 Opción 1: HEROKU (Más Fácil - RECOMENDADO)

### Paso 1: Crear Cuenta
1. Ir a: https://www.heroku.com
2. Click "Sign up"
3. Completar registro (email, nombre, contraseña)
4. Confirmar email

### Paso 2: Instalar Heroku CLI
```bash
# Descargar e instalar desde:
# https://devcenter.heroku.com/articles/heroku-cli

# Verificar instalación:
heroku --version
```

### Paso 3: Preparar Tu Carpeta
```bash
cd c:\Projects\Form

# Login en Heroku
heroku login

# Crear aplicación Heroku
heroku create nombre-de-tu-app-unico

# Por ejemplo:
# heroku create licencias-app-2026
```

### Paso 4: Configurar Variables de Entorno
```bash
# Agregar token de Dropbox
heroku config:set DROPBOX_ACCESS_TOKEN=sl.tuTokenAqui

# Verificar:
heroku config
```

### Paso 5: Subir Código
```bash
# Git no está inicializado? Inicializa:
git init
git add .
git commit -m "Deploy inicial de aplicación de licencias"

# Subir a Heroku:
git push heroku master
# o si usas main:
git push heroku main
```

### Paso 6: Ver En Vivo
```bash
heroku open

# O manualmente:
# https://nombre-de-tu-app-unico.herokuapp.com
```

### Paso 7 (Importante): Usar Sistema de Archivos del Servidor

⚠️ **NOTA IMPORTANTE:** Heroku no mantiene archivos persistentes. La carpeta `exports/` se eliminará.

Solución: **Los archivos Excel solo se guardan en Dropbox** automáticamente.

---

## 🚀 Opción 2: VERCEL (Recomendado para Node.js)

### Paso 1: Crear Cuenta
1. Ir a: https://vercel.com
2. Click "Sign Up"
3. Usar GitHub/GitLab/Bitbucket o email

### Paso 2: Instalar Vercel CLI
```bash
npm install -g vercel
```

### Paso 3: Desplegar
```bash
cd c:\Projects\Form

# Login:
vercel login

# Deploy:
vercel --prod

# Preguntas:
# - Project name: licencias-app
# - Directory: . (punto)
# - Override settings: N
```

### Paso 4: Agregar Secrets
En https://vercel.com/dashboard:
1. Selecciona tu proyecto
2. Settings → Environment Variables
3. Agregar: `DROPBOX_ACCESS_TOKEN = sl.tuTokenAqui`

### Paso 5: Redeploy
```bash
vercel --prod
```

Tu app estará en: `https://licencias-app.vercel.app`

---

## 🚀 Opción 3: RENDER (Alternativa Buena)

### Paso 1: Crear Cuenta
1. Ir a: https://render.com
2. Sign up con email o GitHub

### Paso 2: Crear Nuevo Web Service
1. Dashboard → New (+)
2. "Web Service"
3. Conectar repositorio GitHub o usar "Public Git repository"

### Paso 3: Configurar
```
Name: licencias-app
Region: Cerca de ti (EU, US, etc.)
Branch: main o master
Build Command: npm install
Start Command: npm start
```

### Paso 4: Agregar Variable de Entorno
En la sección "Environment":
```
Key: DROPBOX_ACCESS_TOKEN
Value: sl.tuTokenAqui
```

### Paso 5: Deploy
Click "Create Web Service"

Tu app estará en: `https://licencias-app.onrender.com`

---

## 🌍 Opción 4: Tu Propio Servidor (VPS)

Si tienes un VPS (DigitalOcean, Linode, etc.):

### Instalación en el Servidor

```bash
# SSH en tu servidor:
ssh usuario@tu-servidor.com

# Instalar Node.js (si no está):
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# Clonar repositorio:
git clone https://github.com/tu-usuario/licencias-app.git
cd licencias-app

# Instalar dependencias:
npm install

# Crear .env con token:
echo "DROPBOX_ACCESS_TOKEN=sl.tuTokenAqui" > .env
echo "PORT=3000" >> .env
```

### Usar PM2 (para mantener app ejecutándose):
```bash
# Instalar PM2 globalmente:
sudo npm install -g pm2

# Iniciar app:
pm2 start server.js --name "licencias-app"

# Configurar para reiniciar en reboot:
pm2 startup
pm2 save
```

### Usar Nginx (como proxy reverso):
```bash
sudo apt-get install nginx

# Crear archivo de configuración:
sudo nano /etc/nginx/sites-available/licencias-app
```

Contenido:
```nginx
server {
    listen 80;
    server_name tudominio.com www.tudominio.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

Activar:
```bash
sudo ln -s /etc/nginx/sites-available/licencias-app /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx
```

### SSL (HTTPS):
```bash
sudo apt-get install certbot python3-certbot-nginx
sudo certbot --nginx -d tudominio.com -d www.tudominio.com
```

---

## 📝 Checklist Pre-Deploy

Antes de subir a producción, verifica:

- [ ] Token de Dropbox configurado
- [ ] `.env` tiene `DROPBOX_ACCESS_TOKEN` correcto
- [ ] Probaste localmente: `npm start`
- [ ] Visitaste `http://localhost:3000`
- [ ] Llenaste formulario de prueba
- [ ] Excel se generó en Dropbox
- [ ] `package.json` tiene todas las dependencias
- [ ] No hay archivos `.env` reales en git (solo `.env.example`)
- [ ] `.gitignore` excluye `node_modules/`, `.env`, `exports/`

---

## 🔒 Variables de Entorno en Producción

**NUNCA** pongas variables sensibles en el código.

### Heroku:
```bash
heroku config:set DROPBOX_ACCESS_TOKEN=sl.tuTokenAqui
```

### Vercel:
Dashboard → Project → Settings → Environment Variables

### Render:
Dashboard → Web Service → Environment

### VPS Propio:
Archivo `.env` no versionado en git (en `.gitignore`)

---

## 🌐 URL Personalizada (Dominio)

### Heroku:
```bash
heroku domains:add www.tudominio.com
```

### Vercel:
Settings → Domains → Add

### Render:
Web Service → Settings → Custom Domain

### VPS:
Apunta el DNS a tu server IP

---

## 📊 Monitoreo en Producción

### Heroku:
```bash
# Ver logs:
heroku logs --tail

# Reiniciar:
heroku restart
```

### Vercel:
Dashboard → Deployments → Ver logs

### Render:
Dashboard → Logs

### VPS:
```bash
pm2 log licencias-app
pm2 status
```

---

## 🆘 Troubleshooting

### "Application error" en Heroku

```bash
heroku logs --tail
# Ver qué salió mal
```

### "Port already in use"

```bash
# El puerto 3000 está ocupado
# Cambiar PORT en .env:
PORT=8080
```

### "Cannot find module"

```bash
# Falta instalar dependencias
npm install
git add package-lock.json
git commit -m "Update dependencies"
git push heroku main
```

### "Dropbox token inválido"

```bash
# Verificar que el token está bien:
heroku config | grep DROPBOX

# Si está mal, updatear:
heroku config:set DROPBOX_ACCESS_TOKEN=nuevoToken
```

---

## 💡 Tips de Producción

### 1. Respaldos
Tus archivos Excel están en Dropbox (cloud), pero haz respaldo:
```bash
# Descargar periódicamente tu Dropbox
```

### 2. Monitoreo
Crea alertas si tu app se cae:
- Heroku tiene Dyno Metrics
- Vercel tiene Analytics
- Render tiene Monitoring

### 3. Actualizaciones
```bash
# Hacer cambios locales:
# git add, commit, push

# En Heroku:
git push heroku main

# En Vercel:
vercel --prod
```

### 4. Escalabilidad
Si crece el uso:
- **Heroku:** Cambiar dyno size
- **Vercel:** Escala automáticamente
- **Render:** Cambiar plan
- **VPS:** Aumentar RAM/CPU

---

## 🎯 Resumen Rápido

| Hosting | Dificultad | Costo | Mejor Para |
|---------|-----------|-------|-----------|
| Heroku | ⭐⭐ Fácil | $7-50/mes | Prototipo → Producción |
| Vercel | ⭐ Muy fácil | Gratis-$20/mes | Apps Node.js |
| Render | ⭐⭐ Fácil | $0-66/mes | Alternativa a Heroku |
| VPS | ⭐⭐⭐⭐ Difícil | $5-100/mes | Total control |

**Recomendación:** Heroku o Vercel para empezar.

---

## ✅ ¡Siguientes Pasos!

1. Elige una opción (recomiendo **Heroku**)
2. Crea cuenta
3. Sigue los pasos
4. ¡Tu app estará online!

Cuando esté online:
- Comparte la URL con usuarios
- Ellos entran desde navegador
- Llenan formulario
- Excel se guarda en Dropbox automáticamente

---

**Guía de Hosting Completada**  
**Última actualización:** 10/02/2026  
**Estado:** Listo para llevar a producción
