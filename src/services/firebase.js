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
  apiKey: "AIzaSyAuPHkqum2rJ_BRMiCmSaBpHWxt1G7Z9bY",
  authDomain: "condominio-svp.firebaseapp.com",
  databaseURL: "https://condominio-svp-default-rtdb.firebaseio.com",
  projectId: "condominio-svp",
  storageBucket: "condominio-svp.appspot.com",
  messagingSenderId: "688557616312",
  appId: "1:688557616312:web:5319940897f302b9f3d84d",
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
