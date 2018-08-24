//Game Constructor
function Game() {
    this.gameLevels = [
        ["Cow", "Cat", "Moth", "Crow", "Trap", "Wack", "Lake", "Rip", "Lack", "Reap"], //Easy Words
        ["Turtle", "Heroku", "Missile", "Racket", "Rocket", "Trippy", "Roland", "Marker", "Spacey", "Lemonade"], //Intermediate Words
        ["Jazz", "Origami", "Awkward", "Crypt", "Dwarves", "Fjord", "Kiosk", "Ostracize", "Queue", "Zombie"] //Hard Words
    ];
    this.level = [];
    this.difficulty = 0;
    this.word = "";
    this.guessCount = 0;
    this.guessLimit = 0;
    this.guessList = "";
    this.answerDisplay = "";
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
        this.word = getWord.text.toLowerCase();
        this.answerDisplay = Array(this.word.length + 1).join("_");
    };

    this.makeGuess = function (letter) {
        let answer = this.word.split("");
        let display = this.answerDisplay.split("");
        letter = letter.toLowerCase();

        //Determine if the letter is part of the word or not.
        if (this.word.indexOf(letter) >= 0) {
            for (i = 0; i < answer.length; i++) {
                if (letter === answer[i]) {
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
        } else if (this.guessCount === this.guessLimit) {
            this.losses++;
        }
    }
}

//This function builds the game display form the game object.
function buildGameDisplay() {
    document.getElementById("answer-display").textContent = game.answerDisplay;
    document.getElementById("guess-display").textContent = "None!";
}

function updateScore() {
    document.getElementById("wins").textContent = game.wins;
    document.getElementById("losses").textContent = game.losses;
}

//Event listener for keystrokes.
window.onkeyup = function (e) {

    //We only want to process for alpha characters
    if (e.key.match(/^[a-zA-Z]\b/)) {
        game.makeGuess(e.key);
        document.getElementById("answer-display").textContent = game.answerDisplay;
        if (game.guessList) {
            document.getElementById("guess-display").textContent = game.guessList;
        }
        updateScore();
    }
};

// });

//Event listener for radio buttons
var difficulties = document.querySelectorAll(".diffButton");
difficulties.forEach(function (difficulty, difficultyIndex) {
    // difficulty.addEventListener("click", function () {
    difficulty.click = function () {
        if (difficultyIndex !== game.difficulty) {
            game.setDifficulty(difficultyIndex);
            buildGameDisplay();
        }
    };
});

//Build our game
var game = new Game();
game.setLevel(game.difficulty);
buildGameDisplay();

//Select the first radio button by default.
difficulties[0].click();