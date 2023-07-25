//Exporting module
//modules are executed in strict mode by default
console.log('Exporting module');

//All top level variables are private within a module
const shippingCost = 10;
export const cart = [];

export const addToCart = function (product, quantity) {
  cart.push({ product, quantity });
  console.log(`${quantity} ${product} added to cart`);
};

const totalPrice = 237;
const totalQuantity = 23;
export { totalPrice, totalQuantity as tq };

//default export
//for example the value outcome of this function
export default function (product, quantity) {
  cart.push({ product, quantity });
  console.log(`${quantity} ${product} added to cart`);
}
