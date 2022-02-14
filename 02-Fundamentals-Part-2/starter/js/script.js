'use strict';

/* ===== ACTIVATING STRICT MODE ===== */

/*
'use strict'; // to use strict we have to define this at the beginning of js file, well see failures visible errors otherwise kept silent

let hasDriversLicense = false;
const passTest = true;

if (passTest) hasDriverLicense = true;
if (hasDriversLicense) console.log('I can drive :)');

const interface = 'audio'; // this is a reserved term for future use in case JS uses it later on
const private = 'private'; // this is a reserved term for future use in case JS uses it later on
 */

/* ===== FUNCTIONS ===== */

/*
function logger() {
    console.log('My name is Theron')
}

// calling / running / invoking function
logger();
logger();
logger();

function fruitProcessor(apples, oranges) {
    console.log(apples, oranges);
    const juice = `Juice with ${apples} apples and ${oranges} oranges.`;
    return juice;
}

const appleOrangeJuice = fruitProcessor(4, 5);
console.log(appleOrangeJuice);
console.log(fruitProcessor(2, 7));

 */

/* ===== FUNCTION DECLARATIONS VS EXPRESSIONS ===== */

/*
//function declarations
//in orange the parameter / placeholder that passes the argument into the function
function calcAge1(birthYear) {
    return 2022 - birthYear;
}

// in purple the argument
console.log(calcAge1(1990));
const age1 = calcAge1(1994);
console.log(age1);

//Function expression (creates a value in a variable)
//Function without a name is an 'anonymous function'
const calcAge2 = function (birthYear) {
    return 2022 - birthYear;
}

console.log(calcAge2(1988));
const age2 = calcAge1(2015);
console.log(age1, age2);

//he second function is an expression you can log the function itself (its created as a value)
console.log(calcAge2);

 */

/* ===== ARROW FUNCTIONS ===== */

/*
//Fucntion expression
const calcAge2 = function (birthYear) {
    return 2022 - birthYear;
}

//Arrow function (still a function expression easier and faster to write), gets a bit more complex with more parameters and more code.
const calcAge3 = birthYear => 2022 - birthYear;
//this gives the value of the function (i.e. the entire function that is made as a value)
console.log(calcAge3);

const age3 = calcAge3(1990);
console.log(age3);

// if you need more than one line of code in the function add the {} and wrap the parameter but with multiple parameters use (param, param)
const yearsUntilRetirement = (birthYear, firstName) => {
    const age = 2022 - birthYear;
    const retirement = 67 - age;
    return `${firstName} retires in ${retirement} years`;
}
console.log(yearsUntilRetirement(1990, "Theron"));
console.log(yearsUntilRetirement(1994, "Yietta"));
console.log(yearsUntilRetirement);

 */

/* ===== FUNCTIONS CALLING OTHER FUNCTIONS ===== */

//Dont repeat yourself principle or singular use principle. The cutting of the fruit which is a different function than processing the fruit (lets say for 10 different fruits) only has to be changed in one location instead of multiple if we wrote the * in the fruitprocessing function for each fruit that could be put in.
/*
function cutFruitPieces(fruit) {
    return fruit * 4;
}

function fruitProcessor(apples, oranges) {
    const applePieces = cutFruitPieces(apples);
    const orangePieces = cutFruitPieces(oranges);
    console.log(apples, oranges);
    const juice = `Juice with ${applePieces} pieces of apple and ${orangePieces} pieces of orange.`;
    return juice;
}

console.log(fruitProcessor(2, 3)); */

/* ===== REVIEWING FUNCTIONS ===== */

