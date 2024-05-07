/**
 * Array to store selected ingredients.
 * @type {Array}
 */
export let selectedIngredients = [];

/**
 * Array to store selected appliances.
 * @type {Array}
 */
export let selectedAppliances = [];

/**
 * Array to store selected utensils.
 * @type {Array}
 */
export let selectedUstensils = [];

/**
 * Searches for an ingredient in the dropdown list and selects it if found.
 * @param {string} searchTerm - The term to search for in the ingredient list.
 */
function ingredientSearch(searchTerm) {
    if (searchTerm.length >= 3) {
        const listItems = Array.from(document.querySelectorAll('.dropdown-ingredients li'));
        for (let i = 0; i < listItems.length; i++) {
            const listItem = listItems[i];
            if (listItem.textContent.includes(searchTerm) && !selectedIngredients.includes(listItem.textContent)) {
                selectedIngredients.push(listItem.textContent);
                listItem.classList.add('selected');
                listItem.click();
                break;
            }
        }
    }
}

/**
 * Searches for an appliance in the dropdown list and selects it if found.
 * @param {string} searchTerm - The term to search for in the appliance list.
 */
function applianceSearch(searchTerm) {
    if (searchTerm.length >= 3) {
        const listItems = Array.from(document.querySelectorAll('.dropdown-appareils li'));
        for (let i = 0; i < listItems.length; i++) {
            const listItem = listItems[i];
            if (listItem.textContent.includes(searchTerm) && !selectedAppliances.includes(listItem.textContent)) {
                selectedAppliances.push(listItem.textContent);
                listItem.classList.add('selected');
                listItem.click();
                break;
            }
        }
    }
}

/**
 * Searches for a utensil in the dropdown list and selects it if found.
 * @param {string} searchTerm - The term to search for in the utensil list.
 */
function ustensilSearch(searchTerm) {
    if (searchTerm.length >= 3) {
        const listItems = Array.from(document.querySelectorAll('.dropdown-ustensiles li'));
        for (let i = 0; i < listItems.length; i++) {
            const listItem = listItems[i];
            if (listItem.textContent.includes(searchTerm) && !selectedUstensils.includes(listItem.textContent)) {
                selectedUstensils.push(listItem.textContent);
                listItem.classList.add('selected');
                listItem.click();
                break;
            }
        }
    }
}

/**
 * String to store the search text.
 * @type {string}
 */
export let searchText = '';

let searchIngredient = document.querySelector(".dropdown-ingredients-search");
const btnIngredient = document.querySelector(".search-ingredient");
btnIngredient.addEventListener('click', ingredientSearch);

let searchAppliance = document.querySelector(".dropdown-appliances-search");
const btnAppliance = document.querySelector(".search-appliance");
btnAppliance.addEventListener('click', applianceSearch);

let searchUstensil = document.querySelector(".dropdown-ustensils-search");
const btnUstensil = document.querySelector(".search-ustensil");
btnUstensil.addEventListener('click', ustensilSearch);

searchIngredient.addEventListener('keydown', function (event) {
    if (event.key === 'Enter') {
        ingredientSearch(searchIngredient.value, event);
    }
});

searchAppliance.addEventListener('keydown', function (event) {
    if (event.key === 'Enter') {
        applianceSearch(searchAppliance.value);
    }
});

searchUstensil.addEventListener('keydown', function (event) {
    if (event.key === 'Enter') {
        ustensilSearch(searchUstensil.value);
    }
});