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
            resetAll();
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
        cards[i].children[0].style.cssText = `
            visibility: hidden;
            opacity: 0;
            transition: visibility 0s, opacity 0.5s linear;
        `;
        cards[i].children[1].style.cssText = `
            visibility: visible;
            opacity: 1;
        `;
        sessionStorage.setItem(`Card ${i}`, cards[i].style.cssText);
        sessionStorage.setItem(`Card Front ${i}`, cards[i].children[0].style.cssText);
        sessionStorage.setItem(`Card Back ${i}`, cards[i].children[1].style.cssText);
    })
    cards[i].style.cssText = sessionStorage.getItem(`Card ${i}`);
    cards[i].children[0].style.cssText = sessionStorage.getItem(`Card Front ${i}`);
    cards[i].children[1].style.cssText = sessionStorage.getItem(`Card Back ${i}`);
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
        cards[i].children[0].style.cssText = `
            visibility: visible;
            opacity: 1;
        `;
        cards[i].children[1].style.cssText = `
            visibility: hidden;
            opacity: 0;
            transition: visibility 0s, opacity 1s linear;
        `;
    }
}