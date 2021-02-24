import Project from "../project";
import ProjectHandler from "./projectHandler";

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
      ProjectHandler.createProjectButton(newProject);
    });
  }
}

export default FormHandler;
