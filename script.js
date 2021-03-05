"use strict";

// SELECTORS
const score0EL = document.getElementById("score--0");
const score1EL = document.getElementById("score--1");
const current0EL = document.getElementById("current--0");
const current1EL = document.getElementById("current--1");
const diceEL = document.querySelector(".dice");
const btnNew = document.querySelector(".btn--new");
const btnRoll = document.querySelector(".btn--roll");
const btnHold = document.querySelector(".btn--hold");
const player0 = document.querySelector(".player--0");
const player1 = document.querySelector(".player--1");

// INITIAL VARIABLE AND STATE
let scores = [0, 0];
let currentScore = 0;
let activePlayer = 0;
let state = true;
diceEL.classList.add("hidden");

// NEW GAME TO RESET VALUES
btnNew.addEventListener("click", () => {
  startingConditions();
});

// ROLL DICE
btnRoll.addEventListener("click", () => {
  // CREATING NEW NUMBER AFTER DICE NOT CLICKED

  if (state) {
    const dice = Math.trunc(Math.random() * 6) + 1;

    if (diceEL.classList.contains("hidden")) {
      diceEL.classList.toggle("hidden");
    }
    diceEL.src = `dice-${dice}.png`;

    if (dice !== 1) {
      currentScore += dice;
      document.getElementById(
        `current--${activePlayer}`
      ).textContent = currentScore;
    } else {
      switchPlayer();
    }
  }
});

// HOLD SCORE, ADDS CURRENT SCORE TO HOLDED SCORE
btnHold.addEventListener("click", () => {
  scores[activePlayer] += currentScore;
  document.getElementById(`score--${activePlayer}`).textContent =
    scores[activePlayer];
  if (scores[activePlayer] >= 100) {
    state = false;
    document
      .querySelector(`.player--${activePlayer}`)
      .classList.remove("player--active");
    document
      .querySelector(`.player--${activePlayer}`)
      .classList.add("player--winner");
    diceEL.classList.add("hidden");
  } else {
    switchPlayer();
  }
});

// SWITCHES THE ACTIVE PLAYER
const switchPlayer = () => {
  currentScore = 0;
  document.getElementById(
    `current--${activePlayer}`
  ).textContent = currentScore;
  document
    .querySelector(`.player--${activePlayer}`)
    .classList.toggle("player--active");
  activePlayer = activePlayer === 0 ? 1 : 0;
  document
    .querySelector(`.player--${activePlayer}`)
    .classList.toggle("player--active");
};

// STARTING CONDITIONS WHEN GAME IS RESET
const startingConditions = () => {
  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  state = true;

  score0EL.textContent = scores[0];
  score1EL.textContent = scores[1];
  current0EL.textContent = currentScore;
  current1EL.textContent = currentScore;
  diceEL.classList.add("hidden");
  player0.classList.add("player--active");
  if (
    player0.classList.contains("player--winner") ||
    player1.classList.contains("player--winner")
  ) {
    player0.classList.remove("player--winner");
    player1.classList.remove("player--winner");
  }
  if (player1.classList.contains("player--active")) {
    player1.classList.remove("player--active");
  }
};
