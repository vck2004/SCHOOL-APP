import {view} from './view.js';
import { initializeApp } from "firebase/app";
import {getAuth, onAuthStateChanged,signOut,sendEmailVerification} from "firebase/auth";
import {getFirestore, doc, setDoc} from "firebase/firestore";
import { model } from './model.js';

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

onAuthStateChanged(auth, (user) => {
  if(user) {
    if(user.emailVerified){
      model.currentUser = user;
      const uid = user.uid;
      setDoc(doc(db,user.displayName === 'teacher' ? 'teachers': 'students',uid),{
          UID: uid,
          email: auth.currentUser.email,
      },{merge: true})
      view.setActiveScreen(user.displayName === 'teacher' ? 'teacherPage': 'studentPage');
    } else {
      sendEmailVerification(auth.currentUser);
      signOut(auth).then(() => {
        alert('Please verified your email');
      }).catch((error) => {
        console.log(error.code);
        alert(error.message);
      });
    }
  } else {
    view.setActiveScreen('loginRegisterPage');
  }
})

export {app,auth,db}