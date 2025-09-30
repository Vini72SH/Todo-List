let id = 0;
let projects = [];

class TodoItem {
    constructor(name, desc, priority, project, date) {
        this.name = name;
        this.desc = desc;
        this.priority = priority;
        this.project = project;
        this.date = date;
    }
}

class Project {
    constructor(id, name) {
        this.id = id;
        this.name = name;
        this.todoList = [];
    }
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
    let i;
    for (i = 0; i < projects.length; ++i) {
        if (projects[i].name === name) {
            break;
        }
    }

    projects.splice(i, 1);
}