// ========== RELOJ Y FECHA ==========
function clock() {
    const hour = document.getElementById("hour");
    const minutes = document.getElementById("minutes");
    const seconds = document.getElementById("seconds");

    let now = new Date();
    let h = now.getHours();
    let m = now.getMinutes();
    let s = now.getSeconds();

    h = h < 10 ? "0" + h : h;
    m = m < 10 ? "0" + m : m;
    s = s < 10 ? "0" + s : s;

    hour.textContent = h;
    minutes.textContent = m;
    seconds.textContent = s;

}

function dateInfo() {
    const dayname = document.getElementById("day-name");
    const daynum = document.getElementById("day-number");
    const month = document.getElementById("month");
    const year = document.getElementById("year");

    let now = new Date();
    let d = now.getDay();
    let m = now.getMonth();
    let dayn = now.getDate();
    let y = now.getFullYear();

    const days = ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"];
    const months = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];

    dayname.textContent = days[d];
    daynum.textContent = dayn;
    month.textContent = months[m];
    year.textContent = y;
}

// ========== TAREAS ==========
let tasks = [];

async function addTask(taskInput, taskList) {
    if (taskInput.value.trim() === "") return;

    const task = {
        text: taskInput.value,
        state: "pending",
        task_order: tasks.filter(t => t.state === "pending").length
    };

    const apiCreate = `${API_URL}/tasks/create.php`;

    const response = await fetch(apiCreate, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify(task)
    });

    if (response.ok) {
        const data = await response.json();
        const taskId = Number(data.task.id);


        const li = createTaskElement(taskInput.value, taskId, task.state);
        taskList.appendChild(li);

        task.id = taskId;


        tasks.push(task);

        taskInput.value = "";

        showToast('Tarea creada', 'success');

    } else {
        showToast('Error al crear tarea', 'error')
    }
}

async function moveTask(completeBtn, li) {
    completeBtn.addEventListener("click", async () => {
        const apiUpdate = `${API_URL}/tasks/update.php`;
        const taskId = Number(li.dataset.id);
        const task = tasks.find(t => t.id === taskId);

        const oldState = task.state;
        const newState = task.state === "pending" ? "progress" : "completed";

        const destinationList = document.getElementById(`${task.state}-list`);
        destinationList.appendChild(li);

        if (newState === "completed") {
            completeBtn.style.display = "none";
        }

        const response = await fetch(apiUpdate, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include',
            body: JSON.stringify({
                id: taskId,
                text: task.text,
                state: newState,
                task_order: task.task_order
            })
        });

        if (response.ok) {
            updateTaskOrder(`${oldState}-list`);
            updateTaskOrder(`${newState}-list`);
            loadStats();

        } else {
            await loadTasksFromAPI();
            showToast('Error al actualizar tarea', 'error');
        }
    });
}

async function deleteTask(deleteBtn, li) {
    const apiDelete = `${API_URL}/tasks/delete.php`;
    const taskId = Number(li.dataset.id);

    deleteBtn.addEventListener("click", async () => {
        tasks = tasks.filter(t => t.id !== taskId);
        li.remove();

        const response = await fetch(apiDelete, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include',
            body: JSON.stringify({ id: taskId })
        });

        if (!response.ok) {
            await loadTasksFromAPI();
            showToast('No se ha podido eliminar la tarea.', 'error');
        }
    });
}

function taskManager() {
    const taskList = document.getElementById("pending-list");
    const taskInput = document.getElementById("task-input");

    const form = document.querySelector('.col-2 form');
    if (!form.hasAttribute('data-listener')) {
        form.setAttribute('data-listener', 'true');
        form.addEventListener("submit", (e) => {
            e.preventDefault();
            addTask(taskInput, taskList);
        })
    }

    loadTasks();
    setupDragAndDrop();
}

function loadTasks() {
    const savedTasks = localStorage.getItem("tasks");
    if (savedTasks) tasks = JSON.parse(savedTasks);

    const lists = {
        "pending": document.getElementById("pending-list"),
        "progress": document.getElementById("progress-list"),
        "completed": document.getElementById("completed-list")
    };

    tasks.sort((a, b) => (a.order || 0) - (b.order || 0));

    // Si hay tareas guardadas, las cargamos en el array
    for (const task of tasks) {
        const li = createTaskElement(task.text, task.id, task.state);
        const targetList = lists[task.state];
        if (targetList) targetList.appendChild(li);
    }
}

