// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCfvCeOfwYjXElMud9f2T_N74HxP75gQP0",
  authDomain: "todo-project-faf5c.firebaseapp.com",
  projectId: "todo-project-faf5c",
  storageBucket: "todo-project-faf5c.appspot.com",
  messagingSenderId: "205139680326",
  appId: "1:205139680326:web:06bbc8e079ef76f8bcfe47",
  measurementId: "G-DHYNW07944"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);
