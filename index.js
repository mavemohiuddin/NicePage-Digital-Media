// Default Funcions

const select = (type, name) => {
    if (type == 1) {
        return document.querySelector(name);
    } else if (type == "a") {
        return document.querySelectorAll(name);
    } else if (type == "#") {
        return document.getElementById(name);
    } else if (type == ".") {
        return document.getElementsByClassName(name);
    }
}

const create = (name, id, cls, htm, child) => {
    let elem = document.createElement(name);
    if (id != 1) {
        elem.setAttribute("id", id);
    }
    if (cls != 1) {
        elem.classList.add(cls);
    }
    if (htm != 1) {
        elem.innerHTML = htm;
    }
    if (child != 1) {
        elem.appendChild(child);
    }
    return elem;
}

// Slideshow Automation

let animation_duration = 3;

const slide_next = (move) => {
    Array.from(select(".", "slide")).map(function(me) {
        let pos = me.getAttribute("data-status");
        let new_pos = pos;
        if (move == "plus") {
            new_pos++;
        } else {
            new_pos--;
        }
        if (new_pos > 4) {
            new_pos = 1;
        } else if (new_pos <=0) {
            new_pos = 4;
        }
        me.setAttribute("data-status", new_pos);
    });
}

const auto_slide = () => {
    if (animation_duration > 0) {
        animation_duration--;
        setTimeout(function() {
            auto_slide();
        }, 1000);
    } else {
        slide_next("plus");
        animation_duration = 3;
        auto_slide();
    }
}
auto_slide();

slide_next("plus");

// Slideshow pause on hover

select(1, ".slideshow_container").addEventListener("mouseleave", () => {
    animation_duration = 2;
});

select(1, ".slideshow_container").addEventListener("mouseover", () => {
    animation_duration = 300000;
});

// Slideshow Manual Slide

select(1, ".scroll_back").addEventListener("click", () => {
    slide_next("minus");
});
select(1, ".scroll_front").addEventListener("click", () => {
    slide_next("plus");
});

// Color Website background color
const update_color = () => {
    for (i in user_db) {
        if (select(1, "body").getAttribute("data-id") == user_db[i][4]) {
            select(1, "body").setAttribute("data-color", user_db[i][3])
        }
    }
    
}

// Popup Screen Creation

let popup_screen = select(1, "[data-type='popup']");
let popup_content_box = select(1, ".popup_content_box");

// Closing popup screen
select(1, ".popup_close").addEventListener("click", () => close_popup());

const close_popup = () => {
    popup_screen.classList.remove("fly_up_visible");
    popup_content_box.innerHTML = "";
    popup_screen.setAttribute("data-value", "none");
};

// Formula for creating form field
const form_field = (id, label, type) => {
    let pop_name_label = create("label", 1, "form_label", label, 1);
    let pop_name_input = create("input", id, id, 1, 1);
    pop_name_input.setAttribute("type", type);
    pop_name_label.setAttribute("for", id);
    let pop_field = create("form_field", 1, "form_field", 1, pop_name_label);
    pop_field.appendChild(pop_name_input);
    pop_field.classList.add("is_flex_column")
    return pop_field;
}

// Creating popup content for contact form
const contact_form = () => {
    popup_screen.classList.add("fly_up_visible");
    popup_screen.setAttribute("data-value", "contact");

    let pop_heading = create("p", 1, "pop_heading", "Contact Us", 1);
    let pop_body = create("div", 1, "pop_body", 1, pop_heading);

    // Creating form fields
    let pop_field1 = form_field("contact_name", "Name", "text");
    let pop_field2 = form_field("contact_email", "Email", "text");
    let pop_field3 = form_field("contact_topic", "Topic", "text");
    let pop_field4 = form_field("contact_body", "Message", "text");

    // Creating checkbox & Submit button
    let conscent = create("input", "contact_conscent", "contact_conscent", 1, 1);
    conscent.setAttribute("type", "checkbox");
    conscent.setAttribute("checked", "true");
    let conscent_label = create("label", 1, 1, "Recieve promitional email", 1);
    let pop_check_field = create("form_field", 1, "form_field", 1, conscent);
    pop_check_field.classList.add("is_flex");
    pop_check_field.classList.add("checkbox_field");
    pop_check_field.appendChild(conscent_label);

    // Creating Submit button
    let submit_button = create("div", "contact_submit", "contact_submit", "Send", 1);
    submit_button.classList.add("block_button");
    submit_button.classList.add("is_flex");
    submit_button.classList.add("is_center");
    submit_button.classList.add("is_pointer");
    submit_button.style.padding = "10px 40px";
    pop_check_field.appendChild(submit_button);

    // Arranging fields
    let pop_form = create("form", 1, "pop_form", 1, pop_field1);
    pop_form.appendChild(pop_field2);
    pop_form.appendChild(pop_field3);
    pop_form.appendChild(pop_field4);
    pop_form.appendChild(pop_check_field);
    pop_form.classList.add("is_flex_colulm");
    pop_form.classList.add("is_center");

    pop_body.appendChild(pop_form);

    popup_content_box.appendChild(pop_body);

    refresh_field_lebel_listener();
}

