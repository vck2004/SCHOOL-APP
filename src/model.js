import {auth} from './index.js';
import {createUserWithEmailAndPassword, signInWithEmailAndPassword,updateProfile} from 'firebase/auth';


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
        alert(error.message);
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
        alert(error.message);
    };
}

export {model}