const inputElement = document.querySelector(".new-task-input");
const addTaskButton = document.querySelector(".new-task-button");
const taskContainer = document.querySelector(".tasks-container");

const validateInput = () => inputElement.value.trim().length > 0

const handleAddTask = () =>{
    const inputIsValid = validateInput();

    if(!inputIsValid){
        return inputElement.classList.add("error");
    }

    const taskItemContainer = document.createElement('div');
    taskItemContainer.classList.add('task-item');

    const taskContent = document.createElement('p');
    taskContent.classList.add("task-text");
    taskContent.innerText = inputElement.value;

    taskContent.addEventListener('click', () => handleClick(taskContent));
    
    const deleteIcon = document.createElement('p');
    deleteIcon.classList.add("delete-icon");
    deleteIcon.innerText = "x";

    deleteIcon.addEventListener('click', () => handleDeleteClick(taskItemContainer, taskContent));

    taskItemContainer.appendChild(taskContent);
    taskItemContainer.appendChild(deleteIcon);

    taskContainer.appendChild(taskItemContainer);

    inputElement.value = "";
};

const handleClick = (taskContent) => {
    const tasks = taskContainer.childNodes;

    for(const task of tasks){
        if(task.firstChild && task.firstChild.isSameNode(taskContent)){

            task.firstChild.classList.toggle("completed");
        }
    }
}

const handleDeleteClick = (taskItemContainer, taskContent) => {
    const tasks = taskContainer.childNodes;

    for(const task of tasks){
        if(task.firstChild && task.firstChild.isSameNode(taskContent)){

            taskItemContainer.remove();
        }
    }
}

const handleInputChange = () =>{
    const inputIsValid = validateInput();

    if(inputIsValid){
        return inputElement.classList.remove("error");
    }
}

addTaskButton.addEventListener("click", () => handleAddTask());
inputElement.addEventListener("change", () => handleInputChange());
