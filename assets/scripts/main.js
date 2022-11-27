const task=document.querySelector('.task');
const add=document.querySelector('.add')
const toDos=document.querySelector('.todos')
const counter=document.querySelector('.count-tasks')
let search=document.getElementById("search");
let count =0;
let tasks=[];
let remove=false;
displayTasks();
if(localStorage.getItem("alldata")!=null){
    tasks = JSON.parse(localStorage.getItem("alldata"));
    count=tasks.length;
    setTaskCounter()
    
    displayTasks();
}else {
tasks =[];

}
/*********************/
add.addEventListener('click',handleAddition);
search.addEventListener('keyup',searchTasks)
document.getElementById('confirmDeleting').addEventListener('click',()=>{
    remove=true;
    deleteInput();
})
document.getElementById('cancelDeleting').addEventListener('click',toggleConfirm)
/*********************/
function handleAddition(e){
    e.preventDefault();
    let toDo=task.value;
    if(toDo){
        count++;
        setTaskCounter();
        tasks.push({id:count,toDo});
        localStorage.setItem("alldata",JSON.stringify(tasks));
    }
    clearInput();
    displayTasks()
}
function handleCompletion(){
    toDos.onclick = function(event) {  
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
function toggleConfirm(){
        document.getElementById('overlay').classList.toggle('display');
}
function displayTasks(){
    let result='';
    tasks.map((task,i)=> result+=`
    <li>
    <p>${task.toDo} </p>
    <button onclick="handleCompletion()" class="complete"><i class="far fa-check-circle"></i></button> <button
            class="delete" onclick="deleteInput(${i})"><i class="fas fa-trash-alt"></i></button>
</li>`);
toDos.innerHTML=result;
}
function deleteInput(id){
    toggleConfirm();
    if(remove){
    search.value=''
    tasks.splice(id,1);
    localStorage.setItem("alldata",JSON.stringify(tasks));
    displayTasks();
    count--;
    setTaskCounter()
    }
    remove=false
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
    toDos.innerHTML=result;
}
