// Datos dinámicos para cada tipo de docente
const SUBESPACIOS = {
    docente_primer_año: [
        'FM I GIMNASIA',
        'FM I EDUCACIÓN FÍSICA INFANTIL',
        'FM I EDUCACIÓN RÍTMICA Y VOCAL',
        'DAC I FÚTBOL',
        'DAC I HOCKEY',
        'DC I NATACIÓN',
        'DC I ATLETISMO',
        'DAG I CESTOBALL',
        'DAG I VOLEIBOL',
        'FAF I ANATOMÍA',
        'FAF I ANÁLISIS DEL MOVIMIENTO',
        'FILOSOFÍA',
        'PEDAGOGÍA',
        'TALLER DE DOCENCIA I',
        'Otro'
    ],
    docente_segundo_año: [
        'FM II GIMNASIA',
        'FM II EDUCACIÓN FÍSICA INFANTIL',
        'FMII VIDA EN LA NATURALEZA',
        'FAF II EDUCACIÓN SANITARIA',
        'FAF II FISIOLOGÍA',
        'DAG II VOLEIBOL',
        'DAG II BASQUETBOL',
        'DAC II HOCKEY',
        'DAC II RUGBY',
        'DC II ATLETISMO',
        'DC II NATACIÓN',
        'TALLER DE DOCENCIA II',
        'PSICOLOGÍA Y CULTURA DEL NIÑO Y DEL ADOLESCENTE',
        'TEORÍA DEL CURRÍCULO Y DIDÁCTICA',
        'Otro'
    ],
    docente_tercer_año: [
        'FM III RECREACIÓN',
        'FM III ENTRENAMIENTO',
        'FM III GIMNASIA',
        'FAF III ANÁLISIS DEL MOVIMIENTO',
        'FAF III FISIOLOGÍA',
        'FAF III EVALUACIÓN',
        'DAG III BASQUETBOL',
        'DAG III HANDBOL',
        'DAC III SOFTBOL',
        'DAC III SISTEMA DE ENTRENAMIENTO DE DAC',
        'DC III NATACIÓN',
        'DC III GIMNASIA DEPORTIVA',
        'TALLER DE DOCENCIA III',
        'PRFA - PRÁCTICA DOCENTE',
        'PSICOLOGÍA DEL ADULTO Y DE LA TERCERA EDAD',
        'ORGANIZACIÓN Y GESTIÓN INSTITUCIONAL',
        'Otro'
    ],
    docente_cuarto_año: [
        'TALLER DE DOCENCIA IV',
        'PRFA - ÁREA ESCOLAR',
        'PRFA - ÁREA NO ESCOLAR',
        'HISTORIA POLÍTICA Y EDUCATIVA ARGENTINA',
        'ÉTICA PROFESIONAL',
        'SOCIOLOGÍA DE LA EDUCACIÓN FÍSICA',
        'SIS TEORÍA DE LA EDUCACIÓN FÍSICA',
        'SIS INVESTIGACIÓN APLICADA',
        'ECO FITNESS FISIOLOGÍA',
        'ECO FITNESS NUTRICIÓN',
        'ECO FITNESS ENTRENAMIENTO',
        'ECO NECESIDADES EDUCATIVAS ESPECIALES',
        'ECO ACTIVIDADES FÍSICAS EN PATOLOGÍAS',
        'EDI RECREACIÓN',
        'EDI VIDA EN LA NATURALEZA',
        'EDI EXPRESIÓN CORPORAL',
        'Otro'
    ]
};

const COMISIONES = {
    docente_primer_año: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'Otro'],
    docente_segundo_año: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'Otro'],
    docente_tercer_año: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'Otro'],
    docente_cuarto_año: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'Otro']
};

// Tipos de funciones
const TIPOS_FUNCIONES = {
    docente_primer_año: 'docente_primer_año',
    docente_segundo_año: 'docente_segundo_año',
    docente_tercer_año: 'docente_tercer_año',
    docente_cuarto_año: 'docente_cuarto_año',
    docente_periodismo: 'docente_simple',
    docente_natacion: 'docente_simple',
    asistente_escolar: 'simple',
    personal_alumnado: 'simple',
    personal_gestion: 'simple',
    personal_secretaria: 'simple',
    personal_biblioteca: 'simple',
    personal_informatica: 'simple',
    personal_capacitacion: 'simple',
    otro_funcion: 'simple'
};

