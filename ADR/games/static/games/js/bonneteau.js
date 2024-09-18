// Card categories
const redCards = [];
const blackCards = [];

// List of all card filenames
const allCardNames = [
    // hearts
    "card_hearts_02.png",
    "card_hearts_03.png",
    "card_hearts_04.png",
    "card_hearts_05.png",
    "card_hearts_06.png",
    "card_hearts_07.png",
    "card_hearts_08.png",
    "card_hearts_09.png",
    "card_hearts_10.png",
    "card_hearts_J.png",
    "card_hearts_Q.png",
    "card_hearts_K.png",
    "card_hearts_A.png",
    // diamonds
    "card_diamonds_02.png",
    "card_diamonds_03.png",
    "card_diamonds_04.png",
    "card_diamonds_05.png",
    "card_diamonds_06.png",
    "card_diamonds_07.png",
    "card_diamonds_08.png",
    "card_diamonds_09.png",
    "card_diamonds_10.png",
    "card_diamonds_J.png",
    "card_diamonds_Q.png",
    "card_diamonds_K.png",
    "card_diamonds_A.png",
    // spades
    "card_spades_02.png",
    "card_spades_03.png",
    "card_spades_04.png",
    "card_spades_05.png",
    "card_spades_06.png",
    "card_spades_07.png",
    "card_spades_08.png",
    "card_spades_09.png",
    "card_spades_10.png",
    "card_spades_J.png",
    "card_spades_Q.png",
    "card_spades_K.png",
    "card_spades_A.png",
    // clubs
    "card_clubs_02.png",
    "card_clubs_03.png",
    "card_clubs_04.png",
    "card_clubs_05.png",
    "card_clubs_06.png",
    "card_clubs_07.png",
    "card_clubs_08.png",
    "card_clubs_09.png",
    "card_clubs_10.png",
    "card_clubs_J.png",
    "card_clubs_Q.png",
    "card_clubs_K.png",
    "card_clubs_A.png",
];

// Categorize cards based on their names
allCardNames.forEach(card => {
    if (card.includes('hearts') || card.includes('diamonds')) {
        redCards.push(card);
    } else {
        blackCards.push(card);
    }
});

let redcard = 0;
let wins = 0;
let losses = 0;
let canClick = true;
let currentCards = [];
let btn = document.getElementById('btn')
let winLossCounter = document.getElementById('win-loss-counter');

shuffle()

function shuffle() {
    if (canClick){
        canClick = false;
        let allcards = document.getElementsByClassName("card");
        currentCards = allcards;
        let random = Math.floor(Math.random() * allcards.length);
        redcard = random;

        for (let i = 0; i < allcards.length; i++) {
            allcards[i].classList.remove("flipped");
            let cardImg = allcards[i].querySelector('.front img');

            if (i === random) {
                const randomRedIndex = Math.floor(Math.random() * redCards.length);
                cardImg.src = staticUrl + "games/img/cards/" + redCards[randomRedIndex];
            } else {
                const randomBlackIndex = Math.floor(Math.random() * blackCards.length);
                cardImg.src = staticUrl + "games/img/cards/" + blackCards[randomBlackIndex];
            }
        }
        for (let i = 0; i < allcards.length; i++) {
            allcards[i].addEventListener('click', flip);
        }
    }
}

function flip(event) {
    if (canClick) {
        return;
    }

    const element = event.currentTarget;
    element.classList.toggle("flipped");
    const cardImg = element.querySelector('.front img');

    if (cardImg.src.includes('hearts') || cardImg.src.includes('diamonds')) { // if (cardImg.src.toString().indexOf('red_card.png') > -1) {
        wins++;
    } else {
        losses++;
    }

    winLossCounter.textContent = `Wins: ${wins}, Losses: ${losses}`;
    btn.disabled = false;
    canClick = true;
}

btn.addEventListener('click', function () {
    btn.disabled = true;
    canClick = true;

    for (let i = 0; i < currentCards.length; i++) {
        if (!currentCards[i].classList.contains("flipped")) {
            currentCards[i].classList.toggle("flipped");
        }
    }

    setTimeout(() => {
        for (let i = 0; i < currentCards.length; i++) {
            currentCards[i].classList.remove("flipped");
        }
        setTimeout(() => {
            shuffle();
            btn.disabled = false;
        }, 500);
    }, 3000);
});
