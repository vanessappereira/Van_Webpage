function rollDice() {
    //Generate a random number between 1 and 6 
    const MIN_VALUE = 1
    const MAX_VALUE = 6
    var randomNumber1 = Math.floor(Math.random() * (MAX_VALUE - MIN_VALUE + 1)) + MIN_VALUE;
    var randomNumber2 = Math.floor(Math.random() * (MAX_VALUE - MIN_VALUE + 1)) + MIN_VALUE;

    //Use the random number to pick a random dice image and replace the image
    var randomImage1 = "./images/dice" + randomNumber1 + ".png";
    var randomImage2 = "./images/dice" + randomNumber2 + ".png";

    //Change the image source of the dice
    document.querySelector(".img1").setAttribute("src", randomImage1);
    document.querySelector(".img2").setAttribute("src", randomImage2);

    //Compare random numbers
    if (randomNumber1 > randomNumber2) {
        document.querySelector("h1").innerHTML = "Player 1 Wins!";
    } else if (randomNumber1 < randomNumber2) {
        document.querySelector("h1").innerHTML = "Player 2 Wins!";
    } else {
        document.querySelector("h1").innerHTML = "Draw!";
    }
}

