// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_apiKey,
  authDomain: 'tsks-task.firebaseapp.com',
  projectId: 'tsks-task',
  storageBucket: 'tsks-task.appspot.com',
  messagingSenderId: process.env.NEXT_PUBLIC_messagingSenderId,
  appId: process.env.NEXT_PUBLIC_appId,
  // databaseURL: "https://tsks-task-default-rtdb.asia-southeast1.firebasedatabase.app"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// initialize  database
export const db = getFirestore(app)

// intialize firebase authentication
export const auth = getAuth(app)
