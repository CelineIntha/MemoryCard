// Je recupère toutes les cartes
const cards = document.querySelectorAll(".cards")

let matchedCard = 0;
let cardOne, cardTwo;
let disableDeck = false;

// Fonction quand je retourne une carte
function flipCard(e) {
    // Cette ligne récupère l'élément sur lequel l'utilisateur a cliqué (la carte) à partir de l'objet d'événement "e" en utilisant la propriété "target".
    let clickedCard = e.target
    // L'élément est ensuite stocké dans la variable "clickedCard".
    // Cette condition vérifie si la carte cliquée (clickedCard) est différente de la première carte (cardOne). 
    // Cela permet d'éviter que l'utilisateur ne clique deux fois sur la même carte.
    if (clickedCard !== cardOne && !disableDeck) {
        clickedCard.classList.add("flip") // Si la condition précédente est vraie, on lui ajoute la classe flip
        if (!cardOne) {
            // Si la variable cardOne est vide (null, undefined ou évaluée à false), cela signifie que c'est le premier clic de l'utilisateur. Dans ce cas, la variable cardOne est définie avec la valeur de la carte cliquée et la fonction se termine avec l'instruction "return".
            return cardOne = clickedCard
        }
        // Si la variable cardOne est déjà définie, cela signifie que c'est le deuxième clic de l'utilisateur. La carte cliquée est alors stockée dans la variable cardTwo. 
        cardTwo = clickedCard;
        disableDeck = true;

        let cardOneImg = cardOne.querySelector(".back-view img").src,
            cardTwoImg = cardTwo.querySelector(".back-view img").src
        matchCards(cardOneImg, cardTwoImg)
    }
}

function matchCards(img1, img2) {
    // Si les cartes sont identiques0    
    if (img1 === img2) {
        matchedCard++;
        // 8 car cela voudra dire que l'utilisateur a reussi à retourner toutes les cartes
        if(matchedCard == 8) {
            setTimeout(()=>{
                return shuffleCard();
            }, 1200)
        }
        // On enlève les évènements
        cardOne.removeEventListener("click", flipCard)
        cardTwo.removeEventListener("click", flipCard)
        cardOne = cardTwo = "" // On met les valeurs des cartes à vide
        return disableDeck = false;
    }
    // Si les cartes ne sont pas identiques
    setTimeout(() => {
        // On ajoute la classe shake après 400 ms
        cardOne.classList.add("shake")
        cardTwo.classList.add("shake")
    }, 400)

    setTimeout(() => {
        // On enlève la classe shake et flip après 1,2 seconde
        // Permet de retourner la carte si elle ne correspond pas
        cardOne.classList.remove("shake", "flip")
        cardTwo.classList.remove("shake", "flip")
        cardOne = cardTwo = "" // On met les valeurs des cartes à vide 
        // Sinon, elle garde les valeurs des cartes auxquelles ont a cliqué
        disableDeck = false;
    }, 1200)

}

function shuffleCard() {
    matched = 0;
    cardOne = cardTwo = "";
    disableDeck = false;
    let arr = [1, 2, 3, 4, 5, 6, 7, 8, 1, 2, 3, 4, 5, 6, 7, 8];
    arr.sort(() => Math.random() > 0.5 ? 1 : -1);
    cards.forEach((card, i) => {
        card.classList.remove("flip");
        let imgTag = card.querySelector(".back-view img");
        imgTag.src = `/assets/img/Games/FireEmblem/${arr[i]}.png`;
        card.addEventListener("click", flipCard);
    });
}
shuffleCard();
    

cards.forEach(card => {
    card.classList.add("flip")
    // Pour chaque cartes, on ajoute un événement clique et on lui applique la fonction flipCard
    card.addEventListener("click", flipCard)
})