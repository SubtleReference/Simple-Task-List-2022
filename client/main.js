
window.addEventListener('load', () => {
    let todoList = JSON.parse(localStorage.getItem('todoList')) || [];
   // todos = JSON.parse(localStorage.getItem('todos')) || [];
    const form = document.querySelector("#new-task-form");
    const input = document.querySelector("#new-task-input");
    const listElement = document.querySelector("#tasks");
    const nameText = document.querySelector('#name');
    const username = localStorage.getItem('username') || []

    nameText.value = username;
    nameText.addEventListener('change', (e) => {
        localStorage.setItem('username', e.target.value);
    })
    
    loadItems();
    renderList();
    

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const task = input.value;
       let todo = {Items: task,
            createdOn: new Date().getTime()}

        

        if(!task){
            alert("Please add a value for the list")
            return;
        } else{
            saveItems();
          
            alert("Task added successfully")
        }
        
        renderRow(task);
        todoList.push(todo);
        saveItems();
        
        
      
    })
    
    function saveItems(){
        let makeString = JSON.stringify(todoList);
        localStorage.setItem("todoList", makeString);
    }
    function loadItems(){
       let parsedData = localStorage.getItem("todoList")
        todoList = JSON.parse(parsedData);
        console.log("todoList type is: " + typeof todoList)
        if(todoList == null){
            todoList = [];
        } 
    }
    function renderList(){
        for(let i =0; i < todoList.length; i++){
            let todoLElement = todoList[i];
            renderRow(todoLElement,null);
        }
    }
    function renderRow(todoLElement){
        task = input.value;
        const taskElement = document.createElement('div');
        taskElement.classList.add('task');

        const taskContentElement = document.createElement('div');
        taskContentElement.classList.add('content');
        
        
        

        taskElement.appendChild(taskContentElement);

        
        const taskInputElement = document.createElement('input');
        taskInputElement.type = "text";
        
        taskInputElement.value = task;
        taskInputElement.setAttribute("readonly", "readonly");
        if(task == ""){
            taskInputElement.value = todoLElement.Items;
        }

        taskContentElement.appendChild(taskInputElement);

        
        const taskActionsElement = document.createElement("div");
        taskActionsElement.classList.add('actions');
        

        const taskEditElement = document.createElement('button');
        taskEditElement.classList.add('edit');
        taskEditElement.innerHTML = 'Edit';

        const taskDeleteElement = document.createElement("button");
        taskDeleteElement.classList.add('delete');
        taskDeleteElement.innerHTML = 'Delete'

        taskActionsElement.appendChild(taskEditElement);
        taskActionsElement.appendChild(taskDeleteElement);

        taskElement.appendChild(taskActionsElement);


        listElement.appendChild(taskElement);
        input.value = "";

        taskEditElement.addEventListener('click', (Items) =>{
            if(taskEditElement.innerText.toLowerCase() == "edit"){
            taskInputElement.removeAttribute("readonly");
            taskInputElement.focus();
            taskEditElement.innerText = "Save";
            } else{
                taskInputElement.setAttribute("readonly", true);
               

               let index = todoList.findIndex(item => item.Items === Items)
              
              let spliceEdit ={Items: `${taskInputElement.value}`,
                createdOn: new Date().getTime()} 
              todoList.splice(index, 1, spliceEdit);
               saveItems();
                taskEditElement.innerText = "Edit";
                
                
            }
        });
        taskDeleteElement.addEventListener('click', (Items) =>{
            if(confirm("Are you sure you want to delete this task?")){
                listElement.removeChild(taskElement);
                let index = todoList.findIndex(item => item.Items === Items)
                todoList.splice(index, 1);
                saveItems(todoList);
                
                
            }
    })

    }
})
    
    

