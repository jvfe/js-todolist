import ViewHandler from "./viewHandler";
import UI from "./dom";
import Project from "../project";
import Todo from "../todo";
import Storage from "../storage";

class FormHandler {
  static handleForms() {
    FormHandler.handleProjectForm();
    FormHandler.handleTodoForm();
  }

  static handleProjectForm() {
    const projectForm = document.querySelector("#new-project-form");
    projectForm.addEventListener("submit", (event) => {
      event.preventDefault();
      const formData = new FormData(projectForm);

      const newProject = new Project(formData.get("new-project-name"));
      Storage.addProject(newProject);
      projectForm.reset();
      ViewHandler.renderView();
      UI.toggleClass(projectForm.parentElement, "inactive");
    });
  }

  static handleTodoForm() {
    const todoForm = document.querySelector("#new-todo-form");

    todoForm.addEventListener("submit", (event) => {
      event.preventDefault();
      const formData = new FormData(todoForm);
      const currentProject = Storage.getCurrentProject();

      const newTodo = new Todo(
        formData.get("new-todo-name"),
        formData.get("new-todo-description")
      );

      currentProject.addTodo(newTodo);
      Storage.updateProject(currentProject);
      todoForm.reset();
      ViewHandler.renderView();
      UI.toggleClass(todoForm.parentElement, "inactive");
    });
  }
}

export default FormHandler;
