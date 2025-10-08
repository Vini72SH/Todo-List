import closeImg from "../icons/close.svg"
import { addTaskToAProject, createProject, deleteProject } from "./projectsLogic";
import { changeActive } from "../index.js";

let active = false;
const form = document.querySelector(".form");
const projectsDiv = document.querySelector(".projects");
const content = document.querySelector(".list-content");
const addTaskDiv = document.querySelector(".add-task-form-div");
const taskForm = document.querySelector(".add-task-form");

function clearContent(content) {
    while (content.hasChildNodes()) {
        clearContent(content.firstChild);
        content.removeChild(content.firstChild);
    }

    taskForm.reset();
    addTaskDiv.setAttribute("style", "display: none");
}

function createTask(taskTitle, taskDesc, taskDate, taskPriority, project) {
    let taskDiv = document.createElement("div");
    taskDiv.textContent = taskTitle;
    taskDiv.className = "task-div";

    return taskDiv;
}

function validateTaskForm(project, taskList) {
    addTaskDiv.setAttribute("style", "display: block");

    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    const minDate = `${year}-${month}-${day}`;

    document.getElementById('task-date').setAttribute('min', minDate);

    const subtmitTask = document.querySelector("#submit-task");
    subtmitTask.onclick = () => {
        const taskTitle = document.querySelector("#task-title").value.trim();
        const taskDesc = document.querySelector("#task-description").value.trim();
        const taskDate = document.querySelector("#task-date").value.trim();
        const priorityInput = document.querySelector('input[name="priority"]:checked');
        const taskPriority = priorityInput ? priorityInput.value : null;

        if (taskTitle && taskDesc && taskDate && taskPriority) {
            addTaskDiv.setAttribute("style", "display: none");
            addTaskToAProject(taskTitle, taskDesc, taskDate, taskPriority, project);
            let taskItem = createTask(taskTitle, taskDesc, taskDate, taskPriority, project);
            taskList.appendChild(taskItem);
        } else {
            alert("Fill in all fields");
        }

        taskForm.reset();
    };
}

function renderProject(project) {
    clearContent(content);

    let projectTitle = document.createElement("h1");
    projectTitle.textContent = project;

    content.appendChild(projectTitle);

    let taskList = document.createElement("div");
    taskList.className = "task-list";
    content.appendChild(taskList);

    let addTaskButton = document.createElement("button");
    addTaskButton.className = "btn add-task-button";
    addTaskButton.textContent = "Add Task";

    addTaskButton.addEventListener("click", () => {
        validateTaskForm(project, taskList);
    });

    content.appendChild(addTaskButton);
}

export function showButton() {
    if (active === false) {
        form.setAttribute("style", "display: flex");
        active = true;
    }
}

export function addProject() {
    const projectName = document.querySelector("#project-name").value.trim();
    if (projectName) {
        const close = document.createElement("img");
        const closeButton = document.createElement("button");
        const projectButton = document.createElement("button");

        if (!(createProject(projectName))) {
            close.src = closeImg;
            close.className = "close-img";

            closeButton.className = "close-button";
            closeButton.appendChild(close);

            projectButton.textContent = projectName;
            projectButton.className = "project-button";

            closeButton.addEventListener("click", () => {
                deleteProject(projectName);
                clearContent(projectButton);
                clearContent(content);
                projectsDiv.removeChild(projectButton);
            });

            projectButton.addEventListener("mouseenter", () => {
                closeButton.setAttribute("style", "display: block");
            })

            projectButton.addEventListener("mouseleave", () => {
                closeButton.setAttribute("style", "display: none");
            })

            projectButton.addEventListener("click", () => {
                changeActive(projectButton);
                renderProject(projectName);
            })

            projectButton.appendChild(closeButton);
            projectsDiv.appendChild(projectButton);

        } else {
            alert("There is already a project with that name.");
        }

        form.setAttribute("style", "display: none");
        form.reset();
        active = false;

    } else {
        alert("Please enter a name for the project");
    }
}