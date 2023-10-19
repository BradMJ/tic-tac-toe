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


// ADDED THESE GLOBAL VARIABLES TO GAMEBOARD MODULE
// const playDiv = document.querySelector('#playDiv');
// const playBtn = document.querySelector('.playBtn');
// const selectX = document.querySelector('.selectX');
// const selectO = document.querySelector('.selectO');

// // Play button
//          ADDED TO GAMEBOARD MODULE
// playBtn.addEventListener('click', () => {
//     playBtn.style.display='none';
//     selectX.style.display='block';
//     selectO.style.display='block';
//     selectX.addEventListener('click', () => {
//         // assign choice to player here
//         // assign other choice to computer here
//         playDiv.style.display='none';
//     });
//     selectO.addEventListener('click', () => {
//         //assign choice to player here
//         // assign other choice to computer here
//         playDiv.style.display='none';
//     });
// });

// IIFE module to create a single gameboard
const Gameboard = (function(){
    const playDiv = document.querySelector('#playDiv');
    const playBtn = document.querySelector('.playBtn');
    const selectX = document.querySelector('.selectX');
    const selectO = document.querySelector('.selectO');
    const fields = document.querySelectorAll('.field');
    const O = 'O';
    const X = 'X';
    // const start = prompt('Choose X or O for Tic-Tac-Toe', 'X');
    const startGame = () => {
        let playerChoice = prompt('Choose X or O', 'X');
        let computerChoice;
        let playerMarker;
        let computerMarker;
        if (playerChoice == 'X') {
            let playerMarker = X;
            let computerMarker = O;
        } else if (playerChoice == 'O') {
            let playerMarker = O;
            let computerMarker = X;
        } else {
            startGame();
        };
        return { playerMarker, computerMarker };
    };

    // Render/load gameboard
    let gameboard = [];
    function render() {
        for (let i = 0; i < fields.length; i++) {
            gameboard += fields[i];
        };
    };
    // Play button ADDED TO GAMEBOARD MODULE FROM GLOBAL SCOPE
    playBtn.addEventListener('click', () => {
        playBtn.style.display='none';
        selectX.style.display='block';
        selectO.style.display='block';
        selectX.addEventListener('click', () => {
            // assign choice to player here
            // assign other choice to computer here
            playDiv.style.display='none';
            render();
        });
        selectO.addEventListener('click', () => {
            //assign choice to player here
            // assign other choice to computer here
            playDiv.style.display='none';
            render();
        });
    });
    // Returns clicked field
    //      Now assign choice of player or computer
    fields.forEach(field => {
        field.addEventListener('click', (e) => {
            let target = e.target;
            let parent = target.parentNode;
            let index = [].indexOf.call(parent.children, target);
            console.log(index);
        });
    });
    return { startGame };
})();

// Object constructor Player object
// function Player(name, marker) {
//     this.name = name,
//     this.marker = marker
// }

// Factory function Player object
const Player = function(name, marker) {
    let newPlayer = {};
    newPlayer.name = name;
    newPlayer.marker = marker;
    return newPlayer;
}
const player1 = Player('Rick', "X")
const player2 = Player('Joe', "O");
console.log(player1.name);
console.log(player1.marker);
console.log(player2.name);
console.log(player2.marker);