/*
//parameters names can be the same, no problem, basically a local variable for each function
const calcAge1 = function (birthYear) {
    return 2022 - birthYear;
}

const yearsUntilRetirement1 = function (birthYear, firstName) {
    const age = calcAge1(birthYear);
    const retirement = 67 - age;
    return `${firstName} retires in ${retirement} years`;
}

console.log(yearsUntilRetirement1(1990, "Theron"));
console.log(yearsUntilRetirement1(1994, "Yietta"));

//Different param names works the exact same way, they are placeholders for the values.
const calcAge2 = function (year) {
    return 2022 - year;
}

const yearsUntilRetirement2 = function (birthYear, firstName) {
    const age = calcAge2(birthYear);
    const retirement = 67 - age;
    return `${firstName} retires in ${retirement} years`;
}

console.log(yearsUntilRetirement2(1990, "Theron"));
console.log(yearsUntilRetirement2(1994, "Yietta"));

//Make a decision to return something else if the person is retired already - negative number
const calcAge3 = function (year) {
    return 2022 - year;
}

const yearsUntilRetirement3 = function (birthYear, firstName) {
    const age = calcAge3(birthYear);
    const retirement = 67 - age;

    //after a return the function exits so no code after that is run code after a return is ignored (alt + arrow up to move line up or down arrow for down)
    if (retirement >= 0) {
        console.log("damn");
        return `${firstName} retires in ${retirement} years`;
    } else {
        console.log("how nice");
        return `${firstName} is already retired`;
    }

    //return `${firstName} retires in ${retirement} years`;
}

console.log(yearsUntilRetirement3(1990, "Theron"));
console.log(yearsUntilRetirement3(1994, "Yietta"));
console.log(yearsUntilRetirement3(1957, "Pap"));
console.log(yearsUntilRetirement3(1930, "Opa"));
*/

/* ===== CODING CHALLENGE #1 ===== */

// MY FROM SCRATCH SOLUTION WITH ARRAYS FOR THE DATA
//Testdata 1
// const scoreKoalas = [44, 23, 71].reduce((partialSum, a) => partialSum + a, 0);
// const scorePandas = [65, 54, 49].reduce((partialSum, a) => partialSum + a, 0);

//Testdata 2
/*
const scoreKoalas = [85, 54, 41].reduce((partialSum, a) => partialSum + a, 0);
const scorePandas = [23, 34, 27].reduce((partialSum, a) => partialSum + a, 0);

const calcAverage = (score) => {
    let average = score / 3;
    return average;
}

const averageKoalas = calcAverage(scoreKoalas);
const averagePandas = calcAverage(scorePandas);
console.log(averageKoalas, averagePandas);

function checkWinner(avgKoalas, avgPandas) {
    if (avgKoalas > avgPandas) {
        return `Koalas win with ${avgKoalas} points`
    } else {
        return `Pandas win with ${avgPandas} points`
    }
}

console.log(checkWinner(averageKoalas, averagePandas));
*/

/*
const calcAverage = (a, b, c) => (a + b + c) / 3;

let scoreK = calcAverage(34, 23, 71);
let scoreP = calcAverage(65, 54, 49);

//Met een array
let scoreD = [23, 23, 55];
console.log(calcAverage(scoreD[0], scoreD[1], scoreD[2]));


console.log(scoreK, scoreP);

const checkWinnerChickenDinner = function (avgK, avgP) {
    if (avgK >= 2 * avgP) {
        return `Chicken dinner for the Koalas ${avgK} vs Pandas ${avgP}`
    } else if (avgP >= 2 * avgK) {
        return `Chicken dinner for the Pandas ${avgP} vs Koalas ${avgK}`
    } else {
        return `Unfortunately we have no winner`
    }
};

console.log(checkWinnerChickenDinner(scoreK, scoreP));
console.log(checkWinnerChickenDinner(612, 254));
 */

/* ===== INTRODUCTION TO ARRAYS ===== */

/*
//An array is not a primitive value so you can change the array even with const but not the entire array in one go.
const friends = ['Levy', 'Nibras', 'Dimitri'];
console.log(friends);

const years = new Array(1990, 1991, 1992, 1993);
console.log(friends[2], years[3]);
console.log(friends.length);

//in thise case we want the last value so we have to subtract one from the index to start at 0
console.log(friends[friends.length - 1]);

//using [] to add a friend at a specific location
friends[2] = 'Job';
console.log(friends);

//you can add all sorts of data to the array
const firstName = 'Theron';
const testArray = [firstName, "Garay", 2022 - 1990, "Teacher", friends];
console.log(testArray);

//Excersize
const calcAge2 = function (birthYear) {
    return 2022 - birthYear;
}

//calcAge2(years); would not work because we are passing on an array not the values
const age1 = calcAge2(years[0]);
const age2 = calcAge2(years[1]);
const age3 = calcAge2(years[years.length - 1]);
console.log(age1, age2, age3);

const ages = [calcAge2(years[0]), calcAge2(years[1]), calcAge2(years[years.length - 1])];
console.log(ages);
 */

