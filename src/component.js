const component = {}

component.loginPage = `
    <div class="login_signup_container w3-animate-opacity">
        <div class="welcome_message w3-animate-top">
            <i class="fa-solid fa-graduation-cap"></i>
            <h2>WELCOME TO</h2>
            <h1>OUR SCHOOL</h1>
        </div>
        <div class="form_container w3-animate-right">
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
component.accountCreation = `
    <div class="title">Account Creation</div>
    <div class="content_container">
        <div class="row">
            <form id="teacher_signup_form" class="col" novalidate>
                <div class="mb-3">
                    <label for="teacher_email" class="form-label">Teacher email</label>
                    <input type="email" id="teacher_email" class="form-control" name="email" autocomplete="off" placeholder="teacher@gmail.com">
                    <div class="invalid-feedback" id="teacher_email_error"></div>
                </div>
                <div class="mb-3">
                    <label for="teacher_name" class="form-label">Teacher name</label>
                    <input type="text" id="teacher_name" class="form-control" name="name" autocomplete="off" placeholder="Nguyen Van A">
                    <div class="invalid-feedback" id="teacher_name_error"></div>
                </div>
                <div class="mb-3">
                    <label for="teacher_profession" class="form-label">Profession</label>
                    <input type="text" id="teacher_profession" class="form-control" name="profession" autocomplete="off" placeholder="ABC">
                    <div class="invalid-feedback" id="teacher_profession_error"></div>
                </div>
                <div class="mb-3">
                    <label for="teacher_password" class="form-label">Password</label>
                    <input type="password" id="teacher_password" class="form-control" name="password" autocomplete="off" placeholder="password">
                    <div class="invalid-feedback" id="teacher_password_error"></div>
                </div>
                <div class="mb-3">
                <label for="teacher_confirm_password" class="form-label">Confirm password</label>
                    <input type="password" id="teacher_confirm_password" class="form-control" name="confirmPassword" autocomplete="off" placeholder="confirm password">
                    <div class="invalid-feedback" id="teacher_confirm_password_error"></div>
                </div>
                <button class="signup_btn btn btn-primary mt-1">Add Teacher</button>
            </form>
            <form id="student_signup_form" class="col" novalidate>
                <div class="mb-3">
                    <label for="student_email" class="form-label">Student email</label>
                    <input type="email" id="student_email" class="form-control" name="email" autocomplete="off" placeholder="student@gmail.com">
                    <div class="invalid-feedback" id="student_email_error"></div>
                </div>
                <div class="mb-3">
                    <label for="student_name" class="form-label">Student name</label>
                    <input type="text" id="student_name" class="form-control" name="name" autocomplete="off" placeholder="Nguyen Van B">
                    <div class="invalid-feedback" id="student_name_error"></div>
                </div>
                <div class="mb-3">
                    <label for="student_password" class="form-label">Password</label>
                    <input type="password" id="student_password" class="form-control" name="password" autocomplete="off" placeholder="password">
                    <div class="invalid-feedback" id="student_password_error"></div>
                </div>
                <div class="mb-3">
                <label for="student_confirm_password" class="form-label">Confirm password</label>
                    <input type="password" id="student_confirm_password" class="form-control" name="confirmPassword" autocomplete="off" placeholder="confirm password">
                    <div class="invalid-feedback" id="student_confirm_password_error"></div>
                </div>
                <button class="signup_btn btn btn-primary mt-1">Add Student</button>
            </form>
        </div>
    </div>
`
component.classCreate = `
<div class="modal fade" id="add_class_modal" tabindex="-1">
    <div class="modal-dialog modal-dialog-scrollable modal-fullscreen-md-down modal-lg">
        <div class="modal-content">
            <div class="modal-header">
                <h1 class="modal-title fs-5">Add New Course</h1>
                <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
            </div>
            <div class="modal-body">
                <form id="course_info_form">
                    <div class="mb-3">
                        <label for="course_name" class="form-label">Course name</label>
                        <input id="course_name" type="text" class="form-control" autocomplete="off">
                        <div class="invalid-feedback" id="course_name_error"></div>
                    </div>
                    <div class="mb-3">
                        <label for="class_room" class="form-label">Room</label>
                        <input id="class_room" type="text" class="form-control" autocomplete="off">
                        <div class="invalid-feedback" id="class_room_error"></div>
                    </div>
                    <div class="teacher_select_wrapper mb-3">
                        <div class="form-label">Choose a teacher</div>
                        <div class="select_btn">
                            <input id="teacher_input" type="text" readonly value="...">
                            <i class="fa-solid fa-chevron-down"></i>
                        </div>
                        <div class="invalid-feedback" id="teacher_select_error"></div>
                        <div class="content">
                            <div class="search">
                                <i class="fa-solid fa-magnifying-glass"></i>
                                <input type="text" placeholder="search" autocomplete="off" class="form-control" id="search">
                            </div>
                            <ul class="options"></ul>
                        </div>
                    </div>
                    <div class="mb-3">
                        <label for="course_subject" class="form-label">Subject</label>
                        <input id="course_subject" type="text" class="form-control" disabled>
                    </div>
                    <label for="begin_date" class="form-label">Course duration</label>
                    <div class="input-group mb-3">
                        <span class="input-group-text">From</span>
                        <input id="begin_date" type="week" class="form-control">
                        <span class="input-group-text">To</span>
                        <input id="end_date" type="week" class="form-control">
                        <div class="invalid-feedback" id="course_duration_error"></div>
                    </div>
                    <label for="begin_time" class="form-label">Classes time</label>
                    <div class="input-group mb-3">
                        <span class="input-group-text">From</span>
                        <input id="begin_time" type="time" class="form-control" min="07:00" max="17:00">
                        <span class="input-group-text">To</span>
                        <input id="end_time" type="time" class="form-control" min="07:00" max="17:00">
                        <span class="input-group-text">on</span>
                        <select id="study_day" class="form-select">
                            <option value="..." selected>...</option>
                            <option value="0">Monday</option>
                            <option value="1">Tuesday</option>
                            <option value="2">Wednesday</option>
                            <option value="3">Thursday</option>
                            <option value="4">Friday</option>
                            <option value="5">Saturday</option>
                            <option value="6">Sunday</option>
                        </select>
                        <div class="invalid-feedback" id="course_time_error"></div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        <button type="submit" class="btn btn-primary">Add course</button>
                    </div>
                </form>
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

