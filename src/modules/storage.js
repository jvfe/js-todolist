import Project from "./project";
import Todo from "./todo";

class Storage {
  static initLocalStorage() {
    if (localStorage.length !== 0) {
      return;
      // localStorage.clear();
    }

    const initialTodo = new Todo("Create a new Todo!", "Bla bla");
    const initialProject = new Project("Main", [initialTodo]);

    Storage.updateStorage([initialProject]);
  }

  static getStorage() {
    const storage = JSON.parse(localStorage.getItem("projects"));
    const convertedProjects = storage.map((proj) => {
      const project = Object.assign(new Project(), proj);
      project.todos = project.todos.map((todo) =>
        Object.assign(new Todo(), todo)
      );
      return project;
    });

    return convertedProjects;
  }

  static updateStorage(projectList) {
    localStorage.setItem("projects", JSON.stringify(projectList));
  }

  static getProjectByName(match) {
    const projectList = Storage.getStorage();

    const project = projectList.find((project) => project.name == match);

    return [project, projectList.indexOf(project)];
  }

  static getCurrentProject() {
    const projectTitle = document.querySelector(".current-project");
    const [currentProject] = Storage.getProjectByName(projectTitle.textContent);
    return currentProject;
  }

  static getTodoObj(proj, idx) {
    return proj.todos[idx];
  }

  static setTodoObjAsDone(proj, idx) {
    proj.todos[idx].done = !proj.todos[idx].done;
    Storage.updateProject(proj);
  }

  static removeTodoObj(proj, idx) {
    proj.todos.splice(idx, 1);
    Storage.updateProject(proj);
  }

  static setTodoDate(proj, idx, date) {
    proj.todos[idx].date = date;
    Storage.updateProject(proj);
  }

  static updateProject(project) {
    const projectList = Storage.getStorage();
    const [, projectIndex] = Storage.getProjectByName(project.name);
    projectList[projectIndex] = project;
    Storage.updateStorage(projectList);
  }

  static addProject(project) {
    const projectList = Storage.getStorage();
    projectList.push(project);
    Storage.updateStorage(projectList);
  }
}

export default Storage;
