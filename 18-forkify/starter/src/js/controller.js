//Import everything from the model
import * as model from './model.js';
import recipeView from './views/recipeView.js';
import searchView from './views/searchView.js';
import resultsView from './views/resultsView.js';

import 'core-js/stable';
import 'regenerator-runtime/runtime';

//Hot module reloading:
if (module.hot) {
  module.hot.accept();
}

const controlRecipes = async function () {
  try {
    // 1) Getting the hash
    const id = window.location.hash.slice(1);
    //Guard clause for when there is no id (that we don't get a never ending spinner and empty id string) then return
    if (!id) return;
    //Render spinner
    recipeView.renderSpinner();

    // 2) Loading recipe
    await model.loadRecipe(id);

    // 3) Rendering recipe
    recipeView.render(model.state.recipe);
  } catch (err) {
    recipeView.renderError();
  }
};

const controlSearchResults = async function () {
  try {
    resultsView.renderSpinner();
    // 1) Get search query
    const query = searchView.getQuery();
    //guard clause if there is no query
    if (!query) return;

    // 2) Load search results
    await model.loadSearchResults(query);

    // 3) Render results
    // console.log(model.state.search.results, model.state.search.query);
    resultsView.render(model.state.search.results);
  } catch (err) {
    console.log(err);
  }
};

//Subscriber passes the function as an argument to the correct view subscriber function
const init = function () {
  recipeView.addHandlerRender(controlRecipes);
  searchView.addHandlerSearch(controlSearchResults);
};
init();
