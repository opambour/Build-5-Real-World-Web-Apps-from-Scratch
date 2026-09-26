// 1. Select DOM Elements
const form = document.querySelector('#todo-form');
const input = document.querySelector('#todo-input');
const todoList = document.querySelector('#todo-list');

// 2. Initialize Tasks from localStorage (or fallback to an empty array)
let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

// Render initial tasks on page load
renderTasks();

// 3. Handle Form Submission (Adding Tasks)
form.addEventListener('submit', (e) => {
  e.preventDefault(); // Prevent page reload
  
  const taskText = input.value.trim();
  if (taskText === '') return; // Do nothing if input is empty

  // Create a new task object with a unique timestamp ID
  const newTask = {
    id: Date.now(),
    text: taskText,
    completed: false
  };

  tasks.push(newTask);
  saveAndRender();
  
  input.value = ''; // Clear input field
});

// 4. Render Tasks to the DOM
function renderTasks() {
  todoList.innerHTML = ''; // Clear current list before redrawing

  tasks.forEach(task => {
    const li = document.createElement('li');
    li.className = `todo-item ${task.completed ? 'completed' : ''}`;
    
    li.innerHTML = `
      <span onclick="toggleTask(${task.id})">${task.text}</span>
      <button class="delete-btn" onclick="deleteTask(${task.id})">🗑️</button>
    `;
    
    todoList.appendChild(li);
  });
}

// 5. Toggle Task Completion State
function toggleTask(id) {
  tasks = tasks.map(task => 
    task.id === id ? { ...task, completed: !task.completed } : task
  );
  saveAndRender();
}

// 6. Delete a Task
function deleteTask(id) {
  tasks = tasks.filter(task => task.id !== id);
  saveAndRender();
}

// 7. Save to localStorage and Trigger Re-render
function saveAndRender() {
  localStorage.setItem('tasks', JSON.stringify(tasks));
  renderTasks();
}