// auth.js - inscription / connexion / suivi session
import { auth } from './firebase.js';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

export function inscrire(email, motDePasse) {
  createUserWithEmailAndPassword(auth, email, motDePasse)
    .then((userCredential) => {
      alert('Compte créé ✅ ' + userCredential.user.email);
      window.location.href = 'index.html';
    })
    .catch((err) => alert('Erreur : ' + err.message));
}

export function connecter(email, motDePasse) {
  signInWithEmailAndPassword(auth, email, motDePasse)
    .then((userCredential) => {
      alert('Connecté ✅ ' + userCredential.user.email);
      window.location.href = 'index.html';
    })
    .catch((err) => alert('Erreur : ' + err.message));
}

export function deconnecter() {
  signOut(auth).then(() => {
    alert('Déconnecté 👋');
    window.location.href = 'index.html';
  }).catch((err) => alert('Erreur : ' + err.message));
}

// montre/masque les boutons selon l'état
onAuthStateChanged(auth, (user) => {
  const loginLink = document.getElementById('loginLink');
  const logoutBtn = document.getElementById('logoutBtn');
  if (!loginLink || !logoutBtn) return;
  if (user) {
    loginLink.style.display = 'none';
    logoutBtn.style.display = 'inline-block';
    logoutBtn.onclick = () => deconnecter();
  } else {
    loginLink.style.display = 'inline-block';
    logoutBtn.style.display = 'none';
  }
});
