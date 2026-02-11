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
    const funcionesSelect = document.getElementById('funcionesSelect');
    const noticeModal = document.getElementById('noticeModal');
    const noticeAcceptBtn = document.getElementById('noticeAcceptBtn');
    const fechaInicioInput = document.getElementById('fechaInicio');
    const fechaFinInput = document.getElementById('fechaFin');
    
    // Event listener para el desplegable
    funcionesSelect.addEventListener('change', handleFuncionChange);

    // Event listener para mostrar/ocultar campo "Otro"
    funcionesSelect.addEventListener('change', () => {
        const otroContainer = document.getElementById('otroFuncionContainer');
        if (funcionesSelect.value === 'otro_funcion') {
            otroContainer.style.display = 'block';
            otroContainer.classList.add('fade-in');
        } else {
            otroContainer.style.display = 'none';
        }
    });

    // Event listener para el formulario
    form.addEventListener('submit', handleFormSubmit);

    form.addEventListener('input', updateSectionStates);
    form.addEventListener('change', updateSectionStates);

    setupCollapsibleSections();

    const today = getTodayISO();
    const maxDate = getMaxFutureDateISO(9);

    if (fechaInicioInput) {
        fechaInicioInput.min = today;
        fechaInicioInput.max = maxDate;

        fechaInicioInput.addEventListener('change', () => {
            const value = fechaInicioInput.value;
            if (!value) return;

            if (value < today) {
                alert('No se puede ingresar una licencia con fecha anterior al dia actual.');
                fechaInicioInput.value = '';
                return;
            }

            if (value > maxDate) {
                alert('No se puede ingresar licencias con mas de 9 dias de antelacion desde la fecha en que se ingresa a la app.');
                fechaInicioInput.value = '';
            }
        });
    }

    if (fechaFinInput) {
        fechaFinInput.min = today;
        fechaFinInput.max = maxDate;

        fechaFinInput.addEventListener('change', () => {
            const value = fechaFinInput.value;
            if (!value) return;

            if (value < today) {
                alert('No se puede ingresar una licencia con fecha anterior al dia actual.');
                fechaFinInput.value = '';
                return;
            }

            if (value > maxDate) {
                alert('No se puede ingresar licencias con mas de 9 dias de antelacion desde la fecha en que se ingresa a la app.');
                fechaFinInput.value = '';
            }
        });
    }

    // Mostrar aviso inicial
    if (noticeModal) {
        noticeModal.style.display = 'flex';
        document.body.classList.add('modal-open');
    }

    if (noticeAcceptBtn) {
        noticeAcceptBtn.addEventListener('click', () => {
            if (noticeModal) {
                noticeModal.style.display = 'none';
                document.body.classList.remove('modal-open');
            }
        });
    }
});

function setupCollapsibleSections() {
    const sections = document.querySelectorAll('.form-section[data-collapsible="true"]');

    sections.forEach(section => {
        const title = section.querySelector('.collapsible-title');
        if (!title) return;

        title.addEventListener('click', () => {
            toggleSection(section);
        });

        title.addEventListener('keydown', (event) => {
            if (event.key === 'Enter' || event.key === ' ') {
                event.preventDefault();
                toggleSection(section);
            }
        });
    });

    sections.forEach(section => setSectionCollapsed(section, true));
    updateSectionStates();
}

function toggleSection(section) {
    const isCollapsed = section.classList.contains('collapsed');
    setSectionCollapsed(section, !isCollapsed);
}

function setSectionCollapsed(section, collapsed) {
    section.classList.toggle('collapsed', collapsed);
    const title = section.querySelector('.collapsible-title');
    if (title) {
        title.setAttribute('aria-expanded', (!collapsed).toString());
    }
}

function updateSectionStates() {
    const sections = document.querySelectorAll('.form-section[data-collapsible="true"]');
    let firstIncompleteOpened = false;

    sections.forEach(section => {
        const complete = isSectionComplete(section);
        if (complete) {
            setSectionCollapsed(section, true);
        } else if (!firstIncompleteOpened) {
            setSectionCollapsed(section, false);
            firstIncompleteOpened = true;
        }
    });
}