function createTaskElement(taskText, taskId, taskState) {
    const li = document.createElement("li");
    li.setAttribute("draggable", "true");
    li.className = "task-item";
    li.dataset.id = taskId;

    li.addEventListener("dragover", (e) => {
        e.preventDefault();
    });

    li.addEventListener("dragstart", (e) => {
        e.dataTransfer.effectAllowed = "move";
        e.dataTransfer.setData("text/plain", taskId.toString());
        li.classList.add("dragging");
    });

    li.addEventListener("dragend", (e) => {
        li.classList.remove("dragging"); // ← AÑADIR este evento completo
    });

    const taskTextElement = document.createElement("span");
    taskTextElement.textContent = taskText;

    const btnContainer = document.createElement("div");
    btnContainer.className = "btn-container";

    const completeBtn = document.createElement("button");
    completeBtn.className = "completed-btn";
    completeBtn.innerHTML = '<i class="fa-solid fa-arrow-right"></i>';

    const deleteBtn = document.createElement("button");
    deleteBtn.className = "delete-btn";
    deleteBtn.textContent = "✖";

    deleteTask(deleteBtn, li);
    moveTask(completeBtn, li);

    btnContainer.appendChild(completeBtn);
    btnContainer.appendChild(deleteBtn);

    li.appendChild(taskTextElement);
    li.appendChild(btnContainer);

    // Ajustar según el estado
    if (taskState === "completed") {
        completeBtn.style.display = "none";
    }

    return li;
}

function setupDragAndDrop() {
    const lists = document.querySelectorAll("ul[data-state]");

    lists.forEach(list => {
        list.addEventListener("dragover", (e) => {
            e.preventDefault();

            document.querySelectorAll('.drag-over-top, .drag-over-bottom').forEach(el => {
                el.classList.remove('drag-over-top', 'drag-over-bottom');

            });

            const afterElement = getDragAfterElement(list, e.clientY);

            if (afterElement) {
                afterElement.classList.add("drag-over-top");
            } else if (list.children.length > 0) {
                const lastChild = [...list.children].filter(child => !child.classList.contains("dragging")).pop();
                if (lastChild) lastChild.classList.add("drag-over-bottom");
            }

        });

        // Manejar el evento de soltar una tarea en esta lista
        list.addEventListener("drop", (e) => {
            e.preventDefault();

            document.querySelectorAll('.drag-over-top, .drag-over-bottom').forEach(el => {
                el.classList.remove('drag-over-top', 'drag-over-bottom');
            });

            const taskId = e.dataTransfer.getData("text/plain");

            const draggable = document.querySelector(`li[data-id="${taskId}"]`);

            if (!draggable) {
                return;
            }

            const afterElement = getDragAfterElement(list, e.clientY);

            if (afterElement == null) {
                list.appendChild(draggable);
            } else {
                list.insertBefore(draggable, afterElement);
            }
            updateTaskState(taskId, list.dataset.state);
            updateTaskOrder(list.id);

        });

        list.addEventListener("dragleave", () => {
            document.querySelectorAll('.drag-over-top, .drag-over-bottom').forEach(el => {
                el.classList.remove('drag-over-top', 'drag-over-bottom');
            });
        });
    });
}

// DRAG AND DROP
async function updateTaskState(taskId, newState) {
    const apiUpdateState = `${API_URL}/tasks/update.php`;
    const task = tasks.find(t => t.id === Number(taskId));

    const oldState = task.state;
    task.state = newState;

    const taskElement = document.querySelector(`li[data-id="${taskId}"]`);
    const completeBtn = taskElement.querySelector(".completed-btn");

    if (newState === "completed") {
        completeBtn.style.display = "none";
    } else {
        completeBtn.style.display = "block";
    }

    const response = await fetch(apiUpdateState, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify({
            id: taskId,
            text: task.text,
            state: newState,
            task_order: task.task_order
        })
    });

    if (response.ok) {
        updateTaskOrder(`${oldState}-list`);
        updateTaskOrder(`${newState}-list`);
        loadStats();
    } else {
        await loadTasksFromAPI();
        showToast('Error al mover tarea.', 'error');
    }
}

function getDragAfterElement(container, y) {
    const draggableElements = [...container.querySelectorAll(".task-item:not(.dragging)")];

    return draggableElements.reduce((closest, child) => {
        const box = child.getBoundingClientRect();
        const offset = y - box.top - box.height / 2;

        if (offset < 0 && offset > closest.offset) {
            return { offset: offset, element: child }
        } else {
            return closest;
        }
    }, { offset: Number.NEGATIVE_INFINITY }).element;
}

