'use strict';

// const getCountryData = function (country) {
//   //let languages = country.languages.fra;

//   const btn = document.querySelector('.btn-country');
//   const countriesContainer = document.querySelector('.countries');

//   ///////////////////////////////////////

//   //old school way of doing ajax requests
//   const request = new XMLHttpRequest();
//   request.open('GET', `https://restcountries.com/v3.1/name/${country}`);
//   //async send request method to call the data, after that is done it will emit the load event
//   request.send();
//   //can call the responseText outside of an event aswell
//   //console.log(request.responseText);

//   request.addEventListener('load', function () {
//     console.log(this.responseText);

//     // convert JSON to an object and destructure because we get an array back
//     const [data] = JSON.parse(this.responseText);

//     //the language data is different than the udemy example, so getting the prop and value in an array and then reading the second value is a workaround
//     let langValues;
//     [langValues] = Object.entries(data.languages);

//     const html = `
//   <article class="country">
//     <img class="country__img" src="${data.flags.png}" />
//     <div class="country__data">
//         <h3 class="country__name">${data.name.common}</h3>
//         <h4 class="country__region">${data.region}</h4>
//         <p class="country__row"><span>👫</span>${(
//           +data.population / 1000000
//         ).toFixed(1)} million people</p>
//         <p class="country__row"><span>🗣️</span>${langValues[1]}</p>
//         <p class="country__row"><span>💰</span>${data.currencies.EUR.name}</p>
//     </div>
//     </article>
//     `;
//     console.log(html);
//     countriesContainer.insertAdjacentHTML('beforeend', html);
//     countriesContainer.style.opacity = 1;
//   });
// };

// getCountryData('france');
// getCountryData('holland');
// getCountryData('portugal');
// //Modern way to do ajax requests is through promises

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');

const renderCountry = function (data, className = '') {
  //the language data is different than the udemy example, so getting the prop and value in an array and then reading the second value is a workaround
  let langValues;
  console.log(data);
  [langValues] = Object.entries(data.languages);
  const html = `        
    <article class="country ${className}">
      <img class="country__img" src="${data.flags.png}" />
      <div class="country__data">
          <h3 class="country__name">${data.name.common}</h3>
          <h4 class="country__region">${data.region}</h4>
          <p class="country__row"><span>👫</span>${(
            +data.population / 1000000
          ).toFixed(1)} million people</p>
          <p class="country__row"><span>🗣️</span>${langValues[1]}</p>
          <p class="country__row"><span>💰</span>${data.currencies.EUR.name}</p>
      </div>
      </article>
      `;
  console.log(html);
  countriesContainer.insertAdjacentHTML('beforeend', html);
  countriesContainer.style.opacity = 1;
};

//To render an error
const renderError = function (msg) {
  countriesContainer.insertAdjacentText('beforeend', msg);
  countriesContainer.style.opacity = 1;
};
// const getCountryAndNeighbour = function (country) {
//   //old school way of doing ajax requests ajax call #1
//   const request = new XMLHttpRequest();
//   request.open('GET', `https://restcountries.com/v3.1/name/${country}`);
//   //async send request method to call the data, after that is done it will emit the load event
//   request.send();
//   //can call the responseText outside of an event aswell
//   //console.log(request.responseText);

//   request.addEventListener('load', function () {
//     console.log(this.responseText);
//     // convert JSON to an object and destructure because we get an array back
//     const [data] = JSON.parse(this.responseText);
//     // Render country
//     renderCountry(data);

//     // Get neighbour country
//     const [neighbour] = data.borders;
//     // Countries without neighbours, lets not run into mistakes
//     if (!neighbour) return;
//     // ajax call #2
//     const request2 = new XMLHttpRequest();
//     request2.open('GET', `https://restcountries.com/v3.1/alpha/${neighbour}`);
//     request2.send();
//     //callback inside the earlier ajax request (not possible with the earlier one for the country) nested callbacks = callback hell
//     request2.addEventListener('load', function () {
//       const [data2] = JSON.parse(this.responseText);
//       console.log(data2);
//       // render the neighbouring country and pass in the class to make it appear smaller
//       renderCountry(data2, 'neighbour');
//     });
//   });
// };

// getCountryAndNeighbour('france');
// //Modern way to do ajax requests is through promises

