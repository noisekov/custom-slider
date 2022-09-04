import "./style.scss"

const toggleMin = document.querySelector(".toggle-min")
const toggleMax = document.querySelector(".toggle-max")
const widthField = document.querySelector(".range-controls")
const greenBar = document.querySelector(".bar")


toggleMax.onmousedown = function (evt) {
    toggleMax.style.transform = "scale(1.1)"
    
    function moveAt(pageX) {
        const widthPaddingContainer = widthField.offsetWidth;

        toggleMax.style.left = pageX - toggleMax.offsetWidth / 2 - evt.offsetX + "px";
        greenBar.style.width = pageX - toggleMax.offsetWidth / 2 - evt.offsetX + "px";

        if (+greenBar.style.width.replace("px", "") > widthPaddingContainer) {
            greenBar.style.width = widthPaddingContainer + "px"
        }
        if (+toggleMax.style.left.replace("px", "") > widthPaddingContainer) {
            toggleMax.style.left = widthPaddingContainer - toggleMax.offsetWidth + "px" 
        }
    }
    
    moveAt(evt.pageX)

    function onMouseMove (evt) {
        moveAt(evt.pageX)
    }
    
    document.addEventListener("mousemove", onMouseMove)

    // let toggleMaxPositionWhenClick = +toggleMax.style.left.replace("px", "")
    // greenBar.style.width = `${toggleMaxPositionWhenClick} - ${widthPaddingContainer}`;

    document.onmouseup = function () {
        document.removeEventListener('mousemove', onMouseMove);
        toggleMax.style.transform = "scale(1)"
        document.onmouseup = null;
    }

    toggleMax.ondragstart = function () {
        return false
    } 
}