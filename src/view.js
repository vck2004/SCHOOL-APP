import {controller} from './controller.js';
import {component} from './component.js';
import { model } from './model.js';
import { DateTime } from 'luxon';

const view = {}

view.weekName = ["Mon","Tue","Wed","Thu","Fri","Sat","Sun"]

view.setActiveScreen = (screenName) => {
    let mainContent;
    switch (screenName) {
        case 'loginPage':
            document.getElementById('app').innerHTML = component.loginPage;
            const loginForm = document.getElementById('login_form');
            loginForm.addEventListener('submit', (e) => {
                e.preventDefault();
                const data = {
                    email: loginForm.email.value,
                    password: loginForm.password.value
                }
                controller.login(data);
            })
            break;
        case 'adminPage':
            document.getElementById('app').innerHTML = component.adminPage;
            document.getElementById('system_time').innerHTML = `Week: ${model.currentTime.weekNumber}-${model.currentTime.weekYear}`;
            mainContent = document.getElementById('main_content');
            document.getElementById('side_bar_button').addEventListener('click',() => {
                document.getElementById('side_bar').classList.toggle('expand');
            });
            document.getElementById('log_out_btn').addEventListener('click',() => {
                model.currentUser.signout();
            });
            document.getElementById('account_create').addEventListener('click',async () => {
                mainContent.innerHTML = component.accountCreation;
                const teacherForm = document.getElementById('teacher_signup_form');
                teacherForm.addEventListener('submit', (e) => {
                    e.preventDefault();
                    const data = {
                        email: teacherForm.email.value,
                        name: teacherForm.name.value,
                        profession: teacherForm.profession.value,
                        password: teacherForm.password.value,
                        confirmPassword: teacherForm.confirmPassword.value
                    }
                    model.currentUser.addTeacher(data);
                })
                const studentForm = document.getElementById('student_signup_form');
                studentForm.addEventListener('submit', (e) => {
                    e.preventDefault();
                    const data = {
                        email: studentForm.email.value,
                        name: studentForm.name.value,
                        password: studentForm.password.value,
                        confirmPassword: studentForm.confirmPassword.value
                    }
                    model.currentUser.addStudent(data);
                })
            });
            // document.getElementById('school_info').addEventListener('click',() => {
            //     mainContent.innerHTML = component.schoolInfo;
            //     const schoolForm = document.getElementById('current_time');
            //     const subjectForm = document.getElementById('subject_info');
            //     model.getTime();
            //     schoolForm.addEventListener('submit',(e)=>{
            //         e.preventDefault();
            //         const data = {
            //             year: schoolForm.school_year.value,
            //             semester: schoolForm.current_semester.value,
            //         }
            //         model.updateTime(data);
            //     })
            //     model.getSubjectList();
            //     subjectForm.addEventListener('submit',(e)=>{
            //         e.preventDefault();
            //         const data = {
            //             name: subjectForm.subject_name.value,
            //             code: subjectForm.subject_code.value,
            //         }
            //         model.addSubject(data);
            //     })
            // })
            document.getElementById('class_create').addEventListener('click',() => {
                mainContent.innerHTML = component.classCreate;
                model.currentUser.getTeacherList();
                //Teacher Select
                const wrapper = document.querySelector('.teacher_select_wrapper');
                const selectBtn = wrapper.querySelector('.select_btn');
                const inp = wrapper.querySelector("#search");
                selectBtn.addEventListener("click",() => {
                    wrapper.classList.toggle("active");
                })
                inp.addEventListener("keyup",() => {
                    let found = [];
                    let searched = inp.value.toLowerCase();
                    found = model.currentUser.teacherList.filter((data) => {
                        let realData = data.profession + " - " + data.name;
                        return realData.toLowerCase().startsWith(searched);
                    })
                    view.addOptions(found);
                })
                // get data
                const createForm = document.getElementById("course_info_form");
                createForm.addEventListener("submit",(e) => {
                    e.preventDefault();
                    const data = {
                        name: createForm.course_name.value,
                        room: createForm.class_room.value,
                        teacherName: createForm.teacher_input.value,
                        subject: createForm.course_subject.value,
                        beginWeek: createForm.begin_date.value,
                        endWeek: createForm.end_date.value,
                        beginTime: createForm.begin_time.value,
                        endTime: createForm.end_time.value,
                        dayOfWeek: createForm.study_day.value,
                        teacherID: selectBtn.id,
                        studentList: [],
                        studentCap: 40,
                    }
                    controller.addClass(data);
                })
            })
            break;
        case 'teacherPage':
            document.getElementById('app').innerHTML = component.teacherPage;
            document.getElementById('system_time').innerHTML = `Week: ${model.currentTime.weekNumber}-${model.currentTime.weekYear}`;
            mainContent = document.getElementById('main_content');
            document.getElementById('side_bar_button').addEventListener('click',() => {
                document.getElementById('side_bar').classList.toggle('expand');
            })
            document.getElementById('log_out_btn').addEventListener('click',() => {
                model.currentUser.signout();
            });
            document.getElementById('profile_button').addEventListener('click', () => {
                mainContent.innerHTML = component.teacherProfile;
                view.setTeacherInfo();
                const userProfileForm = document.getElementById('user_info_form');
                userProfileForm.email.value = model.currentUser.email;
                userProfileForm.name.value = model.currentUser.name;
                userProfileForm.profession.value = model.currentUser.profession;
                userProfileForm.addEventListener('submit',(e) => {
                    e.preventDefault();
                    const data = {
                        phoneNumber: userProfileForm.phone_number.value,
                        dateOfBirth: userProfileForm.DOB.value,
                        address: userProfileForm.address.value,
                        gender: userProfileForm.gender.value,
                    }
                    model.updateProfile(data);
                })
            })
            document.getElementById('teacher_timetable').addEventListener('click', () => {
                mainContent.innerHTML = component.timetable;
                let weekInp = document.getElementById('timetable_week');
                let targetWeek = model.currentTime;
                document.getElementById('increase_week').addEventListener('click',() => {
                    targetWeek = targetWeek.plus({week: 1});
                    weekInp.value = targetWeek.toISOWeekDate().substring(0,8);
                    view.setTimetable(targetWeek);
                })
                document.getElementById('decrease_week').addEventListener('click',() => {
                    targetWeek = targetWeek.minus({week: 1});
                    weekInp.value = targetWeek.toISOWeekDate().substring(0,8);
                    view.setTimetable(targetWeek);
                })
                weekInp.addEventListener("blur",() => {
                    targetWeek = DateTime.fromISO(weekInp.value);
                    view.setTimetable(targetWeek);
                })
                weekInp.value = targetWeek.toISOWeekDate().substring(0,8);
                model.currentUser.timetable.sort((a,b) => {
                    if(a.beginWeek != b.beginWeek){
                        return a.beginWeek > b.beginWeek? 1 : -1;
                    } else if (a.weekday != b.weekday){
                        return a.weekday - b.weekday;
                    } else if(a.beginTime != b.beginTime){
                        return a.beginTime > b.beginTime? 1 : -1;
                    } else {
                        return 0;
                    }
                })
                view.setTimetable(targetWeek);
            })
            document.getElementById('grading_page').addEventListener('click',() => {
                mainContent.innerHTML = component.gradingPage;
                
                view.addClassOptions(model.currentUser.classIncharge);
                const wrapper = document.querySelector('.class_select_wrapper');
                const selectBtn = wrapper.querySelector('.select_btn');
                const inp = wrapper.querySelector("#search");
                selectBtn.addEventListener("click",() => {
                    wrapper.classList.toggle("active");
                })
                inp.addEventListener("keyup",() => {
                    let found = [];
                    let searched = inp.value.toLowerCase();
                    found = model.currentUser.classIncharge.filter((data) => {
                        let realData = data.name;
                        return realData.toLowerCase().startsWith(searched);
                    })
                    view.addClassOptions(found);
                })
                document.getElementById("load_class_student").addEventListener("click",() => {
                    controller.loadClass({classID: selectBtn.id, name: selectBtn.firstElementChild.value});
                })
                document.getElementById("save_score").addEventListener("click",() => {
                    const gradeTable = document.querySelector(".score_board tbody");
                    let saveData = [];
                    for(let row of gradeTable.children){
                        saveData.push({
                            studentID: row.children[0].id,
                            studentName: row.children[0].innerText,
                            studentGrade: [row.children[1].firstChild.value,
                                            row.children[2].firstChild.value,
                                            row.children[3].firstChild.value,
                                            row.children[4].firstChild.value]
                        })
                    }
                    controller.saveScore(saveData,gradeTable.id);
                })
            })
            break;
        case 'studentPage':
            document.getElementById('app').innerHTML = component.studentPage;
            document.getElementById('system_time').innerHTML = `Week: ${model.currentTime.weekNumber}-${model.currentTime.weekYear}`;
            mainContent = document.getElementById('main_content');
            document.getElementById('side_bar_button').addEventListener('click',() => {
                document.getElementById('side_bar').classList.toggle('expand');
            })
            document.getElementById('log_out_btn').addEventListener('click',() => {
                model.currentUser.signout();
            });
            document.getElementById('profile_button').addEventListener('click', () => {
                mainContent.innerHTML = component.studentProfile;
                const upperInfo = document.querySelector('.basic_info_container');
                upperInfo.children[0].innerHTML = model.currentUser.name;
                upperInfo.children[1].innerHTML = model.currentUser.email;
                view.setStudentInfo();
                const userProfileForm = document.getElementById('user_info_form');
                userProfileForm.addEventListener('submit',(e) => {
                    e.preventDefault();
                    const data = {
                        phoneNumber: userProfileForm.phone_number.value,
                        dateOfBirth: userProfileForm.DOB.value,
                        address: userProfileForm.address.value,
                        gender: userProfileForm.gender.value,
                        studyField: userProfileForm.study_field.value,
                    }
                    model.updateProfile(data);
                })
            })
            document.getElementById('join_class').addEventListener('click',() => {
                mainContent.innerHTML = component.joinClass;
                view.setClassTableInfo();
            })
            document.getElementById('student_timetable').addEventListener('click',() => {
                mainContent.innerHTML = component.timetable;
                let weekInp = document.getElementById('timetable_week');
                let targetWeek = model.currentTime;
                document.getElementById('increase_week').addEventListener('click',() => {
                    targetWeek = targetWeek.plus({week: 1});
                    weekInp.value = targetWeek.toISOWeekDate().substring(0,8);
                    view.setTimetable(targetWeek);
                })
                document.getElementById('decrease_week').addEventListener('click',() => {
                    targetWeek = targetWeek.minus({week: 1});
                    weekInp.value = targetWeek.toISOWeekDate().substring(0,8);
                    view.setTimetable(targetWeek);
                })
                weekInp.addEventListener("blur",() => {
                    targetWeek = DateTime.fromISO(weekInp.value);
                    view.setTimetable(targetWeek);
                })
                weekInp.value = targetWeek.toISOWeekDate().substring(0,8);
                model.currentUser.timetable.sort((a,b) => {
                    if(a.beginWeek != b.beginWeek){
                        return a.beginWeek > b.beginWeek? 1 : -1;
                    } else if (a.weekday != b.weekday){
                        return a.weekday - b.weekday;
                    } else if(a.beginTime != b.beginTime){
                        return a.beginTime > b.beginTime? 1 : -1;
                    } else {
                        return 0;
                    }
                })
                view.setTimetable(targetWeek);
            })
            document.getElementById('student_score_page').addEventListener('click',() => {
                mainContent.innerHTML = component.scorePage;
                document.querySelector(".all_subject_score tbody").innerHTML = "";
                model.getMyScore();
            })
            break;
    }
}

