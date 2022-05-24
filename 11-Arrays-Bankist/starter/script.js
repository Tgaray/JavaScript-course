'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: 'Steven Thomas Williams',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: 'Sarah Smith',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};

const accounts = [account1, account2, account3, account4];

// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES

const currencies = new Map([
  ['USD', 'United States dollar'],
  ['EUR', 'Euro'],
  ['GBP', 'Pound sterling'],
]);

const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

/////////////////////////////////////////////////

//Lesson 142 simple array methods
let arr = ['a', 'b', 'c', 'd', 'e'];

//SLICE
//returns a new array
console.log(arr.slice(2));
//with an end parameter
console.log(arr.slice(2, 4));
//start with slicing at the end
console.log(arr.slice(-2));
//last one
console.log(arr.slice(-1));
//from the second and down from the last two
console.log(arr.slice(1, -2));
//entire array
console.log(arr.slice());
//spread operator does same
console.log([...arr]);

//SPLICE (change original array)
//console.log(arr.splice(2));
//to remove the last element of the array
arr.splice(-1);
//the original array is changed splice gives it the original array
console.log(arr);
//the second parameters it he number of elements to delete
arr.splice(1, 2);
//the original array is changed splice gives it the original array
console.log(arr);

//REVERSE
arr = ['a', 'b', 'c', 'd', 'e', 'f'];
const arr2 = ['j', 'i', 'a', 'c', 'x'];
//Reverse also changes the original array
console.log(arr2.reverse());
//to check if the original is changed
console.log(arr2);

//CONCAT
//adding two arrays together
const letters = arr.concat(arr2);
console.log(letters);
//same as spread two arrays togethers
console.log([...arr, ...arr2]);

//JOIN
console.log(letters.join(' - '));
