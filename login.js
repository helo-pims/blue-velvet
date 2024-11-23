document.getElementById('login-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const email = document.getElementById('email').value.trim(); // Remove espaços em branco
    const password = document.getElementById('password').value;

    const user = JSON.parse(localStorage.getItem(email)); // Acesso ao usuário

    const errorModal = document.getElementById('error-modal');
    const modalMessage = document.getElementById('modal-message');

    modalMessage.textContent = ''; // Resetando mensagem do modal

    // Verifica se os campos estão preenchidos
    if (!email || !password) {
        modalMessage.textContent = "Por favor, preencha todos os campos.";
        errorModal.style.display = 'flex';
        return;
    }

    // Verifica se o usuário existe e se a senha está correta
    if (user && user.password === password) {
        localStorage.setItem("loggedInEmail", email); // Armazena o email do usuário logado

        // Redireciona baseado no role
        if (user.role === 'editor') {
            window.location.href = "datadashboard.html"; // Página para editores
        } else {
            window.location.href = "dashboard.html"; // Página padrão
        }
    } else {
        modalMessage.textContent = "Email ou senha incorretos. Por favor, tente novamente.";
        errorModal.style.display = 'flex'; // Exibe o modal de erro
    }
});

// Listeners de modal fora do submit
const closeModalBtn = document.getElementById('close-modal-btn');
const closeBtn = document.querySelector('.close-btn'); // Seleciona o botão "X"
const errorModal = document.getElementById('error-modal');

// Função para fechar o modal
function closeModal() {
    errorModal.style.display = 'none';
}

closeModalBtn.addEventListener('click', closeModal);
closeBtn.addEventListener('click', closeModal);

window.addEventListener('click', function(event) {
    if (event.target === errorModal) {
        closeModal();
    }
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
