

let products = JSON.parse(localStorage.getItem('products')) || [];
const initialProducts = [...products];

let currentPage = 1;
const productsPerPage = 10;

// Função para renderizar produtos
function renderProducts() {
    const search = document.getElementById("search").value.toLowerCase();
    
    
    const filteredProducts = products.filter(product =>
      product.name.toLowerCase().includes(search)
    );
    
    

    document.getElementById("add-product-btn").addEventListener("click", () => {
        const loggedInEmail = localStorage.getItem("loggedInEmail");
    
        if (loggedInEmail) {
            const user = JSON.parse(localStorage.getItem(loggedInEmail));
    
            if (user && (user.role === "admin" || user.role === "editor")) {
                // Redireciona para datadashboard.html se for admin
                window.location.href = "createProduct.html";
            } else {
                // Redireciona para dashboard.html para outros cargos
                alert("Access denied. Redirecting to the main dashboard.");
                window.location.href = "dashboard.html";
            }
        } else {
            // Redireciona para dashboard.html se nenhum usuário estiver logado
            alert("You need to log in to access this page.");
            window.location.href = "index.html";
        }
    });

document.getElementById("main-d").addEventListener("click", () => {
        window.location.href = "dashboard.html";
        renderProducts();
    });

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
        productCard.className = "flip-card"; // Adiciona a classe flip-card
        
        productCard.innerHTML = `
            <div class="flip-card-inner">
                <!-- Frente do cartão -->
                <div class="flip-card-front">
                    <div class="image-placeholder">
                        <img src="${product.mainImage}" alt="${product.name}" />
                    </div>
                    <div class="title">${product.name}</div>
                </div>
                <!-- Verso do cartão -->
                <div class="flip-card-back">
                    <div class="back-title">Product Details</div>
                    <div class="info-text">
                        <p><strong>Brand:</strong> ${product.brand}</p>
                        <p><strong>Category:</strong> ${product.category}</p>
                        <button onclick="viewDetails(${product.id})">View Details</button>
                        <button onclick="editProduct(${product.id})">Edit</button>
                        <button onclick="deleteProduct(${product.id})">Delete</button>
                    </div>
                </div>
            </div>
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



//modal detalhes


let currentCarouselIndex = 0; // Índice da imagem atual no carrossel
let carouselImages = []; // Todas as imagens a serem exibidas no carrossel

function viewDetails(productId) {
    const product = products.find(p => p.id === productId);

    if (!product) {
        alert("Product not found.");
        return;
    }

   // Preenchendo os dados do modal
   document.getElementById("modal-product-name").textContent = product.name || "No Name";
   document.getElementById("modal-product-short-description").textContent = product.shortDescription || "No short description.";
   document.getElementById("modal-product-full-description").textContent = product.fullDescription || "No full description.";
   document.getElementById("modal-product-brand").textContent = product.brand || "Not specified";
   document.getElementById("modal-product-category").textContent = product.category || "Not specified";
   const price = product.price ? `$${product.price.toFixed(2)}` : "$0.00";
   const discount = product.discount ? `${product.discount.toFixed(2)}%` : "No discount";
   document.getElementById("modal-product-price").textContent = price;
   document.getElementById("modal-product-discount").textContent = discount;
   // Stock and enabled status
   document.getElementById("modal-product-in-stock").textContent = product.inStock ? "Yes" : "No";
   document.getElementById("modal-product-enabled").textContent = product.enabled ? "Yes" : "No";
   document.getElementById("modal-product-dimensions").textContent = product.dimensions || "Not specified";
   document.getElementById("modal-product-weight").textContent = product.weight ? `${product.weight} kg` : "Not specified";
       // Cost and additional details
       const cost = product.cost ? `$${product.cost.toFixed(2)}` : "Not specified";
       document.getElementById("modal-product-cost").textContent = cost;
       document.getElementById("modal-product-details").textContent = product.details || "No additional details.";
           // Timestamps
   document.getElementById("modal-product-created-at").textContent = product.createdAt || "Unknown";
   document.getElementById("modal-product-updated-at").textContent = product.updatedAt || "Unknown";


    // Configuração do carrossel
    carouselImages = [product.mainImage, ...(product.extraImages || [])].filter(Boolean); // Combina a imagem principal com as destacadas
    currentCarouselIndex = 0;

    if (carouselImages.length > 0) {
        document.getElementById("carousel-image").src = carouselImages[currentCarouselIndex];
        document.getElementById("images-carousel").style.display = "flex"; // Exibe o carrossel
    } else {
        document.getElementById("images-carousel").style.display = "none"; // Esconde o carrossel se não houver imagens
    }

    // Exibe o modal
    document.getElementById("product-modal").style.display = "flex";
}

// Função para atualizar o carrossel ao navegar
function updateCarouselImage(direction) {
    if (carouselImages.length === 0) return;

    if (direction === "next") {
        currentCarouselIndex = (currentCarouselIndex + 1) % carouselImages.length;
    } else if (direction === "prev") {
        currentCarouselIndex = (currentCarouselIndex - 1 + carouselImages.length) % carouselImages.length;
    }

    document.getElementById("carousel-image").src = carouselImages[currentCarouselIndex];
}

// Eventos para as setas do carrossel
document.getElementById("prev-carousel-image").addEventListener("click", () => updateCarouselImage("prev"));
document.getElementById("next-carousel-image").addEventListener("click", () => updateCarouselImage("next"));

// Fecha o modal ao clicar fora do conteúdo
window.addEventListener("click", (e) => {
    const modal = document.getElementById("product-modal");
    if (e.target === modal) {
        closeModal();
    }
});



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


