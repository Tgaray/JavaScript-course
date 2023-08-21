import { async } from 'regenerator-runtime';
import { API_URL, RES_PER_PAGE, KEY } from './config.js';
// import { getJSON, sendJSON } from './helpers.js';
import { AJAX } from './helpers.js';

export const state = {
  recipe: {},
  search: {
    query: '',
    results: [],
    page: 1,
    resultsPerPage: RES_PER_PAGE,
  },
  bookmarks: [],
};

const createRecipeObject = function (data) {
  //destructuring the object into a new variable (no recipe needed because we destructure into the same namespace, data.data.recipe.
  const { recipe } = data.data;
  //renaming/reformatting the object (to remove underscores)
  return {
    id: recipe.id,
    title: recipe.title,
    publisher: recipe.publisher,
    sourceUrl: recipe.source_url,
    image: recipe.image_url,
    servings: recipe.servings,
    cookingTime: recipe.cooking_time,
    ingredients: recipe.ingredients,
    ...(recipe.key && { key: recipe.key }), //short circuiting (check if recipe.key is a falsey value, then nothing happens, if it does exist spread/destructure it into the Object)
  };
};

export const loadRecipe = async function (id) {
  try {
    const data = await AJAX(`${API_URL}${id}?key=${KEY}`);
    state.recipe = createRecipeObject(data);

    //loop through the searched recipe bookmarks and if the id is the same its bookmarked
    if (state.bookmarks.some(bookmark => bookmark.id === id))
      state.recipe.bookmarked = true;
    else {
      state.recipe.bookmarked = false;
    }

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
    const data = await AJAX(`${API_URL}?search=${query}&key=${KEY}`);
    console.log(data);

    state.search.results = data.data.recipes.map(rec => {
      return {
        id: rec.id,
        title: rec.title,
        publisher: rec.publisher,
        sourceUrl: rec.source_url,
        image: rec.image_url,
        ...(rec.key && { key: rec.key }), //short circuiting (check if recipe.key is a falsey value, then nothing happens, if it does exist spread/destructure it into the Object)
      };
    });
    //Whenever we load new search results change the page back to 1
    state.search.page = 1;
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

const persistBookmarks = function () {
  localStorage.setItem('bookmarks', JSON.stringify(state.bookmarks));
};

//Bookmarks
export const addBookmark = function (recipe) {
  // Add bookmark
  state.bookmarks.push(recipe);

  // Mark current recipe as bookmark
  if (recipe.id === state.recipe.id) state.recipe.bookmarked = true;

  //Persisting data
  persistBookmarks();
};

export const deleteBookmark = function (id) {
  // Delete bookmark
  const index = state.bookmarks.findIndex(el => el.id === id);
  state.bookmarks.splice(index, 1);

  // Mark current recipe as NOT bookmarked
  if (id === state.recipe.id) state.recipe.bookmarked = false;

  //Persisting data
  persistBookmarks();
};

//Init function not storing the bookmark data in the state, because we might have nothing in the storage
const init = function () {
  const storage = localStorage.getItem('bookmarks');
  if (storage) state.bookmarks = JSON.parse(storage);
};

init();
console.log(state.bookmarks);

//Function we might want to call during development to clear bookmarks
const clearBookmarks = function () {
  localStorage.clear('bookmarks');
};
// clearBookmarks(); // take out init in this case because that adds them first

export const uploadRecipe = async function (newRecipe) {
  try {
    //we want to select the recipe that is added and convert it to an object as we receive from the API (use map to take the data out of the string and put it in an object)
    const ingredients = Object.entries(newRecipe)
      .filter(entry => entry[0].startsWith('ingredient') && entry[1] !== '')
      .map(ing => {
        const ingArr = ing[1].split(',').map(el => el.trim()); // not removing all spaces just on the outside
        // const ingArr = ing[1].replaceAll(' ', '').split(','); // removed all spaces
        if (ingArr.length !== 3)
          throw new Error(
            'Wrong ingredient format! Please use the correct format.'
          );
        const [quantity, unit, description] = ingArr;
        return { quantity: quantity ? +quantity : null, unit, description };
      }); // should return an array of three elements (desctruct this array) in right names and when the quanitity number (see +) is not there return null

    const recipe = {
      title: newRecipe.title,
      source_url: newRecipe.sourceUrl,
      image_url: newRecipe.image,
      publisher: newRecipe.publisher,
      cooking_time: +newRecipe.cookingTime,
      servings: +newRecipe.servings,
      ingredients,
    };

    const data = await AJAX(`${API_URL}?key=${KEY}`, recipe);
    state.recipe = createRecipeObject(data);
    addBookmark(state.recipe);
  } catch (err) {
    throw err;
  }
};
