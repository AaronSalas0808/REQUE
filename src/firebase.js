import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAjrH_ngd6liz-SdzAeZyB2g5ashHOldMI",
  authDomain: "requeproj.firebaseapp.com",
  projectId: "requeproj",
  storageBucket: "requeproj.firebasestorage.app",
  messagingSenderId: "1052277166968",
  appId: "1:1052277166968:web:c12661c490d4ef3a186e8d"
};  

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export default app;