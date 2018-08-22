//Initialize
var wordArray = [
    ["Cow", "Cat", "Moth", "Crow", "Trap", "Wack", "Lake", "Rip", "Lack", "Reap"], //Easy Words
    ["Turtle", "Heroku", "Missile", "Racket", "Rocket", "Trippy", "Roland", "Marker", "Spacey", "Lemonade"], //Intermediate Words
    ["Jazz", "Origami", "Awkward", "Crypt", "Dwarves", "Fjord", "Kiosk", "Ostracize", "Queue", "Zombie"] //Hard Words
];

//Game Object
var game = {

    gameWords: [],

    currentDifficulty: 0,

    gameLevels: [],

    buildWords: function buildWords(difficulty, array) {
        let words = [];
        for (i = 0; i < array[difficulty].length; i++) {
            let wordEntry = {};
            wordEntry.text = array[difficulty][i];
            wordEntry.guessLimit = array[difficulty][i].length;
            words.push(wordEntry);
        }
        this.gameWords = words;
    },

    setDifficulty: function setDifficulty(difficulty) {
        this.buildWords(difficulty, this.gameLevels);
        this.currentDifficulty = difficulty;
    }
};

//Build our word levels into the game oject.
game.gameLevels = wordArray;

//jQuery for the Bootstrap Radio Buttons
$(document).ready(function () {

    //Set up the initial load state for the game
    $("#difficulty-wrapper .easy").button("toggle");
    game.setDifficulty(game.currentDifficulty);

    //Change when a difficulty is selected
    $("#difficulty-wrapper .btn").click(function () {
        if ($(".btn").index(this) !== game.currentDifficulty) {
            game.setDifficulty($(".btn").index(this));
        }
    });

});