import {controller} from './controller.js';
import {component} from './component.js';
import { model } from './model.js';

const view = {}

view.setActiveScreen = (screenName) => {
    switch (screenName) {
        case 'loginRegisterPage':
            document.getElementById('app').innerHTML = component.loginRegisterPage;
            const registerForm = document.getElementById('signup_form');
            registerForm.addEventListener('submit', (e) => {
                e.preventDefault();
                const data = {
                    userType: "Student",
                    email: registerForm.email.value,
                    password: registerForm.password.value,
                    confirmPassword: registerForm.confirmPassword.value
                }
                controller.registerStudent(data);
            })
            const loginForm = document.getElementById('login_form');
            loginForm.addEventListener('submit', (e) => {
                e.preventDefault();
                const data = {
                    email: loginForm.email.value,
                    password: loginForm.password.value
                }
                controller.login(data);
            })
            const loginSwitchBtn = document.querySelector('.form_switch .login_switch');
            const signupSwitchBtn = document.querySelector('.form_switch .signup_switch');
            loginSwitchBtn.addEventListener('click',() => {
                loginSwitchBtn.classList.add('active');
                signupSwitchBtn.classList.remove('active');
                document.getElementById('signup_block').style.display = 'none';
                document.getElementById('login_block').style.display = 'block';
            })
            signupSwitchBtn.addEventListener('click',() => {
                signupSwitchBtn.classList.add('active');
                loginSwitchBtn.classList.remove('active');
                document.getElementById('login_block').style.display = 'none';
                document.getElementById('signup_block').style.display = 'block';
            })
            break;
        case 'adminPage':
            document.getElementById('app').innerHTML = component.adminPage;
            var mainContent = document.getElementById('main_content');
            document.getElementById('side_bar_button').addEventListener('click',() => {
                document.getElementById('side_bar').classList.toggle('expand');
            });
            document.getElementById('log_out_btn').addEventListener('click',() => {
                model.currentUser.signout();
            });
            document.getElementById('account_create').addEventListener('click',() => {
                mainContent.innerHTML = component.teacherRegisterForm;
                const registerForm = document.getElementById('teacher_signup_form');
                registerForm.addEventListener('submit', (e) => {
                    e.preventDefault();
                    const data = {
                        userType: "Teacher",
                        email: registerForm.email.value,
                        password: registerForm.password.value,
                        confirmPassword: registerForm.confirmPassword.value
                    }
                    controller.registerTeacher(data);
                })
            });
            document.getElementById('school_info').addEventListener('click',() => {
                mainContent.innerHTML = component.schoolInfo;
                const schoolForm = document.getElementById('current_time');
                const subjectForm = document.getElementById('subject_info');
                model.getTime();
                schoolForm.addEventListener('submit',(e)=>{
                    e.preventDefault();
                    const data = {
                        year: schoolForm.school_year.value,
                        semester: schoolForm.current_semester.value,
                    }
                    model.updateTime(data);
                })
                model.getSubjectList();
                subjectForm.addEventListener('submit',(e)=>{
                    e.preventDefault();
                    const data = {
                        name: subjectForm.subject_name.value,
                        code: subjectForm.subject_code.value,
                    }
                    model.addSubject(data);
                })
            })
            document.getElementById('class_create').addEventListener('click',() => {
                mainContent.innerHTML = component.classCreate;
            })
            
            break;
        case 'teacherPage':
            document.getElementById('app').innerHTML = component.teacherPage;
            var mainContent = document.getElementById('main_content');
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
            var mainContent = document.getElementById('main_content');
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

view.setErrorMessage = (elementId, content) => {
    var inputBox = document.getElementById(elementId).parentElement.firstElementChild;
    document.getElementById(elementId).innerText = content;
    if(content.length > 0){
        inputBox.classList.add('is-invalid');
        inputBox.classList.remove('is-valid');
    } else {
        inputBox.classList.add('is-valid');
        inputBox.classList.remove('is-invalid');
    }
}

view.setInputValue = (elementId, content) => {
    const inputBox = document.getElementById(elementId);
    inputBox.value = content;
}

view.alertError = (triggerID,content) => {
    const failToast = document.getElementById('fail_message'),
    failProgress = document.querySelector('#fail_message .progress_bar'),
    triggerBtn = document.querySelector(triggerID);
    document.getElementById('fail_content').innerHTML = content;

    if(triggerBtn) triggerBtn.classList.add('disabled');
    failToast.classList.add('active');
    failProgress.classList.add('active');
    setTimeout(()=>{
        failToast.classList.remove('active');
    }, 3000)
    setTimeout(()=>{
        failProgress.classList.remove('active');
        if(triggerBtn) triggerBtn.classList.remove('disabled');
    }, 3300)
}

view.alertSuccess = (triggerID, content) => {
    const successToast = document.getElementById('success_message'),
    successProgress = document.querySelector('#success_message .progress_bar'),
    triggerBtn = document.querySelector(triggerID);
    document.getElementById('success_content').innerHTML = content;

    successToast.classList.add('active');
    successProgress.classList.add('active');
    if(triggerBtn) triggerBtn.classList.add('disabled');
    setTimeout(()=>{
        successToast.classList.remove('active');
    }, 3000)
    setTimeout(()=>{
        successProgress.classList.remove('active');
        if(triggerBtn) triggerBtn.classList.remove('disabled');
    }, 3300)
}

export {view}