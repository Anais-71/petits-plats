/**
 * Imports the getRecipe and filter functions from the script.js file.
 */
import { getRecipe, filter, clickedItems } from "../script.js";

/**
 * Class representing a factory for creating list items.
 */
class ListItemFactory {
  /**
   * Creates a list item with the given text.
   * @param {string} text - The text to be displayed in the list item.
   * @returns {HTMLElement} The created list item.
   */
  createListItem(text) {
    const li = document.createElement('li');
    li.textContent = text.charAt(0).toUpperCase() + text.slice(1);
    li.classList.add('dropdown-item'); return li;
  }
}

/**
 * Populates the dropdowns with the recipe data.
 * @async
 * @function
 * @param {Array} recipes - The recipe data.
 * @throws Will throw an error if there is a problem fetching the data.
 */
export async function populateDropdowns(recipes) {
  const dropdowns = {
    ingredients: document.querySelector('.dropdown-ingredients ul'),
    appareils: document.querySelector('.dropdown-appareils ul'),
    ustensiles: document.querySelector('.dropdown-ustensiles ul')
  };

  const factory = new ListItemFactory();
  try {
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

    //Ingredients list
    sortedIngredients.forEach(item => {
      const li = factory.createListItem(item);
      li.addEventListener('click', function (event) {
        // Create new element
        const newElement = document.createElement('div');
        // Add .selected class to the new element
        newElement.classList.add('selected');
        // Add text to the new element
        newElement.textContent = event.target.textContent;
        // Add click event to remove the element when clicked
        newElement.addEventListener('click', function () {
          this.remove();
          const index = clickedItems.indexOf(this.textContent.toLowerCase());
          if (index > -1) {
            clickedItems.splice(index, 1);
          }
          filter(event);
        });
        // Finds the right section and add the element
        const filterSection = document.querySelector('.dropdown-ingredients');
        filterSection.appendChild(newElement);
        // Filter function 
        filter(event);
      });
      dropdowns.ingredients.appendChild(li);
    });

    //Appliances list
    sortedAppareils.forEach(item => {
      const li = factory.createListItem(item);
      li.addEventListener('click', function (event) {
        // Create new element
        const newElement = document.createElement('div');
        // Add .selected class to the new element
        newElement.classList.add('selected');
        // Add text to the new element
        newElement.textContent = event.target.textContent;
        // Add click event to remove the element when clicked
        newElement.addEventListener('click', function () {
          this.remove();
          const index = clickedItems.indexOf(this.textContent.toLowerCase());
          if (index > -1) {
            clickedItems.splice(index, 1);
          }
          filter(event);
        });
        // Finds the right section and add the element
        const filterSection = document.querySelector('.dropdown-appareils');
        filterSection.appendChild(newElement);
        // Filter function 
        filter(event);
      });
      dropdowns.appareils.appendChild(li);
    });

    //Ustensils list
    sortedUstensiles.forEach(item => {
      const li = factory.createListItem(item);
      li.addEventListener('click', function (event) {
        // Create new element
        const newElement = document.createElement('div');
        // Add .selected class to the new element
        newElement.classList.add('selected');
        // Add text to the new element
        newElement.textContent = event.target.textContent;
        // Add click event to remove the element when clicked
        newElement.addEventListener('click', function () {
          this.remove();
          const index = clickedItems.indexOf(this.textContent.toLowerCase());
          if (index > -1) {
            clickedItems.splice(index, 1);
          }
          filter(event);
        });
        // Finds the right section and add the element
        const filterSection = document.querySelector('.dropdown-ustensiles');
        filterSection.appendChild(newElement);
        // Filter function 
        filter(event);
      });
      dropdowns.ustensiles.appendChild(li);
    });

  } catch (error) {
    console.error('Error fetching data:', error);
  }
}

(async () => {
  const recipes = await getRecipe();
  populateDropdowns(recipes);
})();