view.setStudentInfo = () => {
    const userProfileForm = document.getElementById('user_info_form');
    userProfileForm.phone_number.value = model.currentUser.phoneNumber;
    userProfileForm.DOB.value = model.currentUser.dateOfBirth;
    userProfileForm.address.value = model.currentUser.address;
    userProfileForm.gender.value = model.currentUser.gender;
    userProfileForm.study_field.value = model.currentUser.studyField;
    const basicInfoTab = document.getElementById("basic_info_tab_pane");
    basicInfoTab.innerHTML = ` 
    <div class="row mb-3">
        <div class="col-md-6 fw-bold">Name</div>
        <div class="col-md-6">${model.currentUser.name}</div>
    </div>
    <div class="row mb-3">
        <div class="col-md-6 fw-bold">Gender</div>
        <div class="col-md-6">${model.currentUser.gender}</div>
    </div>
    <div class="row mb-3">
        <div class="col-md-6 fw-bold">Date Of Birth</div>
        <div class="col-md-6">${model.currentUser.dateOfBirth}</div>
    </div>
    <div class="row mb-3">
        <div class="col-md-6 fw-bold">Study field</div>
        <div class="col-md-6">${model.currentUser.studyField}</div>
</div>`
    const contactInfoTab = document.getElementById("contact_info_tab_pane");
    contactInfoTab.innerHTML = `
    <div class="row mb-3">
        <div class="col-md-6 fw-bold">Email</div>
        <div class="col-md-6">${model.currentUser.email}</div>
    </div>
    <div class="row mb-3">
        <div class="col-md-6 fw-bold">Phone</div>
        <div class="col-md-6">${model.currentUser.phoneNumber}</div>
    </div>
    <div class="row mb-3">
        <div class="col-md-6 fw-bold">Address</div>
        <div class="col-md-6">${model.currentUser.address}</div>
    </div>`
}
view.setTeacherInfo = () => {
    const userProfileForm = document.getElementById('user_info_form');
    userProfileForm.phone_number.value = model.currentUser.phoneNumber;
    userProfileForm.DOB.value = model.currentUser.dateOfBirth;
    userProfileForm.address.value = model.currentUser.address;
    userProfileForm.gender.value = model.currentUser.gender;
}
view.setClassTableInfo = () => {
    let classTable = document.querySelector('.show_class_table tbody');
    classTable.innerHTML = "";
    model.courses.futureCourses.forEach((info) => {
        let tableRow = document.createElement('tr');
        tableRow.innerHTML = `
            <td data-label="Class Name">${info.name}</td>
            <td data-label="Subject">${info.subject}</td>
            <td data-label="Duration">${info.beginWeek.substring(5,8)} - ${info.endWeek.substring(5,8)}</td>
            <td data-label="Class Time">${view.weekName[info.dayOfWeek]} ${info.beginTime} - ${info.endTime}</td>
            <td data-label="Room">${info.room}</td>
            <td data-label="Teacher">${info.teacherName}</td>
            <td data-label="Capacity">${info.studentList.length}/${info.studentCap}</td>
            <td>
                ${info.studentList.includes(model.currentUser.uid)? 
                    "<button class=\"btn btn-primary disabled\">Join</button><button class=\"btn btn-danger\">Leave</button>" : 
                    "<button class=\"btn btn-primary\">Join</button><button class=\"btn btn-danger disabled\">Leave</button>"}
            </td>
        `
        tableRow.addEventListener("click",(e) => {
            if(e.target.classList.contains("btn-primary")){
                e.target.classList.add("disabled");
                model.currentUser.joinClass(info.classID);
            }
            if(e.target.classList.contains("btn-danger")){
                e.target.classList.add("disabled");
                model.currentUser.leaveClass(info.classID);
            }
        })
        classTable.appendChild(tableRow);
    })
}
view.setTimetable = (targetWeek) => {
    let ISOtargetWeek = targetWeek.toISOWeekDate().substring(0,8)
    let schedulesTable = document.querySelector('.schedules tbody');
    schedulesTable.innerHTML = "";
    for(let i = 7;i<17;i++){
        let row = document.createElement("tr");
        row.innerHTML = `
            <th>${i}:00 - ${i+1}:00</th>
            <td class="0"></td>
            <td class="1"></td>
            <td class="2"></td>
            <td class="3"></td>
            <td class="4"></td>
            <td class="5"></td>
            <td class="6"></td>
        `
        schedulesTable.appendChild(row);
    }
    for(let classInfo of model.currentUser.timetable) {
        if(classInfo.beginWeek <= ISOtargetWeek && classInfo.endWeek >= ISOtargetWeek){
            const start = model.currentTime.startOf('day').plus({hours: 7});
            const end = model.currentTime.endOf('day').minus({hours: 7});
            let cells = [];
            for(let period = start;period <= end;period = period.plus({hour: 1})){
                if(classInfo.beginTime <= period.toFormat('T') && period.toFormat('T') < classInfo.endTime) {
                    for(let cell of schedulesTable.children[period.hour-7].children){
                        if(cell.classList[0] == classInfo.weekday) cells.push(cell);
                    }
                }
            }
            cells[0].innerHTML = `
            <div class = "card text-bg-primary" style="height: ${cells.length*42.9}px">
                <div class = "card-body">${classInfo.subject}<br>Room ${classInfo.room}</div>
            </div>`;
            cells[0].setAttribute("rowspan",`${cells.length}`);
            for(let cell of cells){
                if(cell.innerHTML == "") cell.remove();
            }
        }
    }
}
view.setClassGrade = (classID) => {
    const gradeTable = document.querySelector(".score_board tbody");
    gradeTable.id = classID;
    gradeTable.innerHTML = "";
    for(let grades of model.currentUser.studentList){
        let row = document.createElement("tr");
        row.innerHTML = `
            <td id="${grades.studentID}">${grades.studentName}</td>
            <td><input name="f" class="form-control" type="number" min="0" max="10" value="${grades.studentGrade[0]}"></td>
            <td><input name="f" class="form-control" type="number" min="0" max="10" value="${grades.studentGrade[1]}"></td>
            <td><input name="f" class="form-control" type="number" min="0" max="10" value="${grades.studentGrade[2]}"></td>
            <td><input name="f" class="form-control" type="number" min="0" max="10" value="${grades.studentGrade[3]}"></td>
            <td>${(grades.studentGrade[0]*0.1+grades.studentGrade[1]*0.1+grades.studentGrade[2]*0.3+grades.studentGrade[3]*0.5)}</td>
        `
        gradeTable.appendChild(row);
    }
}
view.setStudentGrade = (name,subject,scores) => {
    const table = document.querySelector(".all_subject_score tbody");
    let row = document.createElement("tr");
    row.innerHTML = `
        <td>${name}</td>
        <td>${subject}</td>
        <td>${scores[0]}</td>
        <td>${scores[1]}</td>
        <td>${scores[2]}</td>
        <td>${scores[3]}</td>
        <td>${(scores[0]*0.1+scores[1]*0.1+scores[2]*0.3+scores[3]*0.5)}</td>
    `
    table.appendChild(row);
}


