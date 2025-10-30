
// Christopher's Birthday Candy Crush Game

const BOARD_SIZE = 8;
const CANDY_TYPES = ['🎂', '🍰', '🧁', '🍭', '🍬', '🍫'];

const gameState = {
    board: [],
    score: 0,
    moves: 30,
    level: 1,
    selectedCandy: null,
    isProcessing: false
};

// Initialize the game
function initGame() {
    createBoard();
    updateDisplay();
    
    document.getElementById('new-game').addEventListener('click', newGame);
    document.getElementById('hint-btn').addEventListener('click', showHint);
}

// Create the game board
function createBoard() {
    const boardElement = document.getElementById('game-board');
    boardElement.innerHTML = '';
    gameState.board = [];
    
    for (let row = 0; row < BOARD_SIZE; row++) {
        gameState.board[row] = [];
        for (let col = 0; col < BOARD_SIZE; col++) {
            const candy = createCandy(row, col);
            gameState.board[row][col] = candy;
            boardElement.appendChild(candy.element);
        }
    }
    
    // Ensure no initial matches
    while (checkAllMatches().length > 0) {
        regenerateBoard();
    }
}

// Create a single candy
function createCandy(row, col) {
    const candyElement = document.createElement('div');
    candyElement.className = 'candy';
    const type = CANDY_TYPES[Math.floor(Math.random() * CANDY_TYPES.length)];
    candyElement.textContent = type;
    candyElement.dataset.row = row;
    candyElement.dataset.col = col;
    
    candyElement.addEventListener('click', () => handleCandyClick(row, col));
    
    return {
        element: candyElement,
        type: type,
        row: row,
        col: col
    };
}

// Regenerate board to avoid initial matches
function regenerateBoard() {
    for (let row = 0; row < BOARD_SIZE; row++) {
        for (let col = 0; col < BOARD_SIZE; col++) {
            const newType = CANDY_TYPES[Math.floor(Math.random() * CANDY_TYPES.length)];
            gameState.board[row][col].type = newType;
            gameState.board[row][col].element.textContent = newType;
        }
    }
}

// Handle candy click
function handleCandyClick(row, col) {
    if (gameState.isProcessing || gameState.moves <= 0) return;
    
    const candy = gameState.board[row][col];
    
    if (!gameState.selectedCandy) {
        // First candy selected
        gameState.selectedCandy = candy;
        candy.element.classList.add('selected');
    } else {
        // Second candy selected
        const selected = gameState.selectedCandy;
        selected.element.classList.remove('selected');
        
        // Check if adjacent
        if (isAdjacent(selected, candy)) {
            swapCandies(selected, candy);
        } else {
            gameState.selectedCandy = candy;
            candy.element.classList.add('selected');
        }
    }
}

// Check if two candies are adjacent
function isAdjacent(candy1, candy2) {
    const rowDiff = Math.abs(candy1.row - candy2.row);
    const colDiff = Math.abs(candy1.col - candy2.col);
    return (rowDiff === 1 && colDiff === 0) || (rowDiff === 0 && colDiff === 1);
}