async function updateTaskOrder(listId) {

    const apiUpdateOrder = `${API_URL}/tasks/update_order.php`;

    const list = document.getElementById(listId);
    const taskElements = [...list.querySelectorAll(".task-item")];

    const tasksToUpdate = [];
    for (let index = 0; index < taskElements.length; index++) {
        const taskEl = taskElements[index];
        const taskId = Number(taskEl.dataset.id);
        const task = tasks.find(t => t.id === taskId);


        if (task) {
            task.task_order = index;
            tasksToUpdate.push({ id: taskId, task_order: index });

        }
    }



    if (tasksToUpdate.length === 0) return;

    const response = await fetch(apiUpdateOrder, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify({
            tasks: tasksToUpdate
        })
    });

    if (!response.ok) {
        await loadTasksFromAPI();
        showToast('Error al actualizar orden', 'error');
    }
}

// ====== ESTADÍSTICAS TAREAS ======
let donutChart = null;
let lineChart = null;

async function loadStats() {
    try {
        const response = await fetch(`${API_URL}/tasks/stats.php`, {
            credentials: 'include'
        });

        if (!response.ok) throw new Error('Error al cargar estadísticas');

        const data = await response.json();

        createDonutChart(data);
        createLineChart(data);

    } catch (error) {
        console.error('Error cargando estadísticas: ', error)
    }

}

function createDonutChart(data) {

    const ctx = document.getElementById('chart-donut')

    if (donutChart) donutChart.destroy();

    donutChart = new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: ['Pendientes', 'En progreso', 'Completadas'],
            datasets: [{
                data: [data.pending, data.progress, data.completed],
                backgroundColor: [
                    'rgba(255, 167, 38, 0.8)',
                    'rgba(66, 165, 245, 0.8)',
                    'rgba(102, 187, 106, 0.8)'
                ],
                borderWidth: 2,
                borderColor: '#FFFFFF',
                hoverBorderWidth: 2,
                hoverBorderColor: '#FFFFFF'
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'bottom',
                    labels: {
                        color: '#FFFFFF',
                        font: {
                            size: 14,
                            weight: 'bold'
                        },
                        padding: 15,
                        usePointStyle: true
                    }
                }
            }
        }
    });
}

function createLineChart(data) {
    const ctx = document.getElementById('chart-lines');

    // Si ya existe el gráfico, destruirlo primero
    if (lineChart) {
        lineChart.destroy();
    }

    // Extraer fechas y conteos del timeline
    const labels = data.timeline.map(item => {
        const date = new Date(item.date);
        return date.toLocaleDateString('es-ES', { day: '2-digit', month: 'short' });
    });

    const counts = data.timeline.map(item => item.count);

    lineChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [{
                label: 'Tareas completadas',
                data: counts,
                borderColor: '#66BB6A',
                backgroundColor: 'rgba(102, 187, 106, 0.1)',
                borderWidth: 3,
                fill: true,
                tension: 0.4,  // Curva suave
                pointBackgroundColor: '#66BB6A',
                pointBorderColor: '#FFFFFF',
                pointBorderWidth: 2,
                pointRadius: 5,
                pointHoverRadius: 7
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: {
                        color: '#FFFFFF',
                        stepSize: 1
                    },
                    grid: {
                        color: 'rgba(255, 255, 255, 0.1)'
                    }
                },
                x: {
                    ticks: {
                        color: '#FFFFFF'
                    },
                    grid: {
                        color: 'rgba(255, 255, 255, 0.1)'
                    }
                }
            }
        }
    });
}

// ========== CLIMA ==========
async function getDataWeather() {
    const city = localStorage.getItem("city");

    if (!city) {
        showCityModal();
        return;
    }

    try {
        const response = await fetch(`${API_URL}/weather/get_weather.php?city=${encodeURIComponent(city)}`);
        const data = await response.json();

        if (response.ok) {
            updateWeatherUI(data);
        } else {
            console.error("Error al obtener datos del clima:", data.message);
            showCityModal();
        }
    } catch (error) {
        console.error("Error:", error);
        showCityModal();
    }
}

