

let gridOption = document.getElementById('gridOption');
const game = { gridSize: 3, isOver: false, board: [[]] };
if (gridOption) {
    // Draw initial board with default selected option
    let selectedOption = gridOption.options[gridOption.selectedIndex].value;
    drawBoard(selectedOption);

    gridOption.addEventListener('change', function () {
        selectedOption = gridOption.options[gridOption.selectedIndex].value;
        console.log(selectedOption);
        resetGame();
        drawBoard(selectedOption);
    });
}

function drawBoard(selectedOption) {
    let board = document.getElementById('board');
    board.innerHTML = ''; // Clear existing cells

    // Set CSS custom properties (variables)
    const gridSize = parseInt(selectedOption);
    board.classList.add('game-board');
    board.style.setProperty('--grid-size', gridSize);

    game.gridSize = gridSize;
    for (let i = 0; i < gridSize; i++) {
        game.board[i] = [];
        for (let j = 0; j < gridSize; j++) {
            game.board[i][j] = '';
        }
    }

    console.log(`board  ${JSON.stringify(game.board)}`);


    const totalCells = (gridSize * gridSize) + 1;
    for (let i = 1; i < totalCells; i++) {
        const cell = document.createElement('div');
        cell.id = i;
        cell.className = 'cell';
        board.appendChild(cell);
    }

}

let board = document.getElementById('board');


const player1 = { 'name': 'Player 1', 'symbol': 'X', 'isTurn': true, moves: [] };
const player2 = { 'name': 'Player 2', 'symbol': 'O', 'isTurn': false, moves: [] };

function calulateI(i, gridSize) {
    return i % gridSize === 0 ? i / gridSize - 1 : Math.floor(i / gridSize);
}
function calulateJ(i, gridSize) {
    return i % gridSize === 0 ? gridSize - 1 : i % gridSize - 1;
}

if (board) {
    board.addEventListener('click', function (event) {
        console.log(event.target.id);
        if (event.target.id === 'board') {
            return;
        }
        let cell = document.getElementById(event.target.id);
        if (cell.innerHTML === '') {
            if (player1.isTurn) {
                cell.innerHTML = player1.symbol;
                
                
                const player1i = calulateI(parseInt(cell.id), game.gridSize);
                const player1j = calulateJ(parseInt(cell.id), game.gridSize);
                for (let i = 0; i < game.board.length; i++) {
                    for (let j = 0; j < game.board[i].length; j++) {
                        if (i === player1i && j === player1j) {
                            game.board[i][j] = player1.symbol;
                        }
                    }
                }
                player1.isTurn = false;
                player2.isTurn = true;
            } else {
                cell.innerHTML = player2.symbol;
                // player2.moves.push({ i : calulateI(parseInt(cell.id),game.gridSize) , j : calulateJ(parseInt(cell.id), game.gridSize)});
                const player2i = calulateI(parseInt(cell.id), game.gridSize);
                const player2j = calulateJ(parseInt(cell.id), game.gridSize);
                for (let i = 0; i < game.board.length; i++) {
                    for (let j = 0; j < game.board[i].length; j++) {
                        if (i === player2i && j === player2j) {
                            game.board[i][j] = player2.symbol;
                        }
                    }
                }
                player2.isTurn = false;
                player1.isTurn = true;
            }


        }

        console.log(`board  ${JSON.stringify(game.board)}`);




        checkWinner(game.board, player1, player2);


    });
}

function checkWinner(board, player1, player2) {

    let isWinnerPlayer1 = 0;
    let isWinnerPlayer2 = 0;

    // colume wise count
    for (let i = 0; i < board.length; i++) {
        isWinnerPlayer1 = 0;
        isWinnerPlayer2 = 0;
        for (let j = 0; j < board[i].length; j++) {
            if (board[i][j] == player1.symbol) { isWinnerPlayer1++; }
            if (board[i][j] == player2.symbol) { isWinnerPlayer2++; }
        }

        let isGameOver = makeWinner(isWinnerPlayer1, isWinnerPlayer2, game);
        if (isGameOver) { return; }

    }
    //console.log(`isWinnerPlayer1 ${isWinnerPlayer1}`);
    // console.log(`isWinnerPlayer2 ${isWinnerPlayer2}`);




    // row wise count

    for (let j = 0; j < board.length; j++) {
        isWinnerPlayer1 = 0;
        isWinnerPlayer2 = 0;
        for (let i = 0; i < game.gridSize; i++) {
            if (board[i][j] === player1.symbol) { isWinnerPlayer1++; }
            if (board[i][j] === player2.symbol) { isWinnerPlayer2++; }
        }
        let isGameOver = makeWinner(isWinnerPlayer1, isWinnerPlayer2, game);
        if (isGameOver) { return; }
    }

    //console.log(`isWinnerPlayer1 ${isWinnerPlayer1}`);
    //console.log(`isWinnerPlayer2 ${isWinnerPlayer2}`);



    // digonal wise count (right top-->bottom left)


    isWinnerPlayer1 = 0;
    isWinnerPlayer2 = 0;

    for (let i = 0; i < board.length; i++) {

        for (let j = 0; j < board[i].length; j++) {
            if (board[i][j] == player1.symbol && (i + j) === (game.gridSize - 1)) { isWinnerPlayer1++; }
            if (board[i][j] == player2.symbol && (i + j) === (game.gridSize - 1)) { isWinnerPlayer2++; }
        }

        isGameOver = makeWinner(isWinnerPlayer1, isWinnerPlayer2, game);
        if (isGameOver) { return; }
    }


    // digonal wise count (top left-->bottom right)

    isWinnerPlayer1 = 0;
    isWinnerPlayer2 = 0;
    for (let i = 0; i < board.length; i++) {
        //isWinnerPlayer1 = 0;
        //isWinnerPlayer2 = 0;
        for (let j = 0; j < board[i].length; j++) {
            if (board[i][j] == player1.symbol && (i === j)) { isWinnerPlayer1++; }
            if (board[i][j] == player2.symbol && (i === j)) { isWinnerPlayer2++; }

        }

        isGameOver = makeWinner(isWinnerPlayer1, isWinnerPlayer2, game);
        if (isGameOver) { return; }
    }




}

function makeWinner(isWinnerPlayer1, isWinnerPlayer2, game) {

    if (isWinnerPlayer1 === game.gridSize) {
        console.log('Player 1 is winner');
        game.isOver = true;
        resetGame();
    }
    if (isWinnerPlayer2 === game.gridSize) {
        console.log('Player 2 is winner');
        game.isOver = true;
        resetGame();
    }

    return game.isOver;
}

function resetGame() {
    game.isOver = false;
    game.board = Array(game.gridSize).fill().map(() => Array(game.gridSize).fill(''));
    player1.isTurn = true;
    player2.isTurn = false;
    let cells = document.querySelectorAll('.cell');
    cells.forEach(cell => cell.innerHTML = '');
}

drawBoard(3);




