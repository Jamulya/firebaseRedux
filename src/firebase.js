import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDUulVWLsnDAbhCbD8CcGIPKWQcAS6LEos",
  authDomain: "todoreduxfirebase-ed9a2.firebaseapp.com",
  projectId: "todoreduxfirebase-ed9a2",
  storageBucket: "todoreduxfirebase-ed9a2.appspot.com",
  messagingSenderId: "746705821872",
  appId: "1:746705821872:web:549e465a44ac42e65d1b75"
};

const app = initializeApp(firebaseConfig);
 export const db = getFirestore(app);

