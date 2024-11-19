document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("edit-product-form");
    const productId = new URLSearchParams(window.location.search).get("id");

    if (!productId) {
        alert("Produto não encontrado!");
        window.location.href = "dashboard.html";
        return;
    }

    const products = JSON.parse(localStorage.getItem("products")) || [];
    const product = products.find(p => p.id === parseInt(productId));

    if (!product) {
        alert("Produto não encontrado!");
        window.location.href = "dashboard.html";
        return;
    }

    // Preenche o formulário com os dados do produto
    form["product-id"].value = product.id;
    form["product-name"].value = product.name;
    form["short-description"].value = product.shortDescription;
    form["full-description"].value = product.fullDescription;
    form["brand"].value = product.brand;
    form["category"].value = product.category;
    form["price"].value = product.price;
    form["discount"].value = product.discount;
    form["visualization"].value = product.enabled ? "true" : "false";
    form["stock"].checked = product.inStock;
    form["dimensions"].value = product.dimensions;
    form["weight"].value = product.weight;
    form["cost"].value = product.cost;
    form["details"].value = product.details;

    // Salva as alterações no localStorage
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
        alert("Produto atualizado com sucesso!");
        window.location.href = "dashboard.html";
    });
});
