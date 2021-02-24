import Project from "../project";
import ViewHandler from "./viewHandler";
import UI from "./dom";

class FormHandler {
  static handleForms() {
    FormHandler.handleProjectForm();
    // handleTodoForm()
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
}

export default FormHandler;
