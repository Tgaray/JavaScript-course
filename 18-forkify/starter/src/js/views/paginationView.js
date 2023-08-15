import View from './View.js';
import icons from 'url:../../img/icons.svg'; //Parcel2

class PaginationView extends View {
  _parentElement = document.querySelector('.pagination');

  //Publisher
  addHandlerClick(handler) {
    this._parentElement.addEventListener('click', function (e) {
      const btn = e.target.closest('.btn--inline');
      console.log(btn);
      // guard clause, this should only work when there is a button
      if (!btn) return;
      const goToPage = +btn.dataset.goto; // + to make it a number
      //pass the page into the handler
      handler(goToPage); //controlPagination
    });
  }

  _generateMarkup() {
    const curPage = this._data.page;
    const numPages = Math.ceil(
      this._data.results.length / this._data.resultsPerPage
    );
    const backward = this._generateMarkupBackwardBtn(curPage);
    const forward = this._generateMarkupForwardBtn(curPage);

    console.log(numPages);
    //Scenario1: page 1, and there are other pages
    if (curPage === 1 && numPages > 1) {
      return forward;
    }
    //Scenario2: Last page
    if (curPage === numPages && numPages > 1) {
      return backward;
    }
    //Scenario3: Other page
    if (curPage < numPages) {
      return backward + forward;
    }
    //Scenario4: page 1, and there are NO other pages return nothing because we don't have pages
    return '';
  }

  _generateMarkupForwardBtn(curPage) {
    return `       
    <button data-goto="${
      curPage + 1
    }" class="btn--inline pagination__btn--next">
        <span>Page ${curPage + 1}</span>
        <svg class="search__icon">
            <use href="${icons}#icon-arrow-right"></use>
        </svg>
    </button>
    `;
  }

  _generateMarkupBackwardBtn(curPage) {
    return `       
    <button data-goto="${
      curPage - 1
    }" class="btn--inline pagination__btn--prev">
        <svg class="search__icon">
            <use href="${icons}#icon-arrow-left"></use>
        </svg>
        <span>Page ${curPage - 1}</span>
    </button>
    `;
  }
}

//Export a new object
export default new PaginationView();
