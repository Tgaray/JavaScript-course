'use strict';

//Selecting elements
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const score0El = document.getElementById('score--0');
const score1El = document.getElementById('score--1');
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');
const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

//Declaring empty variables
let scores, playing, currentScore, activePlayer;

//functions
const init = function () {
  //Set starting conditions for the game
  scores = [0, 0];
  playing = true;
  currentScore = 0;
  activePlayer = 0;
  score0El.textContent = 0;
  score1El.textContent = 0;
  diceEl.classList.add('hidden');
  document.getElementById('current--0').textContent = 0;
  document.getElementById('current--1').textContent = 0;
  document.querySelector('.player--0').classList.remove('player--winner');
  document.querySelector('.player--1').classList.remove('player--winner');
  document.querySelector('.player--0').classList.add('player--active');
  document.querySelector('.player--1').classList.remove('player--active');
};

//On opening game run init function to set everyting to start values
init();

const switchPlayer = function () {
  //restore the current score to zero for the next round/player
  currentScore = 0;
  //set the currentscore text on the screen back to zero
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  //ternary operator to switch the value of the active player to the opposite
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
};

//Event handlers
btnRoll.addEventListener('click', function () {
  //If game state is active
  if (playing) {
    //1. Generate random dice roll
    let diceRoll = Math.trunc(Math.random() * 6 + 1);

    //2. Show the corresponding dice
    diceEl.classList.remove('hidden');
    diceEl.src = `dice-${diceRoll}.png`;

    //3. Check if we rolled 1
    if (diceRoll !== 1) {
      // Add dice to current score
      currentScore += diceRoll;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      //restore score to zero and switch player
      switchPlayer();
    }
    //Check which player is active
  }
});

//Hold the score
btnHold.addEventListener('click', function () {
  //if game state is active
  if (playing) {
    //1. add current score to active players total score
    //for example scores[1] = scores[1] += currentScore
    scores[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];

    //2. check if players score is >= 100
    if (scores[activePlayer] >= 100) {
      //change the state of the game to (false / not playing) so the hold and roll buttons dont work anymore unless we do a new game.
      playing = false;
      //hide the dice when the game is won
      diceEl.classList.add('hidden');

      //change bg color by adding winner class and remove the active class
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
    } else {
      switchPlayer();
    }
  }
});

btnNew.addEventListener('click', init);

/* 
//Experiment I made
const player = document.querySelectorAll('.player--active');
console.log(player);
let currentScore0 = 0;
let currentScore1 = 0;
let active = true;

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

  //3. Check if the rolled dice does not have the value of 1
  if (diceRoll !== 1) {
    //Check if player 1 is active
    if (active) {
      //active true = add score to player 1
      current0El.textContent = currentScore0 += diceRoll;
    } else {
      //active false = add score to player 2
      current1El.textContent = currentScore1 += diceRoll;
    }
    //if the score is 1 change the active boolean to the opposite
  } else {

  }
  //Check which player is active
});
  */
