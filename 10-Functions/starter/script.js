'use strict';

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
