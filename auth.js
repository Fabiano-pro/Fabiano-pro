import { auth } from './firebase.js';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

// Inscription
export function inscrire(email, motDePasse) {
  createUserWithEmailAndPassword(auth, email, motDePasse)
    .then((userCredential) => {
      alert("✅ Compte créé : " + userCredential.user.email);
      window.location.href = "index.html";
    })
    .catch((error) => alert("❌ " + error.message));
}

// Connexion
export function connecter(email, motDePasse) {
  signInWithEmailAndPassword(auth, email, motDePasse)
    .then((userCredential) => {
      alert("🔑 Connecté : " + userCredential.user.email);
      window.location.href = "index.html";
    })
    .catch((error) => alert("❌ " + error.message));
}

// Déconnexion
export function deconnecter() {
  signOut(auth).then(() => {
    alert("👋 Déconnecté !");
    window.location.href = "index.html";
  }).catch((error) => alert("❌ " + error.message));
}

// Vérifier l'état de connexion
onAuthStateChanged(auth, (user) => {
  const loginLink = document.getElementById("loginLink");
  const logoutBtn = document.getElementById("logoutBtn");
  if (user) {
    loginLink.style.display = "none";
    logoutBtn.style.display = "inline-block";
    logoutBtn.onclick = () => deconnecter();
  } else {
    loginLink.style.display = "inline-block";
    logoutBtn.style.display = "none";
  }
});
