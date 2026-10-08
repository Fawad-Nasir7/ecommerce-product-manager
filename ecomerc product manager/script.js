/* =========================================
   E-COMMERCE PRODUCT MANAGER
   JavaScript Only
========================================= */


/* =========================================
   DEFAULT PRODUCTS
========================================= */

const defaultProducts = [

    {
        id: 1,
        name: "Wireless Headphones",
        category: "Electronics",
        price: 5999,
        rating: 4.5,
        stock: 20,
        image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80",
        description: "High quality wireless headphones with clear sound."
    },

    {
        id: 2,
        name: "Smart Watch",
        category: "Electronics",
        price: 7999,
        rating: 4.7,
        stock: 15,
        image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=800&q=80",
        description: "Modern smart watch with fitness tracking."
    },

    {
        id: 3,
        name: "Running Shoes",
        category: "Sports",
        price: 4999,
        rating: 4.3,
        stock: 25,
        image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=800&q=80",
        description: "Comfortable running shoes for daily workouts."
    },

    {
        id: 4,
        name: "Men's Jacket",
        category: "Fashion",
        price: 6999,
        rating: 4.4,
        stock: 12,
        image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&w=800&q=80",
        description: "Stylish jacket suitable for casual wear."
    },

    {
        id: 5,
        name: "Modern Chair",
        category: "Home",
        price: 8999,
        rating: 4.6,
        stock: 10,
        image: "https://images.unsplash.com/photo-1503602642458-232111445657?auto=format&fit=crop&w=800&q=80",
        description: "Comfortable modern chair for your home."
    },

    {
        id: 6,
        name: "Sports Backpack",
        category: "Sports",
        price: 2999,
        rating: 4.2,
        stock: 30,
        image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=800&q=80",
        description: "Durable backpack for sports and travel."
    },

    {
        id: 7,
        name: "Bluetooth Speaker",
        category: "Electronics",
        price: 3499,
        rating: 4.5,
        stock: 18,
        image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?auto=format&fit=crop&w=800&q=80",
        description: "Portable speaker with powerful sound."
    },

    {
        id: 8,
        name: "Classic T-Shirt",
        category: "Fashion",
        price: 1999,
        rating: 4.1,
        stock: 40,
        image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=800&q=80",
        description: "Comfortable cotton t-shirt for everyday use."
    }

];


/* =========================================
   LOAD PRODUCTS FROM LOCAL STORAGE
========================================= */

let products =
    JSON.parse(localStorage.getItem("products")) ||
    defaultProducts;


/* =========================================
   CART
========================================= */

let cart =
    JSON.parse(localStorage.getItem("cart")) || [];


/* =========================================
   DOM ELEMENTS
========================================= */

const productContainer =
    document.querySelector("#productContainer");

const productCount =
    document.querySelector("#productCount");

const searchInput =
    document.querySelector("#searchInput");

const categoryFilter =
    document.querySelector("#categoryFilter");

const sortProducts =
    document.querySelector("#sortProducts");

const maxPrice =
    document.querySelector("#maxPrice");

const productModal =
    document.querySelector("#productModal");

const cartModal =
    document.querySelector("#cartModal");

const productForm =
    document.querySelector("#productForm");

const cartItems =
    document.querySelector("#cartItems");

const cartCount =
    document.querySelector("#cartCount");

const cartTotal =
    document.querySelector("#cartTotal");

const modalTitle =
    document.querySelector("#modalTitle");

const addProductBtn =
    document.querySelector("#addProductBtn");

const closeModal =
    document.querySelector("#closeModal");

const closeCart =
    document.querySelector("#closeCart");

const cartBtn =
    document.querySelector("#cartBtn");

const clearCartBtn =
    document.querySelector("#clearCart");


/* =========================================
   SAVE PRODUCTS
========================================= */

function saveProducts() {

    localStorage.setItem(
        "products",
        JSON.stringify(products)
    );

}


/* =========================================
   SAVE CART
========================================= */

function saveCart() {

    localStorage.setItem(
        "cart",
        JSON.stringify(cart)
    );

}


/* =========================================
   DISPLAY PRODUCTS
========================================= */

