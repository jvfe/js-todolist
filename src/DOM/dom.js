class UI {
  static loadPage() {
    UI.handleButtons();
  }

  static handleButtons() {
    const newProjectBtn = document.querySelector("#add-proj");
    const newProjectContainer = document.querySelector(".new-project-div");

    const newTodoBtn = document.querySelector("#new-todo");
    const newTodoContainer = document.querySelector(".new-todo-div");

    const burgerBtn = document.querySelector(".burger");
    const sidebar = document.querySelector(".sidebar");

    newProjectBtn.addEventListener("click", () =>
      UI.toggleClass(newProjectContainer, "inactive")
    );

    newTodoBtn.addEventListener("click", () =>
      UI.toggleClass(newTodoContainer, "inactive")
    );

    burgerBtn.addEventListener("click", () =>
      UI.toggleClass(sidebar, "hidden")
    );
  }

  static toggleClass(element, className) {
    element.classList.toggle(className);
  }
}

export { UI };
