import View from './View.js';
import previewView from './previewView.js';
import icons from 'url:../../img/icons.svg'; //Parcel2

class ResultsView extends View {
  _parentElement = document.querySelector('.results');
  _errorMessage =
    'No recipes found for your query! Please try again with another query.';
  _message = '';

  _generateMarkup() {
    // console.log(this._data); //to see the data object we pass into this function from the controller
    //we want to return this markup for each of the items in the whole array and then join everything together:
    //We use the second 'false' parameter from here to set it to false in the View so that we still take in the data in the View (this._data = data) but instead of rendering it we have the generate markup return the bookmarks as a string / eventually an array of strings /
    return this._data.map(result => previewView.render(result, false)).join('');
  }
}

export default new ResultsView();
