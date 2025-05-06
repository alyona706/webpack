import { ROOT_ELEMENT, createShopInterface } from "./app.js";

export function observeOrdersPageButton() {
    document.querySelector('.orders-button').addEventListener('click', showOrdersPage);
}

function showOrdersPage() {
    const parent = document.querySelector(ROOT_ELEMENT);

    parent.innerHTML = `
    <button type="button" class="orders-back">Back</button>
    `;
    observeBackButton();
    showOrders();
}

function showOrders() {
    const orderInfo = document.querySelector('.order-info');
    orderInfo.innerHTML = `
        <div class="orders-wrap"></div>
    `;
    const orders = JSON.parse(localStorage.getItem('orders')) || [];

    if(orders.length === 0) {
        const message = document.createElement('p');
        message.textContent = 'No orders yet';
        orderInfo.appendChild(message);
    } else {
        showOrdersInfo(orders);
    }
}

function showOrdersInfo(orders) {
    console.log(orders);
    const ordersContainer = document.querySelector('.orders-wrap');

    ordersContainer.innerHTML = '';

    orders.forEach((order, index) => {
        const orderBlock = document.createElement('div');
        orderBlock.classList.add('order-item');

        orderBlock.innerHTML = `
            <h3>Order #${index + 1}</h3>
            <p class=>
                <strong>Name: </strong>${order.name} 
                <strong>Phone: </strong>${order.phone} 
                <strong>Product: </strong>${order.productName} 
                <strong>Price: </strong>${order.price} 
                <strong>Amount: </strong>${order.amount} 
                <strong>Total price: </strong>${order.price * order.amount} 
                <button class="delete-order" data-index="${index}">Delete</button>
            </p>
            <p class="desc disabled"><strong>Description: </strong>${order.productDesc}</p>
        `,
        orderBlock.addEventListener('click', function (event) {
            if (!event.target.classList.contains('delete-order')) {
                const desc = orderBlock.querySelector('.desc');
                desc.classList.toggle('disabled');
            }
        });
        ordersContainer.appendChild(orderBlock);
    });

    observeDeleteOrderButton();
}

function observeBackButton() {
    document.querySelector('.orders-back').addEventListener('click', createShopInterface);
}

function observeDeleteOrderButton() {
    document.querySelector('.orders-wrap').addEventListener('click', function(event) {
        if (event.target.classList.contains('delete-order')) {
            const index = event.target.dataset.index;
            deleteOrder(index);
        }
    })
}

function deleteOrder(index) {
    let orders = JSON.parse(localStorage.getItem('orders')) || [];
    orders.splice(index, 1);
    localStorage.setItem('orders', JSON.stringify(orders));
    // showOrdersInfo(orders);
    showOrders();
}