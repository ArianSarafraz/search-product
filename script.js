//   http://localhost:3000/items

const searchForm = document.querySelector(".search-form");
const searchInput = document.querySelector(".search-input");
const productsContainer = document.querySelector(".products-center");
const buttons = document.querySelectorAll(".btn");

let allProductsData = [];

const filters = {
    searchItems: ""
}

document.addEventListener("DOMContentLoaded", () => {
    axios.get("http://localhost:3000/items").then((res) => {
        allProductsData = res.data;
        // render products on DOM
        renderProducts(res.data, filters);

    })
        .catch((err) => console.log(err));
});

function renderProducts(_products, _filters) {
    const filteredProducts = _products.filter((p) => {
        return p.title.toLowerCase().includes(_filters.searchItems.toLowerCase());
    });
    productsContainer.innerHTML = "";
    // console.log(filteredProducts);
    filteredProducts.forEach((item) => {
        const productDiv = document.createElement("div");
        productDiv.classList.add("product");
        productDiv.innerHTML = `
        <div class="img-container">
          <img src="${item.image}" class="p-img" alt="" />
        </div>
        <div class="details">
          <span class="price">${item.price} $</span>
          <span class="p-name">${item.title}</span>
        </div>`;
        productsContainer.appendChild(productDiv);
    })

}


searchForm.addEventListener("submit", () => {
    filters.searchItems = searchInput.value;
    renderProducts(allProductsData, filters);
});

// -------------------filter products based on their category using header buttons ---------------
buttons.forEach((btn) => {
    btn.addEventListener("click", (e) => {
        filters.searchItems = e.target.dataset.filter;
        renderProducts(allProductsData, filters);
    });
});