/* scoreboard and game grid could be immediate functions and then
just toggle their visibility */
let difficulty;
let player1Name = document.getElementById('player1').value;
let player2Name = document.getElementById('player1').value;
let p1Score = 0;
let p2Score = 0;
let boardArray = ['0', '1', '2', '3', '4', '5', '6', '7', '8'];

function gameGrid() {
    const displayBoard = document.getElementById('displayBoard');
    displayBoard.style.gridTemplateRows = `repeat(3, 1fr)`;
    displayBoard.style.gridTemplateColumns = `repeat(3, 1fr)`;
    for (let i = 0; i < 9; i++) {
        const gridBox = document.createElement('div');
        gridBox.classList.add('gridBox');
        displayBoard.appendChild(gridBox);
        const shapeContainer = document.createElement('div');
        shapeContainer.classList.add('shapeContainer');
        shapeContainer.setAttribute('data-box', i);
        shapeContainer.setAttribute('onclick', 'gameFlow(this.dataset.box)');
        gridBox.appendChild(shapeContainer);
    }
}

function playerStats() {
    if (player1Name === '') {
        player1Name = 'Player 1';
    }
    if (player2Name === '') {
        player2Name = 'Player 2';
    }
    const stats = document.getElementById('scoreBoard');
    let name1 = document.createElement('div');
    name1.setAttribute('id', 'name1');
    name1.innerHTML = player1Name;
    let name2 = document.createElement('div');
    name2.setAttribute('id', 'name2');
    name2.innerHTML = player2Name;
    name1.classList.add('names');
    name2.classList.add('names');
    stats.appendChild(name1);
    stats.appendChild(name2);
    let wins1 = document.createElement('div');
    wins1.setAttribute('id', 'wins1');
    wins1.innerHTML = p1Score + 'W';
    wins1.classList.add('wins');
    stats.appendChild(wins1);
    let wins2 = document.createElement('div');
    wins2.setAttribute('id', 'wins2');
    wins2.innerHTML = p2Score + 'W';
    wins2.classList.add('wins');
    stats.appendChild(wins2);
}

function score() {
    wins1.innerHTML = p1Score + 'W';
    wins2.innerHTML = p2Score + 'W';

}

function startButton() {
    document.getElementById('startButton').classList.add('fadeOut');
    document.getElementById('menu').classList.add('fadeIn');
}

function diffButton(level) {
    document.getElementById('title').classList.add('fadeOut');
    document.getElementById('title2').classList.add('fadeIn');
    document.getElementById('menu').classList.remove('fadeIn');
    document.getElementById('menu').classList.add('fadeOut');
    document.getElementById('reset').classList.add('fadeIn');
    document.getElementById('aboutMe').classList.add('fadeIn');
    document.getElementById('chooseTurn').classList.add('fadeIn');
    document.getElementById('scoreBoard').classList.add('fadeIn');
    player1Name = document.getElementById('player1').value;
    player2Name = document.getElementById('player2').value;
    difficulty = level;
    playerStats();
}

function resetGame() {
    boardArray = ['0', '1', '2', '3', '4', '5', '6', '7', '8'];
    player1Moves = [];
    player2Moves = [];
    winnerMoves = [];
    game = true;
    let outcome = document.getElementById('outcomeScreen');
    outcome.innerHTML = '';
    outcome.classList.remove('fadeIn');
    outcome.style.visibility = 'hidden';
    let node = document.getElementById('displayBoard');
    while (node.hasChildNodes()) {
        node.removeChild(node.lastChild);
    }
    gameGrid();
    if (currentTurn != 'player1') {
        gameFlow();
    }
}

var myTurn;
var pcTurn;
function turnSelect(xTurn, oTurn) {
    document.getElementById('displayBoard').classList.add('fadeIn');
    document.getElementById('chooseTurn').classList.remove('fadeIn');
    document.getElementById('chooseTurn').classList.add('fadeOut');
    myTurn = xTurn;
    pcTurn = oTurn;
    currentTurn = 'player1';
    gameGrid();
    if(myTurn === 'O') {
        currentTurn = 'player2';
        gameFlow();
    }
}

