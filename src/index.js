import "./styles.css";
import { addProject, showButton } from "./modules/projectsUI.js";

const todayButton = document.querySelector("#today-button");
const weekButton = document.querySelector("#week-button");

const projectsDiv = document.querySelector(".projects")
const submitButton = document.querySelector("#submit");
const newProjectButton = document.querySelector("#new-project-button");

let current = todayButton;

function changeActive(button) {
    current.classList.remove("active");
    button.classList.add("active");
    current = button;
}

todayButton.addEventListener("click", () => {
    if (current !== todayButton)
        changeActive(todayButton);
})

weekButton.addEventListener("click", () => {
    if (current !== weekButton)
        changeActive(weekButton);
})

projectsDiv.addEventListener("click", (e) => {
    if (e.target.classList.contains("project-button")) {
        changeActive(e.target);
    }
})

newProjectButton.addEventListener("click", () => {
    showButton();
});

submitButton.addEventListener("click", (e) => {
    e.preventDefault();
    addProject();
});