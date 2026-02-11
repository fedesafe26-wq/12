# 📖 Manual del Usuario

## Para: Personal del Instituto Educativo

---

## 🎯 ¿Qué es esto?

Un **formulario online** donde puedes registrar tus **licencias de ausencia** de forma rápida y segura.

**Sin papeles. Sin complicaciones.**

---

## 📱 Acceder a la Aplicación

### Paso 1: Abrir navegador
- Chrome, Firefox, Edge o cualquier navegador

### Paso 2: Ir a la dirección
```
http://localhost:3000
```
o preguntar al administrador la dirección correcta

### Paso 3: ¡Ves el formulario!
```
┌─────────────────────────────────────────────────┐
│   Sistema de Control de Licencias               │
│   Instituto Educativo                           │
└─────────────────────────────────────────────────┘
```

---

## 📝 Cómo Completar el Formulario

### SECCIÓN 1: Datos Personales (5 campos)

```
💠 Nombre *
   Escribe tu nombre
   Ejemplo: Juan

💠 Apellido *
   Escribe tu apellido
   Ejemplo: Pérez

💠 DNI *
   Tu número de DNI sin puntos
   Ejemplo: 12345678

💠 Email *
   Tu email válido
   Ejemplo: juan.perez@email.com

💠 Número de Celular *
   Tu teléfono celular
   Ejemplo: 1123456789
```

---

### SECCIÓN 2: Fechas de Licencia (2 campos)

```
📅 Fecha Inicio Licencia *
   Cuándo te ausentes
   (Hacer clic en campo, aparece calendario)

📅 Fecha Fin Licencia *
   Hasta cuándo te ausentes
   (La fecha de fin debe ser DESPUÉS de inicio)
```

**Importante**: Si son 5 días, pones inicio el lunes y fin el viernes.

---

### SECCIÓN 3: Motivo de la Ausencia (2 campos)

```
📋 Motivo *
   Escribe por qué te ausentes
   
   Ejemplos:
   • Enfermedad
   • Licencia ordinaria
   • Cita médica
   • Trámites administrativos
   • Otro (especificar)

🔢 Número de Artículo (opcional)
   Si sabes número de artículo del reglamento
   No es obligatorio, déjalo en blanco si no sabes
```

---

### SECCIÓN 4: Funciones de las que se Ausentará (Muy importante)

```
🎯 Selecciona UNA O MÁS opciones:

Docentes:
☐ Docente de primer año Ed. Física
☐ Docente de segundo año Ed. Física
☐ Docente de tercer año Ed. Física
☐ Docente de cuarto año Ed. Física
☐ Docente de Periodismo deportivo
☐ Docente del Taller de Natación

Personal:
☐ Asistente escolar
☐ Personal de Alumnado
☐ Personal de Gestión
☐ Personal de Secretaría
☐ Personal de Biblioteca
☐ Personal de Informática
☐ Personal de Capacitación e Investigación

Otro:
☐ Otro
```

**¿Cómo sé cuál seleccionar?**
Elige la función que cumples en el instituto.

Si tienes **múltiples funciones**, puedes seleccionar varias.

---

### SECCIÓN 5: Información Específica por Función

**⚠️ Esta sección cambia según lo que seleccionaste en SECCIÓN 4**

#### Si seleccionaste "Docente de X año":

```
📚 Subespacios en los cuales se ausentará *
   (Desplegable - hacer clic)
   Ejemplos:
   - FM GIMNASIA
   - DAC FÚTBOL
   - DC NATACIÓN
   - Otro (puedes escribir)

👥 Comisión *
   (Desplegable - hacer clic)
   Ejemplos: A, B, C, D, E, F, ...
   
📝 Observaciones o Aclaraciones (opcional)
   Puedes escribir notas adicionales
```

#### Si seleccionaste otros roles:

```
📝 Solo aparece:
   Observaciones o Aclaraciones (opcional)
   Puedes escribir notas si necesitas
```

---

### SECCIÓN 6: Observaciones Generales (Opcional)

```
📝 Observaciones o Aclaraciones
   
   Espacio para agregar lo que consideres importante:
   • Cargos temporales que tengas
   • Información adicional
   • Aclaraciones
   
   No es obligatorio, pero es útil si tienes algo
   que comunicar.
```

---

## ✅ Botones al Final

```
[Limpiar Formulario]    [Registrar Licencia]
  Borra todo              Guarda todo
```

---

## 🚀 Paso a Paso Completo

### Ejemplo: Eres Docente de Primer Año

```
1️⃣  Rellena:
    • Nombre: María
    • Apellido: González
    • DNI: 87654321
    • Email: maria.gonzalez@edu.ar
    • Celular: 1198765432

2️⃣  Selecciona fechas:
    • Inicio: 12/02/2024
    • Fin: 15/02/2024

3️⃣  Motivo:
    • Motivo: Enfermedad
    • Artículo: (dejas en blanco)

4️⃣  Funciones:
    • Haces clic en ☐ Docente de primer año Ed. Física
    ✓ (se marca)

5️⃣  Aparecen campos nuevos:
    • Selecciona Subespacio: "FM I GIMNASIA"
    • Selecciona Comisión: "A"
    • Escribes observaciones: "Médico a las 10 AM"

6️⃣  Observaciones generales:
    • "Sin observaciones adicionales"

7️⃣  Haces clic en "Registrar Licencia"

8️⃣  ✓ ¡Listo!
    Sale mesaje: "¡Registrado Exitosamente!"
```

---

## 🎯 Campos Obligatorios

Estos **deben estar rellenos** (tienen asterisco *):

