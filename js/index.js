import * as data from "./recipes.js";
import * as factory from "./factory.js";

const recipes = data.recipes;
let filtersList = { ingredients: [], ustensiles: [], appareils: [], generated: false }
let mappedList = { ingredients: [], ustensiles: [], appareils: [] }
let activeFilterList = []

const recipeSection = document.querySelector("#recipe-list")

function displayRecipes(recipeList) {
    recipeSection.replaceChildren()
    recipeList.forEach(recipe => {
        recipeSection.appendChild(factory.generateRecipeCard(recipe));
        if (filtersList.generated == false)
            populateFiltersAndMap(recipe.ingredients, recipe.ustensils, recipe.appliance, recipe)
    });
    filtersList.generated = true
}

const eventListenerList = [[document.querySelector(".ingredients-input"), "ingredients"], [document.querySelector(".appareils-input"), "appareils"], [document.querySelector(".ustensiles-input"), "ustensiles"]]

eventListenerList.forEach((element => {
    element[0].addEventListener('focus', (event) => {
        event.target.placeholder = ["Rechercher un", element[1]].join(" ")
        document.querySelector(".dropdown-" + element[1]).style.display = "flex"
        document.querySelector("#" + element[1] + "-btn").style.width = "667px"
        document.querySelector("#" + element[1] + "-btn").style.borderRadius = "5px 5px 0 0"
    });
    element[0].addEventListener('blur', (event) => {
        if (!document.querySelector(".dropdown-" + element[1]).contains(event.relatedTarget)) {
            event.target.placeholder = element[1]
            document.querySelector(".dropdown-" + element[1]).style.display = "none"
            document.querySelector("#" + element[1] + "-btn").style.width = "170px"
            document.querySelector("#" + element[1] + "-btn").style.borderRadius = "5px 5px 5px 5px"
        }
    });
}))

displayRecipes(recipes)

function displayActiveFilter(filterText, category) {
    const activeFilter = document.createElement("span")
    const deleteIcon = document.createElement("i")
    deleteIcon.classList.add("fa", "fa-times-circle-o", "fa-2xl" )
    activeFilter.textContent = filterText
    activeFilter.appendChild(deleteIcon)

    switch (category) {
        case "ingredients":
            activeFilter.classList.add("ingredient-filter-item")
            break;
        case "ustensiles":
            activeFilter.classList.add("ustensil-filter-item")
            break;
        case "appareils":
            activeFilter.classList.add("appareil-filter-item")
            break; //add cxolor to filters
    }
    activeFilter.addEventListener("click", () => {
        removeActiveFilter(activeFilter,Array.from(activeFilter.parentElement.children).indexOf(activeFilter))
    })
    document.querySelector(".active-filter-list").appendChild(activeFilter)
}

function removeActiveFilter(filter, index) {
    filter.remove()
    activeFilterList.splice(index, 1)
    if (activeFilterList.length == 0) {
        displayRecipes(recipes)
        return
    }
    displayFilteredRecipes()
}

function addFiltersRecipes(filterName, filterType) {
    activeFilterList.push(mappedList[filterType][filterName])
    displayFilteredRecipes()
}

function displayFilteredRecipes(){
    const flattedList = activeFilterList.flat(1)
    const filteredData = flattedList.filter((a, index) => flattedList.indexOf(a) === index && flattedList.reduce((acc, b) => +(a === b) + acc, 0) === activeFilterList.length)
    displayRecipes(filteredData)
}

function populateFiltersAndMap(ingredients, ustensiles, appareils, recipe) {
    if (Array.isArray(ingredients)) {
        ingredients.forEach((ingredient) => {
            ingredient.ingredient = normalizeFilter(ingredient.ingredient);
            filtersList.ingredients.includes(ingredient.ingredient) ? null : filtersList.ingredients.push(ingredient.ingredient)
            mappedList.ingredients[ingredient.ingredient] ? mappedList.ingredients[ingredient.ingredient].push(recipe) : mappedList.ingredients[ingredient.ingredient] = [recipe]
        })
    }
    else {
        filtersList.ingredients.includes(ingredients) ? null : filtersList.ingredients.push(ingredients)
        mappedList.ingredients[ingredient.ingredient] ? mappedList.ingredients[ingredient.ingredient].push(recipe) : mappedList.ingredients[ingredient.ingredient] = [recipe]
    }
    if (Array.isArray(ustensiles)) {
        ustensiles.forEach((ustensile) => {
            ustensile = normalizeFilter(ustensile);
            filtersList.ustensiles.includes(ustensile) ? null : filtersList.ustensiles.push(ustensile)
            mappedList.ustensiles[ustensile] ? mappedList.ustensiles[ustensile].push(recipe) : mappedList.ustensiles[ustensile] = [recipe]
        })
    }
    else {
        filtersList.ustensiles.includes(ustensiles) ? null : filtersList.ustensiles.push(ustensiles)
        mappedList.ustensiles[ustensile] ? mappedList.ustensiles[ustensile].push(recipe) : mappedList.ustensiles[ustensile] = [recipe]
    }
    if (Array.isArray(appareils)) {
        appareils.forEach((appareil) => {
            appareil = normalizeFilter(appareil);
            filtersList.appareils.includes(appareil) ? null : filtersList.appareils.push(appareil)
            mappedList.appareils[appareils] ? mappedList.appareils[appareils].push(recipe) : mappedList.appareils[appareils] = [recipe]
        })
    }
    else {
        filtersList.appareils.includes(appareils) ? null : filtersList.appareils.push(appareils)
        mappedList.appareils[appareils] ? mappedList.appareils[appareils].push(recipe) : mappedList.appareils[appareils] = [recipe]
    }
}

function handleFilterBtn(category) {
    const dropdownFilter = document.querySelector(".dropdown-" + category)
    dropdownFilter.replaceChildren()
    filtersList[category].forEach((filter, x) => {
        if (filter.toLowerCase().includes(document.querySelector("." + category + "-input").value.toLowerCase()) || document.querySelector("." + category + "-input").value == "") {
            const filterItem = document.createElement("span")
            const filterText = document.createElement("p")
            filterItem.classList.add("filter-item")
            filterText.classList.add("filter-text")
            filterText.textContent = filter
            filterItem.appendChild(filterText)
            dropdownFilter.appendChild(filterItem)
            filterText.setAttribute("tabindex", x) // so it dont focuout on click on children
            filterText.addEventListener('click', () => {
                addFiltersRecipes(filterText.textContent, category)
                displayActiveFilter(filterText.textContent, category)
                document.querySelector("." + category + "-input").focus()
            })
        }
    })
}
window.handleFilterBtn = handleFilterBtn;

function normalizeFilter(string) {
    return string[0].toUpperCase() + string.substring(1).toLowerCase();
}