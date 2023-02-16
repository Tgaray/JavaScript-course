'use strict';

const getCountryData = function (country) {
  //let languages = country.languages.fra;

  const btn = document.querySelector('.btn-country');
  const countriesContainer = document.querySelector('.countries');

  ///////////////////////////////////////

  //old school way of doing ajax requests
  const request = new XMLHttpRequest();
  request.open('GET', `https://restcountries.com/v3.1/name/${country}`);
  //async send request method to call the data, after that is done it will emit the load event
  request.send();
  //can call the responseText outside of an event aswell
  //console.log(request.responseText);

  request.addEventListener('load', function () {
    console.log(this.responseText);

    // convert JSON to an object and destructure because we get an array back
    const [data] = JSON.parse(this.responseText);

    //the language data is different than the udemy example, so getting the prop and value in an array and then reading the second value is a workaround
    let langValues;
    [langValues] = Object.entries(data.languages);

    const html = `        
  <article class="country">
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
  });
};

getCountryData('france');
getCountryData('holland');
getCountryData('portugal');
//Modern way to do ajax requests is through promises
