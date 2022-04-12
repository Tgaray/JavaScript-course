'use strict';

// Data needed for a later exercise
const flights =
  '_Delayed_Departure;fao93766109;txl2133758440;11:25+_Arrival;bru0943384722;fao93766109;11:45+_Delayed_Arrival;hel7439299980;fao93766109;12:05+_Departure;fao93766109;lis2323639855;12:30';

// Data needed for first part of the section
const restaurant = {
  name: 'Classico Italiano',
  location: 'Via Angelo Tavanti 23, Firenze, Italy',
  categories: ['Italian', 'Pizzeria', 'Vegetarian', 'Organic'],
  starterMenu: ['Focaccia', 'Bruschetta', 'Garlic Bread', 'Caprese Salad'],
  mainMenu: ['Pizza', 'Pasta', 'Risotto'],

  order: function (starterIndex, mainIndex) {
    return [this.starterMenu[starterIndex], this.mainMenu[mainIndex]];
  },

  openingHours: {
    thu: {
      open: 12,
      close: 22,
    },
    fri: {
      open: 11,
      close: 23,
    },
    sat: {
      open: 0, // Open 24 hours
      close: 24,
    },
  },
};

//Lesson 103 Destructuring Arrays
/* 
const arr = [2, 3, 4];
const a = arr[0];
const b = arr[1];
const c = arr[2];
console.log(a, b, c);

//destructuring an array
const [x, y, z] = arr;
console.log(x, y, z);
//the originla array is not affected we are just destructuring
console.log(arr);
 */

/* 
//destructuring array from restaurant data, and skip one element
let [main, , secondary] = restaurant.categories;
console.log(main, secondary);

//sometimes you want to change the data like this:
//store the main in the temp var
const temp = main;
//then overwrite main with the secondary value
main = secondary;
//and then store the main in the secondary value to swap the values
secondary = temp;
//the values are swapped
console.log(main, secondary);
 */
/* 
//Switching variables
let [main, , secondary] = restaurant.categories;
console.log(main, secondary);
//array destructuring way of swapping values like above
[main, secondary] = [secondary, main];
console.log(main, secondary);

//call the order function to order something from the startermenu and mainmenu
console.log(restaurant.order(2, 0));
//destructuring the starter and main from the menu
//This is how we retreive two return values from a function
//Creating two variables out of one function call
const [starter, mainCourse] = restaurant.order(2, 0);
console.log(starter, mainCourse);

//How to destructure the case of a nested array
const nested = [2, 4, [5, 6]];
//Grab the number 2 and the 5&6 array within the array
const [i, , j] = nested;
console.log(i, j);
//destructing the nested arrays as to get only the values except the 4 value
const [value1, , [value3, value4]] = nested;
console.log(value1, value3, value4);

//Destructuring with default values in the case of a shorter array
const [p = 1, q = 1, r = 1] = [8, 9];
console.log(p, q, r);
 */
