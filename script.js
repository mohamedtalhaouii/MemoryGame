let moves = document.querySelector("#moves");
let totalPairs = document.querySelector("#total-pairs");
let cards = document.querySelectorAll(".card");
let cardFront = document.querySelector(".card-front");
let cardBack = document.querySelector(".card-back");
let difficulty = document.querySelector("#difficulty");
let gameBoard = document.querySelector(".game-board");
let resetBtn = document.querySelector("#reset-btn");

const facile = [
    { command: "console.log()", reponse: "Affiche dans la console" },
    { command: "let", reponse: "Déclare une variable" },
    { command: "typeof", reponse: "Renvoie le type de la variable" },
    { command: "length", reponse: "Renvoie la longueur d'une chaîne ou d'un tableau" },
    { command: "[]", reponse: "Crée un tableau" },
    { command: "Boolean()", reponse: "Convertit en booléen" },
    { command: "+", reponse: "Concatène des chaînes" },
    { command: "-", reponse: "Effectue une soustraction" },
    { command: "==", reponse: "Compare l'égalité de valeurs" }
];
  
const intermediaire = [
    { command: "map()", reponse: "Applique une fonction à chaque élément" },
    { command: "split()", reponse: "Divise une chaîne en tableau" },
    { command: "in", reponse: "Vérifie l'existence d'une clé dans un objet" },
    { command: "Set", reponse: "Crée un ensemble unique" },
    { command: "filter()", reponse: "Filtre les éléments d'un tableau" },
    { command: "Math.max()", reponse: "Renvoie le plus grand nombre" },
    { command: "!!", reponse: "Convertit en booléen" },
    { command: "charAt()", reponse: "Renvoie un caractère à un index" },
    { command: "+=", reponse: "Ajoute et affecte à la variable" }
];
  
const difficile = [
    { command: "... (spread/rest)", reponse: "Décompose en éléments individuels" },
    { command: "()=>{}", reponse: "Crée une fonction fléchée" },
    { command: "Promise", reponse: "Représente une valeur future" },
    { command: "reduce()", reponse: "Réduit un tableau à une valeur" },
    { command: "Destructuration", reponse: "Extrait des valeurs d'objets ou tableaux" },
    { command: "`template literals`", reponse: "Crée des chaînes avec interpolation" },
    { command: "find()", reponse: "Trouve le premier élément correspondant" },
    { command: "let [a, , b]", reponse: "Déstructure un tableau" },
    { command: "function*", reponse: "Crée une fonction génératrice" }
];
  

// Start Screen
document.querySelector(".start-btn span").onclick = function(){
    document.querySelector(".start-btn").remove();
    flipAllCards();
}

// N9albo ga3 les cartes bach ichofhom siyed
function flipAllCards(){
    stopClicking(3000);
    setTimeout(() => {
        cards.forEach(card => {
            card.style.transform = 'rotateY(180deg)';
        });
    }, 200);
    setTimeout(() => {
        cards.forEach(card => {
            card.style.transform = 'rotateY(0deg)';
        });
    }, 3000);
}

gameBoardSetup();

// Niveau de difficulte
difficulty.onchange = function(){
    for (let i = 0; i < difficulty.options.length; i++) {
        if (difficulty.options[i].selected) {
            resetAll();
            gameBoardSetup();
            flipAllCards();
        }
    }
};


function gameBoardSetup() {
    // Bach fach ndir refrech may3tilich lkhawi f blasa dyal Mouvements
    sessionStorage.getItem("Mouvements") !== null ? moves.textContent = sessionStorage.getItem("Mouvements") : null;

    // N3amro les cartes dylna 3la hsab niveau li khtar siyed
    for (let i = 0; i < difficulty.options.length; i++) {
        if (difficulty.options[i].selected) {
            let selectedLevel;
            if (difficulty.options[i].value === "facile") {
                selectedLevel = facile;
            } else if (difficulty.options[i].value === "intermediaire") {
                selectedLevel = intermediaire;
            } else if (difficulty.options[i].value === "difficile") {
                selectedLevel = difficile;
            }
            for (let j = 0; j < cards.length; j++) {
                if (j % 2 === 0) {
                    cards[j].children[1].textContent = selectedLevel[j / 2].command;
                } else {
                    cards[j].children[1].textContent = selectedLevel[Math.floor(j / 2)].reponse;
                }
            }
        }
    }
}

// Order 
let cardsOrder = Array.from(Array(cards.length).keys());

shuffle(cardsOrder); // nkharb9o tartib dyal les cartes

cards.forEach((card, i) => {
    card.style.order = cardsOrder[i];
});

// shuffle function From StackOverFlow
function shuffle(array) {
    let currentIndex = array.length;
    while (currentIndex != 0) {
        let randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;
        [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
    }
}


// Rotation cardes effect
for (let i = 0; i < cards.length; i++) {
    cards[i].addEventListener("click", function(){
        cards[i].style.transform = 'rotateY(180deg)';
        flipedCard(cards[i]); // kolma clickina 3la chi carte n3iyto 3la had fonction
    })
}


function flipedCard(selectedCard){
    selectedCard.classList.add('is-flipped');

    // nfiltriw les cartes li fihom (is-flipped)
    let allSelectedCards = Array.from(cards).filter(selectedCard => selectedCard.classList.contains('is-flipped'));
    /* console.log(allSelectedCards[0]); */

    if (allSelectedCards.length === 2) {
        checkMatches(allSelectedCards[0], allSelectedCards[1]);
        stopClicking(1000);
    }
}


function checkMatches(firstCard, secondCard){
    movesCount();
    if (firstCard.children[1].getAttribute('value') === secondCard.children[1].getAttribute('value')) {
        firstCard.children[1].style.color = '#F2F2F7';
        secondCard.children[1].style.color = '#F2F2F7';

        firstCard.children[1].style.backgroundColor = 'var(--green)';
        secondCard.children[1].style.backgroundColor = 'var(--green)';

        firstCard.classList.remove('is-flipped'); // n7aydo (is-flipped) hit mab9inach ghan7tajoha
        secondCard.classList.remove('is-flipped');

        firstCard.classList.add('is-matched'); // nzido hadi bach nkhaliwha f ti9ar (sir chof f css oghatfhem)
        secondCard.classList.add('is-matched');
    } else {
        firstCard.children[1].style.backgroundColor = 'var(--red)';
        secondCard.children[1].style.backgroundColor = 'var(--red)';

        setTimeout(() => {
            firstCard.style.transform = 'rotateY(0)';
            secondCard.style.transform = 'rotateY(0)';

            firstCard.classList.remove('is-flipped');
            secondCard.classList.remove('is-flipped');

            setTimeout(() => {
                firstCard.children[1].style.backgroundColor = 'transparent';
                secondCard.children[1].style.backgroundColor = 'transparent';
            }, 300);

        }, 1000);
    }
}


function stopClicking(duration){
    gameBoard.classList.add('no-clicking');
    setTimeout(() => {
        gameBoard.classList.remove('no-clicking');
    }, duration);
}

// Nombres de Mouvements
function movesCount(){
    moves.textContent++;
    sessionStorage.setItem("Mouvements", moves.textContent);
}

// Reset button
resetBtn.onclick = function() {
    resetAll();
}

function resetAll(){
    sessionStorage.clear();
    moves.textContent = "0";
    for (let i = 0; i < cards.length; i++) {
        cards[i].style.transform = 'rotateY(0)';
    }
}