const toDoForm = document.querySelector(".js-toDoForm"),
    toDoInput= toDoForm.querySelector("input"),
    toDoList = document.querySelector(".js-toDoList");

const TODO_LS= "toDos";

let toDos =[];
let idNumbers =1;

function saveToDos(){
    localStorage.setItem(TODO_LS,JSON.stringify(toDos));
}

function loadToDos(){
    const loadedToDos = localStorage.getItem(TODO_LS);
    if(loadedToDos !==null){
       const parseToDos = JSON.parse(loadedToDos);
       parseToDos.forEach(function(todo){
           paintToDo(todo.text);
       });
    }

}

function deleteToDo(event){
    const btn = event.target
    const li = btn.parentNode;
    toDoList.removeChild(li);
    const cleanToDos = toDos.filter(function(todo){
        console.log(todo,li);
        return todo.id !== parseInt(li.id);
       
    });
    toDos=cleanToDos;
    saveToDos();
    
}

function paintToDo(text){
    const li = document.createElement("li");
    const delBtn = document.createElement("button");
    delBtn.innerText="❌";
    delBtn.addEventListener("click", deleteToDo);
    const span = document.createElement("span");
    const newId = idNumbers
    idNumbers +=1;
    console.log(newId);
    span.innerText= text;
    li.appendChild(delBtn);
    li.appendChild(span);
    li.id=newId;
    toDoList.appendChild(li);
    const toDoObj ={
        text:text,
        id:newId
    };
    toDos.push(toDoObj);
    saveToDos();
}

function handleSubmit(event){
    event.preventDefault();
    const currentValue = toDoInput.value;
    paintToDo(currentValue);
    toDoInput.value ="";

}

function init(){
    loadToDos();
    toDoForm.addEventListener("submit",handleSubmit);
}

init();