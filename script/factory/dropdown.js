import { filter,getRecipe } from "../script.js";

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

    sortedIngredients.forEach(item => {
      const li = factory.createListItem(item);
      li.addEventListener('click', filter);
      dropdowns.ingredients.appendChild(li);
    });

    sortedAppareils.forEach(item => {
      const li = factory.createListItem(item);
      li.addEventListener('click', filter);
      dropdowns.appareils.appendChild(li);
    });

    sortedUstensiles.forEach(item => {
      const li = factory.createListItem(item);
      li.addEventListener('click', filter);
      dropdowns.ustensiles.appendChild(li);
    });

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

function ingredientSearch(searchTerm, event) {
  const listItems = document.querySelectorAll('.dropdown-ingredients li');
  for (let i = 0; i < listItems.length; i++) {
    if (listItems[i].textContent === searchTerm) {
      listItems[i].click();
      break;
    }
  }
}

function applianceSearch(searchTerm) {
  const listItems = document.querySelectorAll('.dropdown-appareils li');
  for (let i = 0; i < listItems.length; i++) {
    if (listItems[i].textContent === searchTerm) {
      listItems[i].click();
      break;
    }
  }
}

function ustensilSearch(searchTerm) {
  const listItems = document.querySelectorAll('.dropdown-ustensiles li');
  for (let i = 0; i < listItems.length; i++) {
    if (listItems[i].textContent === searchTerm) {
      listItems[i].click();
      break;
    }
  }
}