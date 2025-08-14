import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBVa2tGt1k9hbj6P58V7WxghsI4Wr4azkM",
  authDomain: "swiggyauth-3453e.firebaseapp.com",
  projectId: "swiggyauth-3453e",
  storageBucket: "swiggyauth-3453e.firebasestorage.app",
  messagingSenderId: "1035177801083",
  appId: "1:1035177801083:web:70fbfd4b1694f6f72ab9de",
  measurementId: "G-MGQQPQ7NXK",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth };
