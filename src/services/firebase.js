import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";   // ✅ ADD THIS

const firebaseConfig = {
  apiKey: "AIzaSyC854m-ARCmsj-gUKhywzmyuro2uTgJqDk",
  authDomain: "lifeline360-17d8a.firebaseapp.com",
  projectId: "lifeline360-17d8a",
  storageBucket: "lifeline360-17d8a.firebasestorage.app",
  messagingSenderId: "894639205623",
  appId: "1:894639205623:web:e32e508e6b23a70e1777f2",
  measurementId: "G-NNHEYF473M"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
export const db = getFirestore(app);

// ✅ ADD THIS LINE
export const auth = getAuth(app);
