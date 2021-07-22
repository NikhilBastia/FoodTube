import ParentView from './parentView';
import icons from 'url:../../img/icons.svg';

class PageView extends ParentView {
  _parentElement = document.querySelector('.pagination');

  addClickevent(handler) {
    this._parentElement.addEventListener('click', function (e) {
      const btn = e.target.closest('.btn--inline');
      if (!btn) return;
      const gotoPage = +btn.dataset.goto;
      handler(gotoPage);
    });
  }

  _generateMarkup() {
    const numPage = Math.ceil(
      this._data.results.length / this._data.resultsPerPage
    );
    const currPage = +this._data.page;
    //First Page
    if (numPage > 1 && currPage === 1) {
      return `
        <button data-goto=${
          currPage + 1
        } class="btn--inline pagination__btn--next">
          <span>Page ${currPage + 1}</span>
          <svg class="search__icon">
            <use href="${icons}#icon-arrow-right"></use>
          </svg>
        </button> 
      `;
    }

    if (currPage > 1 && numPage > currPage) {
      return `
          <button data-goto=${
            currPage - 1
          } class="btn--inline pagination__btn--prev">
            <span>Page ${currPage - 1}</span>
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-left"></use>
            </svg>
          </button> 
          <button data-goto=${
            currPage + 1
          } class="btn--inline pagination__btn--next">
            <span>Page ${currPage + 1}</span>
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-right"></use>
            </svg>
          </button> 
        `;
    }

    if (currPage == numPage) {
      return `
      <button data-goto=${
        currPage - 1
      } class="btn--inline pagination__btn--prev">
      <span>Page ${currPage - 1}</span>
      <svg class="search__icon">
        <use href="${icons}#icon-arrow-left"></use>
      </svg>
    </button>
      `;
    } else {
      return ``;
    }
  }
}

export default new PageView();
