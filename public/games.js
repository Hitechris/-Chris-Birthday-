
// Christopher's Birthday Monopoly Game Logic

const gameState = {
    currentPlayer: 1,
    players: {
        1: { name: 'Player 1', money: 1500, position: 0, properties: [] },
        2: { name: 'Player 2', money: 1500, position: 0, properties: [] }
    },
    hasRolled: false,
    gameLog: []
};

const spaces = [
    { name: 'GO', type: 'go', action: 'collect', amount: 200 },
    { name: 'Birthday Cake Avenue', type: 'property', price: 60, rent: 10 },
    { name: '🎁 Gift Card', type: 'chest' },
    { name: 'Party Hat Place', type: 'property', price: 60, rent: 10 },
    { name: 'Birthday Tax', type: 'tax', amount: 200 },
    { name: '🚂 Celebration Station', type: 'railroad', price: 200, rent: 50 },
    { name: 'Balloon Boulevard', type: 'property', price: 100, rent: 15 },
    { name: '❓ Surprise', type: 'chance' },
    { name: 'Confetti Court', type: 'property', price: 100, rent: 15 },
    { name: 'Streamers Street', type: 'property', price: 120, rent: 18 },
    { name: 'Time Out', type: 'jail' },
    { name: 'Candle Lane', type: 'property', price: 140, rent: 20 },
    { name: '🎵 Music Box', type: 'utility', price: 150, rent: 25 },
    { name: 'Frosting Falls', type: 'property', price: 140, rent: 20 },
    { name: 'Sprinkles Square', type: 'property', price: 160, rent: 22 },
    { name: '🚂 Party Express', type: 'railroad', price: 200, rent: 50 },
    { name: 'Wish Avenue', type: 'property', price: 180, rent: 25 },
    { name: '🎁 Gift Card', type: 'chest' },
    { name: 'Memory Lane', type: 'property', price: 180, rent: 25 },
    { name: 'Celebration Circle', type: 'property', price: 200, rent: 28 },
    { name: 'Free Parking', type: 'free' },
    { name: 'Gift Wrap Grove', type: 'property', price: 220, rent: 30 },
    { name: '❓ Surprise', type: 'chance' },
    { name: 'Present Plaza', type: 'property', price: 220, rent: 30 },
    { name: 'Ribbon Road', type: 'property', price: 240, rent: 32 },
    { name: '🚂 Joy Junction', type: 'railroad', price: 200, rent: 50 },
    { name: 'Happiness Highway', type: 'property', price: 260, rent: 35 },
    { name: 'Smile Street', type: 'property', price: 260, rent: 35 },
    { name: '🎪 Party Tent', type: 'utility', price: 150, rent: 25 },
    { name: 'Laughter Lane', type: 'property', price: 280, rent: 38 },
    { name: 'Go to Time Out', type: 'gotojail' },
    { name: 'Christopher Court', type: 'property', price: 300, rent: 40 },
    { name: 'Birthday Boulevard', type: 'property', price: 300, rent: 40 },
    { name: '🎁 Gift Card', type: 'chest' },
    { name: 'Festivity Field', type: 'property', price: 320, rent: 42 },
    { name: '🚂 Fun Ferry', type: 'railroad', price: 200, rent: 50 },
    { name: '❓ Surprise', type: 'chance' },
    { name: 'VIP Village', type: 'property', price: 350, rent: 45 },
    { name: 'Luxury Tax', type: 'tax', amount: 100 },
    { name: 'Party Palace', type: 'property', price: 400, rent: 50 }
];

const chestCards = [
    { text: 'Happy Birthday! Collect $200', amount: 200 },
    { text: 'You won a party game! Collect $100', amount: 100 },
    { text: 'Birthday gift from grandma! Collect $50', amount: 50 },
    { text: 'Cake delivery fee. Pay $50', amount: -50 },
    { text: 'Advance to GO! Collect $200', special: 'go' }
];

const chanceCards = [
    { text: 'Surprise party! Collect $150', amount: 150 },
    { text: 'Birthday wishes from friends! Collect $100', amount: 100 },
    { text: 'Party cleanup cost. Pay $75', amount: -75 },
    { text: 'Go back 3 spaces', special: 'back3' },
    { text: 'Advance to the nearest railroad', special: 'railroad' }
];

// Initialize game
function initGame() {
    document.getElementById('roll-dice').addEventListener('click', rollDice);
    document.getElementById('end-turn').addEventListener('click', endTurn);
    document.getElementById('restart-game').addEventListener('click', restartGame);
    updateDisplay();
    addLog('🎮 Game started! Player 1 goes first.');
}

function rollDice() {
    if (gameState.hasRolled) return;
    
    const dice1 = Math.floor(Math.random() * 6) + 1;
    const dice2 = Math.floor(Math.random() * 6) + 1;
    const total = dice1 + dice2;
    
    gameState.hasRolled = true;
    document.getElementById('roll-dice').disabled = true;
    document.getElementById('end-turn').disabled = false;
    
    const player = gameState.players[gameState.currentPlayer];
    const oldPosition = player.position;
    player.position = (player.position + total) % 40;
    
    // Check if passed GO
    if (player.position < oldPosition) {
        player.money += 200;
        addLog(`${player.name} passed GO! Collected $200`);
    }
    
    addLog(`${player.name} rolled ${dice1} + ${dice2} = ${total}`);
    moveToken(gameState.currentPlayer, player.position);
    
    setTimeout(() => {
        handleSpace(player.position);
        updateDisplay();
    }, 600);
}

