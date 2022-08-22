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
const wouter = new Person('Wouter', 1995);
const theron = new Person('Theron', 1990);
const yietta = new Person('Yietta', 1994);
const levy = 'Levy';
console.log(wouter, theron, yietta);

//We created several objects (instantiations) from the constructor function
//Constructor functions in JavaScript simulate classes
console.log(theron instanceof Person);

//Lesson 209 Prototypes

//Each function has a property called prototype that includes constructor functions that give acces to all the properties and methods of that constructor function
console.log(Person.prototype);

Person.prototype.calcAge = function () {
  console.log(2022 - this.birthYear);
};

//Jonas is an instance that inherited the method from the constructor (very basic prototypal inheritance)
jonas.calcAge();
wouter.calcAge();
theron.calcAge();
//The this keyword is set to the object that is calling the method

//This works because the object instance inherit prototype, We can check the prototype of jonas for example:
console.log(jonas.__proto__);
console.log(jonas.__proto__ === Person.prototype); // the prototype outcome is the same that is used
console.log(Person.prototype.isPrototypeOf(jonas));
console.log(Person.prototype.isPrototypeOf(wouter));
console.log(Person.prototype.isPrototypeOf(Person)); // bad naming of property, this returns false:
//Hence think of prototype as .prototypeOfLinkedObjects (instances)

//Setting properties on the prototype
Person.prototype.species = 'Homo Sapiens';
console.log(jonas, wouter, theron);
console.log(jonas.species, theron.species);

//Own properties are properties declared directly on the object (class) itself not later assigned
console.log(jonas.hasOwnProperty('firstName')); //true
console.log(jonas.hasOwnProperty('species')); //false
