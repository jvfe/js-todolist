class Todo {
  constructor(task, description, done = false, date = "No date") {
    this.task = task;
    this.description = description;
    this.done = done;
    this.date = date;
  }

  get done() {
    return this._done;
  }

  set done(value) {
    this._done = value;
  }
}

export default Todo;
