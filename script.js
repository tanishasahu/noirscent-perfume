/* =========================
   NOIRSCENT - SIMPLE SCRIPT
========================= */


/* =========================
   PRODUCT DATA
========================= */

const products = [
    {
        id: 1,
        name: "Midnight Noir",
        category: "Men",
        price: 3499,
        oldPrice: 4299,
        rating: 4.9,
        image: "https://images.unsplash.com/photo-1594035910387-fea47794261f?auto=format&fit=crop&w=900&q=85",
        description: "A deep and sophisticated fragrance with warm woody notes.",
        top: "Bergamot",
        heart: "Rose",
        base: "Oud"
    },
    {
        id: 2,
        name: "Velvet Rose & Oud",
        category: "Oud",
        price: 4999,
        oldPrice: 5999,
        rating: 5.0,
        image: "https://images.unsplash.com/photo-1587017539504-67cfbddac569?auto=format&fit=crop&w=900&q=85",
        description: "A luxurious combination of velvety rose and rich oud.",
        top: "Saffron",
        heart: "Rose",
        base: "Oud"
    },
    {
        id: 3,
        name: "Solesse Fleur",
        category: "Women",
        price: 2899,
        oldPrice: 3499,
        rating: 4.8,
        image: "https://images.unsplash.com/photo-1541643600914-78b084683601?auto=format&fit=crop&w=900&q=85",
        description: "A delicate floral fragrance designed for effortless elegance.",
        top: "Pear",
        heart: "Jasmine",
        base: "Musk"
    },
    {
        id: 4,
        name: "Imperial Santal",
        category: "Unisex",
        price: 3899,
        oldPrice: 4599,
        rating: 4.9,
        image: "https://images.unsplash.com/photo-1612817288484-6f916006741a?auto=format&fit=crop&w=900&q=85",
        description: "A smooth unisex fragrance built around creamy sandalwood.",
        top: "Cardamom",
        heart: "Iris",
        base: "Sandalwood"
    },
    {
        id: 5,
        name: "Royal Oud Extreme",
        category: "Oud",
        price: 5499,
        oldPrice: 6499,
        rating: 4.7,
        image: "https://images.unsplash.com/photo-1547887538-e3a2f32cb1cc?auto=format&fit=crop&w=900&q=85",
        description: "An intense oud fragrance with a rich royal character.",
        top: "Pepper",
        heart: "Leather",
        base: "Oud"
    },
    {
        id: 6,
        name: "Azure Coast",
        category: "Men",
        price: 2999,
        oldPrice: 3699,
        rating: 4.6,
        image: "https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&w=900&q=85",
        description: "A fresh aquatic fragrance inspired by the Mediterranean coast.",
        top: "Lemon",
        heart: "Lavender",
        base: "Amber"
    }
];


/* =========================
   CART & WISHLIST
========================= */

let cart = JSON.parse(localStorage.getItem("cart")) || [];
let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];


/* =========================
   ELEMENTS
========================= */

const productGrid = document.getElementById("productGrid");
const noResults = document.getElementById("noResults");

const cartDrawer = document.getElementById("cartDrawer");
const cartBackdrop = document.getElementById("cartBackdrop");
const cartItems = document.getElementById("cartItems");
const emptyCart = document.getElementById("emptyCart");
const cartFooter = document.getElementById("cartFooter");

const cartCount = document.getElementById("cartCount");
const wishlistCount = document.getElementById("wishlistCount");

const cartSubtotal = document.getElementById("cartSubtotal");
const cartTotal = document.getElementById("cartTotal");

const searchOverlay = document.getElementById("searchOverlay");
const searchInput = document.getElementById("searchInput");
const searchResults = document.getElementById("searchResults");

const modalBackdrop = document.getElementById("modalBackdrop");
const modalImage = document.getElementById("modalImage");
const modalCategory = document.getElementById("modalCategory");
const modalName = document.getElementById("modalName");
const modalStars = document.getElementById("modalStars");
const modalRating = document.getElementById("modalRating");
const modalPrice = document.getElementById("modalPrice");
const modalOldPrice = document.getElementById("modalOldPrice");
const modalDescription = document.getElementById("modalDescription");

const modalTop = document.getElementById("modalTop");
const modalHeart = document.getElementById("modalHeart");
const modalBase = document.getElementById("modalBase");

const toast = document.getElementById("toast");
const toastMessage = document.getElementById("toastMessage");


/* =========================
   SHOW PRODUCTS
========================= */

