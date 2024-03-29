const task = document.querySelector('.task');
const add = document.querySelector('.add')
const toDos = document.querySelector('.todos')
const counter = document.querySelector('.count-tasks')
const counterCompletedTasks = document.querySelector('.completed-tasks')
let search = document.getElementById("search");
let tasks = [];
let remove = false;
let isSearching = false;
displayTasks();
if (localStorage.getItem("alldata") != null) {
    tasks = JSON.parse(localStorage.getItem("alldata"));
    count = tasks.length;
    displayTasks();
}
/*********************/
add.addEventListener('click', handleAddition);
search.addEventListener('keyup', displayTasks)
document.getElementById('confirmDeleting').addEventListener('click', () => {
    remove = true;
    toggleConfirm();
    removeComfirm();
})
document.getElementById('cancelDeleting').addEventListener('click', toggleConfirm)
/*********************/
function setTaskCounter() {
    counter.innerHTML = `Tasks ${tasks.length}`
    setCompletedTaskNo();
    counterCompletedTasks.innerHTML = `Completed Tasks ${countCompleted}`
}
function toggleConfirm() {
    document.getElementById('overlay').classList.toggle('display');
}
function displayTasks() {
    let searchValue = search.value;
    setTaskCounter()
    let result = '';

    search.value ? tasks.map((task) => {
        if (task.toDo.toLowerCase().includes(searchValue.toLowerCase())) {
            setTaskCounter()
            let c = task.isCompleted ? 'complete' : '';
            result += `
    <li>
    <p class='${c}'>${task.toDo} </p>
    <button  id=${task.id} class="complete"><i class="far fa-check-circle"></i></button> 
    <button id=${task.id} class="delete" onclick=""><i class="fas fa-trash-alt"></i></button>
</li>`
        }
    }) : tasks.map((task) => {
        let c = task.isCompleted ? 'complete' : '';
        result += `
    <li>
    <p class='${c}'>${task.toDo} </p>
    <button  id=${task.id} class="complete"><i class="far fa-check-circle"></i></button> 
    <button id=${task.id} class="delete" onclick=""><i class="fas fa-trash-alt"></i></button>
</li>`});
    toDos.innerHTML = result;
}
function handleAddition(e) {
    e.preventDefault();
    let toDo = task.value;
    if (toDo) {
        tasks.push({ id: crypto.randomUUID(), toDo, isCompleted: false });
        saveNewData()
    }
    clearInput();
    displayTasks()
}
function setCompletedTaskNo() {
    countCompleted = 0;
    tasks.map(task => {
        if (task.isCompleted === true)
            countCompleted++
    })
}
let id = '';
toDos.onclick = function (event) {
    id = String(event.target.parentElement.id);
    if (event.target.classList[1].includes('check')) {
        tasks.find(item => {
            if (item.id === id) {
                item.isCompleted = !item.isCompleted;
            }
        })
    }
    else if (event.target.classList[1].includes('trash')) {
        toggleConfirm();
    }
    saveNewData()
    displayTasks();
}
function removeComfirm() {
    if (remove) tasks = tasks.filter(item => item.id !== id)
    saveNewData()
    displayTasks();
}

function clearInput() {
    task.value = "";
}
function saveNewData() {
    localStorage.setItem("alldata", JSON.stringify(tasks));
}