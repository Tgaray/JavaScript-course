import { async } from 'regenerator-runtime';
import { API_URL, RES_PER_PAGE } from './config.js';
import { getJSON } from './helpers.js';

export const state = {
  recipe: {},
  search: {
    query: '',
    results: [],
    page: 1,
    resultsPerPage: RES_PER_PAGE,
  },
};

export const loadRecipe = async function (id) {
  try {
    const data = await getJSON(`${API_URL}${id}`);
    //destructuring the object into a new variable (no recipe needed because we destructure into the same namespace, data.data.recipe.
    const { recipe } = data.data;
    //renaming/reformatting the object (to remove underscores)
    state.recipe = {
      id: recipe.id,
      title: recipe.title,
      publisher: recipe.publisher,
      sourceUrl: recipe.source_url,
      image: recipe.image_url,
      servings: recipe.servings,
      cookingTime: recipe.cooking_time,
      ingredients: recipe.ingredients,
    };
    console.log(state.recipe);
  } catch (err) {
    //throw the error here again, now to the next propagated place so we can use the error message in the view
    console.error(`${err} 💥💥`);
    throw err;
  }
};

export const loadSearchResults = async function (query) {
  try {
    state.search.query = query;
    const data = await getJSON(`${API_URL}?search=${query}`);
    console.log(data);

    state.search.results = data.data.recipes.map(rec => {
      return {
        id: rec.id,
        title: rec.title,
        publisher: rec.publisher,
        sourceUrl: rec.source_url,
        image: rec.image_url,
      };
    });
  } catch (err) {
    console.error(`${err} 💥💥`);
    throw err; //to propagate error
  }
};

//not an async function because we already have all the search results loaded when we call this function, all it should do is get the state for and get the data for the page that is being requested
export const getSearchResultsPage = function (page = state.search.page) {
  //The page we are on at the moment:
  state.search.page = page;
  //calculate the amount (and which of the) items we can display on the page, we don't want to hardcode these
  const start = (page - 1) * state.search.resultsPerPage; // 0
  const end = page * state.search.resultsPerPage; // 9
  //return only the part of the results that we need
  return state.search.results.slice(start, end);
};

export const updateServings = function (newServings) {
  state.recipe.ingredients.forEach(ing => {
    ing.quantity = (ing.quantity * newServings) / state.recipe.servings;
    // formula: newQt = oldQt * newServings / oldServings // 2 * 8 / 4 = 4
  });

  //update the state with the new servings amount
  state.recipe.servings = newServings;
};
