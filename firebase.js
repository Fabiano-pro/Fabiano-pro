<script type="module">
  import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
  import { getAuth } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
  import { getFirestore } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";
  import { getStorage } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-storage.js";

  const firebaseConfig = {
    apiKey: "TON_API_KEY",
    authDomain: "ton_projet.firebaseapp.com",
    projectId: "ton_projet",
    storageBucket: "ton_projet.appspot.com",
    messagingSenderId: "xxxxxxx",
    appId: "xxxxxxxx"
  };

  export const app = initializeApp(firebaseConfig);
  export const auth = getAuth(app);
  export const db = getFirestore(app);
  export const storage = getStorage(app);
</script>
