class LightsOutGame {
    constructor(size = 5) {
        this.size = size;
        this.board = [];
        this.moveCount = 0;
        this.initializeBoard();
        this.setupEventListeners();
    }

    initializeBoard() {
        // Create board with all lights off
        this.board = Array(this.size * this.size).fill(false);
        
        // Randomize board to make it solvable
        this.randomizeSolvableBoard();
    }

    setupEventListeners() {
        // Add event listener to New Game button
        const newGameBtn = document.getElementById('new-game-btn');
        newGameBtn.addEventListener('click', () => this.resetGame());
    }

    randomizeSolvableBoard() {
        // Start with an all-white board
        const boardElement = document.getElementById('game-board');
        boardElement.innerHTML = '';

        for (let i = 0; i < this.size * this.size; i++) {
            const square = document.createElement('div');
            square.classList.add('square');
            square.dataset.index = i;
            square.addEventListener('click', this.handleSquareClick.bind(this));
            boardElement.appendChild(square);
        }

        // Simulate random clicks to create a solvable board
        const numRandomClicks = Math.floor(Math.random() * 10) + 5;
        for (let i = 0; i < numRandomClicks; i++) {
            const randomIndex = Math.floor(Math.random() * (this.size * this.size));
            this.toggleSquares(randomIndex);
        }

        this.updateBoard();
        this.moveCount = 0;
        document.getElementById('move-count').textContent = 0;
    }

    toggleSquares(index) {
        const neighbors = [
            index,                     // Current square
            index - this.size,         // Square above
            index + this.size,          // Square below
            index % this.size !== 0 ? index - 1 : -1,         // Square to the left
            (index + 1) % this.size !== 0 ? index + 1 : -1    // Square to the right
        ];

        neighbors.forEach(neighborIndex => {
            if (neighborIndex >= 0 && neighborIndex < this.size * this.size) {
                const square = document.querySelector(`.square[data-index="${neighborIndex}"]`);
                if (square) {
                    square.classList.toggle('is-off');
                }
            }
        });
    }

    handleSquareClick(event) {
        const index = parseInt(event.target.dataset.index);
        this.toggleSquares(index);
        this.moveCount++;
        document.getElementById('move-count').textContent = this.moveCount;
        
        if (this.checkWin()) {
            window.alert('You win! 🎉');
            this.resetGame();
        }
    }

    updateBoard() {
        const squares = document.querySelectorAll('.square');
        squares.forEach((square, index) => {
            const isOn = square.classList.contains('is-off');
            this.board[index] = isOn;
        });
    }

    checkWin() {
        return document.querySelectorAll('.square.is-off').length === 0;
    }

    resetGame() {
        this.randomizeSolvableBoard();
    }
}

// Initialize the game when the page loads
document.addEventListener('DOMContentLoaded', () => {
    new LightsOutGame();
});