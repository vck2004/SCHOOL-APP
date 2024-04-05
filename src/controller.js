import {model} from './model.js';
import {view} from './view.js';
import {auth,db} from './index.js';
import {onAuthStateChanged} from "firebase/auth";
import {doc,getDoc} from "firebase/firestore";
import {student,teacher,admin,course} from './OOP.js';

onAuthStateChanged(auth, async (user) => {
    if(user) {
        const userDoc = (await getDoc(doc(db,"users",user.uid))).data();
        if(userDoc.title == "student"){
            model.currentUser = new student(user.uid,user.email,userDoc.title,userDoc);
            view.setActiveScreen("studentPage");
        } else if(userDoc.title == "teacher") {
            model.currentUser = new teacher(user.uid,user.email,userDoc.title,userDoc);
            view.setActiveScreen("teacherPage");
        } else if(userDoc.title == "admin") {
            model.currentUser = new admin(user.uid,user.email,userDoc.title);
            view.setActiveScreen("adminPage");
        }
    } else {
        view.setActiveScreen('loginPage');
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
    view.setErrorMessage('student_email_error', data.email === '' ? 'Please input email' : '');
    view.setErrorMessage('student_name_error', data.name === '' ? 'Please input name' : '');
    view.setErrorMessage('student_password_error', data.password === '' ? 'Please input password' : '');
    view.setErrorMessage('student_confirm_password_error', data.confirmPassword === '' ? 'Please input confirm password' : data.confirmPassword === data.password ? '' : `Password didn't match`);
    if (data.email !== '' && data.name !== '' && data.password !== '' && data.confirmPassword === data.password) {
        model.registerStudent(data);
    }
}

controller.registerTeacher= (data) => {
    view.setErrorMessage('teacher_email_error', data.email === '' ? 'Please input email' : '');
    view.setErrorMessage('teacher_name_error', data.name === '' ? 'Please input name' : '');
    view.setErrorMessage('teacher_profession_error', data.profession === '' ? 'Please input profession' : '');
    view.setErrorMessage('teacher_password_error', data.password === '' ? 'Please input password' : '');
    view.setErrorMessage('teacher_confirm_password_error', data.confirmPassword === '' ? 'Please input confirm password' : data.confirmPassword === data.password ? '' : `Password didn't match`);
    if (data.email !== '' && data.name !== '' && data.profession !== '' && data.password !== '' && data.confirmPassword === data.password) {
        model.registerTeacher(data);
    }
}

export {controller}