document.getElementById('admin-login-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const email = document.getElementById('admin-email').value;
    const password = document.getElementById('admin-password').value;

    const user = JSON.parse(localStorage.getItem(user));

    if (user && user.password === password && user.role === "Administrator") {
        window.location.href = "register.html";
    } else {
        alert("Acesso negado! Apenas administradores podem registrar novos usuários.");
    }
});
