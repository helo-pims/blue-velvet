let products = JSON.parse(localStorage.getItem('products')) || [];
const initialProducts = [...products];

let currentPage = 1;
const productsPerPage = 10;

// Função para renderizar produtos
function renderProducts() {
    const search = document.getElementById("search").value.toLowerCase();
    
    // Filtra produtos habilitados
   /* const filteredProducts = products.filter(product =>
    product.enabled === true &&  (
            product.name.toLowerCase().includes(search) ||
            product.shortDescription.toLowerCase().includes(search) ||
            product.brand.toLowerCase().includes(search) ||
            product.category.toLowerCase().includes(search)
        )
    );*/
    const filteredProducts = products.filter(product =>
        product.enabled === true && product.name.toLowerCase().includes(search)
    );
    
    

    
    // Função para verificar o papel do usuário e exibir o botão de Add Product
function checkUserRole() {
    const loggedInEmail = localStorage.getItem("loggedInEmail");

    if (loggedInEmail) {
        const user = JSON.parse(localStorage.getItem(loggedInEmail));

        if (user && user.role === "admin") {
            document.getElementById("add-product-btn").style.display = "inline-block";
        }
    }
}

// Event listener para redirecionar ao clicar no botão
document.getElementById("add-product-btn").addEventListener("click", () => {
    window.location.href = "createProduct.html";
    renderProducts();
});



// Chamar a função ao carregar a página
document.addEventListener("DOMContentLoaded", () => {
    displayUserData();  // Exibe os dados do usuário
    renderProducts();   // Renderiza os produtos
    checkUserRole();    // Checa o papel do usuário
});



    // Ordena os produtos
    const sortedProducts = sortProducts(filteredProducts);

    const startIndex = (currentPage - 1) * productsPerPage;
    const endIndex = startIndex + productsPerPage;
    const productsToDisplay = sortedProducts.slice(startIndex, endIndex);

    const productTable = document.getElementById("product-table");
    productTable.innerHTML = ''; // Limpa a tabela antes de renderizar

    productsToDisplay.forEach(product => {
        const productCard = document.createElement("div");
        productCard.className = "product-card";
        productCard.innerHTML = `
            <img src="${product.mainImage}" alt="${product.name}">
            <h3>${product.name}</h3>
            <p>Brand: ${product.brand}</p>
            <p>Category: ${product.category}</p>
            <button onclick="viewDetails(${product.id})">View Details</button>
            <button onclick="editProduct(${product.id})">Edit</button>
            <button onclick="deleteProduct(${product.id})">Delete</button>
            `;
        
        productTable.appendChild(productCard);
    });

    document.getElementById("page-number").textContent = `Page ${currentPage}`;
    document.getElementById("prev-page").disabled = currentPage === 1;
    document.getElementById("next-page").disabled = currentPage * productsPerPage >= filteredProducts.length;
}

// Função para ordenar os produtos
function sortProducts(filteredProducts) {
    const sortBy = document.getElementById("sort-by").value;
    const order = document.getElementById("order").value;

    const sortedProducts = filteredProducts.sort((a, b) => {
        if (sortBy === "name") return a.name.localeCompare(b.name);
        if (sortBy === "id") return a.id - b.id;
        if (sortBy === "brand") return a.brand.localeCompare(b.brand);
        if (sortBy === "category") return a.category.localeCompare(b.category);
    });

    // Inverte a ordem se necessário
    if (order === "desc") sortedProducts.reverse();

    return sortedProducts;
}

// Função para lidar com logout
function handleLogout() {
    localStorage.removeItem("loggedInEmail"); // Remove o email do usuário logado
    window.location.href = "index.html"; // Redireciona para index.html ao fazer logout
}

// Função para visualizar detalhes do produto
/*function viewDetails(productId) {
    // Salva o ID do produto selecionado no localStorage
    localStorage.setItem("selectedProductId", productId);

    const url = `details.html?id=${productId}`;
    window.location.href = url; // Redireciona na mesma aba
}
*/

