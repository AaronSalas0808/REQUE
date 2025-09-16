import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getDatabase } from "firebase/database";
import { getStorage } from "firebase/storage"; // <-- Agregado

const firebaseConfig = {
  apiKey: "AIzaSyAjrH_ngd6liz-SdzAeZyB2g5ashHOldMI",
  authDomain: "requeproj.firebaseapp.com",
  projectId: "requeproj",
  storageBucket: "requeproj.firebasestorage.app",
  messagingSenderId: "1052277166968",
  appId: "1:1052277166968:web:c12661c490d4ef3a186e8d",
  databaseURL: "https://requeproj-default-rtdb.firebaseio.com"
};  

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const database = getDatabase(app);
export const firestore = getFirestore(app);
export const storage = getStorage(app); // <-- Agregado
export default app;