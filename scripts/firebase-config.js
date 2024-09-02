import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-firestore.js";

// Your web app's Firebase configuration
console.log('Initializing Firebase...'); 

const firebaseConfig = {
    apiKey: "AIzaSyC-VGTkZssJ6BGlDOGeyhTIurniI3pYDck",
    authDomain: "ecom-6b614.firebaseapp.com",
    projectId: "ecom-6b614",
    storageBucket: "ecom-6b614.appspot.com",
    messagingSenderId: "31065323531",
    appId: "1:31065323531:web:41d454cbc50c217add6f0e",
    measurementId: "G-KJMHJBMPQD"
  };

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

console.log('Firebase initialized'); 


export { db, auth };
