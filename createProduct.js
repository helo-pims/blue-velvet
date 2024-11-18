document.addEventListener("DOMContentLoaded", function () {
    // Verifica se o usuário está logado e se tem permissão
    const loggedInEmail = localStorage.getItem("loggedInEmail");
    const loggedInUser = JSON.parse(localStorage.getItem(loggedInEmail));

    if (!loggedInUser || (loggedInUser.role !== "admin" && loggedInUser.role !== "editor")) {
        alert("You do not have permission to create products.");
        window.location.href = "index.html"; // Redireciona para a página inicial ou login
        return;
    }

    // Adiciona o evento de submit ao formulário
    document.querySelector(".create-product-form").addEventListener("submit", function (event) {
        event.preventDefault(); // Impede o envio padrão do formulário

        // Coleta os dados do formulário
        const product = {
            id: getNextProductId(), // Gera um ID único baseado no maior ID existente + 1
            name: document.getElementById("product-name").value,
            shortDescription: document.getElementById("short-description").value,
            fullDescription: document.getElementById("full-description").value,
            brand: document.getElementById("brand").value,
            category: document.getElementById("category").value,
            mainImage: document.getElementById("main-image").files[0]?.name || "",
            featuredImages: Array.from(document.getElementById("featured-images").files).map(file => file.name),
            listPrice: parseFloat(document.getElementById("price").value) || 0,
            discount: parseFloat(document.getElementById("discount").value) || 0,
            enabled: document.getElementById("visualization").checked,
            inStock: document.getElementById("stock").checked,
            dimensions: document.getElementById("dimensions").value,
            weight: parseFloat(document.getElementById("weight").value) || 0,
            cost: parseFloat(document.getElementById("cost").value) || 0, // Adicionando custo
            details: document.getElementById("details").value,
            creationTime: new Date().toISOString(),
            updateTime: new Date().toISOString()
        };

        // Atualiza o localStorage com o novo produto
        const products = JSON.parse(localStorage.getItem("products")) || [];
        products.push(product);
        localStorage.setItem("products", JSON.stringify(products));

        // Redireciona para o dashboard após a criação do produto
        alert("Product created successfully!");
        window.location.href = "dashboard.html";
    });

    // Função para obter o próximo ID
    function getNextProductId() {
        const products = JSON.parse(localStorage.getItem("products")) || [];
        if (products.length === 0) return 1; // Se não houver produtos, comece com ID 1

        // Encontra o maior ID existente e retorna +1
        const maxId = Math.max(...products.map(product => product.id));
        return maxId + 1;
    }
});
