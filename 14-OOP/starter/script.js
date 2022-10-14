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

//Lesson 211 Prototypal Inheritance on Built-in Objects
console.log(jonas.__proto__);
//.object.prototype
console.log(jonas.__proto__.__proto__); //prototype property of object (usually top of scope chain)
console.log(jonas.__proto__.__proto__.__proto__); //null

console.dir(Person.prototype.constructor);

//array prototypes
const arr = [3, 1, 1, 3, 5, 2, 3, 4, 5];
console.log(arr.__proto__);
console.log(arr.__proto__ === Array.prototype); //true
console.log(arr.__proto__.__proto__); //prototype property of object (usually top of scope chain)

//Adding new methods to the array prototpye so all other arrays inherit it
//Bad habit to do (can introduce bugs)
Array.prototype.unique = function () {
  return [...new Set(this)];
};
console.log(arr.unique());

const h1 = document.querySelector('h1');
console.dir(h1); // almost six levels to this prototype chain: HTMLHeadingElement, HTMLelement, element, Node, EventTarget, Object

//Functions are objects and so we can call functions/methods on functions
console.dir(x => x + 1);

// ES6 Classes (are still functions)

//class expression
//const personCL = class {};

//class declaration
class PersonCL {
  //similar to construtor function but inside this class
  constructor(fullName, birthYear) {
    this.fullName = fullName;
    this.birthYear = birthYear;
  }

  //methods inside a class so added on its .prototype (instance methods)
  calcAge() {
    console.log(2022 - this.birthYear);
  }

  greet() {
    console.log(`Hey ${this.fullName}`);
  }

  get age() {
    return 2022 - this.birthYear;
  }

  set fullName(name) {
    console.log(name);
    //to avoid naming conflict add _
    if (name.includes(' ')) this._fullName = name;
    else alert(`${name} is not a full name!`);
  }

  get fullName() {
    return this._fullName;
  }

  //Static method
  static hey() {
    console.log('Hey there 🔥');
    console.log(this);
  }
}

const stacho = new PersonCL('Stacho Garay', 1994);
console.log(stacho);
stacho.calcAge();
console.log(stacho.__proto__ === PersonCL.prototype);

//Can add this to the class
// PersonCL.prototype.greet = function () {
//   console.log(`Hey ${this.firstName}`);
// };
stacho.greet();

//1. Classes r not hoisted (you can not use a class before is declared in the code unlike methods/functions)
//2. Classes are first class citizens (can pass into functions or return them from functions)
//3. Classes are executed in strict mode

//Which to use constructor functions or classes?
//Neither are depricated what is your personal preference
//Classes are fine to use aslong as you know everything in this section like prototypal inheritance
//A class is preferable because it keeps everything gathered in a code block unlike constructors

//Getters and setters also work in classes in thise case to check a full name with a space
const Levy = new PersonCL('Levy Verhagen', 1990);

//Every object in JS can have getter and setter functions get and set values
const account = {
  owner: 'Theron',
  movements: [200, 530, 120, 300],

  //getter
  get latest() {
    return this.movements.slice(-1).pop();
  },

  //setter must have at least one param
  set latest(mov) {
    this.movements.push(mov);
  },
};

//getter is written just as a property of the object
console.log(account.latest);
console.log((account.latest = 140));
console.log(account.movements);

//Classes also have getters and setters
console.log(stacho.age);

//lesson 215 static methods
//from is not a function (its attached to the entire constructor not to the prototype)
//From is in the array namespace
console.log(Array.from(document.querySelectorAll('h1')));
//Another example that is in the same namespace from the internationalisation lecture
//Namespace only available on its own constructor
console.log(Number.parseFloat('31'));

//Adding a static method
Person.hey = function () {
  console.log('Hey there 🔥');
  console.log(this);
};

Person.hey();
//The hey static method is not inherited so we cannot call it on another constructor
//stacho.hey();
PersonCL.hey(); //With this one the this keyword points to the entire class because it was added as a static tot he personCL class

//Lesson 116 - Object.create
const PersonProto = {
  calcAge() {
    console.log(2022 - this.birthYear);
  },

  init(firstName, birthYear) {
    this.firstName = firstName;
    this.birthYear = birthYear;
  },
};

//Passing in the prototype of the object into this instance so it inherits it
const yma = Object.create(PersonProto);
console.log(yma);
yma.name = 'Yma';
yma.birthYear = 1988;
yma.calcAge();
console.log(yma.__proto__ === PersonProto);

//Better way, have a function to create object instance
const marin = Object.create(PersonProto);
marin.init('Marin', 2002);
marin.calcAge();

//Lesson 218 Inheritance between "classes": constructor functions
const Student = function (firstName, birthYear, course) {
  // A lot of duplicate code with the person prototype
  // this.firstName = firstName;
  // this.birthYear = birthYear;

  //So better to pass this as param to call Person class and then pass in the needed other params:
  Person.call(this, firstName, birthYear);

  this.course = course;
};