function displayProducts(productList) {

    productContainer.innerHTML = "";

    productCount.textContent =
        productList.length;


    if (productList.length === 0) {

        productContainer.innerHTML = `
            <p class="empty-cart">
                No products found.
            </p>
        `;

        return;
    }


    productList.forEach(product => {

        const card =
            document.createElement("div");

        card.className =
            "product-card";


        card.innerHTML = `

            <img
                src="${product.image}"
                alt="${product.name}"
                class="product-image"
            >

            <div class="product-info">

                <span class="category">
                    ${product.category}
                </span>

                <h3>
                    ${product.name}
                </h3>

                <p class="description">
                    ${product.description}
                </p>

                <p class="price">
                    Rs. ${product.price.toLocaleString()}
                </p>

                <p class="rating">
                    ⭐ ${product.rating}
                </p>

                <p class="stock">
                    ${
                        product.stock > 0
                        ? `Stock: ${product.stock}`
                        : "Out of Stock"
                    }
                </p>

                <div class="card-buttons">

                    <button
                        class="primary-btn add-cart"
                        data-id="${product.id}"
                        ${
                            product.stock === 0
                            ? "disabled"
                            : ""
                        }
                    >
                        Add to Cart
                    </button>

                    <button
                        class="edit-btn edit-product"
                        data-id="${product.id}"
                    >
                        Edit
                    </button>

                    <button
                        class="delete-btn delete-product"
                        data-id="${product.id}"
                    >
                        Delete
                    </button>

                </div>

            </div>
        `;


        productContainer.appendChild(card);

    });

}


/* =========================================
   FILTER PRODUCTS
========================================= */

function filterProducts() {

    let filteredProducts =
        [...products];


    /* SEARCH */

    const search =
        searchInput.value
        .toLowerCase()
        .trim();


    if (search) {

        filteredProducts =
            filteredProducts.filter(product =>

                product.name
                    .toLowerCase()
                    .includes(search)

            );

    }


    /* CATEGORY */

    const category =
        categoryFilter.value;


    if (category !== "all") {

        filteredProducts =
            filteredProducts.filter(product =>
                product.category === category
            );

    }


    /* MAX PRICE */

    const price =
        Number(maxPrice.value);


    if (price > 0) {

        filteredProducts =
            filteredProducts.filter(product =>
                product.price <= price
            );

    }


    /* SORT */

    switch (sortProducts.value) {

        case "priceLow":

            filteredProducts.sort(
                (a, b) => a.price - b.price
            );

            break;


        case "priceHigh":

            filteredProducts.sort(
                (a, b) => b.price - a.price
            );

            break;


        case "nameAZ":

            filteredProducts.sort(
                (a, b) =>
                    a.name.localeCompare(b.name)
            );

            break;


        case "nameZA":

            filteredProducts.sort(
                (a, b) =>
                    b.name.localeCompare(a.name)
            );

            break;


        case "rating":

            filteredProducts.sort(
                (a, b) => b.rating - a.rating
            );

            break;

    }


    displayProducts(filteredProducts);

}


/* =========================================
   OPEN ADD PRODUCT MODAL
========================================= */

addProductBtn.addEventListener(
    "click",
    () => {

        modalTitle.textContent =
            "Add Product";

        productForm.reset();

        productForm.dataset.editId = "";

        productModal.classList.add("active");

    }
);


/* =========================================
   CLOSE PRODUCT MODAL
========================================= */

closeModal.addEventListener(
    "click",
    () => {

        productModal.classList.remove("active");

    }
);


/* =========================================
   PRODUCT FORM
========================================= */

