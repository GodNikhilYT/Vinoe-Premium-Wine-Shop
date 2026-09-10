 <img width="50" height="50" alt="Image" src="https://github.com/user-attachments/assets/49115c0a-1a8e-4b9c-8bf1-909ac8cf646d" />

# 🍷 Vinoé – Premium Wine Shop

Vinoé is a modern, responsive **premium wine shop demo website** built using HTML, CSS, and JavaScript. The project provides a polished e-commerce-style interface for browsing wine products, filtering and searching products, managing a shopping cart, viewing product details, and completing a demo checkout flow.

> **Note:** This is a frontend demo storefront. It does not implement a real payment gateway, backend database, or real alcohol-order fulfillment.

## ✨ Features

* 🔐 Access-code protected entry screen
* 🔞 Age verification screen
* ⚠️ Responsible drinking and health warnings
* 🍷 Premium wine-shop interface
* 🔎 Search wines by name, region, grape, or type
* 🏷️ Filter wines by:

  * Red
  * White
  * Rosé
  * Sparkling
* ↕️ Sort products by:

  * Featured
  * Price: Low to High
  * Price: High to Low
  * Name
* 🛒 Add products to cart
* ➕ Increase/decrease product quantity
* ❌ Remove products from cart
* 💾 Cart persistence using browser Local Storage
* 📦 Product detail modal
* 🧾 Demo checkout form
* 💰 Indian Rupee (₹) price formatting
* 📧 Newsletter subscription demo
* 📱 Responsive mobile navigation
* 🔔 Toast notifications
* ⌨️ ESC key support for closing modals and menus
* 🛡️ HTML escaping for dynamically rendered product information

The product catalog currently contains eight wine products with their type, region, grape variety, price, description, and promotional badges.

## 🛠️ Technologies Used

* **HTML5**
* **CSS3**
* **JavaScript (ES6+)**
* **DOM Manipulation**
* **Local Storage API**
* **Responsive Web Design**

## 📁 Project Structure

```text
Vinoe-Premium-Wine-Shop/
│
├── index.html
├── index.css
├── script.js
└── README.md
```

### `index.html`

Contains the complete website structure including the access-code screen, age-verification screen, navigation, hero section, product shop, about section, newsletter, footer, cart panel, product modal, and checkout modal.

### `index.css`

Contains the complete visual design, including the Vinoé color palette, navigation, hero section, product cards, buttons, cart interface, sections, footer, and responsive styling.

### `script.js`

Handles the website's interactive functionality such as product rendering, search/filtering, cart management, age verification, checkout, newsletter subscription, modals, Local Storage, and access-code verification.

## 🚀 How to Run

1. Clone or download this repository.

2. Keep all three files in the same folder:

```text
index.html
index.css
script.js
```

3. Open `index.html` in a modern web browser.

No backend server or package installation is required for the current demo.

## 🔐 Access Code

The project contains a frontend access-code gate.

For the current development version, the access code is defined inside the JavaScript file.

**Important:** Because this is frontend JavaScript, the access code is **not secure for production use**. Anyone who can inspect the JavaScript source can potentially discover it.

For a real application, authentication should be handled by a backend/server rather than storing the secret directly in client-side JavaScript.

## 🛒 Shopping Cart

The cart is managed using JavaScript and stored in the browser's Local Storage.

The project uses the storage key:

```text
vinoeCart
```

This allows cart contents to remain available after refreshing the page in the same browser.

## 🔎 Product Search & Filtering

Users can search by:

* Wine name
* Region
* Grape variety
* Wine type

Products can also be filtered by category and sorted by price or name.

## 💳 Checkout

The checkout interface collects:

* Full name
* Email
* Phone number
* Delivery address
* Payment method
* Legal-age confirmation

The current checkout is a **demo flow**. It generates a demo order number and clears the cart; it does not process real payments or create a real order in a backend database.

## ⚠️ Responsible Drinking

The website includes age verification and responsible-drinking messaging. Users are asked to confirm that they meet the applicable legal drinking-age requirement before accessing the storefront.

The footer also includes a health warning advising responsible drinking and compliance with local alcohol laws.

## 📱 Responsive Design

The interface is designed to work across desktop and mobile screen sizes, including a mobile navigation menu and responsive product layout.

## 🎯 Project Purpose

This project demonstrates how frontend technologies can be combined to create an e-commerce-style website with:

* Modern UI design
* Product catalog management
* Client-side search and filtering
* Shopping-cart functionality
* Browser storage
* Modal interfaces
* Form handling
* Responsive navigation
* Basic frontend security considerations

## 🔮 Future Improvements

Possible improvements include:

* Backend integration
* User authentication
* Database-driven products
* Admin dashboard
* Real product images
* Inventory management
* Secure server-side age verification
* Secure authentication instead of client-side access codes
* Payment gateway integration
* Order database
* Order tracking
* Customer accounts
* Product reviews and ratings
* Deployment with a custom domain

##🚀 Live Demo 

<img width="265" height="353" alt="Image" src="https://github.com/user-attachments/assets/97edb0f5-696e-4e69-82e9-1cc18e6100db" />

## 👨‍💻 Author

**Nikhil Choudhary**

## 📄 License

This project is intended as a learning/demo project. Add an appropriate open-source license before redistributing it as a public production project.
