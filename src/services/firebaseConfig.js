import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyB7QuapUVV7LznmI3y-YVbkXfl2hl5WwQM",
  authDomain: "kondition-jlk13.firebaseapp.com",
  projectId: "kondition-jlk13",
  storageBucket: "kondition-jlk13.firebasestorage.app",
  messagingSenderId: "604025695679",
  appId: "1:604025695679:web:e72087862e409d2005450a"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
