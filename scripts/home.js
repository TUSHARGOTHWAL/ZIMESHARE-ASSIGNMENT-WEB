// home.js
import { db } from './firebase-config.js';
import { collection, getDocs } from 'https://www.gstatic.com/firebasejs/10.13.1/firebase-firestore.js';

async function fetchProducts() {
    try {
        const productsCollectionRef = collection(db, 'products');

        const snapshot = await getDocs(productsCollectionRef);

        if (snapshot.empty) {
            console.log('No products found.');
            return;
        }

        const products = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

        console.log('Fetched products:', products);

        displayProducts(products);
    } catch (error) {
        console.error('Error fetching products:', error);
    }
}

function displayProducts(products) {
    const swiperWrapper = document.querySelector('.swiper-wrapper');
    if (!swiperWrapper) {
        console.error('Swiper wrapper not found.');
        return;
    }

    swiperWrapper.innerHTML = '';

    products.forEach(product => {
        swiperWrapper.innerHTML += `
    <div class="swiper-slide bg-white shadow-lg rounded-lg overflow-hidden transition-transform duration-300 ease-in-out transform hover:scale-105">
        <img src="${product.image || 'default-image.jpg'}" alt="${product.name}" class="w-full h-48 object-cover">
        <div class="p-4">
            <h3 class="text-lg font-semibold mb-2 truncate">${product.name}</h3>
            <p class="text-gray-600 mb-2 truncate">${product.description}</p>
            <p class="text-xl font-bold mb-2">₹${product.price}</p>
            <a href="product.html?id=${product.id}" class="block mt-4 py-2 px-4 bg-blue-500 text-white text-center rounded-lg hover:bg-blue-600 transition duration-300">View Details</a>
        </div>
    </div>
`;

    });
}

document.addEventListener('DOMContentLoaded', () => {
    fetchProducts();
});
