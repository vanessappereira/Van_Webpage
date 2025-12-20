/* =====================================================
   DRUM KIT – INTERAÇÃO E SOM
===================================================== */

document.addEventListener("DOMContentLoaded", () => {

    const drumButtons = document.querySelectorAll(".drum");

    /* ===============================
       CLICK EVENTS
    ================================ */
    drumButtons.forEach(button => {
        button.addEventListener("click", () => {
            const key = button.textContent.trim().toLowerCase();
            playSound(key);
            animateButton(key);
        });
    });

    /* ===============================
       KEYBOARD EVENTS
    ================================ */
    document.addEventListener("keydown", (event) => {
        const key = event.key.toLowerCase();
        playSound(key);
        animateButton(key);
    });

});

/* =====================================================
   SOUND CONTROLLER
===================================================== */

function playSound(key) {

    const sounds = {
        w: "tom-1.mp3",
        a: "tom-2.mp3",
        s: "tom-3.mp3",
        d: "tom-4.mp3",
        j: "crash.mp3",
        k: "kick-bass.mp3",
        l: "snare.mp3"
    };

    if (!sounds[key]) return;

    const audio = new Audio(`sounds/${sounds[key]}`);
    audio.play();
}

/* =====================================================
   BUTTON ANIMATION
===================================================== */

function animateButton(key) {

    const activeButton = document.querySelector(`.${key}`);
    if (!activeButton) return;

    activeButton.classList.add("pressed");

    setTimeout(() => {
        activeButton.classList.remove("pressed");
    }, 100);
}
