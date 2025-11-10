// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyATC1IuLgSyOO4H48shfGA8A6oHYhBoIUU",
  authDomain: "finease-client-f946a.firebaseapp.com",
  projectId: "finease-client-f946a",
  storageBucket: "finease-client-f946a.firebasestorage.app",
  messagingSenderId: "609543149894",
  appId: "1:609543149894:web:a48f74b527b3f965cf6d47",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
