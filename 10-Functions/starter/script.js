'use strict';

// Coding Challenge #2

(function () {
  //This is executed before and this header variable is long gone but still usable because its stored as a closure and still usable by the callback function below
  //A good way of thinking about it is 'this header is in the backpack of this function'
  const header = document.querySelector('h1');
  header.style.color = 'red';

  document.querySelector('body').addEventListener('click', function () {
    header.style.color = 'blue';
  });
})();

/*
//138 More closure examples

//Example1
let f;

const g = function () {
  const a = 23;
  f = function () {
    console.log(a * 2);
  };
};

const h = function () {
  const b = 777;
  f = function () {
    console.log(b * 2);
  };
};

g();
f();
//At this point in time the f value got the a from the g function
//closure g
console.dir(f);

//Reassigning f function
h();
f();
//Now contains the value b instead of a because it was reassigned by the h function
//closure h
console.dir(f);

//Example 2
const boardPassengers = function (n, wait) {
  //if this one is off it will close over this variable and go to the global scope perGroup if that is turned on (see line above: boardPassengers(180, 3);)
  const perGroup = n / 3;

  //timer takes two parameters a function and a time in milliseconds
  //This callback function was able (through closure) to acces all the function variables even after it was already executed
  setTimeout(function () {
    console.log(`We are now boarding all ${n} passengers.`);
    console.log(`There are three groups, each with ${perGroup} passengers`);
  }, wait * 1000);

  console.log(`We will start boarding in ${wait} seconds.`);
};

//if i turn off the perGroup in the boardPassengers function and turn the below perGroup on it will use this value for the $perGroup variable call inside the callback function
//const perGroup = 1000;
boardPassengers(180, 3);

//Call back function that calls later (waits to execute)
setTimeout(function () {
  console.log('TIMER');
}, 8000);
*/

/*
//137 Closures (happen automatically in certain situations)

//Example
const secureBooking = function () {
  let passengerCount = 0;

  return function () {
    passengerCount++;
    console.log(`${passengerCount} passengers`);
  };
};

//Global context now also contains the booker variable
//After executing the secureBooking function (and storing it in the variable) it is no longer on the call stack and does not exist in the execution context anymore (because it finished long ago)
//The original environment where the function was first created is now gone along with the return function inside (this is odd at first because we can still use the booker function, see below with this return function)
//Booker continues to have access
const booker = secureBooking();

//To execute booker when the variable is made a new execution context is created in the global scope and executable in the callstack
booker();
booker();
booker();

console.dir(booker);
*/

/*
//136 Immediately invoked function expressions (only run once functions)
//This is a pattern but not that used anymore because you can create a block around something you want to scope {}
//But still useful when you want to run a piece of code just once and this is still used

//This is run twice but that is not what we want we dont want to save it anywhere and only execute once
const runOnce = function () {
  console.log('This will never run again');
};
runOnce();
runOnce();

//Turn it into an expression (trick javascript) by surrounding the function with () and () at the end to call it right away.
//Also a function value or IIFE for short (Immediately invoked function expression)
(function () {
  console.log('This will never run again once more');
})();

//With arrow function (because it has no name it will only run once)
(() => console.log('This will ALSO never run again'))();
*/

// Coding Challenge #1

