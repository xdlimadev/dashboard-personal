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

function addTask(taskInput, taskList) {
    if (taskInput.value.trim() === "") return;

    const task = {
        id: Date.now(),
        text: taskInput.value,
        state: "pending",
        order: 0
    };

    tasks.push(task);

    console.log("Tarea añadida:", task.id, "State: ", task.state);
    const li = createTaskElement(taskInput.value, task.id, task.state);
    taskList.appendChild(li);

    updateTaskOrder(taskList.id);

    taskInput.value = "";

}

function moveTask(completeBtn, li) {
    completeBtn.addEventListener("click", () => {

        const taskId = Number(li.dataset.id);
        const task = tasks.find(t => t.id === taskId);

        if (task) {
            if (task.state === "pending") {
                task.state = "progress";
            } else if (task.state === "progress") {
                task.state = "completed";
            }
        }

        const destinationList = document.getElementById(`${task.state}-list`);
        if (destinationList) {
            destinationList.appendChild(li);
            if (task.state === "completed") {
                completeBtn.style.display = "none";
            }
            updateTaskOrder(destinationList.id);
        }
    });
}

function deleteTask(deleteBtn, li) {
    deleteBtn.addEventListener("click", () => {

        const taskId = Number(li.dataset.id);
        tasks = tasks.filter(t => t.id !== taskId);
        localStorage.setItem("tasks", JSON.stringify(tasks));
        li.remove();
    });
}

function taskManager() {
    const taskList = document.getElementById("pending-list");
    const taskInput = document.getElementById("task-input");


    loadTasks();
    setupDragAndDrop();
    const form = document.querySelector(".col-2 form");
    form.addEventListener("submit", (e) => { e.preventDefault(); addTask(taskInput, taskList); });
}

function loadTasks() {
    const savedTasks = localStorage.getItem("tasks");
    if (savedTasks) tasks = JSON.parse(savedTasks);

    const lists = {
        "pending": document.getElementById("pending-list"),
        "progress": document.getElementById("progress-list"),
        "completed": document.getElementById("completed-list")
    };

    tasks.sort((a, b) => (a.order || 0 ) - (b.order || 0));

    // Si hay tareas guardadas, las cargamos en el array
    for (const task of tasks) {
        console.log("Cargando tarea:", task.id, "State: ", task.state);
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
        e.dataTransfer.setData("text/plain" , taskId.toString());
        li.classList.add("dragging");
        console.log("Drag started for task ID:", taskId);
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
            console.log("Drop event detected on list:", list.id);
            e.preventDefault();

            document.querySelectorAll('.drag-over-top, .drag-over-bottom').forEach(el => {
                el.classList.remove('drag-over-top', 'drag-over-bottom');
            });

            const taskId = e.dataTransfer.getData("text/plain");
            console.log("Task ID from drag data:", taskId);

            const draggable = document.querySelector(`li[data-id="${taskId}"]`);
            console.log("Draggable element found:", draggable);

            if (!draggable) {
                console.log("No draggable element found for task ID:", taskId);
                return;
            }

            const afterElement = getDragAfterElement(list, e.clientY);
            console.log("After element:", afterElement);

            if (afterElement == null) {
                list.appendChild(draggable);
                console.log("añadido al final");
            } else {
                list.insertBefore(draggable, afterElement);
                console.log("insertado antes de afterElement: ", afterElement);
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

function updateTaskState(taskId, newState) {
    const task = tasks.find(t => t.id === Number(taskId));
    if (task) {
        task.state = newState;
    }
    localStorage.setItem("tasks", JSON.stringify(tasks));

    const taskElement = document.querySelector(`li[data-id="${taskId}"]`);
    const completeBtn = taskElement.querySelector(".completed-btn");

    if (newState === "completed") {
        completeBtn.style.display = "none";
    } else {
        completeBtn.style.display = "block";
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

function updateTaskOrder(listId) {
    const list = document.getElementById(listId);
    const taskElements = [...list.querySelectorAll(".task-item")];

    taskElements.forEach((taskEl, index) => {
        const taskId = Number(taskEl.dataset.id);
        const task = tasks.find(t => t.id === taskId);

        if (task) {
            task.order = index;
        }
    });

    localStorage.setItem("tasks", JSON.stringify(tasks));
}


// ========== CLIMA ==========
let apiWeather = "https://api.el-tiempo.net/json/v3/provincias/29/municipios/29038";

async function getDataWeather() {
    try {
        const response = await fetch(apiWeather);
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

        const data = await response.json();
        updateWeatherUI(data);
    } catch (error) {
        console.error("Error al obtener los datos del clima:", error);
    }
}

function updateWeatherUI(data) {
    if (!data?.temperaturas) return console.error("Datos del clima no disponibles.");

    const weatherDay = document.querySelector(".weather-logo");
    const temperature = document.querySelector(".temperature");
    const humidityElem = document.querySelector(".humidity");

    const iconClass = categorizeState(data.stateSky.description);

    if (weatherDay) weatherDay.innerHTML = `<i class="fa-solid ${iconClass}"></i>`;
    if (temperature) temperature.textContent = `${data.temperaturas.min}°C / ${data.temperaturas.max}°C`;
    if (humidityElem) humidityElem.innerHTML = `<i class="fa-solid fa-droplet"></i> ${data.humedad}%`;
}

function categorizeState(state) {
    const s = state.toLowerCase();

    // Lógica de prioridades (de más específico a más general)
    if (s.includes("tormenta")) return "fa-bolt-lightning";
    if (s.includes("nieve") || s.includes("nevado")) return "fa-snowflake";
    if (s.includes("lluvia") || s.includes("lluvioso") || s.includes("lluvias")) return "fa-cloud-showers-heavy";
    if (s.includes("niebla") || s.includes("bruma")) return "fa-smog";

    if (s.includes("nuboso") || s.includes("cubierto") || s.includes("nubes")) {
        // Si tiene "poco" o "altas" es sol y nubes, si no, nublado total
        return (s.includes("poco") || s.includes("altas")) ? "fa-cloud-sun" : "fa-cloud";
    }

    if (s.includes("despejado") || s.includes("sol")) return "fa-sun";

    return "fa-cloud"; // Icono por defecto

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
                alert(`¡Tiempo terminado! Siguiente: ${modeDisplay.textContent}`);
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


// ========== INICIALIZACIÓN ==========
getDataWeather();
setInterval(getDataWeather, 1800000);
clock();
dateInfo();
setInterval(clock, 1000);
taskManager();
pomodoroTimer();