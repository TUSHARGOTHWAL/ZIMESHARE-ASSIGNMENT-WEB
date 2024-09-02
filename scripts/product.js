import { db } from './firebase-config.js';
import { doc, getDoc } from 'https://www.gstatic.com/firebasejs/10.13.1/firebase-firestore.js';

async function fetchProduct() {
    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get('id');

    if (!productId) {
        window.location.href = 'index.html';
        return;
    }

    const productRef = doc(db, 'products', productId);
    const docSnap = await getDoc(productRef);

    if (!docSnap.exists()) {
        window.location.href = 'index.html';
        return;
    }

    const product = docSnap.data();

    // Update UI with product data
    document.getElementById('product-name').innerText = product.name;
    document.getElementById('product-description').innerText = product.description;
    document.getElementById('product-price').innerText = `₹${product.price}`;
    document.getElementById('product-image').src = product.image;

    // Event listener for "Add to Cart" button
    document.getElementById('add-to-cart').addEventListener('click', () => addToCart(productId));
}

function addToCart(productId) {
    const color = document.getElementById('product-color').value;
    const size = document.getElementById('product-size').value;
    const quantity = parseInt(document.getElementById('product-quantity').value, 10);

    if (!productId) {
        console.error('No product ID found.');
        return;
    }

    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    const productIndex = cart.findIndex(item => item.id === productId);

    if (productIndex !== -1) {
        cart[productIndex].quantity = quantity;
    } else {
        cart.push({
            id: productId,
            color: color,
            size: size,
            quantity: quantity
        });
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    alert('Product added to cart!');
}

document.addEventListener('DOMContentLoaded', fetchProduct);
