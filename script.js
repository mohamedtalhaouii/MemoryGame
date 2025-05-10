let moves = document.querySelector("#moves");
let matches = document.querySelector("#matches");
let cards = document.querySelectorAll(".card");
let cardFront = document.querySelector(".card-front");
let cardBack = document.querySelector(".card-back");
let difficulty = document.querySelector("#difficulty");
let gameBoard = document.querySelector(".game-board");
let resetBtn = document.querySelector("#reset-btn");
let wrongCount = document.querySelector("#wrong-count");

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
    { command: "document.querySelector()", reponse: "Sélectionne un élément DOM via un sélecteur CSS" },
    { command: "document.getElementById()", reponse: "Récupère un élément par son ID" },
    { command: "document.getElementsByClassName()", reponse: "Récupère des éléments par leur classe" },
    { command: "document.getElementsByTagName()", reponse: "Récupère des éléments par balise" },
    { command: "alert()", reponse: "Affiche une alerte" },
    { command: "alert()", reponse: "Affiche une alerte" },
    { command: "confirm()", reponse: "Affiche une boîte de confirmation" },
    { command: "prompt()", reponse: "Demande une saisie à l'utilisateur" },
    { command: "window.open()", reponse: "Ouvre une nouvelle fenêtre ou un nouvel onglet" }
];
  
const difficile = [
    { command: "split()", reponse: "Divise une chaîne en tableau" },
    { command: "()=>{}", reponse: "Crée une fonction fléchée" },
    { command: "Promise", reponse: "Représente une valeur future" },
    { command: "reduce()", reponse: "Réduit un tableau à une valeur" },
    { command: "charAt()", reponse: "Renvoie un caractère à un index donné" },
    { command: "map()", reponse: "Applique une fonction à chaque élément" },
    { command: "find()", reponse: "Trouve le premier élément correspondant" },
    { command: "filter()", reponse: "Filtre les éléments d'un tableau" },
    { command: "()=>{}", reponse: "Déclare une fonction fléchée" },
];


let musicGame = new Audio("Media/gameMusic.mp3");
musicGame.loop = true;
musicGame.volume = 0.04;

function restartMusicGame(){
    musicGame.currentTime = 0;
    musicGame.play();
}

// Start Screen
document.querySelector(".start-btn span").onclick = function(){
    document.querySelector(".start-btn").remove();
    musicGame.play();
    flipAllCards();
}

// Retourner toutes les cartes pour que le joueur les voie
function flipAllCards(){
    stopClicking(3000);
    setTimeout(() => {
        cards.forEach(card => {
            card.style.transform = 'rotateY(180deg)';
        });
    }, 500);
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
            setTimeout(() => {
                gameBoardSetup();
            }, 100);
            flipAllCards();
        }
    }
};


