document.getElementById('login-form').addEventListener('submit', function(event) {
    event.preventDefault(); // Previne o envio do formulário para validar os dados antes

    // Captura os dados do formulário
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    
    // Simulação de verificação de e-mail e senha no banco (aqui estamos usando localStorage como exemplo)
    const user = JSON.parse(localStorage.getItem(email));

    // Modal de erro
    const errorModal = document.getElementById('error-modal');
    const closeModalBtn = document.getElementById('close-modal-btn');
    const modalMessage = document.getElementById('modal-message');

    // Resetando a mensagem do modal
    modalMessage.textContent = '';

    if (user && user.password === password) {
        // Se o login for bem-sucedido
        window.location.href = "dashboard.html"; // Redireciona para a página de admin (dashboard)
    } else {
        // Se o login falhar
        modalMessage.textContent = "Email ou senha incorretos. Por favor, tente novamente.";
        errorModal.style.display = 'flex'; // Exibe o modal
    }
});

// Fechar o modal ao clicar no botão "Fechar"
document.querySelector('.close-btn').addEventListener('click', function() {
    document.getElementById('error-modal').style.display = 'none';
});

// Fechar o modal ao clicar no botão "Fechar" dentro do modal
document.getElementById('close-modal-btn').addEventListener('click', function() {
    document.getElementById('error-modal').style.display = 'none';
});

// Fechar o modal clicando fora do conteúdo do modal
window.addEventListener('click', function(event) {
    const modal = document.getElementById('error-modal');
    if (event.target === modal) {
        modal.style.display = 'none';
    }
});
