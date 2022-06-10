const newTask =document.querySelector(".todo-input");
const addbtn = document.querySelector(".add-btn");
const todoList = document.querySelector(".todo-container")
const filterOption = document.querySelector(".filter-todos")
addbtn.addEventListener("click",addTodo)
filterOption.addEventListener("click",filter)
todoList.addEventListener('click',checkremove)
document.addEventListener('DOMContentLoaded',getLocalTodos)
function addTodo(e){
    e.preventDefault();
    const newDiv =document.createElement('div');
    newDiv.classList.add("todo");
    const newTodo=`<li>${newTask.value}</li>
    <span>
    <i class="fa-solid fa-circle-check"></i>
</span>
  
    <span><i class="fa-solid fa-trash-can"></i></span>` 
    newDiv.innerHTML = newTodo;
    todoList.appendChild(newDiv);
    saveLocalTodos(newTask.value)
    newTask.value=''

}

function checkremove(e){
    const classList = {...e.target.classList};
    const item = e.target.parentElement.parentElement
    if(classList[1]=== "fa-circle-check")
    {
        item.classList.toggle("completed");

    }
    else if(classList[1]=== "fa-trash-can"){
        removeLocalTodos(item)
        item.remove();
   }
    else {
    console.log("nothing")}
    

}
function filter(e){
    const todos = [...todoList.childNodes]
    todos.forEach((todo)=>{
        switch(e.target.value){
            case "0":todo.style.display ="flex";
            break;
            case "1":
                if(todo.classList.contains("completed"))todo.style.display = "flex"
                else
                todo.style.display = "none";
            
            break;
            case "2":
                if(todo.classList.contains("completed"))todo.style.display = "none"
                else
                todo.style.display = "flex";
            break

        }
    })
}


function saveLocalTodos(todo){
    let savedTodos = localStorage.getItem('todos') ?
    JSON.parse(localStorage.getItem('todos')):[];
    savedTodos.push(todo);
    localStorage.setItem("todos",JSON.stringify(savedTodos))
}

function getLocalTodos(){
    let savedTodos = localStorage.getItem('todos') ?
    JSON.parse(localStorage.getItem('todos')):[];
    savedTodos.forEach((todo)=>{
        const newDiv =document.createElement('div');
        newDiv.classList.add("todo");
        const newTodo=`<li>${todo}</li>
        <span>
        <i class="fa-solid fa-circle-check"></i>
    </span>
      
        <span><i class="fa-solid fa-trash-can"></i></span>` 
        newDiv.innerHTML = newTodo;
        todoList.appendChild(newDiv);

    })
}
function removeLocalTodos(todo){
    console.log(todo.children[0].innerText)
    let savedTodos = localStorage.getItem('todos') ?
    JSON.parse(localStorage.getItem('todos')):[];
    const filteredTodos =savedTodos.filter((t)=> t !== todo.children[0].innerText)
    localStorage.setItem("todos",JSON.stringify(filteredTodos))
}