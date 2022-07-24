'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

/////////////////////////////////////////////////
// Data

// DIFFERENT DATA! Contains movement dates, currency and locale

const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 455.23, -306.5, 25000, -642.21, -133.9, 79.97, 1300],
  interestRate: 1.2, // %
  pin: 1111,

  movementsDates: [
    '2019-11-18T21:31:17.178Z',
    '2019-12-23T07:42:02.383Z',
    '2020-01-28T09:15:04.904Z',
    '2020-04-01T10:17:24.185Z',
    '2020-05-08T14:11:59.604Z',
    '2020-05-27T17:01:17.194Z',
    '2020-07-11T23:36:17.929Z',
    '2020-07-12T10:51:36.790Z',
  ],
  currency: 'EUR',
  locale: 'pt-PT', // de-DE
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,

  movementsDates: [
    '2019-11-01T13:15:33.035Z',
    '2019-11-30T09:48:16.867Z',
    '2019-12-25T06:04:23.907Z',
    '2020-01-25T14:18:46.235Z',
    '2020-02-05T16:33:06.386Z',
    '2020-04-10T14:43:26.374Z',
    '2020-06-25T18:49:59.371Z',
    '2020-07-26T12:01:20.894Z',
  ],
  currency: 'USD',
  locale: 'en-US',
};

const accounts = [account1, account2];

/////////////////////////////////////////////////
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
// Functions

const displayMovements = function (movements, sort = false) {
  containerMovements.innerHTML = '';

  const movs = sort ? movements.slice().sort((a, b) => a - b) : movements;

  movs.forEach(function (mov, i) {
    const type = mov > 0 ? 'deposit' : 'withdrawal';

    const html = `
      <div class="movements__row">
        <div class="movements__type movements__type--${type}">${
      i + 1
    } ${type}</div>
        <div class="movements__value">${mov.toFixed(2)}€</div>
      </div>
    `;

    containerMovements.insertAdjacentHTML('afterbegin', html);
  });
};

const calcDisplayBalance = function (acc) {
  acc.balance = acc.movements.reduce((acc, mov) => acc + mov, 0);
  labelBalance.textContent = `${acc.balance.toFixed(2)}€`;
};

