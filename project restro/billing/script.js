let cart = [];
let totalAmount = 0;

// Function to add items to the cart
function addToCart(itemName, itemPrice, portion) {
    const existingItem = cart.find(item => item.name === itemName && item.portion === portion);
    
    if (existingItem) {
        existingItem.quantity += 1;
        existingItem.price += itemPrice; // Update the total price for the item
    } else {
        cart.push({ name: itemName, price: itemPrice, quantity: 1, portion: portion });
    }
    
    totalAmount += itemPrice; // Update the total amount for the cart
    updateCart();
}

// Function to update the cart display
function updateCart() {
    const cartItems = document.getElementById('cart-items');
    cartItems.innerHTML = ''; // Clear the current cart items

    cart.forEach((item, index) => {
        const li = document.createElement('div');
        li.classList.add('cart-item');

        const itemTotal = item.price; // Total price for the item
        li.innerHTML = `
            <div class="cart-item-name">${index + 1}. ${item.name}</div>
            <div class="cart-quantity">${item.quantity} ${item.portion}</div>
            <div class="cart-item-price">₹${(item.price / item.quantity).toFixed(2)}</div>
            <div class="cart-total">₹${itemTotal}</div>
        `;

        cartItems.appendChild(li);
    });

    document.getElementById('total-amount').textContent = totalAmount.toFixed(2); // Update total amount display
}

// Function to search menu items
function searchMenu() {
    const input = document.getElementById('search-input').value.toLowerCase();
    const menuItems = document.querySelectorAll('.menu-item');
    
    menuItems.forEach(item => {
        const itemName = item.querySelector('p').textContent.toLowerCase();
        if (itemName.includes(input)) {
            item.style.display = 'block'; // Show matching item
        } else {
            item.style.display = 'none'; // Hide non-matching item
        }
    });
}

// Function to get current date and time
function getCurrentDateTime() {
    const now = new Date();
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit', second: '2-digit' };
    return now.toLocaleString('en-US', options);
}

// Function to handle checkout
function checkout(option) {
    if (cart.length === 0) {
        alert("Your cart is empty!");
    } else {
        // Set the payment method in the receipt
        const paymentMethod = option === 'option1' ? 'Cash' : 'UPI';
        document.getElementById('payment-method').textContent = paymentMethod;

        // Set the current date and time in the receipt
        document.getElementById('current-date-time').textContent = getCurrentDateTime();

        let receiptContent = ''; // Clear previous content
        
        cart.forEach(item => {
            receiptContent += `
                <div class="cart-item">
                    <div class="cart-item-name">${item.name}</div>
                    <div class="cart-quantity">${item.quantity} ${item.portion}</div>
                    <div class="cart-item-price">₹${(item.price / item.quantity).toFixed(2)}</div>
                    <div class="cart-total">₹${item.price}</div>
                </div>
            `;
        });

        // Add payment method and grand total to the receipt content
        receiptContent += `
            <div class="payment-method">
                <strong>Payment Method: ${paymentMethod}</strong>
            </div>
            <div class="receipt-total">
                <strong>Grand Total: ₹${totalAmount.toFixed(2)}</strong>
            </div>
        `;

        document.getElementById('receipt-details').innerHTML = receiptContent;
        document.getElementById('receipt-total-amount').textContent = totalAmount.toFixed(2); // Set total amount in receipt
        document.getElementById('receipt-popup').style.display = 'block'; // Show the popup

        // Clear the cart after checkout
        cart = [];
        totalAmount = 0;
        updateCart();
    }
}

// Function to close the receipt popup
function closePopup() {
    document.getElementById('receipt-popup').style.display = 'none'; // Hide the popup
}

// Function to print the receipt
function printReceipt() {
    const receiptDetails = document.getElementById('receipt-details').innerHTML;
    const currentDateTime = getCurrentDateTime();
    const newWindow = window.open('', '', 'height=600,width=800');
    
    newWindow.document.write('<html><head><title>Receipt</title>');
    newWindow.document.write('<link rel="stylesheet" href="style.css">'); // Ensure the CSS file path is correct
    newWindow.document.write('</head><body>');
    
    // Add the complete heading for the receipt
    newWindow.document.write(`
        <h1>Dine In</h1>
        <p>Address: 123 Food Street, Bihar</p>
        <p>Contact: +91 0000000000</p>
        <hr>
    `); // Replace with your restaurant's actual name, address, and contact information

    newWindow.document.write(`<h2>${currentDateTime}</h2>`); // Add current date and time
    newWindow.document.write(receiptDetails);
    newWindow.document.write('</body></html>');
    newWindow.document.close();
    
    newWindow.onload = function() { // Ensure the content is fully loaded before printing
        newWindow.print();
        newWindow.close(); // Close the window after printing
    };
}