function requestLocationWeather() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(async (position) => {
            const lat = position.coords.latitude;
            const lon = position.coords.longitude;

            try {
                const response = await fetch(`${API_URL}/weather/get_weather.php?lat=${lat}&lon=${lon}`);
                const data = await response.json();

                if (response.ok) {
                    localStorage.setItem("city", data.name);
                    hideCityModal();
                    getDataWeather();
                } else {
                    console.error("Error al obtener datos del clima");
                }
            } catch (error) {
                console.error("Error:", error);
            }
        }, (error) => {
            console.error("Error de geolocalización:", error);
            showToast("No se pudo obtener tu ubicación", "error");
        });
    }
}

function showCityModal() {
    const modal = document.getElementById("city-modal");
    if (modal) modal.style.display = "flex";
}

function hideCityModal() {
    const modal = document.getElementById("city-modal");
    if (modal) modal.style.display = "none";
}

function setupCityModal() {
    const saveCityBtn = document.getElementById("save-city-btn");
    const retryLocationBtn = document.getElementById("retry-location-btn");
    const cityInput = document.getElementById("city-input");
    const changeCityBtn = document.getElementById("change-city-btn");

    saveCityBtn.addEventListener("click", async () => {
        const cityName = cityInput.value.trim();

        if (!cityName) {
            showToast("Por favor, escribe una ciudad", "error");
            return;
        }

        localStorage.setItem("city", cityName);
        hideCityModal();
        cityInput.value = "";
        getDataWeather();
    });

    retryLocationBtn.addEventListener("click", () => {
        requestLocationWeather();
    });

    changeCityBtn.addEventListener("click", () => {
        showCityModal();
    });

    cityInput.addEventListener("keypress", (e) => {
        if (e.key === "Enter") {
            saveCityBtn.click();
        }
    });
}

function getWeatherIcon(weatherMain) {
    const icons = {
        'Clear': 'fa-sun',
        'Clouds': 'fa-cloud',
        'Rain': 'fa-cloud-rain',
        'Drizzle': 'fa-cloud-rain',
        'Thunderstorm': 'fa-bolt',
        'Snow': 'fa-snowflake',
        'Mist': 'fa-smog',
        'Smoke': 'fa-smog',
        'Haze': 'fa-smog',
        'Dust': 'fa-smog',
        'Fog': 'fa-smog',
        'Sand': 'fa-smog',
        'Ash': 'fa-smog',
        'Squall': 'fa-wind',
        'Tornado': 'fa-tornado'
    };
    return `fa-solid ${icons[weatherMain] || 'fa-cloud'}`;
}

function updateWeatherUI(data) {
    if (!data || !data.main) {
        console.error("Datos del clima no disponibles.");
        return;
    }

    const cityNameElem = document.getElementById("city-name");
    const weatherIcon = document.getElementById("weather-icon");
    const weatherTemp = document.getElementById("weather-temp");
    const weatherMinMax = document.getElementById("weather-min-max");
    const weatherHumidity = document.getElementById("weather-humidity");
    const weatherWind = document.getElementById("weather-wind");

    if (cityNameElem) cityNameElem.textContent = data.name.toUpperCase();
    if (weatherIcon) weatherIcon.innerHTML = `<i class="${getWeatherIcon(data.weather[0].main)}"></i>`;
    if (weatherTemp) weatherTemp.textContent = Math.round(data.main.temp) + "°C";
    if (weatherMinMax) weatherMinMax.textContent = + Math.round(data.main.temp_min) + "°C -" + Math.round(data.main.temp_max) + "°C";
    if (weatherHumidity) weatherHumidity.innerHTML = `<i class="fa-solid fa-droplet"></i> ${data.main.humidity}%`;
    if (weatherWind) weatherWind.innerHTML = `<i class="fa-solid fa-wind"></i> ${Math.round(data.wind.speed * 3.6)} km/h`;
}
// ========== POMODORO ==========
function pomodoroTimer() {
    // DISPLAY ELEMENTS
    const pomoMinutes = document.getElementById("pomodoro-minutes");
    const pomoSeconds = document.getElementById("pomodoro-seconds");

    // BUTTONS
    const startBtn = document.getElementById("start-pomodoro-btn");
    const pauseBtn = document.getElementById("pause-pomodoro-btn");
    const resetBtn = document.getElementById("reset-pomodoro-btn");


    let timeLeft = 25 * 60;
    let isRunning = false;
    let intervalId = null;


    let mode = "trabajo";
    let pomodoroCount = 0;
    const modeDisplay = document.getElementById("pomodoro-mode");
    const countDisplay = document.getElementById("pomodoro-count");

    // PRODUCCION
    const WORK_DURATION = 25 * 60;
    const SHORT_BREAK = 5 * 60;
    const LONG_BREAK = 15 * 60;

    // TESTING
    // const WORK_DURATION = 5;
    // const SHORT_BREAK = 3;
    // const LONG_BREAK = 7;

    function updateDisplay() {
        const minutes = Math.floor(timeLeft / 60);
        const seconds = timeLeft % 60;
        pomoMinutes.textContent = minutes.toString().padStart(2, '0');
        pomoSeconds.textContent = seconds.toString().padStart(2, '0');
    }

    function startTimer() {
        if (isRunning) return;
        isRunning = true;
        intervalId = setInterval(() => {
            timeLeft--;
            updateDisplay();

            if (timeLeft <= 0) {
                clearInterval(intervalId);
                isRunning = false;

                if (mode === "trabajo") {
                    pomodoroCount++;
                    countDisplay.textContent = pomodoroCount;

                    if (pomodoroCount % 4 === 0) {
                        mode = "Descanso largo";
                        timeLeft = LONG_BREAK;
                    } else {
                        mode = "Descanso corto";
                        timeLeft = SHORT_BREAK;
                    }
                } else {
                    mode = "trabajo";
                    timeLeft = WORK_DURATION;
                }

                let modeText;
                if (mode === "trabajo") {
                    modeText = "Trabajo";
                } else if (mode === "Descanso corto") {
                    modeText = "Descanso corto";
                } else {
                    modeText = "Descanso largo";
                }
                modeDisplay.textContent = modeText;

                updateDisplay();
                showToast(`¡Tiempo terminado! Siguiente: ${modeDisplay.textContent}`, "success");
            }
        }, 1000);
    }

    function pauseTimer() {
        if (!isRunning) return;
        clearInterval(intervalId);
        isRunning = false;
    }

    function resetTimer() {
        clearInterval(intervalId);
        isRunning = false;
        timeLeft = 25 * 60;
        updateDisplay();
    }

    startBtn.addEventListener("click", startTimer);
    pauseBtn.addEventListener("click", pauseTimer);
    resetBtn.addEventListener("click", resetTimer);

}

