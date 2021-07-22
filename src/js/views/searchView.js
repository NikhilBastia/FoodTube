class SearchView {
  _parentEl = document.querySelector('.search');

  fetchQuery() {
    const query = this._parentEl.querySelector('.search__field').value;
    this._parentEl.querySelector('.search__field').value = '';
    return query;
  }

  generateSeachHandler(handler) {
    this._parentEl.addEventListener('submit', function (ev) {
      ev.preventDefault();
      handler();
    });
  }
}

export default new SearchView();
