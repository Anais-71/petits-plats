class ListItemFactory {
  createListItem(text) {
    const li = document.createElement('li');
    li.textContent = text;
    li.classList.add('dropdown-item');
    return li;
  }
}

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

    // Vérifiez si le tableau recipes existe dans votre objet JSON
    if (data.recipe && Array.isArray(data.recipe)) {
      // Liste globale de chaque catégorie
      const allIngredients = {};
      const allAppareils = {};
      const allUstensiles = {};

      // Parcourir toutes les recettes pour extraire les ingrédients, appareils et ustensiles
      data.recipe.forEach(recipe => {
        recipe.ingredients.forEach(ingredient => {
          const normalizedIngredient = normalizeString(ingredient.ingredient);
          allIngredients[normalizedIngredient] = true;
        });
        
        const normalizedAppareil = normalizeString(recipe.appliance);
        allAppareils[normalizedAppareil] = true;

        recipe.ustensils.forEach(ustensil => {
          const normalizedUstensil = normalizeString(ustensil);
          allUstensiles[normalizedUstensil] = true;
        });
      });

      // Convertir les clés des objets en tableaux et trier les listes par ordre alphabétique
      const sortedIngredients = Object.keys(allIngredients).sort();
      const sortedAppareils = Object.keys(allAppareils).sort();
      const sortedUstensiles = Object.keys(allUstensiles).sort();

      // Peupler les dropdowns avec les données triées
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
      console.error('Le tableau "recipe" est manquant dans le fichier JSON.');
    }
  } catch (error) {
    console.error('Erreur lors de la récupération des données:', error);
  }
}

// Normaliser une chaîne en convertissant en minuscules et en supprimant les espaces inutiles
function normalizeString(str) {
  return str.trim().toLowerCase();
}

// Appel de la fonction pour peupler les dropdowns avec les données du JSON
populateDropdowns('../data/recipes.json');