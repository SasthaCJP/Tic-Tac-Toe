document.addEventListener("DOMContentLoaded", () => {
    const board = document.getElementById("game-board");
    const resultModal = document.getElementById("result-modal");
    const resultMessage = document.getElementById("result-message");
    const restartButton = document.getElementById("restart-button");

    let currentPlayer = "X";
    let gameActive = true;
    let boardState = ["", "", "", "", "", "", "", "", ""];

    // Winning combinations
    const winningCombinations = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];

    // Initialize the game board
    function initializeBoard() {
        board.innerHTML = "";
        boardState = ["", "", "", "", "", "", "", "", ""];
        gameActive = true;
        currentPlayer = "X";
        resultModal.classList.add("hidden");

        for (let i = 0; i < 9; i++) {
            const cell = document.createElement("div");
            cell.classList.add("cell");
            cell.dataset.index = i;
            cell.addEventListener("click", handleCellClick);
            board.appendChild(cell);
        }
    }

    // Handle cell click
    function handleCellClick(event) {
        const cell = event.target;
        const cellIndex = cell.dataset.index;

        if (!gameActive || boardState[cellIndex] !== "") return;

        boardState[cellIndex] = currentPlayer;
        cell.textContent = currentPlayer;
        cell.classList.add("taken", `player-${currentPlayer.toLowerCase()}`);

        if (checkWin(currentPlayer)) {
            endGame(`Player ${currentPlayer} wins!`, winningCells(currentPlayer));
            return;
        }

        if (boardState.every((cell) => cell !== "")) {
            endGame("It's a draw!");
            return;
        }

        currentPlayer = currentPlayer === "X" ? "O" : "X";
    }

    // Check for a win
    function checkWin(player) {
        return winningCombinations.some((combination) =>
            combination.every((index) => boardState[index] === player)
        );
    }

    // Highlight winning cells
    function winningCells(player) {
        return winningCombinations.find((combination) =>
            combination.every((index) => boardState[index] === player)
        );
    }

    // End game
    function endGame(message, winningCells = []) {
        gameActive = false;

        // Highlight winning cells
        winningCells.forEach((index) => {
            document.querySelector(`[data-index='${index}']`).classList.add("winning");
        });

        resultMessage.textContent = message;
        resultModal.classList.remove("hidden");
    }

    // Restart game
    restartButton.addEventListener("click", initializeBoard);

    // Initialize the game for the first time
    initializeBoard();
});
