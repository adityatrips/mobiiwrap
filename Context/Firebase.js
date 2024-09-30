// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
	apiKey: process.env.FIREBASE_KEY,
	authDomain: "mobiiwrap.firebaseapp.com",
	projectId: "mobiiwrap",
	storageBucket: "mobiiwrap.appspot.com",
	messagingSenderId: "356188380946",
	appId: "1:356188380946:web:982403a59d76f298231dcb",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
