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



/* ===== CHALLENGE #2 ===== */
/* ===== TYPE CONVERSION AND COERCION ===== */
/* ===== TRUTHY AND FALSY VALUES ===== */
/* ===== EQUALITY OPERATORS: == VS === ===== */
/* ===== BOOLEAN LOGIC ===== */
/* ===== LOGICAL OPERATORS ===== */
/* ===== CHALLENGE #3 ===== */
/* ===== THE SWITCH STATEMENT ===== */
/* ===== STATEMENTS AND EXPRESSIONS ===== */
/* ===== THE CONDITIONAL (TERNARY) OPERATOR ===== */
/* ===== CHALLENGE #4 ===== */
/* ===== JAVASCRIPT RELEASES: ES5, ES6+ AND ESNEXT ===== */