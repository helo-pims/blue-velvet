document.getElementById('admin-login-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const email = document.getElementById('admin-email').value.trim();
    const password = document.getElementById('admin-password').value.trim();

    // Validação de campos vazios
    if (!email || !password) {
        alert("Por favor, preencha todos os campos.");
        return;
    }

    const user = JSON.parse(localStorage.getItem(email));

    if (!user) {
        alert("Usuário não encontrado.");
    } else if (user.password !== password) {
        alert("Senha incorreta.");
    } else if (user.role !== "admin") {
        alert("Acesso negado! Apenas administradores podem acessar esta área.");
    } else {
        console.log("Login de administrador bem-sucedido");
        localStorage.setItem('adminUser', JSON.stringify(user)); // Salva o administrador logado
        window.location.href = "register.html"; // Redireciona para a página de registro
    }
});