// ========== AUTHENTICATION UI ==========
function setupAuthUI() {
    const showRegisterBtn = document.getElementById('show-register');
    const showLoginBtn = document.getElementById('show-login');
    const loginForm = document.getElementById('login-form');
    const registerForm = document.getElementById('register-form');

    showRegisterBtn.addEventListener('click', (e) => {
        e.preventDefault();
        loginForm.classList.remove('active');
        registerForm.classList.add('active');
    });

    showLoginBtn.addEventListener('click', (e) => {
        e.preventDefault();
        registerForm.classList.remove('active');
        loginForm.classList.add('active');
    });
}

// ========== API AUTHENTICATION ==========
// Detectar si estamos en Live Server o en XAMPP
const API_URL = window.location.hostname === '127.0.0.1' || window.location.hostname === 'localhost'
    ? 'http://dashboard.local/api'
    : '/api';

async function register(username, email, password) {
    try {
        const response = await fetch(`${API_URL}/auth/register.php`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username, email, password })
        });

        const data = await response.json();

        if (response.ok) {
            showToast('Cuenta creada correctamente. Ahora inicia sesión.', 'success');
            // Cambiar a formulario de login
            document.getElementById('register-form').classList.remove('active');
            document.getElementById('login-form').classList.add('active');
        } else {
            showToast('❌ Error: ' + data.message, 'error');
        }
    } catch (error) {
        console.error('Error:', error);
        showToast('❌ Error al conectar con el servidor', 'error');
    }
}

async function login(username, password) {
    try {
        const response = await fetch(`${API_URL}/auth/login.php`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include',
            body: JSON.stringify({ username, password })
        });

        const data = await response.json();

        if (response.ok) {
            // Guardar datos del usuario en localStorage
            localStorage.setItem('user', JSON.stringify(data.user));

            // Ocultar pantalla de auth y mostrar dashboard
            document.body.classList.remove('not-authenticated');
            document.body.classList.add('authenticated');

            showToast('¡Inicio de sesión exitoso! Cargando tu dashboard...', 'success');

            // Cargar tareas del usuario
            loadTasksFromAPI();
            initDashboard();
        } else {
            showToast('❌ Error: ' + data.message, 'error');
        }
    } catch (error) {
        console.error('Error:', error);
        showToast('❌ Error al conectar con el servidor', 'error');
    }
}

// Event listeners para los formularios
document.getElementById('register').addEventListener('submit', (e) => {
    e.preventDefault();
    const username = document.getElementById('register-username').value;
    const email = document.getElementById('register-email').value;
    const password = document.getElementById('register-password').value;

    register(username, email, password);
});

