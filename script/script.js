/**
 * Import the recipe template and dropdown population functions.
 */
import { recipeTemplate } from './templates/recipe.js';
import { populateDropdowns } from './factory/dropdown.js';

/**
 * Select the section of the document where the recipes will be displayed.
 */
const recipeSection = document.querySelector(".cards");

/**
 * Fetch the recipe data from a JSON file.
 * @async
 * @function
 * @returns {Promise<Array>} A promise that resolves with an array of recipes.
 * @throws Will throw an error if the fetch operation fails.
 */
export async function getRecipe() {
    try {
        const response = await fetch('../data/recipes.json');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        return data.recipe; // Return the array of recipes
    } catch (error) {
        console.log('There was a problem with the fetch operation: ' + error.message);
    }
}

/**
 * The text that the user is searching for.
 */
let searchText = '';

/**
 * Display the recipe data in the document.
 * @async
 * @function
 * @param {Array} recipes - The array of recipes to display.
 */
export async function displayData(recipes) {
    // Clear the recipe section
    recipeSection.innerHTML = '';

    recipes.forEach((recipe) => {
        // DOM elements creation
        const recipeModel = recipeTemplate(recipe);
        const userCardDOM = recipeModel.getRecipeDOM();
        recipeSection.appendChild(userCardDOM);
    });

    // Update the dropdowns
    populateDropdowns(recipes);

    recipesCount()
}

/**
 * Initialize the application.
 * @async
 * @function
 */
async function init() {
    // Recipe data recovery 
    const data = await getRecipe();
    displayData(data);

    // Get DOM elements after they have been created
    const ing = document.querySelectorAll(".card-text-ingredient");
    const appliance = document.querySelectorAll(".appliance");
    const ustensil = document.querySelectorAll(".ustensil");

    // For loop to filter with dropdowns
    const lists = [ing, appliance, ustensil];

    for (let i = 0; i < lists.length; i++) {
        for (let j = 0; j < lists[i].length; j++) {
            lists[i][j].addEventListener('click', filter); // Add event listener to each item of the lists
        }
    }
}

init();

/**
 * Filter the recipes based on the user's search text.
 * @async
 * @function
 * @param {Event} event - The event that triggered the filter function.
 */
export async function filter(event) {
    const clicked = event.target.innerHTML.toLowerCase();
    // Clean previous cards
    const recipeSection = document.querySelector(".cards");
    recipeSection.innerHTML = '';

    // Recipe data recovery 
    const recipes = await getRecipe();

    // Create an empty array to store the filtered recipes
    let filteredRecipes = [];

    for (let i = 0; i < recipes.length; i++) {
        const recipe = recipes[i];
        if ((recipe.ingredients.map(ingredient => ingredient.ingredient.toLowerCase()).includes(clicked) || 
            recipe.appliance.toLowerCase() === clicked || recipe.ustensils.map(ustensil => ustensil.toLowerCase()).includes(clicked) ||
            recipe.name.toLowerCase().includes(clicked) ||
            recipe.description.toLowerCase().includes(clicked)) &&
            (recipe.ingredients.map(ingredient => ingredient.ingredient.toLowerCase()).includes(searchText.toLowerCase()) ||
            recipe.appliance.toLowerCase().includes(searchText.toLowerCase()) ||
            recipe.ustensils.map(ustensil => ustensil.toLowerCase()).includes(searchText.toLowerCase()) ||
            recipe.name.toLowerCase().includes(searchText.toLowerCase()) ||
            recipe.description.toLowerCase().includes(searchText.toLowerCase()))) {
            filteredRecipes.push(recipe);
        }
    }

    // Display the filtered recipes
    displayData(filteredRecipes);
}

/**
 * Count the number of recipes and display it in the header.
 */
function recipesCount() {
    const recipesCount = document.querySelector('.count');
    recipesCount.innerHTML = `<span>${recipeSection.children.length}</span> recettes`;
}