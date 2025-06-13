
// Run after DOM is fully loaded
document.addEventListener('DOMContentLoaded', () => {
    // Select DOM elements
    const addButton = document.getElementById('add-task-btn');
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');

    // Load tasks from localStorage
    loadTasks();

    // Function to add a new task
    function addTask() {
        const taskText = taskInput.value.trim();

        if (taskText === '') {
            alert('Please enter a task.');
            return;
        }

        // Create <li> element and text node
        const li = document.createElement('li');
        const taskTextNode = document.createTextNode(taskText);
        li.appendChild(taskTextNode);

        // Create remove button
        const removeBtn = document.createElement('button');
        removeBtn.textContent = 'Remove';
        removeBtn.className = 'remove-btn';

        // Remove task on click
        removeBtn.onclick = () => {
            taskList.removeChild(li);
            saveTasks();
        };

        // Append remove button to li and li to task list
        li.appendChild(removeBtn);
        taskList.appendChild(li);

        // Clear input
        taskInput.value = '';

        // Save to localStorage
        saveTasks();
    }

    // Add task on button click
    addButton.addEventListener('click', addTask);

    // Add task on Enter key press
    taskInput.addEventListener('keypress', (event) => {
        if (event.key === 'Enter') {
            addTask();
        }
    });

    // Save tasks to localStorage
    function saveTasks() {
        const tasks = [];
        const items = taskList.querySelectorAll('li');
        items.forEach(item => {
            // firstChild is text node containing task text
            tasks.push(item.firstChild.textContent);
        });
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    // Load tasks from localStorage
    function loadTasks() {
        const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        tasks.forEach(taskText => {
            const li = document.createElement('li');
            const taskTextNode = document.createTextNode(taskText);
            li.appendChild(taskTextNode);

            const removeBtn = document.createElement('button');
            removeBtn.textContent = 'Remove';
            removeBtn.className = 'remove-btn';

            removeBtn.onclick = () => {
                taskList.removeChild(li);
                saveTasks();
            };

            li.appendChild(removeBtn);
            taskList.appendChild(li);
        });
    }
});
