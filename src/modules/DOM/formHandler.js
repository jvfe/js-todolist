import Project from "../project";
import Todo from "../todo";
import ViewHandler from "./viewHandler";
import UI from "./dom";
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
      ViewHandler.createProjectButton(newProject);
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
      ViewHandler.renderTodos(currentProject);
      UI.toggleClass(todoForm.parentElement, "inactive");
    });
  }
}

export default FormHandler;
