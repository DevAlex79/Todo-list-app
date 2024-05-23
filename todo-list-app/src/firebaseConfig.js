// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
//import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore"; // Import getFirestore
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyBsXSnD9tXO_9eo6mGKDMs6ltul0R-8v2o",
    authDomain: "todo-list-app-fffb1.firebaseapp.com",
    projectId: "todo-list-app-fffb1",
    storageBucket: "todo-list-app-fffb1.appspot.com",
    messagingSenderId: "1096897049994",
    appId: "1:1096897049994:web:0dbd9f9c98b865bef38473",
    measurementId: "G-6HTZHZC0PK"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
//const analytics = getAnalytics(app);
const db = getFirestore(app);

export { db };


