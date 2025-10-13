import closeImg from "../icons/close.svg"
import { addTaskToAProject, createProject, deleteProject, getTodayTasks, getThisWeekTasks, getProjectTasks, removeTaskfromAProject } from "./projectsLogic";
import { changeActive } from "../index.js";

let id = 0;
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

function showTaskCard({ title, desc, date, priority, project }) {
    const overlay = document.createElement("div");
    overlay.className = "task-card-overlay";

    const card = document.createElement("div");
    card.className = "task-card";

    const closeBtn = document.createElement("button");
    closeBtn.textContent = "×";
    closeBtn.className = "task-button";
    closeBtn.onclick = () => document.body.removeChild(overlay);

    card.innerHTML += `
        <h2>${title}</h2>
        <p><strong>Projeto:</strong> ${project}</p>
        <p><strong>Descrição:</strong> ${desc}</p>
        <p><strong>Data:</strong> ${date}</p>
        <p><strong>Prioridade:</strong> <span style="color: ${priority === "low" ? "#8AFF8A" : priority === "medium" ? "#FFFF5C" : "#FF2E2E"
        }">${priority}</span></p>
    `;
    card.appendChild(closeBtn);
    overlay.appendChild(card);
    document.body.appendChild(overlay);
}

function createTask(taskTitle, taskDesc, taskDate, taskPriority, project) {
    const taskDiv = document.createElement("div");
    taskDiv.className = "task-div";
    taskDiv.id = id;
    id++;

    const title = document.createElement("p");
    title.textContent = taskTitle + " ( " + project + " )";
    title.className = "task-title task-text";

    taskDiv.appendChild(title);

    const internDiv = document.createElement("div");
    internDiv.className = "intern-div";

    const dateDiv = document.createElement("p");
    dateDiv.textContent = taskDate;
    dateDiv.className = "task-text";
    internDiv.appendChild(dateDiv);

    const priorityDiv = document.createElement("div");
    priorityDiv.className = "task-priority";

    if (taskPriority === "low") {
        priorityDiv.setAttribute("style", "background-color: #8AFF8A");
    } else if (taskPriority === "medium") {
        priorityDiv.setAttribute("style", "background-color: #FFFF5C");
    } else {
        priorityDiv.setAttribute("style", "background-color: #FF2E2E");
    }

    const closeBtn = document.createElement("button");
    closeBtn.textContent = "×";
    closeBtn.className = "remove-task";
    closeBtn.onclick = (event) => {
        event.stopPropagation();
        document.getElementById(taskDiv.id).remove();
        removeTaskfromAProject(taskTitle, project);
    }

    internDiv.appendChild(priorityDiv);
    internDiv.appendChild(closeBtn);
    taskDiv.appendChild(internDiv);

    taskDiv.addEventListener("click", () => {
        showTaskCard({
            title: taskTitle,
            desc: taskDesc,
            date: taskDate,
            priority: taskPriority,
            project: project
        });
    });

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

    let projectTasks = getProjectTasks(project);
    for (let i = 0; i < projectTasks.length; ++i) {
        let task = projectTasks[i];
        let taskDiv = createTask(task.title, task.desc, task.date, task.priority, task.project);
        taskList.appendChild(taskDiv);
    }

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

export function renderToday() {
    clearContent(content);

    let title = document.createElement("h1");
    title.textContent = "Today";

    content.appendChild(title);

    let taskList = document.createElement("div");
    taskList.className = "task-list";
    content.appendChild(taskList);

    let todayTasks = getTodayTasks();
    for (let i = 0; i < todayTasks.length; ++i) {
        let task = todayTasks[i];
        let taskDiv = createTask(task.title, task.desc, task.date, task.priority, task.project);
        taskList.appendChild(taskDiv);
    }
}

export function renderThisWeek() {
    clearContent(content);

    let title = document.createElement("h1");
    title.textContent = "This Week";

    content.appendChild(title);

    let taskList = document.createElement("div");
    taskList.className = "task-list";
    content.appendChild(taskList);

    let thisWeekTasks = getThisWeekTasks();
    for (let i = 0; i < thisWeekTasks.length; ++i) {
        let task = thisWeekTasks[i];
        let taskDiv = createTask(task.title, task.desc, task.date, task.priority, task.project);
        taskList.appendChild(taskDiv);
    }

}
