const validateBtn = document.getElementById('validationBtn');
const answerCheck = document.getElementById('answer-check');

let keyPressCount = 0;
let requiredKeyPresses = 2;
let requiredKeys = ['a', 'z'];

document.addEventListener("keydown", function (event) {
    if (requiredKeys.includes(event.key)) {
        keyPressCount++;
        if (keyPressCount === requiredKeyPresses) {
            document.getElementById('hidden-tab').style.display = "block";
            document.getElementById('alpha-omega').style.display = "none";
            keyPressCount = 0; // Reset the count
        }
    } else {
        keyPressCount = 0; // Reset the count if the wrong key is pressed
    }
});

answerCheck.addEventListener('keydown', function (event) {
    if (event.keyCode === 13) {
        validateBtnButton.click();
    }
});

function validateAnswer() {
    const correctAnswer = "France"; // Replace with the actual answer
    const userAnswer = document.getElementById("answer-check").value;
    const result = document.getElementById("check-result");

    if (userAnswer.trim() === correctAnswer) {
        result.innerHTML = '<p>Correct! France is most visited country in the world!</p><br>' + '<p>The name is the key. The words are the path. What does the french guy say?</p><br>' + '<p>After understanding what he ask you to do, he will give you a stage text.</p><br>' + '<p>This text will lead you to your final destination!</p><br>' + '<p>But before you need to generate the gate thanks to a special code generator and this text.</p><br>';
        validateBtn.style.display = 'none';
        answerCheck.style.display = 'none';
    } else {
        result.innerHTML = '<p>That is not correct. Try again.</p>';
    }
}
