
import { auth } from "./firebase.js";

console.log("✅ Script.js chargé et Firebase prêt.");

if (!auth.currentUser) {
  console.log("Aucun utilisateur connecté pour l'instant.");
}
