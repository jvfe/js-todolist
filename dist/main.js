(()=>{"use strict";const t=class{constructor(t,e=[]){this.name=t,this.todos=e}get name(){return this._name}set name(t){this._name=t}addTodo(t){this.todos.push(t)}},e=class{constructor(t,e,o="No date",n=!1){this.task=t,this.description=e,this.date=o,this.done=n}get done(){return this._done}set done(t){this._done=t}};class o{static initLocalStorage(){if(0!==localStorage.length)return;const n=new e("Create a new Todo!","Bla bla","12/02/2018"),a=new t("Main",[n]);o.updateStorage([a])}static getStorage(){return JSON.parse(localStorage.getItem("projects")).map((o=>{const n=Object.assign(new t,o);return n.todos=n.todos.map((t=>Object.assign(new e,t))),n}))}static updateStorage(t){localStorage.setItem("projects",JSON.stringify(t))}static getProjectByName(t){const e=o.getStorage(),n=e.find((e=>e.name==t));return[n,e.indexOf(n)]}static getCurrentProject(){const t=document.querySelector(".current-project"),[e]=o.getProjectByName(t.textContent);return e}static getTodoObj(t,e){return t.todos[e]}static setTodoObjAsDone(t,e){t.todos[e].done=!t.todos[e].done,o.updateProject(t)}static removeTodoObj(t,e){t.todos.splice(e,1),o.updateProject(t)}static updateProject(t){const e=o.getStorage(),[,n]=o.getProjectByName(t.name);e[n]=t,o.updateStorage(e)}static addProject(t){const e=o.getStorage();e.push(t),o.updateStorage(e)}}const n=o;class a{static renderView(){const t=n.getStorage(),e=t[0];a.renderProjects(t),a.renderTodos(e)}static renderProjects(t){const e=document.querySelector("#project-list");e.textContent="",t.forEach((t=>{a.createProjectButton(t,e)}))}static renderTodos(t){document.querySelector(".current-project").textContent=t.name;const e=document.querySelector(".todos-view");e.textContent="",t.todos.forEach((o=>{const n=a.createTodoElement(o);n.dataset.projIdx=t.todos.indexOf(o),e.appendChild(n)}))}static createProjectButton(t,e){const o=document.createElement("button");o.classList.add("btn","project","project-btn"),o.textContent=t.name,o.dataset.storageIdx=n.getProjectByName(t.name)[1],e.appendChild(o)}static createTodoElement(t){const e=document.createElement("div");e.classList.add("todo-element");const o=document.createElement("button");t.done?(o.textContent="✓",o.classList.add("btn","todo-btn","check-todo")):(o.textContent="⛌",o.classList.add("btn","todo-btn","check-todo")),o.addEventListener("click",(()=>a.handleTodoCheck(o)));const n=a.createTodoContentElement(t),d=document.createElement("button");return d.textContent="Remove",d.classList.add("btn","remove-todo"),d.addEventListener("click",(()=>a.handleTodoRemoval(d))),[o,n,d].forEach((t=>e.appendChild(t))),e}static handleTodoCheck(t){const e=n.getCurrentProject(),o=Number(t.parentElement.dataset.projIdx);n.setTodoObjAsDone(e,o),a.renderView()}static handleTodoRemoval(t){const e=n.getCurrentProject(),o=Number(t.parentElement.dataset.projIdx);n.removeTodoObj(e,o),a.renderView()}static createTodoContentElement(t){const e=document.createElement("div");e.classList.add("todo-content");const o=document.createElement("div"),n=document.createElement("p");n.classList.add("todo"),n.textContent=t.task;const a=document.createElement("p");let d;return a.classList.add("todo-description"),a.textContent=t.description,[n,a].forEach((t=>o.appendChild(t))),"No date"===t.date?(d=document.createElement("input"),d.type="date",d.name="todo-date",d.id="todo-date"):(d=document.createElement("p"),d.textContent=t.date),[o,d].forEach((t=>e.appendChild(t))),e}}const d=a;class c{static handleForms(){c.handleProjectForm(),c.handleTodoForm()}static handleProjectForm(){const e=document.querySelector("#new-project-form");e.addEventListener("submit",(o=>{o.preventDefault();const a=new FormData(e),c=new t(a.get("new-project-name"));n.addProject(c),e.reset(),d.renderView(),i.toggleClass(e.parentElement,"inactive")}))}static handleTodoForm(){const t=document.querySelector("#new-todo-form");t.addEventListener("submit",(o=>{o.preventDefault();const a=new FormData(t),c=n.getCurrentProject(),r=new e(a.get("new-todo-name"),a.get("new-todo-description"));c.addTodo(r),n.updateProject(c),t.reset(),d.renderView(),i.toggleClass(t.parentElement,"inactive")}))}}const r=c;class s{static loadPage(){d.renderView(),r.handleForms(),s.handleButtons()}static handleButtons(){const t=document.querySelector("#add-proj"),e=document.querySelector(".new-project-div"),o=document.querySelector("#new-todo"),n=document.querySelector(".new-todo-div"),a=document.querySelector(".burger"),d=document.querySelector(".sidebar");t.addEventListener("click",(()=>s.toggleClass(e,"inactive"))),o.addEventListener("click",(()=>s.toggleClass(n,"inactive"))),a.addEventListener("click",(()=>s.toggleClass(d,"hidden")))}static toggleClass(t,e){t.classList.toggle(e)}}const i=s;document.addEventListener("DOMContentLoaded",(()=>{n.initLocalStorage(),i.loadPage()}))})();