// Exibe o modal
function viewDetails(productId) {
    const product = products.find(p => p.id === productId);

    if (!product) {
        alert("Product not found.");
        return;
    }

    // Basic fields
    document.getElementById("modal-product-image").src = product.mainImage || "img/placeholder.png";
    document.getElementById("modal-product-name").textContent = product.name || "No Name";
    document.getElementById("modal-product-short-description").textContent = product.shortDescription || "No short description.";
    document.getElementById("modal-product-full-description").textContent = product.fullDescription || "No full description.";
    document.getElementById("modal-product-brand").textContent = product.brand || "Not specified";
    document.getElementById("modal-product-category").textContent = product.category || "Not specified";

    // Price and discount
    const price = product.price ? `$${product.price.toFixed(2)}` : "$0.00";
    const discount = product.discount ? `${product.discount.toFixed(2)}%` : "No discount";
    document.getElementById("modal-product-price").textContent = price;
    document.getElementById("modal-product-discount").textContent = discount;

    // Stock and enabled status
    document.getElementById("modal-product-in-stock").textContent = product.inStock ? "Yes" : "No";
    document.getElementById("modal-product-enabled").textContent = product.enabled ? "Yes" : "No";

    // Dimensions and weight
    document.getElementById("modal-product-dimensions").textContent = product.dimensions || "Not specified";
    document.getElementById("modal-product-weight").textContent = product.weight ? `${product.weight} kg` : "Not specified";

    // Cost and additional details
    const cost = product.cost ? `$${product.cost.toFixed(2)}` : "Not specified";
    document.getElementById("modal-product-cost").textContent = cost;
    document.getElementById("modal-product-details").textContent = product.details || "No additional details.";

    // Timestamps
    document.getElementById("modal-product-created-at").textContent = product.createdAt || "Unknown";
    document.getElementById("modal-product-updated-at").textContent = product.updatedAt || "Unknown";

    // Show the modal
    document.getElementById("product-modal").style.display = "flex";
}


// Fecha o modal
function closeModal() {
    document.getElementById("product-modal").style.display = "none";
}

// Adiciona evento ao botão de fechar
document.getElementById("close-modal-btn").addEventListener("click", closeModal);

// Fecha o modal ao clicar fora do conteúdo
window.addEventListener("click", (e) => {
    const modal = document.getElementById("product-modal");
    if (e.target === modal) {
        closeModal();
    }
});



// Função para exibir o nome de usuário e o papel
function displayUserData() {
    const loggedInEmail = localStorage.getItem("loggedInEmail");
    
    if (loggedInEmail) {
        const user = JSON.parse(localStorage.getItem(loggedInEmail));
        
        if (user) {
            document.getElementById("username").textContent = user.fullName; // Acesse as propriedades corretas
            document.getElementById("role").textContent = user.role;
        } else {
            console.error("Usuário não encontrado.");
            document.getElementById("username").textContent = "Guest";
            document.getElementById("role").textContent = "Visitor";
        }
    } else {
        console.error("Nenhum usuário logado.");
        document.getElementById("username").textContent = "Guest";
        document.getElementById("role").textContent = "Visitor";
    }
}

// Event listeners
document.getElementById("next-page").addEventListener("click", () => {
    currentPage++;
    renderProducts();
});
document.getElementById("prev-page").addEventListener("click", () => {
    currentPage--;
    renderProducts();
});
document.getElementById("logout-btn").addEventListener("click", handleLogout);

document.getElementById("reset-btn").addEventListener("click", () => {
    if (confirm("Reset products to initial state?")) {
        localStorage.setItem('products', JSON.stringify(initialProducts));
        products = [...initialProducts];
        currentPage = 1; // Reinicia para a primeira página
        renderProducts();
    }
});


// Adicionando evento para atualizar a renderização quando o filtro ou ordenação mudar
document.getElementById("search").addEventListener("input", () => {
    currentPage = 1; // Resetar a página
    renderProducts();
});

document.getElementById("sort-by").addEventListener("change", () => {
    currentPage = 1; // Resetar a página
    renderProducts();
});

document.getElementById("order").addEventListener("change", () => {
    currentPage = 1; // Resetar a página
    renderProducts();
});

// Chame essa função ao carregar a página
document.addEventListener("DOMContentLoaded", () => {
    displayUserData(); // Exibe os dados do usuário
    renderProducts();   // Renderiza os produtos
});

function editProduct(productId) {
    // Redireciona para a página de edição do produto
    window.location.href = `edit.html?id=${productId}`;
}

function deleteProduct(productId) {
    if (confirm("Are you sure you want to delete this product?")) {
        const updatedProducts = products.filter(product => product.id !== productId);

        // Atualiza o armazenamento local
        localStorage.setItem("products", JSON.stringify(updatedProducts));

        // Atualiza a variável global "products"
        products.length = 0;
        products.push(...updatedProducts);
        products = [...updatedProducts]; 

        renderProducts(); // Atualiza a interface
        alert("Product deleted successfully!");
    }
}


