import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC4QiZORVgdIW_dnJ2kb3ZJUWcXzhhejqc",
  authDomain: "bathroom-tracker-33f94.firebaseapp.com",
  databaseURL: "https://bathroom-tracker-33f94-default-rtdb.firebaseio.com",
  projectId: "bathroom-tracker-33f94",
  storageBucket: "bathroom-tracker-33f94.firebasestorage.app",
  messagingSenderId: "785283739648",
  appId: "1:785283739648:web:f5f156591d35a046c6a8e5"
};


const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
