import "./style.scss"

// const toggleMin = document.querySelector(".toggle-min")
const toggleMax = document.querySelector(".toggle-max")

const widthField = document.querySelector(".field")
const greenBar = document.querySelector(".bar")
const scaleBar = document.querySelector(".scale")

class Toggle {
    constructor (toggle) {
        this.$toggle = toggle;
        this.$scaleBar = document.querySelector(".scale");
        this.init()
        this.moveAt()
    }

    init() {
        this.$toggle.onmousedown = (evt) => {
            this.moveAt(evt.pageX);
            this.ondragstart = () => false;

            this.onMouseUp = this.onMouseUp.bind(this);
            this.onMouseMove = this.onMouseMove.bind(this);
            document.addEventListener("mousemove", this.onMouseMove)
            document.addEventListener("mouseup", this.onMouseUp)
        }
    }

    onMouseMove(evt) {
        this.moveAt(evt.pageX)
    }

    onMouseUp() {
        document.removeEventListener('mousemove', this.onMouseMove);
        document.removeEventListener("mouseup", this.onMouseUp)
    }

    moveAt(pageX) {
        const fieldRect = widthField.getBoundingClientRect().left;

        this.$toggle.style.transform = `translateX(${pageX - fieldRect - this.$toggle.offsetWidth / 2 + "px"})`;
        greenBar.style.width = pageX - fieldRect - this.$toggle.offsetWidth / 2 + "px";
    }

}
new Toggle(toggleMax)

// //mousemove
// toggleMax.onmousedown = function(evt) {
//     moveAt(evt.pageX)
//     document.addEventListener("mousemove", onMouseMove)

//     document.onmouseup = function () {
//         document.removeEventListener('mousemove', onMouseMove);
//         document.onmouseup = null;
//     }
//     toggleMax.ondragstart = () => false;
// }

// // //move greenBar and toggleMax
// function moveAt(pageX) {
//     const fieldRect = widthField.getBoundingClientRect().left;

//     toggleMax.style.transform = `translateX(${pageX - fieldRect - toggleMax.offsetWidth / 2 + "px"})`;
//     greenBar.style.width = pageX - fieldRect - toggleMax.offsetWidth / 2 + "px";

//     const widthPaddingContainer = widthField.offsetWidth;
//     if (+greenBar.style.width.replace("px", "") > widthPaddingContainer) {
//         greenBar.style.width = widthPaddingContainer + "px"
//     } 
//     if (+greenBar.style.width.replace("px", "") < 0) {
//         greenBar.style.width = 0 + "px"
//     } 
//     if (+toggleMax.style.transform.replace("translateX(", "").replace('px)','') > widthPaddingContainer) {
//         toggleMax.style.transform = `translateX(${widthPaddingContainer - toggleMax.offsetWidth + "px"})`; 
//     }
//     if (+toggleMax.style.transform.replace("translateX(", "").replace('px)','') < 0) {
//         toggleMax.style.transform = `translateX(${0 + "px"})`;
//     }
// }

// // //move touch
// // // function moveTouch(clientX) {
// // //     const fieldRect = widthField.getBoundingClientRect().left;
    
// // //     toggleMax.style.transform = `translateX(${clientX - fieldRect - toggleMax.offsetWidth / 2 + "px"})`;
// // //     greenBar.style.width = clientX - fieldRect - toggleMax.offsetWidth / 2 + "px";

// // //     const widthPaddingContainer = widthField.offsetWidth;
// // //     if (+greenBar.style.width.replace("px", "") > widthPaddingContainer) {
// // //         greenBar.style.width = widthPaddingContainer + "px"
// // //     } 
// // //     if (+greenBar.style.width.replace("px", "") < 0) {
// // //         greenBar.style.width = 0 + "px"
// // //     } 
// // //     if (+toggleMax.style.transform.replace("translateX(", "").replace('px)','') > widthPaddingContainer) {
// // //         toggleMax.style.transform = `translateX(${widthPaddingContainer - toggleMax.offsetWidth + "px"})`; 
// // //     }
// // //     if (+toggleMax.style.transform.replace("translateX(", "").replace('px)','') < 0) {
// // //         toggleMax.style.transform = `translateX(${0 + "px"})`; 
// // //     }
// // // }

// // //click to scaleBar
//     scaleBar.onmousedown = function(evt) {
//         moveAt(evt.pageX)
        
      

//         scaleBar.ondragstart = () => false;
//     }

// function onMouseMove (evt) {
//     moveAt(evt.pageX)
// }


// // //touchmove it code doesnt work
// // // toggleMax.ontouchstart = function(evt) {
// // //     moveTouch(evt.targetTouches[0].clientX)

// // //     function onTouchMove (evt) {
// // //         moveTouch(evt.targetTouches[0].clientX)
// // //     }
    
// // //     document.addEventListener("touchmove", onTouchMove)

// // //     document.ontouchend =  function (){  
// // //         document.removeEventListener('touchmove', onTouchMove);
// // //         document.ontouchend = null;
// // //     }

// // //     toggleMax.ondragstart = () => false;
// // // }