function moveToken(playerNum, position) {
    const token = document.getElementById(`player${playerNum}-token`);
    const space = document.querySelector(`[data-space="${position}"]`);
    
    if (space) {
        const rect = space.getBoundingClientRect();
        const boardRect = document.querySelector('.monopoly-board').getBoundingClientRect();
        
        const left = rect.left - boardRect.left + (playerNum === 1 ? 20 : 50);
        const top = rect.top - boardRect.top + 20;
        
        token.style.left = `${left}px`;
        token.style.top = `${top}px`;
        token.style.bottom = 'auto';
        token.style.right = 'auto';
    }
}

function handleSpace(position) {
    const space = spaces[position];
    const player = gameState.players[gameState.currentPlayer];
    
    addLog(`${player.name} landed on ${space.name}`);
    
    switch (space.type) {
        case 'go':
            player.money += space.amount;
            addLog(`Collected $${space.amount}`);
            break;
        case 'property':
        case 'railroad':
        case 'utility':
            handleProperty(space, position);
            break;
        case 'tax':
            player.money -= space.amount;
            addLog(`Paid $${space.amount} in taxes`);
            break;
        case 'chest':
            handleChest();
            break;
        case 'chance':
            handleChance();
            break;
        case 'gotojail':
            player.position = 10;
            moveToken(gameState.currentPlayer, 10);
            addLog(`${player.name} went to Time Out!`);
            break;
        case 'free':
            addLog('Just relaxing at Free Parking!');
            break;
        case 'jail':
            addLog('Just visiting Time Out');
            break;
    }
    
    updateDisplay();
}

function handleProperty(space, position) {
    const player = gameState.players[gameState.currentPlayer];
    const otherPlayer = gameState.players[gameState.currentPlayer === 1 ? 2 : 1];
    
    if (player.properties.includes(position)) {
        addLog('You already own this property!');
    } else if (otherPlayer.properties.includes(position)) {
        player.money -= space.rent;
        otherPlayer.money += space.rent;
        addLog(`Paid $${space.rent} rent to other player`);
    } else {
        if (player.money >= space.price && confirm(`Buy ${space.name} for $${space.price}?`)) {
            player.money -= space.price;
            player.properties.push(position);
            addLog(`Purchased ${space.name} for $${space.price}`);
        }
    }
}

function handleChest() {
    const card = chestCards[Math.floor(Math.random() * chestCards.length)];
    const player = gameState.players[gameState.currentPlayer];
    
    addLog(`Gift Card: ${card.text}`);
    
    if (card.special === 'go') {
        player.position = 0;
        player.money += 200;
        moveToken(gameState.currentPlayer, 0);
    } else {
        player.money += card.amount;
    }
}

function handleChance() {
    const card = chanceCards[Math.floor(Math.random() * chanceCards.length)];
    const player = gameState.players[gameState.currentPlayer];
    
    addLog(`Surprise: ${card.text}`);
    
    if (card.special === 'back3') {
        player.position = Math.max(0, player.position - 3);
        moveToken(gameState.currentPlayer, player.position);
        setTimeout(() => handleSpace(player.position), 600);
    } else if (card.special === 'railroad') {
        const railroads = [5, 15, 25, 35];
        const nextRailroad = railroads.find(r => r > player.position) || railroads[0];
        player.position = nextRailroad;
        moveToken(gameState.currentPlayer, nextRailroad);
        setTimeout(() => handleSpace(player.position), 600);
    } else {
        player.money += card.amount;
    }
}

function endTurn() {
    gameState.currentPlayer = gameState.currentPlayer === 1 ? 2 : 1;
    gameState.hasRolled = false;
    document.getElementById('roll-dice').disabled = false;
    document.getElementById('end-turn').disabled = true;
    
    addLog(`--- ${gameState.players[gameState.currentPlayer].name}'s turn ---`);
    updateDisplay();
}

function updateDisplay() {
    const player = gameState.players[gameState.currentPlayer];
    document.querySelector('#current-player span').textContent = player.name;
    document.querySelector('#player-money span').textContent = `$${player.money}`;
    
    const lastLog = gameState.gameLog[gameState.gameLog.length - 1] || '';
    if (lastLog.includes('rolled')) {
        document.querySelector('#dice-result span').textContent = lastLog.split('rolled ')[1] || '-';
    }
}

function addLog(message) {
    gameState.gameLog.push(message);
    const logContent = document.getElementById('log-content');
    const entry = document.createElement('div');
    entry.className = 'log-entry';
    entry.textContent = message;
    logContent.appendChild(entry);
    logContent.scrollTop = logContent.scrollHeight;
}

function restartGame() {
    if (confirm('Start a new game?')) {
        gameState.currentPlayer = 1;
        gameState.players[1] = { name: 'Player 1', money: 1500, position: 0, properties: [] };
        gameState.players[2] = { name: 'Player 2', money: 1500, position: 0, properties: [] };
        gameState.hasRolled = false;
        gameState.gameLog = [];
        
        document.getElementById('log-content').innerHTML = '';
        document.getElementById('roll-dice').disabled = false;
        document.getElementById('end-turn').disabled = true;
        
        moveToken(1, 0);
        moveToken(2, 0);
        
        updateDisplay();
        addLog('🎮 New game started! Player 1 goes first.');
    }
}

// Start the game when page loads
document.addEventListener('DOMContentLoaded', initGame);