const calcDisplaySummary = function (acc) {
  const incomes = acc.movements
    .filter(mov => mov > 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumIn.textContent = `${incomes.toFixed(2)}€`;

  const out = acc.movements
    .filter(mov => mov < 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumOut.textContent = `${Math.abs(out).toFixed(2)}€`;

  const interest = acc.movements
    .filter(mov => mov > 0)
    .map(deposit => (deposit * acc.interestRate) / 100)
    .filter((int, i, arr) => {
      // console.log(arr);
      return int >= 1;
    })
    .reduce((acc, int) => acc + int, 0);
  labelSumInterest.textContent = `${interest.toFixed(2)}€`;
};

const createUsernames = function (accs) {
  accs.forEach(function (acc) {
    acc.username = acc.owner
      .toLowerCase()
      .split(' ')
      .map(name => name[0])
      .join('');
  });
};
createUsernames(accounts);

const updateUI = function (acc) {
  // Display movements
  displayMovements(acc.movements);

  // Display balance
  calcDisplayBalance(acc);

  // Display summary
  calcDisplaySummary(acc);
};

///////////////////////////////////////
// Event handlers
let currentAccount;

btnLogin.addEventListener('click', function (e) {
  // Prevent form from submitting
  e.preventDefault();

  currentAccount = accounts.find(
    acc => acc.username === inputLoginUsername.value
  );
  console.log(currentAccount);

  if (currentAccount?.pin === +inputLoginPin.value) {
    // Display UI and message
    labelWelcome.textContent = `Welcome back, ${
      currentAccount.owner.split(' ')[0]
    }`;
    containerApp.style.opacity = 100;

    // Clear input fields
    inputLoginUsername.value = inputLoginPin.value = '';
    inputLoginPin.blur();

    // Update UI
    updateUI(currentAccount);
  }
});

btnTransfer.addEventListener('click', function (e) {
  e.preventDefault();
  const amount = +inputTransferAmount.value;
  const receiverAcc = accounts.find(
    acc => acc.username === inputTransferTo.value
  );
  inputTransferAmount.value = inputTransferTo.value = '';

  if (
    amount > 0 &&
    receiverAcc &&
    currentAccount.balance >= amount &&
    receiverAcc?.username !== currentAccount.username
  ) {
    // Doing the transfer
    currentAccount.movements.push(-amount);
    receiverAcc.movements.push(amount);

    // Update UI
    updateUI(currentAccount);
  }
});

btnLoan.addEventListener('click', function (e) {
  e.preventDefault();

  const amount = Math.floor(inputLoanAmount.value);

  if (amount > 0 && currentAccount.movements.some(mov => mov >= amount * 0.1)) {
    // Add movement
    currentAccount.movements.push(amount);

    // Update UI
    updateUI(currentAccount);
  }
  inputLoanAmount.value = '';
});

btnClose.addEventListener('click', function (e) {
  e.preventDefault();

  if (
    inputCloseUsername.value === currentAccount.username &&
    +inputClosePin.value === currentAccount.pin
  ) {
    const index = accounts.findIndex(
      acc => acc.username === currentAccount.username
    );
    console.log(index);
    // .indexOf(23)

    // Delete account
    accounts.splice(index, 1);

    // Hide UI
    containerApp.style.opacity = 0;
  }

  inputCloseUsername.value = inputClosePin.value = '';
});

let sorted = false;
btnSort.addEventListener('click', function (e) {
  e.preventDefault();
  displayMovements(currentAccount.movements, !sorted);
  sorted = !sorted;
});

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES

/*
//Lesson 170 converting and checking numbers

console.log(23 === 23.0);

//Base 10 - 0 to 9. 1/10
//Binary base 2 - 0 1

//In binary you get all these extra 0's running joke in JS
console.log(0.1 + 0.2);
console.log(0.1 + 0.2 === 0.3);

console.log(Number('23'));
//Easier way to convert a string is use + because when JS sees a + it will to automatic type conversion
console.log(+'23');

//So JS not usable for really accurate scientific measurements.

//We can also do parsing so parsing a string from a number
console.log(Number.parseInt('30px', 10));
//only works if the string starts with number always add the 10 to tell it to use base numbers (2 is binary)
console.log(Number.parseInt('e23', 10));
//Floats
console.log(Number.parseFloat('  2.5rem   '));
console.log(Number.parseInt('   2.5rem   '));
//NAN for checking if a value is a number
console.log(Number.isNaN(20));
console.log(Number.isNaN('20'));
console.log(Number.isNaN(+'20px'));
console.log(Number.isNaN(23 / 0)); //dividing by zero cant be done
//Is finite is the best way of checking if a number is a number
console.log(Number.isFinite(20));
console.log(Number.isFinite('20'));
console.log(Number.isFinite(+'20'));
console.log(Number.isFinite(23 / 0));
//isInteger
console.log(Number.isInteger(23));
console.log(Number.isInteger(23.0));
console.log(Number.isInteger(23 / 0));
*/

/*
//Sqaure root
console.log(Math.sqrt(25));
console.log(25 ** (1 / 2));
//Cubic root
console.log(8 ** (1 / 3));
//Max
console.log(Math.max(4, 2, 122, 12, 22));
//does type conversion
console.log(Math.max(4, 2, '23', 12, 22));
console.log(Math.max(4, 2, '23px', 12, 22));
//Min
console.log(Math.min(4, 2, 122, 12, 22));
//Calculate the area of a circle
console.log(Math.PI * Number.parseFloat('10px') ** 2);
//Random
console.log(Math.trunc(Math.random() * 6) + 1);
//Random number between range
const randomInt = (min, max) =>
  Math.trunc(Math.random() * (max - min) + 1) + min;
console.log(randomInt(10, 20));

//Rounding integers
console.log(Math.trunc(23.3));
//Round
console.log(Math.round(23.3));
console.log(Math.round(23.9));
//Ceil
console.log(Math.ceil(23.3));
console.log(Math.round(23.9));
//Floor
console.log(Math.floor(23.3));
console.log(Math.floor(23.9));
//all of these methods do type conversion
console.log(Math.floor('23.9'));

//With negative numbers it works the other way around
console.log('/// NEGATIVE NUMBERS ///');
console.log(Math.floor(-23.3));
console.log(Math.floor(-23.9));
console.log(Math.ceil(-23.3));
console.log(Math.ceil(-23.9));
console.log(Math.round(-23.3));
console.log(Math.round(-23.9));
console.log(Math.trunc(-23.3));
console.log(Math.trunc(-23.9));

//Rounding decimals
console.log('/// ROUNDING DECIMALS ///');
console.log((2.7).toFixed(0)); //to fixed returns a string
console.log((2.7).toFixed(3));
console.log((2.345).toFixed(2));
console.log(+(2.345).toFixed(2)); //converting to number with +
*/

/*
// Lesson 172 Remainder operator (modulo)
//Remainder
console.log(5 % 2);
//Divide
console.log(5 / 2); // 5 = 2 * 2 + 1 <- +1 is the remainder
console.log(8 % 3);
console.log(8 / 3); // 8 = 2 * 3 + 2 <- +2 is the remainder

//if divisible by 2 the remainder is 0
console.log(6 % 2);
console.log(6 / 2);
//if divisible by odd number the remainder is something else
console.log(7 % 2);
console.log(7 / 2);

//is completely divisible or not? so does it result in zero or not.
const isEven1 = n => n % 2 === 0;
console.log(isEven1(4));
console.log(isEven1(7));

const isEven2 = n => (n % 2 === 0 ? 'even' : 'odd');
console.log(isEven2(4));
console.log(isEven2(7));

labelBalance.addEventListener('click', function () {
  [...document.querySelectorAll('.movements__row')].forEach(function (row, i) {
    // 0, 2, 4, 6 every other row
    if (i % 2 === 0) row.style.backgroundColor = 'orangered';
    // 0, 3, 6, 9 every third row
    if (i % 3 === 0) row.style.backgroundColor = 'blue';
  });
});

//Good to use for every nth time adjustments
*/

/*
//Lesson 173 Numeric seperators _

//287,460,000,000
const diameter = 287_460_000_000;
//underscores ignored
console.log(diameter);

const price = 345_99;
console.log(price);

const transferFee1 = 15_00;
const transferFee2 = 1_500;

const PI = 3.14_15;
console.log(PI);

console.log(Number('230000'));
//Not parseable because of _
console.log(Number('230_000'));
*/

/*
//Lesson 174 bigInt

//bigInt introduced in ES2020, ints represented in 64 bits (64 1’s or 0’s to represent a number, only 53 are used for the actual numbers the rest are for the position of the decimal point and the sign). So there is a limit on how big numbers can be.

//working with 2 because its base 2 only 1's and 0's
console.log(2 ** 53 - 1);
//even stored in JS as special value
console.log(Number.MAX_SAFE_INTEGER);
//check js cannot represent these following numbers accurately same output but incorrect every time
//Unsafe numbers
console.log(2 ** 53 + 0);
console.log(2 ** 53 + 1);
console.log(2 ** 53 + 3);
console.log(2 ** 53 + 4);
//bigInt is new primitive numbers as large as you want
//without the n at the end (not bigInt)
console.log(9023048902323452346234634562345234523453456);
//with bigInt n indicator
console.log(9023048902323452346234634562345234523453456n);
//With bigInt function should prob still only be used with smaller numbers, otherwise not accurate number represented
console.log(BigInt(9023048902));
//operations work the same as usual
console.log(10000n + 10000n);
console.log(234123523465354745675687567856780n * 10000000n);
//cannot mix bigInts with regular numbers
const huge = 201209032480192834909238n;
const num = 23;
//console.log(huge * num);
console.log(huge * BigInt(num));
//Also math operations are not going to work
//console.log(Math.sqrt(16n));
console.log(Math.sqrt(16));

//Two excpetions to this

//1 logical operators
console.log('/// LOGICAL OPERATORS ///');
//this works
console.log(20n > 15);
//this does not work because no type coercion
console.log(20n === 20);
console.log(typeof 20n);
//but this does
console.log(20 == 20);

//2 string concatenations
console.log('/// STRING CONCATENATONS ///');
//the number is converted to a string
console.log(huge + ' is REALLY big!!!');

//Divisons
//cuts the decimal part off
console.log(11n / 3n);
//returns the infinite number
console.log(10 / 3);
*/