/* 
Let's build a simple poll app!

A poll has a question, an array of options from which people can choose, and an array with the number of replies for each option. This data is stored in the starter object below.

Here are your tasks:

1. Create a method called 'registerNewAnswer' on the 'poll' object. The method does 2 things:
  1.1. Display a prompt window for the user to input the number of the selected option. The prompt should look like this:
        What is your favourite programming language?
        0: JavaScript
        1: Python
        2: Rust
        3: C++
        (Write option number)
  
  1.2. Based on the input number, update the answers array. For example, if the option is 3, increase the value AT POSITION 3 of the array by 1. Make sure to check if the input is a number and if the number makes sense (e.g answer 52 wouldn't make sense, right?)
2. Call this method whenever the user clicks the "Answer poll" button.
3. Create a method 'displayResults' which displays the poll results. The method takes a string as an input (called 'type'), which can be either 'string' or 'array'. If type is 'array', simply display the results array as it is, using console.log(). This should be the default option. If type is 'string', display a string like "Poll results are 13, 2, 4, 1". 
4. Run the 'displayResults' method at the end of each 'registerNewAnswer' method call.

HINT: Use many of the tools you learned about in this and the last section 😉

BONUS: Use the 'displayResults' method to display the 2 arrays in the test data. Use both the 'array' and the 'string' option. Do NOT put the arrays in the poll object! So what shoud the this keyword look like in this situation?

BONUS TEST DATA 1: [5, 2, 3]
BONUS TEST DATA 2: [1, 5, 3, 9, 6, 1]

GOOD LUCK 😀
*/

/* 
const poll = {
  question: 'What is your favourite programming language?',
  options: ['0: JavaScript', '1: Python', '2: Rust', '3: C++'],
  // This generates [0, 0, 0, 0]. More in the next section 😃
  answers: new Array(4).fill(0),
  registerNewAnswer() {
    //Get answer
    let answer = Number(
      prompt(
        `${poll.question}\n\n${poll.options.join(
          '\n'
        )}\n\nwrite the option number`
      )
    );
    console.log(answer);

    //Register answer (we could have used an if here, however this is a great usecase of short circuiting with the && operator after the last &&)
    //So first two checks and then one execution

    console.log(this);

    typeof answer === 'number' &&
      answer < this.answers.length &&
      this.answers[answer]++;

    this.displayResults();
    this.displayResults('string');
  },
  //display results
  displayResults(type = 'array') {
    if (type === 'array') {
      console.log(this.answers);
    } else if (type === 'string') {
      console.log(`Poll results are ${this.answers.join(', ')}`);
    }
  },
};

//We need to bind the this keyword to the object instead of the event(listener) button with bind
document
  .querySelector('.poll')
  .addEventListener('click', poll.registerNewAnswer.bind(poll));
console.log(poll);

//Creating new object containing array
poll.displayResults.call({ answers: [5, 2, 3] });
poll.displayResults.call({ answers: [5, 2, 3] }, 'string');
poll.displayResults.call({ answers: [5, 2, 3, 4, 5] });
*/