// INICIALIZACIÓN
document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('licenseForm');
    const checkboxes = document.querySelectorAll('input[name="funciones"]');
    const otroCheckbox = document.querySelector('input[value="otro_funcion"]');
    
    // Event listeners para checkboxes
    checkboxes.forEach(checkbox => {
        checkbox.addEventListener('change', handleFuncionChange);
    });

    // Event listener para mostrar/ocultar campo "Otro"
    otroCheckbox.addEventListener('change', () => {
        const otroContainer = document.getElementById('otroFuncionContainer');
        if (otroCheckbox.checked) {
            otroContainer.style.display = 'block';
            otroContainer.classList.add('fade-in');
        } else {
            otroContainer.style.display = 'none';
        }
    });

    // Event listener para el formulario
    form.addEventListener('submit', handleFormSubmit);
});

// Manejo de cambio de funciones
function handleFuncionChange() {
    const checkboxes = document.querySelectorAll('input[name="funciones"]:checked');
    const dynamicSection = document.getElementById('dynamicSection');
    
    // Limpiar sección dinámica
    dynamicSection.innerHTML = '';
    
    if (checkboxes.length === 0) {
        dynamicSection.style.display = 'none';
        return;
    }

    dynamicSection.style.display = 'block';

    // Procesar cada función seleccionada
    checkboxes.forEach((checkbox, index) => {
        const value = checkbox.value;
        const type = checkbox.getAttribute('data-type');

        if (type === 'docente_primer_año' || type === 'docente_segundo_año' || 
            type === 'docente_tercer_año' || type === 'docente_cuarto_año') {
            
            createDocenteFields(dynamicSection, value, index);
        }
        // Para docentes simples y otros, solo agregar observaciones en la última sección
    });

    // Agregar observaciones solo una vez al final
    if (checkboxes.length > 0) {
        addObservationsField(dynamicSection);
    }
}

