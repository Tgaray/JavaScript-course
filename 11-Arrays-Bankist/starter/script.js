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

//Better to work with array and pass that into the actual function than work with global variable its more directed
const displayMovements = function (movements) {
  //Clear out prior values and empty entire container
  containerMovements.innerHTML = '';

  movements.forEach(function (mov, i) {
    //Ternary condition to choose between deposit and withdrawal
    const type = mov > 0 ? 'deposit' : 'withdrawal';

    const html = `
    <div class="movements__row">
      <div class="movements__type movements__type--${type}">${
      i + 1
    } ${type}</div>
      <div class="movements__value">${mov}</div>
    </div>
    `;

    containerMovements.insertAdjacentHTML('afterbegin', html);
  });
};

displayMovements(account1.movements);
console.log(containerMovements.innerHTML);

const calcDisplayBalance = function (movements) {
  const balance = movements.reduce((acc, mov) => acc + mov, 0);
  labelBalance.textContent = `€ ${balance}`;
};

calcDisplayBalance(account1.movements);

//no need to return something here because we just want to do some work on the object and added a username key to the object which we can just check with a console.log(accounts) to see if it is added but we do not need to return anything
const createUsernames = function (accs) {
  accs.forEach(function (acc) {
    acc.username = acc.owner
      .toLowerCase()
      .split(' ')
      .map(name => /*return*/ name[0])
      .join('')
      .toUpperCase();
  });
};

//Passing the accounts array into the function to be able to call each account
createUsernames(accounts);
//This is a forEach so we edit the original object, this is a side-effect we want in this case.
console.log(accounts);

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES

const currencies = new Map([
  ['USD', 'United States dollar'],
  ['EUR', 'Euro'],
  ['GBP', 'Pound sterling'],
]);

const movements = [
  200, 450, -400, 3000, -650, -130, 70, 1300,
]; /* initial value of the accumulator*/ /*0);

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
*/ /*

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
*/ /*

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
*/ /* always just go with the first value of the array */ /* movements[0]);

/*
//Lesson 145 forEach with maps and sets

const currencies1 = new Map([
  ['USD', 'United States dollar'],
  ['EUR', 'Euro'],
  ['GBP', 'Pound sterling'],
]);

//for each with maps
currencies1.forEach(function (value, key, map) {
  console.log(`${key}: ${value}`);
});

//for each with set
const currenciesUnique = new Set(['USD', 'GBP', 'USD', 'EUR', 'EUR', 'USD']);
console.log(currenciesUnique);
//A set does not have keys so the value and the key are the same
currenciesUnique.forEach(function (value, key, set) {
  console.log(`${key}: ${value}`);
});
//The key could have been omitted but the developers want the for each to work the same always so it is clear that is why it still works but just duplicates the value in sets
*/

//CODING CHALLENGE #1

/* 
Julia and Kate are doing a study on dogs. So each of them asked 5 dog owners about their dog's age, and stored the data into an array (one array for each). For now, they are just interested in knowing whether a dog is an adult or a puppy. A dog is an adult if it is at least 3 years old, and it's a puppy if it's less than 3 years old.

Create a function 'checkDogs', which accepts 2 arrays of dog's ages ('dogsJulia' and 'dogsKate'), and does the following things:

1. Julia found out that the owners of the FIRST and the LAST TWO dogs actually have cats, not dogs! So create a shallow copy of Julia's array, and remove the cat ages from that copied array (because it's a bad practice to mutate function parameters)
2. Create an array with both Julia's (corrected) and Kate's data
3. For each remaining dog, log to the console whether it's an adult ("Dog number 1 is an adult, and is 5 years old") or a puppy ("Dog number 2 is still a puppy 🐶")
4. Run the function for both test datasets

HINT: Use tools from all lectures in this section so far 😉

TEST DATA 1: Julia's data [3, 5, 2, 12, 7], Kate's data [4, 1, 15, 8, 3]
TEST DATA 2: Julia's data [9, 16, 6, 8, 3], Kate's data [10, 5, 6, 1, 4]

GOOD LUCK 😀

//My solution
const dogsJulia = [3, 5, 2, 12, 7];
const dogsKate = [4, 1, 15, 8, 3];

const checkDogs = function (dogsArr1, dogsArr2) {
  const dogsJuliaCorrected = [...dogsArr1];
  console.log(dogsArr1, dogsArr2);
  dogsJuliaCorrected.splice(0, 1);
  dogsJuliaCorrected.splice(-2);
  console.log(dogsJuliaCorrected);

  const allDogs = dogsJuliaCorrected.concat(dogsArr2);
  console.log(allDogs);
  allDogs.forEach(function (dog, i) {
    const age =
      dog >= 3 ? `an adult, and is ${dog} years old` : `still a puppy`;
    console.log(`Dog number ${i + 1} is ${age}`);
  });
};

checkDogs(dogsJulia, dogsKate);
checkDogs([9, 16, 6, 8, 3], [10, 5, 6, 1, 4]);
*/

