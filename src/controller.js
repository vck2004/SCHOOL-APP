import {model} from './model.js';
import {view} from './view.js';
import {auth,db} from './index.js';
import {onAuthStateChanged,signOut} from "firebase/auth";
import {doc,getDoc} from "firebase/firestore";
import {user,student,teacher,admin,course} from './OOP.js';

onAuthStateChanged(auth, async (user) => {
    if(!model.fromRegister && user) {
        const userDoc = (await getDoc(doc(db,"users",user.uid))).data();
        if(userDoc.title == "student" && userDoc.adminVerification){
            model.currentUser = new student(user.uid,user.email,userDoc.title);
            view.setActiveScreen("studentPage");
        } else if(userDoc.title == "teacher") {
            model.currentUser = new teacher(user.uid,user.email,userDoc.title);
            view.setActiveScreen("teacherPage");
        } else if(userDoc.title == "admin") {
            model.currentUser = new admin(user.uid,user.email,userDoc.title);
            view.setActiveScreen("adminPage");
        } else {
            signOut(auth).then(() => {
            view.alertError('#f',"Please wait for admin approval!");
            })
        }
    } else if(!model.fromRegister) {
        view.setActiveScreen('loginRegisterPage');
    }
})

const controller = {}

controller.login = (data) => {
    view.setErrorMessage('login_email_error', data.email === '' ? 'Please input email' : '');
    view.setErrorMessage('login_password_error', data.password === '' ? 'Please input password' : '');
    if (data.email !== '' && data.password !== '') {
        model.login(data);
    }
}

controller.registerStudent = (data) => {
    view.setErrorMessage('signup_email_error', data.email === '' ? 'Please input email' : '');
    view.setErrorMessage('signup_password_error', data.password === '' ? 'Please input password' : '');
    view.setErrorMessage('confirm_password_error', data.confirmPassword === '' ? 'Please input confirm password' : data.confirmPassword === data.password ? '' : `Password didn't match`);
    if (data.email !== '' && data.password !== '' && data.confirmPassword === data.password) {
        model.registerStudent(data);
    }
}

controller.registerTeacher= (data) => {
    view.setErrorMessage('signup_email_error', data.email === '' ? 'Please input email' : '');
    view.setErrorMessage('signup_password_error', data.password === '' ? 'Please input password' : '');
    view.setErrorMessage('confirm_password_error', data.confirmPassword === '' ? 'Please input confirm password' : data.confirmPassword === data.password ? '' : `Password didn't match`);
    if (data.email !== '' && data.password !== '' && data.confirmPassword === data.password) {
        model.registerTeacher(data);
    }
}

export {controller}