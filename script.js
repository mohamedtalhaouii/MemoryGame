// Noms des Binômes : Mohamed Talhaoui & Fatima Boumsahi
// Filière : Informatique et IA (S4) | 2024/2025 

let moves = document.querySelector("#moves");
let totalPairs = document.querySelector("#total-pairs");
let cards = document.querySelectorAll(".card");
let difficulty = document.querySelector("#difficulty");
let gameBoard = document.querySelector(".game-board");


// Difficulte
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

// Mouvements 
cards.forEach(card => {
    card.onclick = function(){
        moves.textContent++;
    }
});