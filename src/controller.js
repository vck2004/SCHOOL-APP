import {model} from './model.js';
import {view} from './view.js';

const controller = {}

controller.login = (data) => {
    view.setErrorMessage('login_email_error', data.email === '' ? 'Please input email' : '');
    view.setErrorMessage('login_password_error', data.password === '' ? 'Please input password' : '');
    if (data.email !== '' && data.password !== '') {
        model.login(data);
    }
}

controller.register = (data) => {
    view.setErrorMessage('user_type_error', data.userType === '1' ? 'Please choose a user type' : '');
    view.setErrorMessage('signup_email_error', data.email === '' ? 'Please input email' : '');
    view.setErrorMessage('signup_password_error', data.password === '' ? 'Please input password' : '');
    view.setErrorMessage('confirm_password_error', data.confirmPassword === '' ? 'Please input confirm password' : data.confirmPassword === data.password ? '' : `Password didn't match`);
    if (data.userType !== '1' && data.email !== '' && data.password !== '' && data.confirmPassword === data.password) {
        model.register(data);
    }
}

export {controller}