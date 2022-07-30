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
    '2020-12-23T07:42:02.383Z',
    '2022-01-28T09:15:04.904Z',
    '2022-04-01T10:17:24.185Z',
    '2022-05-08T14:11:59.604Z',
    '2022-07-20T17:01:17.194Z',
    '2022-07-22T23:36:17.929Z',
    '2022-07-24T10:51:36.790Z',
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
    '2020-12-25T06:04:23.907Z',
    '2020-01-25T14:18:46.235Z',
    '2021-02-05T16:33:06.386Z',
    '2022-04-10T14:43:26.374Z',
    '2022-06-25T18:49:59.371Z',
    '2022-07-26T12:01:20.894Z',
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
const formatMovementDate = function (date, locale) {
  const calcDaysPassed = (date1, date2) =>
    Math.round(Math.abs(date2 - date1) / (1000 * 60 * 60 * 24));

  const daysPassed = calcDaysPassed(new Date(), date);
  console.log(daysPassed);

  //Maybe a bit confusing with all these returns but as you return one value the rest will not be ran through
  //Once we return the function stops executing, this is quite common
  //Today
  if (daysPassed === 0) return 'Today';
  //Yesterday
  if (daysPassed === 1) return 'Yesterday';
  //within the last week
  if (daysPassed <= 7) return `${daysPassed} days ago`;
  //else not actually needed because it will happen if the other returns prior are not executed
  else {
    // const day = `${date.getDate()}`.padStart(2, 0);
    // const month = `${date.getMonth() + 1}`.padStart(2, 0);
    // const year = date.getFullYear();
    // return `${day}/${month}/${year}`;
    return new Intl.DateTimeFormat(locale).format(date);
  }
};

const formatCur = function (value, locale, currency) {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: currency,
  }).format(value);
};

const displayMovements = function (acc, sort = false) {
  containerMovements.innerHTML = '';

  const movs = sort
    ? acc.movements.slice().sort((a, b) => a - b)
    : acc.movements;

  movs.forEach(function (mov, i) {
    const type = mov > 0 ? 'deposit' : 'withdrawal';

    //format dates for movements
    const date = new Date(acc.movementsDates[i]);
    const displayDate = formatMovementDate(date, acc.locale);

    //numbers for displaying money values
    const formattedMov = formatCur(mov, acc.locale, acc.currency);

    const html = `
      <div class="movements__row">
        <div class="movements__type movements__type--${type}">${
      i + 1
    } ${type}</div>
    <div class="movements__date">${displayDate}</div>
        <div class="movements__value">${formattedMov}</div>
      </div>
    `;

    containerMovements.insertAdjacentHTML('afterbegin', html);
  });
};

const calcDisplayBalance = function (acc) {
  acc.balance = acc.movements.reduce((acc, mov) => acc + mov, 0);

  labelBalance.textContent = formatCur(acc.balance, acc.locale, acc.currency);
};

const calcDisplaySummary = function (acc) {
  const incomes = acc.movements
    .filter(mov => mov > 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumIn.textContent = formatCur(incomes, acc.locale, acc.currency);

  const out = acc.movements
    .filter(mov => mov < 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumOut.textContent = formatCur(out, acc.locale, acc.currency);

  const interest = acc.movements
    .filter(mov => mov > 0)
    .map(deposit => (deposit * acc.interestRate) / 100)
    .filter((int, i, arr) => {
      // console.log(arr);
      return int >= 1;
    })
    .reduce((acc, int) => acc + int, 0);
  labelSumInterest.textContent = formatCur(interest, acc.locale, acc.currency);
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
  displayMovements(acc);

  // Display balance
  calcDisplayBalance(acc);

  // Display summary
  calcDisplaySummary(acc);
};

//Logout timer function
const startLogOutTimer = function () {
  //Execute this function right away and then after each second to go down to zero
  const tick = function () {
    //the minutes
    const min = String(Math.trunc(time / 60)).padStart(2, 0);
    //the remainder of the minutes are the seconds
    const sec = String(time % 60).padStart(2, 0);

    // each callback call print the remaining time to UI
    labelTimer.textContent = `${min}:${sec}`;

    // when timer is at zero seconds stop timer and logout
    if (time === 0) {
      clearInterval(timer);
      labelWelcome.textContent = 'Log in to get started';
      containerApp.style.opacity = 0;
    }

    //Decrease 1s (decrease after if)
    time--;
  };

  // set time to five minutes
  let time = 300;

  // call timer every second and first time before setInterval timer to go down to zero
  tick();
  const timer = setInterval(tick, 1000);
  //When you login to another account there is already a timer running so return the timer to stop it first.
  return timer;
};

///////////////////////////////////////
// Event handlers (we need these to persist between logins to see the status) that is why they need to be in the parent scope
let currentAccount, timer;

// FAKE ALWAYS LOGGED IN
// currentAccount = account1;
// updateUI(currentAccount);
// containerApp.style.opacity = 100;

//EXPERIMENTING WITH INTERNATIONAL API
const now = new Date();
//Time object as second arg to the datetimeformat
const options = {
  hour: 'numeric',
  minute: 'numeric',
  day: 'numeric',
  month: 'long',
  year: 'numeric',
  weekday: 'long',
};
const locale = navigator.language;
console.log(locale);

labelDate.textContent = new Intl.DateTimeFormat(locale, options).format(now);

// day/month/year

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

    //Create current date
    const now = new Date();
    const options = {
      hour: 'numeric',
      minute: 'numeric',
      day: 'numeric',
      month: 'numeric',
      year: 'numeric',
      //weekday: 'long',
    };
    // const locale = navigator.language;

    labelDate.textContent = new Intl.DateTimeFormat(
      currentAccount.locale,
      options
    ).format(now);

    // Clear input fields
    inputLoginUsername.value = inputLoginPin.value = '';
    inputLoginPin.blur();

    //If there is already a timer we need to clear it to have one running at a time
    if (timer) {
      clearInterval(timer);
    }
    //Start new logout timer
    timer = startLogOutTimer();

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
    //Doing the transfer
    currentAccount.movements.push(-amount);
    receiverAcc.movements.push(amount);

    //Add transfer date
    currentAccount.movementsDates.push(new Date().toISOString());
    receiverAcc.movementsDates.push(new Date().toISOString());

    //Update UI
    updateUI(currentAccount);

    //Reset (global)timer after activity to stay logged in
    clearInterval(timer);
    timer = startLogOutTimer();
  }
});

