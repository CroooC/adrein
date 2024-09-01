// Part 1
let numKeys = 0;
let level = 1;

function startGame(difficulty) {
    document.getElementById('gameArea').style.display = 'block';
    level = difficulty;
    document.getElementById('message').innerText = 'You have 5 jars in front of you. Choose between 1, 2, 3, 4, or 5';
}

function checkJar() {
    let selectedJar = parseInt(document.getElementById('jarInput').value);
    if (selectedJar < 1 || selectedJar > 5) {
        selectedJar = 5;
        alert("You didn't select a valid jar. Jar 5 will be chosen.");
    }

    let snakes = Array(level).fill("S");
    let keys = Array(5 - level).fill("K");
    let jars = snakes.concat(keys);
    jars.sort(() => Math.random() - 0.5);

    document.getElementById('message').innerText = `You chose jar number ${selectedJar}`;
    if (jars[selectedJar - 1] === "K") {
        alert("Win! You won a magic key!");
        numKeys++;
        document.getElementById('message').innerText += `\nYou have ${numKeys}/3 keys`;
    } else {
        alert("Game Over! A snake just appeared!");
        if (numKeys > 0) {
            numKeys--;
            document.getElementById('message').innerText += `\nYou have ${numKeys}/3 keys`;
        }
    }

    if (numKeys === 3) {
        alert("You become the King of the temple!");
        document.getElementById('gameArea').style.display = 'none';
    }
}

// Part 2
let min = 1;
let max = 1000;

function evaluateFeedback() {
    let feedback = document.getElementById('feedbackInput').value.toLowerCase();
    let computerGuessMessage = document.getElementById('computerGuessMessage');
    let computerGuess = document.getElementById('computerGuess');
    if (feedback === 'h') {
        max = parseInt(computerGuessMessage.innerText) - 1;
        computerGuessMessage.innerText = '';
        computerGuess.innerHTML = `<p>Is the number too high or too low?</p>
                                           <input type="text" id="feedbackInput" placeholder="Enter 'H' for too high, 'L' for too low, or 'C' for correct">
                                           <button onclick="evaluateFeedback()">Submit</button>`;
    } else if (feedback === 'l') {
        min = parseInt(computerGuessMessage.innerText) + 1;
        computerGuessMessage.innerText = '';
        computerGuess.innerHTML = `<p>Is the number too high or too low?</p>
                                           <input type="text" id="feedbackInput" placeholder="Enter 'H' for too high, 'L' for too low, or 'C' for correct">
                                           <button onclick="evaluateFeedback()">Submit</button>`;
    } else if (feedback === 'c') {
        computerGuess.innerHTML = '<p>Yay! The computer guessed your number correctly!</p>';
    }
    document.getElementById('maxRange').innerText = max;
    let guess = Math.floor(Math.random() * (max - min + 1)) + min;
    computerGuessMessage.innerText = guess;
}
