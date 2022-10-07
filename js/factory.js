export function generateRecipeCard(recipe) {
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
    recipeTime.innerHTML = `<i class='fa fa-clock-o'></i>${["", recipe.time, "min"].join(" ")}`
    generateIngredients(recipe.ingredients, recipeIngredients)
    recipeDescription.textContent = recipe.description

    recipeCard.classList.add("recipe-card")
    recipeCardPicture.classList.add("recipe-card-picture")
    recipeCardDetails.classList.add("recipe-card-details")
    recipeTitle.classList.add("recipe-card-title")
    recipeName.classList.add("recipe-card-name")
    recipeProcess.classList.add("recipe-process")
    recipeIngredients.classList.add("recipe-ingredients")
    recipeDescription.classList.add("recipe-description")


    recipeCard.appendChild(recipeCardPicture);
    recipeCard.appendChild(recipeCardDetails);
    recipeTitle.appendChild(recipeName);
    recipeTitle.appendChild(recipeTime);
    recipeCardDetails.appendChild(recipeTitle);
    recipeProcess.appendChild(recipeIngredients);
    recipeProcess.appendChild(recipeDescription);
    recipeCardDetails.appendChild(recipeProcess)
    return recipeCard;
}

function generateIngredients(ingredients, ingredientsElem) {
    ingredients.forEach(ingredient => {
        const ingredientsDetails = document.createElement("span");
        ingredientsDetails.textContent = [[ingredient.ingredient, ingredient.quantity].join(': '), ingredient.unit ? ingredient.unit : ""].join("")
        ingredientsElem.appendChild(ingredientsDetails);
        ingredientsElem.appendChild(document.createElement('br'));
    });

}