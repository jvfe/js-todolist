import Project from "./project";
import Todo from "./todo";

class Storage {
  static initLocalStorage() {
    if (localStorage.length !== 0) {
      return;
    }

    const initialTodo = new Todo("Create a new Todo!", "Bla bla");
    const initialProject = new Project("Main", [initialTodo]);

    localStorage.setItem("projects", JSON.stringify([initialProject]));
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
}

export default Storage;
