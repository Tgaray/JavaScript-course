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

//Lesson 253 - Chaining promises (two sequential ajax calls)
const getCountryData = function (country) {
  //Handling a fufilled Promise (SIMPLIFIED VERSION OF THE ABOVE ONE)
  //Country 1 (ajax request 1)
  fetch(`https://restcountries.com/v3.1/name/${country}`)
    //.json is available on all the responses through a fetch (resolve values)
    //The json returns it's own promise, json to be able to actually read the data from the response object
    //These two thens are already a sequential chain of promises
    .then(response => response.json())
    .then(data => {
      renderCountry(data[0]);
      const neighbour = data[0].borders[0];

      if (!neighbour) return;
      //Country 2 (ajax request 2)
      return fetch(`https://restcountries.com/v3.1/alpha/${neighbour}`);
      //we could also return something simple as return 23; in this case this value will be the fulfillment of the promise.
    })
    //then(data => alert(data)); this is the fulfilled data in the commented out example it's 23
    //This is where we can handle the succes value of the prior promise
    .then(response => response.json())
    .then(data => renderCountry(data[0], 'neighbour'));
};
//This is a way better solution than the code from line 11 to 47 and also better than callback hell on lines 117 to 129

getCountryData('germany');
