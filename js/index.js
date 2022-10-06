import * as data from "./recipes.js";
const recipes = data.recipes;

const recipeSection = document.querySelector("#recipe-list")

function displayRecipes() {
    recipes.forEach(recipe => {
        generateRecipeCard(recipe)
    });
}

function generateRecipeCard(recipe) {
    console.log(recipe)
    const recipeCard = document.createElement("figure")
    const recipeCardPicture = document.createElement("img")
    const recipeCardDetails = document.createElement("figcaption")
    const recipeTitle = document.createElement("span")
    const recipeProcess = document.createElement("span")
    const recipeName = document.createElement("h2")
    const recipeTime = document.createElement("h2")
    const recipeIngredients = document.createElement("span")
    const recipeDescription = document.createElement("span")

    recipeName.textContent = recipe.name
    recipeTime.textContent = [recipe.time, "min"].join(" ")
    generateIngredients(recipe.ingredients, recipeIngredients)
    recipeDescription.textContent = recipe.description

    recipeCard.classList.add("recipe-card")
    recipeCardPicture.classList.add("recipe-card-picture")
    recipeCardDetails.classList.add("recipe-card-details")
    recipeTitle.classList.add("recipe-card-title")
    recipeProcess.classList.add("recipe-process")


    recipeCard.appendChild(recipeCardPicture);
    recipeCard.appendChild(recipeCardDetails);
    recipeTitle.appendChild(recipeName);
    recipeTitle.appendChild(recipeTime);
    recipeCardDetails.appendChild(recipeTitle);
    recipeProcess.appendChild(recipeIngredients);
    recipeProcess.appendChild(recipeDescription);
    recipeCardDetails.appendChild(recipeProcess)
    recipeSection.appendChild(recipeCard);
}

function generateIngredients(ingredients, ingredientsElem){
    ingredients.forEach(ingredient => {
        ingredientsElem.appendChild(document.createTextNode(ingredient.ingredient));
        ingredientsElem.appendChild(document.createElement('br'));
    });

}

displayRecipes()

