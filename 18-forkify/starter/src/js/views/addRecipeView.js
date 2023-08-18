import View from './View.js';
import icons from 'url:../../img/icons.svg'; //Parcel2

class AddRecipeView extends View {
  _parentElement = document.querySelector('.upload');
  _window = document.querySelector('.add-recipe-window');
  _overlay = document.querySelector('.overlay');
  _btnOpen = document.querySelector('.nav__btn--add-recipe');
  _btnClose = document.querySelector('.btn--close-modal');

  constructor() {
    super(); // only after this we can use the this keyword
    this._addHanlderShowWindow(); // only used in this class so marked as private (controller does not interfere at all)
    this._addHanlderHideWindow();
  }

  toggleWindow() {
    this._overlay.classList.toggle('hidden');
    this._window.classList.toggle('hidden');
  }

  _addHanlderShowWindow() {
    this._btnOpen.addEventListener('click', this.toggleWindow.bind(this));
  }

  _addHanlderHideWindow() {
    this._btnClose.addEventListener('click', this.toggleWindow.bind(this));
    this._overlay.addEventListener('click', this.toggleWindow.bind(this));
  }

  addHandlerUpload(handler) {
    this._parentElement.addEventListener('submit', function (e) {
      e.preventDefault(); // prevent the default action on the submit event
      const dataArr = [...new FormData(this)]; // take the form elements (this) and spread them into an array
      // console.log(data); // check data we want to get to the model to move/push it to the API with our new recipe (via controller function which will be the handler of this event)
      const data = Object.fromEntries(dataArr); // we want to convert these entries to an object
      handler(data);
    });
  }

  _generateMarkup() {}
}

//Export a new object (still have to import in the controller) otherwise this file will not be executed
export default new AddRecipeView();
