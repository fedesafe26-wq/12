# 🚀 RAILWAY: DEPLOY GRATUITO EN 5 MINUTOS

**Railway es el hosting GRATUITO más fácil para tu app Node.js.**

---

## ⚡ EXPLICACIÓN RÁPIDA

Tu app Node.js necesita un servidor que entienda JavaScript.

| Hosting | Entiende Node.js |
|---------|------------------|
| InfinityFree | ❌ NO |
| Railway | ✅ SÍ |
| Replit | ✅ SÍ |
| Render | ✅ SÍ |

**Railway es el más fácil.**

---

## 🎯 PASOS (5 MINUTOS)

### 1️⃣ Crear Cuenta Railway (1 min)

```
Ir a: https://railway.app
Sign up con:
  - GitHub (recomendado)
  - Google
  - Email
```

### 2️⃣ Crear Proyecto (1 min)

```
Dashboard → New Project
Seleccionar: "Deploy from GitHub" o "Deploy from Repo"
```

### 3️⃣ Conectar Tu Código (2 min)

**Opción A: Si tienes GitHub**
1. Push tu código a GitHub
2. En Railway: autorizar GitHub
3. Seleccionar tu repositorio
4. Importar

**Opción B: Sin GitHub**
1. Descargar ZIP de tu carpeta
2. En Railway: "Deploy from Git"
3. Pegar URL git-repo O cargar ZIP
4. Importar

### 4️⃣ Agregar Variables de Entorno (1 min)

```
1. En Railway Dashboard → Project Settings
2. Variables → Add
3. Key: DROPBOX_ACCESS_TOKEN
4. Value: sl.tuTokenAqui
5. Save
```

### 5️⃣ Deploy (Automático)

Railway detecta automaticamente:
```
- Que es Node.js
- Que package.json existe
- Que hay server.js
- Deploy automáticamente
```

Esperar 2-3 minutos...

### 6️⃣ ¡URL Online!

```
https://tu-app-production-xxxxx.railway.app
```

¡Listo! Funciona.

---

## 📋 GUÍA PASO A PASO SIN GITHUB

**Si NO tienes GitHub:**

### Paso 1: Preparar Tu Carpeta
```bash
cd c:\Projects\Form

# Asegurar que existe:
# - server.js
# - package.json
# - index.html
# - script.js
# - styles.css
# - dropboxService.js
# - .env.example
# - .gitignore

# Crear ZIP sin node_modules:
# (Boton derecho → Enviar a → Carpeta comprimida)
```

### Paso 2: Crear Repositorio Git Temporal
```bash
git init
git add .
git commit -m "Upload to Railway"
```

### Paso 3: Usar Railway CLI
```bash
# Instalar Railway CLI:
npm install -g @railway/cli

# Login:
railway login
# Se abre navegador, autorizar

# Inicializar proyecto:
railway init
# Seleccionar: Node.js
# Project name: licencias-app

# Deploy:
railway up
# Esperar 2-3 minutos...
```

### Paso 4: Ver URL
```bash
railway logs
# Debe mostrar URL tipo:
# https://licencias-app-production-xxxxx.railway.app
```

### Paso 5: Agregar Token Dropbox
```bash
# En Railway:
railway service add env

# O en Dashboard:
# Project → Variables → Add
# DROPBOX_ACCESS_TOKEN = sl.token
```

### Paso 6: ¡Online!
```
Abre: https://licencias-app-production-xxxxx.railway.app
Prueba formulario
Verifica Excel en Dropbox
```

---

## 🔐 CONFIGURAR TOKEN DROPBOX

### Método 1: Railway Dashboard
```
1. railway.app → Project
2. Settings → Variables
3. Add New Variable
   Name: DROPBOX_ACCESS_TOKEN
   Value: sl.BkXXXXXXXXXXXXX...
4. Save
5. Railway redeploy automáticamente
```

### Método 2: CLI
```bash
railway variables
railway variable set DROPBOX_ACCESS_TOKEN=sl.token
```

---

## ✅ VERIFICAR QUE FUNCIONA

```bash
# 1. Abrir URL en navegador
https://tu-app-production-xxxxx.railway.app

# 2. Debe cargar formulario sin errores
# F12 → Console (sin errores rojos)

# 3. Llenar formulario:
#    - Todos los campos
#    - Funciones, Subespacios, Comisiones

# 4. Enviar

# 5. Verificar en Dropbox:
#    - https://www.dropbox.com
#    - Carpeta: /Licencias Instituto/Nombre_Apellido/
#    - Archivo: Registro_*.xlsx
```

---

## 📊 PRICING RAILWAY

| Plan | Precio | Para Ti |
|------|--------|---------|
| Gratis | $0 | Primeros $5/mes |
| Starter | $5/mes | Después, cobro por uso |

**¿Cuánto usarías?**
- 100 registros/mes = < $1
- 1000 registros/mes = $2-3

**Muy barato.** Probablemente gratis siempre.

---

## 🆘 TROUBLESHOOTING

### "Build failed"
```bash
# Ver logs:
railway logs

# Verificar que existe:
# - package.json
# - server.js
# - .gitignore

# Reinstalar:
rm -r node_modules
npm install
git add package-lock.json
git commit -m "Update deps"
railway up
```

### "Dropbox error"
```bash
# Verificar token:
railway variables
# Debe mostrar DROPBOX_ACCESS_TOKEN=sl...

# Si está vacío:
railway variable set DROPBOX_ACCESS_TOKEN=sl.tuToken
```

### "Port error"
```
Railway asigna PORT automáticamente
Tu app ya lo maneja en server.js:
const PORT = process.env.PORT || 3000;

Sin problema.
```

---

## 🔗 DOMINIO PERSONALIZADO (Opcional)

Si quieres `miapp.com` en lugar de URL Railway:

### Opción 1: Dominio Gratis
```
.railway.app = Gratis (lo genera Railway)
Ejemplo: tu-app-production.railway.app
```

### Opción 2: Tu Dominio
```
1. Comprar dominio ($1-10/año)
   - GoDaddy
   - Namecheap
   - Otros

2. En Railway: Settings → Domain
   Agregar dominio personalizado

3. Copiar DNS records

4. En proveedor dominio: Pegar DNS

5. Esperar 24h para propagación

Resultado: midominio.com → Railway
```

---

## 💡 TIPS

1. **Monitoreo:** Railway muestra logs en tiempo real
2. **Auto-restart:** Si cae, reinicia automáticamente
3. **Historial:** Puedes ver deployments anteriores
4. **Rollback:** Volver a versión anterior si rompes algo

---

## 🎯 RESUMEN

```
InfinityFree: ❌ NO FUNCIONA (no soporta Node.js)
Railway:      ✅ FUNCIONA (soporta Node.js)
Tiempo:       5 minutos
Costo:        Gratis ($5/mes con mucho uso)
Dominio:      railway.app (gratis) o personalizado
```

---

## ✅ SIGUIENTES PASOS

1. Ir a https://railway.app
2. Sign up (GitHub es más fácil)
3. Crear proyecto
4. Conectar código
5. Agregar DROPBOX_ACCESS_TOKEN
6. Deploy
7. ¡URL automática generada! ✅

**¿Listo? Avísame si necesitas ayuda en algún paso.** 🚀

---

**Railway Deploy Guide**  
**Última actualización:** 10/02/2026  
**Tiempo requerido:** 5 minutos  
**Costo:** GRATIS
