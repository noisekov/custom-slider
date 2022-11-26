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

//значения минимимум и максимум 
const barMinValue = document.querySelector(".progress-bar-min-value")
const barMaxValue = document.querySelector(".progress-bar-max-value")

//поле ввода значения Минимум
barMinValue.innerText = inputMinValue.value
inputMinValue.addEventListener("input", function() {
    if (+inputMinValue.value < +inputMaxValue.value) {
        barMinValue.innerText = inputMinValue.value
    }
})

//поле ввода значения Максимум
barMaxValue.innerText = inputMaxValue.value
inputMaxValue.addEventListener("input", function() {
    barMaxValue.innerText = inputMaxValue.value
})

//шкала со значением минимум
barMinValue.addEventListener("click", function() {
    moveAt(0)
    greenBar.style.width = 0
})

//шкала со значением максимум
barMaxValue.addEventListener("click", function() {
    toggleMax.style.transform = `translateX(${scaleBar.offsetWidth - toggleMax.offsetWidth + "px"})`;
    greenBar.style.width = scaleBar.offsetWidth + "px";
})

//add second toggle
inputToggle.addEventListener("click", function() {
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

    toggleMax.style.transform = `translateX(${pageX - fieldRect - toggleMax.offsetWidth / 2 + "px"})`;
    greenBar.style.width = pageX - fieldRect - toggleMax.offsetWidth / 2 + "px";

    const widthPaddingContainer = widthField.offsetWidth;
    if (+greenBar.style.width.replace("px", "") > widthPaddingContainer) {
        greenBar.style.width = widthPaddingContainer + "px"
    } 
    if (+greenBar.style.width.replace("px", "") < 0) {
        greenBar.style.width = 0 + "px"
    } 
    if (+toggleMax.style.transform.replace("translateX(", "").replace('px)','') > widthPaddingContainer) {
        toggleMax.style.transform = `translateX(${widthPaddingContainer - toggleMax.offsetWidth + "px"})`; 
    }
    if (+toggleMax.style.transform.replace("translateX(", "").replace('px)','') < 0) {
        toggleMax.style.transform = `translateX(${0 + "px"})`;
    }
}

//move touch
function moveTouch(clientX) {
    const fieldRect = widthField.getBoundingClientRect().left;
    
    toggleMax.style.transform = `translateX(${clientX - fieldRect - toggleMax.offsetWidth / 2 + "px"})`;
    greenBar.style.width = clientX - fieldRect - toggleMax.offsetWidth / 2 + "px";

    const widthPaddingContainer = widthField.offsetWidth;
    if (+greenBar.style.width.replace("px", "") > widthPaddingContainer) {
        greenBar.style.width = widthPaddingContainer + "px"
    } 
    if (+greenBar.style.width.replace("px", "") < 0) {
        greenBar.style.width = 0 + "px"
    } 
    if (+toggleMax.style.transform.replace("translateX(", "").replace('px)','') > widthPaddingContainer) {
        toggleMax.style.transform = `translateX(${widthPaddingContainer - toggleMax.offsetWidth + "px"})`; 
    }
    if (+toggleMax.style.transform.replace("translateX(", "").replace('px)','') < 0) {
        toggleMax.style.transform = `translateX(${0 + "px"})`; 
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

    toggleMax.ondragstart = function () {
        return false
    } 
}

//touchmove it code doesnt work
toggleMax.ontouchstart = function(evt) {
    moveTouch(evt.targetTouches[0].clientX)

    function onTouchMove (evt) {
        moveTouch(evt.targetTouches[0].clientX)
    }
    
    document.addEventListener("touchmove", onTouchMove)

    document.ontouchend =  function (){  
        document.removeEventListener('touchmove', onTouchMove);
        document.ontouchend = null;
    }

    toggleMax.ondragstart = function () {
        return false
    } 
}