// Crear campos para docentes con subespacios y comisiones
function createDocenteFields(container, docenteType, index) {
    const fieldset = document.createElement('fieldset');
    fieldset.className = 'select-group fade-in';
    fieldset.style.marginTop = '20px';
    
    // Obtener el nombre de la función
    const checkbox = document.querySelector(`input[value="${docenteType}"]`);
    const functionName = checkbox ? checkbox.parentElement.textContent.trim() : docenteType;
    
    // Título
    const legend = document.createElement('legend');
    legend.style.fontSize = '1.1em';
    legend.style.fontWeight = '600';
    legend.style.color = 'var(--primary-color)';
    legend.style.marginBottom = '15px';
    legend.textContent = `Datos para: ${functionName}`;
    fieldset.appendChild(legend);

    // Container de los selects
    const selectsContainer = document.createElement('div');
    selectsContainer.style.display = 'grid';
    selectsContainer.style.gridTemplateColumns = 'repeat(auto-fit, minmax(300px, 1fr))';
    selectsContainer.style.gap = '20px';

    // Select de Subespacios
    const subespacioDiv = document.createElement('div');
    subespacioDiv.className = 'select-item';
    
    const subespacioLabel = document.createElement('label');
    subespacioLabel.htmlFor = `subespacio_${index}`;
    subespacioLabel.textContent = 'Subespacios en los cuales se ausentará *';
    subespacioDiv.appendChild(subespacioLabel);

    const subespacioSelect = document.createElement('select');
    subespacioSelect.id = `subespacio_${index}`;
    subespacioSelect.name = `subespacio_${index}`;
    subespacioSelect.className = `subespacio-select`;
    subespacioSelect.setAttribute('data-docente', docenteType);
    subespacioSelect.required = true;

    const optionPlaceholder = document.createElement('option');
    optionPlaceholder.value = '';
    optionPlaceholder.textContent = 'Seleccione un subespacio';
    subespacioSelect.appendChild(optionPlaceholder);

    const subespacios = SUBESPACIOS[docenteType] || [];
    subespacios.forEach(subespacio => {
        const option = document.createElement('option');
        option.value = subespacio;
        option.textContent = subespacio;
        subespacioSelect.appendChild(option);
    });

    // Escuchar cambios en el select de subespacios
    subespacioSelect.addEventListener('change', (e) => {
        if (e.target.value === 'Otro') {
            const otroContainer = document.getElementById(`subespacio_otro_${index}`);
            if (otroContainer) {
                otroContainer.style.display = 'block';
            }
        } else {
            const otroContainer = document.getElementById(`subespacio_otro_${index}`);
            if (otroContainer) {
                otroContainer.style.display = 'none';
                otroContainer.querySelector('input').value = '';
            }
        }
    });

    subespacioDiv.appendChild(subespacioSelect);
    selectsContainer.appendChild(subespacioDiv);

    // Campo "Otro" para subespacio
    const otroSubespacioDiv = document.createElement('div');
    otroSubespacioDiv.id = `subespacio_otro_${index}`;
    otroSubespacioDiv.className = 'select-item';
    otroSubespacioDiv.style.display = 'none';
    otroSubespacioDiv.style.gridColumn = '1 / -1';

    const otroSubespacioLabel = document.createElement('label');
    otroSubespacioLabel.htmlFor = `subespacio_otro_input_${index}`;
    otroSubespacioLabel.textContent = 'Por favor especifique el subespacio:';
    otroSubespacioDiv.appendChild(otroSubespacioLabel);

    const otroSubespacioInput = document.createElement('input');
    otroSubespacioInput.type = 'text';
    otroSubespacioInput.id = `subespacio_otro_input_${index}`;
    otroSubespacioInput.name = `subespacio_otro_${index}`;
    otroSubespacioInput.placeholder = 'Escriba aquí el subespacio';
    otroSubespacioDiv.appendChild(otroSubespacioInput);

    selectsContainer.appendChild(otroSubespacioDiv);

    // Select de Comisión
    const comisionDiv = document.createElement('div');
    comisionDiv.className = 'select-item';
    
    const comisionLabel = document.createElement('label');
    comisionLabel.htmlFor = `comision_${index}`;
    comisionLabel.textContent = 'Comisión *';
    comisionDiv.appendChild(comisionLabel);

    const comisionSelect = document.createElement('select');
    comisionSelect.id = `comision_${index}`;
    comisionSelect.name = `comision_${index}`;
    comisionSelect.className = 'comision-select';
    comisionSelect.setAttribute('data-docente', docenteType);
    comisionSelect.required = true;

    const comisionPlaceholder = document.createElement('option');
    comisionPlaceholder.value = '';
    comisionPlaceholder.textContent = 'Seleccione una comisión';
    comisionSelect.appendChild(comisionPlaceholder);

    const comisiones = COMISIONES[docenteType] || [];
    comisiones.forEach(comision => {
        const option = document.createElement('option');
        option.value = comision;
        option.textContent = comision;
        comisionSelect.appendChild(option);
    });

    // Escuchar cambios en el select de comisiones
    comisionSelect.addEventListener('change', (e) => {
        if (e.target.value === 'Otro') {
            const otroContainer = document.getElementById(`comision_otro_${index}`);
            if (otroContainer) {
                otroContainer.style.display = 'block';
            }
        } else {
            const otroContainer = document.getElementById(`comision_otro_${index}`);
            if (otroContainer) {
                otroContainer.style.display = 'none';
                otroContainer.querySelector('input').value = '';
            }
        }
    });

    comisionDiv.appendChild(comisionSelect);
    selectsContainer.appendChild(comisionDiv);

    // Campo "Otro" para comisión
    const otroComisionDiv = document.createElement('div');
    otroComisionDiv.id = `comision_otro_${index}`;
    otroComisionDiv.className = 'select-item';
    otroComisionDiv.style.display = 'none';
    otroComisionDiv.style.gridColumn = '1 / -1';

    const otroComisionLabel = document.createElement('label');
    otroComisionLabel.htmlFor = `comision_otro_input_${index}`;
    otroComisionLabel.textContent = 'Por favor especifique la comisión:';
    otroComisionDiv.appendChild(otroComisionLabel);

    const otroComisionInput = document.createElement('input');
    otroComisionInput.type = 'text';
    otroComisionInput.id = `comision_otro_input_${index}`;
    otroComisionInput.name = `comision_otro_${index}`;
    otroComisionInput.placeholder = 'Escriba aquí la comisión';
    otroComisionDiv.appendChild(otroComisionInput);

    selectsContainer.appendChild(otroComisionDiv);

    // Observaciones
    const observacionesDiv = document.createElement('div');
    observacionesDiv.className = 'select-item';
    observacionesDiv.style.gridColumn = '1 / -1';

    const observacionesLabel = document.createElement('label');
    observacionesLabel.htmlFor = `observaciones_${index}`;
    observacionesLabel.textContent = 'Observaciones o Aclaraciones (opcional)';
    observacionesDiv.appendChild(observacionesLabel);

    const observacionesTextarea = document.createElement('textarea');
    observacionesTextarea.id = `observaciones_${index}`;
    observacionesTextarea.name = `observaciones_${index}`;
    observacionesTextarea.rows = '3';
    observacionesTextarea.placeholder = 'Escriba aquí cualquier aclaración u observación...';
    observacionesDiv.appendChild(observacionesTextarea);

    selectsContainer.appendChild(observacionesDiv);

    fieldset.appendChild(selectsContainer);
    container.appendChild(fieldset);
}

