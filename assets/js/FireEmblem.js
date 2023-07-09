// Sélectionner toutes les cartes
const cards = document.querySelectorAll(".card");

// Compter le nombre de paires de cartes assorties
let matched = 0;

// Variables pour stocker les deux cartes retournées à chaque tour
let cardOne, cardTwo;

// Indicateur pour désactiver le jeu lorsqu'il est en cours de traitement
let disableDeck = false;

// Fonction appelée lorsqu'une carte est retournée
function flipCard({target: clickedCard}) {
    // Vérifier si le jeu est actif et si la carte cliquée est différente de la première carte retournée
    if(cardOne !== clickedCard && !disableDeck) {
        // Ajouter la classe "flip" pour retourner visuellement la carte cliquée
        clickedCard.classList.add("flip");

        // Vérifier si c'est la première carte retournée
        if(!cardOne) {
            return cardOne = clickedCard;
        }

        // Assigner la deuxième carte retournée
        cardTwo = clickedCard;

        // Désactiver le jeu pendant le traitement des cartes
        disableDeck = true;

        // Récupérer les chemins d'accès des images des deux cartes
        let cardOneImg = cardOne.querySelector(".back-view img").src,
        cardTwoImg = cardTwo.querySelector(".back-view img").src;

        // Appeler la fonction pour comparer les cartes retournées
        matchCards(cardOneImg, cardTwoImg);
    }
}

// Fonction pour comparer les deux cartes retournées
function matchCards(img1, img2) {
    // Vérifier si les images des deux cartes sont identiques
    if(img1 === img2) {
        // Incrémenter le compteur de paires assorties
        matched++;
// console.log(cardOne, cardTwo)
// cardOne.classList.add("green");
// cardTwo.classList.add("green");
// console.log(cardOne, cardTwo)

        // Vérifier si toutes les paires ont été trouvées
        if(matched == 8) {
            // Attendre 1 seconde, puis mélanger les cartes
            setTimeout(() => {
                return shuffleCard();
            }, 1000);
        }

        // Supprimer les écouteurs d'événements du clic pour les deux cartes assorties
        cardOne.removeEventListener("click", flipCard);
        cardTwo.removeEventListener("click", flipCard);

        // Réinitialiser les variables cardOne et cardTwo
        cardOne = cardTwo = "";

        // Réactiver le jeu
        return disableDeck = false;
    }

    // Si les images des deux cartes sont différentes
    // Appliquer une animation de secousse aux deux cartes
    setTimeout(() => {
        cardOne.classList.add("shake");
        cardTwo.classList.add("shake");
    }, 400);

    // Après un délai, supprimer les classes "shake" et "flip" pour réinitialiser les cartes
    setTimeout(() => {
        cardOne.classList.remove("shake", "flip");
        cardTwo.classList.remove("shake", "flip");
        cardOne = cardTwo = "";

        // Réactiver le jeu
        disableDeck = false;
    }, 1200);
}

// Fonction pour mélanger les cartes et les préparer pour une nouvelle partie
function shuffleCard() {
    // Réinitialiser le compteur de paires assorties et l'état du jeu
    matched = 0;
    disableDeck = false;
    cardOne = cardTwo = "";

    // Tableau avec les numéros des cartes (deux fois chaque numéro pour avoir des paires)
    let arr = [1, 2, 3, 4, 5, 6, 7, 8, 1, 2, 3, 4, 5, 6, 7, 8];

    // Mélanger le tableau de manière aléatoire
    arr.sort(() => Math.random() > 0.5 ? 1 : -1);

    // Parcourir toutes les cartes et effectuer les actions suivantes
    cards.forEach((card, i) => {
        // Réinitialiser l'état des cartes en supprimant la classe "flip"
        card.classList.remove("flip");

        // Récupérer l'élément img dans chaque carte
        let imgTag = card.querySelector(".back-view img");

        // Assigner le chemin d'accès à l'image correspondante en fonction du numéro de carte dans le tableau mélangé
        imgTag.src = `/assets/img/Games/FireEmblem/${arr[i]}.png`;

        // Ajouter un écouteur d'événements pour chaque carte pour appeler la fonction flipCard lorsqu'elle est cliquée
        card.addEventListener("click", flipCard);
    });
}

// Appeler la fonction shuffleCard pour mélanger les cartes et les préparer pour une nouvelle partie
shuffleCard();

// Ajouter un écouteur d'événements pour chaque carte pour appeler la fonction flipCard lorsqu'elle est cliquée
cards.forEach(card => {
    card.addEventListener("click", flipCard);
});
