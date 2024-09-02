import { db } from './firebase-config.js';
import { collection, getDocs, query, orderBy, limit } from 'https://www.gstatic.com/firebasejs/10.13.1/firebase-firestore.js';

async function fetchNewArrivals() {
    try {
        const productsCollectionRef = collection(db, 'products');

        const newArrivalsQuery = query(
            productsCollectionRef,
            orderBy('time', 'desc'), // Sort 
            limit(8) 
        );

        const snapshot = await getDocs(newArrivalsQuery);

        if (snapshot.empty) {
            console.log('No new arrivals found.');
            return [];
        }

        const products = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

        return products;
    } catch (error) {
        console.error('Error fetching new arrivals:', error);
        return [];
    }
}

function displayNewArrivals(products) {
    const newArrivalItems = document.getElementById('newArrivalItems');
    if (!newArrivalItems) {
        console.error('New arrival items container not found.');
        return;
    }

    newArrivalItems.innerHTML = '';

    if (products.length === 0) {
        newArrivalItems.innerHTML = '<p class="text-center text-gray-600">No new arrivals.</p>';
        return;
    }

    products.forEach(product => {
        newArrivalItems.innerHTML += `
            <div class="bg-white shadow-lg rounded-lg overflow-hidden transition-transform transform hover:scale-105 hover:shadow-xl mb-4">
                <img src="${product.image || 'default-image.jpg'}" alt="${product.name}" class="w-full h-48 object-cover">
                <div class="p-4">
                    <h3 class="text-lg font-semibold mb-2">${product.name}</h3>
                    <p class="text-gray-600 mb-2">${product.description}</p>
                    <p class="text-xl font-bold">₹${product.price}</p>
                    <a href="product.html?id=${product.id}" class="block mt-4 p-2 bg-blue-500 text-white text-center rounded hover:bg-blue-600">View Details</a>
                </div>
            </div>
        `;
    });
}

document.addEventListener('DOMContentLoaded', async () => {
    const newArrivals = await fetchNewArrivals();
    displayNewArrivals(newArrivals);
});
