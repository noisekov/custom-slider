import Controller from "./Controller/Controller";
import "./style.scss";

class Slider {
  constructor(toggleCount) {
    this.controller = new Controller(toggleCount);
  }
}
new Slider(2);
