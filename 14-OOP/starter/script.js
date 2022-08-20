'use strict';

//Lesson 208 Constructor functions and the new operator

//Constructor functions always start with Capital letter (arrow does not work, does not have this)
const Person = function (firstName, birthYear) {
  //creating instance properties, available on all instances
  this.firstName = firstName;
  this.birthYear = birthYear;

  //creating instance methods, available on all instances

  //Never create a method inside a constructor function!
  //If we have a thousand instances we create this function a thousand times bad performance
  //   this.calcAge = function () {
  //     console.log(2022 - this.birthYear);
  //   };
};

//Difference between normal function and constructor function is that we use the New keyword to call a constructor function
const jonas = new Person('Jonas', 1991);
console.log(jonas);

// 1. New empty object {} is created
// 2. function is called, this = {} the empty object
// 3. {} linked to prototype
// 4. constructor function automatically returns {}

//Now we can use this constructor function to create as many objects (instances) as we want.
const wouter = new Person('Wouter', 1990);
const theron = new Person('Theron', 1990);
const yietta = new Person('Yietta', 1994);
const levy = 'Levy';
console.log(wouter, theron, yietta);

//We created several objects (instantiations) from the constructor function
//Constructor functions in JavaScript simulate classes
console.log(theron instanceof Person);
