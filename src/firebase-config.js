// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCWyeoPreEGJPsC_Mb__--d4XpcV4uWlH8",
  authDomain: "myblog-295af.firebaseapp.com",
  projectId: "myblog-295af",
  storageBucket: "myblog-295af.appspot.com",
  messagingSenderId: "1053605635361",
  appId: "1:1053605635361:web:46bc83665df1293489ca60"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider(app);