// //nested callbacks = callback hell (hard to reason about, hard to maintain)
// setTimeout(() => {
//   console.log('1 second has passed');
//   setTimeout(() => {
//     console.log('2 second has passed');
//     setTimeout(() => {
//       console.log('3 second has passed');
//       setTimeout(() => {
//         console.log('4 second has passed');
//       }, 1000);
//     }, 1000);
//   }, 1000);
// }, 1000);

//solved with promises and fetch (since ES6)

// const request = new XMLHttpRequest();
// request.open('GET', `https://restcountries.com/v3.1/name/${country}`);
// //async send request method to call the data, after that is done it will emit the load event
// request.send();

//Lesson 252 - consuming promises

//Promise stored in request variable / an object that is a placeholder for the future result of an async operation.
const request = fetch('https://restcountries.com/v3.1/name/portugal');
console.log(request);

// const getCountryData = function (country) {
//   //Handling a fufilled Promise
//   fetch(`https://restcountries.com/v3.1/name/${country}`)
//     .then(function (response) {
//       console.log(response);
//       //.json is available on all the responses through a fetch (resolve values)
//       //The json returns it's own promise, json to be able to actually read the data from the response object
//       return response.json();
//     })
//     .then(function (data) {
//       console.log(data);
//       renderCountry(data[0]);
//     });
// };

//Helper function to fetch the url and return a response in json format so we can reduce redundant code
const getJSON = function (url, errorMsg = 'something went wrong') {
  return fetch(url).then(response => {
    if (!response.ok) throw new Error(`${errorMsg} (${response.status})`); // passes down the response error message tot he catch while skipping the in between thens
    return response.json();
  });
};

// !!! Exmaple without helper function filled with redundant code !!!
//Lesson 253 - Chaining promises (two sequential ajax calls)
// const getCountryData = function (country) {
//   //Handling a fufilled Promise (SIMPLIFIED VERSION OF THE ABOVE ONE)
//   //Country 1 (ajax request 1)
//   fetch(`https://restcountries.com/v3.1/name/${country}`)
//     //.json is available on all the responses through a fetch (resolve values)
//     //The json returns it's own promise, json to be able to actually read the data from the response object
//     //These two thens are already a sequential chain of promises
//     .then(response => {
//       console.log(response);

//       //err => alert(err) // catching the error as a second argument of the response but you have to do this for every response so also on line 183 there is a better way to handle erros globally by adding a catch method
//       if (!response.ok)
//         throw new Error(`Country not found (${response.status})`); // passes down the response error message tot he catch while skipping the in between thens
//     })
//     .then(data => {
//       renderCountry(data[0]);
//       //const neighbour = data[0].borders[0];
//       const neighbour = 'adsdfasdf';
//       if (!neighbour) return;
//       //Country 2 (ajax request 2)
//       return fetch(`https://restcountries.com/v3.1/alpha/${neighbour}`);
//       //we could also return something simple as return 23; in this case this value will be the fulfillment of the promise.
//     })
//     //then(data => alert(data)); this is the fulfilled data in the commented out example it's 23
//     //This is where we can handle the succes value of the prior promise
//     .then(response => {
//       if (!response.ok)
//         throw new Error(`Country not found (${response.status})`); // passes down the response error message tot he catch while skipping the in between thens
//       return response.json();
//     })
//     .then(data => renderCountry(data[0], 'neighbour'))
//     .catch(err => {
//       console.error(`${err} 😡`);
//       renderError(`Something went wrong 😡 ${err.message}. Try again!`);
//     })
//     .finally(() => {
//       //contains code that always has to be executed at the end, only works on promises also an error promise like the catch so it will always follow a catch
//       countriesContainer.style.opacity = 1;
//     });
// };

//Better version of the getCOuntryData function with the use of the getJSON helper function
const getCountryData = function (country) {
  //Call helper getJSON function to fetch/and make json of the request
  getJSON(`https://restcountries.com/v3.1/name/${country}`, 'Country not found')
    .then(data => {
      renderCountry(data[0]);
      const neighbour = data[0].borders[0];

      //What if a country does not exist:
      //const neighbour = 'adsdfasdf';

      //But what if a country has no neighbour we should handle this aswell (like australia)
      if (!neighbour) throw new Error('No neighbour found');
      //Country 2 (ajax request 2)
      return getJSON(
        `https://restcountries.com/v3.1/alpha/${neighbour}`,
        'Country not found'
      );
      //we could also return something simple as return 23; in this case this value will be the fulfillment of the promise.
    })
    .then(data => renderCountry(data[0], 'neighbour'))
    .catch(err => {
      console.error(`${err} 😡`);
      renderError(`Something went wrong 😡 ${err.message}. Try again!`);
    })
    .finally(() => {
      //contains code that always has to be executed at the end, only works on promises also an error promise like the catch so it will always follow a catch
      countriesContainer.style.opacity = 1;
    });
};