// Agregar campo de observaciones general
function addObservationsField(container) {
    // No agregar observaciones adicionales aquí, se manejan en la sección general
}

// Validar el formulario
function validateForm(formData) {
    const errors = [];

    // Validar datos personales
    if (!formData.nombre.trim()) errors.push('El nombre es requerido');
    if (!formData.apellido.trim()) errors.push('El apellido es requerido');
    if (!formData.dni.trim()) errors.push('El DNI es requerido');
    if (!formData.email.trim()) errors.push('El email es requerido');
    if (!isValidEmail(formData.email)) errors.push('El email no es válido');
    if (!formData.celular.trim()) errors.push('El celular es requerido');

    // Validar fechas
    if (!formData.fechaInicio) errors.push('La fecha de inicio es requerida');
    if (!formData.fechaFin) errors.push('La fecha de fin es requerida');
    
    if (formData.fechaInicio && formData.fechaFin) {
        const inicio = new Date(formData.fechaInicio);
        const fin = new Date(formData.fechaFin);
        if (inicio > fin) {
            errors.push('La fecha de inicio no puede ser mayor a la fecha de fin');
        }
    }

    // Validar motivo
    if (!formData.motivo.trim()) errors.push('El motivo de la ausencia es requerido');

    // Validar funciones
    const checkboxes = document.querySelectorAll('input[name="funciones"]:checked');
    if (checkboxes.length === 0) {
        errors.push('Debe seleccionar al menos una función');
    }

    // Validar campos dinámicos para docentes
    checkboxes.forEach((checkbox, index) => {
        const type = checkbox.getAttribute('data-type');
        if (type === 'docente_primer_año' || type === 'docente_segundo_año' || 
            type === 'docente_tercer_año' || type === 'docente_cuarto_año') {
            
            const subespacioSelect = document.querySelector(`select[name="subespacio_${index}"]`);
            const comisionSelect = document.querySelector(`select[name="comision_${index}"]`);
            
            if (subespacioSelect && !subespacioSelect.value) {
                errors.push(`El subespacio para la función ${index + 1} es requerido`);
            }
            
            if (comisionSelect && !comisionSelect.value) {
                errors.push(`La comisión para la función ${index + 1} es requerida`);
            }

            // Validar campos "Otro"
            if (subespacioSelect && subespacioSelect.value === 'Otro') {
                const otroInput = document.querySelector(`input[name="subespacio_otro_${index}"]`);
                if (!otroInput || !otroInput.value.trim()) {
                    errors.push(`Debe especificar el subespacio para la función ${index + 1}`);
                }
            }

            if (comisionSelect && comisionSelect.value === 'Otro') {
                const otroInput = document.querySelector(`input[name="comision_otro_${index}"]`);
                if (!otroInput || !otroInput.value.trim()) {
                    errors.push(`Debe especificar la comisión para la función ${index + 1}`);
                }
            }
        }
    });

    return errors;
}