btnLoan.addEventListener('click', function (e) {
  e.preventDefault();

  const amount = Math.floor(inputLoanAmount.value);

  if (amount > 0 && currentAccount.movements.some(mov => mov >= amount * 0.1)) {
    //simulate delay for loan approval
    setTimeout(function () {
      // Add movement
      currentAccount.movements.push(amount);

      //Add loan date
      currentAccount.movementsDates.push(new Date().toISOString());

      // Update UI
      updateUI(currentAccount);

      //Reset (global)timer after activity to stay logged in
      clearInterval(timer);
      timer = startLogOutTimer();
    }, 2500);
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
  displayMovements(currentAccount, !sorted);
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

/*
//Lesson 175 creating dates
const now = new Date();
console.log(now);

//Parsing date (generally a bad idea not very reliable)
console.log(new Date('Sun Jul 24 2022 17:15:24'));
console.log(new Date('December 24, 2015'));
console.log(new Date(account1.movementsDates[0]));
//our own date time creation into constructor
console.log(new Date(2037, 10, 19, 15, 23, 5));
//Month with 30 days autocorrect to next day (goes to december 1st)
console.log(new Date(2037, 10, 31));
//with three days over month length (december 3rd)
console.log(new Date(2037, 10, 33));
//Passing in 0 (jan first 1970, unix time)
console.log(new Date(0));
//Passing in days hours minutes seconds times 1000 to convert to miliseconds
console.log(new Date(3 * 24 * 60 * 60 * 1000));
*/

/*
//Working with dates
const future = new Date(2037, 10, 19, 15, 23);
console.log(future);
console.log(future.getFullYear());
console.log(future.getMonth()); // zero based so 10 is november
console.log(future.getDate());
console.log(future.getDay());
console.log(future.getHours());
console.log(future.getMinutes());
console.log(future.getSeconds());
//Generate date time string
console.log(future.toISOString());
//timestamp of time that has passed since january first 1970
console.log(future.getTime());
//reversing it
console.log(new Date(2142253380000));
//timestamp for right now
console.log(Date.now());
console.log(new Date(1658676743308));
//setting functions
future.setFullYear(2040);
console.log(future);
//There are also setMonth, setDay, setHour, setMinute
*/

/*
//Lesson 177 operations with dates

//subtract two dates (result miliseconds)
const future = new Date(2037, 10, 19, 15, 23);
console.log(+future);

//function takes in two dates and returns the number of days between the two dates
//with Math absolute the higher number will be the one to be subtracted from so the order of the dates does not matter
const calcDaysPassed = (date1, date2) =>
  Math.abs(date2 - date1) / (1000 * 60 * 60 * 24);

const days1 = calcDaysPassed(new Date(2022, 3, 4), new Date(2022, 3, 14));
console.log(days1);

//for weird edge cases with daylights saving time and other edge cases use moments.js
*/

/*
//Lesson 178 operations with numbers

const num = 3884764.23;

//For international numbers you have other property options than the day / month / minutes / seconds etc like for international dates
const options1 = {
  style: 'currency',
  unit: 'celsius',
  currency: 'EUR',
  // useGrouping: false;
};

console.log('US', new Intl.NumberFormat('en-US', options1).format(num));
console.log('GER', new Intl.NumberFormat('de-DE', options1).format(num));
console.log('SY', new Intl.NumberFormat('ar-SY', options1).format(num));
console.log(
  navigator.language,
  new Intl.NumberFormat(navigator.language, options1).format(num)
);
*/

/*
//Lesson 180 setTimeout and SetInterval

//This is an example of asynchronous Javascript

//the arrow function in this case is an argument for the setTimeOut function for execution in the future. When that future arrives is what we specify at the end in milliseconds

//It is possible to cancel the timeout
const ingredients = ['olives', 'spinach', 'chicken', 'mozarella'];

const pizzaTimer = setTimeout(
  (ing1, ing2) => console.log(`Here is your pizza with ${ing1} and ${ing2}`),
  3000,
  ...ingredients
);
//This log simply gets executed so the settimeout before is not blocking
console.log('Waiting...');

//It is possible to cancel the timeout and not execute the pizzaTimer setTimeout function
if (ingredients.includes('spinach')) clearTimeout(pizzaTimer);

//setInterval function for interval of repetitive execution of functions
setInterval(function () {
  const now = new Date();
  console.log(now.getHours(), now.getMinutes(), now.getSeconds());
}, 1000);
*/
