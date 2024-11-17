const products = [
    { id: 1, name: "Product A", description: "Short description A", brand: "Brand A", category: "Category 1", image: "img/image.jpg" },
    { id: 2, name: "Product B", description: "Short description B", brand: "Brand B", category: "Category 2", image: "img/image.jpg" },
    { id: 3, name: "Product C", description: "Short description C", brand: "Brand C", category: "Category 3", image: "img/image.jpg" },
    { id: 4, name: "Product D", description: "Short description D", brand: "Brand D", category: "Category 4", image: "img/image.jpg" },
];

if (!localStorage.getItem('products')) {
   localStorage.setItem('products', JSON.stringify(products));
}
