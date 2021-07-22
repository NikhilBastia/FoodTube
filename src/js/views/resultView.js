import ParentView from './parentView';
import icons from 'url:../../img/icons.svg';

class ResultView extends ParentView {
  _parentElement = document.querySelector('.results');
  _error = "Sorry, couldn't find your recipe.";

  renderError(error) {
    const markup = `
    <div class="error">
    <div>
      <svg>
        <use href="${icons}#icon-alert-triangle"></use>
      </svg>
    </div>
    <p>${this._error}</p>
  </div>
    `;
    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }

  _generateMarkup() {
    console.log(`tiger:${this._data}`);
    return this._data.map(this._generatePreview).join('');
  }

  _generatePreview(res) {
    const id = window.location.hash.slice(1);
    console.log('res.id', res.id);
    console.log('id', id);
    return `
    <li class="preview">
            <a class="preview__link ${
              res.id === id ? 'preview__link--active' : ''
            }" href="#${res.id}">
              <figure class="preview__fig">
                <img src="${res.image}" alt="${res.title}" />
              </figure>
              <div class="preview__data">
                <h4 class="preview__title">${res.title}</h4>
                <p class="preview__publisher">${res.publisher}</p>x
              </div>
            </a>
          </li>
        `;
  }
}

export default new ResultView();
