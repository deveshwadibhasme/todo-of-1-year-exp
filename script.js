const toDoInput = document.querySelector('#todo-input');
const addButton = document.querySelector('#add-todo-btn');
const todoList = document.querySelector('#todo-list');


const taskList = [];

if (localStorage.getItem('taskList')) {
    const storedTasks = JSON.parse(localStorage.getItem('taskList'));
    storedTasks.forEach(task => {
        taskList.push({ text: task.text, completed: task.completed || false });
        renderTasks();
    });
}

function renderTasks() {
    const li = document.createElement('li');
    li.className = 'list';
    todoList.innerHTML += `  
                <li class="list ${taskList[taskList.length - 1].completed && 'checked'}" id="${taskList.length}">
                    <input type="checkbox" class="check-todo">
                    <span>${taskList[taskList.length - 1].text}</span>
                    <button class="edit-todo"><i class="fas fa-edit"></i></button>
                    <button class="delete-todo"><i class="fas fa-trash"></i></button>
                </li>`;
    const deleteButton = document.querySelectorAll('.delete-todo');
    const editButton = document.querySelectorAll('.edit-todo');
    const checkBox = document.querySelectorAll('.check-todo');
    checkTask(checkBox);
    deleteTask(deleteButton);
    editTask(editButton);
}

function checkTask(checkBox) {
    checkBox.forEach((check, i) => {
        check.addEventListener('click', function (e) {
            const index = parseInt(e.target.parentElement.id);
            if (e.target.checked) {
                e.target.parentElement.classList.add('checked');
                taskList[index - 1].completed = true;
                localStorage.setItem('taskList', JSON.stringify(taskList));

            } else {
                e.target.parentElement.classList.remove('checked');
                taskList[index - 1].completed = false;
                localStorage.setItem('taskList', JSON.stringify(taskList));
            }
        })
    })
}

function deleteTask(deleteButton) {
    deleteButton.forEach((del, i) => {
        del.addEventListener('click', function (e) {
            e.stopPropagation();
            if (e.target.classList.includes = 'fa-trash') {
                e.target.parentElement.parentElement.remove();
                const index = parseInt(e.target.parentElement.parentElement.id);
                console.log(index);
                if (index) {
                    taskList.splice((index - 1), 1);
                    localStorage.setItem('taskList', JSON.stringify(taskList));
                    if (taskList.length === 1) {
                        localStorage.clear()
                    }
                }
            }
            else {
                e.target.parentElement.parentElement.remove();
                localStorage.setItem('taskList', JSON.stringify(taskList));
            }
        })

    })
}

function editTask(editButton) {
    editButton.forEach((ed) => {
        ed.addEventListener('click', function (e) {
            const index = parseInt(e.target.parentElement.parentElement.id);
            console.log(index);
            if (e.target.classList.contains('fa-edit') && !taskList[index - 1].completed) {
                e.target.parentElement.parentElement.innerHTML = `
                    <input type="text" id="todo-input-edited" placeholder="Add a Edited task...">
                    <button id="edited-add-btn"><i class="fas fa-plus"></i>Add</button>
                    `
            }
            else {
                return 0
            }
            const editedAddButton = document.querySelector('#edited-add-btn');
            const toDoInput = document.querySelector('#todo-input-edited');
            editedAddButton.addEventListener('click', () => {
                taskList[index - 1].text = toDoInput.value.trim();
                toDoInput.parentElement.remove();
                renderTasks()
                localStorage.setItem('taskList', JSON.stringify(taskList));
            })
        })
    })
}

addButton.addEventListener('click', function () {
    const todoText = toDoInput.value.trim();
    if (todoText !== '') {
        taskList.push({ text: todoText, completed: false });
        renderTasks(todoText);
        localStorage.setItem('taskList', JSON.stringify(taskList));
        toDoInput.value = '';

    } else {
        alert('Please enter a task.');
    }
});
toDoInput.addEventListener('keypress', function (event) {
    if (event.key === 'Enter') {
        addButton.click();
    }
});