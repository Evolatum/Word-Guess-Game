// Global Variables
const sound = {
    win : document.getElementById("winSound"),
    lose : document.getElementById("loseSound"),
    right : document.getElementById("rightLetterSound"),
    wrong : document.getElementById("wrongLetterSound"),
    invalid : document.getElementById("invalidSound")};

var wordEngine = {
    wins : 0,
    remainingGuesses : 10,
    guessedLetters : "",
    secretWord : "",
    currentWord : "",
    words : ["balor", "banshee", "basilisk", "beholder", "chimera", "cockatrice", "cyclops", "doppelganger", "dragon", "drow", "elemental",
            "gargoyle", "ghost", "ghoul", "giant", "gnoll", "goblin", "harpy", "hydra", "imp", "kobold", "kraken",  "lich", "medusa",
            "mimic", "minotaur", "nightmare", "ogre", "orc", "ooze", "owlbear", "salamander", "satyr", "shadow", "skeleton", "spider", 
            "swarm", "treant", "troll", "unicorn", "vampire", "werewolf", "worg", "wyvern", "yeti", "zombie"],
    ids : {
        win : document.getElementById("idWins"),
        current : document.getElementById("idCurrent"),
        remaining : document.getElementById("idRemaining"),
        guessed : document.getElementById("idGuessed")
    },

    displayHTML : function(){
        wordEngine.ids.win.textContent = "Wins: " + wordEngine.wins;
        wordEngine.ids.current.textContent = "Current word: " + wordEngine.separateChars(wordEngine.currentWord);
        wordEngine.ids.remaining.textContent = "Remaining guesses: " + wordEngine.remainingGuesses;
        wordEngine.ids.guessed.textContent = "Letters guessed: " + wordEngine.separateChars(wordEngine.guessedLetters);
    },

    newWord : function(){
        //Selects new word
        wordEngine.secretWord = wordEngine.words[Math.floor(Math.random() * wordEngine.words.length)];
        console.log("Secret word: " + wordEngine.secretWord);
        //Reinitialize variables
        wordEngine.remainingGuesses = 10;
        wordEngine.guessedLetters = "";
        wordEngine.currentWord = "";
        //Sets current word to length of secret word
        for(let i = 0 ; i < wordEngine.secretWord.length ; i++){
            wordEngine.currentWord += "_"
        }
        console.log("Current word: " + wordEngine.currentWord);
    },

    
    revealChars : function(secret, current, letter){
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
    },

    separateChars : function(chars){
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
    },

    play : function(key){
        if(isValid(key)){
            if(hasChar(wordEngine.secretWord, key)){
                if(hasChar(wordEngine.currentWord, key)){
                    console.log("Contains letter, already pressed");
                    sound.invalid.play();
                } else {
                    wordEngine.currentWord = wordEngine.revealChars(wordEngine.secretWord, wordEngine.currentWord, key);
                    if(wordEngine.currentWord === wordEngine.secretWord){
                        wordEngine.wins++;
                        console.log("YOU WIN");
                        sound.win.play();
                        wordEngine.newWord();
                    } else sound.right.play();
                }
            }
            else {
                if(hasChar(wordEngine.guessedLetters, key)){
                    console.log("Doesn't contain letter, already pressed");
                    sound.invalid.play();
                } else {
                    wordEngine.remainingGuesses--;
                    wordEngine.guessedLetters += key;
                    if(wordEngine.remainingGuesses === 0){
                        console.log("YOU LOST");
                        sound.lose.play();
                        wordEngine.newWord();
                    } else sound.wrong.play();
                }
            }
        } else{
            console.log("Unvalid key pressed");
            sound.invalid.play();
        } 
    }

}

//Initialize secret and current words, and HTML
wordEngine.newWord();
wordEngine.displayHTML();


//Key Press
document.onkeyup = function(event) 
{
    // Calls game engine with key pressed
    console.log("Key pressed: " + event.key.toLowerCase());
    wordEngine.play(event.key.toLowerCase());
    wordEngine.displayHTML();
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