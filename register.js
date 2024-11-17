document.addEventListener('DOMContentLoaded', function () {
    const loggedInUser = JSON.parse(localStorage.getItem('adminUser'));
    console.log(loggedInUser);

    // Verifica se o usuário é administrador
    if (!loggedInUser || loggedInUser.role !== 'admin') {
        alert('Acesso negado. Apenas administradores podem registrar novos usuários.');
        window.location.href = 'index.html';
    }
});

document.getElementById('register-form').addEventListener('submit', function(event) {
    event.preventDefault();

    // Captura os dados do formulário
    const fullName = document.getElementById('full-name').value.trim();
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirm-password').value;
    const role = document.getElementById('role').value;

    const errorMessage = document.getElementById('error-message');
    errorMessage.textContent = '';

    // Validações
    if (!fullName || !email || !password || !confirmPassword || !role) {
        errorMessage.textContent = "Todos os campos devem ser preenchidos.";
        return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        errorMessage.textContent = "Por favor, insira um email válido.";
        return;
    }

    if (password.length < 8) {
        errorMessage.textContent = "A senha deve ter pelo menos 8 caracteres.";
        return;
    }

    if (password !== confirmPassword) {
        errorMessage.textContent = "As senhas não coincidem.";
        return;
    }

    if (localStorage.getItem(email)) {
        errorMessage.textContent = "Um usuário com este email já está registrado.";
        return;
    }

    // Salva o usuário no localStorage
    const user = { fullName, email, password, role };
    localStorage.setItem(email, JSON.stringify(user));

    // Feedback e redirecionamento
    alert("Usuário registrado com sucesso!");
    window.location.href = "index.html";
});
