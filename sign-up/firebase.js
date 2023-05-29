import { initializeApp } from 'firebase/app';
import { getAuth } from "firebase/auth";
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyDPl8yxCErAFeSDxc68ElBGKaSR2ziv-gI",
    authDomain: "fir-todolist-f409b.firebaseapp.com",
    projectId: "fir-todolist-f409b",
    storageBucket: "fir-todolist-f409b.appspot.com",
    messagingSenderId: "446139117476",
    appId: "1:446139117476:web:0ac2dc266eb91082abdb31"
  };
  

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);

const auth = getAuth(app);
export { auth };