//This is a way better solution than the code from line 11 to 47 and also better than callback hell on lines 117 to 129
btn.addEventListener('click', function () {
  getCountryData('Germany');
});

//No country was found with this name
//The promise does not get rejected right away which is what we want so we have to do that manually
//Lesson 255 - throwing errors manually
//getCountryData('dasdfasdf');

///////////////////////////////////////
// Coding Challenge #1

/* 
In this challenge you will build a function 'whereAmI' which renders a country ONLY based on GPS coordinates. For that, you will use a second API to geocode coordinates.

Here are your tasks:

PART 1
1. Create a function 'whereAmI' which takes as inputs a latitude value (lat) and a longitude value (lng) (these are GPS coordinates, examples are below).
2. Do 'reverse geocoding' of the provided coordinates. Reverse geocoding means to convert coordinates to a meaningful location, like a city and country name. Use this API to do reverse geocoding: https://geocode.xyz/api.
The AJAX call will be done to a URL with this format: https://geocode.xyz/52.508,13.381?geoit=json. Use the fetch API and promises to get the data. Do NOT use the getJSON function we created, that is cheating 😉
3. Once you have the data, take a look at it in the console to see all the attributes that you recieved about the provided location. Then, using this data, log a messsage like this to the console: 'You are in Berlin, Germany'
4. Chain a .catch method to the end of the promise chain and log errors to the console
5. This API allows you to make only 3 requests per second. If you reload fast, you will get this error with code 403. This is an error with the request. Remember, fetch() does NOT reject the promise in this case. So create an error to reject the promise yourself, with a meaningful error message.

PART 2
6. Now it's time to use the received data to render a country. So take the relevant attribute from the geocoding API result, and plug it into the countries API that we have been using.
7. Render the country and catch any errors, just like we have done in the last lecture (you can even copy this code, no need to type the same code)

TEST COORDINATES 1: 52.508, 13.381 (Latitude, Longitude)
TEST COORDINATES 2: 19.037, 72.873
TEST COORDINATES 2: -33.933, 18.474

GOOD LUCK 😀
*/

//FINAL
// const whereAmI = function (lat, long) {
//   fetch(`https://geocode.xyz/${lat},${long}?geoit=json`)
//     .then(response => {
//       if (!response.ok)
//         throw new Error(`Problem with geocoding (${response.status})`); // passes down the response error message tot he catch while skipping the in between thens
//       return response.json();
//     })
//     .then(data => {
//       console.log(data, lat, long);
//       console.log(`You are in ${data.city}, ${data.country}`);

//       return fetch(`https://restcountries.com/v3.1/name/${data.country}`);
//     })
//     .then(response => {
//       if (!response.ok)
//         throw new Error(`Country not found (${response.status})`); // passes down the response error message tot he catch while skipping the in between thens
//       return response.json();
//     })
//     .then(data => renderCountry(data[0]))
//     .catch(err => console.error(`😡 ${err.message}`));
// };

//whereAmI(52.508, 13.381);
//whereAmI(19.037, 72.873);
//whereAmI(-33.933, 18.474);

//Any top level code should be run first (outside a callback)
//#1 Top level console.log (these will run first)
// console.log('Test start');
// //#3 then the items from the callback queue
// setTimeout(() => console.log('0 sec timer'), 0);
// //Promise.resolve allows us to build a promise that can be emedietly resolved
// //#2 Then the promise will run second because it goes to the micro task queue
// Promise.resolve('Resolved promise 1').then(res => console.log(res));
// //#1 Top  level code console.log (these will run first)

// //If the microtask takes a long time the 0 seconds will actually be delayed because its behind them in the callback stack
// Promise.resolve('Resolved promise 2').then(res => {
//   //looping over large number to take a lot of time
//   for (let i = 0; i < 1000000000; i++) {}
//   //This means you cannot to high precision things with setTimeouts
//   console.log(res);
// });
// console.log('Test end');

