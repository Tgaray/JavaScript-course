'use strict';

/* 
console.log(document.querySelector('.message').textContent);
document.querySelector('.message').textContent = 'Correct Number!';
console.log(document.querySelector('.message').textContent);

document.querySelector('.number').textContent = 13;
document.querySelector('.score').textContent = 12;
console.log((document.querySelector('.guess').value = 23)); 
*/
let score = 20;
let highScore = 0;
let secretNumber = Math.trunc(Math.random() * 20) + 1;

const scoreField = function (score) {
  document.querySelector('.score').textContent = score;
};
const highScoreField = function (highscore) {
  document.querySelector('.highscore').textContent = highscore;
};
const displayMessage = function (message) {
  document.querySelector('.message').textContent = message;
};
const number = function (number) {
  document.querySelector('.number').textContent = number;
};
const numberStyle = function (number) {
  document.querySelector('.number').style.width = number;
};
const body = function (body) {
  document.querySelector('body').style.backgroundColor = body;
};
const guess = function (guess) {
  document.querySelector('.guess').value = guess;
};

//Check number
document.querySelector('.check').addEventListener('click', function () {
  const guess = Number(document.querySelector('.guess').value);

  //When there is no input
  if (!guess) {
    displayMessage('Please input a number!');

    //When the player wins
  } else if (guess === secretNumber) {
    body('green');
    numberStyle('30rem');
    displayMessage('Correct number!');
    number(secretNumber);
    //If the player wins check if the score higher than the previous highscore?
    if (score > highScore) {
      highScore = score;
    }

    //The guess is wrong, but how wrong, thats the question
  } else if (guess !== secretNumber) {
    //if the score is above 1 we can keep guessing
    if (score > 1) {
      //Ternary operator to choose between too high or too low
      displayMessage(guess > secretNumber ? 'Too high!' : 'Too low!');
      body('orange');
      score--;
    } else if (score > 0) {
      score = 0;
      body('red');
      displayMessage('You lost the game!');
    }
  }

  scoreField(score);
  highScoreField(highScore);
});

document.querySelector('.again').addEventListener('click', function () {
  score = 20;
  secretNumber = Math.trunc(Math.random() * 20) + 1;
  scoreField(score);
  number('?');
  guess(null);
  displayMessage('Start guessing...');
  body('#222');
  numberStyle('15rem');
});
