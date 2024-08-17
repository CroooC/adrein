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
            if (i == random) {
                cardImg.src = staticUrl + "games/img/red_card.png";
            } else {
                cardImg.src = staticUrl + "games/img/black_card.png";
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
    let element = event.currentTarget;
    element.classList.toggle("flipped");
    let cardImg = element.querySelector('.front img');
    if (cardImg.src.toString().indexOf('red_card.png') > -1) {
        wins++;
        winLossCounter.textContent = `Wins: ${wins}, Losses: ${losses}`;
    } else {
        losses++;
        winLossCounter.textContent = `Wins: ${wins}, Losses: ${losses}`;
    }
    btn.disabled = false;
    canClick = true;
}

btn.addEventListener('click', function() {
    btn.disabled = true;
    canClick = true;
    // let allcards = document.getElementsByClassName("card");
    // for (let i = 0; i < allcards.length; i++) {
    //     if (!allcards[i].classList.contains("flipped")) {
    //         allcards[i].classList.toggle("flipped");
    //     }
    // }

    for (let i = 0; i < currentCards.length; i++) {
        if (!currentCards[i].classList.contains("flipped")) {
            currentCards[i].classList.toggle("flipped");
        }
    }
    setTimeout(function() {
        for (let i = 0; i < currentCards.length; i++) {
            currentCards[i].classList.remove("flipped");
        }
        setTimeout(function () {
            shuffle();
            btn.disabled = false;
        }, 500);
    }, 3000);
})
