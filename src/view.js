import {controller} from './controller.js'
import {component} from './component.js'

const view = {}

view.setActiveScreen = (screenName) => {
    switch (screenName) {
        case 'registerPage':
            document.getElementById('app').innerHTML = component.registerPage;
            const registerForm = document.getElementById('register_form');
            registerForm.addEventListener('submit', (e) => {
                e.preventDefault();
                const data = {
                    firstName: registerForm.firstName.value,
                    lastName: registerForm.lastName.value,
                    email: registerForm.email.value,
                    password: registerForm.password.value,
                    confirmPassword: registerForm.confirmPassword.value
                }
                controller.register(data);
            })
            document.getElementById('redirect_to_login').addEventListener('click', () => {
                view.setActiveScreen('loginPage');
            })
            break;
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
            document.getElementById('redirect_to_register').addEventListener('click', () => {
                view.setActiveScreen('registerPage');
            })
            break;
    }
}

view.setErrorMessage = (elementId, content) => {
    document.getElementById(elementId).innerText = content;
}

export {view}