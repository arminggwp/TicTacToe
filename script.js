let boardArray = ['1', '2', '3', '4', '5', '6', '7', '8', '9'];
let outcome = document.getElementById('outcomeScreen');
let aiMoves = [];
let playerMoves = [];
let wins;
let losses;
let win = 0;
let loss = 0;
let gameMode;

function scoreBoard() {
    let score = document.getElementById('scoreBoard');
    let scoreName = document.createElement('div');
    scoreName.setAttribute('id', 'scoreName');
    scoreName.innerHTML = document.getElementById('playerName').value;
    score.appendChild(scoreName);
    wins = document.createElement('div');
    wins.setAttribute('id', 'wins');
    score.appendChild(wins);
    losses = document.createElement('div');
    losses.setAttribute('id', 'losses');
    score.appendChild(losses);
}

function startButton() {
    document.getElementById('startButton').classList.add('fadeOut');
    document.getElementById('menu').classList.add('fadeIn');
}

function normalButton() {
    gameMode = 'normal';
    document.getElementById('title').classList.add('fadeOut');
    document.getElementById('title2').classList.add('fadeIn');
    document.getElementById('menu').classList.remove('fadeIn');
    document.getElementById('menu').classList.add('fadeOut');
    gameGrid();
    scoreBoard();
    document.getElementById('displayBoard').classList.add('fadeIn');
    document.getElementById('reset').classList.add('fadeIn');
    let score = document.getElementById('scoreBoard');
    score.classList.add('fadeIn');
    document.getElementById('changeAI').classList.add('fadeIn');
    document.getElementById('aboutMe').classList.add('fadeIn');
}

function impossibleButton() {
    gameMode = 'impossible';
    document.getElementById('title').style.visibility = 'hidden';
    document.getElementById('title2').style.visibility = 'visible';
    document.getElementById('menu').style.visibility = 'hidden';
    gameGrid();
    scoreBoard();
    document.getElementById('displayBoard').style.visibility = 'visible';
    document.getElementById('reset').style.visibility = 'visible';
    let score = document.getElementById('scoreBoard');
    score.style.visibility = 'visible';
    document.getElementById('changeAI').style.visibility = 'visible';
    document.getElementById('aboutMe').style.visibility = 'visible';
}

const displayBoard = document.getElementById('displayBoard');
function gameGrid() {
    for (let i = 1; i < 10; i++) {
        const boardBox = document.createElement('div');
        boardBox.classList.add('boardBox');
        displayBoard.appendChild(boardBox);
        const shape = document.createElement('div');
        shape.classList.add('shape');
        shape.setAttribute('data-box', i);
        shape.setAttribute('onclick', 'gameFlow(this.dataset.box)');
        boardBox.appendChild(shape);
    }
    displayBoard.style.gridTemplateRows = `repeat(3, 1fr)`;
    displayBoard.style.gridTemplateColumns = `repeat(3, 1fr)`;
}

// Player move function
function gameFlow(marker) {
    let box = document.querySelector(`[data-box='${marker}']`);
    if (box.innerHTML !== '') {
        return;
    }else {
        box.innerText = "X";
        box.style.color = '#b7e4c7';
        box.classList.add('fadeIn');
        playerMoves.push(marker);
        console.log(playerMoves);
        for (var i = 0; i < boardArray.length; i++) {
            if (boardArray[i] == marker) {
                boardArray.splice(i, 1);
            }
        }
    }
    if (gameMode === 'normal') {
        normalAI();
    }else if (gameMode === 'impossible') {
        impossibleAI();
    }
    checkWin();
}

function checkWin() {
    if (winCondition(playerMoves) == true) {
        outcome.innerHTML = "CONGRATULATIONS YOU'VE WON!"
        outcome.classList.add('fadeIn');
        win += 1;
        wins.innerHTML = win + 'W';
    }else if (winCondition(aiMoves) == true) {
        outcome.innerHTML = "YOU LOST!"
        outcome.classList.add('fadeIn');
        loss += 1;
        losses.innerHTML = loss + 'L';
    }else if (boardArray.length == 0) {
        outcome.innerHTML = "IT'S A DRAW!"
        outcome.classList.add('fadeIn');
    }
}

// normal(random) AI move function
function normalAI() {
    if (boardArray.length != 0) {
        let randMove = boardArray[Math.floor(Math.random() * boardArray.length)];
        for (var i = 0; i < boardArray.length; i++) {
            if (boardArray[i] == randMove) {
                boardArray.splice(i, 1);
            }
        }
        aiMoves.push(randMove);
        let move = document.querySelector(`[data-box='${randMove}']`);
        setTimeout(function(){
            move.innerHTML = 'O'
            move.style.color = '#6d597a';
            move.classList.add('fadeIn');
        }, 1000);
    }
}

function winCondition(arr) {
    if (arr.indexOf('1') > -1 && arr.indexOf('2') > -1 && arr.indexOf('3') > -1) {
        return true;
    }else if (arr.indexOf('4') > -1 && arr.indexOf('5') > -1 && arr.indexOf('6') > -1) {
        return true;
    }else if (arr.indexOf('7') > -1 && arr.indexOf('8') > -1 && arr.indexOf('9') > -1) {
        return true;
    }else if (arr.indexOf('1') > -1 && arr.indexOf('5') > -1 && arr.indexOf('9') > -1) {
        return true;
    }else if (arr.indexOf('3') > -1 && arr.indexOf('5') > -1 && arr.indexOf('7') > -1) {
        return true;
    }else if (arr.indexOf('1') > -1 && arr.indexOf('4') > -1 && arr.indexOf('7') > -1) {
        return true;
    }else if (arr.indexOf('2') > -1 && arr.indexOf('5') > -1 && arr.indexOf('8') > -1) {
        return true;
    }else if (arr.indexOf('3') > -1 && arr.indexOf('6') > -1 && arr.indexOf('9') > -1) {
        return true;
    }
}

function resetGame() {
    boardArray = ['1', '2', '3', '4', '5', '6', '7', '8', '9'];
    playerMoves = [];
    aiMoves = [];
    outcome.visibility = 'hidden',
    outcome.classList.remove('fadeIn');
    let boxes = document.querySelectorAll('.shape');
    for (var k = 0; k < boxes.length; k++) {
        boxes[k].innerHTML = '';
        boxes[k].classList.remove('fadeIn');
    }
}

//evaluate all current possible board endings
function evalBoard() {
    let boardValue;
    let moveDepth;
    
}

function impossibleAI() {
    gameMode = 'impossible';
}

/* struggles if you dont play a perfect move, can't handle dumb moves */



/*

    1   2   3

    4   5   6

    7   8   9

*/