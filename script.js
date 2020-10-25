let boardArray = ['1', '2', '3', '4', '5', '6', '7', '8', '9'];
let outcome = document.getElementById('outcomeScreen');
let normalAiMoves = [];
let playerMoves = [];
let wins;
let losses;
let win = 0;
let loss = 0;

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
    document.getElementById('menu').style.visibility = 'visible';
    document.getElementById('startButton').style.visibility = 'hidden';
}

function normalButton() {
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
        boardBox.setAttribute('data-box', i);
        boardBox.setAttribute('onclick', 'gameFlow(this.dataset.box)');
        displayBoard.appendChild(boardBox);
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
        box.innerHTML = "X";
        playerMoves.push(marker);
        console.log(playerMoves);
        for (var i = 0; i < boardArray.length; i++) {
            if (boardArray[i] == marker) {
                boardArray.splice(i, 1);
            }
        }
    }
    normalAI();
    checkWin();
}

function checkWin() {
    if (winCondition(playerMoves) == true) {
        outcome.innerHTML = "CONGRATULATIONS YOU'VE WON!"
        outcome.style.visibility = "visible";
        win += 1;
        wins.innerHTML = win + 'W';
    }else if (winCondition(normalAiMoves) == true) {
        outcome.innerHTML = "YOU LOST!"
        outcome.style.visibility = "visible";
        loss += 1;
        losses.innerHTML = loss + 'L';
    }else if (boardArray.length == 0) {
        outcome.innerHTML = "IT'S A DRAW!"
        outcome.style.visibility = "visible";
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
        normalAiMoves.push(randMove);
        let move = document.querySelector(`[data-box='${randMove}']`);
        move.innerHTML = '0';
    }else {
        if (outcome.style.visibility === 'visible') {
            return;
        }else {
            checkWin();
        }
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
    boardArray = boardArray = ['1', '2', '3', '4', '5', '6', '7', '8', '9'];
    playerMoves = [];
    normalAiMoves = [];
    outcome.innerHTML = '';
    let boxes = document.querySelectorAll('.boardBox');
    for (k = 0; k < boxes.length; k++) {
        boxes[k].innerHTML = '';
    }
}