import {auth,db} from './index.js';
import {createUserWithEmailAndPassword, signInWithEmailAndPassword,updateProfile,signOut} from 'firebase/auth';
import {doc, updateDoc, getDoc} from 'firebase/firestore';
import { view } from './view.js';


const model = {}

model.currentUser = undefined;

model.login = (data) => {
    signInWithEmailAndPassword(auth, data.email, data.password)
    .then((userCredential) => {
        console.log(userCredential);
        const user = userCredential.user;
        console.log(user);
    })
    .catch((error) => {
        console.log(error.code);
        view.alertError('.login_btn',error.message);
    });
}

model.register = async (data) => {
    try {
        await createUserWithEmailAndPassword(auth, data.email, data.password)
        await updateProfile(auth.currentUser,{
            displayName: data.userType === '2' ? 'teacher' : 'student',
        })
    } catch (error) {
        console.log(error.code);
        view.alertError('.signup_btn',error.message);
    };
}

model.signout = () => {
    signOut(auth).then(()=>{
        model.currentUser = undefined;
    })
}

model.updateProfile = (data) => {
    const userDoc = doc(db,model.currentUser.userType+'s',model.currentUser.uid);
    updateDoc(userDoc,{
        lastName: data.last,
        firstName: data.first,
        phoneNumber: data.phone,
        DateOfBirth: data.DOB,
    }) .then(()=>{
        view.alertSuccess('#save_profile','Update successfully');
    }) .catch(()=>{
        view.alertError('#save_profile','Something went wrong, please try again');
    })
}

model.getStudentProfile = () => {
    getDoc(doc(db,model.currentUser.userType+'s',model.currentUser.uid)).then((docSnapshot)=>{
        const data = docSnapshot.data();
        view.setInputValue('first_name',data.firstName);
        view.setInputValue('last_name',data.lastName);
        view.setInputValue('phone_number',data.phoneNumber);
        view.setInputValue('DOB',data.DateOfBirth);
    })
}

export {model}