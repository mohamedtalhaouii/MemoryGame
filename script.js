let moves = document.querySelector("#moves");
let totalPairs = document.querySelector("#total-pairs");
let cards = document.querySelectorAll(".card");
let cardFront = document.querySelector(".card-front");
let cardBack = document.querySelector(".card-back");
let difficulty = document.querySelector("#difficulty");
let gameBoard = document.querySelector(".game-board");
let resetBtn = document.querySelector("#reset-btn");

// Niveau de difficulte
difficulty.onchange = function(){
    for (let i = 0; i < difficulty.options.length; i++) {
        if (difficulty.options[i].selected) {
            totalPairs.textContent = difficulty.options[i].value;
            // Set number of moves to 0 for new start
            moves.textContent = 0;
            // change template of grid
            gameBoard.style.cssText = `
                grid-template-columns: repeat(${(difficulty.options[i].value)/2}, 1fr);
            `;
        }
    }   
};

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
    }
});

// Reset button
resetBtn.onclick = function() {
    moves.textContent = 0;
    for (let i = 0; i < cards.length; i++) {
        cards[i].style.cssText = `
            transform: rotateY(0);
        `;
    }
}