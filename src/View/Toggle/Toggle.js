export default class Toggle {
  constructor(countToggle) {
    this.countToggle = countToggle;
  }

  create() {
    if (this.countToggle === 1) {
      return this.oneToggle();
    }
    if (this.countToggle === 2) {
      return this.twoToggle();
    }
  }

  oneToggle() {
    return document.querySelector(".toggle-min");
  }

  twoToggle() {
    return [
      document.querySelector(".toggle-min"),
      document.querySelector(".toggle-max"),
    ];
  }
}