productForm.addEventListener(
    "submit",
    event => {

        event.preventDefault();


        const name =
            document.querySelector("#productName")
            .value
            .trim();


        const category =
            document.querySelector("#productCategory")
            .value;


        const price =
            Number(
                document.querySelector("#productPrice")
                .value
            );


        const rating =
            Number(
                document.querySelector("#productRating")
                .value
            );


        const stock =
            Number(
                document.querySelector("#productStock")
                .value
            );


        const image =
            document.querySelector("#productImage")
            .value
            .trim();


        const description =
            document.querySelector("#productDescription")
            .value
            .trim();


        /* VALIDATION */

        if (
            !name ||
            !category ||
            price <= 0 ||
            rating < 1 ||
            rating > 5 ||
            stock < 0 ||
            !image ||
            !description
        ) {

            alert(
                "Please enter valid product information."
            );

            return;
        }


        /* CHECK EDIT MODE */

        const editId =
            Number(productForm.dataset.editId);


        if (editId) {

            const product =
                products.find(
                    product =>
                        product.id === editId
                );


            if (product) {

                product.name = name;
                product.category = category;
                product.price = price;
                product.rating = rating;
                product.stock = stock;
                product.image = image;
                product.description = description;

            }

            alert("Product updated successfully.");

        } else {

            const newProduct = {

                id: Date.now(),

                name,

                category,

                price,

                rating,

                stock,

                image,

                description

            };


            products.push(newProduct);

            alert("Product added successfully.");

        }


        saveProducts();

        productForm.reset();

        productForm.dataset.editId = "";

        productModal.classList.remove("active");

        filterProducts();

    }
);


/* =========================================
   PRODUCT BUTTON EVENTS
========================================= */

productContainer.addEventListener(
    "click",
    event => {

        const target =
            event.target;


        /* ADD TO CART */

        if (
            target.classList.contains("add-cart")
        ) {

            const id =
                Number(target.dataset.id);

            addToCart(id);

        }


        /* EDIT */

        if (
            target.classList.contains(
                "edit-product"
            )
        ) {

            const id =
                Number(target.dataset.id);

            editProduct(id);

        }


        /* DELETE */

        if (
            target.classList.contains(
                "delete-product"
            )
        ) {

            const id =
                Number(target.dataset.id);

            deleteProduct(id);

        }

    }
);


/* =========================================
   ADD TO CART
========================================= */

function addToCart(id) {

    const product =
        products.find(
            product => product.id === id
        );


    if (!product) return;


    if (product.stock <= 0) {

        alert("Product is out of stock.");

        return;
    }


    const existingItem =
        cart.find(
            item => item.id === id
        );


    if (existingItem) {

        if (
            existingItem.quantity <
            product.stock
        ) {

            existingItem.quantity++;

        } else {

            alert("Maximum available stock reached.");

            return;
        }

    } else {

        cart.push({

            id: product.id,

            quantity: 1

        });

    }


    saveCart();

    updateCart();

    alert(
        `${product.name} added to cart.`
    );

}


/* =========================================
   UPDATE CART
========================================= */

function updateCart() {

    cartItems.innerHTML = "";


    if (cart.length === 0) {

        cartItems.innerHTML = `
            <p class="empty-cart">
                Your cart is empty.
            </p>
        `;

        cartCount.textContent = "0";

        cartTotal.textContent = "Rs. 0";

        return;
    }


    let total = 0;

    let itemCount = 0;


    cart.forEach(item => {

        const product =
            products.find(
                product =>
                    product.id === item.id
            );


        if (!product) return;


        const itemTotal =
            product.price *
            item.quantity;


        total += itemTotal;

        itemCount += item.quantity;


        const cartItem =
            document.createElement("div");

        cartItem.className =
            "cart-item";


        cartItem.innerHTML = `

            <img
                src="${product.image}"
                alt="${product.name}"
            >

            <div class="cart-item-info">

                <h4>
                    ${product.name}
                </h4>

                <p>
                    Rs. ${product.price.toLocaleString()}
                </p>

            </div>

            <div class="quantity">

                <button
                    class="decrease"
                    data-id="${product.id}"
                >
                    −
                </button>

                <span>
                    ${item.quantity}
                </span>

                <button
                    class="increase"
                    data-id="${product.id}"
                >
                    +
                </button>

            </div>

            <button
                class="remove-cart"
                data-id="${product.id}"
            >
                ×
            </button>

        `;


        cartItems.appendChild(cartItem);

    });


    cartCount.textContent =
        itemCount;


    cartTotal.textContent =
        `Rs. ${total.toLocaleString()}`;

}


/* =========================================
   CART BUTTON EVENTS
========================================= */

