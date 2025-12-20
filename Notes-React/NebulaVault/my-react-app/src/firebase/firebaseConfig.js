// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA89oG69UA0rtdCjmSoMn3LZ1Yg5rPHNmY",
  authDomain: "nebulavault-41caf.firebaseapp.com",
  databaseURL:
    "https://nebulavault-41caf-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "nebulavault-41caf",
  storageBucket: "nebulavault-41caf.firebasestorage.app",
  messagingSenderId: "317778954038",
  appId: "1:317778954038:web:577e12d128ab5c3d7e5597",
  measurementId: "G-7X4NBG8YPK",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);
