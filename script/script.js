import { recipeTemplate } from "./templates/recipe.js";
import { populateDropdowns } from "./factory/dropdown.js";
import { searchText } from "./search_dropdown.js";

/**
 * Selects the HTML element with class name "cards".
 * @type {HTMLElement}
 */
const recipeSection = document.querySelector(".cards");

/**
 * Fetches the recipe data from a JSON file.
 * @async
 * @function
 * @returns {Promise<Array>} A promise that resolves with the recipe data.
 * @throws Will throw an error if the fetch operation fails.
 */

export async function getRecipe() {
    try {
        const response = await fetch('../data/recipes.json');
        if (!response.ok) { throw new Error(`HTTP error! status: ${response.status}`); }

        const data = await response.json();
        return data.recipe;
    }
    catch (error) {
        console.log('There was a problem with the fetch operation: ' + error.message);
    }
}

/**
 * Displays the recipe data on the webpage.
 * @async
 * @function
 * @param {Array} recipes - The recipe data to display.
 */
async function displayData(recipes) {
    recipeSection.innerHTML = '';
    recipes.forEach((recipe) => {
        const recipeModel = recipeTemplate(recipe);
        const userCardDOM = recipeModel.getRecipeDOM();
        recipeSection.appendChild(userCardDOM);
    });
    populateDropdowns(recipes); recipesCount()
}

/**
 * Initializes the webpage by fetching and displaying the recipe data,
 * and adding event listeners to the filter options.
 * @async
 * @function
 */
async function init() {
    const data = await getRecipe();
    displayData(data);
    const ing = document.querySelectorAll(".card-text-ingredient");
    const appliance = document.querySelectorAll(".appliance");
    const ustensil = document.querySelectorAll(".ustensil");
    const lists = [ing, appliance, ustensil];
    for (let i = 0; i < lists.length; i++) {
        for (let j = 0; j < lists[i].length; j++) {
            lists[i][j].addEventListener('click', filter);
        }
    }
}

init();

/**
 * Updates the count of recipes displayed on the webpage.
 * @function
 */
function recipesCount() {
    const recipesCount = document.querySelector('.count');
    recipesCount.innerHTML = `<span>${recipeSection.children.length}</span> recettes`;
}

/**
 * Filters the recipe data based on the user's selection and updates the webpage.
 * @async
 * @function
 * @param {Event} event - The event object.
 */
export let clickedItems = [];

export async function filter(event) {
    const clicked = event.target.innerHTML.toLowerCase();
    clickedItems.push(clicked);

    const recipeSection = document.querySelector(".cards");
    recipeSection.innerHTML = '';
    const recipes = await getRecipe();
    let filteredRecipes = [];

    for (let i = 0; i < recipes.length; i++) {
        const recipe = recipes[i];
        let match = true;

        for (let j = 0; j < clickedItems.length; j++) {
            if (!(recipe.ingredients.map(ingredient => ingredient.ingredient.toLowerCase()).includes(clickedItems[j]) ||
                recipe.appliance.toLowerCase() === clickedItems[j] ||
                recipe.ustensils.map(ustensil => ustensil.toLowerCase()).includes(clickedItems[j]) ||
                recipe.name.toLowerCase().includes(clickedItems[j]) ||
                recipe.description.toLowerCase().includes(clickedItems[j]))) {
                match = false;
                break;
            }
        }

        if (match) { filteredRecipes.push(recipe); }
    }

    displayData(filteredRecipes);
}