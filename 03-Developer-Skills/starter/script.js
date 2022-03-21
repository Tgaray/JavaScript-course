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
