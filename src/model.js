import {auth,db,secondAuth} from './index.js';
import {createUserWithEmailAndPassword, signInWithEmailAndPassword,signOut} from 'firebase/auth';
import {doc, updateDoc, getDoc, setDoc,query,collection,where,getDocs, addDoc, arrayUnion, arrayRemove} from 'firebase/firestore';
import { view } from './view.js';
import { DateTime } from 'luxon';

const model = {}

model.currentUser = undefined;
model.courses = undefined;
model.currentTime = DateTime.now().plus({week: 3});

model.login = (data) => {
    signInWithEmailAndPassword(auth, data.email, data.password)
    .catch((error) => {
        view.alertError('.login_btn',error.message);
    });
}

// admin account creation
model.registerStudent = async (data) => {
    try {
        await createUserWithEmailAndPassword(secondAuth, data.email, data.password);
        const user = secondAuth.currentUser;
        await setDoc(doc(db,'users',user.uid),{
            UID: user.uid,
            name: data.name,
            email: user.email,
            title: "student",
            timetable: [],
            joinedClass: [],
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
            timetable: [],
            classIncharge: [],
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

// admin class creation
model.getTeacherList = async () => {
    const q = query(collection(db,"users"),where("title","==","teacher"));
    let docs = await getDocs(q);
    docs.forEach((doc) => {
        model.currentUser.teacherList.push(doc.data());
    })
    view.addOptions(model.currentUser.teacherList);
}
model.addClass = async (data) => {
    try {
        const teacherRef = await getDoc(doc(db,"users",data.teacherID));
        let teacherTime = teacherRef.data().timetable;
        let conflicted = teacherTime.filter((d) => {
            return (!(d.endWeek <= data.beginWeek || d.beginWeek >= data.endWeek) && d.weekday == data.dayOfWeek && !(d.endTime <= data.beginTime || d.beginTime >= data.endTime));
        })
        if(conflicted.length > 0){
            throw {message: "The teacher are busy at that time!"};
        } else {
            const courseRef = await addDoc(collection(db,"classes"),data);
            await updateDoc(doc(db,"users",data.teacherID),{
                classIncharge: arrayUnion({
                    classID: courseRef.id,
                    name: data.name,
                    beginWeek: data.beginWeek,
                }),
                timetable: arrayUnion({
                    classID: courseRef.id,
                    subject: data.subject,
                    room: data.room,
                    beginWeek: data.beginWeek,
                    endWeek: data.endWeek,
                    weekday: data.dayOfWeek,
                    beginTime: data.beginTime,
                    endTime: data.endTime,
                })
            });
        }
        view.clearInput();
        view.alertSuccess("#f","Class created successfully!");
    } catch (error) {
        view.alertError("#f",error.message);
    }
}

// student
model.updateProfile = async (data) => {
    try {
        await updateDoc(doc(db,'users',model.currentUser.uid),data);
        model.currentUser.setUserProfile(data);
        if(model.currentUser.title === "student") {
            view.setStudentInfo();
            view.alertSuccess('.modal-footer button:nth-child(2)','Update successfully');
        } else if(model.currentUser.title === "teacher") {
            view.setTeacherInfo();
            view.alertSuccess('#user_info_form button','Update successfully');
        }
    } catch (error) {
        view.alertError('.modal-footer button:nth-child(2)','Something went wrong, please try again');
    }
}
model.updateClass = async (classID,action) => {
    try {
        if(action == "add") {
            const data = (await getDoc(doc(db,"classes",classID))).data();
            let conflicted = model.currentUser.timetable.filter((d) => {
                return (!(d.endWeek <= data.beginWeek || d.beginWeek >= data.endWeek) && d.weekday == data.dayOfWeek && !(d.endTime <= data.beginTime || d.beginTime >= data.endTime));
            })
            let full = (data.studentList.length >= 40);
            if(conflicted.length > 0){
                throw {message: "You are busy at that time!"};
            } else if (full){
                throw {message: "The classes are full!"};
            } else {
                await updateDoc(doc(db,"classes",classID),{
                    studentList: arrayUnion({
                        studentID: model.currentUser.uid,
                        studentName: model.currentUser.name,
                        studentGrade: [0,0,0,0],
                    })
                })
                await updateDoc(doc(db,"users",model.currentUser.uid),{
                    joinedClass: arrayUnion({
                        classID: classID,
                        subject: data.subject,
                        name: data.name
                    }),
                    timetable: arrayUnion({
                        classID: classID,
                        subject: data.subject,
                        room: data.room,
                        beginWeek: data.beginWeek,
                        endWeek: data.endWeek,
                        weekday: data.dayOfWeek,
                        beginTime: data.beginTime,
                        endTime: data.endTime,
                    })
                })
            }
        } else if(action == "rem") {
            const data = (await getDoc(doc(db,"classes",classID))).data();
            await updateDoc(doc(db,"classes",classID),{
                studentList: arrayRemove({
                    studentID: model.currentUser.uid,
                    studentName: model.currentUser.name,
                    studentGrade: [0,0,0,0],
                })
            })
            await updateDoc(doc(db,"users",model.currentUser.uid),{
                joinedClass: arrayRemove({
                    classID: classID,
                    subject: data.subject,
                    name: data.name
                }),
                timetable: arrayRemove({
                    classID: classID,
                    subject: data.subject,
                    room: data.room,
                    beginWeek: data.beginWeek,
                    endWeek: data.endWeek,
                    weekday: data.dayOfWeek,
                    beginTime: data.beginTime,
                    endTime: data.endTime,
                })
            })
        }
        const q = query(collection(db,"classes"), where("beginWeek",">",model.currentTime.year+"-W"+model.currentTime.weekNumber));
        model.courses.getCourses(await getDocs(q));
        model.currentUser.getTimeTable((await getDoc(doc(db,"users",model.currentUser.uid))).data());
        view.setClassTableInfo();
        view.alertSuccess("#f","Success");
    } catch (error) {
        view.alertError("#f",error.message);
    }
}
model.getMyScore = async () => {
    let finalArr = [];
    for(let info of model.currentUser.joinedClass){
        const scoreList = (await getDoc(doc(db,"classes",info.classID))).get("studentList");
        for(let scores of scoreList) {
            if(scores.studentID === model.currentUser.uid) {
                finalArr.push([info.name,info.subject,scores.studentGrade]);
            }
        }
    }
    for(let info of finalArr){
        view.setStudentGrade(info[0],info[1],info[2]);
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

// teacher
model.getClass = async (data) => {
    model.currentUser.studentList = (await getDoc(doc(db,"classes",data.classID))).get("studentList");
    view.setClassGrade(data.classID);
}
model.uploadScore = async (data,classID) => {
    try {
        await updateDoc(doc(db,"classes",classID),{
            studentList: data
        })
        model.currentUser.studentList = data;
        view.setClassGrade(classID);
        view.alertSuccess("#save_score","success");
    } catch (error) {
        view.alertError("#save_score",error.message);
    }
}

export {model}