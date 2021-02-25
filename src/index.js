import UI from "./modules/DOM/dom";
import Storage from "./modules/storage";

document.addEventListener("DOMContentLoaded", () => {
  Storage.initLocalStorage();
  UI.loadPage();
});
