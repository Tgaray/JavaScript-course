/* ===== LESSON VARIABLES ===== */
/*
let country = "Netherlands";
let continent = "Europe";
let population = "17 million";

console.log("I was born in the " + country + " it is a country in " + continent + " that has " + population + " people in it.");


/* ===== LESSON DATA TYPES ===== */
/*
let javascriptIsFun = true;
console.log(javascriptIsFun);
console.log(typeof javascriptIsFun);
console.log(typeof true);
console.log(typeof 1);
console.log(typeof "Ja");
javascriptIsFun = "Hallo i heb een nieuwe waarde en een nieuw data type";
console.log(javascriptIsFun);

const isIsLand = false;
let language;
let population = "17 million";
const country = "the Netherlands";

console.log(isIsLand);
console.log(language);
console.log(population);
console.log(country);

language = "Dutch";
console.log(language);
*/

/* ===== LESSON LET, CONST, VAR ===== */
/*
let age = 30;
age = 31;

const birthYear = 1991;
// birthYear = 1990;

// never use var (old after ES6)
var job = "programmer";
job = "teacher";
*/

/* ===== LESSON OPERATORS ===== */
/*
const now = 2037;
const ageTheron = now - 1990;
const ageYietta = now - 1995;
console.log(ageTheron, ageYietta);

// 2 ** 3 means 2 to the power of 3 = 2 * 2 * 2
console.log(ageTheron * 3 / 10, 2 ** 3);

const firstName = "Theron";
const lastName = "Garay";
console.log(firstName + " " + lastName);

// Assignment operators
let x = 10 + 5; //15
x += 10; //x = x + 10 = 25
x *= 4; // x = x * 4 = 100
x++; // +1
x--; // -1
console.log(x);

// Comparison operators
console.log(ageTheron > ageYietta);// >, <, >=, <=
console.log(ageTheron >= 30);
const isFullAge = ageTheron >= 30;
console.log(now - 1991 > now - 1995); // JS knows to calculate the numbers first before comparing them
*/

/* ===== LESSON OPERATOR PRESEDENCE ===== */
/*
console.log(25 - 10 - 5);

let x, y;
//right to  left presedence because minos has a higher presedence (see mozilla)
x = y = 25 - 10 - 5; //x = y = 10, x = 10
console.log(x, y);

const now = 2021;
const ageTheron = now - 1990;
const ageYietta = now - 1995;

const averageAge = (ageTheron + ageYietta) / 2; //presedence to the calculation in the parenthesis
console.log(ageTheron, ageYietta, averageAge);
*/

/* ===== CHALLENGE #1 ===== */
/*
//const markWeight = 78;
//const markHeight = 1.69;
//const johnWeight = 92;
//const johnHeight = 1.95;
//const bmiMark = markWeight / (markHeight * markHeight);
//console.log(bmiMark);
//const bmiJohn = johnWeight / (johnHeight * johnHeight);
//console.log(bmiJohn);
//const markHigherBMI = bmiMark > bmiJohn;
//console.log(markHigherBMI);

const massMark = 95;
const heightMark = 1.88;
const massJohn = 85;
const heightJohn = 1.76;
const BMIMark = massMark / (heightMark ** 2);
const BMIJohn = massJohn / (heightJohn ** 2);
const markHigherBMI = BMIMark > BMIJohn;
console.log(BMIMark, BMIJohn, markHigherBMI);
*/

/* ===== LESSON STRINGS AND TEMPLATE LITERALS ===== */
/*
const firstName = "Theron";
const job = "Teacher";
const birthYear = "1990";
const year = "2021";

const sentence = "I'm " + firstName + ", a " + (year - birthYear) + " year old " + job + "!";
console.log(sentence);

// `` template literal assembles seperate variables literally
const newSentence = `I'm ${firstName}, a ${year - birthYear} year old ${job}!`;
console.log(newSentence);

console.log(`Just a regular string...`)
console.log('Just a regular string... \n\ This is the rest of the regular \n\ string')

//Now with template literals just enter
console.log(`String
on multiple
lines`);
*/

/* ===== LESSON TAKING DECISIONS IF / ELSE STATEMENTS ===== */
/*
const age = 15;

if (age >= 18) {
    console.log(`Sarah can start taking lessons for her driving license.`)
} else {
    const yearsLeft = 18 - age;
    console.log(`Sarah has ${yearsLeft} years left to start going for her drivers license`)
}

const birthYear = 1990;
// define the variable outside both code blocks in the if else so that it can be assigned at each point otherwise you will get an error.
let century;

if (birthYear <= 2000) {
    let century = 20;
    console.log(`You were born in the ${century}th century`)
} else {
    let century = 21;
    console.log(`You were born in the ${century}st century`)
}
*/

/* ===== CHALLENGE #2 ===== */
/*
const markWeight = 95;
const markHeight = 1.88;
const johnWeight = 110;
const johnHeight = 1.76;

//const markWeight = 78;
//const markHeight = 1.69;
//const johnWeight = 92;
//const johnHeight = 1.95;
const bmiMark = markWeight / (markHeight * markHeight);
console.log(Math.round(bmiMark));
const bmiJohn = johnWeight / (johnHeight * johnHeight);
console.log(Math.round(bmiJohn));

if (bmiMark > bmiJohn) {
    console.log(`Mark's BMI ${Math.round(bmiMark)} is higher than John's BMI ${Math.round(bmiJohn)}.`)
} else {
    console.log(`Mark's BMI ${Math.round(bmiMark)} is lower than John's BMI ${Math.round(bmiJohn)}.`)
}
*/

/* ===== TYPE CONVERSION AND COERCION ===== */

