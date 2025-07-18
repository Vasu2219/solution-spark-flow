// src/firebaseConfig.js

import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

export const firebaseConfig = {
  apiKey: "AIzaSyD7338n_RpiZ11BOTUcqLCPu48uQjd3JFg",
  authDomain: "student-app-23a38.firebaseapp.com",
  databaseURL: "https://student-app-23a38-default-rtdb.firebaseio.com",
  projectId: "student-app-23a38",
  storageBucket: "student-app-23a38.firebasestorage.app",
  messagingSenderId: "94227407410",
  appId: "1:94227407410:web:03f45ee0be026d0179922b",
  measurementId: "G-WZ09XH1C42"
};

const app = initializeApp(firebaseConfig);
export { app };