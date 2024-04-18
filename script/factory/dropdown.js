class ListItemFactory {
  /**
   * Creates a list item (<li>) with the specified text.
   * @param {string} text - The text to display in the list item.
   * @returns {HTMLLIElement} - The created list item.
   */
  createListItem(text) {
    const li = document.createElement('li');
    li.textContent = text.charAt(0).toUpperCase() + text.slice(1); // Capitalize the first letter
    li.classList.add('dropdown-item');
    return li;
  }
}

/**
 * Populates HTML dropdowns with data retrieved from a JSON endpoint.
 * @param {string} jsonEndpoint - The URL of the JSON endpoint to retrieve data from.
 */
async function populateDropdowns(jsonEndpoint) {
  const dropdowns = {
    ingredients: document.querySelector('.dropdown-ingredients ul'),
    appareils: document.querySelector('.dropdown-appareils ul'),
    ustensiles: document.querySelector('.dropdown-ustensiles ul')
  };

  const factory = new ListItemFactory();

  try {
    const response = await fetch(jsonEndpoint);
    const data = await response.json();

    // Check if the recipes array exists in your JSON object
    if (data.recipe && Array.isArray(data.recipe)) {
      const uniqueIngredients = new Set();
      const uniqueAppareils = new Set();
      const uniqueUstensiles = new Set();

      // Helper function to normalize words and remove common suffixes
      const normalizeWord = word => {
        return word.toLowerCase().replace(/s$/, ''); // Remove "s" at the end
      };

      // Populate sets with unique values
      data.recipe.forEach(recipe => {
        recipe.ingredients.forEach(ingredient => {
          const normalizedIngredient = normalizeWord(ingredient.ingredient);
          uniqueIngredients.add(normalizedIngredient);
        });
        
        const normalizedAppareil = normalizeWord(recipe.appliance);
        uniqueAppareils.add(normalizedAppareil);

        recipe.ustensils.forEach(ustensil => {
          const normalizedUstensil = normalizeWord(ustensil);
          uniqueUstensiles.add(normalizedUstensil);
        });
      });

      // Convert sets to arrays and sort them alphabetically
      const sortedIngredients = Array.from(uniqueIngredients).sort();
      const sortedAppareils = Array.from(uniqueAppareils).sort();
      const sortedUstensiles = Array.from(uniqueUstensiles).sort();

      // Populate dropdowns with sorted data
      sortedIngredients.forEach(item => {
        const li = factory.createListItem(item);
        dropdowns.ingredients.appendChild(li);
      });

      sortedAppareils.forEach(item => {
        const li = factory.createListItem(item);
        dropdowns.appareils.appendChild(li);
      });

      sortedUstensiles.forEach(item => {
        const li = factory.createListItem(item);
        dropdowns.ustensiles.appendChild(li);
      });
    } else {
      console.error('The "recipe" array is missing in the JSON file.');
    }
  } catch (error) {
    console.error('Error fetching data:', error);
  }
}

// Call the function to populate dropdowns with JSON data
populateDropdowns('././data/recipes.json');