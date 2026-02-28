import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import {
  getFirestore,
  doc,
  getDoc,
  updateDoc,
  setDoc,
  increment
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyDpxmpTn_fIJRL2Nll7VHGET6z1NOm0zbo",
  authDomain: "view-count-c5b7b.firebaseapp.com",
  projectId: "view-count-c5b7b",
  storageBucket: "view-count-c5b7b.firebasestorage.app",
  messagingSenderId: "378445659028",
  appId: "1:378445659028:web:5532c5ba36891829a7ed81"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

window.firebaseDB = db;
window.firebaseTools = {
  doc,
  getDoc,
  updateDoc,
  setDoc,
  increment
};