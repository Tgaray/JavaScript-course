/* ===== LESSON VARIABLES ===== */
/*
let country = "Netherlands";
let continent = "Europe";
let population = "17 million";

console.log("I was born in the " + country + " it is a country in " + continent + " that has " + population + " people in it.");
*/
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

let PI = 3.1415;
console.log(PI);

console.log(isIsLand);
console.log(language);
console.log(population);
console.log(country);

language = "Dutch";
console.log(language);

let yoyoyo = true;
console.log(yoyoyo);
console.log(typeof yoyoyo);
console.log(typeof true);
console.log(typeof 23);
console.log(typeof "yoyo");
yoyoyo = "yoyo";
console.log(typeof yoyoyo);
console.log(yoyoyo);
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

let grandpaAge = 100;
grandpaAge = 92;
console.log(grandpaAge);
 */

/* ===== LESSON OPERATORS ===== */

/*
const now = 2022;
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

console.log(`Just a regular string...`);
console.log('Just a regular string... \n\ This is the rest of the regular \n\ string');

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
const massMark = 95;
const heightMark = 1.88;
const massJohn = 85;
const heightJohn = 1.76;
const BMIMark = massMark / (heightMark ** 2);
const BMIJohn = massJohn / (heightJohn ** 2);
const markHigherBMI = BMIMark > BMIJohn;
console.log(BMIMark, BMIJohn, markHigherBMI);

if (BMIJohn > BMIMark) {
    console.log(`BMI of John is ${BMIJohn} and is higher than the BMI of Mark which is ${BMIMark}`);
} else {
    console.log(`BMI of Mark is ${BMIMark} and is higher than the BMI of John which is ${BMIJohn}`);
}
*/

/* ===== TYPE CONVERSION AND COERCION ===== */

//type conversion
/* const inputY = "1990";
console.log(Number(inputY), inputY);
console.log(Number(inputY) + 18);
console.log(Number("Jonas"));
console.log(typeof NaN);
console.log(String(23), 23);

//typecoercion + converts the number to a string -, /, *, > to a number
console.log("I am " + Number(23) + " years old");
console.log("I am " + String(23) + " years old")
console.log("23" - "10" - 3);
console.log("23" * "10");

let n = "1" + 1; // string 11
n = n - 1; // - makes it a number again so -1 is the number 10
console.log(n); */

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
    console.log("True is " + moMoMoney)
} else {
    console.log("False is " + moMoMoney);
}
 */

/* ===== EQUALITY OPERATORS: == VS === ===== */

/*
const age = 30;
//Boolean if both sides are exactly the same (STRICT, does not do type coercion)
if (age === 30) console.log("You just became an adult :D (strict)");
if ("30" === 30) console.log("You just became an adult :D"); //does not work
//Loose type coercion
if ("30" == 30) console.log("You just became an adult :D (loose)"); //assume == does not exist rather convert the value manually

const favourite = Number(prompt("What is your favorite number"));
console.log(favourite);
console.log(typeof favourite);
console.log(Number(favourite));

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

/* 
const day = "sunday";

switch (day) {
    case "monday": // day === "monday"
        console.log(day + " I have to start grading PDES");
        console.log(day + " I have a Brightspace meeting");
        break;// tell the code to stop after having found a match
    case "tuesday":
        console.log(day + " First day of BASC grading");
        break;
    case "wednesday":
        console.log(day + " Second day of BASC grading");
        break;
    case "thursday":
        console.log(day + " Third day of BASC grading");
        break;
    case "friday":
        console.log(day + " I work at IW");
        break;
    case "saturday":
    case "sunday":
        console.log(day + " Relax");
        break;
    default:
        console.log("Not a valid day!")
}

if (day === "monday") {
    console.log(day + " I have to start grading PDES");
    console.log(day + " I have a Brightspace meeting");
} else if (day === "tuesday") {
    console.log(day + " First day of BASC grading");
} else if (day === "wednesday") {
    console.log(day + " Second day of BASC grading");
} else if (day === "thursday") {
    console.log(day + " Third day of BASC grading");
} else if (day === "friday") {
    console.log(day + " I work at IW");
} else if (day === "saturday" || day === "sunday") {
    console.log(day + " Relax");
} else {
    console.log("Not a valid day!")
}
 */

/* ===== STATEMENTS AND EXPRESSIONS ===== */

/* 3 + 4 // expressions produce values
1991 // expression
true && false && !false // expression

if (23 > 10) {
    const str = "23 is bigger"; // the string is an expression, expressions produce values. the entire line is a statement
} // statement are like full sentences that performs some action(s) */

/* ===== THE CONDITIONAL (TERNARY) OPERATOR ===== */

/* 
const age = 16;

//The condition, the if : the else (ternary condition is an expression not a statement)
age >= 18 ? console.log("I like to drink beer 🍻") :
    console.log("I like to drink milk 🥛");

const drink = age >= 18 ? "beer 🍻" : "milk 🥛"; // expression
console.log(drink);

let drink2;
if (age >= 18) {
    drink2 = "beer 🍻";
} else {
    drink2 = "milk 🥛";
}
console.log(drink2);

//using the Ternary operator you can use the expression in a template literal
console.log(`Im allowed to drink ${age >= 18 ? "beer 🍻" : "milk 🥛"} because I am ${age} `)
 */

/* ===== CHALLENGE #4 ===== */

/* 
let tip;
let bill = 150;
bill >= 50 && bill <= 200 ? tip = bill * 0.15 : tip = bill * 0.20;
console.log(`the bill is ${bill} and the tip is ${tip}, which is ${tip / bill * 100}% of the price of ${bill}`);

 */