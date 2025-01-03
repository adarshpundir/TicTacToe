import { RoomLandingPage } from './Room';
import { TicTacToe } from './Games/TicTacToe';
import { Chess } from './Games/Chess';
import { Checkers } from './Games/Checkers';

// Initialize landing page first
const roomLandingPage = new RoomLandingPage();
roomLandingPage.showLandingroomPage();

// Setup game selection
function setupGameSelection() {
    const gameContainer = document.createElement('div');
    gameContainer.id = 'game-container';
    document.body.appendChild(gameContainer);

    const gameSelector = document.createElement('select');
    gameSelector.id = 'gameSelector';
    
    const games = [
        { value: 'tictactoe', text: 'Tic Tac Toe' },
        { value: 'chess', text: 'Chess' },
        { value: 'checkers', text: 'Checkers' }
    ];

    games.forEach(game => {
        const option = document.createElement('option');
        option.value = game.value;
        option.textContent = game.text;
        gameSelector.appendChild(option);
    });

    gameContainer.appendChild(gameSelector);
    
    gameSelector.addEventListener('change', function(e) {
        const selectedGame = (e.target as HTMLSelectElement).value;
        loadGame(selectedGame);
    });
}

function loadGame(gameType: string) {
    const container = document.getElementById('game-container');
    container.innerHTML = '';  // Clear previous game

    switch(gameType) {
        case 'tictactoe':
            const ticTacToe = new TicTacToe();
            ticTacToe.init();
            break;
        case 'chess':
            const chess = new Chess();
            chess.init();
            break;
        case 'checkers':
            const checkers = new Checkers();
            checkers.init();
            break;
    }
}

// Initialize game selection after room landing page is shown
document.addEventListener('roomPageLoaded', setupGameSelection);





