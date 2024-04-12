export function recipeTemplate(data) {
    const { body, title, recipe, txt, ingredients, divIngredients, divDetails, image, name, description, } = data;

    const picture = `assets/img/${image}`;

    // Generates DOM of the recipe
    function getRecipeDOM() {
        // Create recipe card
        const card = document.createElement('a');
        card.classList.add('card');
        card.setAttribute('href', '#');
        card.setAttribute('tabindex', 0);
        card.setAttribute('role', 'section');
        card.setAttribute('aria-labelledby', 'titre de la recette');
        card.setAttribute('style', 'width: 23.75rem');
        card.focus();
    
        const pictureElement = document.createElement('img');
        pictureElement.classList.add('card-img-top');
        pictureElement.setAttribute('src', picture);
        pictureElement.setAttribute('alt', 'Illustration de la recette');
        pictureElement.setAttribute('style', 'height: 15.813rem');
    
        const bodyElement = document.createElement('div');
        bodyElement.classList.add('card-body');
    
        const titleElement = document.createElement('h2');
        titleElement.classList.add('card-title');
        titleElement.setAttribute('id', 'titre de la recette');
        titleElement.setAttribute('aria-label', name);
        titleElement.textContent = name;
    
        const recipeTitleElement = document.createElement('h3');
        recipeTitleElement.textContent = 'RECETTE';
        recipeTitleElement.classList.add('card-subtitle');
    
        const txtElement = document.createElement('p');
        txtElement.textContent = description;
        txtElement.classList.add('card-text');
    
        const ingredientsDiv = document.createElement('div');
        ingredientsDiv.classList.add('card-ingredients');
    
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
    
        const ingredientsTitleElement = document.createElement('h3');
        ingredientsTitleElement.textContent = 'INGRÉDIENTS';
        ingredientsTitleElement.classList.add('card-subtitle');
    
        bodyElement.appendChild(titleElement);
        bodyElement.appendChild(recipeTitleElement);
        bodyElement.appendChild(txtElement);
        bodyElement.appendChild(ingredientsTitleElement);
        bodyElement.appendChild(ingredientsDiv);
    
        card.appendChild(pictureElement);
        card.appendChild(bodyElement);
    
        return card;
    }      

    return { picture, body, title, recipe, txt, ingredients, divIngredients, divDetails, getRecipeDOM };
}