let currentTurn = '';
let game = true;
function gameFlow(click) {
    if (game) { // true means game is NOT over
        if (currentTurn === 'player1') {
            const player1 = definePlayer(player1Name, myTurn, '#b7e4c7');
            player1.makeMove(click);
            player1Moves.push(click);
            checkEnd();
            if (difficulty != 'friend') {
                gameFlow();
            }
        }else if (currentTurn = 'player2') {
            if (difficulty === 'friend') {
                const player2 = definePlayer(player2Name, pcTurn, '#6d597a');
                player2.makeMove(click);
                player2Moves.push(click);
                checkEnd();
                currentTurn = 'player1';
            }else if (difficulty != 'friend') {
                const enemyAi = computerAi(difficulty, pcTurn, '#6d597a');
                setTimeout(function(){
                    enemyAi.makeMove();
                }, 400);
                currentTurn = 'player1';
            }
        }
    }else if (winnerMoves.length != 0) {
        let allBoxes = document.querySelectorAll('.gridBox');
        let winnerBoxes = winnerMoves.map(Number);
        setTimeout(function(){
            allBoxes[winnerBoxes[0]].classList.add('fadeRed');
            allBoxes[winnerBoxes[1]].classList.add('fadeRed');
            allBoxes[winnerBoxes[2]].classList.add('fadeRed');
        }, 300);
    }
}

function checkEnd() {
    let outcome = document.getElementById('outcomeScreen');
    if (winCondition(player1Moves)) {
        game = false;
        outcome.innerHTML = `${player1Name} WINS!`
        outcome.classList.add('fadeIn');
        p1Score += 1;
        score();
        gameFlow();
    }else if (winCondition(player2Moves)) {
        game = false;
        outcome.innerHTML = `${player2Name} WINS!`
        outcome.classList.add('fadeIn');
        p2Score += 1;
        score();
        gameFlow();
    }else if (boardArray.length == 0) {
        game = false;
        outcome.innerHTML = 'DRAW'
        outcome.classList.add('fadeIn');
        gameFlow();
    }else {
        return
    }
}

let winnerMoves = [];
function winCondition(arr) {
    if (arr.indexOf('0') > -1 && arr.indexOf('1') > -1 && arr.indexOf('2') > -1) {
        winnerMoves = ['0', '1', '2'];
        return true;
    }else if (arr.indexOf('3') > -1 && arr.indexOf('4') > -1 && arr.indexOf('5') > -1) {
        winnerMoves = ['3', '4', '5'];
        return true;
    }else if (arr.indexOf('6') > -1 && arr.indexOf('7') > -1 && arr.indexOf('8') > -1) {
        winnerMoves = ['6', '7', '8'];
        return true;
    }else if (arr.indexOf('0') > -1 && arr.indexOf('4') > -1 && arr.indexOf('8') > -1) {
        winnerMoves = ['0', '4', '8'];
        return true;
    }else if (arr.indexOf('2') > -1 && arr.indexOf('4') > -1 && arr.indexOf('6') > -1) {
        winnerMoves = ['2', '4', '6'];
        return true;
    }else if (arr.indexOf('0') > -1 && arr.indexOf('3') > -1 && arr.indexOf('6') > -1) {
        winnerMoves = ['0', '3', '6'];
        return true;
    }else if (arr.indexOf('1') > -1 && arr.indexOf('4') > -1 && arr.indexOf('7') > -1) {
        winnerMoves = ['1', '4', '7'];
        return true;
    }else if (arr.indexOf('2') > -1 && arr.indexOf('5') > -1 && arr.indexOf('8') > -1) {
        winnerMoves = ['2', '5', '8'];
        return true;
    }else {
        return false;
    }
}

let player1Moves = [];
let player2Moves = [];
const definePlayer = function(name, xo, shapeColor) {
    const getName = () => name;
    const makeMove = function(click) {
        let clickedBox = document.querySelector(`[data-box='${click}']`);
        if (clickedBox.innerHTML == '') {
            clickedBox.innerHTML = xo;
            clickedBox.style.color = shapeColor;
            clickedBox.classList.add('fadeIn');
            for (var i = 0; i < boardArray.length; i++) {
                if (boardArray[i] == click) {
                    boardArray.splice(i, 1);
                }
            }
            currentTurn = 'player2';
        }
    }
    return {getName, makeMove}
}

const computerAi = function(difficulty, xo, shapeColor) {
    const makeMove = function() {
        if (difficulty === 'normal') {
            let randMove = boardArray[Math.floor(Math.random() * boardArray.length)];
            player2Moves.push(randMove);
            let move = document.querySelector(`[data-box='${randMove}']`);
            move.innerHTML = xo;
            move.style.color = shapeColor;
            move.classList.add('fadeIn');
            for (var i = 0; i < boardArray.length; i++) {
                if (boardArray[i] == randMove) {
                    boardArray.splice(i, 1);
                }
            }
            checkEnd();
        }else if (difficulty === 'impossible') {
            // to be added later
        }
    }
    return {makeMove};
}

