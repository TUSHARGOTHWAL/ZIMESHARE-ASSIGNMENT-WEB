import { db } from './firebase-config.js';
import { doc, getDoc } from 'https://www.gstatic.com/firebasejs/10.13.1/firebase-firestore.js';

async function fetchCartItems() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const cartItemsDiv = document.getElementById('cart-items');
    const subtotalDiv = document.getElementById('cart-subtotal');
    cartItemsDiv.innerHTML = '';
    let subtotal = 0;

    if (cart.length === 0) {
        cartItemsDiv.innerHTML = '<p>Your cart is empty.</p>';
        subtotalDiv.innerHTML = '<p>Subtotal: ₹0</p>';
        return;
    }

    for (const item of cart) {
        const productRef = doc(db, 'products', item.id);
        const docSnap = await getDoc(productRef);

        if (!docSnap.exists()) continue;

        const product = docSnap.data();
        const totalPrice = product.price * item.quantity;
        subtotal += totalPrice;

        cartItemsDiv.innerHTML += `
            <div class="flex justify-between items-center mb-4 p-4 border-b">
                <div class="flex items-center">
                    <img src="${product.image}" alt="${product.name}" class="w-16 h-16 object-cover rounded-lg mr-4">
                    <div>
                        <h3 class="text-lg font-semibold">${product.name}</h3>
                        <p class="text-gray-600">₹${product.price} x ${item.quantity}</p>
                        <p class="text-gray-600">Total: ₹${totalPrice}</p>
                    </div>
                </div>
                <button data-id="${item.id}" data-color="${item.color}" data-size="${item.size}" class="remove-item text-red-600 hover:underline">Remove</button>
            </div>
        `;
    }

    subtotalDiv.innerHTML = `<p class="text-xl font-bold">Subtotal: ₹${subtotal}</p>`;

    document.querySelectorAll('.remove-item').forEach(button => {
        button.addEventListener('click', removeItem);
    });
}

function removeItem(event) {
    const productId = event.target.getAttribute('data-id');
    const color = event.target.getAttribute('data-color');
    const size = event.target.getAttribute('data-size');
    
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart = cart.filter(item => !(item.id === productId && item.color === color && item.size === size));
    localStorage.setItem('cart', JSON.stringify(cart));
    fetchCartItems();
}

document.addEventListener('DOMContentLoaded', fetchCartItems);
