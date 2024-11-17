// Evento de submissão do formulário de login
document.getElementById('login-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    const user = JSON.parse(localStorage.getItem(user));

    const errorModal = document.getElementById('error-modal');
    const closeModalBtn = document.getElementById('close-modal-btn');
    const closeBtn = document.querySelector('.close-btn'); // Seleciona o botão "X"
    const modalMessage = document.getElementById('modal-message');

    modalMessage.textContent = ''; // Resetando mensagem do modal

    if (user && user.password === password) {
        window.location.href = "dashboard.html";
    } else {
        modalMessage.textContent = "Email ou senha incorretos. Por favor, tente novamente.";
        errorModal.style.display = 'flex'; // Exibe o modal de erro
    }

    // Fechar o modal ao clicar no botão "Fechar"
    closeModalBtn.addEventListener('click', function() {
        errorModal.style.display = 'none';
    });

    // Fechar o modal ao clicar no botão "X"
    closeBtn.addEventListener('click', function() {
        errorModal.style.display = 'none';
    });

    // Fechar o modal clicando fora do conteúdo
    window.addEventListener('click', function(event) {
        if (event.target === errorModal) {
            errorModal.style.display = 'none';
        }
    });
});

// Redireciona para a página de login de administrador ao clicar em "Registrar-se"
document.getElementById('register-link').addEventListener('click', function(event) {
    event.preventDefault();

    const adminWarningModal = document.getElementById('admin-warning-modal');
    adminWarningModal.style.display = "flex";

    document.getElementById('go-to-admin-login').addEventListener('click', function() {
        window.location.href = "admin-login.html";
    });
});
