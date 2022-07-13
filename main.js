window.addEventListener('load', () => {
    todos = JSON.parse(localStorage.getItem('todos')) || [];
    const form = document.querySelector("#new-task-form");
    const input = document.querySelector("#new-task-input");
    const listElement = document.querySelector("#tasks");
    const username = localStorage.getItem('username') || []


    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const todoList = {
            content: e.target.elements.content.value,
            done: false,
            createdAt: new Date().getTime()
        }

        todos.push(todoList);

        localStorage.setItem('todoList', JSON.stringify(todoList));

        showItem()
        function showItem(){
            if(todos === null){
                taskList = []
            } else {
                taskList = todos;
            }
        }
       
        const task = input.value;

        if(!task){
            alert("Please add a value for the list")
            return;
        } else{
            alert("Task added successfully")
        }
        const taskElement = document.createElement("div");
        taskElement.classList.add("task");

        const taskContentElement = document.createElement("div");
        taskContentElement.classList.add("content");

        taskElement.appendChild(taskContentElement);

        const taskInputElement = document.createElement("input");
        taskInputElement.classList.add("text");
        taskInputElement.type = "text";
        taskInputElement.value = task;
        taskInputElement.setAttribute("readonly", "readonly");

        taskContentElement.appendChild(taskInputElement);

        const taskActionsElement = document.createElement("div");
        taskActionsElement.classList.add("actions");
        
        const taskEditElement = document.createElement("button");
        taskEditElement.classList.add("edit");
        taskEditElement.innerHTML = "Edit";

        const taskDeleteElement = document.createElement("button");
        taskDeleteElement.classList.add("delete");
        taskDeleteElement.innerHTML = "Delete";
        
        taskActionsElement.appendChild(taskEditElement);
        taskActionsElement.appendChild(taskDeleteElement);

        taskElement.appendChild(taskActionsElement);


        listElement.appendChild(taskElement);
        input.value = "";

        taskEditElement.addEventListener('click', () =>{
            if(taskEditElement.innerText.toLowerCase() == "edit"){
            taskInputElement.removeAttribute("readonly");
            taskInputElement.focus();
            taskEditElement.innerText = "Save";
            } else{
                taskInputElement.setAttribute("readonly", "readonly");
                localStorage.setItem('todos', JSON.stringify(todos));
                taskEditElement.innerText = "Edit";
                showItem()
            }
        });
        taskDeleteElement.addEventListener('click', () =>{
            if(confirm("Are you sure you want to delete this task?")){
                listElement.removeChild(taskElement);
                localStorage.setItem('todos', JSON.stringify(todos));
                showItem()
            }
        })
    })
})