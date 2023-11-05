'use strict';

// Factory function Player object
const Player = (marker) => {
    this.marker = marker;

    const getMarker = () => {
        return marker;
    };
    
    return { getMarker };
};

// Gameboard IIFE module to create a single gameboard
const Gameboard = (() => {
    // Render gameboard array
    let board = ["", "", "", "", "", "", "", "", ""];

    const setField = (index, sign) => {
        if (index > board.length) return;
        board[index] = sign;
    };

    const getField = (index) => {
        if (index > board.length) return;
        return board[index];
    };

    const reset = () => {
        for (let i = 0; i < board.length; i++) {
            board[i] = "";
        };
    };
    return { setField, getField, reset };
})();

// DisplayController IIFE module adds click events
// and controls the flow of the game
const DisplayController = (() => {
    const fieldElements = document.querySelectorAll('.field');
    const messageElement = document.querySelector('#message');
    const restartBtn = document.querySelector('.restartBtn');

    fieldElements.forEach((field) => {
        field.addEventListener('click', (e) => {
            if (GameController.getGameOver() || e.target.textContent !== "") return;
            GameController.playRound(parseInt(e.target.dataset.index));
            updateGameboard();
        });
    });

    restartBtn.addEventListener('click', (e) => {
        Gameboard.reset();
        GameController.reset();
        updateGameboard();
        setMessageElement("Player X's turn");
    });

    const updateGameboard = () => {
        for (let i = 0; i < fieldElements.length; i++) {
            fieldElements[i].textContent = Gameboard.getField(i);
        };
    };

    const setResultMessage = (winner) => {
        if (winner === 'Draw') {
            setMessageElement("It's a draw!");
        } else {
            setMessageElement(`Player ${winner} has won!`);
        };
    };

    const setMessageElement = (message) => {
        messageElement.textContent = message;
    };

    return { setResultMessage, setMessageElement };
})();

// GameController IIFE to show whos turn
// and show win/tie and reset
const GameController = (() => {
    const playerX = Player('X');
    const playerO = Player('O');
    let round = 1;
    let gameOver = false;

    const playRound = (fieldIndex) => {
        Gameboard.setField(fieldIndex, getCurrentPlayerSign());
        if (checkWinner(fieldIndex)) {
            DisplayController.setResultMessage(getCurrentPlayerSign());
            gameOver = true;
            return;
        };
        if (round === 9) {
            DisplayController.setResultMessage('Draw');
            gameOver = true;
            return;
        };
        round++;
        DisplayController.setMessageElement(
            `Player ${getCurrentPlayerSign()}'s turn`
        );
    };

    const getCurrentPlayerSign = () => {
        return round % 2 === 1 ? playerX.getMarker() : playerO.getMarker();
    };

    const checkWinner = (fieldIndex) => {
        // Win conditions arrays
        const winConditions = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6]
        ];

        return winConditions
            .filter((combination) => combination.includes(fieldIndex))
            .some((possibleCombination) => 
                possibleCombination.every(
                    (index) => Gameboard.getField(index) === getCurrentPlayerSign()
                )
            );
    };

    const getGameOver = () => {
        return gameOver;
    };

    const reset = () => {
        round = 1;
        gameOver = false;
    };

    return { playRound, getGameOver, reset };
})();
