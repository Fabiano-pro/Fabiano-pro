// annonce.js - ajoute et récupère annonces dans Firestore + upload image dans Storage
import { auth, db, storage } from './firebase.js';
import { collection, addDoc, getDocs, query, orderBy, serverTimestamp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";
import { ref as sref, uploadBytes, getDownloadURL } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-storage.js";

async function uploadImage(file) {
  if (!file) return null;
  const path = `images/${Date.now()}_${file.name}`;
  const storageRef = sref(storage, path);
  await uploadBytes(storageRef, file);
  const url = await getDownloadURL(storageRef);
  return url;
}

async function loadListings() {
  const listEl = document.getElementById('list');
  if (!listEl) return;
  listEl.innerHTML = '<p>Chargement...</p>';
  const q = query(collection(db, 'annonces'), orderBy('createdAt', 'desc'));
  const snap = await getDocs(q);
  if (snap.empty) {
    listEl.innerHTML = '<p>Aucune annonce pour l\'instant.</p>';
    return;
  }
  listEl.innerHTML = '';
  snap.forEach(doc => {
    const data = doc.data();
    const div = document.createElement('div');
    div.className = 'item';
    div.innerHTML = `<h3>${escapeHtml(data.title)}</h3>
                     <p>${escapeHtml(data.description)}</p>`;
    if (data.imageUrl) {
      const img = document.createElement('img');
      img.src = data.imageUrl;
      div.appendChild(img);
    }
    listEl.appendChild(div);
  });
}

function escapeHtml(text) {
  if (!text) return '';
  return text.replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;');
}

document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('postForm');
  if (!form) return;
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const title = document.getElementById('title').value.trim();
    const description = document.getElementById('description').value.trim();
    const file = document.getElementById('image').files[0];
    if (!title || !description) {
      alert('Titre et description requis.');
      return;
    }
    let imageUrl = null;
    if (file) {
      imageUrl = await uploadImage(file);
    }
    try {
      await addDoc(collection(db, 'annonces'), {
        title,
        description,
        imageUrl: imageUrl || null,
        createdAt: serverTimestamp(),
        author: auth.currentUser ? auth.currentUser.uid : null
      });
      alert('Annonce publiée ✅');
      form.reset();
      loadListings();
    } catch (err) {
      alert('Erreur : ' + err.message);
    }
  });

  loadListings();
});
