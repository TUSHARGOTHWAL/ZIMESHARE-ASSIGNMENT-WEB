import { collection, addDoc } from 'https://www.gstatic.com/firebasejs/10.13.1/firebase-firestore.js';
import { db } from './firebase-config.js';

console.log('Firestore instance:', db);

const productsCollection = collection(db, 'products');

const addProductForm = document.getElementById('addProductForm');

addProductForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const name = document.getElementById('name').value;
    const description = document.getElementById('description').value;
    const price = parseFloat(document.getElementById('price').value);
    const image = document.getElementById('image').value;
    const category = document.getElementById('category').value; // Get selected category
    const time = new Date().toISOString();

    if (name && description && price && image && category) {
        try {
            const docRef = await addDoc(productsCollection, {
                name,
                description,
                price,
                image,
                category, 
                time
            });

            console.log('Document written with ID: ', docRef.id);
            alert('Product added successfully!');
            
            addProductForm.reset();
        } catch (error) {
            console.error('Error adding document: ', error);
            alert('Failed to add product. Please try again.');
        }
    } else {
        alert('Please fill in all fields.');
    }
});