function gameBoardSetup() {
    // Remplir les cartes pour le niveau choisi
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

function shuffleOrder(cards){
    // on prend les indices de tableau cards
    let cardsOrder = Array.from(Array(cards.length).keys()); 
    // [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17]

    console.log(cardsOrder);
    // Melanger l'ordre des cartes
    shuffle(cardsOrder);

    // applique un ordre aleatoire à chaque carte
    cards.forEach((card, i) => {
        card.style.order = cardsOrder[i];
    });
}
// J'ai pris la fonction shuffle depuis StackOverflow :)
function shuffle(array) {
    let currentIndex = array.length;
    while (currentIndex != 0) {
        let randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;
        [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
    }
}
// appel la focntion pour melanger l'ordre des cartes
shuffleOrder(cards);

// Rotation cardes effect
for (let i = 0; i < cards.length; i++) {
    cards[i].addEventListener("click", function(){
        cards[i].style.transform = 'rotateY(180deg)';
        flipedCard(cards[i]); // a chaque clic sur une carte, on appelle cette fonction
    })
}

// cette fonction ajoute la classe "is-flipped" a chaque carte retournee
function flipedCard(selectedCard){
    selectedCard.classList.add('is-flipped');

    // Filtrer les cartes retournees pour ne garder que celles qui ont la classe "is-flipped"
    let allSelectedCards = Array.from(cards).filter(selectedCard => selectedCard.classList.contains('is-flipped'));

    // on recupere les deux cartes selectionnees
    if (allSelectedCards.length === 2) {
        checkMatches(allSelectedCards[0], allSelectedCards[1]);
        stopClicking(1000);
    }
}

// sound of a wrong answer
function wrongSound(){
    let wrong = new Audio("Media/wrong.mp3");
    wrong.play();
}
// sound of a right answer
function rightSound(){
    let right = new Audio("Media/right.mp3");
    right.play();
}

function checkMatches(firstCard, secondCard){
    movesCount(); // fonction pour incrementer le nombre de mouvement
    if (firstCard.children[1].getAttribute('value') === secondCard.children[1].getAttribute('value')) {
        matches.textContent++;
        // changer la couleur du texte en blanc
        firstCard.children[1].style.color = '#F2F2F7';
        secondCard.children[1].style.color = '#F2F2F7';

        // les cartes deviendront vertes lorsqu'elles sont Matches
        firstCard.children[1].style.backgroundColor = 'var(--green)';
        secondCard.children[1].style.backgroundColor = 'var(--green)';
        rightSound();
        
        // On supprime la classe "is-flipped" car elle n'est plus necessaire
        firstCard.classList.remove('is-flipped');
        secondCard.classList.remove('is-flipped');

        // Désactive le clic sur les cartes pour qu'elles restent visibles apres match (CSS)
        firstCard.classList.add('is-matched');
        secondCard.classList.add('is-matched');

        afficheResultat();
    } else {
        // si les cartes ne correspondent pas, on les colore en rouge
        firstCard.children[1].style.backgroundColor = 'var(--red)';
        secondCard.children[1].style.backgroundColor = 'var(--red)';
        wrongSound();

        // attendons 1 seconde avant de retourner les cartes
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

        // Incremente le nombre d'echecs
        wrongCount.textContent++;
        let GameOver = new Audio('Media/GameOver.mp3');
        if (wrongCount.textContent == 15) {
            setTimeout(() => {
                musicGame.pause();
                document.querySelector(".game-over").style.display = 'inline';
                setTimeout(() => {
                    GameOver.play();
                }, 500);
            }, 200);
        }
    }
}


function stopClicking(duration){
    // Desactive le clic sur la class de 'gameBoard'
    gameBoard.classList.add('no-clicking');
    // Desactive le clic sur les 'controles'
    document.querySelector(".controls").classList.add('no-clicking');
    setTimeout(() => {
        gameBoard.classList.remove('no-clicking');
        document.querySelector(".controls").classList.remove('no-clicking');
    }, duration);
}

// Nombres de Mouvements
function movesCount(){
    moves.textContent++;
    document.querySelector("#moves-count").textContent = moves.textContent;
}

// Reset button
resetBtn.onclick = function() {
    resetAll();
}

function resetAll(){
    moves.textContent = "0";
    wrongCount.textContent = "0";
    matches.textContent = "0";
    for (let i = 0; i < cards.length; i++) {
        cards[i].style.transform = 'rotateY(0)';
        cards[i].children[1].style.backgroundColor = 'var(--card-bg)';
        cards[i].children[1].style.color = '#000000';
        cards[i].classList.remove('is-matched');
        cards[i].classList.remove('is-flipped');
    }
    setTimeout(() => {
        // A chaque redemarrage du jeu, on melange les cartes
        shuffleOrder(cards);
        flipAllCards();
    }, 500);
}

// Rat dancing after finishing ;)
let restartBtn = document.querySelectorAll("#restart-btn");
let musicWin = new Audio('Media/RatMusic.mp3');
musicWin.loop = true;


restartBtn.forEach(restart => {
    restart.addEventListener("click", () => {
        musicWin.pause();
        restartMusicGame();
        document.querySelector(".rat-dancing").style.display = 'none';
        document.querySelector(".game-over").style.display = 'none';
        resetAll();
    })
});

function afficheResultat(){
    let isAllMatched = document.querySelectorAll(".card.is-matched");
    if (isAllMatched.length == cards.length) {
        musicGame.pause();
        setTimeout(() => {
            musicWin.play();
            document.querySelector(".rat-dancing").style.display = 'inline';
        }, 200);
    }
}