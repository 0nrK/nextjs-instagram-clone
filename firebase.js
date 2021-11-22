// Import the functions you need from the SDKs you need
import { initializeApp,getApps, getApp } from "firebase/app";
import {getFirestore} from "firebase/firestore";
import {getStorage} from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCt8dAeLeCid-Cnzd21iWXniUQA3v8w_pk",
  authDomain: "insta-nextjs.firebaseapp.com",
  projectId: "insta-nextjs",
  storageBucket: "insta-nextjs.appspot.com",
  messagingSenderId: "860839015993",
  appId: "1:860839015993:web:0cd6fc63d2fa1809d87fe8"
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig): getApp();
const db = getFirestore();
const storage = getStorage();

export {app,db,storage};
