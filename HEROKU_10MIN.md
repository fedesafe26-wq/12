# 🚀 DEPLOY A HEROKU EN 10 MINUTOS

**Heroku es la forma más fácil de llevar tu app a internet.**

---

## ⚡ Pasos Rápidos

### 1. Crear Cuenta Heroku (2 min)
```
https://www.heroku.com/
Click "Sign up"
Completar registro
Confirmar email
```

### 2. Instalar Heroku CLI (2 min)
```bash
# Descargar:
# https://devcenter.heroku.com/articles/heroku-cli

# Verificar:
heroku --version
```

### 3. Preparar Tu Código (2 min)
```bash
cd c:\Projects\Form

# Inicializar Git (si no existe):
git init
git add .
git commit -m "Initial commit"

# Login Heroku:
heroku login
# Se abre navegador, confirmar
```

### 4. Crear App en Heroku (1 min)
```bash
heroku create tu-app-unico

# Ejemplos:
# heroku create licencias-2026
# heroku create mi-app-licencias
```

### 5. Agregar Token Dropbox (1 min)
```bash
heroku config:set DROPBOX_ACCESS_TOKEN=sl.tuTokenAqui

# Reemplazar "sl.tuTokenAqui" con tu token real de Dropbox
```

### 6. Subir Código (2 min)
```bash
git push heroku master
# O si tu rama es 'main':
git push heroku main
```

Espera mientras compila... (1-2 minutos)

### 7. ¡Ya Está! 🎉
```bash
heroku open
```

Tu app estará en: `https://tu-app-unico.herokuapp.com`

---

## 📋 Resumen

| Paso | Tiempo | Acción |
|------|--------|--------|
| 1 | 2 min | Sign up en heroku.com |
| 2 | 2 min | Instalar Heroku CLI |
| 3 | 2 min | `cd` a carpeta + `git init` |
| 4 | 1 min | `heroku login` |
| 5 | 1 min | `heroku create nombre` |
| 6 | 1 min | `heroku config:set DROPBOX_...` |
| 7 | 2 min | `git push heroku main` |
| **TOTAL** | **10 min** | ¡APP ONLINE! |

---

## ✅ Comandos Lista

```bash
# Copiar y pegar en PowerShell:

cd c:\Projects\Form

git init
git add .
git commit -m "Initial deploy"

heroku login
heroku create tu-app-unico
heroku config:set DROPBOX_ACCESS_TOKEN=sl.tuTokenAqui
git push heroku master
heroku open
```

Eso es todo. Tu app estará online en 10 minutos.

---

## ❓ Preguntas

**P: ¿Qué es "tu-app-unico"?**  
R: Un nombre único para tu app. Ej: `licencias-2026`, `mi-app-licencias`

**P: ¿Dónde obtengo el token?**  
R: https://www.dropbox.com/developers/apps → Crear app → Generate token

**P: ¿Cuánto cuesta?**  
R: Gratis los primeros 550 dyno-horas/mes (suficiente). Después ~$7/mes.

**P: ¿Los archivos se guardan?**  
R: Sí, en Dropbox. Heroku no mantiene archivos, pero tu app guarda todo en la nube.

**P: ¿Puedo tener un dominio personalizado?**  
R: Sí, agregar con: `heroku domains:add www.tudominio.com`

---

## 🔗 Links Útiles

- Heroku: https://www.heroku.com
- Heroku CLI: https://devcenter.heroku.com/articles/heroku-cli
- Ver logs: `heroku logs --tail`
- Ayuda: `heroku --help`

---

**¡Listo! Tu app estará online en 10 minutos.** 🚀