/* 
//Lesson 133 Call and apply methods (how we can set the this key word manually and why)
const lufthansa = {
  airline: 'Lufthansa',
  iataCode: 'LH',
  bookings: [],
  //advanced method literal writing without function instead of book: function(){}
  book(flightNum, name) {
    console.log(
      `${name} booked a seat on ${this.airline} flight ${this.iataCode}${flightNum}`
    );
    this.bookings.push({ flight: `${this.iataCode}${flightNum}`, name });
  },
};

//this calls the lufthansa object because that is the object on which the book method is called
lufthansa.book(239, 'Theron Garay');
lufthansa.book(952, 'Yietta Chrysostomou');
console.log(lufthansa);

const eurowings = {
  airline: 'Eurowings',
  iataCode: 'EW',
  bookings: [],
  //we dont just want to duplicate the book method from the lufthansa object but put it in a variable
};

//first class function = a function as a value (taking the method from the lufthansa object)
const book = lufthansa.book;
//This does not work because in a regular function call which is what we do below the this keyword points to undefined (in strict mode), its not a method anymore of the object but a copy of the method as its own funtion
//book(23, 'Levy Verhagen');

//How do we tell JS that we want to use this method on the new eurowings object
//By telling javascript we explicitly what the this keyword should look like (call apply and find)

//Call method
//with the call method the first param is exactly what we want the this keyword to point to
//With the call function we call the book method on a specified object this allows us to set the this keyword manually
book.call(eurowings, 23, 'Levy Verhagen');
console.log(eurowings);

//we can do the same with lufthansa
book.call(lufthansa, 239, 'Stacho Garay');
console.log(lufthansa);

//The same properties needed as the other objects because they get used in the book method
const swiss = {
  airline: 'Swiss Air Lines',
  iataCode: 'SAL',
  bookings: [],
  //we dont just want to duplicate the book method from the lufthansa object but put it in a variable
};

book.call(swiss, 808, 'Yma Garay');
console.log(swiss);

//Apply method (does same as call) but will take an array to pass elements into the function
const flightData = [83, 'Igor Garay'];
const flightData1 = [13, 'Iwan Garay'];

//apply does not get used a lot anymore in modern javascript because there is a better way (call with a spread operator see below)
book.apply(swiss, flightData);
console.log(swiss, 'test met apply');

book.call(swiss, ...flightData1);
console.log(swiss, 'test met call plus spread operator');

//134 the bind method
//book.call(eurowings, 23, 'Levy Verhagen');

//This will return a new function with the this keyword also set to eurowings
const bookEW = book.bind(eurowings);
//Creating a booking function for each of the airlines with their own this keywords bound
const bookLH = book.bind(lufthansa);
const bookSA = book.bind(swiss);
//The parameters are simply back to the number and name because it alraedy knows the 'this' as it is bound
bookEW(40, 'Syair Jansen');
bookLH(22, 'Tim Duncan');
bookSA(43, 'Kawhi Leonard');

//Function for a specific flightnumber (by defining the default first parameter -> 23), so it now only needs the name
const bookEW23 = book.bind(eurowings, 23);
bookEW23('Giannis Antetokounmpo');
bookEW23('Jrue Holiday');

//Bind also useful to combine event listener with objects (which is this calling?)
lufthansa.planes = 300;
lufthansa.buyPlane = function () {
  //The this keyword points to the button not to the object (because that is where the eventlistener function is triggered)
  console.log(this);
  this.planes++;
  console.log(this.planes);
};
//But out here the this keyword would be pointed towards lufthansa
lufthansa.buyPlane();

//the this is attached to the button because that is the thing that calls the event
//So which should we use here call or bind? The call passes into the existing function but we want to return a new one so we can call it with this otherwise we would still use this on the event listener

//Before
//document.querySelector('.buy').addEventListener('click', lufthansa.buyPlane);

//After
document
  .querySelector('.buy')
  .addEventListener('click', lufthansa.buyPlane.bind(lufthansa));
//So the above instead of binding the this to the event binds the this to the object

//Partial application (means we can preset parameters)
const addTax = (rate, value) => value + value * rate;
console.log(addTax(0.1, 200));

//In this case we dont even care about the this keyword (because we will preset the rate so it always uses that rate)
//usually the first word in the bind is what the this keyword points towards but in this case we dont care about that because it is preset
const addVat = addTax.bind(null, 0.23);
//So the above addVat essentially does the following: addVat value => value + value * 0.23;
console.log(addVat(100));
console.log(addVat(1000));
//The order is important if you want to preset the rate it has to be the first parameter so you can use null because we dont care about the this keyword in this case
//You could argue we could do this with preset/default parameters but in this case we make a much more specific function to specify the value added tax

//Challenge create the above but with a function that returns a function
const addTaxRAte = function (rate) {
  return function (value) {
    return value + value * rate;
  };
};

//We use the preset parameter on the first function to call the second function with the value
const addVat2 = addTaxRAte(0.23);
console.log(addVat2(100));
console.log(addVat2(1000));

//Now also as an arrow function
const addTaxRate1 = rate => {
  return function (value) {
    return value + value * rate;
  };
};

const addVat3 = addTaxRate1(0.23);
console.log(addVat3(100));
console.log(addVat3(1000));
*/

