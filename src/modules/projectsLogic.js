let id = 0;
let projects = [];

class TodoItem {
    constructor(title, desc, date, priority, project) {
        this.title = title;
        this.desc = desc;
        this.date = date;
        this.priority = priority;
        this.project = project;
    }
}

class Project {
    constructor(id, name) {
        this.id = id;
        this.name = name;
        this.todoList = [];
    }

    addTask(task) {
        this.todoList.push(task);
    }
}

export function addTaskToAProject(title, desc, date, priority, project) {
    let i;
    let newTask = new TodoItem(title, desc, date, priority, project);

    for (i = 0; i < projects.length; ++i) {
        if (projects[i].name === project) {
            projects[i].addTask(newTask);
            return 0; // sucesso
        }
    }
    return 1; // projeto não encontrado
}

export function createProject(name) {
    for (let i = 0; i < projects.length; ++i) {
        if (projects[i].name === name) {
            return 1;
        }
    }

    let newProject = new Project(id, name);
    projects.push(newProject);

    id++;

    return 0;
}

export function deleteProject(name) {
    for (let i = 0; i < projects.length; ++i) {
        if (projects[i].name === name) {
            projects.splice(i, 1);
            return 0; // sucesso
        }
    }
    return 1; // projeto não encontrado
}