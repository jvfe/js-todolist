import Storage from "../storage";
class ViewHandler {
  static renderView(
    currentProject = Storage.getCurrentProject() || Storage.getStorage()[0]
  ) {
    const projectList = Storage.getStorage();
    ViewHandler.renderProjects(projectList);
    ViewHandler.renderTodos(currentProject);
  }

  static renderProjects(projectList) {
    const projectListEl = document.querySelector("#project-list");
    projectListEl.textContent = "";
    projectList.forEach((project) => {
      ViewHandler.createProjectButton(project, projectListEl);
    });
  }

  static renderTodos(currentProject) {
    const projectTitle = document.querySelector(".current-project");
    projectTitle.textContent = currentProject.name;
    const todosView = document.querySelector(".todos-view");
    todosView.textContent = "";
    currentProject.todos.forEach((todo) => {
      const todoElement = ViewHandler.createTodoElement(todo);
      todoElement.dataset.projIdx = currentProject.todos.indexOf(todo);
      todosView.appendChild(todoElement);
    });
  }

  static createProjectButton(project, projectListEl) {
    const newProject = document.createElement("button");
    newProject.classList.add(...["btn", "project", "project-btn"]);
    newProject.textContent = project.name;
    newProject.dataset.storageIdx = Storage.getProjectByName(project.name)[1];
    newProject.addEventListener("click", () =>
      ViewHandler.handleProjectSwitch(newProject)
    );
    projectListEl.appendChild(newProject);
  }

  static createTodoElement(todo) {
    const todoElement = document.createElement("div");
    todoElement.classList.add("todo-element");

    const checkTodo = document.createElement("button");
    if (todo.done) {
      checkTodo.textContent = "✓";
      checkTodo.classList.add(...["btn", "todo-btn", "check-todo"]);
    } else {
      checkTodo.textContent = "⛌";
      checkTodo.classList.add(...["btn", "todo-btn", "remove-todo"]);
    }

    checkTodo.addEventListener("click", () =>
      ViewHandler.handleTodoCheck(checkTodo)
    );

    const todoContent = ViewHandler.createTodoContentElement(todo);

    const removeTodo = document.createElement("button");
    removeTodo.textContent = "Remove";
    removeTodo.classList.add(...["btn", "remove-todo"]);

    removeTodo.addEventListener("click", () =>
      ViewHandler.handleTodoRemoval(removeTodo)
    );

    [checkTodo, todoContent, removeTodo].forEach((element) =>
      todoElement.appendChild(element)
    );
    return todoElement;
  }

  static handleTodoCheck(todoCheck) {
    const currentProject = Storage.getCurrentProject();
    const todoIdx = Number(todoCheck.parentElement.dataset.projIdx);
    Storage.setTodoObjAsDone(currentProject, todoIdx);
    ViewHandler.renderView();
  }

  static handleTodoRemoval(removeTodo) {
    const currentProject = Storage.getCurrentProject();
    const todoIdx = Number(removeTodo.parentElement.dataset.projIdx);
    Storage.removeTodoObj(currentProject, todoIdx);
    ViewHandler.renderView();
  }

  static handleProjectSwitch(projectEl) {
    const projectList = Storage.getStorage();
    const currentProjIdx = Number(projectEl.dataset.storageIdx);
    const currentProject = projectList[currentProjIdx];
    ViewHandler.renderView(currentProject);
  }

  static createTodoContentElement(todo) {
    const todoContent = document.createElement("div");
    todoContent.classList.add("todo-content");

    const innerDiv = document.createElement("div");
    const todoTitle = document.createElement("p");
    todoTitle.classList.add("todo");
    todoTitle.textContent = todo.task;
    const todoDescription = document.createElement("p");
    todoDescription.classList.add("todo-description");
    todoDescription.textContent = todo.description;
    [todoTitle, todoDescription].forEach((todoValue) =>
      innerDiv.appendChild(todoValue)
    );

    let todoDateElement;
    if (todo.date === "No date") {
      todoDateElement = document.createElement("input");
      todoDateElement.type = "date";
      todoDateElement.name = "todo-date";
      todoDateElement.id = "todo-date";
    } else {
      todoDateElement = document.createElement("p");
      todoDateElement.textContent = todo.date;
    }

    [innerDiv, todoDateElement].forEach((element) =>
      todoContent.appendChild(element)
    );

    return todoContent;
  }
}

export default ViewHandler;
