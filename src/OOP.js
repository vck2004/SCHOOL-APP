import {auth} from './index.js';
import {signOut} from 'firebase/auth';
import {model} from './model.js';
import { controller } from './controller.js';

class user {
    constructor (uid,email,title){
        this.uid = uid;
        this.email = email;
        this.title = title;
    }
    signout(){
        signOut(auth).then(()=>{
            model.currentUser = undefined;
        })
    }
}

class student extends user {
    constructor (uid,email,title,data){
        super(uid,email,title);
        this.name = data.name;
        this.timetable = data.timetable;
        this.joinedClass = data.joinedClass;
    }
    myScores = [];
    setUserProfile(data){
        this.phoneNumber = data.phoneNumber? data.phoneNumber : "";
        this.dateOfBirth = data.dateOfBirth? data.dateOfBirth : "";
        this.address = data.address? data.address : "";
        this.gender = data.gender? data.gender : "...";
        this.studyField = data.studyField? data.studyField : "";
    }
    joinClass(classID) {model.updateClass(classID,"add")};
    leaveClass(classID) {model.updateClass(classID,"rem")};
    getTimeTable(data){
        this.timetable = data.timetable;
    }
}

class teacher extends user {
    constructor (uid,email,title,data){
        super(uid,email,title);
        this.profession = data.profession;
        this.name = data.name;
        this.classIncharge = data.classIncharge;
        this.timetable = data.timetable;
    }
    studentList = [];
    setUserProfile(data){
        this.phoneNumber = data.phoneNumber? data.phoneNumber : "";
        this.dateOfBirth = data.dateOfBirth? data.dateOfBirth : "";
        this.address = data.address? data.address : "";
        this.gender = data.gender? data.gender : "...";
    }
}

class admin extends user {
    teacherList = [];
    getTeacherList(){model.getTeacherList();};
    addTeacher(data){controller.registerTeacher(data)};
    addStudent(data){controller.registerStudent(data)};
}

class courses {
    constructor(data){
        this.futureCourses = [];
        data.forEach((doc) => {
            let obj = doc.data();
            obj.classID = doc.id;
            obj.studentList = obj.studentList.map((ele) => {
                return ele.studentID;
            })
            this.futureCourses.push(obj);
        })
    }
    getCourses(data) {
        this.futureCourses = [];
        data.forEach((doc) => {
            let obj = doc.data();
            obj.classID = doc.id;
            obj.studentList = obj.studentList.map((ele) => {
                return ele.studentID;
            })
            this.futureCourses.push(obj);
        })
    }
}

export {user,student,teacher,admin,courses}