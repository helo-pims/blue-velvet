document.getElementById('register-form').addEventListener('submit', function(event) {
    event.preventDefault(); // Previne o envio do formulário para validar os dados antes

    // Captura os dados do formulário
    const fullName = document.getElementById('full-name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirm-password').value;
    const role = document.getElementById('role').value;

    // Mensagens de erro
    const errorMessage = document.getElementById('error-message');

    // Resetando as mensagens de erro
    errorMessage.textContent = '';

    // Validação de senha
    if (password.length < 8) {
        errorMessage.textContent = "A senha deve ter pelo menos 8 caracteres.";
        return;
    }

    // Validação de confirmação de senha
    if (password !== confirmPassword) {
        errorMessage.textContent = "As senhas não coincidem.";
        return;
    }

    // Validação de campo de cargo
    if (!role) {
        errorMessage.textContent = "Por favor, selecione uma função.";
        return;
    }

    // Simulação de salvar o usuário (aqui estamos usando o localStorage para simulação)
    const user = {
        fullName: fullName,
        email: email,
        password: password,
        role: role
    };

    // Salvar usuário no localStorage (poderia ser no banco de dados)
    localStorage.setItem(email, JSON.stringify(user));

    // Redirecionar para a página de login após o registro
    window.location.href = "index.html";
});
