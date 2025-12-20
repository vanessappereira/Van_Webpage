/* ===============================
   TACO TOWN – RECIPE LOGIC
================================ */

document.addEventListener("DOMContentLoaded", async () => {
    const recipeForm = document.getElementById("recipeForm");
    const recipeContainer = document.getElementById("recipeContainer");

    let recipes = [];

    /* ===============================
       LOAD RECIPES
    ================================= */

    try {
        const response = await fetch("recipe.json");
        recipes = await response.json();
    } catch (error) {
        console.error("Error loading recipes:", error);
        recipeContainer.innerHTML =
            "<h2 class='pick-ingredient'>Unable to load recipes.</h2>";
        return;
    }

    /* ===============================
       HANDLE USER SELECTION
    ================================= */

    recipeForm.addEventListener("click", (event) => {
        const button = event.target.closest("button");
        if (!button) return;

        const choice = button.dataset.choice.toLowerCase();

        const recipe = recipes.find(r =>
            r.ingredients.protein.name.toLowerCase() === choice
        );

        if (!recipe) {
            recipeContainer.innerHTML =
                "<h2 class='pick-ingredient'>Recipe not found.</h2>";
            return;
        }

        displayRecipe(recipe);
    });

    /* ===============================
       DISPLAY RECIPE
    ================================= */

    function displayRecipe(recipe) {
        recipeContainer.classList.remove("hidden");

        recipeContainer.innerHTML = `
            <h2 id="recipeTitle">${recipe.name}</h2>
            <p><strong>Price:</strong> €${recipe.price.toFixed(2)}</p>

            <h3>Ingredients</h3>
            <ul id="ingredientsList">
                <li>
                    <strong>Protein:</strong>
                    ${recipe.ingredients.protein.name}
                    (${recipe.ingredients.protein.preparation})
                </li>

                <li>
                    <strong>Salsa:</strong>
                    ${recipe.ingredients.salsa.name}
                    – ${recipe.ingredients.salsa.spiciness}
                </li>

                ${recipe.ingredients.toppings
                .map(topping => `
                        <li>
                            ${topping.quantity} of ${topping.name}
                        </li>
                    `)
                .join("")}
            </ul>
        `;
    }
});
