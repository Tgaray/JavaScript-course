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

//mixing a default export (add) with a regular export (cart)
//The cart array is empty but as it is a live connection the values get added (so exact same object behind the scenes)
import add, { cart } from './shoppingCart.js';
add('pizza', 2);
add('apples', 2);
add('bananas', 2);

console.log(cart);

// //Lesson 273 - Top level await
// //As seen you can use await without creating an async function
// const res = await fetch('https://jsonplaceholder.typicode.com/posts');
// const data = await res.json();
// console.log(data);
// //However these top leve awaits block the execution of the entire module now (can be seen in slow 3G network set it that way in browser)
// console.log('Something');
// //So use with caution!!

const getLastPost = async function () {
  const res = await fetch('https://jsonplaceholder.typicode.com/posts');
  const data = await res.json();
  console.log(data);

  return { title: data.at(-1).title, text: data.at(-1).body };
};

// //calling an async function will always return a promise not an object (data)
// const lastPost = getLastPost();
// console.log(lastPost);
// //to solve for this we just call the promise like before (however not very clean so lets use top level await)
// // lastPost.then(last => console.log(last));
// //top level await version
// const lastPost2 = await getLastPost();
// console.log(lastPost2);

//When one module importas a module with a top level await the importing module will wait for the imported module to finish the blocking code
//Lets add some blocking code to the shoppingCart.js module (line 5)

// //Lesson 274 - The module pattern (the main goals is to encapsulate functionality / to have private data / and to expose a public API)
// //The best way to do this is by simply using functions (because give us private data by default and allow us to return values which can become our API)
// //IIFE in this case immediately invoked function expression (so we don't have to call it separately and only once), all the following data is private because it is in the function
// const shoppingCart2 = (function () {
//   const cart = [];
//   const shippingCost = 10;
//   const totalPrice = 237;
//   const totalQuantity = 13;

//   const addToCart = function (product, quantity) {
//     cart.push({ product, quantity });
//     console.log(
//       `${quantity} ${product} added to cart (shipping costs is ${shippingCost})`
//     );
//   };
//   const orderStock = function (product, quantity) {
//     cart.push({ product, quantity });
//     console.log(`${quantity} ${product} ordered from supplier`);
//   };

//   //Public API stuff we want to make public in the return
//   return {
//     addToCart,
//     cart,
//     totalPrice,
//     totalQuantity,
//   };
// })();

// shoppingCart2.addToCart('apple', 4);
// shoppingCart2.addToCart('pizza', 2);
// //We only exported some of the function this we can see:
// console.log(shoppingCart2);
// //But we cannot see the private parts :P
// console.log(shoppingCart2.shippingCost);
// //Due to closures we can still access all the publicly available data from the "birth" of the function
// //Relook at closures lecture

//Lesson 275 CommonJS modules

// //Export
// export.addToCart function (product, quantity) {
//     cart.push({ product, quantity });
//     console.log(
//       `${quantity} ${product} added to cart (shipping costs is ${shippingCost})`
//     );
//   };

// //Import
// const {addToCart} = require('./shoppingCart.js');
// //Hopefull in the long run ES6 will replace this

// //It's a default export but you can use the same name aswell
// import cloneDeep from '/node_modules/lodash-es/cloneDeep.js';
//In module bundling parcel will automatically choose the files that are needed so you dont have to type an antire path as above
import cloneDeep from 'lodash-es';

//Deeply nested object
const state = {
  cart: [
    { product: 'bread', quantity: 5 },
    { product: 'pizza', quantity: 5 },
  ],
  user: { loggedIn: true },
};

//Empty object and merge that with the state (using Lodash is a good idea because manually assigning a deep clone is a lot of work)
const stateClone = Object.assign({}, state);
state.user.loggedIn = false;
console.log(stateClone);

//Clonedeep version from LoDash
const stateDeepClone = cloneDeep(state); //This shows false because we copy it after we changed the value (move this just a line after the assign on line 131 and it will be true)
console.log(stateDeepClone);

if (module.hot) {
  module.hot.accept();
}
