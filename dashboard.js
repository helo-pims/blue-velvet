let products = JSON.parse(localStorage.getItem('products')) || [];
const initialProducts = [...products];

let currentPage = 1;
const productsPerPage = 10;

// Função para renderizar produtos
function renderProducts() {
    const search = document.getElementById("search").value.toLowerCase();
    
    // Filtra produtos habilitados
    const filteredProducts = products.filter(product =>
    product.enabled === true &&  (
            product.name.toLowerCase().includes(search) ||
            product.shortDescription.toLowerCase().includes(search) ||
            product.brand.toLowerCase().includes(search) ||
            product.category.toLowerCase().includes(search)
        )
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
function viewDetails(productId) {
    alert(`Viewing details for product ID: ${productId}`);
}

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
    window.location.href = `editProduct.html?id=${productId}`;
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



