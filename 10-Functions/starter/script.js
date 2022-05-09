'use strict';

//Lesson 129 how passing arguments into functions work (primitives and objects in function context)

//Primitive
const flight = 'FH123';

//Object
const Theron = {
  firstName: 'Theron',
  lastName: 'Garay',
};

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
