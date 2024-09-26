document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('gameCanvas');
    const context = canvas.getContext('2d');

    // Game constants
    const WINDOWWIDTH = 600;
    const WINDOWHEIGHT = 600;
    const TEXTCOLOR = 'white';
    const BACKGROUNDCOLOR = 'black';
    const CELL_SIZE = 30;
    const CELLS_WIDE = WINDOWWIDTH / CELL_SIZE;
    const CELLS_HIGH = WINDOWHEIGHT / CELL_SIZE;
    const FPS = 10;

    // Game variables
    let topScore = 0;
    let score = 0;
    let wormCoords = [];
    let appleCoord = {};
    let moveLeft = moveRight = moveUp = moveDown = false;
    let direction = moveRight;
    let nextDirection = moveRight;
    let gameActive = false;

    // Sounds
    //const gameOverSound = new Audio('gameover.wav');

    // Load Assets
    const appleImage = new Image();
    const snakeHeadImage = new Image();
    const snakeBodyImage = new Image();
    const snakeTailImage = new Image();

    appleImage.src = appleImgSrc;
    snakeTailImage.src = snakeHeadImgSrc;
    snakeHeadImage.src = snakeBodyImgSrc;
    snakeBodyImage.src = snakeTailImgSrc;


    // Functions
    function drawText(text, x, y) {
        context.fillStyle = TEXTCOLOR;
        context.font = '28px Arial';
        context.fillText(text, x, y);
    }

    function drawGrid() {
        context.strokeStyle = 'darkgray';
        for (let x = 0; x <= WINDOWWIDTH; x += CELL_SIZE) {
            context.beginPath();
            context.moveTo(x, 0);
            context.lineTo(x, WINDOWHEIGHT);
            context.stroke();
        }
        for (let y = 0; y <= WINDOWHEIGHT; y += CELL_SIZE) {
            context.beginPath();
            context.moveTo(0, y);
            context.lineTo(WINDOWWIDTH, y);
            context.stroke();
        }
    }

    function drawApple(coord) {
        context.fillStyle = 'red';
        context.fillRect(coord.x * CELL_SIZE, coord.y * CELL_SIZE, CELL_SIZE, CELL_SIZE);

        // context.drawImage(appleImage, coord.x * CELL_SIZE, coord.y * CELL_SIZE, CELL_SIZE, CELL_SIZE);
    }

    function drawWorm() {
        context.fillStyle = 'green';
        for (let i = 0; i < wormCoords.length; i++) {
            const { x, y } = wormCoords[i];
            context.fillRect(x * CELL_SIZE, y * CELL_SIZE, CELL_SIZE, CELL_SIZE);
        }

        // for (let i = 0; i < wormCoords.length; i++) {
        //     const { x, y } = wormCoords[i];
        //     if (i === 0) {
        //         // Draw head
        //         context.drawImage(snakeTailImage, x * CELL_SIZE, y * CELL_SIZE, CELL_SIZE, CELL_SIZE);
        //     } else if (i === wormCoords.length - 1) {
        //         // Draw tail
        //         context.drawImage(snakeBodyImage, x * CELL_SIZE, y * CELL_SIZE, CELL_SIZE, CELL_SIZE);
        //     } else {
        //         // Draw body
        //         context.drawImage(snakeHeadImage, x * CELL_SIZE, y * CELL_SIZE, CELL_SIZE, CELL_SIZE);
        //     }
        // }
    }

    function placeApple() {
        let applePlaced = false;

        while (!applePlaced) {
            // Generate random apple coordinates
            const newAppleCoord = {
                x: Math.floor(Math.random() * CELLS_WIDE),
                y: Math.floor(Math.random() * CELLS_HIGH)
            };

            // Check if the new apple coordinates overlap with any part of the snake
            let collisionWithSnake = false;
            for (let i = 0; i < wormCoords.length; i++) {
                if (wormCoords[i].x === newAppleCoord.x && wormCoords[i].y === newAppleCoord.y) {
                    collisionWithSnake = true;
                    break;
                }
            }

            // If there's no collision, place the apple
            if (!collisionWithSnake) {
                appleCoord = newAppleCoord;
                applePlaced = true;
            }
        }
    }


    function updateScoreDisplay() {
        document.getElementById('scoreDisplay').textContent = `${score}`;
    }

    function updateTopScoreDisplay() {
        document.getElementById('topscoreDisplay').textContent = `${topScore}`;
    }

    function resetGame() {
        //gameOverSound.pause();
        //gameOverSound.currentTime = 0;
        moveLeft = moveRight = moveUp = moveDown = false;
        direction = moveRight;
        nextDirection = moveRight;
        score = 0;
        updateTopScoreDisplay();
        wormCoords = [];
        placeApple();
        gameActive = false;
        gameOverScreen.style.display = 'none';
        startScreen.style.display = 'flex';
    }

    function checkCollision() {
        if (
            wormCoords[0].x < 0 ||
            wormCoords[0].x >= CELLS_WIDE ||
            wormCoords[0].y < 0 ||
            wormCoords[0].y >= CELLS_HIGH
        ) {
            return true;
        }

        for (let i = 1; i < wormCoords.length; i++) {
            if (wormCoords[i].x === wormCoords[0].x && wormCoords[i].y === wormCoords[0].y) {
                return true;
            }
        }

        return false;
    }

    function checkAppleCollision() {
        if (wormCoords[0].x === appleCoord.x && wormCoords[0].y === appleCoord.y) {
            score++;
            wormCoords.push({});
            placeApple();
        }
    }

    function animate() {
        if (!gameActive) return;

        // Move the worm
        for (let i = wormCoords.length - 1; i > 0; i--) {
            wormCoords[i].x = wormCoords[i - 1].x;
            wormCoords[i].y = wormCoords[i - 1].y;
        }

        if (direction === 'left') wormCoords[0].x--;
        if (direction === 'up') wormCoords[0].y--;
        if (direction === 'right') wormCoords[0].x++;
        if (direction === 'down') wormCoords[0].y++;

        if (checkCollision()) {
            gameActive = false;
            gameOverScreen.style.display = 'flex';
            document.getElementById('finalScore').textContent = `Final Score: ${score}`;
            if (score > topScore) {
                topScore = score;
                updateTopScoreDisplay();
            }
            //gameOverSound.play();
            return;
        }

        checkAppleCollision();
        updateScoreDisplay();

        context.clearRect(0, 0, WINDOWWIDTH, WINDOWHEIGHT);
        context.fillStyle = BACKGROUNDCOLOR;
        context.fillRect(0, 0, WINDOWWIDTH, WINDOWHEIGHT);

        drawGrid();
        drawApple(appleCoord);
        drawWorm();

        setTimeout(() => requestAnimationFrame(animate), 1000 / FPS);
    }

    // Event listeners
    document.getElementById('startGameBtn').addEventListener('click', () => {
        gameActive = true;
        wormCoords = [{ x: 10, y: 10 }];
        placeApple();
        startScreen.style.display = 'none';
        animate();
    });

    document.addEventListener('keydown', (event) => {
        if (!gameActive) return;

        const key = event.key.toLowerCase();
        if (key === 'arrowleft' && direction !== 'right') direction = 'left';
        if (key === 'arrowup' && direction !== 'down') direction = 'up';
        if (key === 'arrowright' && direction !== 'left') direction = 'right';
        if (key === 'arrowdown' && direction !== 'up') direction = 'down';
    });

    document.getElementById('playAgainBtn').addEventListener('click', resetGame);

    // Show start screen
    document.getElementById('startScreen').style.display = 'flex';
});
