// firebase.js - configuration (Firebase SDK modules)
// KEEP THESE CREDENTIALS: they are your project's
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";
import { getStorage } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-storage.js";

const firebaseConfig = {
  apiKey: "AIzaSyARFiiAf0A-ujg5-Xhu5XBCaTB0NgZ_5Vg",
  authDomain: "beninmarket-85f2c.firebaseapp.com",
  projectId: "beninmarket-85f2c",
  storageBucket: "beninmarket-85f2c.appspot.com",
  messagingSenderId: "784497745221",
  appId: "1:784497745221:web:e463187715a2f240aef22c",
  measurementId: "G-1T47TNHQM3"
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
