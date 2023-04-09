/* eslint-disable no-unused-vars */
/* eslint-disable no-param-reassign */

const Player = (name, marker) => ({ name, marker });

const gameController = (() => {
  // create players
  const marker1 = document.querySelector('.player1').textContent;
  const marker2 = document.querySelector('.player2').textContent;
  const player1 = Player('X', marker1);
  const player2 = Player('O', marker2);
  let player1Tiles = [];
  let player2Tiles = [];
  let activePlayer = 0; // 0 = P1, 1 = P2

  const winningCombos = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  function reset() {
    player1Tiles = [];
    player2Tiles = [];
    activePlayer = 0;
    document.querySelector('.announcer').textContent = '';
    document.querySelectorAll('.tile').forEach((element) => {
      element.textContent = '';
    });
  }

  function checkEnd(Arr, name) {
    const announcer = document.querySelector('.announcer');
    winningCombos.forEach((element) => {
      if (Arr.includes(element[0]) && Arr.includes(element[1]) && Arr.includes(element[2])) {
        announcer.textContent = `${name} WINS`;
      } else if (Arr.length === 5) {
        announcer.textContent = 'TIE';
      }
    });
  }

  function makeMove(tile, index) {
    if (activePlayer === 0) {
      tile.textContent = player1.marker;
      player1Tiles.push(index);
      activePlayer = 1;
      checkEnd(player1Tiles, player1.name);
    } else if (activePlayer === 1) {
      tile.textContent = player2.marker;
      player2Tiles.push(index);
      activePlayer = 0;
      checkEnd(player2Tiles, player2.name);
    }
  }

  return {
    reset,
    makeMove,
  };
})();

const displayMenu = (() => {
  const allButtons = document.querySelectorAll('button');
  const opponent = document.querySelector('.opponent');
  const markers = document.querySelector('.markers');

  // toggle active / selected buttons
  allButtons.forEach((button) => {
    button.addEventListener('click', () => {
      if (button.textContent === '2P') {
        button.classList.add('active');
        opponent.children[1].classList.remove('active');
      } else if (button.textContent === 'AI') {
        button.classList.add('active');
        opponent.children[0].classList.remove('active');
      } else if (button.textContent === 'X') {
        button.className = 'markerX active player1';
        markers.children[1].className = 'marker0 player2';
      } else if (button.textContent === 'O') {
        button.className = 'markerO active player1';
        markers.children[0].className = 'markerX player2';
      } else if (button.textContent === 'START') {
        document.querySelector('.btnContainer').style.display = 'none';
        document.querySelector('.reset').style.display = 'block';
        document.querySelector('.board').style.display = 'grid';
      } else if (button.textContent === 'RESET') {
        gameController.reset();
      }
    });
  });
})();

const gameBoard = (() => {
  const tiles = new Array(9);
  const board = document.querySelector('.board');

  // create visible tiles on display
  for (let i = 0; i < tiles.length; i += 1) {
    const boardTile = document.createElement('div');
    boardTile.classList.add('tile');
    board.appendChild(boardTile);
  }

  // add event listeners to all tiles
  Array.from(board.children).forEach((tile, index) => {
    tile.addEventListener('click', () => {
      if (tile.textContent === '') {
        gameController.makeMove(tile, index);
      }
    });
  });
})();
