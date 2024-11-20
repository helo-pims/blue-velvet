document.addEventListener("DOMContentLoaded", function () {
    const loggedInEmail = localStorage.getItem("loggedInEmail");
    const loggedInUser = JSON.parse(localStorage.getItem(loggedInEmail));

    if (!loggedInUser || (loggedInUser.role !== "admin" && loggedInUser.role !== "editor")) {
        alert("Você não tem permissão para criar produtos.");
        window.location.href = "dashboard.html";
        return;
    }

    const form = document.getElementById("create-product-form");
    if (!form) {
        console.error("Formulário não encontrado!");
        return;
    }

    form.addEventListener("submit", async function (event) {
        event.preventDefault();

        const formData = new FormData(form);

        // Processa a imagem principal
        const mainImage = await processMainImage(formData.get("main-image"));

        // Processa as imagens destacadas
        const featuredFiles = formData.getAll("featured-images");
        const featuredImages = await processFeaturedImages(featuredFiles);

        const newProduct = {
            id: getNextProductId(),
            name: formData.get("product-name")?.trim(),
            shortDescription: formData.get("short-description")?.trim(),
            fullDescription: formData.get("full-description")?.trim(),
            brand: formData.get("brand")?.trim(),
            category: formData.get("category")?.trim(),
            mainImage: mainImage, // Imagem principal processada
            extraImages: featuredImages, // Imagens destacadas processadas
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

        // Validações
        if (!newProduct.name) {
            alert("O campo de nome do produto é obrigatório.");
            return;
        }

        const existingProducts = JSON.parse(localStorage.getItem("products")) || [];
        const isNameUnique = !existingProducts.some(product =>
            product.name?.trim().toLowerCase() === newProduct.name?.trim().toLowerCase()
        );

        if (!isNameUnique) {
            alert("Já existe um produto com esse nome. Escolha outro nome.");
            return;
        }

        existingProducts.push(newProduct);
        localStorage.setItem("products", JSON.stringify(existingProducts));

        alert("Produto adicionado com sucesso!");
        form.reset();
        window.location.href = "dashboard.html";
    });

    function getNextProductId() {
        const products = JSON.parse(localStorage.getItem("products")) || [];
        return products.length > 0 ? Math.max(...products.map(p => p.id)) + 1 : 1;
    }

    // Função para processar a imagem principal
    function processMainImage(file) {
        return new Promise((resolve) => {
            if (!file || !(file instanceof File)) {
                resolve("img/Blue Velvet.png"); // Imagem padrão
                return;
            }

            const reader = new FileReader();
            reader.onload = function (e) {
                resolve(e.target.result); // Base64 da imagem
            };
            reader.readAsDataURL(file);
        });
    }

    // Função para processar as imagens destacadas
    function processFeaturedImages(files) {
        return new Promise((resolve) => {
            const images = [];
            let processed = 0;

            Array.from(files).forEach((file) => {
                const reader = new FileReader();
                reader.onload = function (e) {
                    images.push(e.target.result); // Adiciona o Base64 ao array
                    processed++;

                    // Resolve quando todas as imagens forem processadas
                    if (processed === files.length) {
                        resolve(images);
                    }
                };
                reader.readAsDataURL(file);
            });

            if (files.length === 0) {
                resolve([]); // Nenhuma imagem selecionada
            }
        });
    }
});