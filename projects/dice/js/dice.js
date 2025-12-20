/* =====================================================
   DICE ROLLER
===================================================== */

document.addEventListener("DOMContentLoaded", () => {

    const rollButton = document.querySelector(".buttonDice");
    rollButton.addEventListener("click", rollDice);

});

/* =====================================================
   CONSTANTES
===================================================== */

const MIN_VALUE = 1;
const MAX_VALUE = 6;
const DICE_IMAGE_PATH = "images";

/* =====================================================
   FUNÇÃO PRINCIPAL
===================================================== */

function rollDice() {

    const dice1 = generateRandomNumber();
    const dice2 = generateRandomNumber();

    updateDiceImages(dice1, dice2);
    updateResultText(dice1, dice2);
}

/* =====================================================
   FUNÇÕES AUXILIARES
===================================================== */

function generateRandomNumber() {
    return Math.floor(Math.random() * MAX_VALUE) + MIN_VALUE;
}

function updateDiceImages(dice1, dice2) {

    document.querySelector(".img1").src =
        `${DICE_IMAGE_PATH}/dice${dice1}.png`;

    document.querySelector(".img2").src =
        `${DICE_IMAGE_PATH}/dice${dice2}.png`;
}

function updateResultText(dice1, dice2) {

    const result = document.getElementById("result");

    if (dice1 > dice2) {
        result.textContent = "Player 1 Wins! 🎉";
    } else if (dice1 < dice2) {
        result.textContent = "Player 2 Wins! 🎉";
    } else {
        result.textContent = "Draw! 🤝";
    }
}
