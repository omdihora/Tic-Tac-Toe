const board = document.getElementById("board");
const status = document.getElementById("status");
let cells = Array(9).fill(null);
let currentPlayer = "X";
let gameOver = false;

function drawBoard() {
  board.innerHTML = "";
  cells.forEach((cell, i) => {
    const div = document.createElement("div");
    div.classList.add("cell");
    div.textContent = cell;
    div.addEventListener("click", () => makeMove(i));
    board.appendChild(div);
  });
  if (!gameOver) {
    status.textContent = `Current Turn: ${currentPlayer}`;
  }
}

function makeMove(i) {
  if (!cells[i] && !gameOver) {
    cells[i] = currentPlayer;
    checkWinner();
    currentPlayer = currentPlayer === "X" ? "O" : "X";
    drawBoard();
  }
}

function checkWinner() {
  const wins = [
    [0,1,2],[3,4,5],[6,7,8], // rows
    [0,3,6],[1,4,7],[2,5,8], // cols
    [0,4,8],[2,4,6]          // diags
  ];
  for (const [a, b, c] of wins) {
    if (cells[a] && cells[a] === cells[b] && cells[a] === cells[c]) {
      status.textContent = `${cells[a]} wins! 🎉`;
      gameOver = true;
      return;
    }
  }
  if (!cells.includes(null)) {
    status.textContent = "It's a Draw! 😶";
    gameOver = true;
  }
}

function resetGame() {
  cells = Array(9).fill(null);
  currentPlayer = "X";
  gameOver = false;
  drawBoard();
}

drawBoard();
