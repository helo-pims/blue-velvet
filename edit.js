document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("edit-product-form");
    const mainImageInput = document.getElementById("main-image");
    const mainImagePreview = document.getElementById("main-image-preview");
    const featuredImagesInput = document.getElementById("featured-images");
    const featuredImagesPreview = document.getElementById("featured-images-preview");

    const productId = new URLSearchParams(window.location.search).get("id");
    if (!productId) {
        alert("Produtc not Found!");
        window.location.href = "dashboard.html";
        return;
    }

    const products = JSON.parse(localStorage.getItem("products")) || [];
    const product = products.find(p => p.id === parseInt(productId));

    if (!product) {
        alert("Produto not found!");
        window.location.href = "dashboard.html";
        return;
    }

    // Preencher campos do formulário
    form["product-id"].value = product.id || "";
    form["product-name"].value = product.name || "";
    form["short-description"].value = product.shortDescription || "";
    form["full-description"].value = product.fullDescription || "";
    form["brand"].value = product.brand || "";
    form["category"].value = product.category || "";
    form["price"].value = product.price || "";
    form["discount"].value = product.discount || "";
    form["visualization"].value = product.enabled ? "true" : "false";
    form["stock"].value = product.inStock ? "true" : "false";
    form["dimensions"].value = product.dimensions || "";
    form["weight"].value = product.weight || "";
    form["cost"].value = product.cost || "";
    form["details"].value = product.details || "";

    // Mostrar imagem principal
    if (product.mainImage) {
        mainImagePreview.innerHTML = `
            <div>
                <img src="${product.mainImage}" alt="Main Image">
                <button class="remove-button" id="remove-main-image">Remover</button>
            </div>
        `;
    }

    // Substituir imagem principal
    mainImageInput.addEventListener("change", function () {
        const file = this.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function (e) {
                product.mainImage = e.target.result;
                localStorage.setItem("products", JSON.stringify(products));
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

    // Remover imagem principal
    mainImagePreview.addEventListener("click", function (e) {
        if (e.target.id === "remove-main-image") {
            product.mainImage = null;
            localStorage.setItem("products", JSON.stringify(products));
            mainImagePreview.innerHTML = "";
        }
    });

    // Mostrar imagens destacadas existentes
    if (product.extraImages && product.extraImages.length > 0) {
        product.extraImages.forEach((image, index) => {
            const imageContainer = document.createElement("div");
            imageContainer.innerHTML = `
                <img src="${image}" alt="Featured Image ${index + 1}">
                <button class="remove-button" data-index="${index}">Remover</button>
            `;
            featuredImagesPreview.appendChild(imageContainer);
        });
    }

    // Adicionar imagens destacadas
    featuredImagesInput.addEventListener("change", function () {
        const files = Array.from(this.files);
        files.forEach(file => {
            const reader = new FileReader();
            reader.onload = function (e) {
                const div = document.createElement("div");
                div.innerHTML = `
                    <img src="${e.target.result}" alt="Featured Image">
                    <button class="remove-button">Remover</button>
                `;
                featuredImagesPreview.appendChild(div);
                product.extraImages.push(e.target.result);
                localStorage.setItem("products", JSON.stringify(products));
            };
            reader.readAsDataURL(file);
        });
    });

    // Remover imagens destacadas
    featuredImagesPreview.addEventListener("click", function (event) {
        if (event.target.tagName === "BUTTON" && event.target.classList.contains("remove-button")) {
            const index = Array.from(featuredImagesPreview.children).indexOf(event.target.parentElement);
            product.extraImages.splice(index, 1); // Remove do array
            localStorage.setItem("products", JSON.stringify(products));
            event.target.parentElement.remove(); // Remove do DOM
        }
    });

    // Salvar alterações
    form.addEventListener("submit", function (event) {
        event.preventDefault();
        const formData = new FormData(form);
        product.name = formData.get("product-name").trim();
        product.shortDescription = formData.get("short-description").trim();
        product.fullDescription = formData.get("full-description").trim();
        product.brand = formData.get("brand").trim();
        product.category = formData.get("category").trim();
        product.price = parseFloat(formData.get("price")) || null;
        product.discount = parseFloat(formData.get("discount")) || null;
        product.enabled = formData.get("visualization") === "true";
        product.inStock = formData.get("stock") === "true";
        product.dimensions = formData.get("dimensions").trim();
        product.weight = parseFloat(formData.get("weight")) || null;
        product.cost = parseFloat(formData.get("cost")) || null;
        product.details = formData.get("details").trim();
        product.updatedAt = new Date().toISOString();

        localStorage.setItem("products", JSON.stringify(products));
        alert("Product edited successfully");
        window.location.href = "datadashboard.html";
    });
});