// Creating popup content for gallery
const gallery = () => {
    popup_screen.classList.add("fly_up_visible");
    popup_screen.setAttribute("data-value", "gallery");

    let pop_heading = create("p", 1, "pop_heading", "Gallery", 1);
    let pop_body = create("div", 1, "pop_body", 1, pop_heading);
    
    let open_image_container = create("div", 1, "open_image_container", 1, 1);
    open_image_container.classList.add("is_flex");
    open_image_container.classList.add("is_center");

    let image_gallery = create("div", 1, "pop_image_list", 1, 1);
    image_gallery.classList.add("is_flex");
    image_gallery.classList.add("is_center");

    Array.from(select("a", ".gallery_image")).map((me) => {
        let list_image = create("img", 1, "pop_gallery_list", 1, 1);
        list_image.setAttribute("src", me.getAttribute("src"));
        let list_image_container = create("div", 1, "list_image_container", 1, 1);
        list_image_container.classList.add("is_flex");
        list_image_container.classList.add("is_center");
        list_image_container.classList.add("is_pointer");
        list_image_container.appendChild(list_image);
        image_gallery.appendChild(list_image_container);
    })

    setTimeout(() => {
        Array.from(select("a", ".list_image_container")).map((me) => me.addEventListener("click", (click) => open_image(click)));
    }, 300)

    setTimeout(() => {
        let open_image_file = create("img", 1, "open_image_file", 1, 1);
        let open_image_src = select(1, ".pop_gallery_list").getAttribute("src");
        open_image_file.setAttribute("src", open_image_src);
        open_image_container.appendChild(open_image_file)
    }, 300);

    pop_body.appendChild(open_image_container);
    pop_body.appendChild(image_gallery);
    popup_content_box.appendChild(pop_body);

}

const open_image = (click) => {
    select(1, ".open_image_container").innerHTML = "";
    let new_image = create("img", 1, "open_image_file", 1, 1);
    new_image.setAttribute("src", click.target.getAttribute("src"));
    select(1, ".open_image_container").appendChild(new_image);
}

// Creating video pop up
const details = () => {
    popup_screen.classList.add("fly_up_visible");
    popup_screen.setAttribute("data-value", "details");

    let pop_heading = create("p", 1, "pop_heading", "Details", 1);
    let pop_body = create("div", 1, "pop_body", 1, pop_heading);
    pop_body.classList.add("is_flex");

    let video = create("video", 1, "pop_video", 1, 1);
    video.setAttribute("src", select(1, ".video").getAttribute("src"));
    video.setAttribute("autoplay", "true");
    video.setAttribute("loop", "true");
    video.setAttribute("muted", "true");
    video.setAttribute("controls", "true");

    let pop_content_heading = create("h2", 1, "section_heading", select(1, ".about_heading").innerHTML, 1);
    let pop_content1 = create("p", 1, "section_content", select(1, ".about_content1").innerHTML, 1);
    let pop_content2 = create("p", 1, "section_content", select(1, ".about_content2").innerHTML, 1);
    let pop_content3 = create("p", 1, "section_content", select(1, ".about_content3").innerHTML, 1);

    let column1 = create("div", 1, "column", 1, 1);
    let column2 = create("div", 1, "column", 1, 1);
    column1.appendChild(video);
    column1.appendChild(pop_content_heading);
    column1.appendChild(pop_content1);
    column2.appendChild(pop_content2);
    column2.appendChild(pop_content3);

    column1.classList.add("is_flex_column");
    column2.classList.add("is_flex_column");

    pop_body.appendChild(column1);
    pop_body.appendChild(column2);
    popup_content_box.appendChild(pop_body);
}

// Deciding login status

const account = () => {
    let sign_status = select(1, ".body").getAttribute("data-signed");
    if (sign_status == "signup") {
        signup();
    } else if (sign_status == "login") {
        login();
    } else if (sign_status == "logged") {
        logged();
    }
}