// component.schoolInfo = `
//     <div class="title">School Info</div>
//     <div class="content_container">
//         <div class="row">
//             <form id="subject_info" class="col">
//                 <div class="mb-3">
//                     <label for="subject_name" class="form-label">Subject name</label>
//                     <input id="subject_name" type="text" class="form-control" autocomplete="off">
//                 </div>
//                 <div class="mb-3">
//                     <label for="subject_code" class="form-label">Subject code</label>
//                     <input id="subject_code" type="text" class="form-control" autocomplete="off">
//                 </div>
//                 <button class="btn btn-primary">Add Subject</button>
//             </form>
//             <form id="current_time" class="col">
//                 <div class="mb-3">
//                     <label for="school_year" class="form-label">School Year</label>
//                     <input id="school_year" type="text" class="form-control" autocomplete="off">
//                 </div>
//                 <div class="mb-3">
//                     <label for="current_semester" class="form-label">Semester</label>
//                     <input id="current_semester" type="text" class="form-control" autocomplete="off">
//                 </div>
//                 <button class="btn btn-primary">Save Change</button>
//             </form>
//         </div>

//         <table class="subject_list table mt-3 table-bordered">
//             <thead>
//                 <tr>
//                     <th scope="col">Name</th>
//                     <th scope="col">Code</th>
//                     <th scope="col"></th>
//                 </tr>
//             </thead>
//             <tbody>
//             </tbody>
//         </table>
//     </div>
// `

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
    <div class="modal fade" id="edit_profile_modal" tabindex="-1">
        <div class="modal-dialog modal-dialog-scrollable modal-fullscreen-md-down modal-lg">
            <div class="modal-content">
                <div class="modal-header">
                    <h1 class="modal-title fs-5">Edit Your Profile</h1>
                    <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                </div>
                <div class="modal-body">
                    <form id="user_info_form" novalidate>
                        <div class="mb-3">
                            <label for="DOB" class="form-label">Date of Birth</label>
                            <input id="DOB" type="date" class="form-control">
                            <div class="invalid-feedback" id="DOB_error"></div>
                        </div>
                        <div class="mb-3">
                            <label for="phone_number" class="form-label">Phone number</label>
                            <input id="phone_number" type="text" class="form-control" placeholder="0555555555" autocomplete="off">
                            <div class="invalid-feedback" id="phone_number_error"></div>
                        </div>
                        <!-- <div class="mb-3">
                            <label for="email" class="form-label">Contact Email</label>
                            <input id="email" type="email" class="form-control" placeholder="@gmail" autocomplete="off">
                        </div> -->
                        <div class="mb-3">
                            <label for="address" class="form-label">Address</label>
                            <input id="address" type="text" class="form-control" autocomplete="off" placeholder="eg. 24 phố A">
                            <div class="invalid-feedback" id="address_error"></div>
                        </div>
                        <div class="mb-3">
                            <label for="gender" class="form-label">Gender</label>
                            <select id="gender" class="form-select">
                                <option selected value="...">...</option>
                                <option value="Male">Male</option>
                                <option value="Female">Female</option>
                                <option value="Other">Other</option>
                            </select>
                            <div class="invalid-feedback" id="gender_error"></div>
                        </div>
                        <div class="mb-3">
                            <label for="study_field" class="form-label">Study Field</label>
                            <input id="study_field" type="text" class="form-control" autocomplete="off" placeholder="eg. Computer Science">
                            <div class="invalid-feedback" id="study_field_error"></div>
                        </div>
                        <!-- <div class="mb-3">
                            <label for="avatar_img" class="form-label">Change Your Image</label>
                            <input id="avatar_img" type="file" accept="image/*" class="form-control">
                        </div> -->
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="submit" class="btn btn-primary">Update profile</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
    <div class="title">Student Profile</div>
    <div class="profile_container">
        <img src="../img/default_avatar.jpg">
        <div class="basic_info_container">
            <h1>Pho Ngoc Song Khue</h1>
            <h2>vckkcv2004@gmail.com</h2>
        </div>
        <button class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#edit_profile_modal">Edit Info</button>
    </div>
    <div class="content_container mt-4">
        <ul class="nav nav-tabs">
            <li class="nav-item">
                <button class="nav-link active" id="basic_info_tab" data-bs-toggle="tab" data-bs-target="#basic_info_tab_pane" type="button">Basic Info</button>
            </li>
            <li class="nav-item">
                <button class="nav-link" id="contact_info_tab" data-bs-toggle="tab" data-bs-target="#contact_info_tab_pane" type="button">Contact Info</button>
            </li>
            </ul>
        <div class="tab-content">
            <div class="tab-pane fade show active" id="basic_info_tab_pane"></div>
            <div class="tab-pane fade" id="contact_info_tab_pane"></div>
        </div>
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
    <div class="content_container">
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
            <button class="btn btn-primary">Save change</button>
        </form>
    </div>
`

export {component}