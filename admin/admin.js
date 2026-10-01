// ================================
// PRODUCT MANAGEMENT
// ================================

// Get saved products
let products = JSON.parse(localStorage.getItem("products")) || [];

// Get HTML elements
const productForm = document.getElementById("productForm");
const productList = document.getElementById("productList");

const productName = document.getElementById("productName");
const productCategory = document.getElementById("productCategory");
const productPrice = document.getElementById("productPrice");
const productImage = document.getElementById("productImage");
const productBadge = document.getElementById("productBadge");

let editingProductId = null;


// ================================
// SAVE PRODUCTS
// ================================

function saveProducts() {
    localStorage.setItem("products", JSON.stringify(products));
}


// ================================
// DISPLAY PRODUCTS
// ================================

function displayProducts() {

    productList.innerHTML = "";

    if (products.length === 0) {
        productList.innerHTML = `
            <tr>
                <td colspan="5">
                    No products added yet.
                </td>
            </tr>
        `;
        return;
    }

    products.forEach(function(product) {

        const row = document.createElement("tr");

        row.innerHTML = `
            <td>${product.id}</td>

            <td>
                <img
                    src="${product.image}"
                    alt="${product.name}"
                    width="50"
                    height="50"
                    style="object-fit: cover; border-radius: 6px; vertical-align: middle; margin-right: 8px;"
                    onerror="this.src='assets/placeholder.png'"
                >
                ${product.name}
            </td>

            <td>${product.category}</td>

            <td>
                ₦${Number(product.price).toLocaleString()}
            </td>

            <td>
                <button
                    class="btn btn-edit"
                    onclick="editProduct(${product.id})">
                    Edit
                </button>

                <button
                    class="btn btn-delete"
                    onclick="deleteProduct(${product.id})">
                    Delete
                </button>
            </td>
        `;

        productList.appendChild(row);
    });
}


// ================================
// ADD / UPDATE PRODUCT
// ================================

productForm.addEventListener("submit", function(event) {

    event.preventDefault();

    const name = productName.value.trim();
    const category = productCategory.value.trim();
    const price = Number(productPrice.value);
    const image = productImage.value.trim();
    const badge = productBadge.value.trim();

    // Check required information
    if (!name || !category || !price || !image) {
        alert("Please fill in all required fields.");
        return;
    }


    // ============================
    // UPDATE EXISTING PRODUCT
    // ============================

    if (editingProductId !== null) {

        const product = products.find(function(item) {
            return item.id === editingProductId;
        });

        if (product) {

            product.name = name;
            product.category = category;
            product.price = price;
            product.image = image;
            product.badge = badge;
        }

        editingProductId = null;

        document.querySelector("#productForm button").textContent =
            "Add Product";

        alert("Product updated successfully!");

    }

    // ============================
    // ADD NEW PRODUCT
    // ============================

    else {

        const newProduct = {
            id: Date.now(),
            name: name,
            category: category,
            price: price,
            image: image,
            badge: badge
        };

        products.push(newProduct);

        alert("Product added successfully!");
    }


    // Save
    saveProducts();

    // Refresh product list
    displayProducts();

    // Clear form
    productForm.reset();
});


// ================================
// EDIT PRODUCT
// ================================

function editProduct(id) {

    const product = products.find(function(item) {
        return item.id === id;
    });

    if (!product) {
        return;
    }

    productName.value = product.name;
    productCategory.value = product.category;
    productPrice.value = product.price;
    productImage.value = product.image;
    productBadge.value = product.badge || "";

    editingProductId = id;

    document.querySelector("#productForm button").textContent =
        "Update Product";

    // Scroll to form
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}


// ================================
// DELETE PRODUCT
// ================================

function deleteProduct(id) {

    const product = products.find(function(item) {
        return item.id === id;
    });

    if (!product) {
        return;
    }

    const confirmed = confirm(
        "Delete " + product.name + "?"
    );

    if (!confirmed) {
        return;
    }

    products = products.filter(function(item) {
        return item.id !== id;
    });

    saveProducts();

    displayProducts();

    alert("Product deleted successfully!");
}


// ================================
// LOAD PRODUCTS
// ================================

displayProducts();