- ✱ Nombre
- ✱ Apellido
- ✱ DNI
- ✱ Email
- ✱ Número de Celular
- ✱ Fecha inicio Licencia
- ✱ Fecha fin Licencia  
- ✱ Motivo de la Ausencia
- ✱ Funciones (al menos una)
- ✱ Subespacios (si eres Docente)
- ✱ Comisión (si eres Docente)

Los **opcionales**:
- Número de Artículo
- Observaciones específicas de función
- Observaciones generales

---

## ⚠️ Errores Comunes

### "Error: Debe completar todos los campos requeridos"

**Solución**: Verifica que llenaste:
- Nombre, Apellido, DNI, Email, Celular
- Ambas fechas
- Motivo
- Seleccionaste al menos una función

### "Error: Debe seleccionar al menos una función"

**Solución**: Haz clic en al menos un checkbox en "Funciones de las que se Ausentará"

### "Error: La fecha de inicio no puede ser mayor a la fecha de fin"

**Solución**: La fecha de FIN debe ser DESPUÉS que la fecha de INICIO
- ❌ Inicio: 20/02 Fin: 15/02 (incorrecto)
- ✅ Inicio: 15/02 Fin: 20/02 (correcto)

### "Error: El email no es válido"

**Solución**: Verifica que el email tenga formato correcto
- ❌ maria@edu (falta dominio)
- ✅ maria@email.com (correcto)

---

## 💾 ¿Dónde van mis datos?

### Opción 1: Almacenamiento Local
```
Tus datos se guardan en la computadora
del instituto en un archivo
→ No necesitas hacer nada extra
→ Es automático
```

### Opción 2: Google Drive
```
Si el administrador lo configuró:
→ Tus datos se guardan en la nube
→ En un archivo Excel mensual
→ Sigue siendo automático
```

**Resumiendo**: Tu registro se guarda automáticamente. No tienes que hacer nada más.

---

## ✨ Tips Útiles

### 1. Usa el formulario desde una PC
No desde el móvil (aunque funciona en móvil también).
Será más cómodo llenar los campos.

### 2. Ten a mano tu información
Tener a mano:
- DNI
- Email
- Número de celular

Te ahorra tiempo.

### 3. Sé específico en el motivo
En lugar de "otro", indica:
- ✅ "Cita médica con dentista"
- ❌ "Otro"

Ayuda al administrador.

### 4. Las fechas son importantes
Verifica bien las fechas de tu ausencia.
No es lo mismo:
- 12/02 a 15/02 (4 días)
- 12/02 a 20/02 (8 días)

### 5. Si te equivocas
Completa el formulario de nuevo.
El sistema guardará el nuevo registro.

---

## 🔄 Proceso Típico

```
Necesito una licencia
        ↓
Abro el formulario en navegador
        ↓
Completo mis datos personales
        ↓
Selecciono mis fechas de ausencia
        ↓
Escribo el motivo
        ↓
Selecciono mis funciones
        ↓
Hago clic en "Registrar Licencia"
        ↓
Ver mensaje: "¡Registrado Exitosamente!"
        ↓
✅ ¡Listo! El administrador tiene el registro
```

**Tiempo total**: 3-5 minutos

---

## ❓ Preguntas Frecuentes

**P: ¿Qué pasa si me equivoco en una fecha?**
R: Completa el formulario nuevamente. Se guardará el nuevo registro.

**P: ¿Necesito estar conectado a internet?**
R: Sí, necesitas acceso a http://localhost:3000 (depende del administrador).

**P: ¿Mis datos son privados?**
R: Sí, solo administrador puede acceder. Están protegidos.

**P: ¿Puedo editar después de registrar?**
R: El formulario no permite editar. Contacta al administrador.

**P: ¿Hay límite de licencias?**
R: No, puedes registrar cuantas necesites.

**P: ¿Funciona en mi móvil?**
R: Sí, pero es incómodo. Mejor desde computadora.

---

## 📞 Necesito Ayuda

### Problema: No encuentro el formulario

**Solución**:
1. Pregunta al administrador la dirección correcta
2. Copia y pega en el navegador
3. Presiona Enter

### Problema: El formulario no carga

**Solución**:
1. Recarga la página (F5)
2. Prueba en otro navegador (Chrome, Firefox)
3. Contacta al administrador

### Problema: No me deja registrar

**Solución**:
1. Verifica que completaste TODOS los campos obligatorios
2. Lee el mensaje de error
3. Corrige lo que dice el error
4. Intenta de nuevo

### Problema: ¿Cómo cancelo una licencia?

**Solución**:
Contacta directamente al administrador.
El formulario es para registrar, no para cancelar.

---

## 🎓 Videos de Ayuda

Si el administrador compartió videos:
1. Míralos primero
2. Luego completa el formulario
3. Si algo no es claro, pregunta

---

## ✅ Checklist Antes de Registrar

Antes de hacer clic en "Registrar", verifica:

- [ ] Nombre escrito correctamente
- [ ] Apellido escrito correctamente
- [ ] DNI sin puntos
- [ ] Email válido y correcto
- [ ] Celular correcto
- [ ] Fecha inicio < Fecha fin
- [ ] Motivo completo
- [ ] Seleccioné al menos una función
- [ ] Seleccioné subespacios y comisión (si docente)
- [ ] Revisé todo antes de hacer clic

---

## 🎉 ¡Listo!

**Felicidades. Ya sabes cómo usar el sistema.**

```
Resumiendo:
1. Abre http://localhost:3000
2. Completa el formulario (3-5 minutos)
3. Haz clic en "Registrar Licencia"
4. ✓ ¡Listo!

Tu licencia está registrada.
El administrador la tiene en su sistema.
```

---

**Si este manual no responde tu pregunta, contacta al administrador del sistema.**

---

Versión: 1.0  
Última actualización: Febrero 2026
