// Elements
const taskInput = document.getElementById('taskInput');
const addTaskBtn = document.getElementById('addTaskBtn');
const taskList = document.getElementById('taskList');
const allTasksBtn = document.getElementById('allTasks');
const completedTasksBtn = document.getElementById('completedTasks');
const pendingTasksBtn = document.getElementById('pendingTasks');

// Local Storage: Load tasks
document.addEventListener('DOMContentLoaded', loadTasks);

// Add a new task
addTaskBtn.addEventListener('click', addTask);

// Filter tasks
allTasksBtn.addEventListener('click', showAllTasks);
completedTasksBtn.addEventListener('click', showCompletedTasks);
pendingTasksBtn.addEventListener('click', showPendingTasks);

// Add Task Function
function addTask() {
    const taskText = taskInput.value.trim();
    if (taskText === '') return alert('Please enter a task');
    
    const task = {
        text: taskText,
        completed: false
    };

    addTaskToDOM(task);
    saveTaskToLocalStorage(task);
    taskInput.value = '';
}

// Add Task to DOM
function addTaskToDOM(task) {
    const li = document.createElement('li');
    li.innerHTML = `
        <span class="${task.completed ? 'completed' : ''}">${task.text}</span>
        <div>
            <button class="completeBtn">${task.completed ? 'Undo' : 'Complete'}</button>
            <button class="deleteBtn">Delete</button>
        </div>
    `;
    
    // Event Listeners for Complete and Delete buttons
    li.querySelector('.completeBtn').addEventListener('click', () => toggleCompleteTask(task.text));
    li.querySelector('.deleteBtn').addEventListener('click', () => deleteTask(task.text));
    
    taskList.appendChild(li);
}

// Toggle Complete Task
function toggleCompleteTask(taskText) {
    let tasks = getTasksFromLocalStorage();
    tasks = tasks.map(task => {
        if (task.text === taskText) {
            task.completed = !task.completed;
        }
        return task;
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
    refreshTaskList();
}

// Delete Task
function deleteTask(taskText) {
    let tasks = getTasksFromLocalStorage();
    tasks = tasks.filter(task => task.text !== taskText);
    localStorage.setItem('tasks', JSON.stringify(tasks));
    refreshTaskList();
}

// Save Task to Local Storage
function saveTaskToLocalStorage(task) {
    let tasks = getTasksFromLocalStorage();
    tasks.push(task);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Get Tasks from Local Storage
function getTasksFromLocalStorage() {
    const tasks = localStorage.getItem('tasks');
    return tasks ? JSON.parse(tasks) : [];
}

// Load Tasks from Local Storage
function loadTasks() {
    const tasks = getTasksFromLocalStorage();
    tasks.forEach(task => addTaskToDOM(task));
}

// Refresh Task List
function refreshTaskList() {
    taskList.innerHTML = '';
    loadTasks();
}

// Filter: Show All Tasks
function showAllTasks() {
    taskList.innerHTML = '';
    const tasks = getTasksFromLocalStorage();
    tasks.forEach(task => addTaskToDOM(task));
}

// Filter: Show Completed Tasks
function showCompletedTasks() {
    taskList.innerHTML = '';
    const tasks = getTasksFromLocalStorage();
    tasks.filter(task => task.completed).forEach(task => addTaskToDOM(task));
}

// Filter: Show Pending Tasks
function showPendingTasks() {
    taskList.innerHTML = '';
    const tasks = getTasksFromLocalStorage();
    tasks.filter(task => !task.completed).forEach(task => addTaskToDOM(task));
}
