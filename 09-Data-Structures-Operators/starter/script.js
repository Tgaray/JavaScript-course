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
  //Passing in one argument (an object) and splitting the properties of the object up in their seperate property value pairs
  orderDelivery: function ({
    starterIndex = 1,
    mainIndex = 0,
    time = '20:00',
    address,
  }) {
    console.log(
      `Order received ${this.starterMenu[starterIndex]} and ${this.mainMenu[mainIndex]} will be delivered to ${address} at ${time}`
    );
  },

  orderPasta: function (ing1, ing2, ing3) {
    console.log(
      `Here is your delicious pasta with ${ing1}, ${ing2} and ${ing3}`
    );
  },

  orderPizza: function (mainIngredient, ...otherIngredients) {
    console.log(mainIngredient);
    console.log(otherIngredients);
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

//110 Coding Challenge #1

/* 
// 109 Logical assignment operator
const rest1 = {
  name: 'Capri',
  numGuests: 20,
};

const rest2 = {
  name: 'La Piazza',
  owner: 'Giovanni Rossi',
};

//Not short circuited
//rest1.numGuests = rest2.numGuests || 10;
//Did short circuit because, no numGuests
//rest2.numGuests = rest1.numGuests || 10;

//Same thing but now with logical assignment operator
// rest1.numGuests ||= 10;
// rest2.numGuests ||= 10;

//Nullish assignment operator (assign a value if the value null or  undefined)
rest1.numGuests ??= 10;
rest2.numGuests ??= 10;

//Logical and operator (rest2.owner is truthy in and it goes for falsy)
// rest1.owner = rest1.owner && '<ANONYMOUS';
// rest2.owner = rest2.owner && '<ANONYMOUS';

//Shorter way of writing the above
rest1.owner &&= '<ANONYMOUS';
rest2.owner &&= '<ANONYMOUS';

console.log(rest1);
console.log(rest2);
*/

/* 
//Lesson 108 Nullish Coalescing Operator

restaurant.numGuests = 0;
const guests2 = restaurant.numGuests || 10;
console.log(guests2);

//Nullish: null and undefined (not 0 or '')
//0 and '' are in thise case truthy values
const guestCorrect = restaurant.numGuests ?? 10;
console.log(guestCorrect);
 */

/* 
//Lesson 107 Short circuiting && and ||

//Logical operators can use any datatype and can return any datatype, and they do a short circuit evaluation
//If the first value is a truthy value it will return that
console.log(3 || 'Theron');
console.log('' || 'Theron');
console.log(true || 0);
console.log(undefined || null);
console.log(undefined || 0 || '' || 'Hello' || 23 || null);

//more practicle example
const guest1 = restaurant.numGuests ? restaurant.numGuests : 10;
console.log(guest1);

//restaurant.numGuests = 23;
const guests2 = restaurant.numGuests || 10;
console.log(guests2);

//Short circuiting AND operator (with a truthy the last value is logged)
console.log('--- AND ---');
console.log(0 && 'Theron');
console.log(7 && 'Theron');
console.log('Hello' && 23 && null && 'Theron');
if (restaurant.orderPizza) {
  restaurant.orderPizza('Mushrooms', 'Spinach');
}
restaurant.orderPizza && restaurant.orderPizza('Mushrooms', 'Spinach');

 */
/* 
//Lesson 106 Rest operator

//1) Destructuring

//SPREAD because ... of the right side of assignment = operator
const arr = [1, 2, ...[3, 4]];
console.log(arr);

//REST because on the left side of the assignment = operator
//CALLED Rest of the elements not used in the restructuring assignment
const [a, b, ...others] = [1, 2, 3, 4, 5];
console.log(a, b, others);

//The rest has to be the last element (otherwise unclear until when it will have to work), only one per restructuring possible
const [pizza, , risotto, ...otherfood] = [
  ...restaurant.mainMenu,
  ...restaurant.starterMenu,
];
console.log(pizza, risotto, otherfood);

//Opening hours
const { sat, ...weekdays } = restaurant.openingHours;
console.log(weekdays);

//2) Functions res pattern adds the rest
const add = function (...numbers) {
  let sum = 0;
  for (let i = 0; i < numbers.length; i++) {
    sum += numbers[i];
  }
  console.log(sum);
};
add(2, 4);
add(1, 3, 5, 6);
add(5, 3, 2, 34, 1, 102);
const x = [23, 5, 7];
//packing the values into an array that we pass on to the function
add(...x);

//Function with parameters with resting as much parameters as we want to
restaurant.orderPizza(
  'Mushrooms',
  'Tomato sauce',
  'Garlic',
  'Union',
  'Cheese',
  'Flower',
  'Dough'
);
//Only one parameter, this one will not pass on the rest parameter because there are no other parameters
restaurant.orderPizza('Mushrooms');
*/

/* 
//Lesson 105 The spread operator

//Usually to add to an array
const arr = [7, 8, 9];
const badNewArr = [1, 2, arr[0], arr[1], arr[2]];
console.log(badNewArr);

//Adding with a spread array is much easier (since ES6), basically taking out all the elements in the array and adding them without having to handwrite them all
const goodNewArr = [1, 2, ...arr];
console.log(goodNewArr);

//also able to pass as arguments for example:
//This is good if we need the elements of an array individually
console.log(...goodNewArr);

//More useful example, add a food item to the mainmenu of the restaurant object, this will be a completely new array
const newMenu = [...restaurant.mainMenu, 'Gnocci'];
console.log(newMenu);

//Use case shallow copies
const mainMenuCopy = [...restaurant.mainMenu];
console.log(mainMenuCopy);

//Mergue two arrays together
const fullMenu = [...restaurant.mainMenu, ...restaurant.starterMenu];
console.log(fullMenu);

//Actually spread operators work in iterables (arrays, strings, maps, sets but not objects)
const string = 'Theron';
const letters = [...string, ' ', 'G.'];
console.log(letters);
console.log(...string);

//An example of passing a spread in a function as parameters
const ingredients = ['Basilicum', 'Balsamico', 'Tomato sauce'];
restaurant.orderPasta(...ingredients);

//Escaping the apostrof with \ so it does not become the end of the string (prettier makes the single into a double quote so the single quote is escaped)
const ingredientsCustomer = [
  prompt("Let's make pasta! Ingredient 1?"),
  prompt('Ingredient 2?'),
  prompt('Ingredient 3?'),
];
console.log(ingredientsCustomer);
restaurant.orderPasta(...ingredientsCustomer);

//Now also works with objects since ES2018 even though objects are not iterables
//Real world example
const newRestaurant = { foundedIn: 1990, ...restaurant, founder: 'Guiseppe' };
console.log(newRestaurant);

//Shallow copy of an object
const restaurantCopy = { ...restaurant };
restaurantCopy.name = 'Ristorante Roma';
console.log(restaurantCopy.name);
console.log(restaurant.name);
*/

/* 
//Lesson 104 Destructuring Objects

//Calling a function and passing in an object with options so we can destructure with the arguments in the function right away. look at orderDelivery function.
restaurant.orderDelivery({
  time: '22:30',
  address: 'Via Del Sole, 21',
  mainIndex: 2,
  starterIndex: 2,
});
//Take the default values already filled in behind the arguments if they are not present in the function call
restaurant.orderDelivery({
  address: 'Via Del Sole, 21',
  starterIndex: 2,
});

//create three brand new values based on the restaurant object
const { name, openingHours, categories } = restaurant;
console.log(name, openingHours, categories);

//Changing the variable names, especially useful when dealing with third party data
const {
  name: restaurantName,
  openingHours: hours,
  categories: tags,
} = restaurant;
console.log(restaurantName, openingHours, tags);

//Default values
//example of setting a default value in this case an empty array, useful when you dont know what the data looks like
const { menu = [], starterMenu: starters = [] } = restaurant;
console.log(menu, starters);

//Mutating variables
let a = 111;
let b = 999;
const obj = { a: 23, b: 7, c: 14 };
//for an object a destructuring assignment to mutate variables has to be wrapped in ()
({ a, b } = obj);
console.log(a, b);

//Now mutating for nested objects
const {
  fri: { open, close },
} = openingHours;
console.log(open, close);

//Reassigning values
const {
  sat: { open: o, close: c },
} = openingHours;
console.log(o, c);

 */
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