/* ===== BASIC ARRAY OPERATIONS ===== */

/*
const friends = ['Levy', 'Nibras', 'Dimitri'];
//add to end
friends.push('Job');
const newLength = friends.push('Nathan');
//add to beginning
friends.unshift('Stacho');
console.log(friends);
console.log(newLength);

//remove elements
//pop remove last element
friends.pop();
console.log(friends);
const popped = friends.pop();
console.log(friends);
//popped returns which friend was last removed
console.log(popped);
//to remove the first value
friends.shift();
console.log(friends);

//request the index
console.log(friends.indexOf('Dimitri'));
console.log(friends.indexOf('Bob'));
console.log(friends.includes('Levy'));
console.log(friends.includes('Bob'));

if (friends.includes('Levy')) {
    console.log('Levy staat in de lijst');
}

 */
/* ===== CODING CHALLENGE #2 ===== */

/*
const calcTip = function (billAmount) {
    let tip;
    billAmount >= 50 && billAmount <= 300 ? tip = billAmount * 0.15 : tip = billAmount * 0.20;
    console.log(`the billAmount is ${billAmount} and the tip is ${tip}, which is ${tip / billAmount * 100}% of the price of ${billAmount}`);
    return tip;
}

const bills = [125, 555, 44];
const tips = [calcTip(bills[0]), calcTip(bills[1]), calcTip(bills[2])];
const totals = [bills[0] + tips[0], bills[1] + tips[1], bills[2] + tips[2]];
console.log(tips);
console.log(totals);
 */

/* ===== INTRODUCTION TO OBJECTS ===== */

/*
// Array there is no way of giving these elements a name
const testArray = [
    'Theron',
    'Garay',
    2022 - 1990,
    'Teacher',
    ['Levy', 'Job', 'Nibras']
];

//Object literal syntax, literally writing an object, order of properties does not matter like in an array
// In objects you can actually give names in key value pairs within {}
// The below object has five properties we can call by name
const Theron = {
    firstName: 'Theron',
    lastName: 'Garay',
    age: 2022 - 1990,
    job: 'Teacher',
    friends: ['Levy', 'Job', 'Nibras']
};
//Use arrays for mor structured data 1, 2, 3 and objects for less structured data
*/

/* ===== DOT VS. BRACKET NOTATION ===== */

//How to retreive and also how to change data

/*
const Theron = {
    firstName: 'Theron',
    lastName: 'Garay',
    age: 2022 - 1990,
    job: 'Teacher',
    friends: ['Levy', 'Job', 'Nibras']
};

console.log(Theron);
//To retreive specific data . notation
console.log(Theron.age);
//Bracket notation to retreive data []
console.log(Theron['age']);

//When you first need to compute the property name use [] no compute then . is fine
const nameKey = 'Name';
console.log(Theron[`first${nameKey}`]);
console.log(Theron[`last${nameKey}`]);

//This does not work with the dot notation, you need the brackets
//console.log(Theron.`last${nameKey}`);

//Example to show why the brackets are useful for certain cases
const interestedIn = prompt('What do you want to know about Theron? choose between firstName, lastName, age, job and friends.')
console.log(Theron.interestedIn); // does not work Theron. does not have a property interestedIn
console.log(Theron[interestedIn]); // does work Theron[interestedIn] because it takes the value of the variable not the name

//undefined is a falsy value letst test if the object has properties
if (Theron[interestedIn]) {
    console.log(Theron[interestedIn]);
} else {
    console.log('Wrong request! Choose between firstName, lastName, age, job and friends.')
}

//adding properties with both . and []
Theron.location = 'Eindhoven';
Theron['social'] = 'Twitter';
console.log(Theron);

//Look at presedence https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Operator_Precedence
//So first the item with the dot and then the bracket because they have the same presedence #18
console.log(`${Theron.firstName} has ${Theron.friends.length} friends, and his best friend is ${Theron.friends[0]}.`);
 */

