//your JS code here. If required.
document.addEventListener('DOMContentLoaded', () => {
  let player1Name, player2Name, currentPlayer;
  let gameBoard = Array(9).fill(null);
  let gameActive = true;

  const player1Input = document.getElementById("player-1");
  const player2Input = document.getElementById("player-2");
  const submitButton = document.getElementById("submit");
  const gameBoardDiv = document.querySelector(".game-board");
  const messageDiv = document.querySelector(".message");
  const cells = document.querySelectorAll(".cell");

  // Function to check if there's a winner
  const checkWinner = () => {
    const winPatterns = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8], // horizontal
      [0, 3, 6], [1, 4, 7], [2, 5, 8], // vertical
      [0, 4, 8], [2, 4, 6]             // diagonal
    ];

    for (let pattern of winPatterns) {
      const [a, b, c] = pattern;
      if (gameBoard[a] && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c]) {
        return gameBoard[a];
      }
    }

    return null;
  };

  // Function to handle the move
  const handleMove = (cellIndex) => {
    if (gameBoard[cellIndex] || !gameActive) return; // If cell is already filled or game is over
    gameBoard[cellIndex] = currentPlayer;
    cells[cellIndex].textContent = currentPlayer;

    const winner = checkWinner();
    if (winner) {
      messageDiv.textContent = `${winner === 'X' ? player1Name : player2Name} congratulations you won!`;
      gameActive = false;
    } else if (!gameBoard.includes(null)) {
      messageDiv.textContent = "It's a draw!";
      gameActive = false;
    } else {
      currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
      messageDiv.textContent = `${currentPlayer === 'X' ? player1Name : player2Name}, you're up!`;
    }
  };

  // Function to start the game
  const startGame = () => {
    player1Name = player1Input.value.trim();
    player2Name = player2Input.value.trim();

    if (!player1Name || !player2Name) {
      alert("Please enter valid names for both players.");
      return;
    }

    currentPlayer = 'X'; // Player 1 starts
    gameBoard = Array(9).fill(null); // Reset game board
    gameActive = true;
    messageDiv.textContent = `${player1Name}, you're up!`;
    gameBoardDiv.style.display = "block"; // Show the game board
    cells.forEach(cell => cell.textContent = ""); // Clear the board
  };

  // Event listener for the submit button to start the game
  submitButton.addEventListener("click", startGame);

  // Event listeners for each cell to handle the click
  cells.forEach((cell, index) => {
    cell.addEventListener("click", () => handleMove(index));
  });
});
