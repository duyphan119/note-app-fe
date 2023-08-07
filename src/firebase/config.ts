// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBCKEydCsk7n8CtqQSYrV2KZXtNc66w6Gc",
  authDomain: "note-app-1047b.firebaseapp.com",
  projectId: "note-app-1047b",
  storageBucket: "note-app-1047b.appspot.com",
  messagingSenderId: "231471689632",
  appId: "1:231471689632:web:4d293c687113c45a7a3ec5",
  measurementId: "G-DRTGGXQEK4",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
