const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");

let paddleAHeight = 100;
let paddleBHeight = 100;
let paddleWidth = 8;
let ballSize = 8;
let paddleAX = 10;
let paddleAY = (canvas.height - paddleAHeight) / 2;
let paddleBX = canvas.width - (paddleWidth + 10);
let paddleBY = (canvas.height - paddleBHeight) / 2;
let ballX = canvas.width / 2;
let ballY = canvas.height / 2;
let ballDX = 4;
let ballDY = -4;
let scoreA = 0;
let scoreB = 0;
let gameOver = false;
let paused = false;

function drawPaddle(x, y, height) {
    ctx.beginPath();
    ctx.rect(x, y, paddleWidth, height);
    ctx.fillStyle = "white";
    ctx.fill();
    ctx.closePath();
}

function drawBall(x, y) {
    ctx.beginPath();
    ctx.arc(x, y, ballSize, 0, Math.PI * 2);
    ctx.fillStyle = "white";
    ctx.fill();
    ctx.closePath();
}

function drawScore() {
    ctx.font = "24px Courier";
    ctx.fillStyle = "white";
    ctx.fillText("Player A: " + scoreA + "   Player B: " + scoreB, canvas.width / 2 - 180, 30);
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawPaddle(paddleAX, paddleAY, paddleAHeight);
    drawPaddle(paddleBX, paddleBY, paddleBHeight);
    drawBall(ballX, ballY);
    drawScore();

    if (!gameOver && !paused) {
        if (ballX + ballDX > canvas.width - ballSize || ballX + ballDX < ballSize) {
            ballDX = -ballDX;
        }
        if (ballY + ballDY > canvas.height - ballSize || ballY + ballDY < ballSize) {
            ballDY = -ballDY;
        }

        // Check for collision with the left and right borders for scoring points
        if (ballX - ballSize < 0 + 3) {
            scoreB++;
            if (scoreB >= 3) {
                gameOver = true;
                document.getElementById("winner").innerText = "Player B Wins!";
                document.getElementById("gameOverScreen").style.display = "block";
            }
            reset();
        }

        if (ballX + ballSize > canvas.width - 3) {
            scoreA++;
            if (scoreA >= 3) {
                gameOver = true;
                document.getElementById("winner").innerText = "Player A Wins!";
                document.getElementById("gameOverScreen").style.display = "block";
            }
            reset();
        }

        if (ballX - ballSize < paddleAX + paddleWidth && ballY + ballSize > paddleAY && ballY - ballSize < paddleAY + paddleAHeight) {
            ballDX = -ballDX;
        }

        if (ballX > paddleBX - paddleWidth && ballY > paddleBY && ballY < paddleBY + paddleBHeight) {
            ballDX = -ballDX;
        }

        ballX += ballDX;
        ballY += ballDY;
    }

    requestAnimationFrame(draw);
}

function startGame() {
    document.getElementById("startScreen").style.display = "none";
    draw();
}

function reset() {
    ballX = canvas.width / 2;
    ballY = canvas.height / 2;
    paddleAY = (canvas.height - paddleAHeight) / 2;
    paddleBY = (canvas.height - paddleBHeight) / 2;
    ballDX = Math.sign(ballDX) * 4;
    ballDY = Math.sign(ballDY) * 4;
}

function restartGame() {
    scoreA = 0;
    scoreB = 0;
    gameOver = false;
    reset();
    document.getElementById("gameOverScreen").style.display = "none";
    draw();
}

function pauseGame() {
    paused = true;
    document.getElementById("pauseScreen").style.display = "block";
}

function resumeGame() {
    paused = false;
    document.getElementById("pauseScreen").style.display = "none";
}

document.addEventListener("keydown", function (event) {
    if (event.key === "w" && paddleAY > 0) {
        paddleAY -= 25;
    }
    if (event.key === "s" && paddleAY < canvas.height - paddleAHeight) {
        paddleAY += 25;
    }
    if (event.key === "ArrowUp" && paddleBY > 0) {
        paddleBY -= 25;
    }
    if (event.key === "ArrowDown" && paddleBY < canvas.height - paddleBHeight) {
        paddleBY += 25;
    }
    if (event.key === "Escape" || event.key === " ") {
        if (paused) {
            resumeGame();
        } else {
            pauseGame();
        }
    }
});
