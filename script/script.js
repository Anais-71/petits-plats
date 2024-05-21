/**
 * @module RecipeModule
 */
import { recipeTemplate } from "./templates/recipe.js";
import { populateDropdowns } from "./factory/dropdown.js";

/**
 * @type {HTMLElement}
 * @description Selects the HTML element with class name "cards".
 */
const recipeSection = document.querySelector(".cards");

/**
 * @async
 * @function getRecipe
 * @description Fetches the recipe data from a JSON file.
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
 * @async
 * @function displayData
 * @description Displays the recipe data on the webpage.
 * @param {Array} recipes - The recipe data to display.
 */
async function displayData(recipes) {
    recipeSection.innerHTML = '';
    for (let i = 0; i < recipes.length; i++) {
        const recipe = recipes[i];
        const recipeModel = recipeTemplate(recipe);
        const userCardDOM = recipeModel.getRecipeDOM();
        recipeSection.appendChild(userCardDOM);
    }
    populateDropdowns(recipes); recipesCount()
}

/**
 * @async
 * @function init
 * @description Initializes the webpage by fetching and displaying the recipe data,
 * and adding event listeners to the filter options.
 */
async function init() {
    const data = await getRecipe();
    displayData(data);
    const searchBar = document.querySelector(".form-control");
    searchBar.addEventListener('keyup', search);

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
 * @function recipesCount
 * @description Updates the count of recipes displayed on the webpage.
 */
function recipesCount() {
    const recipesCount = document.querySelector('.count');
    recipesCount.innerHTML = `<span>${recipeSection.children.length}</span> recettes`;
}

/**
 * @type {Array}
 * @description Stores the items clicked by the user for filtering.
 */
export let clickedItems = [];

/**
 * @async
 * @function filter
 * @description Filters the recipe data based on the user's selection and updates the webpage.
 * @param {Event} event - The event object.
 */
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

async function search(event) {
    const searchText = event.target.value.toLowerCase();

    if (searchText.length < 3) {
        // If the search text is less than 3 characters, display all recipes
        const recipes = await getRecipe();
        displayData(recipes);
    } else {
        // If the search text is 3 characters or more, filter the recipes
        const recipes = await getRecipe();
        let filteredRecipes = [];

        for (let i = 0; i < recipes.length; i++) {
            const recipe = recipes[i];
            if (recipe.name.toLowerCase().includes(searchText)) {
                filteredRecipes.push(recipe);
            }
        }

        displayData(filteredRecipes);
    }
}