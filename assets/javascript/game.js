// Global Variables
var idWins = document.getElementById("idWins");
var idCurrent = document.getElementById("idCurrent");
var idRemaining = document.getElementById("idRemaining");
var idGuessed = document.getElementById("idGuessed");
var wins = 0;
var remainingGuesses = 10;
var guessedLetters = "";
var secretWord = "";
var currentWord = "";
var words = ["balor", "banshee", "basilisk", "beholder", "chimera", "cockatrice", "cyclops", "doppelganger", "dragon", "drow", "elemental",
            "gargoyle", "ghost", "ghoul", "giant", "gnoll", "goblin", "harpy", "hydra", "imp", "kobold", "kraken",  "lich", "medusa",
            "mimic", "minotaur", "nightmare", "ogre", "orc", "ooze", "owlbear", "salamander", "satyr", "shadow", "skeleton", "spider", 
            "swarm", "treant", "troll", "unicorn", "vampire", "werewolf", "worg", "wyvern", "yeti", "zombie"];

// Randomly chooses a choice from the words array. This is the secret word.
newWord();

//
idWins.textContent = "Wins: " + wins;
idCurrent.textContent = "Current word: " + separateChars(currentWord);
idRemaining.textContent = "Remaining guesses: " + remainingGuesses;
idGuessed.textContent = "Letters guessed: " + separateChars(guessedLetters);

// This function is run whenever the user presses a key.
document.onkeyup = function(event) 
{
    // Determines which key was pressed.
    var keyPressed = event.key.toLowerCase();

    // Control logs
    console.log("Key pressed: " + keyPressed);

    if(isValid(keyPressed)){
        if(hasChar(secretWord, keyPressed)){
            currentWord = revealChars(secretWord, currentWord, keyPressed);
            if(currentWord === secretWord){
                wins++;
                console.log("YOU WIN");
                newWord();
            }
        }
        else {
            if(hasChar(guessedLetters, keyPressed)){
                console.log("Doesn't contain letter, already pressed");
            } else {
                remainingGuesses--;
                guessedLetters += keyPressed;
                if(remainingGuesses === 0){
                    console.log("YOU LOST");
                    newWord();
                }
            }
        }
    } else console.log("Unvalid key pressed");

    idWins.textContent = "Wins: " + wins;
    idCurrent.textContent = "Current word: " + separateChars(currentWord);
    idRemaining.textContent = "Remaining guesses: " + remainingGuesses;
    idGuessed.textContent = "Letters guessed: " + separateChars(guessedLetters);
}

function isValid(letter){
    const alphabet = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];

    for (let i = 0 ; i < alphabet.length ; i++){
        if(letter === alphabet[i]){
            return true;
        } 
    }
    return false;
}

function hasChar(word, letter){
    for(let i = 0 ; i < word.length ; i++){
        if(word[i] === letter){
            return true;
        }
    }
    return false;
}

function revealChars(secret, current, letter){
    let newWord = "";

    for(let i = 0 ; i < secret.length ; i++){
        if(secret[i] === letter && current[i] === "_"){
            newWord += letter;
        } else if(secret[i] !== letter && current[i] === "_"){
            newWord += "_";
        } else {
            newWord += current[i];
        }
    }

    return newWord;
}

function newWord(){
    secretWord = words[Math.floor(Math.random() * words.length)];
    console.log("Secret word: " + secretWord);

    remainingGuesses = 10;
    //Sets the remaining guesses to an amount equal to 4 + half the length of the secret word, rounded down
    //remainingGuesses = 4 + Math.floor(secretWord.length / 2);

    guessedLetters = "";
    currentWord = "";

    for(let i = 0 ; i < secretWord.length ; i++){
        currentWord += "_"
    }
    console.log("Current word: " + currentWord);
}

function separateChars(chars){
    let separated = "";
    if(chars.length === 1) {
        separated = chars.toUpperCase();
    } else if(chars.length > 1){
        separated = chars[0].toUpperCase()
        for(let i = 1 ; i < chars.length ; i++){
            separated += " " + chars[i].toUpperCase();
        }
    }
    return separated;
}