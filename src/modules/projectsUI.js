import closeImg from "../icons/close.svg"

let active = false;
const form = document.querySelector(".form");
const projectsDiv = document.querySelector(".projects");

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

        close.src = closeImg;
        close.className = "close-img";

        closeButton.className = "close-button";
        closeButton.appendChild(close);

        projectButton.textContent = projectName;
        projectButton.className = "project-button";

        projectButton.appendChild(closeButton);
        projectsDiv.appendChild(projectButton);

        closeButton.addEventListener("click", () => {
            projectsDiv.removeChild(projectButton);
        });

        projectButton.addEventListener("mouseenter", () => {
            closeButton.setAttribute("style", "display: block");
        })

        projectButton.addEventListener("mouseleave", () => {
            closeButton.setAttribute("style", "display: none");
        })

        form.setAttribute("style", "display: none");
        active = false;
    } else {
        alert("Please enter a name for the project");
    }
}