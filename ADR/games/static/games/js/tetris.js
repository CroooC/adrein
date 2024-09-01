document.addEventListener('DOMContentLoaded', function () {
    const canvas = document.getElementById('game');
    const context = canvas.getContext('2d');
    const scoreDisplay = document.getElementById('scoreDisplay');
    const topscoreDisplay = document.getElementById('topscoreDisplay');
    const startScreen = document.getElementById('startScreen');
    const gameOverScreen = document.getElementById('gameOverScreen');
    const finalScore = document.getElementById('finalScore');
    const startGameBtn = document.getElementById('startGameBtn');
    const playAgainBtn = document.getElementById('playAgainBtn');

    const grid = 28;
    const tetrominoSequence = [];
    let count = 0;
    let tetromino = null;
    let rAF = null;
    let gameOver = false;
    let score = 0;
    let topScore = 0;

    // keep track of what is in every cell of the game using a 2d array
    // tetris playfield is 10x20, with a few rows offscreen
    const playfield = [];

    // how to draw each tetromino
    const tetrominos = {
        'I': [
            [0, 0, 0, 0],
            [1, 1, 1, 1],
            [0, 0, 0, 0],
            [0, 0, 0, 0]
        ],
        'J': [
            [1, 0, 0],
            [1, 1, 1],
            [0, 0, 0],
        ],
        'L': [
            [0, 0, 1],
            [1, 1, 1],
            [0, 0, 0],
        ],
        'O': [
            [1, 1],
            [1, 1],
        ],
        'S': [
            [0, 1, 1],
            [1, 1, 0],
            [0, 0, 0],
        ],
        'Z': [
            [1, 1, 0],
            [0, 1, 1],
            [0, 0, 0],
        ],
        'T': [
            [0, 1, 0],
            [1, 1, 1],
            [0, 0, 0],
        ]
    };

    // color of each tetromino
    const colors = {
        'I': 'cyan',
        'O': 'yellow',
        'T': 'purple',
        'S': 'green',
        'Z': 'red',
        'J': 'blue',
        'L': 'orange'
    };

    // Function to generate a random integer between the range of [min,max]
    function getRandomInt(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    // Function to generate a new tetromino sequence
    function generateSequence() {
        const sequence = ['I', 'J', 'L', 'O', 'S', 'T', 'Z'];

        while (sequence.length) {
            const rand = getRandomInt(0, sequence.length - 1);
            const name = sequence.splice(rand, 1)[0];
            tetrominoSequence.push(name);
        }
    }

    // Function to get the next tetromino in the sequence
    function getNextTetromino() {
        if (tetrominoSequence.length === 0) {
            generateSequence();
        }

        const name = tetrominoSequence.pop();
        const matrix = tetrominos[name];

        // I and O start centered, all others start in left-middle
        const col = playfield[0].length / 2 - Math.ceil(matrix[0].length / 2);

        // I starts on row 21 (-1), all others start on row 22 (-2)
        const row = name === 'I' ? -1 : -2;

        return {
            name: name,      // name of the piece (L, O, etc.)
            matrix: matrix,  // the current rotation matrix
            row: row,        // current row (starts offscreen)
            col: col         // current col
        };
    }

    // Function to rotate an NxN matrix 90 degrees
    function rotate(matrix) {
        const N = matrix.length - 1;
        const result = matrix.map((row, i) =>
            row.map((val, j) => matrix[N - j][i])
        );
        return result;
    }

    // Function to check if the new matrix/row/col is valid
    function isValidMove(matrix, cellRow, cellCol) {
        for (let row = 0; row < matrix.length; row++) {
            for (let col = 0; col < matrix[row].length; col++) {
                if (matrix[row][col] && (
                    // outside the game bounds
                    cellCol + col < 0 ||
                    cellCol + col >= playfield[0].length ||
                    cellRow + row >= playfield.length ||
                    // collides with another piece
                    playfield[cellRow + row][cellCol + col])
                ) {
                    return false;
                }
            }
        }
        return true;
    }

    // Function to place the tetromino on the playfield
    function placeTetromino() {
        for (let row = 0; row < tetromino.matrix.length; row++) {
            for (let col = 0; col < tetromino.matrix[row].length; col++) {
                if (tetromino.matrix[row][col]) {
                    // game over if piece has any part offscreen
                    if (tetromino.row + row < 0) {
                        return showGameOver();
                    }
                    playfield[tetromino.row + row][tetromino.col + col] = tetromino.name;
                }
            }
        }

        // check for line clears starting from the bottom and working our way up
        for (let row = playfield.length - 1; row >= 0;) {
            if (playfield[row].every(cell => !!cell)) {
                // drop every row above this one
                for (let r = row; r >= 0; r--) {
                    for (let c = 0; c < playfield[r].length; c++) {
                        playfield[r][c] = playfield[r - 1][c];
                    }
                }
                score++;
            }
            else {
                row--;
            }
        }

        tetromino = getNextTetromino();
        updateScoreDisplay();
    }

    // Function to show the game over screen
    function showGameOver() {
        cancelAnimationFrame(rAF);
        gameOver = true;
        gameOverScreen.style.display = 'block';
        finalScore.textContent = score;
        if (score > topScore) {
            topScore = score;
            localStorage.setItem('topScore', topScore);
        }
        updateScoreDisplay();
    }

    // Function to update score display
    function updateScoreDisplay() {
        scoreDisplay.textContent = 'Score: ' + score;
        topscoreDisplay.textContent = 'Top Score: ' + localStorage.getItem('topScore');
    }

    function resetPlayfield() {
        for (let row = -2; row < 20; row++) {
            playfield[row] = [];
            for (let col = 0; col < 14; col++) {
                playfield[row][col] = 0;
            }
        }
    }

    // Function for the game loop
    function loop() {
        rAF = requestAnimationFrame(loop);
        context.clearRect(0, 0, canvas.width, canvas.height);

        // draw the playfield
        for (let row = 0; row < 20; row++) {
            for (let col = 0; col < 14; col++) {
                if (playfield[row][col]) {
                    const name = playfield[row][col];
                    context.fillStyle = colors[name];

                    // drawing 1 px smaller than the grid creates a grid effect
                    context.fillRect(col * grid, row * grid, grid - 1, grid - 1);
                }
            }
        }

        // draw the active tetromino
        if (tetromino) {
            // tetromino falls every 35 frames
            if (++count > 20) {
                tetromino.row++;
                count = 0;

                // place piece if it runs into anything
                if (!isValidMove(tetromino.matrix, tetromino.row, tetromino.col)) {
                    tetromino.row--;
                    placeTetromino();
                }
            }

            context.fillStyle = colors[tetromino.name];

            for (let row = 0; row < tetromino.matrix.length; row++) {
                for (let col = 0; col < tetromino.matrix[row].length; col++) {
                    if (tetromino.matrix[row][col]) {
                        // drawing 1 px smaller than the grid creates a grid effect
                        context.fillRect((tetromino.col + col) * grid, (tetromino.row + row) * grid, grid - 1, grid - 1);
                    }
                }
            }
        }
    }

    // Event listener for start game button
    startGameBtn.addEventListener('click', function () {
        startScreen.style.display = 'none';
        gameOverScreen.style.display = 'none';
        initGame();
    });

    // Event listener for play again button
    playAgainBtn.addEventListener('click', function () {
        gameOverScreen.style.display = 'none';
        initGame();
    });

    // Function to initialize the game
    function initGame() {
        score = 0;
        updateScoreDisplay();
        resetPlayfield();
        tetromino = getNextTetromino();
        gameOver = false;
        rAF = requestAnimationFrame(loop);
    }

    // Event listener for keyboard events
    document.addEventListener('keydown', function (e) {
        if (gameOver) return;

        // Left and right arrow keys (move)
        if (e.which === 37 || e.which === 39) {
            const col = e.which === 37 ? tetromino.col - 1 : tetromino.col + 1;
            if (isValidMove(tetromino.matrix, tetromino.row, col)) {
                tetromino.col = col;
            }
        }

        // Up arrow key (rotate)
        if (e.which === 38) {
            const matrix = rotate(tetromino.matrix);
            if (isValidMove(matrix, tetromino.row, tetromino.col)) {
                tetromino.matrix = matrix;
            }
        }

        // Down arrow key (drop)
        if (e.which === 40) {
            const row = tetromino.row + 1;
            if (!isValidMove(tetromino.matrix, row, tetromino.col)) {
                tetromino.row = row - 1;
                placeTetromino();
                return;
            }
            tetromino.row = row;
        }
    });

    // Start the game
    startScreen.style.display = 'block'; // Display start screen initially
    gameOverScreen.style.display = 'none'; // Hide game over screen initially

    // Initializations and other necessary code
    // ...

});
