// JavaScript code for the Blackjack game
document.addEventListener("DOMContentLoaded", function () {
    const winsElement = document.getElementById("wins");
    const lossesElement = document.getElementById("losses");
    const dealerHandElement = document.getElementById("dealer-hand");
    const dealerTotalElement = document.getElementById("dealer-total");
    const dealerActionElement = document.getElementById("dealer-action");
    const playerHandElement = document.getElementById("player-hand");
    const playerTotalElement = document.getElementById("player-total");
    const gameResultElement = document.getElementById("game-result");
    const hitButton = document.getElementById("hit");
    const standButton = document.getElementById("stand");
    const resetButton = document.getElementById("reset");

    let deck = [];
    let dealerHand = [];
    let playerHand = [];
    let wins = 0;
    let losses = 0;

    function initializeDeck() {
        const suits = ['Hearts', 'Diamonds', 'Clubs', 'Spades'];
        const values = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'Jack', 'Queen', 'King', 'Ace'];
        for (let suit of suits) {
            for (let value of values) {
                deck.push({ value: value, suit: suit });
            }
        }
    }

    function shuffleDeck() {
        for (let i = deck.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [deck[i], deck[j]] = [deck[j], deck[i]];
        }
    }

    function dealInitialCards() {
        dealerHand.push(deck.pop()); // Dealer gets one card
        playerHand.push(deck.pop()); // Player gets first card
        playerHand.push(deck.pop()); // Player gets second card
        checkBlackjack();
        enableActions();
    }

    function renderCards() {
        dealerHandElement.innerHTML = '';
        playerHandElement.innerHTML = '';
        dealerHand.forEach(card => renderCard(card, dealerHandElement));
        playerHand.forEach(card => renderCard(card, playerHandElement));
        playerTotalElement.textContent = calculateTotal(playerHand);
    }

    function renderCard(card, element) {
        const cardElement = document.createElement('div');
        cardElement.textContent = `${card.value} of ${card.suit}`;
        element.appendChild(cardElement);
    }

    function calculateTotal(hand) {
        let total = 0;
        let hasAce = false;
        for (let card of hand) {
            if (card.value === 'Jack' || card.value === 'Queen' || card.value === 'King') {
                total += 10;
            } else if (card.value === 'Ace') {
                hasAce = true;
                total += 11;
            } else {
                total += parseInt(card.value);
            }
        }
        if (hasAce && total > 21) {
            total -= 10;
        }
        return total;
    }

    function checkBlackjack() {
        if (calculateTotal(playerHand) === 21) {
            wins++;
            updateStats();
            gameResultElement.textContent = "Congratulations! You got a Blackjack!";
            disableActions();
        } else if(calculateTotal(dealerHand) === 21) {
            losses++;
            updateStats();
            gameResultElement.textContent = "Sorry, you lose. The dealer got a Blackjack.";
            disableActions();
        }
    }

    function updateStats() {
        winsElement.textContent = wins;
        lossesElement.textContent = losses;
    }

    function hit() {
        playerHand.push(deck.pop());
        renderCards();
        const playerTotal = calculateTotal(playerHand);
        if (playerTotal > 21) {
            losses++;
            updateStats();
            gameResultElement.textContent = 'You busted. Dealer wins.';
            disableActions();
        } else {
            checkBlackjack();
        }
    }

    function stand() {
        if (calculateTotal(dealerHand) < 17) {
            while (calculateTotal(dealerHand) < 17) {
                dealerHand.push(deck.pop());
                renderCards();
                dealerActionElement.textContent = "Pushes..."
            }
        } else {
            dealerActionElement.textContent = "Stands.";
        }
        const dealerTotal = calculateTotal(dealerHand);
        dealerTotalElement.textContent = dealerTotal;
        if (dealerTotal > 21) {
            wins++;
            updateStats();
            gameResultElement.textContent = "Dealer busted. You win!";
        } else if (dealerTotal < calculateTotal(playerHand)) {
            wins++;
            updateStats();
            gameResultElement.textContent = "Dealer's hand is lower than yours. You win!";
        } else if (dealerTotal > calculateTotal(playerHand) || dealerTotal === 21) {
            losses++;
            updateStats();
            gameResultElement.textContent = "You have a lower hand than the Dealer... Dealer wins.";
            checkBlackjack();
        } else {
            gameResultElement.textContent = "It's a tie.";
        }
        disableActions();
    }

    function resetGame() {
        deck = [];
        dealerHand = [];
        playerHand = [];
        initializeDeck();
        shuffleDeck();
        dealInitialCards();
        renderCards();
        gameResultElement.textContent = '';
        dealerTotalElement.textContent = '';
        dealerActionElement.textContent = '';
        enableActions();
        checkBlackjack();
    }

    function disableActions() {
        hitButton.disabled = true;
        standButton.disabled = true;
        resetButton.disabled = false;
    }

    function enableActions() {
        hitButton.disabled = false;
        standButton.disabled = false;
        resetButton.disabled = true;
    }

    hitButton.addEventListener('click', hit);
    standButton.addEventListener('click', stand);
    resetButton.addEventListener('click', resetGame);

    // Initialize the game
    initializeDeck();
    shuffleDeck();
    dealInitialCards();
    renderCards();
    checkBlackjack();
});
