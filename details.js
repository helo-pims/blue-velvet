document.addEventListener("DOMContentLoaded", function () {
    // Recupera o ID do produto selecionado
    const selectedProductId = localStorage.getItem("selectedProductId");
    if (!selectedProductId) {
        alert("Nenhum produto selecionado.");
        window.close();
        return;
    }

    // Recupera os produtos do localStorage
    const products = JSON.parse(localStorage.getItem("products")) || [];
    const product = products.find(p => p.id == selectedProductId);

    if (!product) {
        alert("Produto não encontrado.");
        window.close();
        return;
    }

    // Preenche os detalhes do produto
    document.getElementById("product-image").src = product.mainImage || "img/default.png";
    document.getElementById("product-name").textContent = product.name || "Sem Nome";
    document.getElementById("product-short-description").textContent = product.shortDescription || "Sem descrição breve.";
    document.getElementById("product-full-description").textContent = product.fullDescription || "Sem descrição completa.";
    document.getElementById("product-brand").textContent = product.brand || "Não especificada";
    document.getElementById("product-category").textContent = product.category || "Não especificada";
    document.getElementById("product-extra-images").textContent = product.extraImages || "Nenhuma imagem extra.";
    document.getElementById("product-price").textContent = product.price ? product.price.toFixed(2) : "0.00";
    document.getElementById("product-discount").textContent = product.discount || "0";
    document.getElementById("product-enabled").textContent = product.enabled ? "Yes" : "No";
    document.getElementById("product-in-stock").textContent = product.inStock ? "Yes" : "No";
    document.getElementById("product-dimensions").textContent = product.dimensions || "Não especificadas";
    document.getElementById("product-weight").textContent = product.weight || "Não especificado";
    document.getElementById("product-cost").textContent = product.cost ? product.cost.toFixed(2) : "0.00";
    document.getElementById("product-details").textContent = product.details || "Sem detalhes adicionais.";
    document.getElementById("product-created-at").textContent = product.createdAt || "Desconhecido";
    document.getElementById("product-updated-at").textContent = product.updatedAt || "Desconhecido";
});
