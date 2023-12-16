import Modal from "../Modal/modal";
import Observer from "../Observer/Observer";
import View from "../View/View";

export default class Controller extends Observer {
  constructor() {
    super();
    this.view = new View();
    this.modal = new Modal();
  }
}