// Validar email
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Manejar el envío del formulario
async function handleFormSubmit(e) {
    e.preventDefault();

    const form = document.getElementById('licenseForm');
    const formData = new FormData(form);
    
    // Convertir FormData a objeto
    const data = {
        nombre: formData.get('nombre'),
        apellido: formData.get('apellido'),
        dni: formData.get('dni'),
        email: formData.get('email'),
        celular: formData.get('celular'),
        fechaInicio: formData.get('fechaInicio'),
        fechaFin: formData.get('fechaFin'),
        motivo: formData.get('motivo'),
        articulo: formData.get('articulo'),
        otroFuncion: formData.get('otroFuncion'),
        observacionesGenerales: formData.get('observacionesGenerales'),
        funciones: [],
        timestamp: new Date().toISOString()
    };

    // Recopilar funciones seleccionadas
    const funcionesCheckboxes = document.querySelectorAll('input[name="funciones"]:checked');
    funcionesCheckboxes.forEach((checkbox, index) => {
        const funcion = {
            tipo: checkbox.value,
            label: checkbox.parentElement.textContent.trim(),
            tipoFuncion: checkbox.getAttribute('data-type')
        };

        // Para docentes, agregar subespacios y comisiones
        const type = checkbox.getAttribute('data-type');
        if (type === 'docente_primer_año' || type === 'docente_segundo_año' || 
            type === 'docente_tercer_año' || type === 'docente_cuarto_año') {
            
            const subespacioSelect = document.querySelector(`select[name="subespacio_${index}"]`);
            const comisionSelect = document.querySelector(`select[name="comision_${index}"]`);
            const observacionesTextarea = document.querySelector(`textarea[name="observaciones_${index}"]`);

            funcion.subespacio = subespacioSelect?.value === 'Otro' 
                ? document.querySelector(`input[name="subespacio_otro_${index}"]`)?.value
                : subespacioSelect?.value;
            
            funcion.comision = comisionSelect?.value === 'Otro'
                ? document.querySelector(`input[name="comision_otro_${index}"]`)?.value
                : comisionSelect?.value;
            
            funcion.observaciones = observacionesTextarea?.value;
        }

        data.funciones.push(funcion);
    });

    // Validar
    const errors = validateForm(data);
    if (errors.length > 0) {
        alert('Errores en el formulario:\n\n' + errors.join('\n'));
        return;
    }

    // Mostrar spinner
    document.getElementById('loadingSpinner').style.display = 'flex';

    try {
        // Enviar datos al servidor
        const response = await fetch('/api/save-license', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        if (!response.ok) {
            throw new Error(`Error del servidor: ${response.statusText}`);
        }

        const result = await response.json();

        // Mostrar modal de éxito
        document.getElementById('loadingSpinner').style.display = 'none';
        
        // Si hay advertencia, mostrarla
        if (result.warning) {
            alert('Registrado exitosamente\n\n⚠️ ' + result.warning);
        }
        
        showSuccessModal();

        // Limpiar formulario
        form.reset();
        document.getElementById('dynamicSection').innerHTML = '';
        document.getElementById('dynamicSection').style.display = 'none';
        document.getElementById('otroFuncionContainer').style.display = 'none';

    } catch (error) {
        document.getElementById('loadingSpinner').style.display = 'none';
        console.error('Error:', error);
        alert('Error al guardar los datos: ' + error.message + 
              '\n\nAsegúrese de que el servidor está ejecutándose en http://localhost:3000');
    }
}

// Mostrar modal de éxito
function showSuccessModal() {
    document.getElementById('successModal').style.display = 'flex';
}

// Cerrar modal
function closeModal() {
    document.getElementById('successModal').style.display = 'none';
}

// Cerrar modal al hacer click fuera
document.addEventListener('click', (e) => {
    const modal = document.getElementById('successModal');
    if (e.target === modal) {
        closeModal();
    }
});
