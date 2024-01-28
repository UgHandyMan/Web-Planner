// Load tasks from local storage on page load
window.onload = function () {
    const storedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
    for (const task of storedTasks) {
        addTaskToDOM(task);
    }
};

function addTask() {
    const dateInput = document.getElementById('dateInput');
    const taskInput = document.getElementById('taskInput');

    if (dateInput.value && taskInput.value.trim() !== '') {
        const task = {
            date: dateInput.value,
            task: taskInput.value,
            completed: false,
        };

        // Save task to local storage
        const storedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
        storedTasks.push(task);
        localStorage.setItem('tasks', JSON.stringify(storedTasks));

        addTaskToDOM(task);

        dateInput.value = '';
        taskInput.value = '';
    }
}

function addTaskToDOM(task) {
    const taskList = document.getElementById('taskList');
    const taskItem = document.createElement('div');
    taskItem.className = 'task-item';
    taskItem.innerHTML = `
        <div>
            <strong>${task.date}</strong>: ${task.task}
        </div>
        <div class="checkbox-container">
            <input type="checkbox" id="completedCheckbox" ${task.completed ? 'checked' : ''} onchange="updateCompletionStatus(this)">
            <label class="checkbox-label" for="completedCheckbox">Completed</label>
        </div>
    `;
    taskList.appendChild(taskItem);
}

function updateCompletionStatus(checkbox) {
    const taskItem = checkbox.parentNode.parentNode;
    const storedTasks = JSON.parse(localStorage.getItem('tasks')) || [];

    // Find the task in the stored tasks array
    const taskIndex = Array.from(taskItem.parentNode.children).indexOf(taskItem);
    storedTasks[taskIndex].completed = checkbox.checked;

    // Update local storage
    localStorage.setItem('tasks', JSON.stringify(storedTasks));

    taskItem.style.backgroundColor = checkbox.checked ? '#b2dfdb' : '#e0f7fa';
}

function addTaskToDOM(task) {
    const taskList = document.getElementById('taskList');
    const taskItem = document.createElement('div');
    taskItem.className = 'task-item';
    taskItem.innerHTML = `
        <div>
            <strong>${task.date}</strong>: ${task.task}
        </div>
        <div class="edit-delete-container">
            <input type="checkbox" id="completedCheckbox" ${task.completed ? 'checked' : ''} onchange="updateCompletionStatus(this)">
            <label class="checkbox-label" for="completedCheckbox">Completed</label>
            <button class="edit-delete-button" onclick="editTask(${task.id})">Edit</button>
            <button class="edit-delete-button" onclick="deleteTask(${task.id})">Delete</button>
        </div>
    `;
    taskList.appendChild(taskItem);
}

let taskIdCounter = 0; // Counter to generate unique task IDs

function editTask(id) {
    const taskList = document.getElementById('taskList');
    const storedTasks = JSON.parse(localStorage.getItem('tasks')) || [];

    // Find the task in the stored tasks array
    const taskIndex = storedTasks.findIndex(task => task.id === id);

    if (taskIndex !== -1) {
        const editedTask = prompt('Edit Task:', storedTasks[taskIndex].task);

        if (editedTask !== null) {
            storedTasks[taskIndex].task = editedTask;

            // Update local storage
            localStorage.setItem('tasks', JSON.stringify(storedTasks));

            // Update the task in the DOM
            const taskItem = taskList.children[taskIndex];
            taskItem.querySelector('div').innerHTML = `<strong>${storedTasks[taskIndex].date}</strong>: ${editedTask}`;
        }
    }
}

function deleteTask(id) {
    const taskList = document.getElementById('taskList');
    const storedTasks = JSON.parse(localStorage.getItem('tasks')) || [];

    // Find the task in the stored tasks array
    const taskIndex = storedTasks.findIndex(task => task.id === id);

    if (taskIndex !== -1) {
        // Remove the task from the stored tasks array
        storedTasks.splice(taskIndex, 1);

        // Update local storage
        localStorage.setItem('tasks', JSON.stringify(storedTasks));

        // Remove the task from the DOM
        taskList.removeChild(taskList.children[taskIndex]);
    }
}

function addTask() {
    const dateInput = document.getElementById('dateInput');
    const taskInput = document.getElementById('taskInput');

    if (dateInput.value && taskInput.value.trim() !== '') {
        const task = {
            id: ++taskIdCounter,
            date: dateInput.value,
            task: taskInput.value,
            completed: false,
        };

        // Save task to local storage
        const storedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
        storedTasks.push(task);
        localStorage.setItem('tasks', JSON.stringify(storedTasks));

        addTaskToDOM(task);

        dateInput.value = '';
        taskInput.value = '';
    }
}