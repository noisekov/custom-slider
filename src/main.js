import "./style.scss";

const toggleMin = document.querySelector(".toggle-min");
const toggleMax = document.querySelector(".toggle-max");

class Toggle {
  constructor(firstToggle, secondToggle) {
    this.$firstToggle = firstToggle;
    this.$secondToggle = secondToggle;
    this.$scaleBar = document.querySelector(".scale");
    // this.$greenBar = document.querySelector(".bar");
    this.$field = document.querySelector(".field");
    this.init();
  }

  init() {
    this.$scaleBar.onmousedown = (evt) => {
      this.moveToggle(evt.pageX);

      this.onMouseUp = this.onMouseUp.bind(this);
      this.onMouseMove = this.onMouseMove.bind(this);

      document.addEventListener("mousemove", this.onMouseMove);
      document.addEventListener("mouseup", this.onMouseUp);
    };

    this.$scaleBar.ontouchstart = (evt) => {
      this.moveToggle(evt.targetTouches[0].clientX);

      this.onTouchMove = this.onTouchMove.bind(this);
      this.touchEnd = this.touchEnd.bind(this);

      document.addEventListener("touchmove", this.onTouchMove);
      document.addEventListener("touchend", this.touchEnd);
    };
  }

  onMouseMove(evt) {
    this.moveToggle(evt.pageX);
  }

  onMouseUp() {
    document.removeEventListener("mousemove", this.onMouseMove);
    document.removeEventListener("mouseup", this.onMouseUp);
  }

  onTouchMove(evt) {
    this.moveToggle(evt.targetTouches[0].clientX);
  }

  touchEnd() {
    document.removeEventListener("touchmove", this.onTouchMove);
    document.removeEventListener("touchend", this.touchEnd);
  }

  positionToggle(clickPosition) {
    const currentPositionToggleOne =
      +this.$firstToggle.style.transform.replace(/[^0-9.-]+/g, "") +
      this.$firstToggle.offsetWidth / 2;
    const currentPositionToggleSecond =
      +this.$secondToggle.style.transform.replace(/[^0-9.-]+/g, "") +
      this.$firstToggle.offsetWidth / 2;
    return Math.abs(clickPosition - currentPositionToggleOne) >
      Math.abs(clickPosition - currentPositionToggleSecond)
      ? this.$secondToggle
      : this.$firstToggle;
  }

  moveToggle(position) {
    const fieldRect = this.$field.getBoundingClientRect().left;
    const currentClickPosition = position - fieldRect;

    const toggleWhichNeedMove = this.positionToggle(currentClickPosition);

    toggleWhichNeedMove.ondragstart = () => false;

    toggleWhichNeedMove.style.transform = `translateX(${
      position - fieldRect - toggleWhichNeedMove.offsetWidth / 2 + "px"
    })`;
    // this.$greenBar.style.width =
    //   position - fieldRect - this.$toggle.offsetWidth / 2 + "px";

    const widthPaddingContainer = this.$field.offsetWidth;
    // if (+this.$greenBar.style.width.replace("px", "") > widthPaddingContainer) {
    //   this.$greenBar.style.width = widthPaddingContainer + "px";
    // }

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

new Toggle(toggleMax, toggleMin);