/*
//Lesson 150 data transformations - map array method

const euroToUsd = 1.1;

const movements1 = [200, 450, -400, 3000, -650, -130, 70, 1300];

//Mapping the money movements from the movements1 array and creates a brand new array with the mapped movements
const movementsUSD = movements1.map(function (mov) {
  return mov * euroToUsd;
});

//This way of doing things with the map is more like functional programming (modern way of doing stuff)
const movementsUSD1 = movements1.map(function (mov) {
  //map 23 to all the spots in the looped through movements1 array and create a brand new array from it in thise case movementsUSD1
  return 23;
});

//Simplyfying with an arrow function (a bit less readable)
//in an arrow function its basically like you write a return right after the arrow
const movementsUSDarrow = movements1.map(mov => mov * euroToUsd);

console.log(movements1);
console.log(movementsUSD);
console.log(movementsUSD1);
console.log(movementsUSDarrow);

//This is more the old way of doing things manually creating a new variable
const movementsUSDfor = [];
for (const move of movements1) movementsUSDfor.push(move * euroToUsd);
console.log(movementsUSDfor);

//Return instead of console log returns the actual result into the array movementsDescriptions1
const movementDescriptions1 = movements1.map(function (mov, i, map) {
  if (mov > 0) {
    return `Movement ${i + 1}: you deposited ${mov}`;
  } else {
    //math abs remove the sign take the absolute value
    return `Movement ${i + 1}: you withdrew ${Math.abs(mov)}`;
  }
});

//Or as an arrow function
const movementDescriptions2 = movements1.map((mov, i, map) => {
  if (mov > 0) {
    return `Movement ${i + 1}: you deposited ${mov}`;
  } else {
    //math abs remove the sign take the absolute value
    return `Movement ${i + 1}: you withdrew ${Math.abs(mov)}`;
  }
});

//With ternary operator instead of if else
const movementDescriptions3 = movements1.map(
  (mov, i) =>
    `Movement ${i + 1}: you ${mov > 0 ? 'deposited' : 'withdrew'} ${Math.abs(
      mov
    )}`
);

console.log(
  movementDescriptions1,
  movementDescriptions2,
  movementDescriptions3
);
*/

/*
//Lesson 152 The filter method
//Better example / more functional / rather use methods over the for loop because you can chain methods
const deposits = movements.filter(function (mov) {
  //filter all the movements that are bigger than one so not the withdrawals
  return mov > 0;
});

console.log(movements);
console.log(deposits);

const depositsFor = [];
for (const mov of movements) if (mov > 0) depositsFor.push(mov);
console.log(depositsFor);

const withdrawals = movements.filter(function (mov) {
  //Less than zero for negative values i.e. withdrawals
  return mov < 0;
});
console.log(withdrawals);

//or with an arrow function
const withdrawals1 = movements.filter(mov => mov < 0);
console.log(withdrawals1);
*/

/*

//Lesson 153 the reduce method, reduce has four parameters accumulator/currentelement/index/array

console.log(movements);

//Accumulator is like a snowball
const balance = movements.reduce(function (acc, cur, i, arr) {
  console.log(`Iteration ${i}: ${acc}`);
  return acc + cur;
}, */
/*
console.log(balance);

const balance1 = movements.reduce((acc1, cur) => acc1 + cur, 0);
console.log(balance1);

//With a for loop also does the same as reducing to one value (but then you need an external variable but if you need more than one for loop this starts to become problematic) a function that returns a value avoids the external variable
let balance2 = 0;
for (const mov of movements) balance2 += mov;
console.log(balance2);

//Getting the maximum value of the movements array
const max = movements.reduce((acc, mov) => {
  if (acc > mov) return acc;
  else return mov;
}, 
console.log(max);
*/
