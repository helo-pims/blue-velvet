// Verifica se já existe um administrador no localStorage
if (!localStorage.getItem("admin@example.com")) {
    const users = [
        {
            fullName: "Admin User",
            email: "admin@example.com",
            password: "admin123",
            role: "admin",
        },
        {
            fullName: "Heloisa",
            email: "helo@bluevelvet.com",
            password: "helo1234",
            role: "salesperson",
        },
    ];

    // Salva cada usuário individualmente no localStorage
    users.forEach(user => {
        localStorage.setItem(user.email, JSON.stringify(user));
    });

    console.log("Usuários padrão criados.");
}
