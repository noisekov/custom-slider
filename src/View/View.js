export default class View {
  constructor() {
    this.firstToggle = document.querySelector(".toggle-min");
    this.secondToggle = document.querySelector(".toggle-max");
    this.scaleBar = document.querySelector(".scale");
    this.greenBar = document.querySelector(".bar");
    this.field = document.querySelector(".field");
    this.init();
  }

  init() {
    this.scaleBar.onmousedown = (evt) => {
      this.moveToggle(evt.pageX);
      this.positionBar();

      this.onMouseUp = this.onMouseUp.bind(this);
      this.onMouseMove = this.onMouseMove.bind(this);

      document.addEventListener("mousemove", this.onMouseMove);
      document.addEventListener("mouseup", this.onMouseUp);
    };

    this.scaleBar.ontouchstart = (evt) => {
      this.moveToggle(evt.targetTouches[0].clientX);
      this.positionBar();

      this.onTouchMove = this.onTouchMove.bind(this);
      this.touchEnd = this.touchEnd.bind(this);

      document.addEventListener("touchmove", this.onTouchMove);
      document.addEventListener("touchend", this.touchEnd);
    };
  }

  onMouseMove(evt) {
    this.moveToggle(evt.pageX);
    this.positionBar();
  }

  onMouseUp() {
    document.removeEventListener("mousemove", this.onMouseMove);
    document.removeEventListener("mouseup", this.onMouseUp);
  }

  onTouchMove(evt) {
    this.moveToggle(evt.targetTouches[0].clientX);
    this.positionBar();
  }

  touchEnd() {
    document.removeEventListener("touchmove", this.onTouchMove);
    document.removeEventListener("touchend", this.touchEnd);
  }

  positionToggle(clickPosition) {
    const currentPositionToggleOne =
      +this.firstToggle.style.transform.replace(/[^0-9.-]+/g, "") +
      this.firstToggle.offsetWidth / 2;
    const currentPositionToggleSecond =
      +this.secondToggle.style.transform.replace(/[^0-9.-]+/g, "") +
      this.firstToggle.offsetWidth / 2;
    return Math.abs(clickPosition - currentPositionToggleOne) >
      Math.abs(clickPosition - currentPositionToggleSecond)
      ? this.secondToggle
      : this.firstToggle;
  }

  positionBar() {
    const currentPositionToggleOne =
      +this.firstToggle.style.transform.replace(/[^0-9.-]+/g, "") +
      this.firstToggle.offsetWidth / 2;
    const currentPositionToggleSecond =
      +this.secondToggle.style.transform.replace(/[^0-9.-]+/g, "") +
      this.firstToggle.offsetWidth / 2;

    // change progress bar width
    this.greenBar.style.width =
      Math.abs(currentPositionToggleOne - currentPositionToggleSecond) + "px";

    // change progress bar position
    this.greenBar.style.transform = `translateX(${Math.min(
      currentPositionToggleOne,
      currentPositionToggleSecond
    )}px)`;
  }

  moveToggle(position) {
    const fieldRect = this.field.getBoundingClientRect().left;
    const currentClickPosition = position - fieldRect;
    const widthPaddingContainer = this.field.offsetWidth;
    const toggleWhichNeedMove = this.positionToggle(currentClickPosition);

    toggleWhichNeedMove.ondragstart = () => false;

    toggleWhichNeedMove.style.transform = `translateX(${
      position - fieldRect - toggleWhichNeedMove.offsetWidth / 2 + "px"
    })`;

    if (
      +toggleWhichNeedMove.style.transform.replace(/[^0-9.-]+/g, "") >
      widthPaddingContainer
    ) {
      toggleWhichNeedMove.style.transform = `translateX(${
        widthPaddingContainer - toggleWhichNeedMove.offsetWidth + "px"
      })`;
    }
    if (+toggleWhichNeedMove.style.transform.replace(/[^0-9.-]+/g, "") < 0) {
      toggleWhichNeedMove.style.transform = `translateX(${0 + "px"})`;
    }
  }
}
