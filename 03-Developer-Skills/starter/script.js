// Remember, we're gonna use strict mode in all scripts now!
'use strict';

const x = '23';
if (x === 23) console.log(23);

const calcAge = birthYear => 2022 - birthYear;
console.log(calcAge(1990));

//to create coding snippets for example for console.logs so you dont have to type them
//Preferences --> user snippets --> cl is the snippet to call a console log
//now type cl and then enter (add $1 to place cursor, but this disables autocomplete)

//With extension TODO FIXME DEBUG highlight LEC NICE will be colored, handy for attention grabbing comments or notes

//Calculate the temperature amplitude.
const temperatures = [3, -2, -6, -1, 'error', 9, 13, 17, 15, 14, 9, 5];

//1 Questions
//What is a sensor error
//Amplitude difference between highest and lowest temperatures.
//How to compute max and min temperatures
//What's a sensor error

//2 Breaking up into sub-problems
// How to ignore errors
// Find max value
// Find Min value
// Subtract min from max and return amplitude.

/* 
const calcTempAmplitude = function (temps) {
  let max = temps[0];
  let min = temps[0];
  for (let i = 0; i < temps.length; i++) {
    const currentTemp = temps[i];
    //next iteration will not be done with continue to the next value
    if (typeof currentTemp !== 'number') continue;
    if (currentTemp > max) max = currentTemp;
    if (currentTemp < min) min = currentTemp;
  }
  console.log(max, min);
  return max - min;
};

const amplitude = calcTempAmplitude(temperatures);
console.log(amplitude);
 */