// Swap two candies
async function swapCandies(candy1, candy2) {
    gameState.isProcessing = true;
    
    // Swap in array
    [gameState.board[candy1.row][candy1.col], gameState.board[candy2.row][candy2.col]] = 
    [gameState.board[candy2.row][candy2.col], gameState.board[candy1.row][candy1.col]];
    
    // Update positions
    [candy1.row, candy2.row] = [candy2.row, candy1.row];
    [candy1.col, candy2.col] = [candy2.col, candy1.col];
    
    // Swap types
    [candy1.type, candy2.type] = [candy2.type, candy1.type];
    [candy1.element.textContent, candy2.element.textContent] = 
    [candy2.element.textContent, candy1.element.textContent];
    
    await sleep(200);
    
    const matches = checkAllMatches();
    
    if (matches.length > 0) {
        // Valid move
        gameState.moves--;
        gameState.selectedCandy = null;
        await processMatches();
    } else {
        // Invalid move - swap back
        [gameState.board[candy1.row][candy1.col], gameState.board[candy2.row][candy2.col]] = 
        [gameState.board[candy2.row][candy2.col], gameState.board[candy1.row][candy1.col]];
        
        [candy1.row, candy2.row] = [candy2.row, candy1.row];
        [candy1.col, candy2.col] = [candy2.col, candy1.col];
        
        [candy1.type, candy2.type] = [candy2.type, candy1.type];
        [candy1.element.textContent, candy2.element.textContent] = 
        [candy2.element.textContent, candy1.element.textContent];
        
        showMessage('No match! Try again');
        gameState.selectedCandy = null;
    }
    
    updateDisplay();
    gameState.isProcessing = false;
    
    if (gameState.moves <= 0) {
        endGame();
    }
}

// Check for all matches on the board
function checkAllMatches() {
    const matches = [];
    
    // Check horizontal matches
    for (let row = 0; row < BOARD_SIZE; row++) {
        for (let col = 0; col < BOARD_SIZE - 2; col++) {
            const type = gameState.board[row][col].type;
            if (type === gameState.board[row][col + 1].type && 
                type === gameState.board[row][col + 2].type) {
                let matchLength = 3;
                while (col + matchLength < BOARD_SIZE && 
                       gameState.board[row][col + matchLength].type === type) {
                    matchLength++;
                }
                for (let i = 0; i < matchLength; i++) {
                    matches.push({ row, col: col + i });
                }
                col += matchLength - 1;
            }
        }
    }
    
    // Check vertical matches
    for (let col = 0; col < BOARD_SIZE; col++) {
        for (let row = 0; row < BOARD_SIZE - 2; row++) {
            const type = gameState.board[row][col].type;
            if (type === gameState.board[row + 1][col].type && 
                type === gameState.board[row + 2][col].type) {
                let matchLength = 3;
                while (row + matchLength < BOARD_SIZE && 
                       gameState.board[row + matchLength][col].type === type) {
                    matchLength++;
                }
                for (let i = 0; i < matchLength; i++) {
                    matches.push({ row: row + i, col });
                }
                row += matchLength - 1;
            }
        }
    }
    
    // Remove duplicates
    const uniqueMatches = [];
    matches.forEach(match => {
        if (!uniqueMatches.find(m => m.row === match.row && m.col === match.col)) {
            uniqueMatches.push(match);
        }
    });
    
    return uniqueMatches;
}

// Process all matches
async function processMatches() {
    let matches = checkAllMatches();
    
    while (matches.length > 0) {
        // Add score
        const points = matches.length * 10 * gameState.level;
        gameState.score += points;
        
        if (matches.length >= 4) {
            showMessage(`Amazing! +${points} points! 🎉`);
        } else {
            showMessage(`+${points} points!`);
        }
        
        // Animate matched candies
        matches.forEach(match => {
            gameState.board[match.row][match.col].element.classList.add('matched');
        });
        
        await sleep(500);
        
        // Remove matched candies
        matches.forEach(match => {
            gameState.board[match.row][match.col] = null;
        });
        
        // Drop candies
        await dropCandies();
        
        // Fill empty spaces
        await fillBoard();
        
        // Check for new matches
        matches = checkAllMatches();
    }
    
    updateDisplay();
}

// Drop candies to fill gaps
async function dropCandies() {
    for (let col = 0; col < BOARD_SIZE; col++) {
        let emptyRow = BOARD_SIZE - 1;
        for (let row = BOARD_SIZE - 1; row >= 0; row--) {
            if (gameState.board[row][col] !== null) {
                if (row !== emptyRow) {
                    gameState.board[emptyRow][col] = gameState.board[row][col];
                    gameState.board[emptyRow][col].row = emptyRow;
                    gameState.board[row][col] = null;
                }
                emptyRow--;
            }
        }
    }
    
    // Update DOM
    const boardElement = document.getElementById('game-board');
    boardElement.innerHTML = '';
    for (let row = 0; row < BOARD_SIZE; row++) {
        for (let col = 0; col < BOARD_SIZE; col++) {
            if (gameState.board[row][col]) {
                boardElement.appendChild(gameState.board[row][col].element);
            }
        }
    }
    
    await sleep(200);
}

