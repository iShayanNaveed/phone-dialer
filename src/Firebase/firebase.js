// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCNtomTgXq76EEeektziRK4VhF-OGoDjmw",
  authDomain: "phone-dialer-ef016.firebaseapp.com",
  projectId: "phone-dialer-ef016",
  storageBucket: "phone-dialer-ef016.firebasestorage.app",
  messagingSenderId: "89114075797",
  appId: "1:89114075797:web:17d680849be4cdbd0a719c",
  measurementId: "G-EC5ND23VP4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);