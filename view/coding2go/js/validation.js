const form = document.getElementById("form");
const firstname_input = document.getElementById("username-input");
const email_input = document.getElementById("email-input");
const log_email_input = document.getElementById("log-email-input");
const password_input = document.getElementById("password-input");
const repeat_password_input = document.getElementById("repeat-password-input");
const error_message = document.getElementById("error-message");
const log_error_message = document.getElementById("log-error-message");
const register_btn = document.getElementById("register-btn");
let taken = false;

// if there are empty values then disable the register button
if(register_btn) {
  register_btn.disabled = true;
}

// error_message.style.display = 'none';
if(error_message) {
  error_message.style.visibility = "hidden";
} else if(log_error_message) {
  log_error_message.style.visibility = "hidden";
}

//on submit if all inputs are filled in then submit the form
form.addEventListener("submit", (e) => {
  let errors = [];

  if (firstname_input) {
    // If we have a firstname input then we are in the signup
    errors = getSignupFormErrors(
      firstname_input.value,
      email_input.value,
      password_input.value,
      repeat_password_input.value
    );
  } else {
    // If we don't have a firstname input then we are in the login
    console.log("login");
    errors = getLoginFormErrors(log_email_input.value, password_input.value);
  }

  if (errors.length > 0) {
    // If there are any errors
    e.preventDefault();
    if(error_message) {
      error_message.style.visibility = "visible";
    } else if(log_error_message) {
      log_error_message.style.visibility = "visible";
    }
    error_message.innerText = errors[0];
  }
});

function getSignupFormErrors(firstname, email, password, repeatPassword) {
  let errors = [];

  if (firstname === "" || firstname == null) {
    errors.push("Username is required");
    firstname_input.parentElement.classList.add("incorrect");
  }
  if (/^[a-zA-Z0-9]*$/.test(firstname) === false) {
    errors.push("Username must be letters and numbers only");
    firstname_input.parentElement.classList.add("incorrect");
  }
  if (email === "" || email == null) {
    errors.push("Email is required");
    email_input.parentElement.classList.add("incorrect");
  }
  if (password === "" || password == null) {
    errors.push("Password is required");
    password_input.parentElement.classList.add("incorrect");
  }
  if (repeatPassword === "" || repeatPassword == null) {
    errors.push("Repeat Password");
    repeat_password_input.parentElement.classList.add("incorrect");
  }
  if (password.length < 3) {
    errors.push("Password must have at least 3 characters");
    password_input.parentElement.classList.add("incorrect");
  }
  if (password !== repeatPassword) {
    errors.push("Password does not match repeated password");
    password_input.parentElement.classList.add("incorrect");
    repeat_password_input.parentElement.classList.add("incorrect");
  }

  return errors;
}

function getLoginFormErrors(email, password) {
  let errors = [];

  if (email === "" || email == null) {
    errors.push("Email is required");
    log_email_input.parentElement.classList.add("incorrect");
  }
  if (password === "" || password == null) {
    errors.push("Password is required");
    password_input.parentElement.classList.add("incorrect");
  }
  if (errors.length === 0) {
    if(register_btn) {
      register_btn.disabled = false;
    }
  }
  return errors;
}

const allInputs = [
  firstname_input,
  email_input,
  log_email_input,
  password_input,
  repeat_password_input,
].filter((input) => input != null);

allInputs.forEach((input) => {
  input.addEventListener("input", () => {
    enableSubmitButton();
    if(error_message) {
      error_message.style.visibility = "hidden";
    } else if(log_error_message) {
      log_error_message.style.visibility = "hidden";
    }
    if (input.parentElement.classList.contains("incorrect")) {
      input.parentElement.classList.remove("incorrect");
      error_message.innerText = "";
    }
  });
});

// function for submit button enable or disable
function enableSubmitButton() {
  if(!register_btn){
    return;
  }
  register_btn.disabled = true;
  let username = firstname_input.value;
  let email = email_input.value;
  let password = password_input.value;
  let repeat_password = repeat_password_input.value;
  // if all inputs are filled in then enable the register button
  if (username.length > 2 && email.length > 4 && password.length > 2 && repeat_password.length > 2 && taken === false) { 
    register_btn.disabled = false;
  }
}

// registration form username validation for keyup and ajax check
if(firstname_input) {
  firstname_input.onblur = (e) => {
    let username = firstname_input.value;
    if (username.length < 3) {
      firstname_input.parentElement.classList.add("incorrect");
      error_message.style.visibility = "visible";
      error_message.innerText = "Username must have at least 3 characters";
      register_btn.disabled = true;
    }
    enableSubmitButton();
  };

  // registration form username validation for keyup and ajax check
  firstname_input.onkeyup = (e) => {
    let username = firstname_input.value;
    if (username.length < 3) {
      // console.log(errors);
      firstname_input.parentElement.classList.add("incorrect");
      error_message.style.visibility = "visible";
      error_message.innerText = "Username must have at least 3 characters";
      register_btn.disabled = true;
    } else if (/^[a-zA-Z0-9]*$/.test(username) === false) {
      firstname_input.parentElement.classList.add("incorrect");
      // error_message.style.display = "block";
      error_message.style.visibility = "visible";
      error_message.innerText = "Username must be letters and numbers only";
      register_btn.disabled = true;
    } else {
      // error_message.style.display = "none";
      error_message.style.visibility = "hidden";
      firstname_input.parentElement.classList.remove("incorrect");
      enableSubmitButton();
      //goto ajax
      $.ajax({
        url: "libs/check_available.php",
        method: "POST",
        data: {
          username: username,
        },
        success: (data) => {
          if (data == 1 ) {
            console.log('error');
            taken = true;
            firstname_input.parentElement.classList.add("incorrect");
            error_message.style.visibility = "visible";
            error_message.innerText = "Username already taken";
            register_btn.disabled = true;
          } else {
            taken = false;
            register_btn.disabled = false;
          }
        },
      });
    }
  };
  //email validation and ajax check
  email_input.onkeyup = (e) => {
    let email = email_input.value;
    // if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email) === false) {
    if (email.length < 4) {
      email_input.parentElement.classList.add("incorrect");
      error_message.style.visibility = "visible";
      error_message.innerText = "Invalid email";
      register_btn.disabled = true;
    } else {
      error_message.style.visibility = "hidden";
      email_input.parentElement.classList.remove("incorrect");
      enableSubmitButton();
      $.ajax({
        url: "libs/check_available.php",
        method: "POST",
        data: {
          email: email,
        },
        success: (data) => {
          if (data == 1 ) {
            taken = true;
            email_input.parentElement.classList.add("incorrect");
            error_message.style.visibility = "visible";
            error_message.innerText = "Email already taken";
            register_btn.disabled = true;
          } else {
            taken = false;
            register_btn.disabled = false;
          }
        },
      });
    }
  };
}