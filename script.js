'use strict';
const player0El = document.querySelector(`.player--0`);
const player1El = document.querySelector(`.player--1`);
const score0El = document.querySelector(`#score--0`);
const score1El = document.getElementById(`score--1`);
const current0El = document.getElementById(`current--0`);
const current1El = document.getElementById(`current--1`);
const diceEl = document.querySelector(`.dice`);
const btnNew = document.querySelector(`.btn--new`);
const btnRoll = document.querySelector(`.btn--roll`);
const btnHold = document.querySelector(`.btn--hold`);

let scores, currentScore, activePlayer, playing;
console.log('shit');
let init = function () {
  playing = true;
  currentScore = 0;
  scores = [0, 0];
  activePlayer = 0;

  score0El.textContent = 0;
  score1El.textContent = 0;
  current0El.textContent = 0;
  current1El.textContent = 0;

  player0El.classList.remove(`player--winner`);
  player1El.classList.remove(`player--winner`);

  diceEl.classList.add(`hidden`);
  document.querySelector(`#name--1`).textContent = `PLAYER 2`;
  document.querySelector(`#name--0`).textContent = `PLAYER 1`;
  player0El.classList.add(`player--active`);
  player1El.classList.remove(`player--active`);
};
init();
const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  currentScore = 0;
  player0El.classList.toggle(`player--active`);
  player1El.classList.toggle(`player--active`);
};
//rolling dice functionality

btnRoll.addEventListener('click', function () {
  if (playing) {
    //. generating a random dice roll
    const dice = Math.trunc(Math.random() * 6) + 1;
    //.displaying dice

    diceEl.classList.remove(`hidden`);
    diceEl.src = `/img/dice-${dice}.png`;

    //.checking for if 1 switch to next player
    if (dice !== 1) {
      currentScore += dice;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      switchPlayer();
    }
  }
});

btnHold.addEventListener(`click`, function () {
  if (playing) {
    scores[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];
    diceEl.classList.add(`hidden`);
    if (scores[activePlayer] >= 150) {
      playing = false;
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add(`player--winner`);
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove(`player--active`);
      document.querySelector(
        `#name--${activePlayer}`
      ).textContent = `THIS PLAYER WON!! 🏆 `;
    } else {
      switchPlayer();
    }
  }
});

btnNew.addEventListener(`click`, init);
