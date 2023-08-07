//Import everything from the model
import * as model from './model.js';
import recipeView from './views/recipeView.js';
import 'core-js/stable';
import 'regenerator-runtime/runtime';

const recipeContainer = document.querySelector('.recipe');

// https://forkify-api.herokuapp.com/v2

///////////////////////////////////////
const controlRecipes = async function () {
  try {
    //Getting the hash
    const id = window.location.hash.slice(1);
    console.log(id);

    //Guard clause for when there is no id (that we don't get a never ending spinner and empty id string) then return
    if (!id) return;
    //Render spinner
    recipeView.renderSpinner();

    //1 Loading recipe
    await model.loadRecipe(id);

    //2 Rendering recipe
    recipeView.render(model.state.recipe);
  } catch (err) {
    recipeView.renderError();
  }
};

//Subscriber passes the function as an argument to the view
const init = function () {
  recipeView.addHandlerRender(controlRecipes);
};
init();
