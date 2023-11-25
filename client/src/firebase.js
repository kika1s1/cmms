// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "clubmms-78be2.firebaseapp.com",
  projectId: "clubmms-78be2",
  storageBucket: "clubmms-78be2.appspot.com",
  messagingSenderId: "46418577521",
  appId: "1:46418577521:web:8dab9d9db146c08099b3d0",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