/* ===== OBJECT METHODS ===== */

/*
const Theron = {
    firstName: 'Theron',
    lastName: 'Garay',
    birthYear: 1990,
    job: 'Teacher',
    friends: ['Levy', 'Job', 'Nibras'],
    hasDriversLicense: true,

    //function/methods in an object as an expression is a value that can be part of an object
    // calcAge: function (birthYear) {
    //     return 2022 - birthYear;
    // }

    //Use the this keyword/variable so that you can use the corresponding value this propertie already has
    //The Theron object is calling 'this' (calcAge) function
    //this (Theron) birthYear (1990)
    // calcAge: function () {
    //     //console.log(this);
    //     return 2022 - this.birthYear;
    // }

    //Creating a new propterty where we store the value of this function
    calcAge: function () {
        //new age property
        this.age = 2022 - this.birthYear;
        //for heavier calculations its better to store the value then to run the function multiple times for different calls
        return this.age;
    },

    getSummary: function () {
        return `${this.firstName} is a ${this.calcAge()}-year old ${this.job}, and he has ${this.hasDriversLicense ? "a" : "no"} drivers license.`;
    }
};

console.log(Theron.calcAge());
console.log(Theron.age);
console.log(Theron['calcAge'](1990));

//Challenge
//'Theron is a 32-year old teacher, and he has a/no drivers license'
console.log(Theron.getSummary());
//Arrays are also objects and in this lecture we created our on methods on our own objects.
 */

/* ===== CODING CHALLENGE #3 ===== */

/*
const markMiller = {
    fullName: 'Mark Miller',
    mass: 78,
    height: 1.69,
    calcBMI: function () {
        // adding the bmi property
        this.bmi = this.mass / (this.height * this.height);
        return this.bmi;
    }
}

const johnSmith = {
    fullName: 'John Smith',
    mass: 92,
    height: 1.95,
    calcBMI: function () {
        //adding the bmi property
        this.bmi = this.mass / (this.height * this.height);
        return this.bmi;
    }
}

console.log(johnSmith.calcBMI());
console.log(markMiller.calcBMI());

//Option 1
console.log(`${markMiller.calcBMI() > johnSmith.calcBMI() ? `${markMiller.fullName}'s BMI ${markMiller.calcBMI()} is higher than ${johnSmith.fullName}'s BMI ${johnSmith.calcBMI()}.'` : `${johnSmith.fullName}'s BMI ${johnSmith.calcBMI()} is higher than ${markMiller.fullName}'s BMI ${markMiller.calcBMI()}.'`}`);

//Option 2
console.log(`${markMiller.bmi > johnSmith.bmi ? `${markMiller.fullName}'s BMI ${markMiller.bmi} is higher than ${johnSmith.fullName}'s BMI ${johnSmith.bmi}.'` : `${johnSmith.fullName}'s BMI ${johnSmith.bmi} is higher than ${markMiller.fullName}'s BMI ${markMiller.bmi}.'`}`);

//Option 3
if (markMiller.bmi > johnSmith.bmi) {
    console.log(`${markMiller.fullName}'s BMI ${markMiller.bmi} is higher than ${johnSmith.fullName}'s BMI ${johnSmith.bmi}.'`);
} else {
    console.log(`${johnSmith.fullName}'s BMI ${johnSmith.bmi} is higher than ${markMiller.fullName}'s BMI ${markMiller.bmi}.'`);
}
 */

/* ===== ITERATION: THE FOR LOOP ===== */

/*
console.log('lifting weights repetition 1')
console.log('lifting weights repetition 2')
console.log('lifting weights repetition 3')
console.log('lifting weights repetition 4')
console.log('lifting weights repetition 5')
console.log('lifting weights repetition 6')
console.log('lifting weights repetition 7')
console.log('lifting weights repetition 8')
console.log('lifting weights repetition 9')
console.log('lifting weights repetition 10')
 */

//for loop for x amount of repetitions
/*
for (let rep = 1; rep <= 10; rep++) {
    console.log(`'lifting weights repetition ${rep}'`)
}
 */

