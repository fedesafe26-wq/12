# ⚡ INSTRUCCIONES RÁPIDAS: Empieza Ahora en 5 Minutos

**¿Quieres empezar AHORA? Sigue estos 4 pasos simples:**

---

## Paso 1️⃣: Preparar (30 segundos)

Abre PowerShell en `c:\Projects\Form`:

```powershell
cd c:\Projects\Form
npm install
```

---

## Paso 2️⃣: Configurar (30 segundos)

**Opción A: PRUEBA LOCAL (sin Dropbox)**
```powershell
# Crear archivo .env
echo PORT=3000 > .env

# ¡Listo! Sin Dropbox necesario
```

**Opción B: CON DROPBOX** (si quieres guardar en la nube)
```powershell
# Primero obtén token de:
# https://www.dropbox.com/developers/apps
# (Copiar el token)

# Luego crea .env con:
echo PORT=3000 > .env
echo DROPBOX_ACCESS_TOKEN=sl.BkXXXXXXXXXXXXXXXX >> .env
```

---

## Paso 3️⃣: Ejecutar (10 segundos)

```powershell
npm start
```

**Debe mostrar algo así:**
```
╔════════════════════════════════════════════╗
║   Sistema de Control de Licencias          ║
║   Servidor ejecutándose en:                ║
║   http://localhost:3000                    ║
╚════════════════════════════════════════════╝
```

---

## Paso 4️⃣: Probar (3 minutos)

### 4.1: Abrir el Formulario
```
Abre en el navegador:
http://localhost:3000
```

### 4.2: Llenar Completamente
```
Nombre:              Juan
Apellido:            Pérez
DNI:                 12345678
Email:               juan@instituto.edu
Celular:             1234567890

Fecha Inicio:        15/02/2026
Fecha Fin:           20/02/2026
Motivo:              Licencia médica
Artículo:            Art. 123

Funciones:           ☑ Docente Primer Año
                     ☑ Docente Segundo Año

Para CADA función:
  - Selecciona Subespacio (FM I GIMNASIA, etc.)  ⭐ IMPORTANTE
  - Selecciona Comisión (A, B, C, etc.)          ⭐ IMPORTANTE
  - Escribe Observaciones (opcional)
```

### 4.3: Enviar
```
[ENVIAR FORMULARIO]
```

### 4.4: Verificar Resultado
```powershell
# En PowerShell, abre esta carpeta:
# (Se crea automáticamente)
explorer c:\Projects\Form\exports\Juan_Pérez

# Debe ver: Registro_*.xlsx
# (Abre el archivo y verifica que tiene datos)
```

---

## ✅ ¿Qué Debe Pasar?

### ✅ Excel Generado
```
Debe encontrar:
c:\Projects\Form\exports\Juan_Pérez\Registro_2026-02-10T14-32-15.xlsx

Y contener 4 SECCIONES:
1. DATOS PERSONALES (Nombre, Apellido, DNI, Email, Celular)
2. DATOS DE LA AUSENCIA (Fechas, Motivo, Artículo)
3. FUNCIONES, SUBESPACIOS Y COMISIONES ← 
   Con tabla mostrando:
   - Función: Docente Primer Año
   - Subespacio: FM I GIMNASIA ✅
   - Comisión: A ✅
   - Observaciones: ...
4. OBSERVACIONES GENERALES
```

### ✅ Dropbox (si lo configuraste)
```
Debe encontrar en Dropbox:
/Licencias Instituto/Juan_Pérez/Registro_2026-02-10T14-32-15.xlsx

(Misma estructura que local)
```

### ✅ JSON Respaldo
```
Debe actualizar:
c:\Projects\Form\licencias_data.json

(Contiene todos los datos en formato JSON)
```

---

## ❌ Si Algo Está Mal

### "La carpeta Juan_Pérez no se crea"

**Solución:**
```powershell
# Verificar que exports/ existe
mkdir c:\Projects\Form\exports

# Luego envía el formulario de nuevo
```

### "Excel está vacío"

**Solución:**
```
1. Abre el navegador (F12 - consola)
2. Verifica que los campos de Subespacio/Comisión tienen valor
3. Si están vacíos: selecciona un valor en el formulario
```

### "Dropbox no funciona"

**Solución:**
```powershell
# Probar conexión Dropbox
node test-dropbox-connection.js

# Debe mostrar: ✓ Autenticación exitosa
# Si muestra error: revisar token en .env
```

### "Puerto 3000 ya está en uso"

**Solución:**
```powershell
# Cambiar puerto en .env
# Editar .env y cambiar:
# PORT=3000
# a:
# PORT=3001

# Luego:
npm start
# Abre: http://localhost:3001
```

---

## 🎉 ¡Éxito!

Si ves el Excel con datos en `exports/Juan_Pérez/`, **¡Funciona!** 🎊

**Próximos pasos:**
- ✅ Usa el sistema en producción
- ✅ Llena formularios reales
- ✅ Los archivos se crean automáticamente
- ✅ Comparte con otros usuarios: `http://TU_IP:3000`

---

## 📞 Referencia Rápida

| Acción | Comando |
|--------|---------|
| Instalar dependencias | `npm install` |
| Iniciar servidor | `npm start` |
| Probar dropbox | `node test-dropbox-connection.js` |
| Abrir carpeta exports | `explorer c:\Projects\Form\exports` |
| Ir a formulario | `http://localhost:3000` |

---

## 🚨 Checklist Rápido

- [ ] Ejecuté `npm install`
- [ ] Creé archivo `.env` con `PORT=3000`
- [ ] Executé `npm start`
- [ ] Abrí `http://localhost:3000`
- [ ] Llené el formulario COMPLETAMENTE (incluyendo Subespacio y Comisión)
- [ ] Hice click en ENVIAR
- [ ] Vi la carpeta `Juan_Pérez` en `exports/`
- [ ] El Excel tiene datos en la tabla de Subespacios/Comisiones
- [ ] ✅ ¡FUNCIONA!

---

## 🎯 Resumen en Una Frase

**Sistema listo: instala → configura → ejecuta → prueba → ¡usa!**

---

**Guía Rápida para Iniciar**  
**Fecha:** 10/02/2026  
**Tiempo requerido:** 5 minutos máximo  
**Dificultad:** Muy fácil - Solo 4 pasos

---

¡AHORA SÍ, A PROBAR! 🚀
