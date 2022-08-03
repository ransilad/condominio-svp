import { initializeApp } from "firebase/app";
import {
  GoogleAuthProvider,
  getAuth,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import {
  getDatabase,
} from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyDfbLGR0FS1DjnwMUJCr-ajZouoIui56wM",
  authDomain: "condominio-svp-testing.firebaseapp.com",
  databaseURL: "https://condominio-svp-testing-default-rtdb.firebaseio.com",
  projectId: "condominio-svp-testing",
  storageBucket: "condominio-svp-testing.appspot.com",
  messagingSenderId: "169642749712",
  appId: "1:169642749712:web:084f520c3c368364b9ff95",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getDatabase(app);

const googleProvider = new GoogleAuthProvider();

const signInWithGoogle = async () => {
  try {
    await signInWithPopup(auth, googleProvider);
  } catch (err) {
    console.error(err);
  }
};

const logout = async () => {
  await signOut(auth);
};

export {
  auth,
  signInWithGoogle,
  logout,
  db,
};
