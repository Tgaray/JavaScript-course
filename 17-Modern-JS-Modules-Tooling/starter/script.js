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

//calling an async function will always return a promise not an object (data)
const lastPost = getLastPost();
console.log(lastPost);
//to solve for this we just call the promise like before (however not very clean so lets use top level await)
// lastPost.then(last => console.log(last));
//top level await version
const lastPost2 = await getLastPost();
console.log(lastPost2);

//When one module importas a module with a top level await the importing module will wait for the imported module to finish the blocking code
//Lets add some blocking code to the shoppingCart.js module (line 5)
