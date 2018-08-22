//Initialize
var difficultySelection = 1;

var wordArray = [
    ["Cow", "Cat", "Moth", "Crow", "Trap", "Wack", "Lake", "Rip", "Lack", "Reap"], //Easy Words
    ["Turtle", "Heroku", "Missile", "Racket", "Rocket", "Trippy", "Roland", "Marker", "Spacey", "Lemonade"], //Intermediate Words
    ["Jazz", "Origami", "Awkward", "Crypt", "Dwarves", "Fjord", "Kiosk", "Ostracize", "Queue", "Zombie"] //Hard Words
];

//Build our easy list
function buildWords(difficulty) {
    var words = [];
    for (i = 0; i < wordArray[difficulty - 1].length; i++) {
        let wordEntry = {};
        wordEntry.text = wordArray[difficulty - 1][i];
        wordEntry.guessLimit = wordArray[difficulty - 1][i].length;
        words.push(wordEntry);
    }
    return words;
}