/* ===============================
   SIMON SAYS – GAME LOGIC
================================ */

const buttonColours = ["red", "blue", "green", "yellow"];

let gamePattern = [];
let userClickedPattern = [];
let started = false;
let level = 0;

const levelTitle = document.getElementById("level-title");
const buttons = document.querySelectorAll(".btn");

/* ===============================
   START GAME
================================ */

document.addEventListener("keydown", () => {
    if (!started) {
        levelTitle.textContent = `Level ${level}`;
        nextSequence();
        started = true;
    }
});

/* ===============================
   BUTTON CLICKS
================================ */

buttons.forEach(button => {
    button.addEventListener("click", () => {
        if (!started) return;

        const userChosenColour = button.id;
        userClickedPattern.push(userChosenColour);

        playSound(userChosenColour);
        animatePress(userChosenColour);

        checkAnswer(userClickedPattern.length - 1);
    });
});

/* ===============================
   GAME LOGIC
================================ */

function checkAnswer(currentLevel) {
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {

        if (userClickedPattern.length === gamePattern.length) {
            setTimeout(nextSequence, 1000);
        }

    } else {
        playSound("wrong");
        document.body.classList.add("game-over");
        levelTitle.textContent = "Game Over, Press Any Key to Restart";

        setTimeout(() => {
            document.body.classList.remove("game-over");
        }, 200);

        startOver();
    }
}

function nextSequence() {
    userClickedPattern = [];
    level++;

    levelTitle.textContent = `Level ${level}`;

    const randomNumber = Math.floor(Math.random() * 4);
    const randomChosenColour = buttonColours[randomNumber];

    gamePattern.push(randomChosenColour);

    flashButton(randomChosenColour);
    playSound(randomChosenColour);
}

/* ===============================
   VISUAL & SOUND EFFECTS
================================ */

function flashButton(color) {
    const button = document.getElementById(color);

    button.classList.add("ring-active");

    setTimeout(() => {
        button.classList.remove("ring-active");
    }, 250);
}


function animatePress(color) {
    const button = document.getElementById(color);
    button.classList.add("pressed");

    setTimeout(() => {
        button.classList.remove("pressed");
    }, 100);
}

function playSound(name) {
    const audio = new Audio(`sounds/${name}.mp3`);
    audio.play();
}

/* ===============================
   RESET GAME
================================ */

function startOver() {
    level = 0;
    gamePattern = [];
    started = false;
}
