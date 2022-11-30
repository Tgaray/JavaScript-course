'use strict';

// prettier-ignore
const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

const form = document.querySelector('.form');
const containerWorkouts = document.querySelector('.workouts');
const inputType = document.querySelector('.form__input--type');
const inputDistance = document.querySelector('.form__input--distance');
const inputDuration = document.querySelector('.form__input--duration');
const inputCadence = document.querySelector('.form__input--cadence');
const inputElevation = document.querySelector('.form__input--elevation');

class App {
  //Private class field properties for the map and mapEvents (properties created for all instances of the app class)
  #map;
  #mapEvent;

  //No inputs needed so the constructor can remain empty for now
  //Constructor method is immediately called when an a new object instance is created from this class
  //So we can execute getPosition right away in the constructor
  //Event listeners are added because they need to be listening/executable right away.
  constructor() {
    this._getPosition();
    //event handler will always have the this element of the dom to which it is attached. Which is not what we want we want it to be bound to the class (App object).
    form.addEventListener('submit', this._newWorkout.bind(this));
    //Select change event for changed inputfields, no need to bind this because this is not used anywhere
    inputType.addEventListener('change', this._toggleElevationField);
  }

  _getPosition() {
    if (navigator.geolocation)
      //nav geolocation api takes two callback functions as parameters
      //This._loadMap is a regular function call (and therefor has no this "undefined") so we need to bind it to the current object (will return a new function)
      navigator.geolocation.getCurrentPosition(
        this._loadMap.bind(this),
        function () {
          //When not giving permission or an error
          alert('Could not get your position');
        }
      );
  }

  _loadMap(position) {
    //When giving permission to use the location load the map
    //destructuring the geolocation object lat and long into variables
    const { latitude } = position.coords;
    const { longitude } = position.coords;
    console.log(`https://www.google.com/maps/@${latitude},${longitude}`);

    const coords = [latitude, longitude];

    console.log(this);
    this.#map = L.map('map').setView(coords, 15);

    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(this.#map);

    //Handling clicks on map
    this.#map.on('click', this._showForm.bind(this));
  }

  _showForm(mapE) {
    this.#mapEvent = mapE;
    form.classList.remove('hidden');
    inputDistance.focus();
  }

  _toggleElevationField() {
    inputElevation.closest('.form__row').classList.toggle('form__row--hidden');
    inputCadence.closest('.form__row').classList.toggle('form__row--hidden');
  }

  _newWorkout(e) {
    e.preventDefault();
    console.log(this);
    //clear input fields
    inputDistance.value =
      inputDuration.value =
      inputCadence.value =
      inputElevation.value =
        '';
    // Display marker
    const { lat, lng } = this.#mapEvent.latlng;
    L.marker([lat, lng])
      .addTo(this.#map)
      .bindPopup(
        L.popup({
          maxWidth: 250,
          minWidth: 100,
          autoClose: false,
          closeOnClick: false,
          className: 'running-popup',
        })
      )
      .setPopupContent('Workout')
      .openPopup();
  }
}

//Use the object blueprint (with an instance of it)
const app = new App();
