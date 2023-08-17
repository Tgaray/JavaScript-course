import icons from 'url:../../img/icons.svg'; //Parcel2

export default class View {
  _data;

  render(data) {
    //Check if data actually exists (if not throw error), we do not have to pass in a message because there is a default parameter
    if (!data || (Array.isArray(data) && data.length === 0))
      return this.renderError();

    this._data = data;
    const markup = this._generateMarkup();
    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }

  update(data) {
    this._data = data;
    const newMarkup = this._generateMarkup();
    //Creates a DOM that lives in the memory not on the actual page (for comparing)
    const newDOM = document.createRange().createContextualFragment(newMarkup);
    //Select all the (new) elements in this virtual DOM
    const newElements = Array.from(newDOM.querySelectorAll('*'));
    //Select all the current elements in the DOM
    const curElements = Array.from(this._parentElement.querySelectorAll('*'));
    //Loop over the two arrays at the same time and check for differences
    newElements.forEach((newEl, i) => {
      const curEl = curElements[i];
      //So now how to compare the newEl to the curEl (A isEqualNode to B)
      // console.log(curEl, newEl.isEqualNode(curEl));

      // Updates changed -TEXT-
      if (
        !newEl.isEqualNode(curEl) &&
        //to check if it's TEXT (first child in an element node is text node)
        newEl.firstChild?.nodeValue.trim() !== ''
      ) {
        // console.log('🎊', newEl.firstChild.nodeValue.trim() !== '');
        curEl.textContent = newEl.textContent;
      }

      // Updates changed -ATTRIBUTES-
      if (!newEl.isEqualNode(curEl))
        // console.log(Array.from(newEl.attributes)); // replace all the attributes
        Array.from(newEl.attributes).forEach(attr =>
          curEl.setAttribute(attr.name, attr.value)
        );
    });
  }

  _clear() {
    this._parentElement.innerHTML = '';
  }

  //this will be a public method so that the controller can call it when its fetching the data
  renderSpinner() {
    const markup = `
        <div class="spinner">
          <svg>
              <use href="${icons}#icon-loader"></use>
          </svg>
        </div>
      `;
    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }

  //The error message is now set to be by default the one we defined
  renderError(message = this._errorMessage) {
    const markup = `
          <div class="error">
              <div>
                  <svg>
                      <use href="${icons}#icon-alert-triangle"></use>
                  </svg>
              </div>
              <p>${message}</p>
          </div>
      `;
    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }

  //Succes message
  renderMessage(message = this._message) {
    const markup = `
      <div class="recipe">
          <div class="message">
              <div>
                  <svg>
                  <use href="${icons}#icon-smile"></use>
                  </svg>
              </div>
          <p>${message}</p>
      </div>
      `;
    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }
}
