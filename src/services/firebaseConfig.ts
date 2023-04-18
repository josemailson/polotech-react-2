// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAP4g4iRP_67uzjhTnuS8Cp0WNrv-RHC5w",
  authDomain: "to-do-app-react-115f9.firebaseapp.com",
  projectId: "to-do-app-react-115f9",
  storageBucket: "to-do-app-react-115f9.appspot.com",
  messagingSenderId: "259823167950",
  appId: "1:259823167950:web:42a14a6ea0ea3fb3b7639f",
  measurementId: "G-SK65R0H2GQ"
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);