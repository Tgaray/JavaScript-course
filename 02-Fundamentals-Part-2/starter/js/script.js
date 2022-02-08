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

/* ===== CODING CHALLENGE #2 ===== */
/* ===== INTRODUCTION TO OBJECTS ===== */
/* ===== DOT VS. BRACKET NOTATION ===== */
/* ===== OBJECT METHODS ===== */
/* ===== CODING CHALLENGE #3 ===== */
/* ===== ITERATION: THE FOR LOOP ===== */
/* ===== LOOPING ARRAYS, BREAKING AND CONTINUING ===== */
/* ===== LOOPING BACKWARDS AND LOOPS IN LOOPS ===== */
/* ===== THE WHILE LOOP ===== */
/* ===== CODING CHALLENGE #4 ===== */


