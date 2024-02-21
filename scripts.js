const inputElement = document.querySelector(".new-task-input");
const addTaskButton = document.querySelector(".new-task-button");
const taskContainer = document.querySelector(".tasks-container");

const validateInput = () => inputElement.value.trim().length > 0

inputElement.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
        handleAddTask();
    }
});

const handleAddTask = () =>{
    const inputIsValid = validateInput();

    if(!inputIsValid){
        return inputElement.classList.add("error");
    }

    handleAddTaskFunction(inputElement.value, false, null);

    inputElement.value = "";

    updateLocalStorage();
};

const handleClick = (taskContent) => {
    const tasks = taskContainer.childNodes;

    for(const task of tasks){
        if(task.firstChild && task.firstChild.isSameNode(taskContent)){
       
            task.firstChild.classList.toggle("completed");
        }
    }

    updateLocalStorage();
}

const handleDeleteClick = (taskItemContainer, taskContent) => {
    const tasks = taskContainer.childNodes;

    for(const task of tasks){
        if(task.firstChild && task.firstChild.isSameNode(taskContent)){

            taskItemContainer.remove();
        }
    }
    
    updateLocalStorage();
}

const handleInputChange = () =>{
    const inputIsValid = validateInput();

    if(inputIsValid){
        return inputElement.classList.remove("error");
    }
}

const updateLocalStorage = () => {
    const tasks = taskContainer.children;

    const localStorageTasks = [...tasks].map((task) => {
        const content = task.firstChild;
        const isCompleted = content.classList.contains('completed');

        return { description: content.innerText, isCompleted };
    });

    localStorage.setItem("tasks", JSON.stringify(localStorageTasks));
}

const refreshTasksUsingLocalStorage = () =>{
    const tasksFromLocalStorage = JSON.parse(localStorage.getItem('tasks'));

    if(!tasksFromLocalStorage) return;

    for(const task of tasksFromLocalStorage){

        taskToAdd = task.description;
        handleAddTaskFunction(taskToAdd, true, task);
    }    
}


const handleAddTaskFunction = (taskToAdd, refresh, task) => {

    const taskItemContainer = document.createElement('div');
    taskItemContainer.classList.add('task-item');

    const taskContent = document.createElement('p');
    taskContent.classList.add("task-text");
    taskContent.innerText = taskToAdd;

    if (refresh && task.isCompleted) {
        taskContent.classList.add("completed");
    }

    taskContent.addEventListener('click', () => handleClick(taskContent));
    
    const deleteIcon = document.createElement('p');
    deleteIcon.classList.add("delete-icon");
    deleteIcon.innerText = "x";

    deleteIcon.addEventListener('click', () => handleDeleteClick(taskItemContainer, taskContent));

    taskItemContainer.appendChild(taskContent);
    taskItemContainer.appendChild(deleteIcon);

    taskContainer.appendChild(taskItemContainer);
}


refreshTasksUsingLocalStorage();

addTaskButton.addEventListener("click", () => handleAddTask());
inputElement.addEventListener("change", () => handleInputChange());
