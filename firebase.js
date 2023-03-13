// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAaoeauU2JT-AcmXofuq97ZbPHD6Wv1aNQ",
  authDomain: "wellnessproject-59872.firebaseapp.com",
  projectId: "wellnessproject-59872",
  storageBucket: "wellnessproject-59872.appspot.com",
  messagingSenderId: "503961355705",
  appId: "1:503961355705:web:cc12991a00c00cb0aba268",
  measurementId: "G-HM4SQP02ZE"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
const analytics = getAnalytics(app);
