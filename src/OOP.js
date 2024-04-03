import {auth} from './index.js';
import {signOut} from 'firebase/auth';
import {model} from './model.js';

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
    gender;
    lastName;
    firstName;
}

class student extends user {
    joinedClass;
    requestJoinSubject;
}

class teacher extends user {
    getTimeTable(){}
}

class admin extends user {
    addTeacher(){};
}

class course {
    constructor(name,id){
        this.CourseName = name;
        this.id = id;
    }
}

export {user,student,teacher,admin,course}