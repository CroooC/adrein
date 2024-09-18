document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('gameCanvas');
    const context = canvas.getContext('2d');

    // Game constants
    const WINDOWWIDTH = 1000;
    const WINDOWHEIGHT = 600;
    const FPS = 40;
    const ADDNEWBADDIERATE = 6;
    const PLAYERMOVERATE = 8;

    // Baddie (meteor) speed constants
    const BADDIEMINSPEED = 1; // Minimum speed for meteors
    const BADDIEMAXSPEED = 9; // Maximum speed for meteors

    // Game variables
    let topScore = 0;
    let score = 0;
    let playerRect = { x: WINDOWWIDTH / 2, y: WINDOWHEIGHT - 50, width: 50, height: 50 };
    let moveLeft = moveRight = moveUp = moveDown = false;
    let baddies = [];
    let baddieAddCounter = 0;
    let paused = false;

    // Load images
    const backgroundImg = new Image();
    backgroundImg.src = backgroundImgSrc;

    const playerImg = new Image();
    playerImg.src = playerImgSrc;

    // Load meteor images
    const meteorImages = {};
    for (let size in meteorImagesSrc) {
        meteorImages[size] = meteorImagesSrc[size].map(src => {
            const img = new Image();
            img.src = src;
            return img;
        });
    }

    // Utility function to get a random meteor image by size
    function getRandomMeteor(size) {
        const meteors = meteorImages[size];
        return meteors[Math.floor(Math.random() * meteors.length)];
    }

    // Functions
    function drawText(text, x, y) {
        context.fillStyle = 'white';
        context.font = '24px Arial';
        context.fillText(text, x, y);
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
        score = 0;
        playerRect = { x: WINDOWWIDTH / 2, y: WINDOWHEIGHT - 50, width: 50, height: 50 };
        baddies = [];
        paused = false;
        gameOverScreen.style.display = 'none';
        startScreen.style.display = 'flex';
    }

    function animate() {
        const gameLoop = setInterval(() => {
            score++;

            // Clear and draw background
            context.clearRect(0, 0, WINDOWWIDTH, WINDOWHEIGHT);
            context.drawImage(backgroundImg, 0, 0, WINDOWWIDTH, WINDOWHEIGHT);

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

            // Add new baddies (meteors)
            baddieAddCounter++;
            if (baddieAddCounter === ADDNEWBADDIERATE) {
                baddieAddCounter = 0;
                const sizes = ['big', 'medium', 'small', 'tiny'];
                const randomSize = sizes[Math.floor(Math.random() * sizes.length)];
                const meteorImg = getRandomMeteor(randomSize);
                const baddieSize = meteorImg.width;
                const newBaddie = {
                    x: Math.floor(Math.random() * (WINDOWWIDTH - baddieSize)),
                    y: 0 - baddieSize,
                    width: baddieSize,
                    height: baddieSize,
                    speed: Math.floor(Math.random() * (BADDIEMAXSPEED - BADDIEMINSPEED + 1)) + BADDIEMINSPEED,
                    img: meteorImg
                };
                baddies.push(newBaddie);
            }

            // Move and draw baddies
            for (let i = 0; i < baddies.length; i++) {
                baddies[i].y += baddies[i].speed;
                if (baddies[i].y > WINDOWHEIGHT) {
                    baddies.splice(i, 1);
                    i--;
                } else {
                    context.drawImage(baddies[i].img, baddies[i].x, baddies[i].y, baddies[i].width, baddies[i].height);
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
            }

            // Draw player spaceship
            context.drawImage(playerImg, playerRect.x, playerRect.y, playerRect.width, playerRect.height);

            // Draw score
            drawText('Score: ' + score, 10, 30);
            drawText('Top Score: ' + topScore, 10, 60);

        }, 1000 / FPS);
    }

    // Event listeners for controls
    document.getElementById('startGameBtn').addEventListener('click', () => {
        paused = false;
        startScreen.style.display = 'none';
        animate();
    });

    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape') {
            resetGame();
        } else if (!paused) {
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
    });

    document.getElementById('playAgainBtn').addEventListener('click', resetGame);

    // Show start screen
    const startScreen = document.getElementById('startScreen');
    startScreen.style.display = 'flex';
});
