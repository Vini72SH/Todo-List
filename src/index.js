import "./styles.css";
import { addProject, showButton } from "./modules/projectsUI.js";

const submitButton = document.querySelector("#submit");
const newProjectButton = document.querySelector("#new-project-button");

newProjectButton.addEventListener("click", () => {
    showButton();
});

submitButton.addEventListener("click", (e) => {
    e.preventDefault();
    addProject();
});