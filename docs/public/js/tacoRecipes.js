document.addEventListener('DOMContentLoaded', function () {
    let recipes;

    // Fetch and store the JSON data
    fetch('../recipe.json')
        .then(response => response.json())
        .then(data => {
            recipes = data;
        })
        .catch(error => {
            console.error('Error fetching the JSON file:', error);
        });

    // Handle button clicks
    document.getElementById('recipeForm').addEventListener('click', function (event) {
        if (event.target.tagName === 'BUTTON' || event.target.parentElement.tagName === 'BUTTON') {
            const button = event.target.tagName === 'BUTTON' ? event.target : event.target.parentElement;
            const choice = button.getAttribute('data-choice');
            let recipe;

            // Switch case to choose the recipe
            switch (choice) {
                case 'chicken':
                    recipe = recipes[0];
                    break;
                case 'beef':
                    recipe = recipes[1];
                    break;
                case 'fish':
                    recipe = recipes[2];
                    break;
                default:
                    recipe = 'Recipe not found';
                    break;
            }

            // Display the recipe
            const recipeContainer = document.getElementById('recipeContainer');
            if (typeof recipe === 'string') {
                recipeContainer.innerHTML = `<h2 class="pick-ingredient">${recipe}</h2>`;
            } else {
                recipeContainer.innerHTML = `
                <h2 id="recipeTitle">${recipe.name}</h2> 
                <h3>Ingredients:</h3> 
                <ul id="ingredientsList"> 
                <li>${recipe.ingredients.protein.name}, ${recipe.ingredients.protein.preparation}</li> 
                <li>${recipe.ingredients.salsa.name}</li> ${recipe.ingredients.toppings.map(topping => `
                    <li>${topping.quantity} of ${topping.name}</li>`).join('')} </ul>
                `;
            }
        }
    });
});
