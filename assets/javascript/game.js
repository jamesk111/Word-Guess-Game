//Polyfill for forEach on NodeList
if (!NodeList.prototype.forEach) {
    NodeList.prototype.forEach = Array.prototype.forEach;
}

//Game Constructor
function Game() {
    this.gameLevels = [
        ["Labrador", "Pug", "Boxer", "Husky", "Beagle", "Collie", "Chihuahua", "Dalmatian", "Bulldog", "Poodle"], //Easy Words
        ["Newfoundland", "Terrier", "Pointer", "Greyhound", "Rocket", "Rottweiler", "Mastiff", "Bloodhound", "Spaniel", "Bullmastiff"], //Intermediate Words
        ["Akita", "Affenpinscher", "Beauceron", "Briard", "Combai", "Cursinu", "Kaikadi", "Jagdterrier", "Eurasier", "Hygenhund"] //Hard Words
    ];
    this.level = [];
    this.difficulty = 0;
    this.word = "";
    this.guessCount = 0;
    this.guessLimit = 0;
    this.guessList = "";
    this.answerDisplay = "";
    this.outcome = "";
    this.wins = 0;
    this.losses = 0;

    this.setDifficulty = function (difficulty) {
        if (difficulty <= this.gameLevels.length) {
            this.difficulty = difficulty;
            this.setLevel(difficulty);
        }
    };

    this.setLevel = function (difficulty) {
        let words = [];
        for (i = 0; i < this.gameLevels[difficulty].length; i++) {
            let wordEntry = {};
            wordEntry.text = this.gameLevels[difficulty][i];
            wordEntry.guessLimit = this.gameLevels[difficulty][i].length;
            words.push(wordEntry);
        }
        this.level = words;
        this.setWord();
    };

    this.setWord = function () {
        let getWord = this.level[Math.floor(Math.random() * this.level.length)];
        this.guessLimit = getWord.guessLimit;
        this.guessCount = 0;
        this.guessList = "";
        this.outcome = "";
        this.word = getWord.text.toLowerCase();
        this.answerDisplay = Array(this.word.length + 1).join("_");
    };

    this.makeGuess = function (letter) {
        // let answer = this.word.split("");
        let display = this.answerDisplay.split("");
        letter = letter.toLowerCase();

        //Get out if we're already finished with the current game.
        if (!this.outcome) {

            //Determine if the letter is part of the word or not.
            if (this.word.indexOf(letter) >= 0) {
                for (i = 0; i < this.word.length; i++) {
                    if (letter === this.word[i]) {
                        display[i] = letter.toUpperCase();
                    }
                }
            } else if (this.guessList.indexOf(letter.toUpperCase()) < 0) {
                this.guessCount++;
                this.guessList += letter.toUpperCase();
            }

            //Update the answer display
            this.answerDisplay = display.join("");

            //Did the player win/lose?
            if (this.answerDisplay.toLowerCase() === this.word) {
                this.wins++;
                this.outcome = "win";
            } else if (this.guessCount === this.guessLimit) {
                this.losses++;
                this.outcome = "lose";
            }
        }
    }
}

//Lets add a new function using the prototype
Game.prototype.giveUp = function () {
    this.losses++;
    this.outcome = "lose";
    this.answerDisplay = this.word.toUpperCase();
}

var game = new Game();

//This function builds the game display form the game object.
function buildGameDisplay() {
    document.getElementById("answer-display").textContent = game.answerDisplay;
    document.getElementById("answer-display").style.color = "unset";
    document.getElementById("guess-display").textContent = "None!";
    document.getElementById("guess-count").textContent = "0";
    document.getElementById("guess-limit").textContent = game.guessLimit;
}

//This function updates the scores on the screen.
function updateScore() {
    document.getElementById("wins").textContent = game.wins;
    document.getElementById("losses").textContent = game.losses;
}

//Build the game
function buildGame() {
    game.setLevel(game.difficulty);
    buildGameDisplay();
    difficulties[0].click();
}

//Event listener for keystrokes.
document.addEventListener("keyup", function (e) {

    //Check if we're starting the game
    if (document.getElementById("start").style.display !== "none") {
        buildGame();
        document.getElementById("start").style.display = "none"
        document.getElementById("game-container").style.visibility = "visible";
        document.getElementById("game-container").style.animationPlayState = "running";
        return;
    }

    //We only want to process for alpha characters
    if (e.key.match(/^[a-zA-Z]\b/)) {
        game.makeGuess(e.key);
        document.getElementById("answer-display").textContent = game.answerDisplay;
        if (game.guessList) {
            document.getElementById("guess-display").textContent = game.guessList;
        }
        document.getElementById("guess-count").textContent = game.guessCount;
        if (game.outcome) {
            updateScore();
            game.setWord();
            buildGameDisplay();
        }
    }

});

//Event listener for radio buttons
var difficulties = document.querySelectorAll(".diffButton");
difficulties.forEach(function (difficulty, difficultyIndex) {
    difficulty.addEventListener("click", function () {
        if (difficultyIndex !== game.difficulty) {
            game.setDifficulty(difficultyIndex);
            buildGameDisplay();
        }
    });
});

//Game Buttons (Next Word / Give Up)
var gameButton = document.querySelectorAll(".action-btn");
gameButton.forEach(function (btn) {
    btn.addEventListener("click", function () {
        if (btn.id === "give-up") {
            game.giveUp();
            updateScore();
            document.getElementById("answer-display").textContent = game.word.toUpperCase();
            document.getElementById("answer-display").style.color = "red";
        } else if (btn.id === "next-word") {
            if (!game.outcome) {
                game.giveUp();
                updateScore();
            }
            game.setWord();
            buildGameDisplay();
        }
    });
});

//Event listener for start game button
document.getElementById("start-button").addEventListener("click", function () {
    buildGame();
    document.getElementById("start").style.display = "none"
    document.getElementById("game-container").style.visibility = "visible";
    document.getElementById("game-container").style.animationPlayState = "running";
});