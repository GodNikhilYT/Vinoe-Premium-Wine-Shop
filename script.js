
/* =====================================================
   VINOÉ WINE SHOP
   MAIN JAVASCRIPT
===================================================== */

/* =====================================================
   PRODUCT DATA
===================================================== */
const WEBSITE_ACCESS_CODE = "JAAT"; 
const products = [
  {
    id: 1,
    name: "Vinoé Reserve Cabernet",
    type: "Red",
    region: "Napa Valley",
    grape: "Cabernet Sauvignon",
    price: 1890,
    description:
      "Rich and full-bodied with dark fruit, oak and gentle spice.",
    badge: "Bestseller"
  },

  {
    id: 2,
    name: "Château Lumière",
    type: "Red",
    region: "Bordeaux",
    grape: "Merlot",
    price: 2250,
    description:
      "Elegant Bordeaux-style red with plum, cedar and soft tannins.",
    badge: "Premium"
  },

  {
    id: 3,
    name: "Golden Crest Chardonnay",
    type: "White",
    region: "California",
    grape: "Chardonnay",
    price: 1450,
    description:
      "Fresh and creamy with citrus, vanilla and subtle toasted oak.",
    badge: "Popular"
  },

  {
    id: 4,
    name: "Villa Bianca Sauvignon Blanc",
    type: "White",
    region: "Marlborough",
    grape: "Sauvignon Blanc",
    price: 1290,
    description:
      "Crisp and refreshing with tropical fruit and bright acidity.",
    badge: ""
  },

  {
    id: 5,
    name: "Maison Rosé",
    type: "Rosé",
    region: "Provence",
    grape: "Grenache",
    price: 1590,
    description:
      "Delicate and vibrant with strawberry, citrus and floral notes.",
    badge: "Summer Pick"
  },

  {
    id: 6,
    name: "Rosé de Soleil",
    type: "Rosé",
    region: "Languedoc",
    grape: "Cinsault",
    price: 1350,
    description:
      "Light and fruity with refreshing berry and watermelon notes.",
    badge: ""
  },

  {
    id: 7,
    name: "Vinoé Blanc de Blancs",
    type: "Sparkling",
    region: "Champagne",
    grape: "Chardonnay",
    price: 2890,
    description:
      "Elegant sparkling wine with fine bubbles, citrus and brioche.",
    badge: "Celebration"
  },

  {
    id: 8,
    name: "Golden Étoile Brut",
    type: "Sparkling",
    region: "Italy",
    grape: "Glera",
    price: 1750,
    description:
      "Bright and lively with crisp apple, pear and delicate bubbles.",
    badge: "New"
  }
];

/* =====================================================
   CART
===================================================== */

let cart = JSON.parse(
  localStorage.getItem("vinoeCart")
) || [];

/* =====================================================
   DOM READY
===================================================== */

document.addEventListener("DOMContentLoaded", () => {

  initializeAgeGate();

  renderProducts();

  updateCart();

  setupModalClosing();

});

/* =====================================================
   AGE VERIFICATION
===================================================== */

function initializeAgeGate() {

  const ageGate =
    document.getElementById("ageGate");

  if (!ageGate) return;

  const verified =
    localStorage.getItem("vinoeAgeVerified");

  if (verified === "true") {
    ageGate.style.display = "none";
  }
}

function verifyAge(isOfAge) {

  const ageGate =
    document.getElementById("ageGate");

  if (!ageGate) return;

  if (isOfAge) {

    localStorage.setItem(
      "vinoeAgeVerified",
      "true"
    );

    ageGate.style.display = "none";

    showToast(
      "Welcome to Vinoé 🍷"
    );

  } else {

    ageGate.innerHTML = `
      <div class="age-box">

        <div class="age-logo">🍷</div>

        <h1>Sorry, you can't enter</h1>

        <p>
          You must meet the legal drinking-age
          requirement applicable in your location
          to access this website.
        </p>

        <button
          class="btn btn-dark"
          onclick="window.history.back()"
        >
          Exit
        </button>

      </div>
    `;
  }
}

/* =====================================================
   PRODUCT RENDERING
===================================================== */

