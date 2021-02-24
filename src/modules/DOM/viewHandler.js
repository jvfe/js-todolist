import Storage from "../storage";
class ViewHandler {
  static renderView() {
    const projectList = Storage.getStorage();
    const currentProject = projectList[0];
    ViewHandler.renderProjects(projectList);
    ViewHandler.renderTodos(currentProject);
  }

  static renderProjects(projectList) {
    projectList.forEach((project) => {
      ViewHandler.createProjectButton(project);
    });
  }

  static renderTodos(currentProject) {
    const projectTitle = document.querySelector(".current-project");
    projectTitle.textContent = currentProject.name;
    const todosView = document.querySelector(".todos-view");
    currentProject.todos.forEach((todo) => {
      const todoElement = ViewHandler.createTodoElement(todo);
      todosView.appendChild(todoElement);
    });
  }

  static createProjectButton(project) {
    const projectListEl = document.querySelector("#project-list");
    const newProject = document.createElement("button");
    newProject.classList.add(...["btn", "project", "project-btn"]);
    newProject.textContent = project.name;
    projectListEl.appendChild(newProject);
  }

  static createTodoElement(todo) {
    const todoElement = document.createElement("div");
    todoElement.classList.add("todo-element");

    const checkTodo = document.createElement("button");
    checkTodo.textContent = "✓";
    checkTodo.classList.add(...["btn", "todo-btn", "check-todo"]);

    const todoContent = ViewHandler.createTodoContentElement(todo);

    const removeTodo = document.createElement("button");
    removeTodo.textContent = "⛌";
    removeTodo.classList.add(...["btn", "todo-btn", "remove-todo"]);

    [checkTodo, todoContent, removeTodo].forEach((element) =>
      todoElement.appendChild(element)
    );
    return todoElement;
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

    const todoDate = document.createElement("input");
    todoDate.type = "date";
    todoDate.name = "todo-date";
    todoDate.id = "todo-date";

    [innerDiv, todoDate].forEach((element) => todoContent.appendChild(element));

    return todoContent;
  }
}

export default ViewHandler;
