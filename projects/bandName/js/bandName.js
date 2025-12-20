/* =====================================================
   BAND NAME GENERATOR
===================================================== */

document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("generateNameForm");

    form.addEventListener("submit", handleGenerateBandName);
});

/* =====================================================
   FUNÇÃO PRINCIPAL
===================================================== */

function handleGenerateBandName(event) {
    event.preventDefault();

    const resultContainer = document.getElementById("bandResult");

    fetchBandData()
        .then(data => {
            const bandName = generateBandName(data);
            displayResult(bandName, resultContainer);
        })
        .catch(error => {
            console.error("Error fetching the JSON file:", error);
            resultContainer.textContent = "Failed to load band names.";
        });
}

/* =====================================================
   FETCH
===================================================== */

async function fetchBandData() {
    const response = await fetch("bandName.json");
    if (!response.ok) {
        throw new Error("Network response was not ok");
    }
    return await response.json();
}

/* =====================================================
   LÓGICA
===================================================== */

function generateBandName(data) {
    const randomAdj = getRandomItem(data.adj);
    const randomNoun = getRandomItem(data.noun);

    return `${randomAdj} ${randomNoun}`;
}

function getRandomItem(array) {
    return array[Math.floor(Math.random() * array.length)];
}

/* =====================================================
   UI / OUTPUT
===================================================== */

function displayResult(bandName, container) {
    container.innerHTML = `
        <h2 class="titleName">Your band name is:</h2>
        <hr>
        <h3 class="nameGenerated">${bandName}</h3>
    `;

    triggerAnimation(container);
}

function triggerAnimation(element) {
    element.classList.remove("show");
    setTimeout(() => {
        element.classList.add("show");
    }, 50);
}
