'use strict';

//Lesson 131 Functions accepting callback functions

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