// //Lesson 259 Building a simple promise
// //Building a promise is like building a special object it takes only one param, the executor function which will execute as soon as the promise constructor runs in doing so it will take two more parameters, resolve and reject
// //We will store the result in a variable lotteryPromise
// const lotteryPromise = new Promise(function (resolve, reject) {
//   //async behavior we will try to handle with the promise
//   //This log is the first microtask
//   console.log('Lottery draw is pending 🔮');
//   setTimeout(function () {
//     if (Math.random() >= 0.5) {
//       //string when promise is resolved
//       resolve('You win 😇');
//     } else {
//       //create the error object
//       reject(new Error('You lose 🥪'));
//     }
//   }, 2000);
// });

// //In practice you usually just consume promises (like below) but good to know how they are built
// lotteryPromise.then(res => console.log(res)).catch(err => console.log(err));

// //We often only build promises to update old callback (hell) based code into promises (promisifying)
// //Promisifying setTimeout
// const wait = function (seconds) {
//   return new Promise(function (resolve) {
//     setTimeout(resolve, seconds * 1000);
//   });
// };

// wait(1)
//   .then(() => {
//     console.log('I waited for 1 seconds');
//     return wait(2);
//   })
//   .then(() => {
//     console.log('I waited for 2 seconds');
//     return wait(3);
//   })
//   .then(() => {
//     console.log('I waited for 3 seconds');
//     return wait(4);
//   })
//   .then(() => console.log('I waited for 4 seconds'));

// //The above we could do to avoid the following:
// // //nested callbacks = callback hell (hard to reason about, hard to maintain)
// // setTimeout(() => {
// //   console.log('1 second has passed');
// //   setTimeout(() => {
// //     console.log('2 second has passed');
// //     setTimeout(() => {
// //       console.log('3 second has passed');
// //       setTimeout(() => {
// //         console.log('4 second has passed');
// //       }, 1000);
// //     }, 1000);
// //   }, 1000);
// // }, 1000);

// //Easy way to create a promise that resolves or rejects right away
// //You can see the abc resolve quickly because it is in the microtask queue the abc is the second microtask including all the lines from 330 to 392
// Promise.resolve('abc').then(x => console.log(x));
// Promise.reject(new Error('Problem!')).catch(x => console.error(x));

// //Lesson 260 - Promisifying the geolocation API
// // const getPosition = function () {
// //   return new Promise(function (resolve, reject) {
// //     navigator.geolocation.getCurrentPosition(
// //       position => resolve(position),
// //       err => reject(err)
// //     );
// //   });
// // };

// //Even simpler version of the promisified version above
// const getPosition = function () {
//   return new Promise(function (resolve, reject) {
//     navigator.geolocation.getCurrentPosition(resolve, reject);
//   });
// };

// getPosition().then(pos => console.log(pos));

// //Code from coding challenge that uses lat long to use the geolocation now
// //No need for parameters anymore because we built a function for the geolocation
// const whereAmI = function () {
//   getPosition()
//     .then(pos => {
//       //destructure the coordinates
//       const { latitude: lat, longitude: lng } = pos.coords;

//       //Return the fetch PROMISE and then handle it with the then handler below
//       return fetch(`https://geocode.xyz/${lat},${lng}?geoit=json`);
//     })
//     .then(response => {
//       if (!response.ok)
//         throw new Error(`Problem with geocoding (${response.status})`); // passes down the response error message tot he catch while skipping the in between thens
//       return response.json();
//     })
//     .then(data => {
//       console.log(`You are in ${data.city}, ${data.country}`);

//       return fetch(`https://restcountries.com/v3.1/name/${data.country}`);
//     })
//     .then(response => {
//       if (!response.ok)
//         throw new Error(`Country not found (${response.status})`); // passes down the response error message tot he catch while skipping the in between thens
//       return response.json();
//     })
//     .then(data => renderCountry(data[0]))
//     .catch(err => console.error(`😡 ${err.message}`));
// };

// btn.addEventListener('click', whereAmI);

///////////////////////////////////////
// Coding Challenge #2

/* 
Build the image loading functionality that I just showed you on the screen.

Tasks are not super-descriptive this time, so that you can figure out some stuff on your own. Pretend you're working on your own 😉

PART 1
1. Create a function 'createImage' which receives imgPath as an input. This function returns a promise which creates a new image (use document.createElement('img')) and sets the .src attribute to the provided image path. When the image is done loading, append it to the DOM element with the 'images' class, and resolve the promise. The fulfilled value should be the image element itself. In case there is an error loading the image ('error' event), reject the promise.

If this part is too tricky for you, just watch the first part of the solution.

PART 2
2. Comsume the promise using .then and also add an error handler;
3. After the image has loaded, pause execution for 2 seconds using the wait function we created earlier;
4. After the 2 seconds have passed, hide the current image (set display to 'none'), and load a second image (HINT: Use the image element returned by the createImage promise to hide the current image. You will need a global variable for that 😉);
5. After the second image has loaded, pause execution for 2 seconds again;
6. After the 2 seconds have passed, hide the current image.

TEST DATA: Images in the img folder. Test the error handler by passing a wrong image path. Set the network speed to 'Fast 3G' in the dev tools Network tab, otherwise images load too fast.

GOOD LUCK 😀
*/

