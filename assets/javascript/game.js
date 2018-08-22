//Initialize
var wordArray = [
    ["Cow", "Cat", "Moth", "Crow", "Trap", "Wack", "Lake", "Rip", "Lack", "Reap"], //Easy Words
    ["Turtle", "Heroku", "Missile", "Racket", "Rocket", "Trippy", "Roland", "Marker", "Spacey", "Lemonade"], //Intermediate Words
    ["Jazz", "Origami", "Awkward", "Crypt", "Dwarves", "Fjord", "Kiosk", "Ostracize", "Queue", "Zombie"] //Hard Words
];

var gameWords;

function buildWords(difficulty) {
    let words = [];
    for (i = 0; i < wordArray[difficulty].length; i++) {
        let wordEntry = {};
        wordEntry.text = wordArray[difficulty][i];
        wordEntry.guessLimit = wordArray[difficulty][i].length;
        words.push(wordEntry);
    }
    return words;
}

function setDifficulty() {
    let difficulty = document.getElementsByName("difficulty");
    for (i = 0; i < difficulty.length; i++) {
        if (difficulty[i].checked) {
            gameWords = buildWords(i);
        }
    }
}

setDifficulty();