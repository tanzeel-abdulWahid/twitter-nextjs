// Import the functions you need from the SDKs you need
import { initializeApp, getApp, getApps } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";


const firebaseConfig = {
    apiKey: "AIzaSyCsL_Ko_ENH29C5Oe7dtylgMn8ebeuFeGE",
    authDomain: "twitter-clone-t.firebaseapp.com",
    projectId: "twitter-clone-t",
    storageBucket: "twitter-clone-t.appspot.com",
    messagingSenderId: "640959605991",
    appId: "1:640959605991:web:8250a88a1a9e7390468642"
};

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore();
const storage = getStorage();


export default app;
export { db, storage };