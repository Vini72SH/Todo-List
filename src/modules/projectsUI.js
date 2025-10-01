import closeImg from "../icons/close.svg"
import { createProject, deleteProject } from "./projectsLogic";

let active = false;
const form = document.querySelector(".form");
const projectsDiv = document.querySelector(".projects");
const content = document.querySelector(".list-content");
const addTaskDiv = document.querySelector(".add-task-form-div");

function clearContent(content) {
    while (content.hasChildNodes()) {
        clearContent(content.firstChild);
        content.removeChild(content.firstChild);
    }
}

function createTaskForm() {
    addTaskDiv.setAttribute("style", "display: block");

    addTaskDiv.innerHTML = `
        <form class="add-task-form" action="#" method="#">
            <div>
                <label for="task-title"> Task Title <br></label>
                <input type="text" id="task-title" name="task-title" required>
            </div>
            <div>
                <label for="task-date"> Date <br></label>
                <input type="date" id="task-date" name="task-date" required>
            </div>
            <div>
                <label for="task-description"> Description <br></label>
                <textarea type="text" id="task-description" name="task-description" required></textarea>
            </div>
            <button type="submit" id="submit-task"> Submit </button>
        </form>
    `;
    const subtmitTask = document.querySelector("#submit-task");
    const taskForm = document.querySelector(".add-task-form");

    subtmitTask.addEventListener("click", () => {
        const taskTitle = document.querySelector("#task-title").value.trim();
        const taskDate = document.querySelector("#task-date").value.trim();
        const taskDesc = document.querySelector("#task-description").value.trim();

        if (taskTitle && taskDate && taskDesc) {
            addTaskDiv.setAttribute("style", "display: none");
        }

        taskForm.reset();
    });
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
                projectsDiv.removeChild(projectButton);
                clearContent(content);
            });

            projectButton.addEventListener("mouseenter", () => {
                closeButton.setAttribute("style", "display: block");
            })

            projectButton.addEventListener("mouseleave", () => {
                closeButton.setAttribute("style", "display: none");
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

export function renderProject(project) {
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
        createTaskForm();
    });

    content.appendChild(addTaskButton);
}