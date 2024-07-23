// Initialize game variables
let currentPlayer = 'X';
let moves = 0;
let board = ['', '', '', '', '', '', '', '', ''];
let gameEnded = false; // Flag to track if the game has ended
let player1Name = '';
let player2Name = '';
const winCombinations = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
    [0, 4, 8], [2, 4, 6]             // diagonals
];

// Function player move
function makeMove(index) {
    if (!gameEnded && board[index] === '') { // Check cell is empty or game is not ended
        board[index] = currentPlayer;
        document.getElementsByClassName('cell')[index].innerText = currentPlayer;
        moves++;

        if (checkWin(currentPlayer)) {
            displayMessage(`Player ${currentPlayer} wins!`);
            gameEnded = true; // Mark game finish
        } else if (moves === 9) {
            displayMessage("It's a draw!");
            gameEnded = true; // Mark game finish
        } else {
            currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
            displayMessage(`Player ${currentPlayer === 'X' ? player1Name : player2Name}'s turn`);
        }
    }
}

//checking win
function checkWin(player) {
    return winCombinations.some(combination => {
        return combination.every(index => {
            return board[index] === player;
        });
    });
}

// showing game status
function displayMessage(message) {
    // verify message contains "wins" or not
    if (message.includes("wins")) {
        // Extract the player symbol (X or O)
        let playerSymbol = message.charAt(7); 
        let playerName = (playerSymbol === 'X') ? player1Name : player2Name;
        // Replace the message with player name
        message = `Player ${playerName} wins!`;
    }
    document.getElementById('status').innerText = message;
}

// reset the game
function resetGame() {
    currentPlayer = 'X';
    moves = 0;
    board = ['', '', '', '', '', '', '', '', ''];
    gameEnded = false; 
    document.getElementById('status').innerText = `Player One's turn`;
    Array.from(document.getElementsByClassName('cell')).forEach(cell => {
        cell.innerText = '';
    });
}

// display the player name input 
function showModal() {
    document.getElementById('myModal').style.display = 'block';
}

// close the player name input 
function closeModal() {
    document.getElementById('myModal').style.display = 'none';
}

//start the game with entered player names
function startGame() {
    player1Name = document.getElementById('player1Name').value.trim();
    player2Name = document.getElementById('player2Name').value.trim();

    if (player1Name === '' || player2Name === '') {
        alert('Please enter both player names.');
        return;
    }

    // Update status to show the first player's turn
    currentPlayer = 'X'; 
    displayMessage(`Player ${player1Name}'s turn`);

    // Close and start the game
    closeModal();
}

//when the page loads
window.onload = function() {
    showModal();
};