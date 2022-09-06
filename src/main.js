import "./style.scss"

const toggleMin = document.querySelector(".toggle-min")
const toggleMax = document.querySelector(".toggle-max")
const widthField = document.querySelector(".range-field")
const greenBar = document.querySelector(".bar")

toggleMax.onmousedown = function (evt) {
    toggleMax.style.transform = "scale(1.1)"

    moveAt(evt.pageX)

    function moveAt(pageX) {
        const fieldRect = widthField.getBoundingClientRect().left;

        toggleMax.style.left = pageX - fieldRect - toggleMax.offsetWidth / 2 + "px";
        greenBar.style.width = pageX - fieldRect - toggleMax.offsetWidth / 2 + "px";

        const widthPaddingContainer = widthField.offsetWidth;
        if (+greenBar.style.width.replace("px", "") > widthPaddingContainer) {
            greenBar.style.width = widthPaddingContainer + "px"
        } 
        if (+greenBar.style.width.replace("px", "") < 0) {
            greenBar.style.width = 0 + "px"
        } 
        if (+toggleMax.style.left.replace("px", "") > widthPaddingContainer) {
            toggleMax.style.left = widthPaddingContainer - toggleMax.offsetWidth + "px" 
        }
        if (+toggleMax.style.left.replace("px", "") < 0) {
            toggleMax.style.left = 0 + "px" 
        }
    }

    function onMouseMove (evt) {
        moveAt(evt.pageX)
    }
    
    document.addEventListener("mousemove", onMouseMove)

    document.onmouseup = function () {
        document.removeEventListener('mousemove', onMouseMove);
        toggleMax.style.transform = "scale(1)"
        document.onmouseup = null;
    }

    toggleMax.ondragstart = function () {
        return false
    } 
}