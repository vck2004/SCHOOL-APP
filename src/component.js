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
            <div class="progress_bar" style="background: #eff9f6;"></div>
        </div>
    </div>
`

component.adminPage = `
    <div class="main_page_container">
        <aside id="side_bar">
            <div class="d-flex">
                <button id="side_bar_button"><i class="fa-solid fa-bars"></i></button>
                <div class="web_name">Baka School</div>
            </div>
            <ul class="side_bar_nav">
                <li class="side_bar_item" id="account_create">
                    <i class="fa-regular fa-user"></i>
                    <span>Create Account</span>
                </li>
                <li class="side_bar_item">
                    <i class="fa-regular fa-address-book"></i>
                    <span>Account Management</span>
                </li>
                <li class="side_bar_item" id="school_info">
                    <i class="fa-solid fa-graduation-cap"></i>
                    <span>General Information</span>
                </li>
                <li class="side_bar_item" id="class_create">
                    <i class="fa-regular fa-pen-to-square"></i>
                    <span>Create Class</span>
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
            <div class="progress_bar" style="background: #eff9f6;"></div>
        </div>
    </div>
`

component.classCreate = `
<div class="modal fade" id="add_class_modal" tabindex="-1">
    <div class="modal-dialog modal-dialog-scrollable modal-fullscreen-md-down modal-lg">
        <div class="modal-content">
            <div class="modal-header">
                <h1 class="modal-title fs-5">Add New Class</h1>
                <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
            </div>
            <div class="modal-body">
                <form id="class_info_form">
                    <div class="mb-3">
                        <label for="class_name" class="form-label">Class name</label>
                        <input id="class_name" type="text" class="form-control" autocomplete="off">
                    </div>
                    <div class="mb-3">
                        <label for="class_subject" class="form-label">Subject</label>
                        <input id="class_subject" type="text" class="form-control" autocomplete="off">
                    </div>
                </form>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                <button type="button" class="btn btn-primary">Save changes</button>
            </div>
        </div>
    </div>
</div>
<div class="title">My class</div>
<div class="class_info_container">
    <button class="add_class_btn btn btn-primary" data-bs-toggle="modal" data-bs-target="#add_class_modal"><i class="fa-solid fa-plus"></i> Add new class</button>
    <table class="table mt-3 table-bordered">
        <tbody>
            <tr>
                <td colspan="4">No classes created yet</td>
            </tr>
        </tbody>
    </table>
</div>
`
component.schoolInfo = `
    <div class="title">School Info</div>
    <div class="form_wrapper">
        <form id="current_time">
            <div class="mb-3">
                <label for="school_year" class="form-label">School Year</label>
                <input id="school_year" type="text" class="form-control" autocomplete="off">
            </div>
            <div class="mb-3">
                <label for="current_semester" class="form-label">Semester</label>
                <input id="current_semester" type="text" class="form-control" autocomplete="off">
            </div>
            <button id="save_info" class="btn btn-primary">Save Change</button>
        </form>
    </div>
    <div class="form_wrapper">
        <form id="subject_info">
            <div class="mb-3">
                <label for="subject_name" class="form-label">Subject name</label>
                <input id="subject_name" type="text" class="form-control" autocomplete="off">
            </div>
            <div class="mb-3">
                <label for="subject_code" class="form-label">Subject code</label>
                <input id="subject_code" type="text" class="form-control" autocomplete="off">
            </div>
            <button id="add_info" class="btn btn-primary">Add Subject</button>
        </form>
    </div>
`


component.studentPage = `
    <div class="main_page_container">
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
                    <span>Class registration</span>
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
    <div class="main_page_container">
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
                <li class="side_bar_item" id="class_info">
                    <i class="fa-solid fa-magnifying-glass"></i>
                    <span>My Class</span>
                </li>
                <li class="side_bar_item">
                    <i class="fa-solid fa-book-open-reader"></i> 
                    <span>Grading</span>
                </li>
                <li class="side_bar_item">
                    <i class="fa-regular fa-pen-to-square"></i>
                    <span>My Schedules</span>
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
            <div class="progress_bar" style="background: #eff9f6;"></div>
        </div>
    </div>
`

component.teacherProfile = `
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
            // <div class="mb-3">
            //     <label for="degree_pic" class="form-label">Degrees</label>
            //     <input id="degree_pic" type="file" class="form-control" autocomplete="off" multiple>
            // </div>
            <button id="save_profile" class="btn btn-primary">Save change</button>
        </form>
    </div>
`

export {component}