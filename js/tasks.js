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

// API
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