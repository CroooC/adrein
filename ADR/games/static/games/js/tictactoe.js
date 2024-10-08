let currentPlayer = 'X';
let board = ['', '', '', '', '', '', '', '', ''];
let gameOver = false;
let xScore = 0;
let oScore = 0;

function startGame() {
    document.getElementById('start-screen').style.display = 'none';
    document.getElementById('game-container').style.display = 'block';
    document.getElementById('game-over-screen').style.display = 'none';
    drawBoard();
}

function drawBoard() {
    const gameBoard = document.getElementById('game-board');
    gameBoard.innerHTML = '';
    for (let i = 0; i < 9; i++) {
        const button = document.createElement('button');
        button.className = 'button';
        button.setAttribute('data-index', i);
        button.onclick = () => {
            if (!gameOver && board[i] === '') {
                board[i] = currentPlayer;
                button.textContent = currentPlayer;
                checkWin();
                currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
            }
        };
        gameBoard.appendChild(button);
    }
}

function checkWin() {
    const winningCombos = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // horizontal
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // vertical
        [0, 4, 8], [2, 4, 6]              // diagonal
    ];

    for (let combo of winningCombos) {
        const [a, b, c] = combo;
        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
            gameOver = true;
            document.getElementById('game-over-message').textContent = `Player ${currentPlayer} wins!`;
            if (currentPlayer === 'X') {
                xScore++;
                document.getElementById('x-score').textContent = `X Score : ${xScore}`;
            } else {
                oScore++;
                document.getElementById('o-score').textContent = `O Score : ${oScore}`;
            }
            document.getElementById('game-over-screen').style.display = 'block';
            return;
        }
    }

    if (!board.includes('')) {
        gameOver = true;
        document.getElementById('game-over-message').textContent = "It's a draw!";
        document.getElementById('game-over-screen').style.display = 'block';
    }
}

function restartGame() {
    currentPlayer = 'X';
    board = ['', '', '', '', '', '', '', '', ''];
    gameOver = false;
    drawBoard();
    document.getElementById('game-over-screen').style.display = 'none';
}
