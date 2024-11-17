document.getElementById("product-form").addEventListener("submit", function (event) {
    event.preventDefault();

    // Autenticação (mockada)
    const loggedInUser = JSON.parse(localStorage.getItem("email"));
    if (!loggedInUser || (loggedInUser.role !== "admin" && loggedInUser.role !== "editor")) {
        alert("You do not have permission to create products.");
        return;
    }

    // Obter dados do formulário
    const product = {
        id: Date.now(), // ID único
        name: document.getElementById("product-name").value,
        shortDescription: document.getElementById("short-description").value,
        fullDescription: document.getElementById("full-description").value,
        brand: document.getElementById("brand").value,
        category: document.getElementById("category").value,
        mainImage: document.getElementById("main-image").files[0]?.name || "",
        featuredImages: Array.from(document.getElementById("featured-images").files).map(file => file.name),
        listPrice: parseFloat(document.getElementById("list-price").value),
        discount: parseFloat(document.getElementById("discount").value) || 0,
        enabled: document.getElementById("enabled").checked,
        inStock: document.getElementById("in-stock").checked,
        dimensions: {
            length: parseFloat(document.getElementById("length").value) || 0,
            width: parseFloat(document.getElementById("width").value) || 0,
            height: parseFloat(document.getElementById("height").value) || 0,
            weight: parseFloat(document.getElementById("weight").value) || 0,
        },
        cost: parseFloat(document.getElementById("cost").value),
        productDetails: document.getElementById("product-details").value,
        creationTime: new Date().toISOString(),
        updateTime: new Date().toISOString(),
    };

    // Verificar nome único
    const products = JSON.parse(localStorage.getItem("products")) || [];
    if (products.some(p => p.name === product.name)) {
        alert("Product name must be unique.");
        return;
    }

    // Salvar no localStorage
    products.push(product);
    localStorage.setItem("products", JSON.stringify(products));

    alert("Product created successfully!");
    this.reset(); // Resetar o formulário
});
