import {controller} from './controller.js';
import {component} from './component.js';

const view = {}

view.setActiveScreen = (screenName) => {
    switch (screenName) {
        case 'loginRegisterPage':
            document.getElementById('app').innerHTML = component.loginRegisterPage;
            const registerForm = document.getElementById('signup_form');
            registerForm.addEventListener('submit', (e) => {
                e.preventDefault();
                const data = {
                    userType: registerForm.userType.value,
                    email: registerForm.email.value,
                    password: registerForm.password.value,
                    confirmPassword: registerForm.confirmPassword.value
                }
                controller.register(data);
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
        case 'mainPage':
            document.getElementById('app').innerHTML = component.mainPage;
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

export {view}