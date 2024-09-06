document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('gameCanvas');
    const context = canvas.getContext('2d');

    // Game constants
    const WINDOWWIDTH = 1000;
    const WINDOWHEIGHT = 600;
    const TEXTCOLOR = 'white';
    const BACKGROUNDCOLOR = 'black';
    const FPS = 40;
    const BADDIEMINSIZE = 10;
    const BADDIEMAXSIZE = 40;
    const BADDIEMINSPEED = 1;
    const BADDIEMAXSPEED = 9;
    const ADDNEWBADDIERATE = 6;
    const PLAYERMOVERATE = 8;

    // Game variables
    let topScore = 0;
    let score = 0;
    let playerRect = { x: WINDOWWIDTH / 2, y: WINDOWHEIGHT - 50, width: 50, height: 50 };
    let moveLeft = moveRight = moveUp = moveDown = false;
    let baddies = [];
    let reverseCheat = slowCheat = false;
    let baddieAddCounter = 0;
    let paused = false;

    // Sounds
    //const gameOverSound = new Audio('gameover.wav');

    // Functions
    function drawText(text, x, y) {
        context.fillStyle = TEXTCOLOR;
        context.font = '24px Arial';
        context.fillText(text, x, y);
    }

    function waitForPlayerToPressKey() {
        if (!paused) {
            paused = true;
            startScreen.style.display = 'none';
            animate();
        }
    }

    function playerHasHitBaddie(playerRect, baddies) {
        for (let b of baddies) {
            if (playerRect.x < b.x + b.width &&
                playerRect.x + playerRect.width > b.x &&
                playerRect.y < b.y + b.height &&
                playerRect.y + playerRect.height > b.y) {
                return true;
            }
        }
        return false;
    }

    function resetGame() {
        //gameOverSound.pause();
        //gameOverSound.currentTime = 0;
        score = 0;
        playerRect = { x: WINDOWWIDTH / 2, y: WINDOWHEIGHT - 50, width: 50, height: 50 };
        baddies = [];
        paused = false;
        gameOverScreen.style.display = 'none';
        startScreen.style.display = 'flex';
    }

    function animate() {
        // Game loop
        const gameLoop = setInterval(() => {
            score++;

            // Clear the canvas
            context.fillStyle = BACKGROUNDCOLOR;
            context.fillRect(0, 0, WINDOWWIDTH, WINDOWHEIGHT);

            // Move the player
            if (moveLeft && playerRect.x > 0) {
                playerRect.x -= PLAYERMOVERATE;
            }
            if (moveRight && playerRect.x < WINDOWWIDTH - playerRect.width) {
                playerRect.x += PLAYERMOVERATE;
            }
            if (moveUp && playerRect.y > 0) {
                playerRect.y -= PLAYERMOVERATE;
            }
            if (moveDown && playerRect.y < WINDOWHEIGHT - playerRect.height) {
                playerRect.y += PLAYERMOVERATE;
            }

            // Add new baddies
            baddieAddCounter++;
            if (baddieAddCounter === ADDNEWBADDIERATE) {
                baddieAddCounter = 0;
                const baddieSize = Math.floor(Math.random() * (BADDIEMAXSIZE - BADDIEMINSIZE + 1)) + BADDIEMINSIZE;
                const newBaddie = {
                    x: Math.floor(Math.random() * (WINDOWWIDTH - baddieSize)),
                    y: 0 - baddieSize,
                    width: baddieSize,
                    height: baddieSize,
                    speed: Math.floor(Math.random() * (BADDIEMAXSPEED - BADDIEMINSPEED + 1)) + BADDIEMINSPEED
                };
                baddies.push(newBaddie);
            }

            // Move the baddies
            for (let i = 0; i < baddies.length; i++) {
                baddies[i].y += baddies[i].speed;
                if (baddies[i].y > WINDOWHEIGHT) {
                    baddies.splice(i, 1);
                    i--;
                }
            }

            // Check for collisions
            if (playerHasHitBaddie(playerRect, baddies)) {
                clearInterval(gameLoop);
                if (score > topScore) {
                    topScore = score;
                }
                gameOverScreen.style.display = 'flex';
                document.getElementById('scoreDisplay').textContent = score;
                //gameOverSound.play();
            }

            // Draw player
            context.fillStyle = 'white';
            context.fillRect(playerRect.x, playerRect.y, playerRect.width, playerRect.height);

            // Draw baddies
            context.fillStyle = 'red';
            for (let b of baddies) {
                context.fillRect(b.x, b.y, b.width, b.height);
            }

            // Draw score
            drawText('Score: ' + score, 10, 30);
            drawText('Top Score: ' + topScore, 10, 60);

        }, 1000 / FPS);
    }

    // Event listeners
    document.getElementById('startGameBtn').addEventListener('click', waitForPlayerToPressKey);

    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape') {
            resetGame();
        } else if (!paused) {
            waitForPlayerToPressKey();
        } else {
            if (event.key === 'ArrowLeft' || event.key === 'a') {
                moveRight = false;
                moveLeft = true;
            }
            if (event.key === 'ArrowRight' || event.key === 'd') {
                moveLeft = false;
                moveRight = true;
            }
            if (event.key === 'ArrowUp' || event.key === 'w') {
                moveDown = false;
                moveUp = true;
            }
            if (event.key === 'ArrowDown' || event.key === 's') {
                moveUp = false;
                moveDown = true;
            }
        }
    });

    document.addEventListener('keyup', (event) => {
        if (paused) {
            if (event.key === 'ArrowLeft' || event.key === 'a') {
                moveLeft = false;
            }
            if (event.key === 'ArrowRight' || event.key === 'd') {
                moveRight = false;
            }
            if (event.key === 'ArrowUp' || event.key === 'w') {
                moveUp = false;
            }
            if (event.key === 'ArrowDown' || event.key === 's') {
                moveDown = false;
            }
        }
    });

    document.getElementById('playAgainBtn').addEventListener('click', resetGame);

    // Show start screen
    const startScreen = document.getElementById('startScreen');
    startScreen.style.display = 'flex';
});
