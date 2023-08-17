import View from './View.js';
import previewView from './previewView.js';
import icons from 'url:../../img/icons.svg'; //Parcel2

class BookmarksView extends View {
  _parentElement = document.querySelector('.bookmarks__list');
  _errorMessage = 'No bookmarks yet. Find a nice recipe and bookmark it.';
  _message = '';

  _generateMarkup() {
    console.log(this._data); //to see the data object we pass into this function from the controller
    //we want to return this markup for each of the items in the whole array and then join everything together:
    //We use the second 'false' parameter from here to set it to false in the View so that we still take in the data in the View (this._data = data) but instead of rendering it we have the generate markup return the bookmarks as a string / eventually an array of strings /
    return this._data
      .map(bookmark => previewView.render(bookmark, false))
      .join('');
  }
}

export default new BookmarksView();