function renderProducts() {

  const container =
    document.getElementById("products");

  if (!container) return;

  const searchInput =
    document.getElementById("searchInput");

  const categoryFilter =
    document.getElementById("categoryFilter");

  const sortFilter =
    document.getElementById("sortFilter");

  const search =
    searchInput
      ? searchInput.value
          .trim()
          .toLowerCase()
      : "";

  const category =
    categoryFilter
      ? categoryFilter.value
      : "All";

  const sort =
    sortFilter
      ? sortFilter.value
      : "featured";

  let filtered =
    products.filter(product => {

      const matchesSearch =
        !search ||
        product.name.toLowerCase().includes(search) ||
        product.region.toLowerCase().includes(search) ||
        product.grape.toLowerCase().includes(search) ||
        product.type.toLowerCase().includes(search);

      const matchesCategory =
        category === "All" ||
        product.type === category;

      return (
        matchesSearch &&
        matchesCategory
      );
    });

  /* SORT */

  if (sort === "low") {

    filtered.sort(
      (a, b) => a.price - b.price
    );

  } else if (sort === "high") {

    filtered.sort(
      (a, b) => b.price - a.price
    );

  } else if (sort === "name") {

    filtered.sort(
      (a, b) =>
        a.name.localeCompare(b.name)
    );
  }

  /* EMPTY STATE */

  if (!filtered.length) {

    container.innerHTML = `
      <div class="empty" style="grid-column: 1 / -1;">
        <h3>No wines found</h3>

        <p>
          Try another search or category.
        </p>
      </div>
    `;

    return;
  }

  container.innerHTML =
    filtered
      .map(productCard)
      .join("");
}

/* =====================================================
   PRODUCT CARD
===================================================== */

function productCard(product) {

  const safeName =
    escapeHTML(product.name);

  const safeDescription =
    escapeHTML(product.description);

  const safeRegion =
    escapeHTML(product.region);

  const safeGrape =
    escapeHTML(product.grape);

  const badge =
    product.badge
      ? `
        <div class="badge">
          ${escapeHTML(product.badge)}
        </div>
      `
      : "";

  return `
    <article
      class="product-card"
      onclick="openProduct(${product.id})"
    >

      ${badge}

      <div class="product-image">

        <div class="bottle ${product.type.toLowerCase()}">

          <div class="bottle-neck"></div>

          <div class="bottle-body">

            <div class="label">
              VINOÉ<br>
              ${safeName}
            </div>

          </div>

        </div>

      </div>

      <div class="product-info">

        <div class="product-type">
          ${escapeHTML(product.type)}
        </div>

        <h3 class="product-name">
          ${safeName}
        </h3>

        <p class="product-description">
          ${safeDescription}
        </p>

        <p
          style="
            margin-top:7px;
            color:#93888a;
            font:11px Arial,sans-serif;
          "
        >
          ${safeRegion} • ${safeGrape}
        </p>

        <div class="product-bottom">

          <div class="price">
            ${formatPrice(product.price)}
          </div>

          <button
            class="add-btn"
            onclick="
              event.stopPropagation();
              addToCart(${product.id});
            "
          >
            Add
          </button>

        </div>

      </div>

    </article>
  `;
}

/* =====================================================
   CATEGORY FILTER
===================================================== */

function setCategory(category) {

  const filter =
    document.getElementById("categoryFilter");

  if (!filter) return;

  filter.value = category;

  renderProducts();

  const shop =
    document.getElementById("shop");

  if (shop) {

    shop.scrollIntoView({
      behavior: "smooth"
    });
  }
}

/* =====================================================
   SEARCH
===================================================== */

function focusSearch() {

  const shop =
    document.getElementById("shop");

  const search =
    document.getElementById("searchInput");

  if (shop) {

    shop.scrollIntoView({
      behavior: "smooth"
    });
  }

  setTimeout(() => {

    if (search) {
      search.focus();
    }

  }, 500);
}

/* =====================================================
   MOBILE MENU
===================================================== */

function toggleMobileMenu() {

  const nav =
    document.getElementById("navLinks");

  if (!nav) return;

  nav.classList.toggle("active");
}

function closeMobileMenu() {

  const nav =
    document.getElementById("navLinks");

  if (!nav) return;

  nav.classList.remove("active");
}

/* =====================================================
   SCROLL TO SHOP
===================================================== */

function scrollToShop() {

  const shop =
    document.getElementById("shop");

  if (!shop) return;

  shop.scrollIntoView({
    behavior: "smooth"
  });
}

/* =====================================================
   ADD TO CART
===================================================== */

