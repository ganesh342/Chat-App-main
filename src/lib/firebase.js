import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyA3rV_NesQbfisLTNjFFxaxmPvHkf_gB6o",
  authDomain: "reactchat-bb6fc.firebaseapp.com",
  projectId: "reactchat-bb6fc",
  storageBucket: "reactchat-bb6fc.appspot.com",
  messagingSenderId: "913579262532",
  appId: "1:913579262532:web:0406f59391e7748f1fb211"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth()
export const db = getFirestore()
export const storage = getStorage()