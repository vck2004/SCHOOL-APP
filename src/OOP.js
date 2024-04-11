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
    }
    setUserProfile(data){
        this.phoneNumber = data.phoneNumber? data.phoneNumber : "";
        this.dateOfBirth = data.dateOfBirth? data.dateOfBirth : "";
        this.address = data.address? data.address : "";
        this.gender = data.gender? data.gender : "...";
        this.studyField = data.studyField? data.studyField : "";
    }
}

class teacher extends user {
    constructor (uid,email,title,data){
        super(uid,email,title);
        this.profession = data.profession;
        this.name = data.name;
    }
    getTimeTable(){}
}

class admin extends user {
    teacherList = [];
    getTeacherList(){model.getTeacherList();};
    addTeacher(data){controller.registerTeacher(data)};
    addStudent(data){controller.registerStudent(data)};
}

class course {
    constructor(name,id){
        this.CourseName = name;
        this.id = id;
    }
}

export {user,student,teacher,admin,course}