// const wait = function (seconds) {
//   return new Promise(function (resolve) {
//     setTimeout(resolve, seconds * 1000);
//   });
// };

// const imgContainer = document.querySelector('div.images');

// const createImage = function (imgPath) {
//   return new Promise(function (resolve, reject) {
//     const img = document.createElement('img');
//     img.src = `${imgPath}`;

//     img.addEventListener('load', function () {
//       imgContainer.append(img);
//       resolve(img);
//     });

//     img.addEventListener('error', function () {
//       reject(new Error('Image not found'));
//     });
//   });
// };

// let currentIMG;

// createImage('img/img-1.jpg')
//   .then(img => {
//     currentIMG = img;
//     console.log('Image 1 is loaded');
//     return wait(2);
//   })
//   .then(() => {
//     currentIMG.style.display = 'none';
//     return createImage('img/img-2.jpg');
//   })
//   .then(img => {
//     currentIMG = img;
//     console.log('Image 2 is loaded');
//     return wait(2);
//   })
//   .then(() => (currentIMG.style.display = 'none'))
//   .catch(err => console.error(err));

const getPosition = function () {
  return new Promise(function (resolve, reject) {
    navigator.geolocation.getCurrentPosition(
      position => resolve(position),
      err => reject(err)
    );
  });
};

//Lesson 262 - Consuming promises with async/await (remaking the where amI function)
//now an async function - this function can keep running in the bg while performing the code that is inside.
//Can have one or more awaits
const whereAmI = async function () {
  try {
    //Geolocation
    const pos = await getPosition();
    const { latitude: lat, longitude: lng } = pos.coords;

    //Reverse geocoding
    console.log(lat, lng);
    const resGeo = await fetch(`https://geocode.xyz/${lat},${lng}?geoit=json`);
    if (!resGeo.ok) throw new Error(`Problem getting location data 😉`);
    const dataGeo = await resGeo.json();

    //Country data
    //await will wait at this point until the promise is fufilled (data has been fetched in this case) not blocking main thread of execution
    const res = await fetch(
      `https://restcountries.com/v3.1/name/${dataGeo.country}`
    ); // will be resolve value of the promise
    if (!resGeo.ok) throw new Error(`Problem getting Country 😉`);
    const data = await res.json();
    renderCountry(data[0]);
    return `You are in ${dataGeo.city}, ${dataGeo.country}`;
  } catch (error) {
    renderError(`${error.message} 😉`);
  } //all without chaining callbacks (with thens)
  //the above is essentially the same as:
  // fetch(`https://restcountries.com/v3.1/name/${country}`).then(res => console.log(res));

  //reject promise returned from async function
  throw err;
};

console.log('1: I will get the location');
//Async function that runs in the background so JS moves right tot he next line but in this case async awaits always returns a promise, so the promise is pending betwee the two console.logs
// const city = whereAmI();
// console.log(city);
//But to get the fufilled value of the promise we want to use then

// whereAmI()
//   .then(city => console.log(`2: ${city}`))
//   .catch(err => console.error(`2: ${err.message}`))
//   .finally(() => console.log('3: Finished getting the location'));

//first will be printed first and then the response from whereAmI (so async)
// console.log('FIRST');

//Above we are combining the old and new ways of writing async functions/code
//With iffy (immediate invoked function calls) we solve this in this case with an async iffy
// (async function () {
//   try {
//     const city = await whereAmI();
//     console.log(`2: ${city}`);
//   } catch (err) {
//     console.error(`2: ${err.message}`);
//   }
//   console.log('3: Finished getting the location');
// })();

//Lesson 263 - error handling with try... catch
// //Example
// try {
//   let y = 1;
//   const xasdfxb = 2;
//   xasdfxb = 3;
// } catch (err) {
//   alert(err.message);
// }

