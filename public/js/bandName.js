document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('generateNameForm').addEventListener('submit', function (event) {
        event.preventDefault(); // Prevent form submission

        fetch('./public/bandName.json')
            .then(response => response.json())
            .then(data => {
                const randomAdj = data.adj[Math.floor(Math.random() * data.adj.length)];
                const randomNoun = data.noun[Math.floor(Math.random() * data.noun.length)];

                const titleContainer = document.getElementById('title-container');
                const welcomeMessage = document.getElementById('welcome-message');

                if (randomAdj && randomNoun) {
                    titleContainer.innerHTML = `
              <h1 class="titleName">Your band name is:</h1>
              <hr>
              <h2 class="nameGenerated">${randomAdj} ${randomNoun}</h1>
            `;
                } else {
                    welcomeMessage.textContent = "Welcome to the Band Generator 🤟";
                }
            })
            .catch(error => {
                console.error('Error fetching the JSON file:', error);
            });
    });
});
