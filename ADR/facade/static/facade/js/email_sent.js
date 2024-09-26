const validateBtn = document.getElementById('validationBtn');
const answerCheck = document.getElementById('answer-check');

let keysPressed = [];

document.addEventListener("keydown", function (event) {
    // Check if the pressed key is 'a' or 'z'
    if (event.key === 'a' || event.key === 'z') {
        keysPressed.push(event.key);

        // Limit the length of keysPressed array to 2
        if (keysPressed.length > 2) {
            keysPressed.shift(); // Remove the first element if more than 2 keys are stored
        }

        // Check if the keys pressed are 'a' followed by 'z'
        if (keysPressed.length === 2 && keysPressed[0] === 'a' && keysPressed[1] === 'z') {
            document.getElementById('hidden-tab').style.display = "block";
            document.getElementById('alpha-omega').style.display = "none";
            keysPressed = []; // Reset the keys pressed array
        }
    } else {
        keysPressed = []; // Reset the keys pressed array if a wrong key is pressed
    }
});


answerCheck.addEventListener('keydown', function (event) {
    if (event.keyCode === 13) {
        validateBtn.click();
    }
});

function validateAnswer() {
    const correctAnswer = "Paris"; // Replace with the actual answer
    const userAnswer = document.getElementById("answer-check").value;
    const result = document.getElementById("check-result");

    if (userAnswer.trim() === correctAnswer) {
        result.innerHTML = '<p>Correct! Paris had been taken by John the Fearless, Duke of Burgundy. On the night of 28 to 29 May, a certain Perrinet Le Clair, the son of an iron merchant, opened the Porte Saint-Germain to Jean de Villiers de L Isle - Adam, a Burgundian captain.</p><br>' + '<p>The name is the key. The words are the path. What does the french guy say?</p><br>' + '<p>After understanding what he is saying, he will give you a strage text.</p><br>' + '<p>This text will lead you to your final destination!</p><br>' + '<p>And to go there, you need to generate the gate thanks to a special code generator and this text.</p><br><br>' + '<p>Take note because you will no longer have access to this clues!</p><br>';
        validateBtn.style.display = 'none';
        answerCheck.style.display = 'none';
    } else {
        result.innerHTML = '<p>That is not correct. Try again.</p>';
    }
}
