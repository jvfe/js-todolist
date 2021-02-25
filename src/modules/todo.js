class Todo {
  constructor(task, description, date = "No date", done = false) {
    this.task = task;
    this.description = description;
    this.date = date;
    this.done = done;
  }

  get done() {
    return this._done;
  }

  set done(value) {
    this._done = value;
  }
}

export default Todo;
