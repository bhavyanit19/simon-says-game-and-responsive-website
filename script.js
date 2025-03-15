
let currstat = false; // game has not started
let mainbox = document.querySelector("#mainbox");
let pressanykey = document.querySelector("#command");
let body = document.querySelector("body");
let box = document.querySelectorAll(".sbox");
let level = 0;
let score = 0;
let clicks = 0;
let num = 0;

body.addEventListener("keydown", () => {
    if (currstat == false) {
        currstat = true;
        console.log("Game has started");
        compchoice = []; // Reset sequence when starting a new game
        score = 0;
        level = 0;
        compselectbox();
    }
});

let userchoice = [];
let compchoice = [];

function compselectbox() {
    level++; // Increment first
    pressanykey.innerText = `Level ${level}`;

    let randomidx = Math.floor(Math.random() * 4);
    compchoice.push(box[randomidx].id);
    console.log("Computer choice:", compchoice);
    compchoiceflash(randomidx);
}

function compchoiceflash(randomidx) {
    box[randomidx].classList.add("compchoiceflash");
    setTimeout(() => {
        box[randomidx].classList.remove("compchoiceflash");
    }, 250);
}

mainbox.addEventListener("click", (e) => {
    if (currstat == true) {
        if (e.target.classList.contains("sbox")) {
            userchoice.push(e.target.id);
            console.log("User choice:", userchoice);
            check();
        }
    }
});

function check() {
    let index = userchoice.length - 1; // Get the latest click index

    if (userchoice[index] !== compchoice[index]) {
        pressanykey.innerText = `YOU LOST: SCORE ${score}`;
        mainbox.style.backgroundColor = "red";
        currstat = false;
        level = 0;
        score = 0;
        clicks = 0;
        num = 0;
        compchoice = [];
        userchoice = [];
        return;
    }

    if (userchoice.length === compchoice.length) {
        score += 10;
        userchoice = []; // Reset user choices
        setTimeout(compselectbox, 500);
    }
}

