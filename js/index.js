import * as data from "./recipes.js";
import * as factory from "./factory.js";

const recipes = data.recipes;
console.log(factory)

const recipeSection = document.querySelector("#recipe-list")

function displayRecipes() {
    recipes.forEach(recipe => {
        recipeSection.appendChild(factory.generateRecipeCard(recipe));
    });
}


displayRecipes()