function addToCart(productId) {

  const product =
    products.find(
      item => item.id === productId
    );

  if (!product) return;

  const existing =
    cart.find(
      item => item.id === productId
    );

  if (existing) {

    existing.quantity += 1;

  } else {

    cart.push({
      id: product.id,
      quantity: 1
    });
  }

  saveCart();

  updateCart();

  showToast(
    `${product.name} added to cart`
  );
}

/* =====================================================
   UPDATE CART
===================================================== */

function updateCart() {

  const cartCount =
    document.getElementById("cartCount");

  const cartItems =
    document.getElementById("cartItems");

  const cartTotal =
    document.getElementById("cartTotal");

  const totalQuantity =
    cart.reduce(
      (sum, item) =>
        sum + item.quantity,
      0
    );

  const totalPrice =
    cart.reduce((sum, item) => {

      const product =
        products.find(
          product =>
            product.id === item.id
        );

      return product
        ? sum +
            product.price *
            item.quantity
        : sum;

    }, 0);

  if (cartCount) {

    cartCount.textContent =
      totalQuantity;
  }

  if (cartTotal) {

    cartTotal.textContent =
      formatPrice(totalPrice);
  }

  if (!cartItems) return;

  if (!cart.length) {

    cartItems.innerHTML = `
      <div class="empty">

        <div
          style="
            font-size:45px;
            margin-bottom:15px;
          "
        >
          🍷
        </div>

        <h3>Your cart is empty</h3>

        <p>
          Discover a bottle for your next moment.
        </p>

      </div>
    `;

    return;
  }

  cartItems.innerHTML =
    cart
      .map(cartItemHTML)
      .join("");
}

/* =====================================================
   CART ITEM
===================================================== */

function cartItemHTML(item) {

  const product =
    products.find(
      p => p.id === item.id
    );

  if (!product) return "";

  return `
    <div class="cart-item">

      <div
        class="cart-bottle"
        style="
          background:
            ${
              getBottleColor(product.type)
            };
        "
      ></div>

      <div class="cart-item-info">

        <h4>
          ${escapeHTML(product.name)}
        </h4>

        <p>
          ${formatPrice(product.price)}
        </p>

        <div class="qty">

          <button
            onclick="changeQuantity(${product.id}, -1)"
            aria-label="Decrease quantity"
          >
            −
          </button>

          <span>
            ${item.quantity}
          </span>

          <button
            onclick="changeQuantity(${product.id}, 1)"
            aria-label="Increase quantity"
          >
            +
          </button>

        </div>

        <button
          class="remove"
          onclick="removeFromCart(${product.id})"
        >
          Remove
        </button>

      </div>

    </div>
  `;
}

/* =====================================================
   CHANGE QUANTITY
===================================================== */

function changeQuantity(productId, amount) {

  const item =
    cart.find(
      item => item.id === productId
    );

  if (!item) return;

  item.quantity += amount;

  if (item.quantity <= 0) {

    cart =
      cart.filter(
        item => item.id !== productId
      );
  }

  saveCart();

  updateCart();
}

/* =====================================================
   REMOVE FROM CART
===================================================== */

function removeFromCart(productId) {

  const product =
    products.find(
      item => item.id === productId
    );

  cart =
    cart.filter(
      item => item.id !== productId
    );

  saveCart();

  updateCart();

  if (product) {

    showToast(
      `${product.name} removed from cart`
    );
  }
}

/* =====================================================
   CART OPEN / CLOSE
===================================================== */

function openCart() {

  const panel =
    document.getElementById("cartPanel");

  const overlay =
    document.getElementById("overlay");

  if (!panel) return;

  panel.classList.add("active");

  if (overlay) {
    overlay.classList.add("active");
  }

  document.body.style.overflow = "hidden";
}

function closeCart() {

  const panel =
    document.getElementById("cartPanel");

  const overlay =
    document.getElementById("overlay");

  if (panel) {
    panel.classList.remove("active");
  }

  if (overlay) {
    overlay.classList.remove("active");
  }

  document.body.style.overflow = "";
}

/* =====================================================
   PRODUCT MODAL
===================================================== */

