for (var i = 0; i < document.querySelectorAll(".drum").length; i++) {
    document.querySelectorAll(".drum")[i].addEventListener("click", function () {
        var buttonInnerHTML = this.innerHTML;
        makeSound(buttonInnerHTML);
        buttonAnimation(buttonInnerHTML);
    });
}

document.addEventListener("keydown", function (event) {
    makeSound(event.key);
    buttonAnimation(event.key);
});

function makeSound(key) {
    switch (key) {
        case "w":
            var tom1 = new Audio('public/sounds/drumKit/tom-1.mp3');
            tom1.play();
            break;
        case "a":
            var tom2 = new Audio('public/sounds/drumKit/tom-2.mp3');
            tom2.play();
            break;
        case "s":
            var tom3 = new Audio('public/sounds/drumKit/tom-3.mp3');
            tom3.play();
            break;
        case "d":
            var tom4 = new Audio('public/sounds/drumKit/tom-4.mp3');
            tom4.play();
            break;
        case "j":
            var crash = new Audio('public/sounds/drumKit/crash.mp3');
            crash.play();
            break;
        case "k":
            var kickBass = new Audio('public/sounds/drumKit/kick-bass.mp3');
            kickBass.play();
            break;
        case "l":
            var snare = new Audio('public/sounds/drumKit/snare.mp3');
            snare.play();
            break;
        default:
            break;
    }
}
function buttonAnimation(currentKey) {
    var activeButton = document.querySelector("." + currentKey);
    activeButton.classList.add("pressed");

    setTimeout(function () { activeButton.classList.remove("pressed") }, 100);
}