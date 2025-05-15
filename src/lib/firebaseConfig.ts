// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyASDoqXDgUVBhTOVNz6fKBJ1cVjdMUhMRM",
  authDomain: "tutoring-app-4b8a6.firebaseapp.com",
  projectId: "tutoring-app-4b8a6",
  storageBucket: "tutoring-app-4b8a6.firebasestorage.app",
  messagingSenderId: "1073113475820",
  appId: "1:1073113475820:web:7c2f0094e1b693b8bbd3c9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app;