document.getElementById('login').addEventListener('submit', (e) => {
    e.preventDefault();
    const username = document.getElementById('login-username').value;
    const password = document.getElementById('login-password').value;

    login(username, password);
});

// ========== API TASKS ==========
async function loadTasksFromAPI() {
    try {
        const response = await fetch(`${API_URL}/tasks/read.php`, {
            method: 'GET',
            credentials: 'include'
        });

        const data = await response.json();

        if (response.ok) {
            // Limpiar listas actuales
            document.getElementById('pending-list').innerHTML = '';
            document.getElementById('progress-list').innerHTML = '';
            document.getElementById('completed-list').innerHTML = '';

            // Vaciar array de tareas
            tasks = [];

            // Cargar tareas desde el servidor
            if (data.tasks && data.tasks.length > 0) {
                tasks = data.tasks.map(task => ({
                    ...task,
                    id: Number(task.id),
                    task_order: Number(task.task_order)
                }));

                const lists = {
                    "pending": document.getElementById("pending-list"),
                    "progress": document.getElementById("progress-list"),
                    "completed": document.getElementById("completed-list")
                };

                // Ordenar por task_order
                tasks.sort((a, b) => a.task_order - b.task_order);

                // Crear elementos DOM
                for (const task of tasks) {
                    const li = createTaskElement(task.text, task.id, task.state);
                    const targetList = lists[task.state];
                    if (targetList) targetList.appendChild(li);
                }
            }
        } else {
            console.error('Error al cargar tareas:', data.message);
        }
    } catch (error) {
        console.error('Error:', error);
    }
}

// Verificar si hay sesión activa al cargar la página
async function checkSession() {
    try {
        const response = await fetch(`${API_URL}/auth/check_session.php`, {
            method: 'GET',
            credentials: 'include'
        });

        const data = await response.json();

        if (data.authenticated) {
            // Usuario ya está logueado
            localStorage.setItem('user', JSON.stringify(data.user));
            document.body.classList.remove('not-authenticated');
            document.body.classList.add('authenticated');

            // Cargar tareas
            loadTasksFromAPI();

            // Inicializar el resto del dashboard
            initDashboard();
        } else {
            // No hay sesión, mostrar login
            document.body.classList.add('not-authenticated');
        }
    } catch (error) {
        console.error('Error checking session:', error);
        document.body.classList.add('not-authenticated');
    }
}


// ========== LOGOUT HANDLER (GLOBAL) ==========
async function handleLogout() {
    try {
        const response = await fetch(`${API_URL}/auth/logout.php`, {
            method: 'POST',
            credentials: 'include'
        });

        if (response.ok) {

            localStorage.removeItem('user');
            document.body.classList.remove('authenticated');
            document.body.classList.add('not-authenticated');

            showToast('Sesión cerrada correctamente', 'success');
        } else {
            showToast('Error al cerrar sesión', 'error');
        }

    } catch (error) {
        console.error('Error:', error);
        showToast('Error al cerrar sesión', 'error');
    }
}

function setupLogout() {
    const logoutBtn = document.getElementById('logout-btn');

    if (logoutBtn) {
        // Quitar listener anterior y añadir uno nuevo con la MISMA función
        logoutBtn.removeEventListener('click', handleLogout);
        logoutBtn.addEventListener('click', handleLogout);
    }
}

// ========== TOAST NOTIFICATIONS ==========
function showToast(message, type = 'info') {
    const container = document.getElementById('toast-container');

    const toast = document.createElement('div');
    toast.className = `toast ${type}`;

    const icon = type === 'success' ? 'fa-circle-check' :
        type === 'error' ? 'fa-circle-xmark' :
            'fa-circle-info';

    toast.innerHTML = `
        <i class="fa-solid ${icon}"></i>
        <span>${message}</span>
    `;

    container.appendChild(toast);

    // Eliminar después de 3 segundos
    setTimeout(() => {
        toast.remove();
    }, 3000);
}

// Inicializar todas las funcionalidades del dashboard
function initDashboard() {
    setupCityModal();
    getDataWeather();
    setInterval(getDataWeather, 1800000);
    clock();
    dateInfo();
    setInterval(clock, 1000);
    taskManager();
    pomodoroTimer();
    loadStats();
}

// ========== INICIALIZACIÓN ==========
setupAuthUI();
setupLogout();
checkSession();