/* 
//Lesson 132 Functions that return functions

const greet = function (greeting) {
  return function (name) {
    console.log(`${greeting} ${name}`);
  };
};

//storing the greet function in a variable
const greeterHey = greet('Hey');
//GreeterHey (variable) is now a function if we call it with a name it will return the function inside aswell with the inside defined parameter
greeterHey('Theron');
greeterHey('Yietta');
//This works because of closures more on that later

//We can also do it in one go (first call the outside function with the correct parameters and then the return function with its own parameters, both will be usable)
greet('Wassup')('Levy');

const greetArrowF = greeting => {
  return function (name) {
    console.log(`${greeting} ${name}`);
  };
};

const greeterArrowF = greetArrowF('Hey');
greeterArrowF('Stacho');

//Even more compact/better version (a bit more confusion but one arrow function returning another arrow function)
const greetArrowBetter = greeting => name => console.log(`${greeting} ${name}`);
greetArrowBetter('Hallo')('Job');
*/

/* 
//Lesson 131 Functions accepting callback functions

//Creating our higher order functions (functions that accept another function)
const oneWord = function (str) {
  return str.replace(/ /g, '').toLowerCase();
};

const upperFirstWord = function (str) {
  const [first, ...others] = str.split(' ');
  return [first.toUpperCase(), ...others].join(' ');
};

//This transformers function will be calling the lower level function
const transformer = function (str, fn) {
  //The original string as it is received through the parameter
  console.log(`Original string: ${str}`);
  //call the lower function and pass along the string parameter into that function to get the transformed string
  console.log(`Transformed string: ${fn(str)}`);
  //Check which function executed the transformation by logging the function name tot he console
  console.log(`Transformed by: ${fn.name}`);
};

//Passing the callback function into the transformer
transformer('JavaScript is the best!', upperFirstWord);
transformer('JavaScript is the best!', oneWord);

//Js uses callbacks all the time
const high5 = function () {
  console.log('Body was clicked');
};
//Callback based on an eventlistener (the eventlistener is the higher order function)
document.body.addEventListener('click', high5);

//For each of the values in the arry the callback will be called
['Yo', 'No', 'Go'].forEach(high5);

 */

/* 
//Lesson 129 how passing arguments into functions work (primitives and objects in function context)

//Primitive
const flight = 'FH123';

//Object
const theron = {
  firstName: 'Theron',
  lastName: 'Garay',
  passport: 584848939,
};

const checkIn = function (flightNum, passenger) {
  //flightNum is a completely new/different variable here inside the function, passing the string into the function makes it a copy not the original value
  flightNum = 'LH999';
  //The passenger object is overwritten, because what was passed into the function is the reference to the object (passenger is Theron (the same object in the memory heap))
  passenger.name = 'Mr.' + passenger.name;

  if (passenger.passport === 584848939) {
    alert('Checked In');
  } else {
    alert('Wrong passport!');
  }
};

checkIn(flight, theron);
console.log(flight);
console.log(theron);

//Passing a primitive or an object into a function is exactly the same as doing the following outside of the function (the primitive is a copy, the object is the same with by reference)
const flightNum = flight;
const passenger = theron;
console.log(flight, theron);

//Good to be aware of this difference, shown by the following example when working with large(r) teams
const newPassport = function (person) {
  person.passport = Math.trunc(Math.random() * 100000000);
  console.log(person.passport);
};

//Now we changed the passport number before we check in lets see what happens
newPassport(theron);
//The checkIn function is called again but now the passport number is wrong that is because we have two functions manipulation one object
checkIn(flight, theron);
//be careful to manipulate one object with different object calls
*/

/*
//Lesson 128 default parameters
const bookings = [];

//Default parameters in between the ()
const createBooking = function (
  flightNum,
  numPassengers = 1,
  price = 199 * numPassengers
) {
  //Create a booking object with just the names the values will get passed into the function

  //The old ES5 (pre ES6) way of creating default values/parameters
  //numPassengers = numPassengers || 1;
  //price = price || 199;

  const booking = {
    flightNum,
    numPassengers,
    price,
  };
  console.log(booking);
  bookings.push(booking);
};

//we just give the flightnumber the other values are short circuited and we can use that to our advantage, by using default parameters
createBooking('LH123');
createBooking('LH123', 2, 80);
createBooking('LH1234', 2);
createBooking('LH1234', 5);
*/
