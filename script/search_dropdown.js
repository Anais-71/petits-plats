/**
 * Array to store selected ingredients.
 * @type {Array<string>}
 */
export let selectedIngredients = [];

/**
 * Array to store selected appliances.
 * @type {Array<string>}
 */
export let selectedAppliances = [];

/**
 * Array to store selected utensils.
 * @type {Array<string>}
 */
export let selectedUstensils = [];

/**
 * Searches for an ingredient in the dropdown list and selects it if found.
 * @param {string} searchTerm - The term to search for in the ingredient list.
 */
function ingredientSearch(searchTerm) {
    if (searchTerm.length >= 3) {
        const listItems = Array.from(document.querySelectorAll('.dropdown-ingredients li'));
        listItems.some(listItem => {
            if (listItem.textContent.includes(searchTerm) && !selectedIngredients.includes(listItem.textContent)) {
                selectedIngredients.push(listItem.textContent);
                listItem.classList.add('selected');
                listItem.click();
                return true;
            }
        });
    }
}

/**
 * Searches for an appliance in the dropdown list and selects it if found.
 * @param {string} searchTerm - The term to search for in the appliance list.
 */
function applianceSearch(searchTerm) {
    if (searchTerm.length >= 3) {
        const listItems = Array.from(document.querySelectorAll('.dropdown-appareils li'));
        listItems.some(listItem => {
            if (listItem.textContent.includes(searchTerm) && !selectedAppliances.includes(listItem.textContent)) {
                selectedAppliances.push(listItem.textContent);
                listItem.classList.add('selected');
                listItem.click();
                return true;
            }
        });
    }
}

/**
 * Searches for a utensil in the dropdown list and selects it if found.
 * @param {string} searchTerm - The term to search for in the utensil list.
 */
function ustensilSearch(searchTerm) {
    if (searchTerm.length >= 3) {
        const listItems = Array.from(document.querySelectorAll('.dropdown-ustensiles li'));
        listItems.some(listItem => {
            if (listItem.textContent.includes(searchTerm) && !selectedUstensils.includes(listItem.textContent)) {
                selectedUstensils.push(listItem.textContent);
                listItem.classList.add('selected');
                listItem.click();
                return true;
            }
        });
    }
}

/**
 * String to store the search text.
 * @type {string}
 */
export let searchText = '';

let searchIngredient = document.querySelector(".dropdown-ingredients-search");
const btnIngredient = document.querySelector(".search-ingredient");
btnIngredient.addEventListener('click', () => ingredientSearch(searchIngredient.value));

let searchAppliance = document.querySelector(".dropdown-appliances-search");
const btnAppliance = document.querySelector(".search-appliance");
btnAppliance.addEventListener('click', () => applianceSearch(searchAppliance.value));

let searchUstensil = document.querySelector(".dropdown-ustensils-search");
const btnUstensil = document.querySelector(".search-ustensil");
btnUstensil.addEventListener('click', () => ustensilSearch(searchUstensil.value));

searchIngredient.addEventListener('keydown', function (event) {
    if (event.key === 'Enter') {
        ingredientSearch(searchIngredient.value);
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