//Linking prototypes
//Important to create object at this point in the code
//With this the student.prototype inherits the person prototype
Student.prototype = Object.create(Person.prototype); //Will return an empty object
//We have to create this connection here before we add any more methods tot he prototype of students
//If this was done afther the introduce() function the object.create would override the methods already added
//Why use object.create because we dont want to be the same so not = we want to inherit from the Person prototype (extra's)

Student.prototype.introduce = function () {
  console.log(`My name is ${this.firstName} and I study ${this.course}`);
};

const dom = new Student('Dom', 2000, 'Computer Science');
console.log(dom);
dom.introduce();
//Using from the person prototype with the student class because they are linked see line (312)
dom.calcAge(); //Method look-up in the prototype inheritance chain
console.log(dom.__proto__);
console.log(dom.__proto__.__proto__);

//Both true because we linked the prototypes together
console.log(dom instanceof Student);
console.log(dom instanceof Person);
console.log(dom instanceof Object);

//Use/Change the prototype Student as the constructor
Student.prototype.constructor = Student;
console.dir(Student.prototype.constructor);

// =======================================
// ========= Coding challenge #1 =========
// =======================================
const Car = function (make, speed) {
  this.make = make;
  this.speed = speed;
};

const car1 = new Car('Tesla', 30);
const car2 = new Car('Rivian', 20);

Car.prototype.accelerate = function (speed) {
  this.speed += 10;
  console.log(`The ${this.make} is going at ${this.speed} km/h`);
};

Car.prototype.brake = function (speed) {
  this.speed -= 5;
  console.log(`The ${this.make} is going at ${this.speed} km/h`);
};

car1.accelerate();
car2.brake();
car1.accelerate();
car2.brake();
car1.accelerate();
car2.brake();
car1.brake();

// =======================================
// ========= Coding challenge #2 =========
// =======================================
class VehicleCL {
  constructor(make, speed) {
    this.make = make;
    this.speed = speed;
  }

  accelerate() {
    this.speed += 10;
    console.log(`The ${this.make} is going at ${this.speed} km/h`);
  }

  brake() {
    this.speed -= 5;
    console.log(`The ${this.make} is going at ${this.speed} km/h`);
  }

  //getter
  get speedUS() {
    return this.speed / 1.6;
  }

  //setter must have at least one param
  set speedUS(speed) {
    this.speed = speed * 1.6;
  }
}

const tesla = new VehicleCL('Telsa', 120);
console.log(tesla.speedUS);
tesla.accelerate();
tesla.brake();
tesla.speedUS = 70;
console.log(tesla);

// =======================================
// ========= Coding challenge #3 =========
// =======================================
const EV = function (make, speed, charge) {
  Car.call(this, make, speed); // call params from Car
  this.charge = charge;
};

//Linking prototypes
EV.prototype = Object.create(Car.prototype);

EV.prototype.chargeBattery = function (chargeTo) {
  this.charge = chargeTo;
  console.log(
    `The ${this.make} is going at ${this.speed} km/h and has the ${this.charge}% battery life`
  );
};

//This function overrides the parent accelerate function from Car
EV.prototype.accelerate = function (speed, chargeTo) {
  this.speed += 20;
  this.charge--;
  console.log(
    `The ${this.make} is going at ${this.speed} km/h and has the ${this.charge}% battery life`
  );
};

//This function overrides the parent brake function from Car
EV.prototype.brake = function (speed, chargteTo) {
  this.speed -= 20;
  this.charge += 0.5;
  console.log(
    `The ${this.make} is going at ${this.speed} km/h and has the ${this.charge}% battery life`
  );
};

const nio = new EV('NIO', 120, 23);
//console.log(nio, 'Startpoint');
nio.chargeBattery(90);
//console.log(nio, 'Chargedbattery');
nio.accelerate();
//console.log(nio, 'Accelrate');
nio.brake();
//console.log(nio, 'Brake');

//Lesson 220 Inheritance between Classes: Es6 Classes
//make student class inherit from the PersonCL class (with extends)
class StudentCL extends PersonCL {
  //still need a constructor that receives the same params as the parent class
  constructor(fullName, birthYear, course) {
    //with the super function we basically call the constructor function of the parent class and pass in the params from the parent constructor function
    //Always needs to happen first! Creates the this keyword
    super(fullName, birthYear);
    this.course = course; // we are adding to the student class ontop of whats already inherited from the PersonCl class
  }

  introduce() {
    console.log(`My name is ${this.fullName} and I study ${this.course}`);
  }

  //Student specific calcAge function
  calcAge() {
    console.log(
      `I'm ${
        2022 - this.birthYear
      } years old, but as a student I feel more like ${
        2022 - this.birthYear + 10
      } years old`
    );
  }
}