function isSectionComplete(section) {
    const body = section.querySelector('.section-body');
    if (!body) return false;

    if (body.contains(document.activeElement)) {
        return false;
    }

    const requiredElements = getRequiredElements(body);
    if (requiredElements.length === 0) return false;

    const requiredFilled = requiredElements.every(isElementFilled);
    if (!requiredFilled) return false;

    if (section.id === 'funcionesSection') {
        const dynamicSection = document.getElementById('dynamicSection');
        if (dynamicSection && dynamicSection.style.display !== 'none') {
            const dynamicRequired = getRequiredElements(dynamicSection);
            if (dynamicRequired.length > 0 && !dynamicRequired.every(isElementFilled)) {
                return false;
            }

            const comisionChecked = dynamicSection.querySelectorAll(
                'input[type="checkbox"][name^="comision_"]:checked'
            );
            if (comisionChecked.length === 0) return false;

            const subespacioSelects = dynamicSection.querySelectorAll(
                'select[name^="subespacio_"]'
            );
            for (const select of subespacioSelects) {
                if (select.value === 'Otro') {
                    const index = select.name.split('_')[1];
                    const otroInput = dynamicSection.querySelector(
                        `input[name="subespacio_otro_${index}"]`
                    );
                    if (!otroInput || !otroInput.value.trim()) return false;
                }
            }

            const comisionOtro = dynamicSection.querySelectorAll(
                'input[type="checkbox"][name^="comision_"][value="Otro"]:checked'
            );
            if (comisionOtro.length > 0) {
                const index = comisionOtro[0].name.split('_')[1];
                const otroInput = dynamicSection.querySelector(
                    `input[name="comision_otro_${index}"]`
                );
                if (!otroInput || !otroInput.value.trim()) return false;
            }
        }
    }

    return true;
}

function getRequiredElements(container) {
    return Array.from(
        container.querySelectorAll('input[required], select[required], textarea[required]')
    );
}

function getTodayISO() {
    const now = new Date();
    const local = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    return local.toISOString().slice(0, 10);
}

function getMaxFutureDateISO(daysAhead) {
    const now = new Date();
    const local = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    local.setDate(local.getDate() + daysAhead);
    return local.toISOString().slice(0, 10);
}

function isElementFilled(element) {
    if (element.type === 'checkbox' || element.type === 'radio') {
        return element.checked;
    }

    if (element.tagName === 'SELECT') {
        return Boolean(element.value);
    }

    return Boolean(element.value && element.value.trim());
}

// Manejo de cambio de funciones
function handleFuncionChange() {
    const funcionesSelect = document.getElementById('funcionesSelect');
    const selectedOption = funcionesSelect.options[funcionesSelect.selectedIndex];
    const dynamicSection = document.getElementById('dynamicSection');
    
    // Limpiar sección dinámica
    dynamicSection.innerHTML = '';
    
    if (!funcionesSelect.value) {
        dynamicSection.style.display = 'none';
        return;
    }

    dynamicSection.style.display = 'block';

    // Procesar cada función seleccionada
    const value = funcionesSelect.value;
    const type = selectedOption ? selectedOption.getAttribute('data-type') : '';
    const functionLabel = selectedOption ? selectedOption.textContent.trim() : value;

    if (type === 'docente_primer_año' || type === 'docente_segundo_año' || 
        type === 'docente_tercer_año' || type === 'docente_cuarto_año') {
        createDocenteFields(dynamicSection, value, 0, functionLabel);
    }
    // Para docentes simples y otros, solo agregar observaciones en la última sección

    // Agregar observaciones solo una vez al final
    if (funcionesSelect.value) {
        addObservationsField(dynamicSection);
    }

    updateSectionStates();
}

