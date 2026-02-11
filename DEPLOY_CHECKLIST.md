# 📋 CHECKLIST ANTES DE SUBIR A HOSTING

Usa este checklist para asegurar que todo está listo.

---

## ✅ FASE 1: PREPARACIÓN TÉCNICA

- [ ] Tengo Node.js instalado
  ```bash
  node --version  # Debe mostrar versión (v14+)
  npm --version   # Debe mostrar versión
  ```

- [ ] Tengo Git instalado
  ```bash
  git --version   # Debe mostrar versión
  ```

- [ ] Tengo Heroku CLI instalado (si uso Heroku)
  ```bash
  heroku --version
  ```

- [ ] Carpeta c:\Projects\Form contiene:
  - [ ] server.js
  - [ ] index.html
  - [ ] script.js
  - [ ] styles.css
  - [ ] dropboxService.js
  - [ ] package.json
  - [ ] Procfile (nuevo)
  - [ ] vercel.json (nuevo)
  - [ ] .gitignore

---

## ✅ FASE 2: OBTENER CREDENTIALS

- [ ] Tengo Token de Dropbox
  - Obtener en: https://www.dropbox.com/developers/apps
  - Formato: `sl.BkXXXXXXXXXXXXXXXXX...`
  - Guardado en lugar seguro
  
- [ ] No he compartido el token con nadie
  - El token es como una contraseña
  - Nunca en código, solo en variables de entorno

---

## ✅ FASE 3: VERIFICACIÓN LOCAL

- [ ] Ejecuté `npm install` recientemente
  ```bash
  npm install  # Ver que no hay errores
  ```

- [ ] Tengo `.env` con valores:
  ```
  PORT=3000
  DROPBOX_ACCESS_TOKEN=sl.tuTokenReal
  ```

- [ ] Ejecuté `npm start` sin errores
  ```bash
  npm start
  # Debe mostrar: "Servidor ejecutándose en..."
  ```

- [ ] Abrí en navegador http://localhost:3000
  - [ ] Cargar formulario sin errores
  - [ ] F12 → Console (sin errores rojos)

- [ ] Llené y envié formulario de prueba
  - [ ] Nombre: TestUser
  - [ ] Apellido: TestApellido
  - [ ] Seleccionar funciones
  - [ ] Seleccionar Subespacios
  - [ ] Seleccionar Comisiones
  - [ ] Enviar

- [ ] Verifiqué en Dropbox
  - [ ] Abrí https://www.dropbox.com
  - [ ] Navegué a `/Licencias Instituto/TestUser_TestApellido/`
  - [ ] Bajé `Registro_*.xlsx`
  - [ ] Abrí en Excel y verifiqué datos

- [ ] Limpié archivos de prueba
  ```bash
  # Eliminar archivos locales de prueba
  del licencias_data.json
  # No eliminar código, solo datos generados
  ```

---

## ✅ FASE 4: PREPARAR GIT

- [ ] Inicialicé repositorio Git
  ```bash
  cd c:\Projects\Form
  git init
  ```

- [ ] Agregué archivos
  ```bash
  git add .
  ```

- [ ] Hice primer commit
  ```bash
  git commit -m "Initial commit: license management system"
  ```

- [ ] Verifiqué que Git funciona
  ```bash
  git log  # Debe mostrar 1 commit
  git status  # Debe mostrar "nothing to commit"
  ```

---

## ✅ FASE 5: ELEGIR HOSTING

- [ ] Decidí qué plataforma usar:
  - [ ] Heroku (fácil, recomendado)
  - [ ] Vercel (muy fácil)
  - [ ] Render (fácil)
  - [ ] VPS Propio (avanzado)

- [ ] Creé cuenta en plataforma elegida
  - Confirmar email

- [ ] Instalé CLI si es necesario
  - [ ] Heroku CLI (para Heroku)
  - [ ] Vercel CLI (para Vercel)

---

## ✅ FASE 6: CONFIGURACIÓN HOSTING

**Si eliges HEROKU:**
- [ ] Ejecuté `heroku login`
  - Confirmé en navegador
- [ ] Ejecuté `heroku create mi-app-unico`
- [ ] Ejecuté `heroku config:set DROPBOX_ACCESS_TOKEN=sl.token...`
- [ ] Verifiqué con `heroku config`

**Si eliges VERCEL:**
- [ ] Ejecuté `vercel`
- [ ] Seguí wizard (nombre, directorio, etc.)
- [ ] Agregué variable de entorno en dashboard.vercel.com

