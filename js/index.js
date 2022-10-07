import * as data from "./recipes.js";
import * as factory from "./factory.js";

const recipes = data.recipes;
let filtersList = { ingredients: [], tools: [], machines: [] , generated: false}
let mappedList = { ingredients: [], tools: [], machines: [] }
let activeFilterList = []

const recipeSection = document.querySelector("#recipe-list")

function displayRecipes(recipeList) {
    recipeSection.replaceChildren()
    recipeList.forEach(recipe => {
        recipeSection.appendChild(factory.generateRecipeCard(recipe));
        if(filtersList.generated == false)
            populateFiltersAndMap(recipe.ingredients, recipe.ustensils, recipe.appliance, recipe)
    });
    filtersList.generated = true
}

function populateFiltersAndMap(ingredients, tools, machines, recipe) {
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
    if (Array.isArray(tools)) {
        tools.forEach((tool) => {
            tool = normalizeFilter(tool);
            filtersList.tools.includes(tool) ? null : filtersList.tools.push(tool)
            mappedList.tools[tool] ? mappedList.tools[tool].push(recipe) : mappedList.tools[tool] = [recipe]
        })
    }
    else {
        filtersList.tools.includes(tools) ? null : filtersList.tools.push(tools)
        mappedList.tools[tool] ? mappedList.tools[tool].push(recipe) : mappedList.tools[tool] = [recipe]
    }
    if (Array.isArray(machines)) {
        machines.forEach((machine) => {
            machine = normalizeFilter(machine);
            filtersList.machines.includes(machine) ? null : filtersList.machines.push(machine)
            mappedList.machines[machines] ? mappedList.machines[machines].push(recipe) : mappedList.machines[machines] = [machines]
        })
    }
    else {
        filtersList.machines.includes(machines) ? null : filtersList.machines.push(machines)
        mappedList.machines[machines] ? mappedList.machines[machines].push(recipe) : mappedList.machines[machines] = [machines]
    }
}

function normalizeFilter(string) {
    return string[0].toUpperCase() + string.substring(1).toLowerCase();
}

function addFiltersRecipes(filterName, filterType) {
    activeFilterList.push(mappedList[filterType][filterName])
    const flattedList = activeFilterList.flat(1)
    const filteredData = flattedList.filter((a, index) => flattedList.indexOf(a) === index && flattedList.reduce((acc, b) => +(a === b) + acc, 0) === activeFilterList.length)
    displayRecipes(filteredData)
}


displayRecipes(recipes)


//exemples
// addFiltersRecipes("Crème fraîche", "ingredients")
// addFiltersRecipes("Cuillère en bois", "tools")
// addFiltersRecipes("Mixer", "machines")
// addFiltersRecipes("Couteau", "tools")