/* ===== LOOPING ARRAYS, BREAKING AND CONTINUING ===== */

/*
const theron = [
    'Theron',
    'Garay',
    2022 - 1990,
    'Teacher',
    ['Levy', 'Job', 'Nibras'],
    true
];

const types = [];

for (let i = 0; i < theron.length; i++) {
    //Reading from Jonas array
    console.log(`The #${i} value ${theron[0]} array is ${theron[i]} and is a ${typeof theron[i]}.`);

    //Filling the types array
    //types[i] = typeof theron[i];
    types.push(typeof theron[i]);
}
console.log(types);

const years = [1990, 2021, 2022, 2001, 1994];
const ages = [];

for (let i = 0; i < years.length; i++) {
    ages.push(2022 - years[i]);

}
console.log(ages);

//continue, statement to exit current iteration of loop, in the code it continues only with strings
console.log('=== ONLY STRINGS ===');
for (let i = 0; i < theron.length; i++) {
    if (typeof theron[i] !== 'string') continue;
    console.log(theron[i], typeof theron[i]);
}

//break, statement to terminate the entire loop' break when the first number is found and stop the loop
console.log('=== BREAK WITH NUMBER ===');
for (let i = 0; i < theron.length; i++) {
    if (typeof theron[i] === 'number') break;
    console.log(theron[i], typeof theron[i]);
}
 */

/* ===== LOOPING BACKWARDS AND LOOPS IN LOOPS ===== */

/*
const theron = [
    'Theron',
    'Garay',
    2022 - 1990,
    'Teacher',
    ['Levy', 'Job', 'Nibras'],
    true
];

//reverse looping
for (let i = theron.length - 1; i >= 0; i--) {
    console.log(i, theron[i]);
}

for (let excersize = 1; excersize <= 3; excersize++) {
    console.log(`'==== START EXCERSIZE ${excersize}'`)
    for (let repetition = 1; repetition <= 5; repetition++) {
        console.log(excersize, `'==== starting excersize ${excersize} and repetition ${repetition}'`)
    }
}
 */

/* ===== THE WHILE LOOP ===== */

//As a reference point the for loop

/* 
for (let rep = 1; rep <= 10; rep++) {
    console.log(`FOR: starting excersize repetition ${rep}`)
}

//starting value
let rep = 1;
//while this condition is true keep running the code
while (rep <= 10) {
    //at the end of the iteration we have to add the counter
    console.log(`WHILE: Lifting weights repetition ${rep}`);
    rep++;
}
 */

/* 
//Create a random number zero to six and make it a whole number not a decimal number (trunc)
let dice = Math.trunc(Math.random() * 6) + 1;
//While loop can be used in more different ways than a for loop it can work without a counter
while (dice !== 6) {
    //this would create an infinite loop so we need an exit still
    console.log(`You rolled ${dice}`);
    // Change the dice value everytime the loop is run
    dice = Math.trunc(Math.random() * 6) + 1;
    if (dice === 6) console.log('Loop is about to end');
}
 */

/* ===== CODING CHALLENGE #4 ===== */

/* 
const bills = [22, 295, 176, 440, 37, 105, 10, 1100, 86, 52];
const tips = [];
const totals = [];


// const calcTip = function (billAmount) {
//     let tip;

//     console.log(`the billAmount is ${billAmount} and the tip is ${tip}, which is ${tip / billAmount * 100}% of the price of ${billAmount}`);
//     return tip;
// }

const calcTip = function (bill) {
    return bill >= 50 && bill <= 300 ? bill * 0.15 : bill * 0.20;
}

for (let i = 0; i < bills.length; i++) {
    //we can use const because in each iteration we will create a new one
    const tip = calcTip(bills[i]);
    tips.push(tip);
    totals.push(tip + bills[i]);
}
console.log(bills, tips, totals);

const calcAverage = function (arr) {
    let sum = 0;
    for (let i = 0; i < arr.length; i++) {
        sum += arr[i];
    }
    return sum / arr.length;
}
console.log(calcAverage([20, 30, 18]));
console.log(calcAverage(totals));
console.log(calcAverage(tips));
 */