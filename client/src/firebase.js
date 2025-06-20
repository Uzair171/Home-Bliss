// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "home-bliss-39765.firebaseapp.com",
  projectId: "home-bliss-39765",
  storageBucket: "home-bliss-39765.firebasestorage.app",
  messagingSenderId: "371213965029",
  appId: "1:371213965029:web:b7ecffc9b50941e26fa60c",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
