import {controller} from './controller.js';
import {component} from './component.js';
import { model } from './model.js';

const view = {}

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
            break;
        case 'studentPage':
            document.getElementById('app').innerHTML = component.studentPage;
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
        li.classList.add(data.profession);
        li.innerHTML = `${data.profession} - ${data.name}`;
        li.addEventListener("click",(e) => {
            wrapper.classList.remove("active");
            selectBtn.id = e.target.id;
            selectBtn.firstElementChild.value = e.target.innerText.split(" - ")[1];
            sub.value = e.target.classList[0];
        })
        opt.appendChild(li);
    })
}

export {view}