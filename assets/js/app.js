const categoryList = document.getElementById("categoryList");
const productList = document.getElementById("productList");
const searchInput = document.getElementById("searchInput");

async function fetchCategories() {
    const response = await fetch("https://fakestoreapi.com/products/categories");
    const categories = await response.json();
    return categories;
}

async function fetchProducts() {
    const response = await fetch("https://fakestoreapi.com/products");
    const products = await response.json();
    return products;
}

function renderCategories(categories) {
    categoryList.innerHTML = categories.map(category => `<li>${category}</li>`).join("");

}

function renderProducts(products) {
    productList.innerHTML = products.map(product => `<li>
    <span>${product.title}</span>
    <span>---------</span>
    <span>${product.price} $</span>
    <img style="width:50px;" src="${product.image}" />
    </li>`).join("");

}

window.addEventListener("DOMContentLoaded", async () => {
    const categories = await fetchCategories();
    const products = await fetchProducts();
    renderCategories(categories);
    renderProducts(products);
});

searchInput.addEventListener("input", async () => {
    const searchTerm = searchInput.value.toLowerCase();
    const products = await fetchProducts();
    const filteredProducts = products.filter(product => {
        return product.title.toLowerCase().includes(searchTerm) || product.category.toLowerCase().includes(searchTerm);
    });
    renderProducts(filteredProducts);
});