/*
//type conversion
const inputY = "1990";
console.log(Number(inputY), inputY);
console.log(Number(inputY) + 18);
console.log(Number("Jonas"));
console.log(typeof NaN);
console.log(String(23), 23);

//typecoercion + converts the number to a string -, /, *, > to a number
console.log("I am " + 23 + " years old");
console.log("23" - "10" - 3);
console.log("23" * "10");

let n = "1" + 1; // string 11
n = n - 1; // - makes it a number again so -1 is the number 10
console.log(n);
*/

/* ===== TRUTHY AND FALSY VALUES ===== */

// falsy values are not exactly false but they will become false when we try to convert them to a boolean
// falsy values 0, '', undefined, null, NaN and ofc false itself anything else will be true

/*
console.log(Boolean(0));
console.log(Boolean(undefined));
console.log(Boolean(""));
console.log(Boolean("Jonas"));
console.log(Boolean({})); // empty object
console.log(Boolean(1));

const money = 0;
if (money) {
    console.log("Don't spend it all")
} else {
    console.log("You should get a job!");
}

const moMoney = 100;
if (moMoney) {
    console.log("Don't spend it all")
} else {
    console.log("You should get a job!");
}

let moMoMoney;
if (moMoMoney) {
    console.log("moMoMoney is " + moMoMoney)
} else {
    console.log("moMoMoney is " + moMoMoney);
}
*/

/* ===== EQUALITY OPERATORS: == VS === ===== */

/*
const age = 30;
//Boolean if both sides are exactly the same (STRICT, does not do type coercion)
if (age === 30) console.log("You just became an adult :D strict");
if ("30" === 30) console.log("You just became an adult :D"); //does not work
//Loose type coercion
if ("30" == 30) console.log("You just became an adult :D strict"); //assume == does not exist rather convert the value manually

const favourite = Number(prompt("What is your favorite number"));
console.log(favourite);
console.log(typeof favourite);
//console.log(Number(favourite));

if (favourite === 8) {
    console.log("Cool! 8 is a great number!")
} else if (favourite === 7) {
    console.log("7 is also a cool number!")
} else if (favourite === 9) {
    console.log("9 is also cool!")
} else {
    console.log("Number is not 8 or 7 or 9")
}

//strict also !== (different operator also preferably use the strict version and convert otherwise)
if (favourite !== 8) console.log("Why not 8?");
*/

/* ===== BOOLEAN LOGIC ===== ===== LOGICAL OPERATORS =====*/

/*
let age = 17;

if (age !== 20) {
    console.log("age is not 20 and is a " + typeof age)
} else {
    console.log("age is 20 and is a " + typeof age)
}

if (age >= 20 || age <= 30) {
    console.log(age + " is between 20 and 30")
} else if (age > 30) {
    console.log(age + " is more than 30")
} else {
    console.log(age + " is less than 20")
}

if (age >= 20 && age <= 30) {
    console.log(age + " is between 20 and 30")
} else if (age > 30) {
    console.log(age + " is more than 30")
} else {
    console.log(age + " is less than 20")
}

if (age >= 20 || age !== 15) {
    console.log(age + " so at least one of the options in the if is true maybe both")
} else {
    console.log(age + " so none of the if conditions are true")
}

const hasDriversLicense = true;
const hasGoodVision = false;

console.log(hasDriversLicense && hasGoodVision);
console.log(hasDriversLicense || hasGoodVision);
console.log(!hasDriversLicense);

if (hasDriversLicense && hasGoodVision) {
    console.log("Sarah can drive")
} else {
    console.log("Sarah can not drive yet")
}

const isTired = true;
if (hasDriversLicense || hasGoodVision || isTired) {
    console.log("Sarah can drive")
} else {
    console.log("Sarah can not drive yet")
}

if (hasDriversLicense && hasGoodVision && !isTired) {
    console.log("Sarah can drive")
} else {
    console.log("Sarah can not drive yet")
}
*/


/* ===== CHALLENGE #3 ===== */

/*
const dolphinsScore1 = 96;
const dolphinsScore2 = 19;
const dolphinsScore3 = 89;
const koalasScore1 = 96;
const koalasScore2 = 89;
const koalasScore3 = 19;

const averageDolphins = Math.floor((dolphinsScore1 + dolphinsScore2 + dolphinsScore3) / 3);
console.log(averageDolphins);
const averageKoalas = Math.floor((koalasScore1 + koalasScore2 + koalasScore3) / 3);
console.log(averageKoalas);

if (averageDolphins > averageKoalas) {
    console.log("Dolphins are the winners!")
} else if (averageKoalas > averageDolphins) {
    console.log("Koalas are the winners!")
} else {
    console.log("No winners its a draw!")
}

if (averageDolphins > averageKoalas && averageDolphins >= 100) {
    console.log("Dolphins are the winners!")
} else if (averageKoalas > averageDolphins && averageKoalas >= 100) {
    console.log("Koalas are the winners!")
} else if (averageDolphins === averageKoalas) {
    console.log("No winners its a draw!")
}

if (averageDolphins > averageKoalas && averageDolphins >= 100) {
    console.log("Dolphins are the winners!")
} else if (averageKoalas > averageDolphins && averageKoalas >= 100) {
    console.log("Koalas are the winners!")
} else if (averageDolphins === averageKoalas && averageDolphins >= 100 && averageKoalas >= 100) {
    console.log("No winners its a draw!")
} else {
    console.log("No winners at all the average score is less than 100!")
}
*/


/* ===== THE SWITCH STATEMENT ===== */
/* ===== STATEMENTS AND EXPRESSIONS ===== */
/* ===== THE CONDITIONAL (TERNARY) OPERATOR ===== */
/* ===== CHALLENGE #4 ===== */
/* ===== JAVASCRIPT RELEASES: ES5, ES6+ AND ESNEXT ===== */