// Written pseudo-code below

// Need a gameboard
// Need gameboard reset button to clear all fields
// Need computer opponent
// Start button
//   Button lets player pick X or O, auto assigns other
//     On pick, Math.random who goes first, X or O
// Computer pick needs random open field position
// After every pick, function ran to check if three in a row
//   If three in a row, winner declared,
//   Or if all fields filled in and no three in a row,
//     If gameOver(), no other fields can be filled in

'use strict';

// IIFE module to create a single gameboard
const Gameboard = (() => {
    // Element Selectors
    const playDiv = document.querySelector('#playDiv');
    const playBtn = document.querySelector('.playBtn');
    const selectX = document.querySelector('.selectX');
    const selectO = document.querySelector('.selectO');
    const statusText = document.querySelector('#statusText');
    // Global (private) variables
    const O = 'O';
    const X = 'X';
    // let playerMarker;
    // let computerMarker;

    // Win conditions arrays
    // const winConditions = [
    //     [0, 1, 2],
    //     [3, 4, 5],
    //     [6, 7, 8],
    //     [0, 3, 6],
    //     [1, 4, 7],
    //     [2, 5, 8],
    //     [0, 4, 8],
    //     [2, 4, 6]
    // ];

    // Render/load gameboard array
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

const displayController = (() => {
    const fieldElements = document.querySelectorAll('.field');
    const messageElement = document.querySelector('#message');
    const restartBtn = document.querySelector('.restartBtn');

    fieldElements.forEach((field) => {
        field.addEventListener('click', (e) => {
            if (GameController.getIsOver() || e.target.textContent !== "") return;
            
        })
    })
})();

// Factory function Player object
const Player = (marker) => {
    this.marker = marker;

    const getMarker = () => {
        return marker;
    };
    
    return { getMarker };
    // let newPlayer = {};
    // newPlayer.name = name;
    // newPlayer.marker = marker;
    // return newPlayer;
};
// const player1 = Player('Rick', "X")
// const player2 = Player('Joe', "O");
// console.log(player1.name);
// console.log(player1.marker);
// console.log(player2.name);
// console.log(player2.marker);