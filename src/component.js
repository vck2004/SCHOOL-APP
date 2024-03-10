const component = {}

component.loginRegisterPage = `
    <div class="login_signup_container w3-animate-opacity">
        <div class="welcome_message w3-animate-top">
            <i class="fa-solid fa-graduation-cap"></i>
            <h2>WELCOME TO</h2>
            <h1>OUR SCHOOL</h1>
        </div>
        <div class="form_container w3-animate-right">
            <div class="form_switch btn-group btn-group-lg d-flex">
                <a class="login_switch btn btn-outline-primary active">Login</a>
                <a class="signup_switch btn btn-outline-primary">Signup</a>
            </div>
            <div class="form_content">
                <div id="login_block" class="w3-animate-opacity">
                    <h1>Account login</h1>
                    <form id="login_form" novalidate>
                        <div class="input_wrapper form-floating">
                            <input type="text" name="email" id="login_email" class="form-control" autocomplete="off" placeholder="@gmail">
                            <label for="login_email">Email</label>
                            <div class="invalid-feedback" id="login_email_error"></div>
                        </div>
                        <div class="input_wrapper form-floating">
                            <input type="password" id="login_password" class="form-control" name="password" autocomplete="off" placeholder="password">
                            <label for="login_password">Password</label>
                            <div class="invalid-feedback" id="login_password_error"></div>
                        </div>
                        <!-- <div id="forgot_password">Forgot Password?</div> -->
                        <div class="btn-group d-flex"><button class="login_btn btn btn-primary" type="submit">Login</button></div>
                    </form>
                    <!-- <p style="margin: 40px 0 10px; font-size: larger; font-family: 'Rajdhani', sans-serif;">Login with your Social Account</p>
                    <div class="social_link_wrapper">
                        <i class="fa-brands fa-square-google-plus"></i>
                        <i class="fa-brands fa-square-facebook"></i>
                    </div> -->
                </div>
                <div id="signup_block" class="w3-animate-opacity" style="display: none;">
                    <h1>Sign up for free</h1>
                    <form id="signup_form" novalidate>
                        <div class="input_wrapper form-floating">
                            <select type="text" name="userType" id="select_type" class="form-select">
                                <option value="1" selected>...</option>
                                <option value="2">Teacher</option>
                                <option value="3">Student</option>
                            </select>
                            <label for="select_type">I am a</label>
                            <div class="invalid-feedback" id="user_type_error"></div>
                        </div>
                        <div class="input_wrapper form-floating">
                            <input type="email" id="signup_email" class="form-control" name="email" autocomplete="off" placeholder="email">
                            <label for="signup_email">Email</label>
                            <div class="invalid-feedback" id="signup_email_error"></div>
                        </div>
                        <div class="input_wrapper form-floating">
                            <input type="password" id="signup_password" class="form-control" name="password" autocomplete="off" placeholder="password">
                            <label for="signup_password">Password</label>
                            <div class="invalid-feedback" id="signup_password_error"></div>
                        </div>
                        <div class="input_wrapper form-floating">
                            <input type="password" id="signup_confirm_password" class="form-control" name="confirmPassword" autocomplete="off" placeholder="confirm">
                            <label for="signup_confirm_password">Confirm password</label>
                            <div class="invalid-feedback" id="confirm_password_error"></div>
                        </div>
                        <div class="btn-group d-flex"><button class="signup_btn btn btn-primary">Sign up</button></div>
                    </form>
                </div>
            </div>
        </div>
    </div>
`
component.mainPage = `
    <div>TEST</div>
`


export {component}