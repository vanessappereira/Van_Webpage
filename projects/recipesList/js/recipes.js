/* =====================================================
   RECIPE MANAGER
===================================================== */
document.addEventListener("DOMContentLoaded", () => {

    /* -------------------------------------------------
       ELEMENTOS DO DOM
    -------------------------------------------------- */
    const form = document.getElementById("addRecipeForm");
    const ingredientsList = document.getElementById("ingredientsList");
    const addIngredientBtn = document.getElementById("addIngredient");
    const recipesContainer = document.getElementById("recipesContainer");
    const popup = document.getElementById("recipePopup");
    const popupClose = popup.querySelector(".close-popup");
    const exportBtn = document.getElementById("exportJSON");

    /* -------------------------------------------------
       ESTADO
    -------------------------------------------------- */
    let recipes = JSON.parse(localStorage.getItem("recipes")) || [];

    /* =====================================================
       INGREDIENTS — LINHAS DINÂMICAS
    ====================================================== */
    function addIngredientRow(name = "", amount = "", unit = "") {
        const div = document.createElement("div");
        div.classList.add("ingredient-row");

        div.innerHTML = `
            <input type="text" placeholder="Ingrediente" value="${name}" required>
            <input type="number" placeholder="Qtd" value="${amount}" required>
            <select>
                <option value="">Peso</option>
                <option value="un" ${unit === "un" ? "selected" : ""}>un</option>
                <option value="mg" ${unit === "mg" ? "selected" : ""}>mg</option>
                <option value="g" ${unit === "g" ? "selected" : ""}>g</option>
                <option value="ml" ${unit === "ml" ? "selected" : ""}>ml</option>
                <option value="l" ${unit === "l" ? "selected" : ""}>l</option>
                <option value="colher de sopa" ${unit === "colher de sopa" ? "selected" : ""}>colher de sopa</option>
                <option value="colher de chá" ${unit === "colher de chá" ? "selected" : ""}>colher de chá</option>
            </select>
            <button type="button" class="remove-btn">✖</button>
        `;

        div.querySelector(".remove-btn").onclick = () => div.remove();
        ingredientsList.appendChild(div);
    }

    addIngredientRow();
    addIngredientBtn.addEventListener("click", () => addIngredientRow());

    /* =====================================================
       RENDERIZAÇÃO DAS RECEITAS
    ====================================================== */
    function renderRecipes() {
        recipesContainer.innerHTML = "";

        // Se estiver vazio, mostra mensagem e sai
        if (recipes.length === 0) {
            recipesContainer.innerHTML = `
                <p class="no-recipes">
                    <svg width="45" height="45" viewBox="0 0 24 24" fill="none"
                        stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <path d="M2 4h8a2 2 0 0 1 2 2v14a2 2 0 0 0-2-2H2z"></path>
                        <path d="M22 4h-8a2 2 0 0 0-2 2v14a2 2 0 0 1 2-2h8z"></path>
                    </svg>
                    <br>
                    Nenhuma receita adicionada ainda.
                </p>
            `;
            return;
        }

        // Caso tenha receitas, renderiza normalmente
        recipes.forEach((recipe, index) => {
            const card = document.createElement("div");
            card.classList.add("recipe-card");

            const ingredientsHTML = recipe.ingredients
                .map(i => `<li>${i.name} — ${i.amount} ${i.unit}</li>`)
                .join("");

            card.innerHTML = `
                <h3>${recipe.title}</h3>
                <strong>Ingredientes:</strong>
                <ul>${ingredientsHTML}</ul>
                <strong>Preparação:</strong>
                <p>${recipe.instructions}</p>

                <div class="card-buttons">
                    <button class="show-more-btn">Ver mais</button>
                    <button class="edit-btn">Editar</button>
                    <button class="delete-btn">Eliminar</button>
                </div>
            `;

            recipesContainer.appendChild(card);

            /* ------------------------------
               VER MAIS
            ------------------------------- */
            card.querySelector(".show-more-btn").addEventListener("click", () => {
                popup.querySelector(".popup-content").innerHTML = `
                    <h3>${recipe.title}</h3>
                    <strong>Ingredientes:</strong>
                    <ul>${ingredientsHTML}</ul>
                    <strong>Preparação:</strong>
                    <p>${recipe.instructions}</p>
                `;
                popup.classList.add("active");
            });

            /* ------------------------------
               ELIMINAR
            ------------------------------- */
            card.querySelector(".delete-btn").addEventListener("click", () => {
                if (confirm(`Deseja eliminar a receita "${recipe.title}"?`)) {
                    recipes.splice(index, 1);
                    localStorage.setItem("recipes", JSON.stringify(recipes));
                    renderRecipes();
                }
            });

            /* ------------------------------
               EDITAR
            ------------------------------- */
            card.querySelector(".edit-btn").addEventListener("click", () => {
                document.getElementById("title").value = recipe.title;
                document.getElementById("instructions").value = recipe.instructions;

                ingredientsList.innerHTML = "";
                recipe.ingredients.forEach(i => addIngredientRow(i.name, i.amount, i.unit));

                form.onsubmit = (e) => {
                    e.preventDefault();

                    const updatedRecipe = {
                        id: recipe.id,
                        title: document.getElementById("title").value.trim(),
                        instructions: document.getElementById("instructions").value.trim(),
                        ingredients: getIngredientsFromForm()
                    };

                    recipes[index] = updatedRecipe;
                    localStorage.setItem("recipes", JSON.stringify(recipes));

                    renderRecipes();
                    resetForm();
                    form.onsubmit = normalSubmit;
                };
            });
        });
    }

    renderRecipes();

    /* =====================================================
       SUBMIT — ADICIONAR NOVA RECEITA
    ====================================================== */
    function getIngredientsFromForm() {
        return Array.from(document.querySelectorAll(".ingredient-row")).map(row => {
            const inputs = row.querySelectorAll("input");
            const select = row.querySelector("select");
            return {
                name: inputs[0].value,
                amount: inputs[1].value,
                unit: select.value
            };
        });
    }

    function resetForm() {
        form.reset();
        ingredientsList.innerHTML = "";
        addIngredientRow();
    }

    function normalSubmit(e) {
        e.preventDefault();

        const newRecipe = {
            id: Date.now(),
            title: document.getElementById("title").value.trim(),
            instructions: document.getElementById("instructions").value.trim(),
            ingredients: getIngredientsFromForm()
        };

        recipes.push(newRecipe);
        localStorage.setItem("recipes", JSON.stringify(recipes));

        renderRecipes();
        resetForm();
    }

    form.onsubmit = normalSubmit;

    /* =====================================================
       POPUP
    ====================================================== */
    popupClose.addEventListener("click", () => popup.classList.remove("active"));
    popup.addEventListener("click", e => {
        if (e.target === popup) popup.classList.remove("active");
    });

    /* =====================================================
       EXPORTAR JSON
    ====================================================== */
    exportBtn.addEventListener("click", () => {
        const dataStr = JSON.stringify(recipes, null, 2);
        const blob = new Blob([dataStr], { type: "application/json" });
        const url = URL.createObjectURL(blob);

        const a = document.createElement("a");
        a.href = url;
        a.download = "recipes.json";
        a.click();

        URL.revokeObjectURL(url);
    });
});
