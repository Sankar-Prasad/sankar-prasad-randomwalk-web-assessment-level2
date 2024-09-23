let board = ["", "", "", "", "", "", "", "", ""];
let currentPlayer = "X";
let gameActive = true;
let scoreX = 0;
let scoreO = 0;

const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

const cells = document.querySelectorAll(".cell");
const currentTurnElement = document.getElementById("currentTurn");
const gameResultElement = document.getElementById("gameResult");
const resetButton = document.getElementById("resetGame");
const scoreXElement = document.getElementById("scoreX");
const scoreOElement = document.getElementById("scoreO");

cells.forEach(cell => {
    cell.addEventListener("click", handleCellClick);
});

resetButton.addEventListener("click", resetGame);

function handleCellClick(event) {
    const clickedCell = event.target;
    const clickedCellIndex = parseInt(clickedCell.id);

    if (board[clickedCellIndex] !== "" || !gameActive) {
        return;
    }

    board[clickedCellIndex] = currentPlayer;
    clickedCell.textContent = currentPlayer;

    checkForWinner();
}

function checkForWinner() {
    let roundWon = false;
    for (let i = 0; i < winningCombinations.length; i++) {
        const winCombo = winningCombinations[i];
        const a = board[winCombo[0]];
        const b = board[winCombo[1]];
        const c = board[winCombo[2]];

        if (a === "" || b === "" || c === "") {
            continue;
        }

        if (a === b && b === c) {
            roundWon = true;
            break;
        }
    }

    if (roundWon) {
        gameResultElement.textContent = `Player ${currentPlayer} wins!`;
        gameActive = false;
        updateScore();
        return;
    }

    if (!board.includes("")) {
        gameResultElement.textContent = "It's a draw!";
        gameActive = false;
        return;
    }

    switchPlayer();
}

function switchPlayer() {
    currentPlayer = currentPlayer === "X" ? "O" : "X";
    currentTurnElement.textContent = `Player ${currentPlayer}'s turn`;
}

function updateScore() {
    if (currentPlayer === "X") {
        scoreX++;
        scoreXElement.textContent = scoreX;
    } else {
        scoreO++;
        scoreOElement.textContent = scoreO;
    }
}

function resetGame() {
    board = ["", "", "", "", "", "", "", "", ""];
    gameActive = true;
    currentPlayer = "X";
    currentTurnElement.textContent = "Player X's turn";
    gameResultElement.textContent = "";
    cells.forEach(cell => {
        cell.textContent = "";
    });
}
