/**
 * Creates a recipe template from the provided data.
 *
 * @param {Object} data - The recipe data.
 * @returns {Object} An object containing the recipe's DOM elements and other details.
 */
export function recipeTemplate(data) {
    const { body, title, recipe, txt, ingredients, appliance, ustensil, divIngredients, divDetails, image, name, description, } = data;

    const picture = `assets/img/${image}`;

    /**
     * Generates the DOM of the recipe.
     *
     * @returns {HTMLElement} The created recipe card.
     */
    function getRecipeDOM() {
        // Create recipe card
        const card = document.createElement('a');
        card.classList.add('card');
        card.setAttribute('href', '#');
        card.setAttribute('tabindex', 0);
        card.setAttribute('role', 'section');
        card.setAttribute('aria-labelledby', 'recipe title');
        card.setAttribute('style', 'width: 23.75rem');
        card.focus();

        // Create picture element
        const pictureElement = document.createElement('img');
        pictureElement.classList.add('card-img-top');
        pictureElement.setAttribute('src', picture);
        pictureElement.setAttribute('alt', 'Recipe illustration');
        pictureElement.setAttribute('style', 'height: 15.813rem');

        // Create body element
        const bodyElement = document.createElement('div');
        bodyElement.classList.add('card-body');

        // Create title element
        const titleElement = document.createElement('h2');
        titleElement.classList.add('card-title');
        titleElement.setAttribute('id', 'recipe title');
        titleElement.setAttribute('aria-label', name);
        titleElement.textContent = name;

        // Create recipe title element
        const recipeTitleElement = document.createElement('h3');
        recipeTitleElement.textContent = 'RECIPE';
        recipeTitleElement.classList.add('card-subtitle');

        // Create text element
        const txtElement = document.createElement('p');
        txtElement.textContent = description;
        txtElement.classList.add('card-text');

        // Create ingredients div
        const ingredientsDiv = document.createElement('div');
        ingredientsDiv.classList.add('card-ingredients');

        // Create each ingredient item
        data.ingredients.forEach(ingredientData => {
            const ingredientItem = document.createElement('p');
            ingredientItem.classList.add('card-text-ingredient');
            ingredientItem.textContent = ingredientData.ingredient;

            const quantityUnitItem = document.createElement('p');
            quantityUnitItem.classList.add('card-text-qty');
            quantityUnitItem.textContent = `${ingredientData.quantity || ''} ${ingredientData.unit || ''}`;

            const ingredientDetailsDiv = document.createElement('div');
            ingredientDetailsDiv.classList.add('card-ingredients-details');
            ingredientDetailsDiv.appendChild(ingredientItem);
            ingredientDetailsDiv.appendChild(quantityUnitItem);

            ingredientsDiv.appendChild(ingredientDetailsDiv);
        });

        // Create ingredients title element
        const ingredientsTitleElement = document.createElement('h3');
        ingredientsTitleElement.textContent = 'INGREDIENTS';
        ingredientsTitleElement.classList.add('card-subtitle');

        // Create appliance element
        const applianceElement = document.createElement('p');
        applianceElement.textContent = appliance;
        applianceElement.classList.add('appliance');
        applianceElement.style.display = "none"; //hidden for filter purpose

        // Create ustensil element
        const ustensilElement = document.createElement('p');
        ustensilElement.textContent = ustensil;
        ustensilElement.classList.add('ustensil');
        ustensilElement.style.display = "none"; //hidden for filter purpose

        // Append elements to body element
        bodyElement.appendChild(titleElement);
        bodyElement.appendChild(recipeTitleElement);
        bodyElement.appendChild(txtElement);
        bodyElement.appendChild(ingredientsTitleElement);
        bodyElement.appendChild(ingredientsDiv);
        bodyElement.appendChild(applianceElement);
        bodyElement.appendChild(ustensilElement);

        // Append elements to card
        card.appendChild(pictureElement);
        card.appendChild(bodyElement);

        return card;
    }

    return { picture, body, title, recipe, txt, ingredients, appliance, ustensil, divIngredients, divDetails, getRecipeDOM };
}