// Crating sign up form
const signup = () => {
    popup_screen.classList.add("fly_up_visible");
    popup_screen.setAttribute("data-value", "account");

    let pop_heading = create("p", 1, "pop_heading", "Sign Up", 1);
    let pop_body = create("div", 1, "pop_body", 1, pop_heading);

    let signup_handle = form_field("signup_handle", "Handle", "text");
    let signup_name = form_field("signup_name", "Name", "text");
    let signup_about = form_field("signup_about", "About", "text");

    let color_title = create("h3", 1, "color_heading", "What is your favorite color?", 1);
    let color_option1 = create("div", 1, "color_red", 1, 1);
    color_option1.setAttribute("data-color", "red");
    let color_option2 = create("div", 1, "color_green", 1, 1);
    color_option2.setAttribute("data-color", "green");
    let color_option3 = create("div", 1, "color_blue", 1, 1);
    color_option3.setAttribute("data-color", "blue");
    let color_option4 = create("div", 1, "color_orange", 1, 1);
    color_option4.setAttribute("data-color", "orange");
    let color_option5 = create("div", 1, "color_hotpink", 1, 1);
    color_option5.setAttribute("data-color", "hotpink");

    let color_palette = create("div", 1, "color_palette", 1, color_option1);
    color_palette.setAttribute("data-selected-color", "null");
    color_palette.classList.add("is_flex");
    color_palette.appendChild(color_option2);
    color_palette.appendChild(color_option3);
    color_palette.appendChild(color_option4);
    color_palette.appendChild(color_option5);

    setTimeout(() => {
        let all_color = Array.from(select(1, ".color_palette").children);
        all_color.map((me) => {
            me.addEventListener("click", (click) => {
                all_color.map((me) => me.classList.remove("selected_color"));
                click.target.classList.add("selected_color");
                let selected_color = click.target.getAttribute("data-color")
                select(1, "[data-selected-color]").setAttribute("data-selected-color", selected_color);
            });
        })
    }, 300);

    let login_instead = create("div", 1, "login_instead", "Log In Instead", 1);
    login_instead.setAttribute("onclick", "login_instead()")
    let signup_button = create("div", 1, "signup_confirm", "Submit", 1);
    signup_button.classList.add("block_button");
    signup_button.classList.add("is_flex");
    signup_button.classList.add("is_pointer");
    signup_button.classList.add("is_center");
    signup_button.setAttribute("onclick", "add_user()");
    let confirm_div = create("div", 1, "signup_buttons", 1, login_instead);
    confirm_div.appendChild(signup_button);
    confirm_div.classList.add("is_flex");
    confirm_div.classList.add("is_aside");
    
    pop_body.appendChild(signup_name);
    pop_body.appendChild(signup_handle);
    pop_body.appendChild(signup_about);
    pop_body.appendChild(color_title);
    pop_body.appendChild(color_palette);
    pop_body.appendChild(confirm_div);
    popup_content_box.appendChild(pop_body);
    
    refresh_field_lebel_listener();
}

// Creating login form
const login = () => {
    popup_screen.classList.add("fly_up_visible");
    popup_screen.setAttribute("data-value", "account");

    let signup_instead_text = create("p", 1, 1, "Don't have account?", 1);
    let signup_instead_btn = create("p", 1, "signup_instead_btn", "Signup Instead.", 1);
    signup_instead_btn.setAttribute("onclick", "signup_instead()")
    let signup_instead_container = create("div", 1, "signup_instead_container", 1, signup_instead_text);
    signup_instead_container.classList.add("is_flex");
    signup_instead_container.classList.add("is_center");
    signup_instead_container.appendChild(signup_instead_btn);

    let pop_heading = create("p", 1, "pop_heading", "Log in", 1);
    let pop_body = create("div", 1, "pop_body", 1, pop_heading);

    let login_handle = form_field("login_handle", "Handle", "text");
    let login_name = form_field("loging_password", "Name", "text");

    let login_button = create("div", 1, "login_confirm", "Submit", 1);
    login_button.classList.add("block_button");
    login_button.classList.add("is_flex");
    login_button.classList.add("is_pointer");
    login_button.classList.add("is_center");
    login_button.setAttribute("onclick", "login_user()");
    let login_forgot = create("p", 1, "lost_password", "Forgot password", 1)
    let confirm_div = create("div", 1, "form_field", 1, login_button);
    confirm_div.appendChild(login_forgot);
    confirm_div.classList.add("is_flex_reverse");
    confirm_div.classList.add("is_aside");
    
    pop_body.appendChild(signup_instead_container);
    pop_body.appendChild(login_name);
    pop_body.appendChild(login_handle);
    pop_body.appendChild(confirm_div);
    popup_content_box.appendChild(pop_body);
    
    refresh_field_lebel_listener();
}