function showProducts(list = products) {

    productGrid.innerHTML = "";

    if (list.length === 0) {
        noResults.classList.add("show");
        return;
    }

    noResults.classList.remove("show");

    list.forEach(product => {

        const isLiked = wishlist.includes(product.id);

        productGrid.innerHTML += `
            <article class="product-card">

                <div class="product-image">

                    <img src="${product.image}" alt="${product.name}">

                    <span class="product-badge">
                        ${product.category}
                    </span>

                    <button
                        class="product-wishlist ${isLiked ? "active" : ""}"
                        data-id="${product.id}">
                        <i class="${isLiked ? "fa-solid" : "fa-regular"} fa-heart"></i>
                    </button>

                </div>

                <div class="product-info">

                    <span class="product-category">
                        ${product.category}
                    </span>

                    <h3 class="product-name">
                        ${product.name}
                    </h3>

                    <div class="product-rating">
                        <span class="stars">★★★★★</span>
                        <span>${product.rating}</span>
                    </div>

                    <div class="product-price">
                        <strong>₹${product.price.toLocaleString("en-IN")}</strong>
                        <del>₹${product.oldPrice.toLocaleString("en-IN")}</del>
                    </div>

                    <div class="product-actions">

                        <button
                            class="add-to-cart"
                            data-id="${product.id}">
                            Add to Bag
                        </button>

                        <button
                            class="quick-view"
                            data-id="${product.id}"
                            aria-label="Quick View">
                            <i class="fa-regular fa-eye"></i>
                        </button>

                    </div>

                </div>

            </article>
        `;
    });
}


/* =========================
   UPDATE COUNTS
========================= */

function updateCounts() {

    let totalItems = cart.reduce((total, item) => {
        return total + item.quantity;
    }, 0);

    cartCount.textContent = totalItems;
    wishlistCount.textContent = wishlist.length;
}


/* =========================
   ADD TO CART
========================= */

function addToCart(id) {

    const product = products.find(item => item.id === id);

    if (!product) return;

    const existingItem = cart.find(item => item.id === id);

    if (existingItem) {
        existingItem.quantity++;
    } else {
        cart.push({
            id: id,
            quantity: 1
        });
    }

    localStorage.setItem("cart", JSON.stringify(cart));

    updateCounts();
    showCartItems();

    showToast(`${product.name} added to bag`);

    showCart();
}


/* =========================
   SHOW CART ITEMS
========================= */

function showCartItems() {

    cartItems.innerHTML = "";

    if (cart.length === 0) {

        emptyCart.style.display = "flex";
        cartFooter.style.display = "none";

        cartSubtotal.textContent = "₹0";
        cartTotal.textContent = "₹0";

        return;
    }

    emptyCart.style.display = "none";
    cartFooter.style.display = "block";

    let subtotal = 0;

    cart.forEach(item => {

        const product = products.find(p => p.id === item.id);

        if (!product) return;

        const itemTotal = product.price * item.quantity;

        subtotal += itemTotal;

        cartItems.innerHTML += `
            <div class="cart-item">

                <div style="
                    display:flex;
                    gap:12px;
                    padding:15px 0;
                    border-bottom:1px solid rgba(255,255,255,.08);
                ">

                    <img
                        src="${product.image}"
                        alt="${product.name}"
                        style="
                            width:75px;
                            height:85px;
                            object-fit:cover;
                        "
                    >

                    <div style="flex:1">

                        <div style="
                            display:flex;
                            justify-content:space-between;
                            gap:10px;
                        ">

                            <h4 style="
                                font-family:var(--cinzel);
                                font-size:13px;
                                font-weight:500;
                            ">
                                ${product.name}
                            </h4>

                            <button
                                class="remove-cart-item"
                                data-id="${product.id}"
                                style="
                                    color:#777;
                                    cursor:pointer;
                                ">
                                <i class="fa-solid fa-xmark"></i>
                            </button>

                        </div>

                        <p style="
                            color:var(--gold);
                            font-size:11px;
                            margin:8px 0;
                        ">
                            ₹${product.price.toLocaleString("en-IN")}
                        </p>

                        <div style="
                            display:flex;
                            align-items:center;
                            gap:12px;
                        ">

                            <button
                                class="qty-minus"
                                data-id="${product.id}"
                                style="
                                    width:25px;
                                    height:25px;
                                    border:1px solid #333;
                                    color:#aaa;
                                    cursor:pointer;
                                ">
                                −
                            </button>

                            <span style="font-size:11px;">
                                ${item.quantity}
                            </span>

                            <button
                                class="qty-plus"
                                data-id="${product.id}"
                                style="
                                    width:25px;
                                    height:25px;
                                    border:1px solid #333;
                                    color:#aaa;
                                    cursor:pointer;
                                ">
                                +
                            </button>

                        </div>

                    </div>

                </div>

            </div>
        `;
    });

    cartSubtotal.textContent =
        `₹${subtotal.toLocaleString("en-IN")}`;

    cartTotal.textContent =
        `₹${subtotal.toLocaleString("en-IN")}`;
}


