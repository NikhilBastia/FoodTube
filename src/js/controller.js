import 'core-js/stable';
import 'regenerator-runtime/runtime';
import * as model from './model';
import recipeObj from './views/recipeView';
import searchObj from './views/searchView';
import resultObj from './views/resultView';
import pageObj from './views/paginationView';
import bookmarkObj from './views/bookmarksView';

const recipeContainer = document.querySelector('.recipe');

if (module.hot) {
  module.hot.accept();
}

// https://forkify-api.herokuapp.com/v2

///////////////////////////////////////
const showRecipe = async function () {
  try {
    const id = window.location.hash.slice(1);
    if (!id) return;
    console.log(id);

    //Render loader spinner
    recipeObj.renderSpinner();

    resultObj.render(model.getSearchResults());

    bookmarkObj.render(model.state.bookmarks);

    //Generate necessary data for the specific recipe
    //by providing the 'id' of that recipe in the following function
    await model.loadRecipe(id);

    recipeObj.render(model.state.recipe);
  } catch (error) {
    console.log(error);
    recipeObj.renderError(error);
  }
};

const showSearchResults = async function () {
  try {
    resultObj.renderSpinner();
    // 1. Fetching recipe query from user
    const query = searchObj.fetchQuery();

    if (!query) return;

    // 2. Fetching various recipes from the api using the query
    await model.searchRecipe(query);

    // 3 Rendering the results for various recipes
    console.log(model.state.search.results);
    console.log(model.getSearchResults(1));
    resultObj.render(model.getSearchResults());

    // 4 For Pagination
    pageObj.render(model.state.search);
  } catch (error) {
    console.log(error);
  }
};

const controlServing = function name(newServings) {
  model.updateServings(newServings);

  recipeObj.render(model.state.recipe);
};

const controlPagination = function (gotoPage) {
  // 3 Rendering the results for various recipes
  resultObj.render(model.getSearchResults(gotoPage));

  // 4 For Pagination
  pageObj.render(model.state.search);
};

const controlAddBookmark = function () {
  if (!model.state.recipe.bookmarked) model.addBookmark(model.state.recipe);
  else model.deleteBookmark(model.state.recipe.id);

  recipeObj.render(model.state.recipe);

  bookmarkObj.render(model.state.bookmarks);
};

const init = function () {
  recipeObj.generateHandlerRender(showRecipe);
  recipeObj.addHandlerUpdateServings(controlServing);
  recipeObj.addHandlerAddBookmark(controlAddBookmark);

  searchObj.generateSeachHandler(showSearchResults);

  pageObj.addClickevent(controlPagination);
};

init();
