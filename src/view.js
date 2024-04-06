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
                const createForm = document.getElementById("class_info_form");
                createForm.parentElement.parentElement.addEventListener("submit",(e) => {
                    e.preventDefault();
                    const data = {
                        email: createForm.email.value,
                        password: createForm.password.value
                    }
                    controller.login(data);
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
                const userProfileForm = document.getElementById('user_info_form');
                model.getTeacherProfile();
                userProfileForm.addEventListener('submit',(e) => {
                    e.preventDefault();
                    const data = {
                        first: userProfileForm.first_name.value,
                        last: userProfileForm.last_name.value,
                        phone: userProfileForm.phone_number.value,
                        DOB: userProfileForm.DOB.value,
                    }
                    model.updateTeacherProfile(data);
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
                const userProfileForm = document.getElementById('user_info_form');
                model.getStudentProfile();
                userProfileForm.addEventListener('submit',(e) => {
                    e.preventDefault();
                    const data = {
                        first: userProfileForm.first_name.value,
                        last: userProfileForm.last_name.value,
                        phone: userProfileForm.phone_number.value,
                        DOB: userProfileForm.DOB.value,
                    }
                    model.updateStudentProfile(data);
                })
            })
            break;
    }
}

view.clearInput = () => {
    let inputBoxes = document.querySelectorAll('input');
    for(let inp of inputBoxes){
        inp.value = "";
        inp.classList.remove('is-invalid');
        inp.classList.remove('is-valid');
    }
}
view.setErrorMessage = (elementId, content) => {
    let inputBox = document.getElementById(elementId).parentElement.querySelector('input');
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



view.setInputValue = (elementId, content) => {
    const inputBox = document.getElementById(elementId);
    inputBox.value = content;
}

export {view}