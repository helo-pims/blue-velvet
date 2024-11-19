document.addEventListener("DOMContentLoaded", function () {
    // Verifica se o usuário está logado e autorizado
    const loggedInEmail = localStorage.getItem("loggedInEmail");
    const loggedInUser = JSON.parse(localStorage.getItem(loggedInEmail));

    if (!loggedInUser || (loggedInUser.role !== "admin" && loggedInUser.role !== "editor")) {
        alert("Você não tem permissão para criar produtos.");
        window.location.href = "dashboard.html"; // Redireciona para login ou página inicial
        return;
    }

    // Recupera o formulário
    const form = document.getElementById("create-product-form");
    if (!form) {
        console.error("Formulário não encontrado!");
        return;
    }

    // Adiciona o evento de submit
    form.addEventListener("submit", function (event) {
        event.preventDefault();

        const formData = new FormData(form);
        console.log("Valores do FormData:", Object.fromEntries(formData.entries())); // Depuração

        const newProduct = {
            id: getNextProductId(),
            name: formData.get("product-name")?.trim(),
            shortDescription: formData.get("short-description")?.trim(),
            fullDescription: formData.get("full-description")?.trim(),
            brand: formData.get("brand")?.trim(),
            category: formData.get("category")?.trim(),
            mainImage: formData.get("main-image") instanceof File && formData.get("main-image").name
                ? formData.get("main-image").name
                : "img/Blue Velvet.png", // Imagem padrão se não for fornecida
            extraImages: formData.get("featured-images") instanceof File && formData.get("featured-images").name
                ? formData.get("featured-images").name
                : null,
            price: parseFloat(formData.get("price")) || null,
            discount: parseFloat(formData.get("discount")) || null,
            enabled: formData.get("visualization") === "true",
            inStock: formData.get("stock") === "true",
            dimensions: formData.get("dimensions")?.trim() || null,
            weight: parseFloat(formData.get("weight")) || null,
            cost: parseFloat(formData.get("cost")) || null,
            details: formData.get("details")?.trim(),
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
        };

        if (!newProduct.name) {
            alert("O campo de nome do produto é obrigatório.");
            return;
        }

        // Verifica se o nome do produto é único
        
        const existingProducts = JSON.parse(localStorage.getItem("products")) || [];
        // Verifica se o nome do produto é único
        const isNameUnique = !existingProducts.some(product => {
            const existingName = product.name?.trim().toLowerCase();
            const newName = newProduct.name?.trim().toLowerCase();
            console.log(`Comparando: ${existingName} com ${newName}`);
            return existingName === newName;
        });

        if (!isNameUnique) {
            alert("Já existe um produto com esse nome. Escolha outro nome.");
            return;
        }

        // Adiciona o novo produto à lista
        existingProducts.push(newProduct);
        localStorage.setItem("products", JSON.stringify(existingProducts));

        alert("Produto adicionado com sucesso!");
        form.reset(); // Limpa o formulário
        window.location.href = "dashboard.html"; // Redireciona para a página de gerenciamento de produtos
    });

    // Função para calcular o próximo ID
    function getNextProductId() {
        const products = JSON.parse(localStorage.getItem("products")) || [];
        return products.length > 0 ? Math.max(...products.map(p => p.id)) + 1 : 1;
    }
});
