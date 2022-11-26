const task=document.querySelector('.task');
let tasks=[
];
const add=document.querySelector('.add')
const todos=document.querySelector('.todos')

const counter=document.querySelector('.count-tasks')
let search=document.getElementById("search");
let count =0;
displayTasks();


add.addEventListener('click',handleAddition);
search.addEventListener('keyup',searchTasks)


function handleAddition(e){
    e.preventDefault();
    let toDo=task.value;
    if(toDo){
        count++;
        setTaskCounter();
        tasks.push({id:count,toDo});
        
        
    }
   else alert('PLEASE ENTER TASK TO ADD!');
    clearInput();
    console.log(tasks)
    displayTasks()
}
function handleCompletion(){
    todos.onclick = function(event) {  
        let btn;
        btn = event.target.closest('.complete');
        if(btn){            
            btn.parentElement.firstElementChild.classList.toggle('complete');
        }

    }
    
}
function setTaskCounter(){
    counter.innerHTML=`You have ${count} pending tasks.`
}
function displayTasks(){
    let result='';
    tasks.map((task,i)=> result+=`
    <li>
    <p>${task.toDo} </p>
    <button onclick="handleCompletion()" class="complete"><i class="far fa-check-circle"></i></button> <button
            class="delete" onclick="deleteInput(${i})"><i class="fas fa-trash-alt"></i></button>
</li>`);
todos.innerHTML=result;
}
function deleteInput(id){
    if(confirm('Are you sure delete this task?')){
    tasks.splice(id,1);
    displayTasks();
    count--;
    setTaskCounter()
    }
    }
function clearInput(){
    task.value="";
}
function searchTasks(){
    let searchValue=search.value;
    let result=``;
    tasks.map((task,i)=>{
        if(task.toDo.toLowerCase().includes(searchValue.toLowerCase())){
            result+=`
            <li>
            <p>${task.toDo} </p>
            <button onclick="handleCompletion()" class="complete"><i class="far fa-check-circle"></i></button> <button
                    class="delete"  onclick="deleteInput(${i})"><i class="fas fa-trash-alt"></i></button>
        </li>`
    }});
    todos.innerHTML=result;
}