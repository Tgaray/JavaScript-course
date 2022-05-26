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

/*
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
*/

/*
//Lesson 143 the new at method

const arr1 = [23, 11, 64];
//log value at position 1
console.log(arr1[1]);
//log value at position 1
console.log(arr1.at(1));

//unique about at is... easier to manipulate like this (lets say length is unkown) getting last element
//arrays are zero based so subtracting one means you take the length minus 1 because thats the index you want 0, 1, 2
console.log(arr1[arr1.length - 1]);
//another way with slice
console.log(arr1.slice(-1)[0]);
//another with at (in this case the -1 works from the right side of the array) start counting from the end downwards
console.log(arr1.at(-1)); //64
console.log(arr1.at(-2)); //11
//at also works on strings
console.log('Theron'.at(2));
*/

/*
//Lesson 144 Looping arrays forEach

//deposits or withdrawals
const movements1 = [200, 450, -400, 3000, -650, -130, 70, 1300];

console.log('===== FOR LOOP =====');
//for of loop vs for each
for (const move of movements1) {
  if (move > 0) {
    console.log(`You deposited ${move}`);
  } else {
    //math abs remove the sign take the absolute value
    console.log(`You withdrew ${Math.abs(move)}`);
  }
}

//Now with foreach (esier way) higher order function that calls callback function
console.log('===== FOR EACH =====');
//In each iteration the callback will call the value as a parameter
movements1.forEach(function (move) {
  if (move > 0) {
    console.log(`You deposited ${move}`);
  } else {
    //math abs remove the sign take the absolute value
    console.log(`You withdrew ${Math.abs(move)}`);
  }
});
// 0: function(200)
// 1: function(450)
// 2: function(400)
// ...

//what if you want to use the index to get the number connected tot he value (with for we do that as follows)
console.log('===== FOR LOOP WITH INDEX =====');
for (const [i, move] of movements1.entries()) {
  if (move > 0) {
    console.log(`Movement ${i + 1}: you deposited ${move}`);
  } else {
    //math abs remove the sign take the absolute value
    console.log(`Movement ${i + 1}: you withdrew ${Math.abs(move)}`);
  }
}

//Same in the for each with parameters, for each passes in the current element the index and the entire array
//Current element / index / entire array
console.log('===== FOR EACH WITH INDEX =====');
movements1.forEach(function (mov, i, arr) {
  if (mov > 0) {
    console.log(`Movement ${i + 1}: you deposited ${mov}`);
  } else {
    //math abs remove the sign take the absolute value
    console.log(`Movement ${i + 1}: you withdrew ${Math.abs(mov)}`);
  }
});
*/

//Lesson 145 forEach with maps and sets
