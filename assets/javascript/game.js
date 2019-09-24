// Global Variables
const sound = {
    win : document.getElementById("winSound"),
    lose : document.getElementById("loseSound"),
    right : document.getElementById("rightLetterSound"),
    wrong : document.getElementById("wrongLetterSound"),
    invalid : document.getElementById("invalidSound")
};

var wordEngine = {
    wins : 0,
    remainingGuesses : 10,
    guessedLetters : "",
    secretWord : 0,
    currentWord : "",
    pop: false,
    ids : {
        win : document.getElementById("idWins"),
        current : document.getElementById("idCurrent"),
        remaining : document.getElementById("idRemaining"),
        guessed : document.getElementById("idGuessed"),
        card : {
            main : document.getElementById("idCard"),
            img : document.getElementById("idCardImage"),
            title : document.getElementById("idCardTitle"),
            text : document.getElementById("idCardText"),
            link : document.getElementById("idCardLink"),
            back : document.getElementById("idPopUpDarken")
        }
    },
    
    galaxy : [
        {title: "sun", text: "Our very own star!", src: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b4/The_Sun_by_the_Atmospheric_Imaging_Assembly_of_NASA%27s_Solar_Dynamics_Observatory_-_20100819.jpg/628px-The_Sun_by_the_Atmospheric_Imaging_Assembly_of_NASA%27s_Solar_Dynamics_Observatory_-_20100819.jpg", link: "https://en.wikipedia.org/wiki/Sun"},
        {title: "moon", text: "It's a satellite!", src: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e1/FullMoon2010.jpg/631px-FullMoon2010.jpg", link:"https://en.wikipedia.org/wiki/Moon"},
        {title: "mercury", text: "Not to be mistaken for quicksilver!", src: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d9/Mercury_in_color_-_Prockter07-edit1.jpg/600px-Mercury_in_color_-_Prockter07-edit1.jpg", link:"https://en.wikipedia.org/wiki/Mercury_(planet)"},
        {title: "venus", text: "It's commong knowledge that all women come from here.", src: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/85/Venus_globe.jpg/600px-Venus_globe.jpg", link:"https://en.wikipedia.org/wiki/Venus"},
        {title: "earth", text: "You are here.", src: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/97/The_Earth_seen_from_Apollo_17.jpg/599px-The_Earth_seen_from_Apollo_17.jpg", link:"https://en.wikipedia.org/wiki/Earth"},
        {title: "mars", text: "Do I see a man in that picture?", src: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/02/OSIRIS_Mars_true_color.jpg/600px-OSIRIS_Mars_true_color.jpg", link:"https://en.wikipedia.org/wiki/Mars"},
        {title: "jupiter", text: "Named after the God of Lightning! (no, not Thor...)", src: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/71/PIA22946-Jupiter-RedSpot-JunoSpacecraft-20190212.jpg/600px-PIA22946-Jupiter-RedSpot-JunoSpacecraft-20190212.jpg", link:"https://en.wikipedia.org/wiki/Jupiter"},
        {title: "saturn", text: "If you like it, then you shoulda put a ring on it!", src: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/29/Saturn_Storm.jpg/600px-Saturn_Storm.jpg", link:"https://en.wikipedia.org/wiki/Saturn"},
        {title: "uranus", text: "Don't even say it...", src: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3d/Uranus2.jpg/600px-Uranus2.jpg", link:"https://en.wikipedia.org/wiki/Uranus"},
        {title: "neptune", text: "Obiously named after King Neptune from Spongebob Squarepants.", src: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/56/Neptune_Full.jpg/600px-Neptune_Full.jpg", link:"https://en.wikipedia.org/wiki/Neptune"},
        {title: "pluto", text: "Is it a planet? Pluto really wants to know...", src: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/ef/Pluto_in_True_Color_-_High-Res.jpg/600px-Pluto_in_True_Color_-_High-Res.jpg", link:"https://en.wikipedia.org/wiki/Pluto"},
        {title: "io", text: "Jupiter's favorite baby moon!", src: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7b/Io_highest_resolution_true_color.jpg/600px-Io_highest_resolution_true_color.jpg", link:"https://en.wikipedia.org/wiki/Io_(moon)"},
        {title: "europa", text: "Does that look like an upside down frying pan to you?", src: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e4/Europa-moon-with-margins.jpg/600px-Europa-moon-with-margins.jpg", link:"https://en.wikipedia.org/wiki/Europa_(moon)"},
        {title: "ganymede", text: "THE biggest moon in the solar system, and you better know it!", src: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f2/Ganymede_g1_true-edit1.jpg/600px-Ganymede_g1_true-edit1.jpg", link:"https://en.wikipedia.org/wiki/Ganymede_(moon)"},
        {title: "callisto", text: "Another of Zeus's victims...", src: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e9/Callisto.jpg/589px-Callisto.jpg", link: "https://en.wikipedia.org/wiki/Callisto_(moon)"},
        {title: "titan", text: "A picture was found of the three most beautiful sirens.", src: "https://upload.wikimedia.org/wikipedia/commons/4/45/Titan_in_true_color.jpg", link:"https://en.wikipedia.org/wiki/Titan_(moon)"},
        {title: "iapetus", text: "Sounds like a really good puppet maker.", src: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c9/Iapetus_as_seen_by_the_Cassini_probe_-_20071008.jpg/600px-Iapetus_as_seen_by_the_Cassini_probe_-_20071008.jpg", link:"https://en.wikipedia.org/wiki/Iapetus_(moon)"},
        {title: "rhea", text: "Looks like a moon, which it is...", src: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ab/PIA07763_Rhea_full_globe5.jpg/600px-PIA07763_Rhea_full_globe5.jpg", link:"https://en.wikipedia.org/wiki/Rhea_(moon)"},
        {title: "tethys", text: "Wife of oceanus. (Wait, is that the best trivia you got?)", src: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/bc/PIA18317-SaturnMoon-Tethys-Cassini-20150411.jpg/600px-PIA18317-SaturnMoon-Tethys-Cassini-20150411.jpg", link:"https://en.wikipedia.org/wiki/Tethys_(moon)"},
        {title: "dione", text: "Pronounced die-oh-knee, which sounds kinda sad...", src: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/42/Dione_in_natural_light.jpg/616px-Dione_in_natural_light.jpg", link:"https://en.wikipedia.org/wiki/Dione_(moon)"},
        {title: "pallas", text: "He doesn't like to be photographed.", src: "https://upload.wikimedia.org/wikipedia/commons/d/d4/Potw1749a_Pallas_crop.png", link:"https://en.wikipedia.org/wiki/2_Pallas"},
        {title: "juno", text: "... nothing John Snow!", src: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/ef/3Juno-LB1-apmag.jpg/734px-3Juno-LB1-apmag.jpg", link:"https://en.wikipedia.org/wiki/3_Juno"},
        {title: "vesta", text: "Really oddly shaped...", src: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/dc/Vesta_in_natural_color_%28cropped%29.jpg/800px-Vesta_in_natural_color_%28cropped%29.jpg", link:"https://en.wikipedia.org/wiki/4_Vesta"},
        {title: "ceres", text: "Kinda like a buckle.", src: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/76/Ceres_-_RC3_-_Haulani_Crater_%2822381131691%29_%28cropped%29.jpg/611px-Ceres_-_RC3_-_Haulani_Crater_%2822381131691%29_%28cropped%29.jpg", link:"https://en.wikipedia.org/wiki/Ceres_(dwarf_planet)"},
        {title: "andromeda", text: "My wife and I made an animated short with this name!", src: "https://upload.wikimedia.org/wikipedia/commons/5/57/M31bobo.jpg", link:"https://en.wikipedia.org/wiki/Andromeda_(constellation)"},
    ],

    displayHTML : function(){
        this.ids.win.textContent = "Wins: " + this.wins;
        this.ids.current.textContent = "Current word:  " + this.separateChars(this.currentWord);
        this.ids.remaining.textContent = "Remaining guesses: " + this.remainingGuesses;
        this.ids.guessed.textContent = "Letters guessed: " + this.separateChars(this.guessedLetters);
    },

    newWord : function(){
        //Selects new word
        this.secretWord = Math.floor(Math.random() * this.galaxy.length);
        console.log("Secret word: " + this.galaxy[this.secretWord].title);
        //Reinitialize variables
        this.remainingGuesses = 10;
        this.guessedLetters = "";   
        this.currentWord = "";
        //Sets current word to length of secret word
        for(let i = 0 ; i < this.galaxy[this.secretWord].title.length ; i++){
            this.currentWord += "_"
        }
        console.log("Current word: " + this.currentWord);
    },

    showCard : function(secret){
        wordEngine.pop = true;
        wordEngine.ids.card.main.style.display = "block";
        wordEngine.ids.card.back.style.display = "block";
        wordEngine.ids.card.img.src = wordEngine.galaxy[secret].src;
        wordEngine.ids.card.title.textContent = capitalize(wordEngine.galaxy[secret].title);
        wordEngine.ids.card.text.textContent = wordEngine.galaxy[secret].text;
        wordEngine.ids.card.link.href = wordEngine.galaxy[secret].link;
    },

    loseCard : function(){
        wordEngine.pop = true;
        wordEngine.ids.card.main.style.display = "block";
        wordEngine.ids.card.back.style.display = "block";
        wordEngine.ids.card.img.src = "https://i.redd.it/zxlbymzytbb21.jpg";
        wordEngine.ids.card.title.textContent = "You lost!";
        wordEngine.ids.card.text.textContent = "Try again...";
        wordEngine.ids.card.link.href = "https://www.psychologytoday.com/us/blog/coaching-and-parenting-young-athletes/201405/how-deal-the-agony-defeat";
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
            if(hasChar(this.galaxy[this.secretWord].title, key)){
                if(hasChar(this.currentWord, key)){
                    console.log("Contains letter, already pressed");
                    sound.invalid.play();
                } else {
                    this.currentWord = this.revealChars(this.galaxy[this.secretWord].title, this.currentWord, key);
                    if(this.currentWord === this.galaxy[this.secretWord].title){
                        this.wins++;
                        console.log("YOU WIN");
                        this.showCard(this.secretWord);
                        sound.win.play();
                        this.newWord();
                    } else sound.right.play();
                }
            }
            else {
                if(hasChar(this.guessedLetters, key)){
                    console.log("Doesn't contain letter, already pressed");
                    sound.invalid.play();
                } else {
                    this.remainingGuesses--;
                    this.guessedLetters += key;
                    if(this.remainingGuesses === 0){
                        console.log("YOU LOST");
                        this.loseCard();
                        sound.lose.play();
                        this.newWord();
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
    if(wordEngine.pop){
        console.log("Pop-up open, close to continue playing");
    } else{
        console.log("Key pressed: " + event.key.toLowerCase());
        wordEngine.play(event.key.toLowerCase());
        wordEngine.displayHTML();
    }
}

//Click
document.getElementById("closePopUp").addEventListener("click", function(){
    wordEngine.pop = false;
    wordEngine.ids.card.main.style.display = "none";
    wordEngine.ids.card.back.style.display = "none";
    console.log("Closed Pop-up");
});

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

function capitalize(word){
    return word[0].toUpperCase() + word.slice(1);
}