/* =========================
   REMOVE CART ITEM
========================= */

function removeCart(id) {

    cart = cart.filter(item => item.id !== id);

    localStorage.setItem("cart", JSON.stringify(cart));

    updateCounts();
    showCartItems();

    showToast("Item removed from bag");
}


/* =========================
   QUANTITY
========================= */

function increaseQuantity(id) {

    const item = cart.find(item => item.id === id);

    if (item) {
        item.quantity++;
    }

    localStorage.setItem("cart", JSON.stringify(cart));

    updateCounts();
    showCartItems();
}


function decreaseQuantity(id) {

    const item = cart.find(item => item.id === id);

    if (!item) return;

    if (item.quantity > 1) {
        item.quantity--;
    } else {
        cart = cart.filter(item => item.id !== id);
    }

    localStorage.setItem("cart", JSON.stringify(cart));

    updateCounts();
    showCartItems();
}


/* =========================
   OPEN CART
========================= */

function showCart() {

    cartDrawer.classList.add("active");
    cartBackdrop.classList.add("active");

    document.body.classList.add("no-scroll");
}


/* =========================
   CLOSE CART
========================= */

function hideCart() {

    cartDrawer.classList.remove("active");
    cartBackdrop.classList.remove("active");

    document.body.classList.remove("no-scroll");
}


/* =========================
   WISHLIST
========================= */

function toggleWishlist(id) {

    const product = products.find(item => item.id === id);

    if (!product) return;

    if (wishlist.includes(id)) {

        wishlist = wishlist.filter(item => item !== id);

        showToast(`${product.name} removed from wishlist`);

    } else {

        wishlist.push(id);

        showToast(`${product.name} added to wishlist`);
    }

    localStorage.setItem("wishlist", JSON.stringify(wishlist));

    updateCounts();
    showProducts();
}


/* =========================
   PRODUCT CLICK EVENTS
========================= */

productGrid.addEventListener("click", function (e) {

    const wishlistBtn =
        e.target.closest(".product-wishlist");

    const cartBtn =
        e.target.closest(".add-to-cart");

    const quickBtn =
        e.target.closest(".quick-view");

    if (wishlistBtn) {

        const id = Number(wishlistBtn.dataset.id);

        toggleWishlist(id);

        return;
    }

    if (cartBtn) {

        const id = Number(cartBtn.dataset.id);

        addToCart(id);

        return;
    }

    if (quickBtn) {

        const id = Number(quickBtn.dataset.id);

        openModal(id);

        return;
    }
});


/* =========================
   CART EVENTS
========================= */

cartItems.addEventListener("click", function (e) {

    const removeBtn =
        e.target.closest(".remove-cart-item");

    const plusBtn =
        e.target.closest(".qty-plus");

    const minusBtn =
        e.target.closest(".qty-minus");

    if (removeBtn) {

        removeCart(Number(removeBtn.dataset.id));

        return;
    }

    if (plusBtn) {

        increaseQuantity(Number(plusBtn.dataset.id));

        return;
    }

    if (minusBtn) {

        decreaseQuantity(Number(minusBtn.dataset.id));

        return;
    }
});


/* =========================
   FILTER
========================= */

document.querySelectorAll(".filter-btn").forEach(button => {

    button.addEventListener("click", function () {

        document
            .querySelectorAll(".filter-btn")
            .forEach(btn => btn.classList.remove("active"));

        this.classList.add("active");

        const filter = this.dataset.filter;

        if (filter === "All") {

            showProducts(products);

        } else {

            const filteredProducts =
                products.filter(product =>
                    product.category === filter
                );

            showProducts(filteredProducts);
        }

        document
            .getElementById("products")
            .scrollIntoView({
                behavior: "smooth"
            });
    });
});


/* =========================
   CATEGORY BUTTONS
========================= */

document.querySelectorAll(".category-link").forEach(button => {

    button.addEventListener("click", function () {

        const filter = this.dataset.filter;

        document
            .querySelectorAll(".filter-btn")
            .forEach(btn => {

                btn.classList.remove("active");

                if (btn.dataset.filter === filter) {
                    btn.classList.add("active");
                }
            });

        const filtered =
            products.filter(product =>
                product.category === filter
            );

        showProducts(filtered);

        document
            .getElementById("products")
            .scrollIntoView({
                behavior: "smooth"
            });
    });
});


