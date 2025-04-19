let moves = document.querySelector("#moves");
let totalPairs = document.querySelector("#total-pairs");
let cards = document.querySelectorAll(".card");
let cardFront = document.querySelector(".card-front");
let cardBack = document.querySelector(".card-back");
let difficulty = document.querySelector("#difficulty");
let gameBoard = document.querySelector(".game-board");
let resetBtn = document.querySelector("#reset-btn");

// Start Screen
document.querySelector(".start-btn span").onclick = function(){
    document.querySelector(".start-btn").remove();
}

gameBoardSetup();

// Niveau de difficulte
difficulty.onchange = function(){
    for (let i = 0; i < difficulty.options.length; i++) {
        if (difficulty.options[i].selected) {
            resetAll();
            gameBoardSetup();
        }
    }
};

function gameBoardSetup() {
    for (let i = 0; i < difficulty.options.length; i++) {
        if (difficulty.options[i].selected) {
            
        }
    }
}

// Rotation cardes effect
for (let i = 0; i < cards.length; i++) {
    cards[i].addEventListener("click", function(){
        cards[i].style.cssText = `
            transform: rotateY(180deg);
        `;
    })
}


// Mouvements 
cards.forEach(card => {
    card.onclick = function(){
        moves.textContent++;
        sessionStorage.setItem("Mouvements", moves.textContent);
    }
    // Bach fach ndir refrech may3tilich lkhawi f blasa dyal Mouvements
    sessionStorage.getItem("Mouvements") !== null ? moves.textContent = sessionStorage.getItem("Mouvements") : null;
});



// Reset button
resetBtn.onclick = function() {
    resetAll();
}

function resetAll(){
    sessionStorage.clear();
    moves.textContent = "0";
    for (let i = 0; i < cards.length; i++) {
        cards[i].style.cssText = `
            transform: rotateY(0);
        `;
    }
}