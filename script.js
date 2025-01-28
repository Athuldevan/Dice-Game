"use strict";

// selecting elements
const player0El = document.querySelector(".player--0");
const player1El = document.querySelector(".player--1");

const score0El = document.querySelector("#score--0");
const score1El = document.querySelector("#score--1");
const diceEl = document.querySelector(".dice");
const newBtn = document.querySelector(".btn--new");
const rollbtn = document.querySelector(".btn--roll");
const holdbtn = document.querySelector(".btn--hold");
const current0El = document.querySelector("#current--0");
const current1El = document.querySelector("#current--1");

// variable declaration for init() function
let playing;
let totalScore, currentScore, activePlayer;

// initial conditons
const init = function () {
  totalScore = [0, 0]; //TOTAL SCORE;
  currentScore = 0;
  activePlayer = 0;
  playing = true;

  current1El.textContent = 0;
  current0El.textContent = 0;
  score0El.textContent = 0;
  score1El.textContent = 0;

  diceEl.classList.add("hidden");
  player0El.classList.remove(`player--winner`);
  player1El.classList.remove(`player--winner`);
  player1El.classList.remove("player--active");
  player0El.classList.add(`player--active`);
};
init();

// rolling days functionality...
function switchPlayer() {
  document.querySelector(`#current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0El.classList.toggle(`player--active`);
  player1El.classList.toggle(`player--active`);
}

// rolling dice function
rollbtn.addEventListener("click", () => {
  if (playing == true) {
    const diceNumber = Math.trunc(Math.random() * 6 + 1);
    console.log(diceNumber);
    diceEl.classList.remove("hidden");
    diceEl.src = `dice-${diceNumber}.png`; //maniputeed the src attribute with src attribute image number ;

    if (diceNumber !== 1) {
      // Adding the diceNumber to the current score
      currentScore += diceNumber;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      switchPlayer();
    }
  }
});

// HOLD BUTTON FUNCTIONALITY

holdbtn.addEventListener("click", () => {
  if (playing == true) {
    // Adding current score of  with the TOTAL  score of Active player;
    totalScore[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      totalScore[activePlayer];

    // check if the score of active player is 20 then make the activve player a winner
    if (totalScore[activePlayer] >= 20) {
      // finish the game
      playing = false;
      diceEl.classList.add(`hidden`);
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add(`player--winner`);
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove(`player-active`);
    } else {
      switchPlayer();
    }
  }
});

// RESET BUTTON FUNCTIONALITY
newBtn.addEventListener("click", init);