const tim = new StudentCL('Tim Tom', 2000, 'Computer Science'); //even without constructor this would work because of the link to the parent class PersonCl
tim.introduce();
tim.calcAge();

//Lesson 221 Inheritance between classes: Object.create
const job = Object.create(PersonProto);

//Student proto inherits from the prototype PersonProto
const StudentProto = Object.create(PersonProto);
StudentProto.init = function (firstName, birthYear, course) {
  PersonProto.init.call(this, firstName, birthYear);
  this.course = course;
};

StudentProto.introduce = function () {
  console.log(`My name is ${this.firstName} and I study ${this.course}`);
};

const daan = Object.create(StudentProto);
daan.init('Daan', 1996, 'Computer Science');
daan.introduce();
daan.calcAge();

//Lesson 222

//Lesson 223 Encapsulation: protected properties
//JS does not yet support real data privacy and encapsulation but there is a proposal under way to add truly private class fields and methods so in this lecture we fake it
// _movements is not truly private but protected (team knows not supposed to be touched)

//Lesson 224 Encapsulation: Private class fields and methods
// 1. Public fields
// 2. Private fields
// 3. Public methods
// 4. Private methods
// 5. There is also the static version

class Account {
  // 1. public fields (instances) ferencable with this keyword
  locale = navigator.language;

  // 2. private fields (with #) available on the instances themselves not on a prototype
  #movements = [];
  #pin; //cannot define a private field inside a contructor so empty one before

  constructor(owner, currency, pin) {
    this.owner = owner;
    this.currency = currency;
    this.#pin = pin;
    // this._movements = []; //movements is an empty array //Made into public field
    // this.locale = navigator.languague; //Made into public field

    console.log(`Thanks for opening a new account, ${owner}`);
  }

  //3. Public methods
  //public interface of our objects
  getMovements() {
    return this.#movements;
  }

  _approveLoan(value) {
    return true;
  }

  deposit(value) {
    this.#movements.push(value);
    return this; //This makes the method chainable because it returns the instance on which the chain is called
  }

  withdraw(value) {
    this.deposit(-value);
    return this; //This makes the method chainable because it returns the instance on which the chain is called
  }

  //only available on the class itself not on all instances
  static helper() {
    console.log('Helper');
  }

  requestLoan(value) {
    if (this._approveLoan(value)) {
      this.deposit(value);
      console.log(`Loan approved`);
      return this; //This makes the method chainable because it returns the instance on which the chain is called
    }
  }

  //4. Private methods (not supported yet)
  //   #approveLoan(value) {
  //     return true;
  //   }
}

const acc1 = new Account('Theron', 'EUR', 8888);
console.log(acc1);

//Only google chrome supports private fields atm
// acc1._movements.push(250);
// acc1._movements.push(-140);
acc1.deposit(250);
acc1.withdraw(140);
console.log(acc1);
console.log(acc1.getMovements());

//this you want to make private
// console.log(acc1.#pin);
acc1.requestLoan(1000);
acc1._approveLoan(1000); // should be internal method to approve not a public one like the others

//syntax error we cant acces the variable outside of the location of the private fields
// console.log(acc1.#movements);
// console.log(acc1.#pin);
// acc1.#approveLoan(1000); // seen as a field not a method yet (private methods not yet supported)

//to see data encapsulation follow the next lectures. To see how we can make certain public interfaces not public

//5. static functions (only work on the class itself not on instances)
Account.helper();

//lesson 225 Chaining methods
acc1.deposit(300).deposit(500).withdraw(35).requestLoan(25000).withdraw(4000);
console.log(acc1.getMovements());

// =======================================
// ========= Coding challenge #4 =========
// =======================================

class EVCLASS extends VehicleCL {
  #charge;

  constructor(make, speed, charge) {
    super(make, speed);
    this.#charge = charge;
  }

  chargeBattery(chargeTo) {
    this.#charge = chargeTo;
    console.log(
      `The ${this.make} is going at ${this.speed} km/h and has the ${this.charge}% battery life`
    );
    return this;
  }

  accelerate() {
    this.speed += 20;
    this.#charge--;
    console.log(
      `The ${this.make} is going at ${this.speed} km/h and has the ${
        this.#charge
      }% battery life`
    );
    return this;
  }

  brake() {
    this.speed -= 20;
    this.#charge += 0.5;
    console.log(
      `The ${this.make} is going at ${this.speed} km/h and has the ${
        this.#charge
      }% battery life`
    );
    return this;
  }
}

const cybertruck = new EVCLASS('Cybertruck', 120, 23);
console.log(cybertruck);

cybertruck.chargeBattery(90);
console.log(cybertruck, 'Chargedbattery');
cybertruck.accelerate();
console.log(cybertruck, 'Accelrate');
cybertruck.brake();
console.log(cybertruck, 'Brake');
cybertruck.chargeBattery(10).brake().brake().brake().accelerate();
console.log(cybertruck, 'Chained methods result');

console.log(cybertruck.speedUS);
