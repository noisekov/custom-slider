import "./style.scss";

const toggleMin = document.querySelector(".toggle-min");
const toggleMax = document.querySelector(".toggle-max");

class Toggle {
  constructor(toggle, secondToggle) {
    this.$toggle = toggle;
    this.$secondToggle = secondToggle;
    this.$scaleBar = document.querySelector(".scale");
    // this.$greenBar = document.querySelector(".bar");
    this.$field = document.querySelector(".field");
    this.init();
  }

  init() {
    this.$scaleBar.onmousedown = (evt) => {
      this.moveAt(evt.pageX);

      this.onMouseUp = this.onMouseUp.bind(this);
      this.onMouseMove = this.onMouseMove.bind(this);

      document.addEventListener("mousemove", this.onMouseMove);
      document.addEventListener("mouseup", this.onMouseUp);
    };

    // this.$scaleBar.ontouchstart = (evt) => {
    //   this.moveTouch(evt.targetTouches[0].clientX);

    //   this.onTouchMove = this.onTouchMove.bind(this);
    //   this.touchEnd = this.touchEnd.bind(this);

    //   document.addEventListener("touchmove", this.onTouchMove);
    //   document.addEventListener("touchend", this.touchEnd);
    // };
  }

  onMouseMove(evt) {
    this.moveAt(evt.pageX);
  }

  onMouseUp() {
    document.removeEventListener("mousemove", this.onMouseMove);
    document.removeEventListener("mouseup", this.onMouseUp);
  }

  // onTouchMove(evt) {
  //   this.moveTouch(evt.targetTouches[0].clientX);
  // }

  // touchEnd() {
  //   document.removeEventListener("touchmove", this.onTouchMove);
  //   document.removeEventListener("touchend", this.touchEnd);
  // }

  positionToggle(clickPosition) {
    const currentPositionToggleOne =
      +this.$toggle.style.transform
        .replace("translateX(", "")
        .replace("px)", "") +
      this.$toggle.offsetWidth / 2;

    const currentPositionToggleSecond =
      +this.$secondToggle.style.transform
        .replace("translateX(", "")
        .replace("px)", "") +
      this.$toggle.offsetWidth / 2;
    return Math.abs(clickPosition - currentPositionToggleOne) >
      Math.abs(clickPosition - currentPositionToggleSecond)
      ? this.$secondToggle
      : this.$toggle;
  }

  moveAt(pageX) {
    const fieldRect = this.$field.getBoundingClientRect().left;
    const currentClickPosition = pageX - fieldRect;

    const currentNeedToMoveToggle = this.positionToggle(currentClickPosition);

    currentNeedToMoveToggle.ondragstart = () => false;

    currentNeedToMoveToggle.style.transform = `translateX(${
      pageX - fieldRect - currentNeedToMoveToggle.offsetWidth / 2 + "px"
    })`;
    // this.$greenBar.style.width =
    //   pageX - fieldRect - this.$toggle.offsetWidth / 2 + "px";

    const widthPaddingContainer = this.$field.offsetWidth;
    // if (+this.$greenBar.style.width.replace("px", "") > widthPaddingContainer) {
    //   this.$greenBar.style.width = widthPaddingContainer + "px";
    // }

    if (
      +currentNeedToMoveToggle.style.transform
        .replace("translateX(", "")
        .replace("px)", "") > widthPaddingContainer
    ) {
      currentNeedToMoveToggle.style.transform = `translateX(${
        widthPaddingContainer - currentNeedToMoveToggle.offsetWidth + "px"
      })`;
    }
    if (
      +currentNeedToMoveToggle.style.transform
        .replace("translateX(", "")
        .replace("px)", "") < 0
    ) {
      currentNeedToMoveToggle.style.transform = `translateX(${0 + "px"})`;
    }
  }

  // moveTouch(clientX) {
  //   this.$toggle.ondragstart = () => false;

  //   const fieldRect = this.$field.getBoundingClientRect().left;

  //   this.$toggle.style.transform = `translateX(${
  //     clientX - fieldRect - this.$toggle.offsetWidth / 2 + "px"
  //   })`;
  //   this.$greenBar.style.width =
  //     clientX - fieldRect - this.$toggle.offsetWidth / 2 + "px";

  //   const widthPaddingContainer = this.$field.offsetWidth;

  //   if (+this.$greenBar.style.width.replace("px", "") > widthPaddingContainer) {
  //     this.$greenBar.style.width = widthPaddingContainer + "px";
  //   }
  //   if (
  //     +this.$toggle.style.transform
  //       .replace("translateX(", "")
  //       .replace("px)", "") > widthPaddingContainer
  //   ) {
  //     this.$toggle.style.transform = `translateX(${
  //       widthPaddingContainer - this.$toggle.offsetWidth + "px"
  //     })`;
  //   }
  //   if (
  //     +this.$toggle.style.transform
  //       .replace("translateX(", "")
  //       .replace("px)", "") < 0
  //   ) {
  //     this.$toggle.style.transform = `translateX(${0 + "px"})`;
  //   }
  // }
}

new Toggle(toggleMax, toggleMin);
