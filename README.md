# Tic Tac Toe Game

A multiplayer Tic Tac Toe game built with TypeScript and Vite that supports multiple grid sizes (3x3, 4x4, and 5x5).

## Features

- Multiple grid size options (3x3, 4x4, 5x5)
- Two-player gameplay
- Dynamic board generation
- Win detection for rows, columns, and diagonals
- Automatic game reset after a win
- Clean and responsive UI
- Modular architecture with separate game logic and services

## Technologies Used

- TypeScript
- Vite
- HTML5
- CSS3
- WebSocket (for multiplayer functionality)

## Project Structure

## Game Architecture

The game is built using a modular architecture:

- `TicTacToe.ts`: Contains the core game logic and board management
- `SocketService.ts`: Handles real-time communication for multiplayer functionality
- `Room.ts`: Manages game rooms and player sessions
- `Game.ts`: Defines TypeScript interfaces and types for the game

## How to Play

1. Select your desired grid size from the dropdown menu (3x3, 4x4, or 5x5)
2. Player 1 starts with 'X'
3. Player 2 uses 'O'
4. Players take turns clicking empty cells
5. The game automatically detects wins in rows, columns, or diagonals
6. The game resets automatically after a win

## Development

### Available Scripts

- `npm run dev` - Starts the development server
- `npm run build` - Creates a production build
- `npm run preview` - Previews the production build locally

### TypeScript Configuration

The project uses TypeScript with strict type checking enabled. Key compiler options include:

- Target: ES2020
- Module: ESNext
- Strict type checking
- No unused locals/parameters
- Bundler-based module resolution

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is open source and available under the [MIT License](LICENSE).

## Acknowledgments

- Built with [Vite](https://vitejs.dev/)
- TypeScript support
- Modern ES6+ features
