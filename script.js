"use strict";

const player1 = document.querySelector(".player--1");
const player2 = document.querySelector(".player--2");
let player1ScoreEl = document.querySelector(".player--1 .score");
let player2ScoreEl = document.querySelector(".player--2 .score");
let player1CurrentScoreEl = document.querySelector(".player--1 .current-score");
let player2CurrentScoreEl = document.querySelector(".player--2 .current-score");
let activePlayer = document.querySelector(".player--active");
let activePlayerScore = document.querySelector(".player--active .score");
let activePlayerCurrentScore = document.querySelector(".player--active .current-score");
const btnNewGame = document.querySelector(".btn--new");
const btnRoll = document.querySelector(".btn--roll");
const btnHold = document.querySelector(".btn--hold");
let gameFinished = false;

let currScore = 0;
let player1Score = 0;
let player2Score = 0;
let diceNumber;

function diceNumberGenerator() {
  return Math.trunc(Math.random() * 6) + 1;
}

function toggleActivePlayer() {
  player1.classList.toggle("player--active");
  player2.classList.toggle("player--active");
  activePlayer = document.querySelector(".player--active");
  activePlayerScore = document.querySelector(".player--active .score");
  activePlayerCurrentScore = document.querySelector(".player--active .current-score");
}

function handleDiceRoll() {
  if (gameFinished) return;

  if (diceNumber) {
    const prevDiceImg = document.querySelector(`.dice-img-${diceNumber}`);
    prevDiceImg.classList.add("hidden");
  }

  diceNumber = diceNumberGenerator();
  const diceImage = document.querySelector(`.dice-img-${diceNumber}`);
  diceImage.classList.remove("hidden");
  if (diceNumber === 1) {
    currScore = 0;
    activePlayerCurrentScore.textContent = currScore;
    toggleActivePlayer();
  } else {
    currScore += diceNumber;
    activePlayerCurrentScore.textContent = currScore;
  }
}

function handleHold() {
  if (gameFinished) return;

  // add score to the active player
  if (player1.classList.contains("player--active")) {
    player1Score += currScore;
    activePlayerScore.textContent = player1Score;
    if (player1Score >= 100) {
      player1.classList.add("player--win");
      gameFinished = true;
    } else {
      currScore = 0;
      activePlayerCurrentScore.textContent = currScore;
      toggleActivePlayer();
    }
  } else {
    player2Score += currScore;
    activePlayerScore.textContent = player2Score;
    if (player2Score >= 100) {
      player2.classList.add("player--win");
      gameFinished = true;
    } else {
      currScore = 0;
      activePlayerCurrentScore.textContent = currScore;
      toggleActivePlayer();
    }
  }
}

function handleNewGame() {
  currScore = 0;
  player1Score = 0;
  player2Score = 0;
  gameFinished = false;

  player1.classList.remove("player--win");
  player2.classList.remove("player--win");
  player1.classList.remove("player--active");
  player2.classList.remove("player--active");
  player1.classList.add("player--active");
  player1ScoreEl.textContent = player1Score;
  player2ScoreEl.textContent = player2Score;
  player1CurrentScoreEl.textContent = currScore;
  player2CurrentScoreEl.textContent = currScore;
  if (diceNumber) document.querySelector(`.dice-img-${diceNumber}`).classList.add("hidden");
  diceNumber = undefined;
}

btnRoll.addEventListener("click", handleDiceRoll);
btnHold.addEventListener("click", handleHold);
btnNewGame.addEventListener("click", handleNewGame);
