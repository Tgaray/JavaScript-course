// Remember, we're gonna use strict mode in all scripts now!
'use strict';

//const x = '23';
// if (x === 23) console.log(23);

// const calcAge = birthYear => 2022 - birthYear;
// console.log(calcAge(1990));

//to create coding snippets for example for console.logs so you dont have to type them
//Preferences --> user snippets --> cl is the snippet to call a console log
//now type cl and then enter (add $1 to place cursor, but this disables autocomplete)

//With extension TODO FIXME DEBUG highlight LEC NICE will be colored, handy for attention grabbing comments or notes

//PROBLEM 1
//Calculate the temperature amplitude from the temperatures array.

//1 Understanding the problem
//What is a sensor error
//Amplitude difference between highest and lowest temperatures.
//How to compute max and min temperatures
//What's a sensor error

//2 Breaking up into sub-problems
// How to ignore errors
// Find max value
// Find Min value
// Subtract min from max and return amplitude.

//PROBLEM 2
//Function should now receive two arrays of temps

//1 Understanding the problem
//With two arrays doe we need to implement the functionality twice
//No, Merge the array twice

//2 Breaking up into sub-problems
//Merge two arrays

/* 
const temperatures1 = [3, -2, -6, -1, 'error', 9, 13, 17, 15, 14, 9, 5];
const temperatures2 = [3, -12, 6, -31, 49, 13, 117, 15, 'error', 2, 4];

const calcTempAmplitude = function (temp1, temp2) {
  const temps = temp1.concat(temp2);
  console.log(temps);

  let max = temps[0];
  let min = temps[0];
  for (let i = 0; i < temps.length; i++) {
    const curTemp = temps[i];
    //continue makes it so that the rest of the iteration will not be finished and skip to the next iteration (if it matches the condition)
    if (typeof curTemp !== 'number') continue;
    if (curTemp > max) max = curTemp;
    if (curTemp < min) min = curTemp;
  }
  console.log(max, min);
  return max - min;
};

const amplitude = calcTempAmplitude(temperatures1, temperatures2);
console.log(amplitude);
 */

//Debugging

/* 
  const measureKelvin = function () {
  const measurement = {
    type: 'temp',
    unit: 'celcius',
    //C) fix the bug
    value: Number(prompt('Degrees celsius:')),
  };

  //B) find the bug
  console.log(measurement);
  console.table(measurement);
  console.log(measurement.value);
  // console.warn(measurement.value);
  // console.error(measurement.value);

  //Make the string into a number so it can be added to 273
  //C) fix the bug
  const kelvin = parseInt(measurement.value) + 273;
  return kelvin;
};

//A) identify the bug
console.log(measureKelvin()); 
*/
/* 
const calcTempAmplitude = function (temp1, temp2) {
  const temps = temp1.concat(temp2);
  console.log(temps);

  let max = 0;
  let min = 0;
  for (let i = 0; i < temps.length; i++) {
    const curTemp = temps[i];
    //continue makes it so that the rest of the iteration will not be finished and skip to the next iteration (if it matches the condition)
    if (typeof curTemp !== 'number') continue;

    debugger;
    if (curTemp > max) max = curTemp;
    if (curTemp < min) min = curTemp;
  }
  console.log(max, min);
  return max - min;
};

const amplitude = calcTempAmplitude([3, 5, 1], [9, 4, 5]);
//A) Identify
console.log(amplitude);
 */

// Coding Challenge #1

//The problem
//Given an array of forecasted max temperatures, the thermometer displays a string with these temperatures. Give the strings back for each value in the array will be the max temparture for the next day.

//1 Understanding the problem
//With two arrays doe we need to implement the functionality twice
//Could I use a template literal to add each new piece to the string
//Could I add strings together to create one long string
//No, Merge the array twice

//2 Breaking up into sub-problems
//Merge two arrays
//Loop through the arrays and addt hem to a template literal
//Return the string

const temp1 = [17, 21, 23];
const temp2 = [12, 5, -5, 0, 4];
const temperatures = temp1.concat(temp2);
console.log(temperatures);

const printForecast = function (temparray) {
  let forecast = '';
  for (let i = 0; i < temparray.length - 1; i++) {
    forecast += `${temparray[i]} degrees in ${[i + 1]} days. `;
  }
  console.log(forecast);
};

printForecast(temperatures);

/*
const temp1 = [17, 18, 19];

const printForecast = function(temperature){
  for(let i = 0; i < temp1.length; i++){
    console.log(`${temp1[i]} degrees in ${i} days`)
  }
}

printForecast(temp1);
*/

