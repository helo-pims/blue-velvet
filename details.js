document.addEventListener("DOMContentLoaded", () => {
    // Recupera o ID do produto da URL
    const params = new URLSearchParams(window.location.search);
    const productId = parseInt(params.get("id"));

    if (!productId) {
        alert("Produto não encontrado.");
        window.location.href = "dashboard.html"; // Volta ao dashboard
        return;
    }

    // Recupera os produtos salvos no localStorage
    const products = JSON.parse(localStorage.getItem("products")) || [];
    const product = products.find(p => p.id === productId);

    if (!product) {
        alert("Produto não encontrado.");
        window.location.href = "dashboard.html"; // Volta ao dashboard
        return;
    }

    // Preenche os dados do produto na página
    document.getElementById("product-image").src = product.mainImage;
    document.getElementById("product-name").textContent = product.name;
    document.getElementById("product-description").textContent = product.shortDescription || "No description provided.";
    document.getElementById("product-brand").textContent = product.brand || "Unknown";
    document.getElementById("product-category").textContent = product.category || "Unknown";
    document.getElementById("product-price").textContent = product.price?.toFixed(2) || "0.00";
    document.getElementById("product-discount").textContent = product.discount || "0";
    document.getElementById("product-dimensions").textContent = product.dimensions || "Not specified";
    document.getElementById("product-weight").textContent = product.weight?.toFixed(2) || "Not specified";
    document.getElementById("product-details").textContent = product.details || "No additional details provided.";

    // Adiciona funcionalidade para o botão de fechar
    document.querySelector(".close-btn").addEventListener("click", () => {
        window.location.href = "dashboard.html"; // Fecha o popup e volta ao dashboard
    });
});
