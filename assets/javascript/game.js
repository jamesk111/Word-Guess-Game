//Initialize
var wordArray = [
    ["Cow", "Cat", "Moth", "Crow", "Trap", "Wack", "Lake", "Rip", "Lack", "Reap"], //Easy Words
    ["Turtle", "Heroku", "Missile", "Racket", "Rocket", "Trippy", "Roland", "Marker", "Spacey", "Lemonade"], //Intermediate Words
    ["Jazz", "Origami", "Awkward", "Crypt", "Dwarves", "Fjord", "Kiosk", "Ostracize", "Queue", "Zombie"] //Hard Words
];

//Game Object
var game = {

    currentDifficulty: 0,
    currentWord: "",
    currentGuessCount: 0,
    answerDisplay: "",
    guessList: [],
    gameWords: [],
    gameLevels: [],

    buildWords: function buildWords(difficulty) {
        let words = [];
        for (i = 0; i < this.gameLevels[difficulty].length; i++) {
            let wordEntry = {};
            wordEntry.text = this.gameLevels[difficulty][i];
            wordEntry.guessLimit = this.gameLevels[difficulty][i].length;
            words.push(wordEntry);
        }
        this.gameWords = words;
    },

    setDifficulty: function setDifficulty(difficulty) {
        this.buildWords(difficulty);
        this.currentDifficulty = difficulty;
    },

    setWord: function setWord() {
        this.currentWord = this.gameWords[Math.floor(Math.random() * this.gameWords.length)].text;
        this.answerDisplay = Array(game.currentWord.length + 1).join("_");
    },

    makeGuess: function makeGuess() {

    }

};

//This function builds the game display form the game object.
function buildGameDisplay() {
    game.setWord();
    document.getElementById("answer-display").innerHTML = game.answerDisplay;
    document.getElementById("guess-display").innerHTML = "None!";
}

//Event listener for keystrokes.
window.addEventListener("keyup", function(e){

    //We only want to process for alpha characters
    if (e.key.match(/^[a-zA-Z]\b/)) {
        //dostuff
    }

});

//jQuery for the Bootstrap Radio Buttons
$(document).ready(function () {

    //Set up the initial load state for the game
    game.gameLevels = wordArray;
    $("#difficulty-wrapper .easy").button("toggle");
    game.setDifficulty(game.currentDifficulty);
    buildGameDisplay();

    //Change when a difficulty is selected
    $("#difficulty-wrapper .btn").click(function () {
        if ($(".btn").index(this) !== game.currentDifficulty) {
            game.setDifficulty($(".btn").index(this));
            buildGameDisplay();
        }
    });

});