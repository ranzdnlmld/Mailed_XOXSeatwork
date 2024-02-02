document.addEventListener("DOMContentLoaded", () => {
    const board = document.getElementById("game-board");
    const status = document.getElementById("status");
    const resetButton = document.getElementById("reset-button");
    const resetScoresButton = document.getElementById("reset-score-button");
    const playerXScoreDisplay = document.getElementById("player-x-score");
    const playerOScoreDisplay = document.getElementById("player-o-score");

    let currentPlayer = "X";
    let gameBoard = ["", "", "", "", "", "", "", "", ""];
    let playerXScore = 0;
    let playerOScore = 0;

    function checkWinner() {
        const winPatterns = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8],
            [0, 3, 6], [1, 4, 7], [2, 5, 8],
            [0, 4, 8], [2, 4, 6]
        ];

        for (const pattern of winPatterns) {
            const [a, b, c] = pattern;
            if (gameBoard[a] && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c]) {
                return true;
            }
        }

        return false;
    }

    function checkDraw() {
        return !gameBoard.includes("");
    }

    function endGame(result) {
        status.textContent = result;
        board.removeEventListener("click", handleCellClick);
        if (result.includes("wins")) {
            updateScores(result);
        }
    }

    function updateScores(result) {
        if (result.includes("Player X")) {
            playerXScore++;
            playerXScoreDisplay.textContent = `Player X: ${playerXScore}`;
        } else if (result.includes("Player O")) {
            playerOScore++;
            playerOScoreDisplay.textContent = `Player O: ${playerOScore}`;
        }
    }

    function handleCellClick(event) {
        const cellIndex = event.target.dataset.index;

        if (gameBoard[cellIndex] === "") {
            gameBoard[cellIndex] = currentPlayer;
            event.target.textContent = currentPlayer;

            if (checkWinner()) {
                endGame(`Player ${currentPlayer} wins!`);
            } else if (checkDraw()) {
                endGame("It's a draw!");
            } else {
                currentPlayer = currentPlayer === "X" ? "O" : "X";
                status.textContent = `Player ${currentPlayer}'s turn`;
            }
        }
    }

    function resetGame() {
        gameBoard = ["", "", "", "", "", "", "", "", ""];
        currentPlayer = "X";
        status.textContent = "Player X's turn";

        // Clear board and reattach event listener
        board.innerHTML = "";
        board.addEventListener("click", handleCellClick);

        // Create cells dynamically
        for (let i = 0; i < 9; i++) {
            const cell = document.createElement("div");
            cell.classList.add("cell");
            cell.dataset.index = i;
            board.appendChild(cell);
        }
    }

    function resetScores() {
        console.log("Before Reset - Player X Score:", playerXScore, "Player O Score:", playerOScore);

        playerXScore = 0;
        playerOScore = 0;
        playerXScoreDisplay.textContent = "Player X: 0";
        playerOScoreDisplay.textContent = "Player O: 0";
        resetGame();

        console.log("After Reset - Player X Score:", playerXScore, "Player O Score:", playerOScore);
    }

    // Initialize the game
    resetGame();

    // Event listeners
    board.addEventListener("click", handleCellClick);
    resetButton.addEventListener("click", resetGame);
    resetScoresButton.addEventListener("click", resetScores);
});