cartItems.addEventListener(
    "click",
    event => {

        const target =
            event.target;


        const id =
            Number(target.dataset.id);


        if (
            target.classList.contains("increase")
        ) {

            changeQuantity(id, 1);

        }


        if (
            target.classList.contains("decrease")
        ) {

            changeQuantity(id, -1);

        }


        if (
            target.classList.contains(
                "remove-cart"
            )
        ) {

            removeFromCart(id);

        }

    }
);


/* =========================================
   CHANGE QUANTITY
========================================= */

function changeQuantity(id, amount) {

    const item =
        cart.find(
            item => item.id === id
        );


    const product =
        products.find(
            product => product.id === id
        );


    if (!item || !product) return;


    const newQuantity =
        item.quantity + amount;


    if (newQuantity <= 0) {

        removeFromCart(id);

        return;
    }


    if (newQuantity > product.stock) {

        alert("Maximum stock reached.");

        return;
    }


    item.quantity =
        newQuantity;


    saveCart();

    updateCart();

}


/* =========================================
   REMOVE FROM CART
========================================= */

function removeFromCart(id) {

    cart =
        cart.filter(
            item => item.id !== id
        );


    saveCart();

    updateCart();

}


/* =========================================
   EDIT PRODUCT
========================================= */

function editProduct(id) {

    const product =
        products.find(
            product => product.id === id
        );


    if (!product) return;


    document.querySelector("#productName")
        .value = product.name;


    document.querySelector("#productCategory")
        .value = product.category;


    document.querySelector("#productPrice")
        .value = product.price;


    document.querySelector("#productRating")
        .value = product.rating;


    document.querySelector("#productStock")
        .value = product.stock;


    document.querySelector("#productImage")
        .value = product.image;


    document.querySelector("#productDescription")
        .value = product.description;


    productForm.dataset.editId =
        product.id;


    modalTitle.textContent =
        "Edit Product";


    productModal.classList.add("active");

}


/* =========================================
   DELETE PRODUCT
========================================= */

function deleteProduct(id) {

    const product =
        products.find(
            product => product.id === id
        );


    if (!product) return;


    const confirmed =
        confirm(
            `Are you sure you want to delete "${product.name}"?`
        );


    if (!confirmed) return;


    products =
        products.filter(
            product =>
                product.id !== id
        );


    cart =
        cart.filter(
            item =>
                item.id !== id
        );


    saveProducts();

    saveCart();

    updateCart();

    filterProducts();

    alert("Product deleted successfully.");

}


/* =========================================
   OPEN CART
========================================= */

cartBtn.addEventListener(
    "click",
    () => {

        updateCart();

        cartModal.classList.add("active");

    }
);


/* =========================================
   CLOSE CART
========================================= */

closeCart.addEventListener(
    "click",
    () => {

        cartModal.classList.remove("active");

    }
);


/* =========================================
   CLEAR CART
========================================= */

clearCartBtn.addEventListener(
    "click",
    () => {

        if (cart.length === 0) {

            alert("Cart is already empty.");

            return;
        }


        const confirmed =
            confirm(
                "Are you sure you want to clear the cart?"
            );


        if (!confirmed) return;


        cart = [];

        saveCart();

        updateCart();

    }
);


/* =========================================
   SEARCH / FILTER EVENTS
========================================= */

searchInput.addEventListener(
    "input",
    filterProducts
);

categoryFilter.addEventListener(
    "change",
    filterProducts
);

sortProducts.addEventListener(
    "change",
    filterProducts
);

maxPrice.addEventListener(
    "input",
    filterProducts
);


/* =========================================
   CLOSE MODAL WHEN CLICKING OUTSIDE
========================================= */

productModal.addEventListener(
    "click",
    event => {

        if (
            event.target === productModal
        ) {

            productModal.classList.remove(
                "active"
            );

        }

    }
);


cartModal.addEventListener(
    "click",
    event => {

        if (
            event.target === cartModal
        ) {

            cartModal.classList.remove(
                "active"
            );

        }

    }
);


/* =========================================
   INITIAL LOAD
========================================= */

displayProducts(products);

updateCart();