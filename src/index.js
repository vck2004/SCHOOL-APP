import {view} from './view.js'
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyCfSuJjOvYdjmGVQswWLL-9Fxn2UyDdf2Y",
  authDomain: "school-app-990e3.firebaseapp.com",
  projectId: "school-app-990e3",
  storageBucket: "school-app-990e3.appspot.com",
  messagingSenderId: "953965894107",
  appId: "1:953965894107:web:34d6457eb8c95a3e02affe",
  measurementId: "G-N00CVDVS29"
};

window.onload = () => {
  view.setActiveScreen('loginPage');
}

export const app = initializeApp(firebaseConfig);