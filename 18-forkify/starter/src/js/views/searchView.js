import View from './View.js';

class SearchView extends View {
  _parentElement = document.querySelector('.search');

  getQuery() {
    const query = this._parentElement.querySelector('.search__field').value; // store the query
    this._clearInput(); // call the private clear input method everything we get a search query
    return query; //return the query after input is emptied
  }

  //Private method for clearing the input after a search is submitted
  _clearInput() {
    this._parentElement.querySelector('.search__field').value = '';
  }

  //Publisher function
  addHandlerSearch(handler) {
    this._parentElement.addEventListener('submit', function (e) {
      e.preventDefault;
      handler();
    });
  }
}

//Export a new object
export default new SearchView();
