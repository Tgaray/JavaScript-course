'use strict';

//Selecting elements
const score0El = document.getElementById('score--0');
const score1El = document.getElementById('score--1');
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');
const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');
const player = document.querySelectorAll('.player--active');
let currentScore0 = 0;
let currentScore1 = 0;
let bool = true;

console.log(player);
//Starting conditions
diceEl.classList.add('hidden');
score0El.textContent = 0;
score1El.textContent = 0;

//functions

//Event handlers
//btnNew.addEventListener('click');
btnRoll.addEventListener('click', function () {
  //1. Generate random dice roll
  let diceRoll = Math.trunc(Math.random() * 6 + 1);
  console.log(diceRoll);

  //2. Show the corresponding dice
  diceEl.classList.remove('hidden');
  diceEl.src = `dice-${diceRoll}.png`;

  //3. Check for rolled 1: if true switch to next player
  if (diceRoll !== 1) {
    //Add dice to the current score
    if (bool) {
      current0El.textContent = currentScore0 += diceRoll;
    } else {
      current1El.textContent = currentScore1 += diceRoll;
    }
  } else {
    bool = !bool;
    console.log(bool);
  }
  //Check which player is active
});

//btnHold.addEventListener('click');
