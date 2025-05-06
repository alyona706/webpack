const orderDataConfig = {
    name: {
        regExp: /^[a-z]{3,20}$/i,
        errorSelector: '.name-error',
        errorMessage: 'Name is incorrect',
    },
    amount: {
        regExp: /^\d{1,2}$/,
        errorSelector: '.amount-error',
        errorMessage: 'Amount is incorrect',
    },
    phone: {
        regExp: /^\+380\d{9}$/,
        errorSelector: '.phone-error',
        errorMessage: 'Phone is incorrect',
    }
}

export function validateOrder() {
    const formData = getInfoFormCheckoutForm();
    const formErrors = formValidCheck(formData);

    for(let key in orderDataConfig) {
        document.querySelector(orderDataConfig[key].errorSelector).innerHTML = '';
    }

    if(formErrors.length === 0) {
        const orders = JSON.parse(localStorage.getItem('orders')) || [];
        const orderWithProduct = addProductInfoToOrder(formData);
        orders.push(addProductInfoToOrder(orderWithProduct));
        localStorage.setItem('orders', JSON.stringify(orders));
        showOrderMessage();
    } else {
        formErrors.forEach(errorKey => {
            document.querySelector(orderDataConfig[errorKey].errorSelector).innerHTML = orderDataConfig[errorKey].errorMessage;
        })
    }
}

function getInfoFormCheckoutForm() {
    const form = document.forms.order;

    return {
        name: form.name.value,
        amount: form.amount.value,
        phone: form.phone.value,
    };
}

function formValidCheck(data) {
    const errors = [];
    for (let key in data) {
        if(!orderDataConfig[key].regExp.test(data[key])) {
            errors.push(key);
        }
    }
    return errors;
}

function showOrderMessage() {
    const parent = document.querySelector('.order-info');
    parent.innerHTML = '';
  
    const orderInfoMess = document.createElement('h2');
    orderInfoMess.textContent = 'Your purchase was successful! Thank you for shopping with us.';
    parent.appendChild(orderInfoMess);
};

function addProductInfoToOrder(formData) {
    const product = JSON.parse(sessionStorage.getItem('product'));

    formData.productName = product.name;
    formData.price = product.price;
    formData.productDesc = product.description;

    return formData;
}