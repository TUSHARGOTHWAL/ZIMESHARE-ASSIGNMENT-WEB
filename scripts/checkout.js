// checkout.js
import { db } from './firebase-config.js';
import { collection, addDoc, serverTimestamp } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-firestore.js";

document.getElementById('checkout-form').addEventListener('submit', async (e) => {
    e.preventDefault();

    const name = document.getElementById('name').value;
    const address = document.getElementById('address').value;
    const phone = document.getElementById('phone').value;
    const payment = document.getElementById('payment').value;

    const cart = JSON.parse(localStorage.getItem('cart')) || [];

    if (cart.length === 0) {
        alert('Your cart is empty.');
        return;
    }

    try {
        await addDoc(collection(db, 'orders'), {
            name,
            address,
            phone,
            payment,
            items: cart,
            createdAt: serverTimestamp()
        });

        localStorage.removeItem('cart');
        alert('Order placed successfully!');
        window.location.href = 'index.html';
    } catch (error) {
        console.error('Error placing order:', error);
        alert('Failed to place order. Please try again.');
    }
});