view.clearInput = () => {
    let inputBoxes = document.querySelectorAll('input');
    let selectBoxes = document.querySelectorAll('select');
    for(let inp of inputBoxes){
        inp.value = "";
        inp.classList.remove('is-invalid');
        inp.classList.remove('is-valid');
    }
    for(let sel of selectBoxes){
        sel.selectedIndex = 0;
        sel.classList.remove('is-invalid');
        sel.classList.remove('is-valid');
    }
}
view.setErrorMessage = (elementId, content,specificInput = "#f") => {
    let inputBox = document.getElementById(elementId).parentElement.querySelector(specificInput === "#f"? 'input' : specificInput);
    document.getElementById(elementId).innerText = content;
    if(content.length > 0){
        inputBox.classList.add('is-invalid');
        inputBox.classList.remove('is-valid');
    } else {
        inputBox.classList.add('is-valid');
        inputBox.classList.remove('is-invalid');
    }
}
view.alertError = (triggerID,content) => {
    const failToast = document.getElementById('fail_message'),
    failProgress = document.querySelector('#fail_message .progress_bar'),
    triggerBtns = document.querySelectorAll(triggerID);
    document.getElementById('fail_content').innerHTML = content;

    for(let btn of triggerBtns) btn.classList.add('disabled');
    failToast.classList.add('active');
    failProgress.classList.add('active');
    setTimeout(()=>{
        failToast.classList.remove('active');
    }, 3000)
    setTimeout(()=>{
        failProgress.classList.remove('active');
        for(let btn of triggerBtns) btn.classList.remove('disabled');
    }, 3300)
}
view.alertSuccess = (triggerID, content) => {
    const successToast = document.getElementById('success_message'),
    successProgress = document.querySelector('#success_message .progress_bar'),
    triggerBtns = document.querySelectorAll(triggerID);
    document.getElementById('success_content').innerHTML = content;

    successToast.classList.add('active');
    successProgress.classList.add('active');
    for(let btn of triggerBtns) btn.classList.add('disabled');
    setTimeout(()=>{
        successToast.classList.remove('active');
    }, 3000)
    setTimeout(()=>{
        successProgress.classList.remove('active');
        for(let btn of triggerBtns) btn.classList.remove('disabled');
    }, 3300)
}
view.addOptions = (array) => {
    const wrapper = document.querySelector('.teacher_select_wrapper'),
    selectBtn = wrapper.querySelector('.select_btn'),
    sub = document.querySelector('#course_subject'),
    opt = wrapper.querySelector(".options");
    opt.innerHTML = array.length ? "" : `<p>No result found!</p>`;
    array.forEach((data) => {
        let li = document.createElement("li");
        li.id = data.UID;
        li.innerHTML = `${data.profession} - ${data.name}`;
        li.addEventListener("click",(e) => {
            wrapper.classList.remove("active");
            selectBtn.id = e.target.id;
            selectBtn.firstElementChild.value = e.target.innerText.split(" - ")[1];
            sub.value = e.target.innerText.split(" - ")[0];
        })
        opt.appendChild(li);
    })
}
view.addClassOptions = (array) => {
    const wrapper = document.querySelector('.class_select_wrapper'),
    selectBtn = wrapper.querySelector('.select_btn'),
    opt = wrapper.querySelector(".options");
    opt.innerHTML = array.length ? "" : `<p>No result found!</p>`;
    const todayWeek = model.currentTime.toISOWeekDate().substring(0,8);
    array.forEach((data) => {
        if(todayWeek >= data.beginWeek) {
            let li = document.createElement("li");
            li.id = data.classID;
            li.innerHTML = data.name;
            li.addEventListener("click",(e) => {
                wrapper.classList.remove("active");
                selectBtn.id = e.target.id;
                selectBtn.firstElementChild.value = e.target.innerText;
            })
            opt.appendChild(li);
        }
    })
}

export {view}