function openProduct(productId) {

  const product =
    products.find(
      item => item.id === productId
    );

  if (!product) return;

  const modal =
    document.getElementById("productModal");

  const bottle =
    document.getElementById("modalBottle");

  const type =
    document.getElementById("modalType");

  const name =
    document.getElementById("modalName");

  const price =
    document.getElementById("modalPrice");

  const description =
    document.getElementById(
      "modalDescription"
    );

  const addButton =
    document.getElementById("modalAdd");

  if (!modal) return;

  type.textContent =
    `${product.type} • ${product.region}`;

  name.textContent =
    product.name;

  price.textContent =
    formatPrice(product.price);

  description.textContent =
    product.description;

  bottle.innerHTML = `
    <div class="bottle ${product.type.toLowerCase()}">

      <div class="bottle-neck"></div>

      <div class="bottle-body">

        <div class="label">
          VINOÉ<br>
          ${escapeHTML(product.name)}
        </div>

      </div>

    </div>
  `;

  addButton.onclick = () => {

    addToCart(product.id);

    closeProduct();
  };

  modal.classList.add("active");

  document.body.style.overflow = "hidden";
}

function closeProduct() {

  const modal =
    document.getElementById("productModal");

  if (modal) {
    modal.classList.remove("active");
  }

  document.body.style.overflow = "";
}

/* =====================================================
   CHECKOUT
===================================================== */

function checkout() {

  if (!cart.length) {

    showToast(
      "Your cart is empty"
    );

    return;
  }

  closeCart();

  const modal =
    document.getElementById(
      "checkoutModal"
    );

  if (!modal) return;

  modal.classList.add("active");

  document.body.style.overflow =
    "hidden";
}

function closeCheckout() {

  const modal =
    document.getElementById(
      "checkoutModal"
    );

  if (modal) {

    modal.classList.remove(
      "active"
    );
  }

  document.body.style.overflow = "";
}

/* =====================================================
   PLACE ORDER
===================================================== */

function placeOrder(event) {

  event.preventDefault();

  if (!cart.length) {

    closeCheckout();

    showToast(
      "Your cart is empty"
    );

    return;
  }

  const form =
    event.target;

  const name =
    form.querySelector(
      'input[placeholder="Full name"]'
    )?.value.trim();

  const email =
    form.querySelector(
      'input[type="email"]'
    )?.value.trim();

  if (!name || !email) {

    showToast(
      "Please complete the required fields"
    );

    return;
  }

  const orderNumber =
    "VIN" +
    Date.now()
      .toString()
      .slice(-8);

  cart = [];

  saveCart();

  updateCart();

  closeCheckout();

  form.reset();

  showToast(
    `Order ${orderNumber} placed successfully 🎉`
  );
}

/* =====================================================
   NEWSLETTER
===================================================== */

function subscribe(event) {

  event.preventDefault();

  const input =
    document.getElementById("email");

  if (!input) return;

  const email =
    input.value.trim();

  if (!email) {

    showToast(
      "Please enter your email address"
    );

    return;
  }

  localStorage.setItem(
    "vinoeNewsletterEmail",
    email
  );

  input.value = "";

  showToast(
    "Thanks for subscribing! 🥂"
  );
}

/* =====================================================
   TOAST
===================================================== */

let toastTimer;

function showToast(message) {

  const toast =
    document.getElementById("toast");

  if (!toast) return;

  toast.textContent = message;

  toast.classList.add("show");

  clearTimeout(toastTimer);

  toastTimer =
    setTimeout(() => {

      toast.classList.remove(
        "show"
      );

    }, 2800);
}

/* =====================================================
   MODAL / OVERLAY EVENTS
===================================================== */

function setupModalClosing() {

  const productModal =
    document.getElementById(
      "productModal"
    );

  const checkoutModal =
    document.getElementById(
      "checkoutModal"
    );

  if (productModal) {

    productModal.addEventListener(
      "click",
      event => {

        if (
          event.target ===
          productModal
        ) {
          closeProduct();
        }

      }
    );
  }

  if (checkoutModal) {

    checkoutModal.addEventListener(
      "click",
      event => {

        if (
          event.target ===
          checkoutModal
        ) {
          closeCheckout();
        }

      }
    );
  }
}

/* =====================================================
   ESC KEY
===================================================== */

document.addEventListener(
  "keydown",
  event => {

    if (event.key !== "Escape") {
      return;
    }

    closeCart();
    closeProduct();
    closeCheckout();
    closeMobileMenu();

  }
);

/* =====================================================
   LOCAL STORAGE
===================================================== */

function saveCart() {

  localStorage.setItem(
    "vinoeCart",
    JSON.stringify(cart)
  );
}

/* =====================================================
   PRICE FORMAT
===================================================== */

function formatPrice(price) {

  return new Intl.NumberFormat(
    "en-IN",
    {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0
    }
  ).format(price);
}

