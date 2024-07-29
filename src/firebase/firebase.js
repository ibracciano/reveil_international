
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";


const firebaseConfig = {
    apiKey: "AIzaSyD8z98Z-m0L94noN4Jo2TzclL20T8NK-ds",
    authDomain: "reveil-international.firebaseapp.com",
    projectId: "reveil-international",
    storageBucket: "reveil-international.appspot.com",
    messagingSenderId: "100665824172",
    appId: "1:100665824172:web:2aae41a100aa3a4dda2009"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const providerGoogle = new GoogleAuthProvider();
export const db = getFirestore(app);
export const storage = getStorage(app);