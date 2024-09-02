import { db } from './firebase-config.js';
import { collection, query, where, getDocs } from 'https://www.gstatic.com/firebasejs/10.13.1/firebase-firestore.js';

document.addEventListener('DOMContentLoaded', async () => {
    const searchInput = document.getElementById('searchInput');
    const resultsContainer = document.getElementById('searchResults');

    if (!searchInput || !resultsContainer) {
        console.error('Search input or results container not found.');
        return;
    }

    const fetchProducts = async () => {
        const productsRef = collection(db, 'products');
        try {
            const snapshot = await getDocs(productsRef);
            const products = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            return products;
        } catch (error) {
            console.error('Error fetching products:', error);
            return [];
        }
    };

    const products = await fetchProducts();

    const script = document.createElement('script');
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/fuse.js/6.6.2/fuse.min.js';
    script.onload = () => {
        const fuse = new Fuse(products, {
            keys: ['name', 'description'],
            includeScore: true,
            threshold: 0.5,  
        });

        function displayResults(items) {
            resultsContainer.innerHTML = '';
            if (items.length === 0) {
                resultsContainer.innerHTML = '<p class="text-center text-gray-600">No results found.</p>';
                return;
            }

            items.forEach(product => {
                resultsContainer.innerHTML += `
                    <div class="bg-white shadow-lg rounded-lg overflow-hidden transition-transform transform hover:scale-105 hover:shadow-xl mb-4">
                        <img src="${product.image || 'default-image.jpg'}" alt="${product.name}" class="w-full h-48 object-cover">
                        <div class="p-4">
                            <h3 class="text-lg font-semibold mb-2">${product.name}</h3>
                            <p class="text-gray-600 mb-2">${product.description}</p>
                            <p class="text-xl font-bold">₹${product.price}</p>
                        </div>
                    </div>
                `;
            });
        }

        searchInput.addEventListener('input', () => {
            const queryText = searchInput.value.trim().toLowerCase();  
            if (queryText.length > 2) {
                const results = fuse.search(queryText).map(result => result.item);
                displayResults(results);
            } else {
                resultsContainer.innerHTML = '';
            }
        });
    };
    document.head.appendChild(script);
});
