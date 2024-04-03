import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth";
import {getFirestore} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDUVBAHQRsdJ8ZlJ9_CPdOsytH2bnvkBhY",
  authDomain: "school-app-bc680.firebaseapp.com",
  projectId: "school-app-bc680",
  storageBucket: "school-app-bc680.appspot.com",
  messagingSenderId: "1036783442547",
  appId: "1:1036783442547:web:e6b3fb4060a61ac6686806",
  measurementId: "G-TGQM986E4Q"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export {app,auth,db}