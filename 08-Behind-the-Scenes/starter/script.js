'use strict';

/* 
const firstName = 'Theron';
calcAge(1990);

function calcAge(birthYear) {
  const age = 2022 - birthYear;

  function printAge() {
    let output = `${firstName} you are the ${age}, born in ${birthYear}`;
    console.log(output);

    if (birthYear >= 1981 && birthYear <= 1996) {
      //the var is accesible outside of the scope (old)s
      var millenial = true;
      //Name definded again but in this lower scope and therefore used here
      const firstName = 'Levy';
      const str = `Oh, you are a millenial, ${firstName}`;
      console.log(str);

      //functions are also block scoped
      function add(a, b) {
        return a + b;
      }

      //Reassigning outer scope variable
      //output = 'NEW OUTPUT!';
    }
    //Var is accesible outside of the if block scope
    console.log(millenial);
    console.log(output);
    //Const + let + functions are not accesible outside of the (if) block scope
    //console.log(str);
    //add(2, 3);
  }
  printAge();

  return age;
}
 */

//These are not accesible because they are not in the global scope
//printAge();
//console.log(age);
//console.log(output);

/* 
//Lesson 95 Hoisting and TDZ in practice
console.log(me);
console.log(job);
console.log(year);

//var is hoisted
var me = 'Theron';
//let and const not hoisted, cant access before initialization (they are in the temporal dead zone TDZ)
let job = 'Teacher';
const year = 1990;

 */
/* 
//Lets try TDZ/Hoisting with functions
console.log(addDecl(4, 5));
console.log(addExpr(4, 5));
console.log(addArrow(4, 5));

function addDecl(a, b) {
  return a + b;
}

const addExpr = function (a, b) {
  return a + b;
};

const addArrow = (a, b) => a + b;

 */
/* 
//Bad example of why to avoid var
if (!numProducts) deleteShoppingCart();

//True because it has 10 so the function should not be executed but because it is hoisted it will be executed even if not declared at the right place. This is risky.
var numProducts = 10;

function deleteShoppingCart() {
  console.log('All products deleted!');
}
 */

//var is the one you can find in the window object (type window click enter in console to see the window object), there you see the var is hoisted and visible as x: 1
var x = 1;
let y = 2;
const z = 3;
//or test it by logging it
console.log(x === window.x);
console.log(y === window.y);
console.log(z === window.z);
