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
