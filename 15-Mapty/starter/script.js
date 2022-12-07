'use strict';

class Workout {
  date = new Date();
  id = (Date.now() + '').slice(-10);
  clicks = 0;

  constructor(coords, distance, duration) {
    this.coords = coords; //[lat, lng]
    this.distance = distance; //in km
    this.duration = duration; //in min
  }

  _setDescription() {
    // prettier-ignore
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

    this.description = `${this.type[0].toUpperCase()}${this.type.slice(1)} on ${
      months[this.date.getMonth()]
    } ${this.date.getDate()}`;
  }

  click() {
    this.clicks++;
  }
}

class Running extends Workout {
  //this type is now available on all the running instances
  type = 'running';
  constructor(coords, distance, duration, cadence) {
    super(coords, distance, duration);
    this.cadence = cadence;
    this.calcPace();
    this._setDescription();
  }
  calcPace() {
    //min/km
    this.pace = this.duration / this.distance;
    return this.pace;
  }
}

class Cycling extends Workout {
  //this type is now available on all the cycling instances
  type = 'cycling';
  constructor(coords, distance, duration, elevationGain) {
    super(coords, distance, duration);
    this.elevationGain = elevationGain;
    //this.type = 'cycling'; // same as the type above
    this.calcSpeed();
    this._setDescription();
  }
  calcSpeed() {
    //km/hour
    this.speed = this.distance / (this.duration / 60);
    return this.speed;
  }
}

// const run1 = new Running([39, -12], 5.2, 24, 178);
// const cycling1 = new Cycling([39, -12], 27, 95, 523);
// console.log(run1, cycling1);

