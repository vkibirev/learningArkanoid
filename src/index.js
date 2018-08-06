let btn = document.querySelector("#btn");

let i = 3;
function clickHandler(event) {
    console.log("Click", event.currentTarget);
    event.stopPropagation();h       
};