import View from './View.js';
import icons from 'url:../../img/icons.svg'; //Parcel2

class PreviewView extends View {
  _parentElement = '';
  _errorMessage =
    'No recipes found for your query! Please try again with another query.';
  _message = '';

  _generateMarkup() {
    //Give the class active to the active recipe
    const id = window.location.hash.slice(1);
    //we could put all of this in the map method but we create another method to make it a bit cleaner
    return `       
        <li class="preview">
            <a class="preview__link ${
              this._data.id === id ? 'preview__link--active' : ''
            }" href="#${this._data.id}">
              <figure class="preview__fig">
                <img src="${this._data.image}" alt="${this._data.title}" />
              </figure>
              <div class="preview__data">
                <h4 class="preview__title">${this._data.title}</h4>
                <p class="preview__publisher">${this._data.publisher}</p>
              </div>
            </a>
        </li>
    `;
  }
}

export default new PreviewView();
