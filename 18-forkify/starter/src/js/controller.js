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
const showRecipe = async function () {
  try {
    const res = await fetch(
      'https://forkify-api.herokuapp.com/api/v2/recipes/5ed6604691c37cdc054bd0bc'
    );
    const data = await res.json();
    if (!res.ok) throw new Error(`${data.message}, (${res.status})`);
    //destructuring the object into a new variable (no recipe needed because we destructure into the same namespace, data.data.recipe.
    let { recipe } = data.data;
    //renaming/reformatting the object (to remove underscores)
    recipe = {
      id: recipe.id,
      title: recipe.title,
      publisher: recipe.publisher,
      sourceUrl: recipe.source_url,
      image: recipe.image_url,
      servings: recipe.servings,
      cookingTime: recipe.cooking_time,
      ingredients: recipe.ingredients,
    };
    console.log(recipe);
  } catch (err) {
    alert(err);
  }
};

showRecipe();
