"strict mode";
const budget = Object.freeze([
    {
        value: 250,
        description: "Sold old TV \uD83D\uDCFA",
        user: "jonas"
    },
    {
        value: -45,
        description: "Groceries \uD83E\uDD51",
        user: "jonas"
    },
    {
        value: 3500,
        description: "Monthly salary \uD83D\uDC69‍\uD83D\uDCBB",
        user: "jonas"
    },
    {
        value: 300,
        description: "Freelancing \uD83D\uDC69‍\uD83D\uDCBB",
        user: "jonas"
    },
    {
        value: -1100,
        description: "New iPhone \uD83D\uDCF1",
        user: "jonas"
    },
    {
        value: -20,
        description: "Candy \uD83C\uDF6D",
        user: "matilda"
    },
    {
        value: -125,
        description: "Toys \uD83D\uDE82",
        user: "matilda"
    },
    {
        value: -1800,
        description: "New Laptop \uD83D\uDCBB",
        user: "jonas"
    }
]);
//Making an array or object immutable by using freeze
const spendingLimits = Object.freeze({
    jonas: 1500,
    matilda: 100
});
//Lets see what happens when we try to add a new property to spendingLimits
// spendingLimits.jay = 200;
// console.log(spendingLimits);
const getLimit = (limits, user)=>limits?.[user] ?? 0;
//Pure function without side effects
const addExpense = function(state, limits, value, description, user = "jonas") {
    //new variable for lower case to make a copy of the user and "cleaning it how we want it"
    const cleanUser = user.toLowerCase();
    // const limit = spendingLimits[user] ? spendingLimits[user] : 0;
    //or by using optional chaining and the nullish coalescing operator
    // const limit = spendingLimits?.[user] ?? 0;
    // const limit = getLimit(user);
    return value <= getLimit(limits, cleanUser) ? [
        ...state,
        {
            value: -value,
            description,
            user: cleanUser
        }
    ] : state;
// budget.push({ value: -value, description, user: cleanUser });
};
//Now addexpense will not mutate the original data anymore but if we want to do something with the data we need to store it somewhere, for example in a variable
const newBudget1 = addExpense(budget, spendingLimits, 5, "Ice cream");
console.log(newBudget1);
//if we want to add the previous change along with the next one we need to add it in the function call
const newBudget2 = addExpense(newBudget1, spendingLimits, 10, "Pizza \uD83C\uDF55");
console.log(newBudget2);
const newBudget3 = addExpense(newBudget2, spendingLimits, 100, "Going to movies \uD83C\uDF7F", "Matilda");
console.log(newBudget3);
addExpense(budget, spendingLimits, 200, "Stuff", "Jay");
// const checkExpenses = function (state, limits) {
//   //Make original data immutable using map to create a brand new array
//   return state.map(entry => {
//     return entry.value < -getLimit(limits, entry.user)
//       ? { ...entry, flag: 'limit' }
//       : entry;
//   });
//   // for (const entry of budget)
//   //   if (entry.value < -getLimit(limits, entry.user)) entry.flag = 'limit';
// };
//To make the above function into an arrow function (a pure function that doesn't affect anything outside it's scope) because we create a new array with .map
const checkExpenses = (state, limits)=>state.map((entry)=>entry.value < -getLimit(limits, entry.user) ? {
            ...entry,
            flag: "limit"
        } : entry);
const finalBudget = checkExpenses(newBudget3, spendingLimits);
console.log(finalBudget);
const logBigExpenses = function(state, bigLimit) {
    // let output = '';
    // for (const entry of budget)
    //   output +=
    //     entry.value <= -bigLimit ? `${entry.description.slice(-2)} / ` : '';
    // output = output.slice(0, -2); // Remove last '/ '
    // console.log(output);
    const logBigExpenses = state.filter((entry)=>entry.value <= -bigLimit).map((entry)=>entry.description.slice(-2)).join(" / ");
    //Another way of doing this is:
    // .reduce((str, cur) => `${str} / ${cur.description.slice(-2)}`, '');
    console.log(logBigExpenses); // A console.log like this is also a side effect, but you will always need some side effects how else would we know our code is running
};
//console.log(budget);
logBigExpenses(finalBudget, 500);

//# sourceMappingURL=index.3ec6c1be.js.map
