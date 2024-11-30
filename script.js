//! import all the needed dom elements
const cells = document.querySelectorAll(".cell");
const statusText = document.querySelector(".status");
const resetBtn = document.querySelector(".resetBtn");
const startBtn = document.querySelector(".start");
const player1 = document.querySelector("#player1");
const player2 = document.querySelector("#player2");
const form = document.querySelector(".form");

//! Give user the array to fill
const options = ["", "", "", "", "", "", "", "", ""];

const winningConditions = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

let currentPlayer = "X";
let gameRunning = false;

startBtn.addEventListener("click", initializeGame);

//! function to initialize the game
function initializeGame() {
  if (player1.value == "" || player2.value == "") {
    alert("Please Enter Player Names");
    return;
  }
  cells.forEach((cell) => cell.addEventListener("click", cellClicked));
  statusText.textContent = `${playerName(currentPlayer)}'s Turn`;
  resetBtn.addEventListener("click", resetGame);
  gameRunning = true;
  form.style.display = "none";
}

function playerName(current) {
  return current == "X" ? player1.value : player2.value;
}
function cellClicked() {
  const cellIdx = this.getAttribute("cellIndex");
  if (options[cellIdx] !== "" || !gameRunning) {
    return;
  }
  updateCell(this, cellIdx);
  checkWinner();
}

function updateCell(cell, index) {
  options[index] = currentPlayer;
  cell.textContent = currentPlayer;
}
function changeStatus() {
  currentPlayer = currentPlayer === "X" ? "O" : "X";
  statusText.textContent = `${playerName(currentPlayer)}'s Turn`;
}
function checkWinner() {
  let roundWon = false;
  for (let i = 0; i < winningConditions.length; i++) {
    const condition = winningConditions[i];
    const A = options[condition[0]];
    const B = options[condition[1]];
    const C = options[condition[2]];

    if (A == "" || B == "" || C == "") {
      continue;
    }

    if (A == B && B == C) {
      roundWon = true;
      gameRunning = false;
      break;
    }
  }

  if (roundWon) {
    statusText.textContent = `${playerName(currentPlayer)} Won!!`;
  } else if (!options.includes("")) {
    statusText.textContent = `Draw!!!`;
  } else {
    changeStatus();
  }
}
function resetGame() {
  currentPlayer = "X";
  options.fill("");
  statusText.textContent = `${currentPlayer}'s Turn`;
  cells.forEach((cell) => (cell.textContent = ""));
  player1.value = "";
  player2.value = "";
  gameRunning = true;
  form.style.display = "flex";
}
