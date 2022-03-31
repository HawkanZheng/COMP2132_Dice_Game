let userDie1Img = document.getElementById("userDie1");
let userDie2Img = document.getElementById("userDie2");
let cpuDie1Img = document.getElementById("cpuDie1");
let cpuDie2Img = document.getElementById("cpuDie2");

let userScoreDisplay = document.getElementById("userScore");
let cpuScoreDisplay = document.getElementById("cpuScore");
let userRoundScoreDisplay = document.getElementById("userRound");
let cpuRoundScoreDisplay = document.getElementById("cpuRound");
let gameResult = document.getElementById("gameResult")
const rollBtn = document.getElementById("roll");
const newGame = document.getElementById("newGame");

let userDie1;
let userDie2;
let cpuDie1;
let cpuDie2;

let userScore;
let cpuScore;
let userRoundScore;
let cpuRoundScore;

let round;

class Die {
    constructor() {
        this.number = 0; // default 0
    }
    
    roll_die() {
        this.number = Math.floor(Math.random() * 6 + 1);
    }
}


function roll_dice() {
    userDie1.roll_die();
    userDie2.roll_die();
    cpuDie1.roll_die();
    cpuDie2.roll_die();
}

function show_dice() {
    userDie1Img.style.visibility = "visible";
    userDie2Img.style.visibility = "visible";
    cpuDie1Img.style.visibility = "visible";
    cpuDie2Img.style.visibility = "visible";
}

function display_score() {
    userScoreDisplay.innerHTML  = `User Score: ${userScore}`;
    cpuScoreDisplay.innerHTML  = `CPU Score: ${cpuScore}`;
    userRoundScoreDisplay.innerHTML  = `Round Score: ${userRoundScore}`;
    cpuRoundScoreDisplay.innerHTML  = `Round Score: ${cpuRoundScore}`;
}

function new_game() {
    userDie1Img.style.visibility = "hidden";
    userDie2Img.style.visibility = "hidden";
    cpuDie1Img.style.visibility = "hidden";
    cpuDie2Img.style.visibility = "hidden";

    // initialize die
    userDie1 = new Die();
    userDie2  = new Die();
    cpuDie1  = new Die();
    cpuDie2  = new Die();

    round = 1;

    userScore = 0;
    cpuScore = 0;
    userRoundScore = 0;
    cpuRoundScore = 0;
    display_score();

    rollBtn.disabled = false;

    gameResult.innerHTML = "";
}

function end_game() {
    if (userScore > cpuScore) {
        endGameMessage = "You Win!";
        gameResult.style.color = "green";
    } else if (userScore === cpuScore) {
        endGameMessage = "Tie Game."
        gameResult.style.color = "black";
    } else {
        endGameMessage = "You Loose.";
        gameResult.style.color = "red";
    }
    rollBtn.disabled = true;
    
    $("#gameResult").hide()
    gameResult.innerHTML = endGameMessage;
    $("#gameResult").fadeIn();
    
}

function calc_score(roll1, roll2) {
    if (roll1 === 1 || roll2 === 1) {
        return 0;
    } else if(roll1 === roll2) {
        return (roll1 + roll2) * 2;
    } else {
        return roll1 + roll2;
    }
}


// Button handlers
rollBtn.addEventListener("click", function () {
    roll_dice();
    userRoundScore = calc_score(userDie1.number, userDie2.number);
    cpuRoundScore = calc_score(cpuDie1.number, cpuDie2.number);
    userScore += userRoundScore;
    cpuScore += cpuRoundScore;
    userDie1Img.src = `images/${userDie1.number}-dice.png`
    userDie2Img.src = `images/${userDie2.number}-dice.png`
    cpuDie1Img.src = `images/${cpuDie1.number}-dice.png`
    cpuDie2Img.src = `images/${cpuDie2.number}-dice.png`
    
    show_dice();
    display_score();
    
    round++;
    if (round > 3) {
        end_game();
    }
});

newGame.addEventListener("click", new_game);

//Start
new_game()

