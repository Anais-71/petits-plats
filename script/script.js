import { recipeTemplate } from './templates/recipe.js';

async function getRecipe() {
    const response = await fetch('././data/recipes.json');
    const recipe = await response.json();
    return recipe;
}

async function displayData(recipes) {
    const recipeSection = document.querySelector(".cards");

    recipes.forEach((recipe) => {
        // DOM elements creation
        const recipeModel = recipeTemplate(recipe);
        const userCardDOM = recipeModel.getRecipeDOM();
        recipeSection.appendChild(userCardDOM);
    });
    recipesCount()
}

async function init() {
    // Recipe data recovery 
    const { recipe } = await getRecipe();
    displayData(recipe);
}

init();

// Recipes count
function recipesCount() {
    var recipes = document.querySelectorAll(".card");
    var countElement = document.getElementById("count");
    countElement.textContent = recipes.length + " recettes";
}