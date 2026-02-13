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

const FUNCIONES_CON_ID = new Set([
    'asistente_escolar',
    'personal_alumnado',
    'personal_gestion',
    'personal_secretaria',
    'personal_biblioteca'
]);

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
    const noticeModal = document.getElementById('noticeModal');
    const noticeAcceptBtn = document.getElementById('noticeAcceptBtn');
    const fechaInicioInput = document.getElementById('fechaInicio');
    const fechaFinInput = document.getElementById('fechaFin');
    
    // Event listener para los checkboxes de funciones
    const funcionesCheckboxes = document.querySelectorAll('input[name="funciones"]');
    funcionesCheckboxes.forEach(checkbox => {
        checkbox.addEventListener('change', handleFuncionesChange);
    });
    
    // Event listener para actualizar el summary del dropdown de funciones
    const funcionesDropdown = document.getElementById('funcionesDropdown');
    if (funcionesDropdown) {
        funcionesDropdown.addEventListener('change', updateFuncionesSummary);
    }

    // Event listener para el formulario
    form.addEventListener('submit', handleFormSubmit);

    // Event listener para limpiar formulario
    form.addEventListener('reset', () => {
        setTimeout(() => {
            const dynamicSection = document.getElementById('dynamicSection');
            if (dynamicSection) {
                dynamicSection.innerHTML = '';
                dynamicSection.style.display = 'none';
            }
            
            const otroContainer = document.getElementById('otroFuncionContainer');
            if (otroContainer) {
                otroContainer.style.display = 'none';
            }
            
            // Resetear el summary del dropdown de funciones
            updateFuncionesSummary();
            
            updateSectionStates();
        }, 0);
    });

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

        fechaFinInput.addEventListener('change', () => {
            const value = fechaFinInput.value;
            if (!value) return;

            if (value < today) {
                alert('No se puede ingresar una licencia con fecha anterior al dia actual.');
                fechaFinInput.value = '';
                return;
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

    document.addEventListener('click', (event) => {
        const target = event.target;
        if (!(target instanceof Element)) return;

        // Cerrar dropdowns de comisiones cuando se hace clic fuera
        document.querySelectorAll('.comision-dropdown[open]').forEach((dropdown) => {
            if (!dropdown.contains(target)) {
                dropdown.removeAttribute('open');
            }
        });
        
        // Cerrar dropdown de funciones cuando se hace clic fuera
        const funcionesDropdown = document.getElementById('funcionesDropdown');
        if (funcionesDropdown && funcionesDropdown.open && !funcionesDropdown.contains(target)) {
            funcionesDropdown.removeAttribute('open');
        }
    });
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
            const comisionInputs = dynamicSection.querySelectorAll(
                'input[type="checkbox"][name^="comision_"]'
            );
            if (comisionInputs.length > 0 && comisionChecked.length === 0) return false;

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

// Actualizar el summary del dropdown de funciones
function updateFuncionesSummary() {
    const checkboxes = document.querySelectorAll('input[name="funciones"]:checked');
    const summary = document.getElementById('funcionesSummary');
    
    if (!summary) return;
    
    if (checkboxes.length === 0) {
        summary.textContent = 'Seleccione las funciones';
    } else {
        const labels = Array.from(checkboxes).map(cb => cb.getAttribute('data-label'));
        summary.textContent = labels.join(', ');
    }
}

// Manejo de cambio de funciones (checkboxes múltiples)
function handleFuncionesChange() {
    updateFuncionesSummary();
    
    const checkboxes = document.querySelectorAll('input[name="funciones"]:checked');
    const dynamicSection = document.getElementById('dynamicSection');
    const otroContainer = document.getElementById('otroFuncionContainer');
    
    // Verificar si "Otro" está seleccionado
    const otroChecked = Array.from(checkboxes).some(cb => cb.value === 'otro_funcion');
    if (otroChecked) {
        otroContainer.style.display = 'block';
        otroContainer.classList.add('fade-in');
    } else {
        otroContainer.style.display = 'none';
    }
    
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
        const functionLabel = checkbox.getAttribute('data-label');

        // Crear tarjeta colapsable para cada función
        const card = createCollapsibleFunctionCard(value, type, functionLabel, index);
        dynamicSection.appendChild(card);
    });

    updateSectionStates();
}

// Crear tarjeta colapsable para una función
function createCollapsibleFunctionCard(functionValue, functionType, functionLabel, index) {
    const card = document.createElement('div');
    card.className = 'function-card bg-white dark:bg-slate-900 rounded-xl shadow-sm border border-primary/10 mb-6 overflow-hidden fade-in';
    card.setAttribute('data-function-index', index);
    
    // Header (clickeable para colapsar/expandir)
    const header = document.createElement('div');
    header.className = 'function-card-header flex items-center justify-between p-4 cursor-pointer bg-primary/5 hover:bg-primary/10 transition-colors';
    header.setAttribute('role', 'button');
    header.setAttribute('aria-expanded', 'false');
    
    const headerLeft = document.createElement('div');
    headerLeft.className = 'flex items-center gap-3';
    
    const icon = document.createElement('span');
    icon.className = 'material-icons-outlined text-primary';
    icon.textContent = 'work';
    
    const title = document.createElement('h4');
    title.className = 'text-base font-bold text-slate-900 dark:text-white';
    title.textContent = functionLabel;
    
    headerLeft.appendChild(icon);
    headerLeft.appendChild(title);
    
    const expandIcon = document.createElement('span');
    expandIcon.className = 'material-icons-outlined text-slate-500 transition-transform';
    expandIcon.textContent = 'expand_more';
    
    header.appendChild(headerLeft);
    header.appendChild(expandIcon);
    
    // Body (contenido colapsable)
    const body = document.createElement('div');
    body.className = 'function-card-body';
    body.style.display = 'none';
    body.style.padding = '1rem';
    
    // Agregar campos según el tipo de función
    if (functionType === 'docente_primer_año' || functionType === 'docente_segundo_año' || 
        functionType === 'docente_tercer_año' || functionType === 'docente_cuarto_año') {
        createDocenteFieldsInCard(body, functionValue, index, functionLabel);
    } else if (FUNCIONES_CON_ID.has(functionValue)) {
        createFuncionIdFieldInCard(body, functionValue, index, functionLabel);
    }
    
    // Toggle collapse/expand
    header.addEventListener('click', () => {
        const isExpanded = header.getAttribute('aria-expanded') === 'true';
        header.setAttribute('aria-expanded', (!isExpanded).toString());
        
        if (isExpanded) {
            body.style.display = 'none';
            expandIcon.style.transform = 'rotate(0deg)';
        } else {
            body.style.display = 'block';
            expandIcon.style.transform = 'rotate(180deg)';
        }
    });
    
    card.appendChild(header);
    card.appendChild(body);
    
    return card;
}

// Crear campos de ID dentro de la tarjeta
function createFuncionIdFieldInCard(container, functionType, index, functionLabel) {
    const idDiv = document.createElement('div');
    idDiv.className = 'space-y-2';

    const idLabel = document.createElement('label');
    idLabel.htmlFor = `funcion_id_${index}`;
    idLabel.className = 'block text-sm font-semibold text-slate-700 dark:text-slate-300';
    idLabel.textContent = 'ID de la función *';
    idDiv.appendChild(idLabel);

    const idInput = document.createElement('input');
    idInput.type = 'text';
    idInput.id = `funcion_id_${index}`;
    idInput.name = `funcion_id_${index}`;
    idInput.className = 'block w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 rounded-lg focus:ring-primary focus:border-primary text-sm';
    idInput.placeholder = 'Ingrese el ID';
    idInput.required = true;
    idInput.inputMode = 'numeric';
    idInput.pattern = '\\d+';
    idInput.maxLength = 10;
    idDiv.appendChild(idInput);

    container.appendChild(idDiv);
}

// Crear campos para docentes dentro de la tarjeta
function createDocenteFieldsInCard(container, docenteType, index, functionLabel) {
    // Container de los selects
    const selectsContainer = document.createElement('div');
    selectsContainer.className = 'space-y-4';

    // Select de Subespacios
    const subespacioDiv = document.createElement('div');
    subespacioDiv.className = 'space-y-2';
    
    const subespacioLabel = document.createElement('label');
    subespacioLabel.htmlFor = `subespacio_${index}`;
    subespacioLabel.className = 'block text-sm font-semibold text-slate-700 dark:text-slate-300';
    subespacioLabel.textContent = 'Subespacios en los cuales se ausentará *';
    subespacioDiv.appendChild(subespacioLabel);

    const subespacioSelect = document.createElement('select');
    subespacioSelect.id = `subespacio_${index}`;
    subespacioSelect.name = `subespacio_${index}`;
    subespacioSelect.className = 'subespacio-select block w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 rounded-lg focus:ring-primary focus:border-primary text-sm';
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
    otroSubespacioDiv.className = 'space-y-2';
    otroSubespacioDiv.style.display = 'none';

    const otroSubespacioLabel = document.createElement('label');
    otroSubespacioLabel.htmlFor = `subespacio_otro_input_${index}`;
    otroSubespacioLabel.className = 'block text-sm font-semibold text-slate-700 dark:text-slate-300';
    otroSubespacioLabel.textContent = 'Por favor especifique el subespacio:';
    otroSubespacioDiv.appendChild(otroSubespacioLabel);

    const otroSubespacioInput = document.createElement('input');
    otroSubespacioInput.type = 'text';
    otroSubespacioInput.id = `subespacio_otro_input_${index}`;
    otroSubespacioInput.name = `subespacio_otro_${index}`;
    otroSubespacioInput.className = 'block w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 rounded-lg focus:ring-primary focus:border-primary text-sm';
    otroSubespacioInput.placeholder = 'Escriba aquí el subespacio';
    otroSubespacioDiv.appendChild(otroSubespacioInput);

    selectsContainer.appendChild(otroSubespacioDiv);

    // Comisiones
    const comisionDiv = document.createElement('div');
    comisionDiv.className = 'space-y-2';
    
    const comisionLabel = document.createElement('label');
    comisionLabel.className = 'block text-sm font-semibold text-slate-700 dark:text-slate-300';
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
        const itemContainer = document.createElement('div');
        itemContainer.className = 'comision-item';

        const checkboxContainer = document.createElement('label');
        checkboxContainer.className = 'comision-checkbox-label';

        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.name = `comision_${index}`;
        checkbox.value = comision;
        checkbox.className = 'comision-checkbox';

        const text = document.createElement('span');
        text.textContent = comision;
        text.className = 'comision-name';

        checkboxContainer.appendChild(checkbox);
        checkboxContainer.appendChild(text);

        const idInput = document.createElement('input');
        idInput.type = 'text';
        idInput.name = `comision_id_${index}_${comision.replace(/\s+/g, '_')}`;
        idInput.className = 'comision-id-input';
        idInput.placeholder = 'ID';
        idInput.disabled = true;
        idInput.inputMode = 'numeric';
        idInput.pattern = '\\d+';

        // Habilitar/deshabilitar input según checkbox
        checkbox.addEventListener('change', () => {
            if (checkbox.checked) {
                idInput.disabled = false;
                idInput.required = true;
            } else {
                idInput.disabled = true;
                idInput.required = false;
                idInput.value = '';
            }
        });

        itemContainer.appendChild(checkboxContainer);
        itemContainer.appendChild(idInput);
        comisionList.appendChild(itemContainer);
    });

    comisionDropdown.appendChild(comisionList);
    comisionDiv.appendChild(comisionDropdown);
    selectsContainer.appendChild(comisionDiv);

    // Campo "Otro" para comisión
    const otroComisionDiv = document.createElement('div');
    otroComisionDiv.id = `comision_otro_container_${index}`;
    otroComisionDiv.className = 'space-y-2';
    otroComisionDiv.style.display = 'none';

    const otroComisionLabel = document.createElement('label');
    otroComisionLabel.htmlFor = `comision_otro_${index}`;
    otroComisionLabel.className = 'block text-sm font-semibold text-slate-700 dark:text-slate-300';
    otroComisionLabel.textContent = 'Especifique la comisión:';
    otroComisionDiv.appendChild(otroComisionLabel);

    const otroComisionInput = document.createElement('input');
    otroComisionInput.type = 'text';
    otroComisionInput.id = `comision_otro_${index}`;
    otroComisionInput.name = `comision_otro_${index}`;
    otroComisionInput.className = 'block w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 rounded-lg focus:ring-primary focus:border-primary text-sm';
    otroComisionInput.placeholder = 'Escriba aquí la comisión';
    otroComisionDiv.appendChild(otroComisionInput);

    selectsContainer.appendChild(otroComisionDiv);

    // Event listener para mostrar "Otro" comision
    comisionList.addEventListener('change', (e) => {
        if (e.target.type === 'checkbox' && e.target.value === 'Otro') {
            if (e.target.checked) {
                otroComisionDiv.style.display = 'block';
            } else {
                otroComisionDiv.style.display = 'none';
                otroComisionInput.value = '';
            }
        }
    });

    // Observaciones
    const obsDiv = document.createElement('div');
    obsDiv.className = 'space-y-2';
    
    const obsLabel = document.createElement('label');
    obsLabel.htmlFor = `observaciones_${index}`;
    obsLabel.className = 'block text-sm font-semibold text-slate-700 dark:text-slate-300';
    obsLabel.textContent = 'Observaciones (opcional)';
    obsDiv.appendChild(obsLabel);

    const obsTextarea = document.createElement('textarea');
    obsTextarea.id = `observaciones_${index}`;
    obsTextarea.name = `observaciones_${index}`;
    obsTextarea.className = 'block w-full p-4 bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 rounded-lg focus:ring-primary focus:border-primary text-sm min-h-[100px]';
    obsTextarea.rows = 3;
    obsTextarea.placeholder = 'Observaciones adicionales...';
    obsDiv.appendChild(obsTextarea);

    selectsContainer.appendChild(obsDiv);

    container.appendChild(selectsContainer);
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

    // Validar funciones (checkboxes)
    const funcionesCheckboxes = document.querySelectorAll('input[name="funciones"]:checked');
    if (funcionesCheckboxes.length === 0) {
        errors.push('Debe seleccionar al menos una función');
    }

    // Validar campos dinámicos para cada función seleccionada
    funcionesCheckboxes.forEach((checkbox, index) => {
        const type = checkbox.getAttribute('data-type');
        const label = checkbox.getAttribute('data-label');
        
        if (type === 'docente_primer_año' || type === 'docente_segundo_año' || 
            type === 'docente_tercer_año' || type === 'docente_cuarto_año') {
            
            const subespacioSelect = document.querySelector(`select[name="subespacio_${index}"]`);
            const comisionCheckboxes = document.querySelectorAll(
                `input[name="comision_${index}"]:checked`
            );
            
            if (subespacioSelect && !subespacioSelect.value) {
                errors.push(`El subespacio para "${label}" es requerido`);
            }
            
            if (comisionCheckboxes.length === 0) {
                errors.push(`Debe seleccionar al menos una comisión para "${label}"`);
            }

            // Validar IDs de comisiones (cada comisión marcada debe tener su ID)
            comisionCheckboxes.forEach(cb => {
                const comisionName = cb.value.replace(/\s+/g, '_');
                const idInput = document.querySelector(`input[name="comision_id_${index}_${comisionName}"]`);
                if (idInput && !idInput.value.trim()) {
                    errors.push(`El ID para la comisión "${cb.value}" en "${label}" es requerido`);
                } else if (idInput && !/^\d+$/.test(idInput.value.trim())) {
                    errors.push(`El ID para la comisión "${cb.value}" debe contener solo números`);
                }
            });

            // Validar campos "Otro"
            if (subespacioSelect && subespacioSelect.value === 'Otro') {
                const otroInput = document.querySelector(`input[name="subespacio_otro_${index}"]`);
                if (!otroInput || !otroInput.value.trim()) {
                    errors.push(`Debe especificar el subespacio para "${label}"`);
                }
            }

            const selectedComisionValues = Array.from(comisionCheckboxes).map(input => input.value);
            if (selectedComisionValues.includes('Otro')) {
                const otroInput = document.querySelector(`input[name="comision_otro_${index}"]`);
                if (!otroInput || !otroInput.value.trim()) {
                    errors.push(`Debe especificar la comisión para "${label}"`);
                }
            }
        } else if (FUNCIONES_CON_ID.has(checkbox.value)) {
            const idInput = document.querySelector(`input[name="funcion_id_${index}"]`);
            if (!idInput || !idInput.value.trim()) {
                errors.push(`El ID para "${label}" es requerido`);
            } else if (!/^\d+$/.test(idInput.value.trim())) {
                errors.push(`El ID para "${label}" debe contener solo números`);
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

    // Recopilar funciones seleccionadas (checkboxes)
    const funcionesCheckboxes = document.querySelectorAll('input[name="funciones"]:checked');
    
    funcionesCheckboxes.forEach((checkbox, index) => {
        const funcion = {
            tipo: checkbox.value,
            label: checkbox.getAttribute('data-label'),
            tipoFuncion: checkbox.getAttribute('data-type')
        };

        // Para docentes, agregar subespacios y comisiones
        const type = funcion.tipoFuncion;
        
        if (type === 'docente_primer_año' || type === 'docente_segundo_año' || 
            type === 'docente_tercer_año' || type === 'docente_cuarto_año') {
            
            const subespacioSelect = document.querySelector(`select[name="subespacio_${index}"]`);
            const comisionCheckboxes = document.querySelectorAll(
                `input[name="comision_${index}"]:checked`
            );
            const observacionesTextarea = document.querySelector(`textarea[name="observaciones_${index}"]`);

            const comisionValues = Array.from(comisionCheckboxes).map(input => input.value);
            const comisionIds = [];

            comisionCheckboxes.forEach(cb => {
                const comisionName = cb.value.replace(/\s+/g, '_');
                const idInput = document.querySelector(`input[name="comision_id_${index}_${comisionName}"]`);
                comisionIds.push({
                    comision: cb.value,
                    id: idInput?.value.trim() || ''
                });
            });

            funcion.subespacio = subespacioSelect?.value === 'Otro' 
                ? document.querySelector(`input[name="subespacio_otro_${index}"]`)?.value
                : subespacioSelect?.value;
            
            if (comisionValues.includes('Otro')) {
                const otroValor = document.querySelector(`input[name="comision_otro_${index}"]`)?.value;
                funcion.comision = comisionValues.map(value => (value === 'Otro' ? otroValor : value));
            } else {
                funcion.comision = comisionValues;
            }

            funcion.comisionIds = comisionIds;
            funcion.observaciones = observacionesTextarea?.value;
            
        } else if (FUNCIONES_CON_ID.has(funcion.tipo)) {
            const idInput = document.querySelector(`input[name="funcion_id_${index}"]`);
            funcion.funcionId = idInput?.value.trim();
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

        const downloadContainer = document.getElementById('successDownload');
        const downloadLink = document.getElementById('downloadLink');
        const downloadUrl = result?.data?.downloadUrl;

        if (downloadContainer && downloadLink && downloadUrl) {
            downloadLink.href = downloadUrl;
            downloadContainer.style.display = 'block';

            const autoLink = document.createElement('a');
            autoLink.href = downloadUrl;
            autoLink.download = '';
            autoLink.rel = 'noopener';
            document.body.appendChild(autoLink);
            autoLink.click();
            autoLink.remove();
        } else if (downloadContainer) {
            downloadContainer.style.display = 'none';
        }

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
        updateFuncionesSummary();

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

// ============================================================
// CAMBIAR COLOR DEL SIDEBAR SEGÚN SECCIÓN ACTIVA
// ============================================================


// ============================================================
// SCROLL SPY - Navegación activa en sidebar
// ============================================================
function initScrollSpy() {
    console.log('initScrollSpy iniciado');
    const sections = document.querySelectorAll('.scroll-section');
    const navLinks = document.querySelectorAll('.nav-link');
    const mainContent = document.querySelector('main');

    if (sections.length === 0 || navLinks.length === 0) return;

    const isMainScrollable = mainContent
        && mainContent.scrollHeight > mainContent.clientHeight + 1
        && getComputedStyle(mainContent).overflowY !== 'visible';
    const scrollContainer = isMainScrollable ? mainContent : window;

    let isScrolling = false;
    let scrollTimeout;

    function updateActiveLink() {
        if (isScrolling) return;

        const scrollTop = isMainScrollable ? mainContent.scrollTop : window.scrollY;
        const scrollPosition = scrollTop + 200; // Offset para activar antes

        let currentSection = '';
        let minDistance = Infinity;

        sections.forEach(section => {
            const sectionTop = isMainScrollable
                ? section.offsetTop
                : section.getBoundingClientRect().top + window.scrollY;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.id;

            // Calcular distancia al top de la sección
            const distance = Math.abs(scrollPosition - sectionTop);

            // Si estamos dentro de la sección o muy cerca
            if (scrollPosition >= sectionTop - 100 && scrollPosition < sectionTop + sectionHeight) {
                if (distance < minDistance) {
                    minDistance = distance;
                    currentSection = sectionId;
                }
            }
        });

        // Si no hay sección detectada, usar la primera o última según scroll
        if (!currentSection && sections.length > 0) {
            if (scrollTop < 100) {
                currentSection = sections[0].id;
            } else {
                currentSection = sections[sections.length - 1].id;
            }
        }

        // Actualizar navegación
        navLinks.forEach(link => {
            const linkSection = link.getAttribute('data-section');
            
            if (linkSection === currentSection) {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        });


    }

    // Escuchar scroll en el contenedor real
    scrollContainer.addEventListener('scroll', () => {
        clearTimeout(scrollTimeout);
        scrollTimeout = setTimeout(updateActiveLink, 50);
    }, { passive: true });

    // Manejar clicks en los links del sidebar
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            const href = link.getAttribute('href');
            if (!href || !href.startsWith('#')) return;
            e.preventDefault();
            const targetSection = document.querySelector(href);

            if (targetSection) {
                isScrolling = true;

                // Remover active de todos
                navLinks.forEach(l => l.classList.remove('active'));
                // Añadir active al clickeado
                link.classList.add('active');

                // Hacer scroll suave usando el contenedor correcto
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });

                // Permitir actualización automática después de 1 segundo
                setTimeout(() => {
                    isScrolling = false;
                    updateActiveLink();
                }, 1000);
            }
        });
    });

    // Activar la primera sección al cargar
    setTimeout(updateActiveLink, 100);
}

// Inicializar scroll spy cuando el DOM esté listo
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initScrollSpy);
} else {
    initScrollSpy();
}

