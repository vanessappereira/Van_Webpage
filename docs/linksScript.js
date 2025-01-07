document.querySelectorAll('.cssbuttons-io').forEach(button => {
    button.addEventListener('click', function () {
        const buttonId = this.id;

        if (buttonId === 'drumButton') {
            window.location.href = 'drumHomepage.html';
        } else if (buttonId === 'tacoButton') {
            window.location.href = 'tacoRecipesHomepage.html';
        } else if (buttonId === 'diceButton') {
            window.location.href = 'diceHomepage.html';
        } else if (buttonId === 'bandButton') {
            window.location.href = 'bandNameHomepage.html';
        } else if (buttonId === 'simonButton') {
            window.location.href = 'simonSaysHomepage.html';
        } else if (buttonId === 'otherProjectsButton') {
            window.alert('This button is not currently linked to a project.');
        } else {
            window.alert('No matching button found.');
        }
    });
});