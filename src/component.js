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
        <div id="fail_message" class="toast_container fail_toast_container">
            <div class="toast_content">
                <i class="fa-solid fa-xmark toast_icon" style="background-color: #d64550;"></i>
                <div class="message">
                    <span class="text text1">Failed</span>
                    <span class="text" id="fail_content"></span>
                </div>
            </div>
            <i id="close_fail_toast" class="fa-solid fa-xmark close_btn"></i>
            <div class="progress_bar" style="background: #fbeced;"></div>
        </div>
        <div id="success_message" class="toast_container success_toast_container">
            <div class="toast_content">
                <i class="fa-solid fa-check toast_icon" style="background-color: #61c9a8;"></i>
                <div class="message">
                    <span class="text text1">Success</span>
                    <span class="text" id="success_content"></span>
                </div>
            </div>
            <i id="close_success_toast" class="fa-solid fa-xmark close_btn"></i>
            <div class="progress_bar" style="background: #eff9f6;"></div>
        </div>
    </div>
`
component.mainPage = `
    <div>Admin</div>
`

component.studentPage = `
    <div class="student_page_container">
        <aside id="side_bar">
            <div class="d-flex">
                <button id="side_bar_button"><i class="fa-solid fa-bars"></i></button>
                <div class="web_name">Baka School</div>
            </div>
            <ul class="side_bar_nav">
                <li class="side_bar_item" id="profile_button">
                    <i class="fa-regular fa-user"></i>
                    <span>Profile</span>
                </li>
                <li class="side_bar_item">
                    <i class="fa-solid fa-magnifying-glass"></i>
                    <span>Class Info</span>
                </li>
                <li class="side_bar_item">
                    <i class="fa-solid fa-book-open-reader"></i>
                    <span>Score</span>
                </li>
                <li class="side_bar_item">
                    <i class="fa-regular fa-pen-to-square"></i>
                    <span>Available Course</span>
                </li>
                <li class="side_bar_item">
                    <i class="fa-solid fa-envelope-open-text"></i>
                    <span>Feedback</span>
                </li>
            </ul>
        </aside>
        <div class="content_container container-fluid" style="padding-left: 0;padding-right: 0;">
            <div class="navbar">
                <img src="../img/default_avatar.jpg" alt="avatar" class="avatar" draggable="false">
                <button id="log_out_btn" class="btn btn-primary" style="margin: 0 10px;">Log out</button>
            </div>
            <div id="main_content"></div>
        </div>
        <div id="fail_message" class="toast_container fail_toast_container">
            <div class="toast_content">
                <i class="fa-solid fa-xmark toast_icon" style="background-color: #d64550;"></i>
                <div class="message">
                    <span class="text text1">Failed</span>
                    <span class="text" id="fail_content"></span>
                </div>
            </div>
            <i id="close_fail_toast" class="fa-solid fa-xmark close_btn"></i>
            <div class="progress_bar" style="background: #fbeced;"></div>
        </div>
        <div id="success_message" class="toast_container success_toast_container">
            <div class="toast_content">
                <i class="fa-solid fa-check toast_icon" style="background-color: #61c9a8;"></i>
                <div class="message">
                    <span class="text text1">Success</span>
                    <span class="text" id="success_content"></span>
                </div>
            </div>
            <i id="close_success_toast" class="fa-solid fa-xmark close_btn"></i>
            <div class="progress_bar" style="background: #eff9f6;"></div>
        </div>
    </div>
`

component.studentProfile = `
    <div class="title">Student Profile</div>
    <div class="form_wrapper">
        <form id="user_info_form">
            <div class="mb-3">
                <div class="row">
                    <div class="col">
                        <label for="last_name" class="form-label">Last name</label>
                        <input id="last_name" type="text" class="form-control" placeholder="Nguyen Van" autocomplete="off">
                    </div>
                    <div class="col">
                        <label for="first_name" class="form-label">First name</label>
                        <input id="first_name" type="text" class="form-control" placeholder="A" autocomplete="off">
                    </div>
                </div>
            </div>
            <div class="mb-3">
                <label for="phone_number" class="form-label">Phone number</label>
                <input id="phone_number" type="text" class="form-control" placeholder="0123456789" autocomplete="off">
            </div>
            <div class="mb-3">
                <label for="DOB" class="form-label">Date of birth</label>
                <input id="DOB" type="date" class="form-control" autocomplete="off">
            </div>
            <button id="save_profile" class="btn btn-primary">Save change</button>
        </form>
    </div>
`

component.teacherPage = `
    <div>teacher</div>
`


export {component}