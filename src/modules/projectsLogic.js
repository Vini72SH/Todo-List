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

function isCurrentWeek(date) {
    const now = new Date();
    const inputDate = new Date(date);

    const dayOfWeek = now.getDay();
    const diffToSunday = -dayOfWeek;
    const startOfWeek = new Date(now);
    startOfWeek.setDate(now.getDate() + diffToSunday);
    startOfWeek.setHours(0, 0, 0, 0);

    const endOfWeek = new Date(startOfWeek);
    endOfWeek.setDate(startOfWeek.getDate() + 6);
    endOfWeek.setHours(23, 59, 59, 999);

    return inputDate >= startOfWeek && inputDate <= endOfWeek;
}

export function addTaskToAProject(title, desc, date, priority, project) {
    let i;
    let newTask = new TodoItem(title, desc, date, priority, project);

    for (i = 0; i < projects.length; ++i) {
        if (projects[i].name === project) {
            projects[i].addTask(newTask);
            return 0;
        }
    }
    return 1;
}

export function removeTaskfromAProject(task, project) {
    for (let i = 0; i < projects.length; ++i) {
        if (projects[i].name === project) {
            for (let j = 0; j < projects[i].todoList.length; ++j) {
                if (projects[i].todoList[j].title === task) {
                    projects[i].todoList.splice(j, 1);
                    return 0;
                }
            }
        }
    }

    return 1;
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
            return 0;
        }
    }
    return 1;
}

export function getTodayTasks() {
    let tasks = [];

    const dataObj = new Date();
    const day = String(dataObj.getDate());
    const month = String(dataObj.getMonth() + 1);
    const year = String(dataObj.getFullYear());

    for (let i = 0; i < projects.length; ++i) {
        for (let j = 0; j < projects[i].todoList.length; ++j) {
            const taskDate = projects[i].todoList[j].date.split("-");
            if (taskDate[0] === year && taskDate[1] === month && taskDate[2] === day) {
                tasks.push(projects[i].todoList[j]);
            }
        }
    }

    return tasks;
}

export function getThisWeekTasks() {
    let tasks = [];

    for (let i = 0; i < projects.length; ++i) {
        for (let j = 0; j < projects[i].todoList.length; ++j) {
            if (isCurrentWeek(projects[i].todoList[j].date)) tasks.push(projects[i].todoList[j]);
        }
    }

    return tasks;
}

export function getProjectTasks(project) {
    let tasks = [];
    for (let i = 0; i < projects.length; ++i) {
        if (projects[i].name === project) {
            for (let j = 0; j < projects[i].todoList.length; ++j) {
                tasks.push(projects[i].todoList[j]);
            }
        }
    }

    return tasks;
}