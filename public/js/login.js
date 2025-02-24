document.addEventListener('DOMContentLoaded', function () {
    const registrationForm = document.getElementById('registrationForm');

    if (registrationForm) {
        registrationForm.addEventListener('submit', function (event) {
            event.preventDefault();

            const username = document.getElementById('username').value;
            const password = document.getElementById('password').value;
            const errorMessage = document.getElementById('errorMessage');
            errorMessage.textContent = '';

            if (username.length < 6 || username.length > 20) {
                errorMessage.textContent += 'O nome de utilizador deve ter entre 6 e 20 caracteres.\n';
            }
            if (password.length < 6 || password.length > 15) {
                errorMessage.textContent += 'A password deve ter entre 6 e 15 caracteres.\n';
            }

            if (errorMessage.textContent === '') {
                // processar o registo
                alert('Registo efetuado com sucesso!');
            }
        });
    }
});

function login() {
    const username = document.getElementById('usernameLogin').value;
    const password = document.getElementById('passwordLogin').value;
    const loginErrorMessage = document.getElementById('loginErrorMessage');
    loginErrorMessage.textContent = '';

    if (username === '' || password === '') {
        loginErrorMessage.textContent = 'Por favor, preencha todos os campos.';
    } else {
        alert('Login efetuado com sucesso!');
        const modal = bootstrap.Modal.getInstance(document.getElementById('loginModal'));
        modal.hide();
    }
}

function register() {
    alert('This button is a test.');
}