// Crear campos para docentes con subespacios y comisiones
function createDocenteFields(container, docenteType, index, functionLabel) {
    const fieldset = document.createElement('fieldset');
    fieldset.className = 'select-group fade-in';
    fieldset.style.marginTop = '20px';
    
    const functionName = functionLabel || docenteType;
    
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
    comisionLabel.textContent = 'Comisión *';
    comisionDiv.appendChild(comisionLabel);

    const comisionDropdown = document.createElement('details');
    comisionDropdown.className = 'comision-dropdown';
    comisionDropdown.setAttribute('data-docente', docenteType);

    const comisionSummary = document.createElement('summary');
    comisionSummary.textContent = 'Seleccione comisiones';
    comisionDropdown.appendChild(comisionSummary);

    const comisionList = document.createElement('div');
    comisionList.className = 'comision-list';

    const comisiones = COMISIONES[docenteType] || [];
    comisiones.forEach(comision => {
        const itemLabel = document.createElement('label');
        itemLabel.className = 'comision-item';

        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.name = `comision_${index}`;
        checkbox.value = comision;

        const text = document.createElement('span');
        text.textContent = comision;

        itemLabel.appendChild(checkbox);
        itemLabel.appendChild(text);
        comisionList.appendChild(itemLabel);
    });

    comisionDropdown.appendChild(comisionList);

    comisionDiv.appendChild(comisionDropdown);
    selectsContainer.appendChild(comisionDiv);

    // IDs por comisión seleccionada
    const comisionIdsDiv = document.createElement('div');
    comisionIdsDiv.className = 'select-item';
    comisionIdsDiv.style.gridColumn = '1 / -1';

    const comisionIdsLabel = document.createElement('label');
    comisionIdsLabel.textContent = 'ID de la Comisión (1-7 dígitos) *';
    comisionIdsDiv.appendChild(comisionIdsLabel);

    const comisionIdsContainer = document.createElement('div');
    comisionIdsContainer.className = 'comision-ids';
    comisionIdsDiv.appendChild(comisionIdsContainer);

    selectsContainer.appendChild(comisionIdsDiv);

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

    // Escuchar cambios en los checkboxes de comisiones
    comisionDropdown.addEventListener('change', () => {
        const selectedValues = Array.from(
            comisionDropdown.querySelectorAll('input[type="checkbox"]:checked')
        ).map(input => input.value);

        comisionSummary.textContent = selectedValues.length > 0
            ? selectedValues.join(', ')
            : 'Seleccione comisiones';

        const otroContainer = document.getElementById(`comision_otro_${index}`);
        if (selectedValues.includes('Otro')) {
            if (otroContainer) {
                otroContainer.style.display = 'block';
            }
        } else if (otroContainer) {
            otroContainer.style.display = 'none';
            otroComisionInput.value = '';
        }

        updateComisionIdFields(index, comisionDropdown, comisionIdsContainer, otroComisionInput);
    });

    otroComisionInput.addEventListener('input', () => {
        updateComisionIdFields(index, comisionDropdown, comisionIdsContainer, otroComisionInput);
    });

    updateComisionIdFields(index, comisionDropdown, comisionIdsContainer, otroComisionInput);

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

function updateComisionIdFields(index, comisionDropdown, comisionIdsContainer, otroComisionInput) {
    const selectedValues = Array.from(
        comisionDropdown.querySelectorAll('input[type="checkbox"]:checked')
    ).map(input => input.value);

    const existingValues = new Map(
        Array.from(comisionIdsContainer.querySelectorAll('input')).map(input => [
            input.dataset.comision,
            input.value
        ])
    );

    comisionIdsContainer.innerHTML = '';

    selectedValues.forEach(value => {
        const displayLabel = value === 'Otro'
            ? (otroComisionInput.value.trim() || 'Otro')
            : value;

        const item = document.createElement('div');
        item.className = 'comision-id-item';

        const label = document.createElement('label');
        label.textContent = `ID Comisión ${displayLabel} *`;
        item.appendChild(label);

        const input = document.createElement('input');
        input.type = 'text';
        input.name = `comision_id_${index}[]`;
        input.placeholder = 'Ingrese ID (1-7 dígitos)';
        input.inputMode = 'numeric';
        input.maxLength = 7;
        input.pattern = '\\d{1,7}';
        input.required = true;
        input.dataset.comision = value;
        input.dataset.comisionLabel = displayLabel;
        input.value = existingValues.get(value) || '';
        item.appendChild(input);

        comisionIdsContainer.appendChild(item);
    });
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

    const today = getTodayISO();
    const maxDate = getMaxFutureDateISO(9);
    if (formData.fechaInicio) {
        if (formData.fechaInicio < today) {
            errors.push('La fecha de inicio no puede ser anterior al dia actual');
        }
        if (formData.fechaInicio > maxDate) {
            errors.push('La fecha de inicio no puede superar los 9 dias desde la fecha en que se ingresa a la app');
        }
    }
    if (formData.fechaFin) {
        if (formData.fechaFin < today) {
            errors.push('La fecha de fin no puede ser anterior al dia actual');
        }
        if (formData.fechaFin > maxDate) {
            errors.push('La fecha de fin no puede superar los 9 dias desde la fecha en que se ingresa a la app');
        }
    }
    
    if (formData.fechaInicio && formData.fechaFin) {
        const inicio = new Date(formData.fechaInicio);
        const fin = new Date(formData.fechaFin);
        if (inicio > fin) {
            errors.push('La fecha de inicio no puede ser mayor a la fecha de fin');
        }
    }

    // Validar motivo
    if (!formData.motivo.trim()) errors.push('El motivo de la ausencia es requerido');

    // Validar articulo
    if (!formData.articulo || !formData.articulo.trim()) {
        errors.push('El número de artículo es requerido');
    }

    // Validar funciones
    const funcionesSelect = document.getElementById('funcionesSelect');
    if (!funcionesSelect.value) {
        errors.push('Debe seleccionar al menos una función');
    }

    // Validar campos dinámicos para docentes
    if (funcionesSelect.value) {
        const selectedOption = funcionesSelect.options[funcionesSelect.selectedIndex];
        const type = selectedOption ? selectedOption.getAttribute('data-type') : '';
        const index = 0;

        if (type === 'docente_primer_año' || type === 'docente_segundo_año' || 
            type === 'docente_tercer_año' || type === 'docente_cuarto_año') {
            
            const subespacioSelect = document.querySelector(`select[name="subespacio_${index}"]`);
            const comisionCheckboxes = document.querySelectorAll(
                `input[name="comision_${index}"]:checked`
            );
            const comisionIdInputs = document.querySelectorAll(`input[name="comision_id_${index}[]"]`);
            
            if (subespacioSelect && !subespacioSelect.value) {
                errors.push('El subespacio para la función seleccionada es requerido');
            }
            
            if (comisionCheckboxes.length === 0) {
                errors.push('Debe seleccionar al menos una comisión');
            }

            if (comisionIdInputs.length !== comisionCheckboxes.length) {
                errors.push('Debe ingresar un ID por cada comisión seleccionada');
            }

            const idRegex = /^\d{1,7}$/;
            comisionIdInputs.forEach(input => {
                const value = input.value.trim();
                const label = input.dataset.comisionLabel || 'la comisión';
                if (!idRegex.test(value)) {
                    errors.push(`El ID de ${label} debe tener hasta 7 dígitos`);
                }
            });

            // Validar campos "Otro"
            if (subespacioSelect && subespacioSelect.value === 'Otro') {
                const otroInput = document.querySelector(`input[name="subespacio_otro_${index}"]`);
                if (!otroInput || !otroInput.value.trim()) {
                    errors.push('Debe especificar el subespacio para la función seleccionada');
                }
            }

            const selectedValues = Array.from(comisionCheckboxes).map(input => input.value);
            if (selectedValues.includes('Otro')) {
                const otroInput = document.querySelector(`input[name="comision_otro_${index}"]`);
                if (!otroInput || !otroInput.value.trim()) {
                    errors.push('Debe especificar la comisión para la función seleccionada');
                }
            }
        }
    }

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
    const funcionesSelect = document.getElementById('funcionesSelect');
    if (funcionesSelect.value) {
        const selectedOption = funcionesSelect.options[funcionesSelect.selectedIndex];
        const funcion = {
            tipo: funcionesSelect.value,
            label: selectedOption ? selectedOption.textContent.trim() : funcionesSelect.value,
            tipoFuncion: selectedOption ? selectedOption.getAttribute('data-type') : ''
        };

        // Para docentes, agregar subespacios y comisiones
        const type = funcion.tipoFuncion;
        const index = 0;
        if (type === 'docente_primer_año' || type === 'docente_segundo_año' || 
            type === 'docente_tercer_año' || type === 'docente_cuarto_año') {
            
            const subespacioSelect = document.querySelector(`select[name="subespacio_${index}"]`);
            const comisionCheckboxes = document.querySelectorAll(
                `input[name="comision_${index}"]:checked`
            );
            const comisionIdInputs = document.querySelectorAll(`input[name="comision_id_${index}[]"]`);
            const observacionesTextarea = document.querySelector(`textarea[name="observaciones_${index}"]`);

            const comisionValues = Array.from(comisionCheckboxes).map(input => input.value);

            funcion.subespacio = subespacioSelect?.value === 'Otro' 
                ? document.querySelector(`input[name="subespacio_otro_${index}"]`)?.value
                : subespacioSelect?.value;
            
            if (comisionValues.includes('Otro')) {
                const otroValor = document.querySelector(`input[name="comision_otro_${index}"]`)?.value;
                funcion.comision = comisionValues.map(value => (value === 'Otro' ? otroValor : value));
            } else {
                funcion.comision = comisionValues;
            }

            funcion.comisionIds = Array.from(comisionIdInputs).map(input => ({
                comision: input.dataset.comisionLabel || input.dataset.comision,
                id: input.value.trim()
            }));
            
            funcion.observaciones = observacionesTextarea?.value;
        }

        data.funciones.push(funcion);
    }

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
