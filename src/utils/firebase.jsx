// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBwGSV3UJq_aw4W29Xo6RDN6nW3ksRDphw",
  authDomain: "auraflixgpt.firebaseapp.com",
  projectId: "auraflixgpt",
  storageBucket: "auraflixgpt.firebasestorage.app",
  messagingSenderId: "768547381941",
  appId: "1:768547381941:web:1788ddeab126549767d4fc",
  measurementId: "G-75F2WM3VF0",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth();
