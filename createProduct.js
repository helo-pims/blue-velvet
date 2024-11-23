document.addEventListener("DOMContentLoaded", function () {
    const loggedInEmail = localStorage.getItem("loggedInEmail");
    const loggedInUser = JSON.parse(localStorage.getItem(loggedInEmail));

    if (!loggedInUser || (loggedInUser.role !== "admin" && loggedInUser.role !== "editor")) {
        alert("Você não tem permissão para criar produtos.");
        window.location.href = "dashboard.html";
        return;
    }

    const form = document.getElementById("create-product-form");
    const mainImagePreview = document.getElementById("main-image-preview");
    const featuredImagesPreview = document.getElementById("featured-images-preview");

    if (!form) {
        console.error("Formulário não encontrado!");
        return;
    }

    // Exibe a pré-visualização da imagem principal
    const mainImageInput = form.querySelector("#main-image");
    mainImageInput.addEventListener("change", function () {
        const file = this.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function (e) {
                mainImagePreview.innerHTML = `
                    <div>
                        <img src="${e.target.result}" alt="Main Image">
                        <button class="remove-button" id="remove-main-image">Remover</button>
                    </div>
                `;
            };
            reader.readAsDataURL(file);
        }
    });

    // Remove a imagem principal
    mainImagePreview.addEventListener("click", function (e) {
        if (e.target.id === "remove-main-image") {
            mainImageInput.value = ""; // Reseta o input
            mainImagePreview.innerHTML = ""; // Limpa a pré-visualização
        }
    });

    // Exibe a pré-visualização das imagens destacadas
    const featuredImagesInput = form.querySelector("#featured-images");
    featuredImagesInput.addEventListener("change", function () {
        const files = Array.from(this.files);
        files.forEach((file) => {
            const reader = new FileReader();
            reader.onload = function (e) {
                const div = document.createElement("div");
                div.innerHTML = `
                    <img src="${e.target.result}" alt="Featured Image">
                    <button class="remove-button">Remover</button>
                `;
                featuredImagesPreview.appendChild(div);
            };
            reader.readAsDataURL(file);
        });
    });

    // Remove imagens destacadas individualmente
    featuredImagesPreview.addEventListener("click", function (event) {
        if (event.target.tagName === "BUTTON" && event.target.classList.contains("remove-button")) {
            event.target.parentElement.remove();
        }
    });

    // Processa e salva os dados do formulário
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
        mainImagePreview.innerHTML = ""; // Limpa a pré-visualização da imagem principal
        featuredImagesPreview.innerHTML = ""; // Limpa a pré-visualização das imagens destacadas
        window.location.href = "datadashboard.html";
    });

    function getNextProductId() {
        const products = JSON.parse(localStorage.getItem("products")) || [];
        return products.length > 0 ? Math.max(...products.map(p => p.id)) + 1 : 1;
    }

    function processMainImage(file) {
        return new Promise((resolve) => {
            if (!file || !(file instanceof File) || file.size === 0) {
                // Define a imagem padrão caso nenhum arquivo seja fornecido
                resolve("img/Blue Velvet.png");
                return;
            }

            const reader = new FileReader();
            reader.onload = function (e) {
                resolve(e.target.result); // Base64 da imagem carregada pelo usuário
            };
            reader.readAsDataURL(file);
        });
    }

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
