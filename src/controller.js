import {model} from './model.js';
import {view} from './view.js';
import {auth,db} from './index.js';
import {onAuthStateChanged} from "firebase/auth";
import {doc,getDoc,getDocs,collection,query,where} from "firebase/firestore";
import {student,teacher,admin,courses} from './OOP.js';

onAuthStateChanged(auth, async (user) => {
    if(user) {
        const userDoc = (await getDoc(doc(db,"users",user.uid))).data();
        if(userDoc.title == "student"){
            model.currentUser = new student(user.uid,user.email,userDoc.title,userDoc);
            const q = query(collection(db,"classes"), where("beginWeek",">",model.currentTime.year+"-W"+model.currentTime.weekNumber));
            model.courses = new courses(await getDocs(q));
            model.currentUser.setUserProfile(userDoc);
            view.setActiveScreen("studentPage");
        } else if(userDoc.title == "teacher") {
            model.currentUser = new teacher(user.uid,user.email,userDoc.title,userDoc);
            model.currentUser.setUserProfile(userDoc);
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

controller.addClass = (data) => {
    view.setErrorMessage('course_name_error', data.name === '' ? 'Please input course name' : '');
    view.setErrorMessage('class_room_error', data.room === '' ? 'Please input class room' : '');
    view.setErrorMessage('teacher_select_error', data.teacherName === '...' ? 'Please select a teacher' : '',"#teacher_input");
    view.setErrorMessage('course_duration_error', data.beginWeek === '' ? 'Please pick the duration of the course' : '',"#begin_date");
    view.setErrorMessage('course_duration_error', data.endWeek === '' ? 'Please pick the duration of the course' : data.beginWeek >= data.endWeek ? 'The course duration is wrong!' : '',"#end_date");
    view.setErrorMessage('course_time_error', data.dayOfWeek === '...' ? 'Please pick the day of the class' : '',"#study_day");
    view.setErrorMessage('course_time_error', data.beginTime === '' ? 'Please pick the time of the class' : '',"#begin_time");
    view.setErrorMessage('course_time_error', data.endTime === '' ? 'Please pick the time of the class' : data.beginTime >= data.endTime ? 'The class time is wrong!' : '',"#end_time");
    if (data.name !== '' && data.room !== '' && data.teacherName !== '' && data.beginWeek !== '' && data.endWeek !== '' && data.beginTime !== '' && data.endTime !== '' && data.dayOfWeek !== '' && data.beginTime < data.endTime && data.beginWeek < data.endWeek) {
        model.addClass(data);
    }
}

controller.loadClass = (data) => {
    if(data.name !== 'Choose a class') {
        model.getClass(data);
    }
}
controller.saveScore = (data,classID) => {
    for(let obj of data){
        for(let i=0;i<4;i++){
            if(obj.studentGrade[i] > 10 || obj.studentGrade[i] < 0){
                view.alertError("#save_score","There are invalid score");
                return;
            }
        }
    }
    model.uploadScore(data,classID);
}

export {controller}