const toDoForm = document.querySelector(".js-toDoForm"),
    toDoInput= toDoForm.querySelector("input"),
    toDoList = document.querySelector(".js-toDoList");

const TODO_LS= "toDos";

function loadToDos(){
    const toDos = localStorage.getItem(TODO_LS);
    if(toDos !==null){

    }

}

function paintToDo(text){
    const li = document.createElement("li");
    const delBtn = document.createElement("button");
    delBtn.innerText="❌";
    const span = document.createElement("span");
    span.innerText= text;
    li.appendChild(delBtn);
    li.appendChild(span);
    toDoList.appendChild(li);
    
}

function handleSubmit(event){
    event.preventDefault();
    const currentValue = toDoInput.value;
    paintToDo(currentValue);

}

function init(){
    loadToDos();
    toDoForm.addEventListener("submit",handleSubmit);
}

init();