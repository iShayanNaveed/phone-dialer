import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCNtomTgXq76EEeektziRK4VhF-OGoDjmw",
  authDomain: "phone-dialer-ef016.firebaseapp.com",
  projectId: "phone-dialer-ef016",
  storageBucket: "phone-dialer-ef016.firebasestorage.app",
  messagingSenderId: "89114075797",
  appId: "1:89114075797:web:17d680849be4cdbd0a719c",
  measurementId: "G-EC5ND23VP4",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
export { db };
