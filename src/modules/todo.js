import { format } from "date-fns";

class Todo {
  constructor(task, description, date = null, done = false) {
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

  get date() {
    return {
      date: this._date,
      date_str: this._date_str,
    };
  }

  set date(value) {
    if (value !== null) {
      this._date = value;
      this._date_str = format(this._date, "dd/MM/yy");
    } else {
      this._date = value;
      this._date_str = value;
    }
  }
}

export default Todo;
