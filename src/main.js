import "./style.scss"

const toggleMin = document.querySelector(".toggle-min")
const toggleMax = document.querySelector(".toggle-max")
const widthField = document.querySelector(".field")
const greenBar = document.querySelector(".bar")
const scaleBar = document.querySelector(".scale")
const inputToggle = document.querySelector("#toggleTwo")

//min and max value input
const inputMinValue = document.querySelector("#minValue")
const inputMaxValue = document.querySelector("#maxValue")
const barMinValue = document.querySelector(".progress-bar-min-value")
const barMaxValue = document.querySelector(".progress-bar-max-value")

barMinValue.innerText = inputMinValue.value
inputMinValue.addEventListener("input", function() {
    if (+inputMinValue.value < +inputMaxValue.value) {
        barMinValue.innerText = inputMinValue.value
    }
})

barMaxValue.innerText = inputMaxValue.value
inputMaxValue.addEventListener("input", function() {
    barMaxValue.innerText = inputMaxValue.value
})


//add second toggle
inputToggle.addEventListener("click", function(){
    toggleMin.classList.toggle("active")

    // move greenBar and toggleMin
    // function moveAtMin(pageX) {
    //     const fieldRect = widthField.getBoundingClientRect().left;

    //     toggleMin.style.left = pageX - fieldRect - toggleMax.offsetWidth / 2 + "px";
    //     greenBar.style.width = pageX - fieldRect - toggleMax.offsetWidth / 2 + "px";

    //     const widthPaddingContainer = widthField.offsetWidth;
    //     if (+greenBar.style.width.replace("px", "") > widthPaddingContainer) {
    //         greenBar.style.width = widthPaddingContainer + "px"
    //     } 
    //     if (+greenBar.style.width.replace("px", "") < 0) {
    //         greenBar.style.width = 0 + "px"
    //     } 
    //     if (+toggleMax.style.left.replace("px", "") > widthPaddingContainer) {
    //         toggleMax.style.left = widthPaddingContainer - toggleMax.offsetWidth + "px" 
    //     }
    //     if (+toggleMax.style.left.replace("px", "") < 0) {
    //         toggleMax.style.left = 0 + "px" 
    //     }
    // }

    // toggleMin.onmousedown = function(evt) {
    //     moveAtMin(evt.pageX)

    //     function onMouseMove (evt) {
    //         moveAtMin(evt.pageX)
    //     }
        
    //     document.addEventListener("mousemove", onMouseMove)

    //     document.onmouseup = function () {
    //         document.removeEventListener('mousemove', onMouseMove);
    //         document.onmouseup = null;
    //     }

    //     toggleMin.ondragstart = function () {
    //         return false
    //     } 
    // }

})

//move greenBar and toggleMax
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

//move touch
function moveTouch(clientX) {
    const fieldRect = widthField.getBoundingClientRect().left;
    toggleMax.style.left = clientX - fieldRect - toggleMax.offsetWidth / 2 + "px";
    greenBar.style.width = clientX - fieldRect - toggleMax.offsetWidth / 2 + "px";

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

//click to scaleBar
scaleBar.onmousedown = function(evt) {
    moveAt(evt.pageX)
    function onMouseMove (evt) {
        moveAt(evt.pageX)
    }
    
    document.addEventListener("mousemove", onMouseMove)

    document.onmouseup = function () {
        document.removeEventListener('mousemove', onMouseMove);
        document.onmouseup = null;
    }

    scaleBar.ondragstart = function () {
        return false
    } 
}

//mousemove
toggleMax.onmousedown = function(evt) {
    moveAt(evt.pageX)

    // function onMouseMove (evt) {
    //     moveAt(evt.pageX)
    // }
    
    // document.addEventListener("mousemove", onMouseMove)

    // document.onmouseup = function () {
    //     document.removeEventListener('mousemove', onMouseMove);
    //     document.onmouseup = null;
    // }

    toggleMax.ondragstart = function () {
        return false
    } 
}

//touchmove it code doesnt work
toggleMax.ontouchstart = function(evt) {
    toggleMax.style.transform = "scale(1.1)"

    moveTouch(evt.targetTouches[0].clientX)

    function onTouchMove (evt) {
        moveTouch(evt.targetTouches[0].clientX)
    }
    
    document.addEventListener("touchmove", onTouchMove)

    document.ontouchend =  function (){  
        document.removeEventListener('touchmove', onTouchMove);
        toggleMax.style.transform = "scale(1)"
        document.ontouchend = null;
    }

    toggleMax.ondragstart = function () {
        return false
    } 
}