// Fill empty spaces with new candies
async function fillBoard() {
    for (let row = 0; row < BOARD_SIZE; row++) {
        for (let col = 0; col < BOARD_SIZE; col++) {
            if (gameState.board[row][col] === null) {
                const candy = createCandy(row, col);
                candy.element.classList.add('falling');
                gameState.board[row][col] = candy;
                document.getElementById('game-board').appendChild(candy.element);
            }
        }
    }
    
    await sleep(300);
}

// Show hint
function showHint() {
    if (gameState.isProcessing) return;
    
    // Remove previous hints
    document.querySelectorAll('.candy.hint').forEach(el => el.classList.remove('hint'));
    
    // Find a valid move
    for (let row = 0; row < BOARD_SIZE; row++) {
        for (let col = 0; col < BOARD_SIZE; col++) {
            // Try swapping with right neighbor
            if (col < BOARD_SIZE - 1) {
                const candy1 = gameState.board[row][col];
                const candy2 = gameState.board[row][col + 1];
                
                [candy1.type, candy2.type] = [candy2.type, candy1.type];
                if (checkAllMatches().length > 0) {
                    [candy1.type, candy2.type] = [candy2.type, candy1.type];
                    candy1.element.classList.add('hint');
                    candy2.element.classList.add('hint');
                    setTimeout(() => {
                        candy1.element.classList.remove('hint');
                        candy2.element.classList.remove('hint');
                    }, 2000);
                    return;
                }
                [candy1.type, candy2.type] = [candy2.type, candy1.type];
            }
            
            // Try swapping with bottom neighbor
            if (row < BOARD_SIZE - 1) {
                const candy1 = gameState.board[row][col];
                const candy2 = gameState.board[row + 1][col];
                
                [candy1.type, candy2.type] = [candy2.type, candy1.type];
                if (checkAllMatches().length > 0) {
                    [candy1.type, candy2.type] = [candy2.type, candy1.type];
                    candy1.element.classList.add('hint');
                    candy2.element.classList.add('hint');
                    setTimeout(() => {
                        candy1.element.classList.remove('hint');
                        candy2.element.classList.remove('hint');
                    }, 2000);
                    return;
                }
                [candy1.type, candy2.type] = [candy2.type, candy1.type];
            }
        }
    }
}

// Update display
function updateDisplay() {
    document.getElementById('score').textContent = gameState.score;
    document.getElementById('moves').textContent = gameState.moves;
    document.getElementById('level').textContent = gameState.level;
}

// Show message
function showMessage(text) {
    const messageEl = document.getElementById('game-message');
    messageEl.textContent = text;
    messageEl.classList.add('show');
    setTimeout(() => messageEl.classList.remove('show'), 1500);
}

// End game
function endGame() {
    const message = gameState.score >= 1000 ? 
        `🎉 Amazing! Final Score: ${gameState.score}! 🎉` : 
        `Game Over! Score: ${gameState.score}. Try again!`;
    
    setTimeout(() => {
        showMessage(message);
        if (confirm(`${message}\n\nPlay again?`)) {
            newGame();
        }
    }, 500);
}

// Start new game
function newGame() {
    gameState.score = 0;
    gameState.moves = 30;
    gameState.level = 1;
    gameState.selectedCandy = null;
    gameState.isProcessing = false;
    
    createBoard();
    updateDisplay();
    showMessage('New game started! Good luck! 🍀');
}

// Helper function for delays
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

// Start the game when page loads
document.addEventListener('DOMContentLoaded', initGame);