/* =========================
   SORT
========================= */

document
    .getElementById("sortProducts")
    .addEventListener("change", function () {

        let sortedProducts = [...products];

        if (this.value === "low") {

            sortedProducts.sort((a, b) =>
                a.price - b.price
            );

        } else if (this.value === "high") {

            sortedProducts.sort((a, b) =>
                b.price - a.price
            );

        } else if (this.value === "rating") {

            sortedProducts.sort((a, b) =>
                b.rating - a.rating
            );
        }

        showProducts(sortedProducts);
    });


/* =========================
   SEARCH
========================= */

document
    .getElementById("searchBtn")
    .addEventListener("click", function () {

        searchOverlay.classList.add("active");

        document.body.classList.add("no-scroll");

        setTimeout(() => {
            searchInput.focus();
        }, 300);
    });


document
    .getElementById("closeSearch")
    .addEventListener("click", function () {

        searchOverlay.classList.remove("active");

        document.body.classList.remove("no-scroll");

        searchInput.value = "";
        searchResults.innerHTML = "";
    });


searchInput.addEventListener("input", function () {

    const value = this.value.toLowerCase().trim();

    if (!value) {

        searchResults.innerHTML = "";

        return;
    }

    const results = products.filter(product =>
        product.name.toLowerCase().includes(value) ||
        product.category.toLowerCase().includes(value)
    );

    if (results.length === 0) {

        searchResults.innerHTML = `
            <p style="
                color:#666;
                font-size:11px;
                padding:20px 0;
            ">
                No fragrance found.
            </p>
        `;

        return;
    }

    searchResults.innerHTML = results.map(product => `
        <div
            class="search-result"
            data-id="${product.id}"
            style="
                display:flex;
                align-items:center;
                gap:15px;
                padding:12px 0;
                border-bottom:1px solid #222;
                cursor:pointer;
            "
        >

            <img
                src="${product.image}"
                style="
                    width:55px;
                    height:65px;
                    object-fit:cover;
                "
            >

            <div>
                <h4 style="
                    font-family:var(--cinzel);
                    font-size:13px;
                    font-weight:500;
                ">
                    ${product.name}
                </h4>

                <span style="
                    color:var(--gold);
                    font-size:10px;
                ">
                    ₹${product.price.toLocaleString("en-IN")}
                </span>
            </div>

        </div>
    `).join("");
});


searchResults.addEventListener("click", function (e) {

    const result =
        e.target.closest(".search-result");

    if (!result) return;

    const id = Number(result.dataset.id);

    searchOverlay.classList.remove("active");
    document.body.classList.remove("no-scroll");

    searchInput.value = "";

    openModal(id);
});


/* =========================
   QUICK VIEW MODAL
========================= */

function openModal(id) {

    const product = products.find(item => item.id === id);

    if (!product) return;

    modalImage.src = product.image;
    modalImage.alt = product.name;

    modalCategory.textContent = product.category;
    modalName.textContent = product.name;

    modalStars.textContent = "★★★★★";
    modalRating.textContent = product.rating;

    modalPrice.textContent =
        `₹${product.price.toLocaleString("en-IN")}`;

    modalOldPrice.textContent =
        `₹${product.oldPrice.toLocaleString("en-IN")}`;

    modalDescription.textContent =
        product.description;

    modalTop.textContent = product.top;
    modalHeart.textContent = product.heart;
    modalBase.textContent = product.base;

    modalBackdrop.classList.add("active");

    document.body.classList.add("no-scroll");

    document.getElementById("modalAddCart").onclick = function () {

        addToCart(product.id);
    };

    updateModalWishlist(product.id);
}


/* =========================
   MODAL WISHLIST
========================= */

function updateModalWishlist(id) {

    const button =
        document.getElementById("modalWishlist");

    const icon = button.querySelector("i");

    if (wishlist.includes(id)) {

        icon.className = "fa-solid fa-heart";

        button.style.color = "var(--gold)";

    } else {

        icon.className = "fa-regular fa-heart";

        button.style.color = "#aaa";
    }

    button.onclick = function () {

        toggleWishlist(id);

        updateModalWishlist(id);
    };
}


/* =========================
   CLOSE MODAL
========================= */

document
    .getElementById("modalClose")
    .addEventListener("click", closeModal);


modalBackdrop.addEventListener("click", function (e) {

    if (e.target === modalBackdrop) {
        closeModal();
    }
});


function closeModal() {

    modalBackdrop.classList.remove("active");

    document.body.classList.remove("no-scroll");
}


