//Import everything from the model
import * as model from './model.js';
import recipeView from './views/recipeView.js';
import 'core-js/stable';
import 'regenerator-runtime/runtime';

const recipeContainer = document.querySelector('.recipe');

const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};

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
    alert(err);
  }
};

controlRecipes();

//Kind of duplicate code so better to put in an array
// window.addEventListener('hashchange', controlRecipes);
// window.addEventListener('load', controlRecipes);

//Same as above but in one line and you can add more events to it
['hashchange', 'load'].forEach(event =>
  window.addEventListener(event, controlRecipes)
);
