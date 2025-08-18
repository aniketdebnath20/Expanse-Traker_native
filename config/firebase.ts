// Import the functions you need from the SDKs you need
import AsyncStorage from '@react-native-async-storage/async-storage';
import { initializeApp } from "firebase/app";
import { getReactNativePersistence, initializeAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCQ0jD6zZgZD32FFfNMbTT4YS4T-qyGpiI",
  authDomain: "expense-traker-addfb.firebaseapp.com",
  projectId: "expense-traker-addfb",
  storageBucket: "expense-traker-addfb.firebasestorage.app",
  messagingSenderId: "503100907424",
  appId: "1:503100907424:web:102fb1021ec51686578ec5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage)
})

export const firestore = getFirestore(app)