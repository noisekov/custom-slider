import Modal from "../Modal/modal";
import Observer from "../Observer/Observer";
import View from "../View/View";

export default class Controller {
  constructor(toggleCount) {
    this.view = new View();
    this.modal = new Modal(toggleCount);
    this.observer = new Observer();
    this.init();
  }

  init() {
    this.observer.subscribe(this.view);
    this.observer.notify(this.modal.toggleCount);
  }
}