// const get3Countries = async function (c1, c2, c3) {
//   try {
//     // const [data1] = await getJSON(`https://restcountries.com/v3.1/name/${c1}`);
//     // const [data2] = await getJSON(`https://restcountries.com/v3.1/name/${c2}`);
//     // const [data3] = await getJSON(`https://restcountries.com/v3.1/name/${c3}`);

//     //As a promise they run at the same time instead of one after the other like above
//     //This will return one promise that runs the promises in parallel
//     const data = await Promise.all([
//       getJSON(`https://restcountries.com/v3.1/name/${c1}`),
//       getJSON(`https://restcountries.com/v3.1/name/${c2}`),
//       getJSON(`https://restcountries.com/v3.1/name/${c3}`),
//     ]);

//     // console.log(data1.capital, data2.capital, data3.capital);
//     //console.log(data);
//     console.log(data.map(d => d[0].capital));
//   } catch (err) {
//     console.error(err);
//   }
// };

// get3Countries('portugal', 'canada', 'tanzania');

//Lesson 266 Other promise combinators: race, allSettled and any

//Promise.race
(async function () {
  const res = await Promise.race([
    getJSON(`https://restcountries.com/v3.1/name/mexico`),
    getJSON(`https://restcountries.com/v3.1/name/egypt`),
    getJSON(`https://restcountries.com/v3.1/name/italy`),
  ]);
  console.log(res[0]);
})();

const timeout = function (sec) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error('Request took too long!'));
    });
  }, sec * 1000);
};

Promise.race([
  getJSON(`https://restcountries.com/v3.1/name/tanzania`),
  timeout(0.1),
])
  .then(res => console.log(res[0]))
  .catch(err => console.log(err));

//Promise.allSettled (never short circuits like race does)
Promise.allSettled([
  Promise.resolve('Success'),
  Promise.resolve('ERROR'),
  Promise.resolve('Another success'),
])
  .then(res => console.log(res))
  .catch(err => console.log(err));

//Promise.any but rejected promises are ignored so always a fufilled promise unless all are rejectd
Promise.any([
  Promise.resolve('Success'),
  Promise.resolve('ERROR'),
  Promise.resolve('Another success'),
])
  .then(res => console.log(res))
  .catch(err => console.log(err));

//Coding challenge #3 basically making an async version of coding challenge #2 with extra's

const wait = function (seconds) {
  return new Promise(function (resolve) {
    setTimeout(resolve, seconds * 4000);
  });
};

const imgContainer = document.querySelector('div.images');

const createImage = function (imgPath) {
  return new Promise(function (resolve, reject) {
    const img = document.createElement('img');
    img.src = `${imgPath}`;

    img.addEventListener('load', function () {
      imgContainer.append(img);
      resolve(img);
    });

    img.addEventListener('error', function () {
      reject(new Error('Image not found'));
    });
  });
};

//Part1
//Old code challenge #2 non async code
// let currentIMG;

// createImage('img/img-1.jpg')
//   .then(img => {
//     currentIMG = img;
//     console.log('Image 1 is loaded');
//     return wait(2);
//   })
//   .then(() => {
//     currentIMG.style.display = 'none';
//     return createImage('img/img-2.jpg');
//   })
//   .then(img => {
//     currentIMG = img;
//     console.log('Image 2 is loaded');
//     return wait(2);
//   })
//   .then(() => (currentIMG.style.display = 'none'))
//   .catch(err => console.error(err));

const loadNpause = async function () {
  try {
    //load image1
    let img = await createImage('img/img-1.jpg');
    console.log('Image 1 is loaded');
    await wait(2);
    img.style.display = 'none';

    //load image2
    img = await createImage('img/img-2.jpg');
    console.log('Image 2 is loaded');
    await wait(2);
    img.style.display = 'none';
  } catch (err) {
    console.error(err);
  }
};

// loadNpause();

//Part2
const loadAll = async function (imgArr) {
  try {
    //arrow function is returning something
    //async will return promise and not always the value we are interested in
    const imgs = imgArr.map(async img => await createImage(img));
    console.log(imgs);

    //Promise.all is perfect to take out all the promises and store the image elements (instead of promises) into an array
    const imgsEl = await Promise.all(imgs);
    console.log(imgsEl);
    //then loop over array and add the parallel class to it
    imgsEl.forEach(img => img.classList.add('parallel'));
  } catch (err) {
    console.error(err);
  }
};
loadAll(['img/img-1.jpg', 'img/img-2.jpg', 'img/img-3.jpg']);
