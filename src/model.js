import {auth,db,secondAuth} from './index.js';
import {createUserWithEmailAndPassword, signInWithEmailAndPassword,signOut} from 'firebase/auth';
import {doc, updateDoc, getDoc, setDoc} from 'firebase/firestore';
import { view } from './view.js';


const model = {}

model.currentUser = undefined;
model.courses = undefined;

model.login = (data) => {
    signInWithEmailAndPassword(auth, data.email, data.password)
    .then((userCredential) => {
        console.log(userCredential);
        const user = userCredential.user;
        console.log(user);
    })
    .catch((error) => {
        view.alertError('.login_btn',error.message);
    });
}

model.registerStudent = async (data) => {
    try {
        await createUserWithEmailAndPassword(secondAuth, data.email, data.password);
        const user = secondAuth.currentUser;
        await setDoc(doc(db,'users',user.uid),{
            UID: user.uid,
            name: data.name,
            email: user.email,
            title: "student",
        },{merge: true})
        await signOut(secondAuth);
        view.clearInput();
        view.alertSuccess('.signup_btn',"Student added!");
    } catch (error) {
        view.alertError('.signup_btn',error.message);
    };
}

model.registerTeacher = async (data) => {
    try {
        await createUserWithEmailAndPassword(secondAuth, data.email, data.password);
        const user = secondAuth.currentUser;
        await setDoc(doc(db,'users',user.uid),{
            UID: user.uid,
            name: data.name,
            email: user.email,
            profession: data.profession,
            title: "teacher",
        },{merge: true})
        await signOut(secondAuth);
        view.clearInput();
        view.alertSuccess('.signup_btn',"Teacher added!");
    } catch (error) {
        view.alertError('.signup_btn',error.message);
    };
}

// model.getTime = async () => {
//     const data = (await getDoc(doc(db,'classes','Session Info'))).data();
//     view.setInputValue('school_year',data.Year);
//     view.setInputValue('current_semester',data.Semester);
// }

// model.updateTime = async (data) => {
//     try {
//         await updateDoc(doc(db,'classes','Session Info'),{
//             Year: data.year,
//             Semester: data.semester,
//         })
//         view.alertSuccess('#current_time button','Update successfully');
//     } catch (error) {
//         view.alertError('#current_time button','Something went wrong, please try again');
//     }
// }
model.updateStudentProfile = async (data) => {
    try {
        await updateDoc(doc(db,'students',model.currentUser.uid),{
            lastName: data.last,
            firstName: data.first,
            phoneNumber: data.phone,
            DateOfBirth: data.DOB,
        })
        view.alertSuccess('#user_info_form button','Update successfully');
    } catch (error) {
        view.alertError('#user_info_form button','Something went wrong, please try again');
    }
}

// model.getSubjectList = async () => {
//     const data = (await getDoc(doc(db,'classes','Session Info'))).data();
//     let table = document.querySelector('.subject_list tbody');
//     if(data.Subjects.length == 0) table.innerHTML = `<tr><td colspan="3">No subject created yet</td></tr>`;
//     for(let sub of data.Subjects){
//         let row = document.createElement("tr");
//         row.innerHTML = `
//         <td>${sub.name}</td>
//         <td>${sub.code}</td>
//         <td><i class="fa-solid fa-trash"></i></td>`;
//         table.appendChild(row);
//     }
// }
// model.addSubject = async (data) => {
//     try {
//         await updateDoc(doc(db,'classes','Session Info'),{
//             Subjects: arrayUnion({name: data.name,code: data.code}),
//         })
//         view.alertSuccess('#current_time button','Add subject successfully');
//     } catch (error) {
//         view.alertError('#current_time button','Something went wrong, please try again');
//     }
// }

model.getStudentProfile = () => {
    getDoc(doc(db,'students',model.currentUser.uid)).then((docSnapshot)=>{
        const data = docSnapshot.data();
        view.setInputValue('first_name',data.firstName != undefined ? data.firstName : "");
        view.setInputValue('last_name',data.lastName != undefined ? data.lastName : "");
        view.setInputValue('phone_number',data.phoneNumber != undefined ? data.phoneNumber : "");
        view.setInputValue('DOB',data.DateOfBirth != undefined ? data.DateOfBirth : "");
    })
}

model.getTeacherProfile = () => {
    getDoc(doc(db,'teachers',model.currentUser.uid)).then((docSnapshot)=>{
        const data = docSnapshot.data();
        view.setInputValue('first_name',data.firstName != undefined ? data.firstName : "");
        view.setInputValue('last_name',data.lastName != undefined ? data.lastName : "");
        view.setInputValue('phone_number',data.phoneNumber != undefined ? data.phoneNumber : "");
        view.setInputValue('DOB',data.DateOfBirth != undefined ? data.DateOfBirth : "");
    })
}

model.updateTeacherProfile = (data) => {
    const userDoc = doc(db,'teachers',model.currentUser.uid);
    updateDoc(userDoc,{
        lastName: data.last,
        firstName: data.first,
        phoneNumber: data.phone,
        DateOfBirth: data.DOB,
    }) .then(()=>{
        view.alertSuccess('#user_info_form button','Update successfully');
    }) .catch(()=>{
        view.alertError('#user_info_form button','Something went wrong, please try again');
    })
}

export {model}