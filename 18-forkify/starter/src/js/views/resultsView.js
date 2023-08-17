import View from './View.js';
import icons from 'url:../../img/icons.svg'; //Parcel2

class resultsView extends View {
  _parentElement = document.querySelector('.results');
  _errorMessage =
    'No recipes found for your query! Please try again with another query.';
  _message = '';

  _generateMarkup() {
    console.log(this._data); //to see the data object we pass into this function from the controller
    //we want to return this markup for each of the items in the whole array and then join everything together:
    return this._data.map(this._generateMarkupPreview).join('');
  }

  _generateMarkupPreview(result) {
    //Give the class active to the active recipe
    const id = window.location.hash.slice(1);
    //we could put all of this in the map method but we create another method to make it a bit cleaner
    return `       
        <li class="preview">
            <a class="preview__link ${
              result.id === id ? 'preview__link--active' : ''
            }" href="#${result.id}">
              <figure class="preview__fig">
                <img src="${result.image}" alt="${result.title}" />
              </figure>
              <div class="preview__data">
                <h4 class="preview__title">${result.title}</h4>
                <p class="preview__publisher">${result.publisher}</p>
              </div>
            </a>
        </li>
    `;
  }
}

export default new resultsView();
