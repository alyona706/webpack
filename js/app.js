import '../scss/style.scss';

import { categories } from "./products.js";
import { observeOrdersPageButton } from "./orders-interface.js";
import { validateOrder } from "./form-helpers.js";

export const ROOT_ELEMENT = '.root';

export function createShopInterface() {
  document.querySelector(ROOT_ELEMENT).innerHTML = `
    <button type="button" class="orders-button">My orders</button>
    <div class="categories">
      <h2>Categories</h2>
      <div></div>
    </div>
    <div class="products">
      <h2>Products</h2>
      <div></div>
    </div>
    <div class="information">
      <div></div>
    </div>
    `;

    const orderInfo = document.querySelector('.order-info');
    orderInfo.innerHTML = '';

    showCategories();
    observeCategories();
    observeOrdersPageButton();
}

function showCategories() {
  const parent = document.querySelector('.categories > div');
  categories.forEach(category => {
    const categoryElement = document.createElement('p');
    categoryElement.textContent = category.name;
    categoryElement.setAttribute('data-category-id', category.id);
    categoryElement.classList.add('category-item');

    parent.appendChild(categoryElement);
  });
}

function showProductInfo(selectedProduct) {
  const parent = document.querySelector('.information > div');

  parent.innerHTML = '';

  const productName = document.createElement('h2');
  productName.textContent = selectedProduct.name;

  const productPrice = document.createElement('p');
  productPrice.innerHTML = `<strong>Price:</strong> $${selectedProduct.price}`;

  const productDesc = document.createElement('p');
  productDesc.textContent = selectedProduct.description;

  const buyBtn = document.createElement('button');
  buyBtn.textContent = 'Buy';
  buyBtn.classList.add('buy-btn');

  parent.appendChild(productName);
  parent.appendChild(productPrice);
  parent.appendChild(productDesc);
  parent.appendChild(buyBtn);

  saveSelectedProduct(selectedProduct);
  observeBuyButton();
}

function showProducts(products, categoryId) {
  const parent = document.querySelector('.products > div');
  parent.setAttribute('data-category-id', categoryId);
  const orderInfoMessage = document.querySelector('.order-info');

  parent.innerHTML = '';
  orderInfoMessage.innerHTML = '';
  
  products.forEach(product => {
    const productElement = document.createElement('p');
    productElement.textContent = product.name;
    productElement.setAttribute('data-products-id', product.id);
    
    productElement.classList.add('product-item');

    parent.appendChild(productElement);
  });

  document.querySelector('.products').addEventListener('click', event => {
    if (!event.target.classList.contains('product-item') ) {
      return;
    }

    const productId = parseInt(event.target.getAttribute('data-products-id'));

    const selectedProduct = products.find(product => product.id === productId);

    if (!selectedProduct) {
      return;
    }

    showProductInfo(selectedProduct);
  });
}

document.addEventListener('DOMContentLoaded', function () {
  createShopInterface();
});

function observeCategories() {
  document.querySelector('.categories').addEventListener('click', event => {
    if (!event.target.classList.contains('category-item') ) {
      return;
    }
  
    const categoryId = parseInt(event.target.getAttribute('data-category-id'));
  
    const selectedCategory = categories.find(category => category.id === categoryId);
    if (!selectedCategory) {
      return;
    }
  
    const productInfo = document.querySelector('.information > div');
    productInfo.innerHTML = '';
  
    showProducts(selectedCategory.products, categoryId);
  });
}

function observeBuyButton() {
  document.querySelector('.buy-btn').addEventListener('click', () => {
    const parent = document.querySelector('.order-info');

    parent.innerHTML = `
      <form name="order" class="orderForm">
        <p>
          Name: <input type="text" name="name"/>
          <span class="name-error"></span>
        </p>
        <p>
          Amount: <input type="number" name="amount" min="1" max="10"/>
          <span class="amount-error"></span>
        </p>
        <p>
          Phone: <input type="text" name="phone"/>
          <span class="phone-error"></span>
        </p>
        <button type="button" class="send-order">Order</button>
      </form>
    `;

    document.querySelector('.send-order').addEventListener('click', validateOrder);
  })
}

function saveSelectedProduct(selectedProduct) {
  sessionStorage.setItem('product', JSON.stringify(selectedProduct));
}