/* =========================
   CART BUTTON
========================= */

document
    .getElementById("cartBtn")
    .addEventListener("click", showCart);


document
    .getElementById("closeCart")
    .addEventListener("click", hideCart);


cartBackdrop.addEventListener("click", hideCart);


document
    .getElementById("emptyCartShop")
    .addEventListener("click", hideCart);


/* =========================
   WISHLIST BUTTON
========================= */

document
    .getElementById("wishlistBtn")
    .addEventListener("click", function () {

        if (wishlist.length === 0) {

            showToast("Your wishlist is empty");

            return;
        }

        const names = wishlist
            .map(id => {
                const product =
                    products.find(p => p.id === id);

                return product ? product.name : "";
            })
            .filter(Boolean);

        showToast(
            `${names.length} item${names.length > 1 ? "s" : ""} in wishlist`
        );
    });


/* =========================
   MOBILE MENU
========================= */

const mobileMenu =
    document.getElementById("mobileMenu");

const navLinks =
    document.getElementById("navLinks");


mobileMenu.addEventListener("click", function () {

    navLinks.classList.toggle("active");

    const icon = mobileMenu.querySelector("i");

    if (navLinks.classList.contains("active")) {

        icon.className = "fa-solid fa-xmark";

    } else {

        icon.className = "fa-solid fa-bars";
    }
});


navLinks.querySelectorAll("a").forEach(link => {

    link.addEventListener("click", function () {

        navLinks.classList.remove("active");

        mobileMenu
            .querySelector("i")
            .className = "fa-solid fa-bars";
    });
});


/* =========================
   NAVBAR SCROLL
========================= */

window.addEventListener("scroll", function () {

    const navbar =
        document.getElementById("navbar");

    if (window.scrollY > 50) {

        navbar.classList.add("scrolled");

    } else {

        navbar.classList.remove("scrolled");
    }
});


/* =========================
   TOAST
========================= */

let toastTimer;

function showToast(message) {

    toastMessage.textContent = message;

    toast.classList.add("show");

    clearTimeout(toastTimer);

    toastTimer = setTimeout(() => {

        toast.classList.remove("show");

    }, 2500);
}


/* =========================
   COUNTDOWN
========================= */

const offerEnd =
    new Date().getTime() +
    (3 * 24 * 60 * 60 * 1000);


function updateCountdown() {

    const now = new Date().getTime();

    const distance = offerEnd - now;

    if (distance <= 0) {

        document.getElementById("days").textContent = "00";
        document.getElementById("hours").textContent = "00";
        document.getElementById("minutes").textContent = "00";
        document.getElementById("seconds").textContent = "00";

        return;
    }

    const days =
        Math.floor(distance / (1000 * 60 * 60 * 24));

    const hours =
        Math.floor(
            (distance % (1000 * 60 * 60 * 24)) /
            (1000 * 60 * 60)
        );

    const minutes =
        Math.floor(
            (distance % (1000 * 60 * 60)) /
            (1000 * 60)
        );

    const seconds =
        Math.floor(
            (distance % (1000 * 60)) /
            1000
        );

    document.getElementById("days").textContent =
        String(days).padStart(2, "0");

    document.getElementById("hours").textContent =
        String(hours).padStart(2, "0");

    document.getElementById("minutes").textContent =
        String(minutes).padStart(2, "0");

    document.getElementById("seconds").textContent =
        String(seconds).padStart(2, "0");
}

updateCountdown();

setInterval(updateCountdown, 1000);


/* =========================
   NEWSLETTER
========================= */

document
    .getElementById("newsletterForm")
    .addEventListener("submit", function (e) {

        e.preventDefault();

        const email =
            document.getElementById("newsletterEmail").value.trim();

        if (!email) return;

        showToast("Thank you for subscribing!");

        this.reset();
    });


/* =========================
   CHECKOUT
========================= */

document
    .getElementById("checkoutBtn")
    .addEventListener("click", function () {

        if (cart.length === 0) {

            showToast("Your bag is empty");

            return;
        }

        showToast("Checkout coming soon!");

    });


/* =========================
   PRELOADER
========================= */

window.addEventListener("load", function () {

    setTimeout(() => {

        const preloader =
            document.getElementById("preloader");

        preloader.style.opacity = "0";
        preloader.style.visibility = "hidden";

    }, 800);
});


/* =========================
   AOS
========================= */

if (typeof AOS !== "undefined") {

    AOS.init({
        duration: 900,
        once: true,
        offset: 80
    });
}


/* =========================
   INITIAL LOAD
========================= */

showProducts();
showCartItems();
updateCounts();