const toDoInput = document.querySelector('#todo-input');
const addButton = document.querySelector('#add-todo-btn');
const todoList = document.querySelector('#todo-list');


const taskList = []

function renderTasks(todoText) {
    const li = document.createElement('li');
    li.className = 'list';
    todoList.innerHTML += `  
                <li class="list" id="${taskList.length}">
                    <input type="checkbox" class="check-todo">
                    <span>${taskList[taskList.length - 1]}</span>
                    <button class="edit-todo"><i class="fas fa-edit"></i></button>
                    <button class="delete-todo"><i class="fas fa-trash"></i></button>
                </li>`;
    const deleteButton = document.querySelectorAll('.delete-todo');
    const editButton = document.querySelectorAll('.edit-todo');
    const checkBox = document.querySelectorAll('.check-todo');
    editTask(editButton)
    deleteButton.forEach((del, i) => {
        del.addEventListener('click', function (e) {
            if (e.target.classList.includes = 'fa-trash') {
                e.target.parentElement.parentElement.remove();
            }
            else {
                e.target.parentElement.remove();
            }
            const index = taskList.indexOf(todoText);
            if (index > -1) {
                taskList.splice(index, 1);
            }
        })
    })
}

function editTask(editButton) {
    editButton.forEach((ed) => {
        ed.addEventListener('click', function (e) {
            const index = parseInt(e.target.parentElement.parentElement.id);
            console.log(index);
            if (e.target.classList.include = 'fa-edit') {
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
                taskList[index - 1] = toDoInput.value.trim();
                toDoInput.parentElement.remove();
                renderTasks()
                // todoList.childNodes[(index - 1) + 1].innerHTML = `  
                // <input type="checkbox" class="check-todo">
                // <span>${taskList[taskList.length - 1]}</span>
                // <button class="edit-todo"><i class="fas fa-edit"></i></button>
                // <button class="delete-todo"><i class="fas fa-trash"></i></button>
                // `;
            })
        })
    })
}

addButton.addEventListener('click', function () {
    const todoText = toDoInput.value.trim();
    if (todoText !== '') {
        taskList.push(todoText);
        renderTasks(todoText);
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