/* =====================================================
   BOTTLE COLORS
===================================================== */

function getBottleColor(type) {

  switch (type) {

    case "White":
      return "#c8b77b";

    case "Rosé":
      return "#a95a68";

    case "Sparkling":
      return "#b0a98c";

    case "Red":
    default:
      return "#391522";
  }
}

/* =====================================================
   HTML ESCAPING
===================================================== */

function escapeHTML(value) {

  return String(value)
    .replace(
      /&/g,
      "&amp;"
    )
    .replace(
      /</g,
      "&lt;"
    )
    .replace(
      />/g,
      "&gt;"
    )
    .replace(
      /"/g,
      "&quot;"
    )
    .replace(
      /'/g,
      "&#039;"
    );
}

/* =====================================================
   ACCESS CODE
===================================================== */

function checkAccessCode(event) {
    event.preventDefault();

    const input = document.getElementById("accessCode");
    const error = document.getElementById("codeError");
    const codeGate = document.getElementById("codeGate");

    if (!input || !codeGate) return;

    const enteredCode = input.value.trim();

    if (enteredCode === WEBSITE_ACCESS_CODE) {

        // Correct code → open website
        codeGate.style.display = "none";

        // Clear input and error
        input.value = "";

        if (error) {
            error.textContent = "";
        }

        // DO NOT save access verification
        // in localStorage or sessionStorage.

    } else {

        // Wrong code
        if (error) {
            error.textContent =
                "Incorrect access code. Please try again.";
        }

        input.value = "";
        input.focus();
    }
}


/* =====================================================
   INITIALIZE ACCESS CODE
===================================================== */

function initializeCodeGate() {

    const codeGate =
        document.getElementById("codeGate");

    if (!codeGate) return;

    // Always show code screen whenever
    // the website/page is loaded or refreshed.
    codeGate.style.display = "flex";
}


/* =====================================================
   INITIALIZE BOTH GATES
===================================================== */

document.addEventListener(
    "DOMContentLoaded",
    () => {

        initializeCodeGate();

    }
);


/* =====================================================
   EXPORT
===================================================== */

window.checkAccessCode = checkAccessCode;
/* =====================================================
   BASIC ANTI-COPY / ANTI-INSPECT DETERRENTS
===================================================== */

// Disable right-click
document.addEventListener("contextmenu", function (event) {
    event.preventDefault();
});

// Disable text selection
document.addEventListener("selectstart", function (event) {
    event.preventDefault();
});

// Disable copy
document.addEventListener("copy", function (event) {
    event.preventDefault();
});

// Disable cut
document.addEventListener("cut", function (event) {
    event.preventDefault();
});

// Disable drag
document.addEventListener("dragstart", function (event) {
    event.preventDefault();
});

// Block common keyboard shortcuts
document.addEventListener("keydown", function (event) {

    // F12
    if (event.key === "F12") {
        event.preventDefault();
        return false;
    }

    // Ctrl + Shift + I
    if (
        event.ctrlKey &&
        event.shiftKey &&
        event.key.toLowerCase() === "i"
    ) {
        event.preventDefault();
        return false;
    }

    // Ctrl + Shift + J
    if (
        event.ctrlKey &&
        event.shiftKey &&
        event.key.toLowerCase() === "j"
    ) {
        event.preventDefault();
        return false;
    }

    // Ctrl + Shift + C
    if (
        event.ctrlKey &&
        event.shiftKey &&
        event.key.toLowerCase() === "c"
    ) {
        event.preventDefault();
        return false;
    }

    // Ctrl + U
    if (
        event.ctrlKey &&
        event.key.toLowerCase() === "u"
    ) {
        event.preventDefault();
        return false;
    }

    // Ctrl + C
    if (
        event.ctrlKey &&
        event.key.toLowerCase() === "c"
    ) {
        event.preventDefault();
        return false;
    }

    // Ctrl + X
    if (
        event.ctrlKey &&
        event.key.toLowerCase() === "x"
    ) {
        event.preventDefault();
        return false;
    }

    // Ctrl + A
    if (
        event.ctrlKey &&
        event.key.toLowerCase() === "a"
    ) {
        event.preventDefault();
        return false;
    }

    // Ctrl + S
    if (
        event.ctrlKey &&
        event.key.toLowerCase() === "s"
    ) {
        event.preventDefault();
        return false;
    }
});