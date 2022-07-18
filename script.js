"use strict";

const player0 = document.querySelector(".player--0");
const player1 = document.querySelector(".player--1");
const score0El = document.getElementById("score--0");
const score1El = document.getElementById("score--1");
const current0El = document.getElementById("current--0");
const current1El = document.getElementById("current--1");
const diceEl = document.querySelector(".dice");
const btnNew = document.querySelector(".btn--new");
const btnRoll = document.querySelector(".btn--roll");
const btnHold = document.querySelector(".btn--hold");

const scores = [0, 0];
let currentScore = 0;
let activatePlayer = 0;
let playing = true;

score0El.textContent = 0;
score1El.innerHTML = 0;
diceEl.classList.add("hidden");

let switchPlayer = () => {
  currentScore = 0;
  document.getElementById(`current--${activatePlayer}`).innerHTML =
    currentScore;
  activatePlayer = activatePlayer === 0 ? 1 : 0;
  player0.classList.toggle("player--active");
  player1.classList.toggle("player--active");
};

btnRoll.addEventListener("click", () => {
  if (playing) {
    const dice = Math.trunc(Math.random() * 6) + 1;

    diceEl.classList.remove("hidden");
    diceEl.src = `images/dice-${dice}.png`;

    if (dice !== 1) {
      currentScore += dice;
      document.getElementById(`current--${activatePlayer}`).innerHTML =
        currentScore;
    } else {
      switchPlayer();
    }
  }
});

btnHold.addEventListener("click", () => {
  if (playing) {
    scores[activatePlayer] += currentScore;

    document.getElementById(`score--${activatePlayer}`).innerHTML =
      scores[activatePlayer];

    if (scores[activatePlayer] >= 10) {
      playing = false;
      document
        .querySelector(`.player--${activatePlayer}`)
        .classList.add("player--winner");
      diceEl.classList.add("hidden");

      document
        .querySelector(`.player--${activatePlayer}`)
        .classList.remove("player--active");
    } else {
      switchPlayer();
    }
  }
});