//////////////////////////
//APPLICATION ARCHITECTURE
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
  #mapZoomLevel = 13;
  #workouts = [];

  //No inputs needed so the constructor can remain empty for now
  //Constructor method is immediately called when an a new object instance is created from this class
  //So we can execute getPosition right away in the constructor
  //Event listeners are added because they need to be listening/executable right away.
  constructor() {
    //Get users position
    this._getPosition();
    //Get workouts data from local storage
    this._getLocalStorage();
    //Attach event handlers
    //event handler will always have the this element of the dom to which it is attached. Which is not what we want we want it to be bound to the class (App object).
    form.addEventListener('submit', this._newWorkout.bind(this));
    //Select change event for changed inputfields, no need to bind this because this is not used anywhere
    inputType.addEventListener('change', this._toggleElevationField);
    //Eventlistener for the workout container that is clicked
    containerWorkouts.addEventListener('click', this._moveToPopup.bind(this));
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
    //console.log(`https://www.google.com/maps/@${latitude},${longitude}`);

    const coords = [latitude, longitude];

    this.#map = L.map('map').setView(coords, this.#mapZoomLevel);

    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(this.#map);

    //Handling clicks on map
    this.#map.on('click', this._showForm.bind(this));

    //load map first then render the marker, here it does work because the map has to be loaded first (not in the getlocal storage function because that loads right away) Async Javascript.
    this.#workouts.forEach(work => {
      this._renderWorkoutMarker(work);
    });
  }

  _showForm(mapE) {
    this.#mapEvent = mapE;
    form.classList.remove('hidden');
    inputDistance.focus();
  }

  _hideForm() {
    //Empty inputs
    inputDistance.value =
      inputDuration.value =
      inputCadence.value =
      inputElevation.value =
        '';
    //Right away hide the form first
    form.style.display = 'none';
    form.classList.add('hidden');
    //cover the usual animation timing to put the display grid back in place
    setTimeout(() => ((form.style.display = 'grid'), 1000));
  }

  _toggleElevationField() {
    inputElevation.closest('.form__row').classList.toggle('form__row--hidden');
    inputCadence.closest('.form__row').classList.toggle('form__row--hidden');
  }

  _newWorkout(e) {
    //loops over the array of inputs in the form and checks if they are finite numbers and if that is the case return true if one inputis not a number this helper arrow function will return false.
    const validInputs = (...inputs) =>
      inputs.every(inp => Number.isFinite(inp));
    //Another helper function to check if numbers are positive
    const allPositive = (...inputs) => inputs.every(inp => inp > 0);

    e.preventDefault();
    //Get data from form
    const type = inputType.value;
    const distance = +inputDistance.value;
    const duration = +inputDuration.value;
    const { lat, lng } = this.#mapEvent.latlng;
    let workout;

    //If activity running then create running object
    if (type === 'running') {
      const cadence = +inputCadence.value;
      //Check if data is valid (with guard clause check opposite of what we are interested in)
      if (
        //These following lines can be replaced with the helper function
        // !Number.isFinite(distance) ||
        // !Number.isFinite(duration) ||
        // !Number.isFinite(cadence)
        !validInputs(distance, duration, cadence) ||
        !allPositive(distance, duration, cadence)
      )
        return alert('Inputs have to be positive numbers!');

      workout = new Running([lat, lng], distance, duration, cadence);
    }

    //If activity cycling then create cycling object
    if (type === 'cycling') {
      const elevation = +inputElevation.value;
      //Check if data is valid (with guard clause check opposite of what we are interested in){
      if (
        !validInputs(distance, duration, elevation) ||
        !allPositive(distance, duration)
      )
        return alert('Inputs have to be positive numbers!');

      workout = new Cycling([lat, lng], distance, duration, elevation);
    }

    //Add new object to workout array
    this.#workouts.push(workout);

    //Render workout on map as marker
    this._renderWorkoutMarker(workout);

    //Render workout on list
    this._renderWorkout(workout);

    //Hide form + clear input fields
    this._hideForm();

    // Set local storage to all workouts
    this._setLocalStorage();
  }

  _renderWorkoutMarker(workout) {
    // Display marker
    L.marker(workout.coords)
      .addTo(this.#map)
      .bindPopup(
        L.popup({
          maxWidth: 250,
          minWidth: 100,
          autoClose: false,
          closeOnClick: false,
          className: `${workout.type}-popup`,
        })
      )
      .setPopupContent(
        `${workout.type === 'running' ? '🏃‍♂️' : '🚴‍♀️'}${workout.description}`
      )
      .openPopup();
  }

  //The id is a bridge between the data and the user interface (workout.id provides a reference)
  _renderWorkout(workout) {
    let html = `
      <li class="workout workout--${workout.type}" data-id="${workout.id}">
        <h2 class="workout__title">${workout.description}</h2>
        <div class="workout__details">
          <span class="workout__icon">${
            workout.type === 'running' ? '🏃‍♂️' : '🚴‍♀️'
          }</span>
          <span class="workout__value">${workout.distance}</span>
          <span class="workout__unit">km</span>
        </div>
        <div class="workout__details">
          <span class="workout__icon">⏱</span>
          <span class="workout__value">${workout.duration}</span>
          <span class="workout__unit">min</span>
        </div>
    `;

    if (workout.type === 'running') {
      html += `
            <div class="workout__details">
            <span class="workout__icon">⚡️</span>
            <span class="workout__value">${workout.pace.toFixed(1)}</span>
            <span class="workout__unit">min/km</span>
          </div>
          <div class="workout__details">
            <span class="workout__icon">🦶🏼</span>
            <span class="workout__value">${workout.cadence}</span>
            <span class="workout__unit">spm</span>
          </div>
        </li>
      `;
    }
    if (workout.type === 'cycling') {
      html += `
            <div class="workout__details">
            <span class="workout__icon">⚡️</span>
            <span class="workout__value">${workout.speed.toFixed(1)}</span>
            <span class="workout__unit">km/h</span>
          </div>
          <div class="workout__details">
            <span class="workout__icon">⛰</span>
            <span class="workout__value">${workout.elevationGain}</span>
            <span class="workout__unit">m</span>
          </div>
        </li>
      `;
    }

    //afterend places the new workout ahead of the older/prior one
    form.insertAdjacentHTML('afterend', html);
  }

  _moveToPopup(e) {
    //Click in an element and bubbles up to the closest workout class so the closest will be within the actual clicked workout element.
    const workoutEl = e.target.closest('.workout');

    //guard clause when there is not workout
    if (!workoutEl) return;

    const workout = this.#workouts.find(
      work => work.id === workoutEl.dataset.id
    );

    this.#map.setView(workout.coords, this.#mapZoomLevel, {
      animate: true,
      pan: {
        duration: 1,
      },
    });

    //using the public interface
    // workout.click();
  }

  //Function to add workouts to local storage.
  _setLocalStorage() {
    //set workouts to localStorage API in the browser and it has to be a key value pair so stringify an object
    localStorage.setItem('workouts', JSON.stringify(this.#workouts));
  }

  _getLocalStorage() {
    //get workouts from localStorage API to display in the browser again as an object (so parse).
    const data = JSON.parse(localStorage.getItem('workouts'));

    //guard clause if there is no data
    if (!data) return;

    //restoring the array with the available data that is stored in the browser cache
    this.#workouts = data;
    //lOOP over the array without creating a new array. By using the seperately created method so we do not have to duplicate code.
    this.#workouts.forEach(work => {
      this._renderWorkout(work);
      //marker does not work because it is trying to add the marker right away but it needs to wait for the map to load. Async JS.
      //so renderworkoutmarker should be at the end of the load map function instead.
      //this._renderWorkoutMarker(work);
    });
  }

  //to be able to use this method in the console to reset the data
  reset() {
    localStorage.removeItem('workouts');
    //location is a big object that has the method to reload the page.
    //by using app.reset()
    location.reload();
  }
}

//Use the object blueprint (with an instance of it)
const app = new App();
