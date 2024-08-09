const form = document.getElementById("form");
const firstname_input = document.getElementById("username-input");
const email_input = document.getElementById("email-input");
const password_input = document.getElementById("password-input");
const repeat_password_input = document.getElementById("repeat-password-input");
const error_message = document.getElementById("error-message");
const register_btn = document.getElementById("register-btn");

// if there are empty values then disable the register button
register_btn.disabled = true;

// error_message.style.display = 'none';
error_message.style.visibility = "hidden";

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
    errors = getLoginFormErrors(email_input.value, password_input.value);
  }

  if (errors.length > 0) {
    // If there are any errors
    e.preventDefault();
    // error_message.style.display = "block";
    error_message.style.visibility = "visible";
    // error_message.innerText = errors.join(". ");
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
    email_input.parentElement.classList.add("incorrect");
  }
  if (password === "" || password == null) {
    errors.push("Password is required");
    password_input.parentElement.classList.add("incorrect");
  }
  if (errors.length === 0) {
    register_btn.disabled = false;
  }
  return errors;
}

const allInputs = [
  firstname_input,
  email_input,
  password_input,
  repeat_password_input,
].filter((input) => input != null);

allInputs.forEach((input) => {
  input.addEventListener("input", () => {
    error_message.style.visibility = "hidden";
    if (input.parentElement.classList.contains("incorrect")) {
      input.parentElement.classList.remove("incorrect");
      error_message.innerText = "";
    }
  });
});

//TODO submit button disable on wrong inputs
// username validation for keyup and ajax check
firstname_input.onblur = (e) => {
  let username = firstname_input.value;
  if (username.length < 3) {
    firstname_input.parentElement.classList.add("incorrect");
    error_message.style.visibility = "visible";
    error_message.innerText = "Username must have at least 3 characters";
    register_btn.disabled = true;
  }
};
firstname_input.onkeyup = (e) => {
  //
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
    // register_btn.disabled = false;
    //goto ajax
    $.ajax({
      url: "libs/check_available.php",
      method: "POST",
      data: {
        username: username,
      },
      success: (data) => {
        if (data) {
          // console.log(data);
          console.log("good:)");
        }
      },
    });
  }
};

// let empty = 3;
// // email validation
// email_input.onkeyup = (e) => {
//   if (email_input.value.length.length !== 0) {
//     empty--;
//     console.log("empty: " + empty);
//   }
// };

// // password validation
// password_input.onkeyup = (e) => {
//   if (password_input.value.length.length !== 0) {
//     empty--;
//     console.log("empty: " + empty);
//   }
// };
// repeat_password_input.onkeyup = (e) => {
//   if (
//     repeat_password_input.value.length !== 0 ||
//     password_input.value !== repeat_password_input.value
//   ) {
//     empty--;
//     console.log("empty or no match: " + empty);
//   }
// };
// if (empty === 0) {
//   register_btn.disabled = false;
// }
console.log("email length ", email_input.value.length);
console.log("password length ", password_input.value.length);
if (email_input.value.length !== 0 && password_input.value.length !== 0) {
  console.log("filled!");
  register_btn.disabled = false;
}
