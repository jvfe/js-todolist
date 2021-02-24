class Project {
  constructor(name, todos = []) {
    this.name = name;
    this.todos = todos;
  }

  get name() {
    return this._name;
  }

  set name(value) {
    this._name = value;
  }

  addTodo(todo) {
    this.todos.push(todo);
  }
}

export default Project;