// Menú móvil
function initMobileMenu() {
    const toggleBtn = document.getElementById('sidebarToggle');
    const nav = document.querySelector('aside nav');
    const navContainer = document.querySelector('aside nav .nav-container');
    
    if (!toggleBtn || !nav || !navContainer) return;
    
    // Crear botón de cerrar dentro del nav container
    const closeBtn = document.createElement('button');
    closeBtn.className = 'mobile-close-btn absolute top-2 right-2 p-2 text-slate-500 hover:text-slate-700 bg-white rounded-full shadow-md z-10';
    closeBtn.innerHTML = '<span class="material-icons-outlined">close</span>';
    
    // Toggle del menú
    toggleBtn.addEventListener('click', () => {
        nav.classList.add('mobile-show');
        if (!navContainer.contains(closeBtn)) {
            navContainer.style.position = 'relative';
            navContainer.insertBefore(closeBtn, navContainer.firstChild);
        }
    });
    
    // Cerrar menú
    const closeMenu = () => {
        nav.classList.remove('mobile-show');
    };
    
    closeBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        closeMenu();
    });
    
    // Cerrar al hacer click en un link
    const navLinks = nav.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            // Esperar un poco antes de cerrar para que se vea la animación
            setTimeout(closeMenu, 100);
        });
    });
    
    // Cerrar al hacer click en el overlay (el nav mismo)
    nav.addEventListener('click', (e) => {
        if (e.target === nav) {
            closeMenu();
        }
    });
}

// Inicializar menú móvil cuando el DOM esté listo
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initMobileMenu);
} else {
    initMobileMenu();
}
