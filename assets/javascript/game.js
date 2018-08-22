//Initialize
var wordArray = [
    ["Cow", "Cat", "Moth", "Crow", "Trap", "Wack", "Lake", "Rip", "Lack", "Reap"], //Easy Words
    ["Turtle", "Heroku", "Missile", "Racket", "Rocket", "Trippy", "Roland", "Marker", "Spacey", "Lemonade"], //Intermediate Words
    ["Jazz", "Origami", "Awkward", "Crypt", "Dwarves", "Fjord", "Kiosk", "Ostracize", "Queue", "Zombie"] //Hard Words
];

var game = {

    gameWords: [],

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
    }
};

window.onload = function () {
    game.gameLevels = wordArray;
    // document.getElementById("easy").addEventListener("change", game.setDifficulty(0));
    // document.getElementById("intermediate").addEventListener("change", game.setDifficulty(1));
    // document.getElementById("hard").addEventListener("change", game.setDifficulty(2));
    // var difficulty = document.getElementById("difficulty-wrapper");
    // for (i = 0; i < difficulty.length; i++) {
    //     difficulty.onclick
    // }
    game.setDifficulty(0);
};