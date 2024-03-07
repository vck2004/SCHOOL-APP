const component = {}

component.loginPage = `
<div class="login_container">
        <form id="login_form">
            <div class="login_header">Baka School</div>
            <div class="input_wrapper">
                <input type="email" placeholder="Email" name="email">
                <div class="error" id="email_error"></div>
            </div>
            <div class="input_wrapper">
                <input type="password" placeholder="Password" name="password" autocomplete="off">
                <div class="error" id="password_error"></div>
            </div>
            <div class="form_action">
                <div>Don't have an account ? <span class="cursor_pointer" id="redirect_to_register">Register</span></div>
                <button class="btn cursor_pointer" type="submit">Login</button>
            </div>
        </form>
    </div>
`

component.registerPage = `
<div class="register_container">
<form id="register_form">
    <div class="register_header">Baka School</div>
    <div class="name_wrapper">
        <div class="input_wrapper">
            <input type="text" placeholder="First name" name="firstName">
            <div class="error" id="first_name_error"></div>
        </div>
        <div class="input_wrapper">
            <input type="text" placeholder="Last name" name="lastName">
            <div class="error" id="last_name_error"></div>
        </div>
    </div>
    <div class="input_wrapper">
        <input type="email" placeholder="Email" name="email">
        <div class="error" id="email_error"></div>
    </div>
    <div class="input_wrapper">
        <input type="password" placeholder="Password" name="password" autocomplete="off">
        <div class="error" id="password_error"></div>
    </div>
    <div class="input_wrapper">
        <input type="password" placeholder="Confirm password" name="confirmPassword" autocomplete="off">
        <div class="error" id="confirm_password_error"></div>
    </div>
    <div class="form_action">
        <div>Already have an account ? <span class="cursor_pointer" id="redirect_to_login">Login</span></div>
        <button class="btn cursor_pointer" type="submit">Register</button>
    </div>
</form>
</div>
`

export {component}