**Si eliges RENDER:**
- [ ] Creé web service manualmente
- [ ] Configuré Build y Start commands
- [ ] Agregué variables de entorno

---

## ✅ FASE 7: DEPLOY

- [ ] Subí código a hosting
  ```bash
  # Para Heroku:
  git push heroku main
  
  # Para Vercel:
  vercel --prod
  
  # Para Render:
  (automático si conectaste Git)
  ```

- [ ] Espere compilación (2-5 minutos)

- [ ] Obtuve URL de mi app
  - [ ] Heroku: `heroku open` → copiar URL
  - [ ] Vercel: dashboard → URL
  - [ ] Render: dashboard → URL

- [ ] Abrí URL en navegador
  - [ ] Formulario carga sin errores
  - [ ] F12 → Console (sin errores rojos)

---

## ✅ FASE 8: VALIDACIÓN POST-DEPLOY

- [ ] Probé formulario en hosting
  - [ ] Llenar todos los campos
  - [ ] Seleccionar funciones, subespacios, comisiones
  - [ ] Enviar

- [ ] Verifiqué en Dropbox
  - [ ] Ir a https://www.dropbox.com
  - [ ] Carpeta `/Licencias Instituto/Nombre_Apellido/` existe
  - [ ] Archivo `Registro_*.xlsx` existe
  - [ ] Descargar y abrir en Excel
  - [ ] Verificar datos (función, subespacio, comisión)

- [ ] Revisar logs si hay error
  ```bash
  # Heroku:
  heroku logs --tail
  
  # Vercel:
  vercel logs (desde CLI)
  
  # Render:
  Dashboard → Logs
  ```

---

## ✅ FASE 9: POST-PRODUCCIÓN

- [ ] Documenté la URL pública
  - Escribir en cuaderno o documento
  - Compartir con usuarios

- [ ] Probé que múltiples usuarios pueden acceder
  - Otra computadora
  - Otro navegador
  - Móvil

- [ ] Verifiche que Dropbox sincroniza todos los registros
  - Varios usuarios
  - Varios registros
  - Todos aparecen en Dropbox correctamente

- [ ] Creé respaldo de Dropbox
  - Descargar carpeta `/Licencias Instituto/`
  - Guardar en lugar seguro

- [ ] He dominios personalizados (opcional)
  - Si tengo dominio propio
  - Configurar DNS
  - Apuntar a hosting

---

## ✅ LISTA COMARCIAL

- [ ] URL está compartida con usuarios
- [ ] Usuarios pueden accesar desde navegador
- [ ] Usuarios pueden llenar formulario
- [ ] Usuarios pueden ver confirmación
- [ ] Excel se genera en Dropbox automáticamente
- [ ] Archivos Excel tienen todos los datos
- [ ] Sistema es accesible las 24/7
- [ ] He documentado como usar
- [ ] He creado plan de respaldo

---

## 🆘 SI ALGO FALLA

### "Application Error"
```bash
heroku logs --tail
# Ver error y buscar en Google
# Verificar que token es correcto
heroku config | grep DROPBOX
```

### "Formulario no carga"
- F12 → Console → ver error
- Verificar que archivos estáticos sirven:
  - http://tu-app/index.html ✅
  - http://tu-app/script.js ✅
  - http://tu-app/styles.css ✅

### "Dropbox no guarda"
```bash
# Verificar token:
heroku config
# Debe mostrar: DROPBOX_ACCESS_TOKEN=sl...

# Si está vacío o incorrecto:
heroku config:set DROPBOX_ACCESS_TOKEN=sl.tokenCorrecto
```

### "Puerto en conflicto"
- Cambiar PORT en variable de entorno
- Heroku asigna puerto automáticamente (no preocuparse)

---

## 📞 REFERENCIAS

- Heroku Help: `heroku --help`
- Vercel Docs: https://vercel.com/docs
- Render Docs: https://render.com/docs
- Dropbox API: https://www.dropbox.com/developers/documentation

---

## 🎉 ¡ÉXITO!

Si checaste todos los items:
✅ Tu app está en internet
✅ Usuarios pueden acceder
✅ Datos se guardan en Dropbox
✅ Sistema es 24/7

**¡Felicidades! 🚀**

---

**Checklist de Deploy**  
**Última actualización:** 10/02/2026  
**Uso:** Marcar items mientras avanzas
