// Verifica se já existe um administrador no localStorage
if (!localStorage.getItem("admin@example.com")) {
    const user = [{
        fullName: "Admin User",
        email: "admin@example.com",
        password: "admin123",
        role: "admin",
        },{
        fullName: "Heloisa",
        email:"helo@bluevelvet.com",
        password:"helo1234",
        role:"salesperson"}];

    // Salva o administrador no localStorage
    localStorage.setItem(user.email, JSON.stringify(user));
    console.log("Usuário administrador padrão criado.");
}
