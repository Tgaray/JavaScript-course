class SearchView {
  #parentElement = document.querySelector('.search');

  getQuery() {
    const query = this.#parentElement.querySelector('.search__field').value; // store the query
    this.#clearInput(); // call the private clear input method everything we get a search query
    return query; //return the query after input is emptied
  }

  //Private method for clearing the input after a search is submitted
  #clearInput() {
    this.#parentElement.querySelector('.search__field').value = '';
  }

  //Publisher function
  addHandlerSearch(handler) {
    this.#parentElement.addEventListener('submit', function (e) {
      e.preventDefault;
      handler();
    });
  }
}

export default new SearchView();
