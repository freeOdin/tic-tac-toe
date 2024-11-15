// Gameboard object
const gameboard = (() => {
    const board = Array(9).fill(null);
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

    const checkForWin = () => {
        for (const combination of winningCombinations) {
            if (board[combination[0]] !== null &&
                board[combination[0]] === board[combination[1]] &&
                board[combination[0]] === board[combination[2]]) {
                return true;
            }
        }
        return false;
    };

    const checkForTie = () => {
        return !board.includes(null);
    };

    return { board, checkForWin, checkForTie };
})();

// Player objects
const player1 = (() => {
    let name = '';
    let mark = 'X';

    const getName = () => name;
    const getMark = () => mark;
    const setName = (newName) => name = newName;

    return { getName, getMark, setName };
})();

const player2 = (() => {
    let name = '';
    let mark = 'O';

    const getName = () => name;
    let getMark = () => mark;
    const setName = (newName) => name = newName;

    return { getName, getMark, setName };
})();

// Game object
const game = (() => {
    let currentPlayer = player1;
    let gameOver = false;

    const startGame = () => {
        gameboard.board.fill(null);
        currentPlayer = player1;
        gameOver = false;
    };

    const switchPlayer = () => {
        currentPlayer = currentPlayer === player1 ? player2 : player1;
    };

    const makeMove = (index) => {
        if (gameOver || gameboard.board[index] !== null) return;
        gameboard.board[index] = currentPlayer.getMark();
        if (gameboard.checkForWin()) {
            gameOver = true;
            displayController.showResult(`${currentPlayer.getName()} wins!`);
        } else if (gameboard.checkForTie()) {
            gameOver = true;
            displayController.showResult("It's a tie!");
        } else {
            switchPlayer();
        }
        displayController.updateGameboard();
    };

    return { startGame, makeMove };
})();

// Display controller object
const displayController = (() => {
    const gameboardElement = document.querySelector(".gameboard");
    const player1NameElement = document.getElementById("player1-name");
    const player2NameElement = document.getElementById("player2-name");
    const startGameButton = document.getElementById("start-game");
    const gameResultElement = document.querySelector(".game-result");

    const updateGameboard = () => {
        gameboardElement.innerHTML = "";
        gameboard.board.forEach((cell, index) => {
            const cellElement = document.createElement("div");
            cellElement.textContent = cell || "";
            cellElement.addEventListener("click", () => game.makeMove(index));
            gameboardElement.appendChild(cellElement);
        });
    };

    const showResult = (message) => {
        gameResultElement.textContent = message;
    };

    const startGame = () => {
        player1.setName(player1NameElement.value);
        player2.setName(player2NameElement.value);
        game.startGame();
        updateGameboard();
    };

    startGameButton.addEventListener("click", startGame);

    return { updateGameboard, showResult };
})();