const login_instead = () => {
    close_popup();
    select(1, "body").setAttribute("data-signed", "login");
    setTimeout(() => account(), 500);
}

const signup_instead = () => {
    close_popup();
    select(1, "body").setAttribute("data-signed", "signup");
    setTimeout(() => account(), 500);
}

// Creating Account form
const logged = () => {
    popup_screen.classList.add("fly_up_visible");
    popup_screen.setAttribute("data-value", "account");

    if (select(1, "body").getAttribute("data-id") == "id") {
        select(1, "body").setAttribute("data-id", user_db[0][4]);
    }

    let pop_img_change = create("div", 1, "pop_img_change", 1, 1);
    let pop_img = create("div", 1, "pop_img", 1, pop_img_change);
    pop_img.setAttribute("data-color", user_db[0][3]);
    let pop_body = create("div", 1, "pop_body", 1, pop_img);

    let pop_name = create("h2", 1, "section_heading", user_db[0][0], 1);
    let pop_surname = create("p", 1, "section_content", user_db[0][0], 1);
    let pop_about = create("p", 1, "section_content", user_db[0][2], 1);
    pop_name.classList.add("pop_heading");
    pop_surname.classList.add("pop_surname");
    pop_about.classList.add("pop_about");
    
    for (x in user_db) {
        if (select(1, "body").getAttribute("data-id") == user_db[x][4]) {
            pop_img.setAttribute("data-color", user_db[x][3]);
            pop_name.innerHTML = user_db[x][0];
            pop_surname.innerHTML = user_db[x][1];
            pop_about.innerHTML = user_db[x][2];
        }
    }

    let log_out = create("div", 1, "log_out", "Log Out", 1);
    log_out.setAttribute("onclick", "user_logout()")
    let user_list = create("div", 1, "user_list", 1, log_out);
    user_list.classList.add("is_flex");
    user_list.classList.add("is_aside");
    let user_list_container = create("div", 1, "user_list_container", 1, 1);
    user_list_container.classList.add("is_flex");
    user_db.map((user) => {
        let user_profile = create("div", 1, "user", 1, 1);
        user_profile.setAttribute("data-color", user[3]);
        user_profile.setAttribute("data-id", user[4]);
        user_list_container.appendChild(user_profile);
    });
    user_list.appendChild(user_list_container);

    setTimeout(() => {
        Array.from(select("a", ".user")).map((item) => item.addEventListener("click", (click) => update_user_info(click)))
    }, 300)
    
    pop_body.appendChild(pop_name);
    pop_body.appendChild(pop_surname);
    pop_body.appendChild(pop_about);
    pop_body.appendChild(user_list);
    popup_content_box.appendChild(pop_body);
}

const update_user_info = (click) => {
    user_db.map((user) => {
        if (user[4] == click.target.getAttribute("data-id")) {
            select(1, "body").setAttribute("data-id", user[4]);
            select(1, ".pop_img").setAttribute("data-color", user[3]);
            select(1, ".pop_surname").innerHTML = user[1];
            select(1, ".pop_heading").innerHTML = user[0];
            select(1, ".pop_about").innerHTML = user[2];
            update_color();
        };
    })
}

// Logging out user
const user_logout = () => {
    close_popup();
    select(1, "body").setAttribute("data-signed", "signup");
    select(1, "body").setAttribute("data-color", "null");
    select(1, "body").setAttribute("data-id", "id");
}

// Adding new user
const add_user = () => {
    let user_eval = 0;
    let input_handle = select(1, "#signup_handle").value;
    let input_name = select(1, "#signup_name").value;
    let input_about = select(1, "#signup_about").value;
    let input_color = select(1, ".color_palette").getAttribute("data-selected-color");
    if (input_eval(input_handle.length, 8, 16)) {
        user_eval++;
    }
    if (input_eval(input_name.length, 4, 12)) {
        user_eval++;
    }
    if (input_eval(input_about.length, 20, 50)) {
        user_eval++;
        
    }
    if (input_color != "null") {
        user_eval++;
    }
    if (user_eval >= 4) {
        
        let item = new all_user(input_name, input_handle, input_about, input_color);

        close_popup();
        select(1, "body").setAttribute("data-signed", "login");
        setTimeout(() => account(), 500);
        
    }
}

