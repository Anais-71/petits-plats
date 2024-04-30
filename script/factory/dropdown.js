import { filter } from "../script.js";
import { getRecipe } from "../script.js";

/**
 * Class representing a factory for creating list items.
 */
class ListItemFactory {
  /**
   * Create a list item.
   * @param {string} text - The text content of the list item.
   * @return {HTMLElement} The created list item.
   */
  createListItem(text) {
    const li = document.createElement('li');
    li.textContent = text.charAt(0).toUpperCase() + text.slice(1);
    li.classList.add('dropdown-item');
    return li;
  }
}

/**
 * Populate dropdowns with unique sorted ingredients, appliances, and utensils from recipes.
 * @param {Array} recipes - The recipes to extract data from.
 */
export async function populateDropdowns(recipes) {
  const dropdowns = {
    ingredients: document.querySelector('.dropdown-ingredients ul'),
    appareils: document.querySelector('.dropdown-appareils ul'),
    ustensiles: document.querySelector('.dropdown-ustensiles ul')
  };

  const factory = new ListItemFactory();

  try {
    // Clear the dropdowns
    dropdowns.ingredients.innerHTML = '';
    dropdowns.appareils.innerHTML = '';
    dropdowns.ustensiles.innerHTML = '';

    const uniqueIngredients = new Set();
    const uniqueAppareils = new Set();
    const uniqueUstensiles = new Set();

    recipes.forEach(recipe => {
      if (recipe.ingredients) {
        recipe.ingredients.forEach(ingredient => {
          uniqueIngredients.add(ingredient.ingredient.toLowerCase());
        });
      }
      
      uniqueAppareils.add(recipe.appliance.toLowerCase());
    
      if (recipe.ustensiles) {
        recipe.ustensiles.forEach(ustensil => {
          uniqueUstensiles.add(ustensil.toLowerCase());
        });
      }
    });    

    const sortedIngredients = Array.from(uniqueIngredients).sort();
    const sortedAppareils = Array.from(uniqueAppareils).sort();
    const sortedUstensiles = Array.from(uniqueUstensiles).sort();

    dropdowns.ingredients.append(...sortedIngredients.map(item => {
      const li = factory.createListItem(item);
      li.addEventListener('click', filter);
      return li;
    }));

    dropdowns.appareils.append(...sortedAppareils.map(item => {
      const li = factory.createListItem(item);
      li.addEventListener('click', filter);
      return li;
    }));

    dropdowns.ustensiles.append(...sortedUstensiles.map(item => {
      const li = factory.createListItem(item);
      li.addEventListener('click', filter);
      return li;
    }));

  } catch (error) {
    console.error('Error fetching data:', error);
  }
}

/**
 * IIFE to populate dropdowns with recipes data.
 */
(async () => {
  const recipes = await getRecipe();
  populateDropdowns(recipes);
})();

//Type search function inside each list
// Add event listeners to buttons
let searchIngredient = document.querySelector(".dropdown-ingredients-search");
const btnIngredient = document.querySelector(".search-ingredient");
btnIngredient.addEventListener('click', ingredientSearch);
let searchAppliance = document.querySelector(".dropdown-appliances-search");
const btnAppliance = document.querySelector(".search-appliance");
btnAppliance.addEventListener('click', applianceSearch);
let searchUstensil = document.querySelector(".dropdown-ustensils-search");
const btnUstensil = document.querySelector(".search-ustensil");
btnUstensil.addEventListener('click', ustensilSearch);

// Add event listeners to input elements for the 'Enter' key
searchIngredient.addEventListener('keydown', function(event) {
  if (event.key === 'Enter') {
      ingredientSearch(searchIngredient.value, event);
  }
});
searchAppliance.addEventListener('keydown', function(event) {
if (event.key === 'Enter') {
    applianceSearch(searchAppliance.value);
}
});
searchUstensil.addEventListener('keydown', function(event) {
if (event.key === 'Enter') {
    ustensilSearch(searchUstensil.value);
}
});

//Tables to store sected elements
let selectedIngredients = [];
let selectedAppliances = [];
let selectedUstensils = [];

function ingredientSearch(searchTerm) {
  if (searchTerm.length >= 3) {
    const listItems = Array.from(document.querySelectorAll('.dropdown-ingredients li'));
    const listItem = listItems.find(item => item.textContent.includes(searchTerm));
    if (listItem && !selectedIngredients.includes(listItem.textContent)) {
      selectedIngredients.push(listItem.textContent);
      listItem.classList.add('selected');
      listItem.click();
    }
  }
}

function applianceSearch(searchTerm) {
  if (searchTerm.length >= 3) {
    const listItems = Array.from(document.querySelectorAll('.dropdown-appareils li'));
    const listItem = listItems.find(item => item.textContent.includes(searchTerm));
    if (listItem && !selectedAppliances.includes(listItem.textContent)) {
      selectedAppliances.push(listItem.textContent);
      listItem.classList.add('selected');
      listItem.click();
    }
  }
}

function ustensilSearch(searchTerm) {
  if (searchTerm.length >= 3) {
    const listItems = Array.from(document.querySelectorAll('.dropdown-ustensiles li'));
    const listItem = listItems.find(item => item.textContent.includes(searchTerm));
    if (listItem && !selectedUstensils.includes(listItem.textContent)) {
      selectedUstensils.push(listItem.textContent);
      listItem.classList.add('selected'); 
      listItem.click();
    }
  }
}