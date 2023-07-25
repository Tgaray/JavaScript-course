//Importing module
//modules are executed in strict mode by default
// import { addToCart, totalPrice as price, tq } from './shoppingCart.js'; //the code from the import is executed first

console.log('Importing module');

// //We cant log a variable from the module we have not imported
// //console.log(shippingCost);

// addToCart('Bread', 3);

// console.log(price, tq);

//Creating an object containing everything that is exported from the module that we are importing
// import * as shoppingCart from './shoppingCart.js';
// shoppingCart.addToCart('bread', 5);
// console.log(shoppingCart.totalPrice);
//A module is kind of a public API

//importing the default export, no matter what it's called (we are importing the same module as above but as a default)
// import add, { addToCart, totalPrice, tq } from './shoppingCart.js';
// console.log(addToCart, totalPrice, tq);
// import add './shoppingCart.js';
// add('pizza', 2);
// add('apples', 2);
// add('bananas', 2);

//mixing a default export (add) with a regular one (cart)
//The cart array is empty but as it is a live connection the values get added (so exact same object behind the scenes)
import add, { cart } from './shoppingCart.js';
add('pizza', 2);
add('apples', 2);
add('bananas', 2);

console.log(cart);
