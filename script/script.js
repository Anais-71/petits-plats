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
    const searchBar = document.querySelector(".form-control");
    searchBar.addEventListener('keyup', search);

    const ing = document.querySelectorAll(".card-text-ingredient");
    const appliance = document.querySelectorAll(".appliance");
    const ustensil = document.querySelectorAll(".ustensil");
    const lists = [ing, appliance, ustensil];
    lists.forEach(list => {
        list.forEach(item => {
            item.addEventListener('click', filter);
        });
    });
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

    recipes.forEach(recipe => {
        let match = clickedItems.every(clickedItem =>
            recipe.ingredients.map(ingredient => ingredient.ingredient.toLowerCase()).includes(clickedItem) ||
            recipe.appliance.toLowerCase() === clickedItem ||
            recipe.ustensils.map(ustensil => ustensil.toLowerCase()).includes(clickedItem) ||
            recipe.name.toLowerCase().includes(clickedItem) ||
            recipe.description.toLowerCase().includes(clickedItem)
        );

        if (match) { filteredRecipes.push(recipe); }
    });

    displayData(filteredRecipes);
}

async function search(event) {
    const searchText = event.target.value.toLowerCase();

    const recipes = await getRecipe();

    if (searchText.length < 3) {
        // If the search text is less than 3 characters, display all recipes
        displayData(recipes);
    } else {
        // If the search text is 3 characters or more, filter the recipes
        let filteredRecipes = recipes.filter(recipe => recipe.name.toLowerCase().includes(searchText));
        displayData(filteredRecipes);
    }
}