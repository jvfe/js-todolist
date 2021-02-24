class ProjectHandler {
  static createProjectButton(project) {
    const projectListEl = document.querySelector("#project-list");
    const newProject = document.createElement("button");
    newProject.classList.add(...["btn", "project", "project-btn"]);
    newProject.textContent = project.name;
    projectListEl.appendChild(newProject);
  }
}

export default ProjectHandler;