// Logging in user
const login_user = () => {
    let input_handle = select(1, "#login_handle").value;
    let input_name = select(1, "#loging_password").value;
    let input_error_text = create("p", 1, "input_error_text", ". . .", 1);

    for (i in user_db) {
        if (user_db[i][0] == input_name) {
            if (user_db[i][1] == input_handle) {
                select(1, "body").setAttribute("data-signed", "logged");
                select(1, "body").setAttribute("data-id", user_db[i][4]);
                input_error_text.innerHTML = `Welcome ${input_name}! 😀`;
                setTimeout(() => {
                    close_popup();
                    setTimeout(() => {
                        account();
                        update_color()
                    }, 500);
                }, 3300);
                console.log("Both matched");
            } else {
                input_error_text.innerHTML = `Sorry! Incorrect Handle!`;
                console.log("Only handle matched");
            }
        } else {
            if (input_error_text.innerHTML == "Please fill form field!") {
                input_error_text.innerHTML = `Sorry! Incorrect Name!`;
                console.log("None matched");
            }
        }
    }
    select(1, ".popup_content_box").appendChild(input_error_text);
    setTimeout(() => select(1, ".input_error_text").remove(), 3000)
}


const input_eval = (item, low, high) => {
    if (low > item) {
        return false;
    } else if ( item > high ) {
        return false;
    } else {
        return true;
    }
}

// Styling Form animations
const field_clicked = (click) => {
    let parent = click.target.parentElement;
    let form_helper = create("p", 1, "form_helper", "Please fill this field", 1);
    parent.children[0].classList.add("is_focsed");

    if (parent.children[0].innerHTML == "Handle") {
        form_helper.innerHTML = "Between 8 and 16 chars";
    } else if (parent.children[0].innerHTML == "Name") {
        form_helper.innerHTML = "Between 4 and 12 chars";
    } else if (parent.children[0].innerHTML == "About") {
        form_helper.innerHTML = "Between 20 and 50 chars";
    }

    if (click.target.getAttribute("type") == "text") {
        parent.appendChild(form_helper);
    }
}
const field_unclicked = (click) => {
    let parent = click.target.parentElement;
    // parent.removeChild(parent.childNodes[2]);
    var faulty_child = 0;
    Array.from(parent.children).map((item) => {
        Array.from(item.classList).map((cls) => {
            if (cls == "form_helper") { 
                faulty_child = item;
            }
        })
    });
    if (faulty_child != 0) {
        faulty_child.remove();
    }
    
    if (click.target.value.length == 0) {
        parent.children[0].classList.remove("is_focsed");
    }

    if (parent.children[0].innerHTML == "Handle") {
        field_correction_check(parent, 8, 16);
    } else if (parent.children[0].innerHTML == "Name") {
        field_correction_check(parent, 4, 12);
    } else if (parent.children[0].innerHTML == "About") {
        field_correction_check(parent, 20, 50);
    }
}

const field_correction_check = (parent, low, high) => {
    if (parent.children[1].value.length < low) {
        parent.children[1].classList.add("is_incorrect");
        parent.children[1].classList.remove("is_correct");
    } else if (parent.children[1].value.length > high) {
        parent.children[1].classList.add("is_incorrect");
        parent.children[1].classList.remove("is_correct");
    } else {
        parent.children[1].classList.add("is_correct");
        parent.children[1].classList.remove("is_incorrect");
    }
}

const refresh_field_lebel_listener = () => {
    if (popup_screen.getAttribute("data-value") == "contact") {
        let all_feilds = popup_screen.querySelectorAll("input");
        Array.from(all_feilds).map((me) => me.addEventListener("focus", (click) => field_clicked(click)));
        Array.from(all_feilds).map((me) => me.addEventListener("blur", (click) => field_unclicked(click)));
    } else if (popup_screen.getAttribute("data-value") == "account") {
        let all_feilds = popup_screen.querySelectorAll("input");
        Array.from(all_feilds).map((me) => me.addEventListener("focus", (click) => field_clicked(click)));
        Array.from(all_feilds).map((me) => me.addEventListener("blur", (click) => field_unclicked(click)));
    }
}

// User account info
let user_db = [];
let this_user = [];
let all_id = [];

class all_user {
    constructor(name, handle, about, color) {
        let random_id = "";
        for (let i = 0; i < 5; i++) {
            random_id += Math.ceil(Math.random() * 10);
        }
        this_user.push(name, handle, about, color, random_id);
        user_db.push(this_user);
        this_user = [];
    }
}

user1 = new all_user("Admin Red", "admin", "Red color palette for spicy mood", "red");
user2 = new all_user("Admin Green", "admin", "Green look for the calm mind", "green");
user3 = new all_user("Admin Blue", "admin", "Peace of mind with the peaceful Blue", "blue");
