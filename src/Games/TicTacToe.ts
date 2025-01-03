import { IGame } from "../../types/Game";
import { socketService } from "../main";

export class TicTacToe implements IGame {
  private game: {
    gridSize: number;
    isOver: boolean;
    board: string[][];
  };
  private player1: {
    name: string;
    symbol: string;
    isTurn: boolean;
    moves: any[];
  };
  private player2: {
    name: string;
    symbol: string;
    isTurn: boolean;
    moves: any[];
  };

  constructor() {
    this.game = { gridSize: 3, isOver: false, board: [] };
    this.player1 = { name: "Player 1", symbol: "X", isTurn: true, moves: [] };
    this.player2 = { name: "Player 2", symbol: "O", isTurn: false, moves: [] };
  }

  start(): void {
    this.init();
  }

  play(): void {
    // Game loop logic
  }

  end(): void {
    this.resetGame();
  }

  init() {
    this.setupBoard();
    this.setupEventListeners();
  }

  private setupBoard() {
    let gridOption = document.getElementById("gridOption");
    if (gridOption) {
      // Draw initial board with default selected option
      let selectedOption = gridOption.options[gridOption.selectedIndex].value;
      this.drawBoard(selectedOption);

      gridOption.addEventListener("change", () => {
        selectedOption = gridOption.options[gridOption.selectedIndex].value;
        console.log(selectedOption);
        this.resetGame();
        this.drawBoard(selectedOption);
      });
    }
  }

  private drawBoard(selectedOption: string) {
    let board = document.getElementById("board");
    if (board) {
      board.innerHTML = ""; // Clear existing cells

      // Set CSS custom properties (variables)
      const gridSize = parseInt(selectedOption);
      board.classList.add("game-board");
      board.style.setProperty("--grid-size", gridSize);

      this.game.gridSize = gridSize;
      for (let i = 0; i < gridSize; i++) {
        this.game.board[i] = [];
        for (let j = 0; j < gridSize; j++) {
          this.game.board[i][j] = "";
        }
      }

      console.log(`board  ${JSON.stringify(this.game.board)}`);

      const totalCells = gridSize * gridSize + 1;
      for (let i = 1; i < totalCells; i++) {
        const cell = document.createElement("div");
        cell.id = `cell-${i.toString()}`;
        cell.className = "cell";
        board.appendChild(cell);
      }
    }
  }

  private setupEventListeners() {
    let board = document.getElementById("board");
    if (board) {
      board.addEventListener("click", (event: any) => {
        if (event.target.id === "board") {
          return;
        }

        let cell = document.getElementById(event.target.id);
        if (cell && cell.innerHTML === "") {
          this.onPlayerMove(cell.id, this.player1.isTurn);
          socketService.sendPlayerMove(cell.id);
        }
      });
    }
  }

  onPlayerMove(cellId: string, isPlayer1: boolean) {
    const cell = document.getElementById(cellId);

    if (!cell) return;

    const playerSymbol = isPlayer1 ? this.player1.symbol : this.player2.symbol;

    cell.innerHTML = playerSymbol;

    const cellNumber = parseInt(cellId.split("-")[1]);

    const player1i = this.calulateI(cellNumber, this.game.gridSize);
    const player1j = this.calulateJ(cellNumber, this.game.gridSize);
    for (let i = 0; i < this.game.board.length; i++) {
      for (let j = 0; j < this.game.board[i].length; j++) {
        if (i === player1i && j === player1j) {
          this.game.board[i][j] = playerSymbol;
        }
      }
    }
    this.player1.isTurn = !isPlayer1;
    this.player2.isTurn = isPlayer1;

    this.checkWinner(this.game.board, this.player1, this.player2);
    console.log(`board  ${JSON.stringify(this.game.board)}`);

  }

  private calulateI(i: number, gridSize: number): number {
    return i % gridSize === 0 ? i / gridSize - 1 : Math.floor(i / gridSize);
  }

  private calulateJ(i: number, gridSize: number): number {
    return i % gridSize === 0 ? gridSize - 1 : (i % gridSize) - 1;
  }

  private checkWinner(board: string[][], player1: any, player2: any) {
    let isWinnerPlayer1 = 0;
    let isWinnerPlayer2 = 0;

    // colume wise count
    for (let i = 0; i < board.length; i++) {
      isWinnerPlayer1 = 0;
      isWinnerPlayer2 = 0;
      for (let j = 0; j < board[i].length; j++) {
        if (board[i][j] == player1.symbol) {
          isWinnerPlayer1++;
        }
        if (board[i][j] == player2.symbol) {
          isWinnerPlayer2++;
        }
      }

      let isGameOver = this.makeWinner(
        isWinnerPlayer1,
        isWinnerPlayer2,
        this.game
      );
      if (isGameOver) {
        return;
      }
    }

    // row wise count
    for (let j = 0; j < board.length; j++) {
      isWinnerPlayer1 = 0;
      isWinnerPlayer2 = 0;
      for (let i = 0; i < this.game.gridSize; i++) {
        if (board[i][j] === player1.symbol) {
          isWinnerPlayer1++;
        }
        if (board[i][j] === player2.symbol) {
          isWinnerPlayer2++;
        }
      }
      let isGameOver = this.makeWinner(
        isWinnerPlayer1,
        isWinnerPlayer2,
        this.game
      );
      if (isGameOver) {
        return;
      }
    }

    // digonal wise count (right top-->bottom left)
    isWinnerPlayer1 = 0;
    isWinnerPlayer2 = 0;
    for (let i = 0; i < board.length; i++) {
      for (let j = 0; j < board[i].length; j++) {
        if (board[i][j] == player1.symbol && i + j === this.game.gridSize - 1) {
          isWinnerPlayer1++;
        }
        if (board[i][j] == player2.symbol && i + j === this.game.gridSize - 1) {
          isWinnerPlayer2++;
        }
      }
      let isGameOver = this.makeWinner(
        isWinnerPlayer1,
        isWinnerPlayer2,
        this.game
      );
      if (isGameOver) {
        return;
      }
    }

    // digonal wise count (top left-->bottom right)
    isWinnerPlayer1 = 0;
    isWinnerPlayer2 = 0;
    for (let i = 0; i < board.length; i++) {
      for (let j = 0; j < board[i].length; j++) {
        if (board[i][j] == player1.symbol && i === j) {
          isWinnerPlayer1++;
        }
        if (board[i][j] == player2.symbol && i === j) {
          isWinnerPlayer2++;
        }
      }
      let isGameOver = this.makeWinner(
        isWinnerPlayer1,
        isWinnerPlayer2,
        this.game
      );
      if (isGameOver) {
        return;
      }
    }
  }

  private makeWinner(
    isWinnerPlayer1: number,
    isWinnerPlayer2: number,
    game: any
  ): boolean {
    if (isWinnerPlayer1 === game.gridSize) {
      console.log("Player 1 is winner");
      game.isOver = true;
      this.resetGame();
    }
    if (isWinnerPlayer2 === game.gridSize) {
      console.log("Player 2 is winner");
      game.isOver = true;
      this.resetGame();
    }
    return game.isOver;
  }

  private resetGame(): void {
    this.game.isOver = false;
    this.game.board = Array(this.game.gridSize)
      .fill([])
      .map(() => Array(this.game.gridSize).fill(""));
    this.player1.isTurn = true;
    this.player2.isTurn = false;
    const cells = document.querySelectorAll(".cell");
    cells.forEach((cell) => (cell.innerHTML = ""));
  }
}
