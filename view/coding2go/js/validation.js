const form = document.getElementById('form')
const firstname_input = document.getElementById('username-input')
const email_input = document.getElementById('email-input')
const password_input = document.getElementById('password-input')
const repeat_password_input = document.getElementById('repeat-password-input')
const error_message = document.getElementById('error-message')

error_message.style.display = 'none';

form.addEventListener('submit', (e) => {
  let errors = []


  if(firstname_input){
    // If we have a firstname input then we are in the signup
    errors = getSignupFormErrors(firstname_input.value, email_input.value, password_input.value, repeat_password_input.value)
  }
  else{
    // If we don't have a firstname input then we are in the login
    errors = getLoginFormErrors(email_input.value, password_input.value)
  }

  if(errors.length > 0){
    // If there are any errors
    e.preventDefault()
    error_message.style.display = 'block'
    error_message.innerText  = errors.join(". ")
  }
})

function getSignupFormErrors(firstname, email, password, repeatPassword){
  let errors = []

  if(firstname === '' || firstname == null){
    errors.push('Username is required')
    firstname_input.parentElement.classList.add('incorrect')
  }
  if(/^[a-zA-Z0-9]*$/.test(firstname) === false){
    errors.push('Username must be letters and numbers only')
    firstname_input.parentElement.classList.add('incorrect')
  }
  if(email === '' || email == null){
    errors.push('Email is required')
    email_input.parentElement.classList.add('incorrect')
  }
  if(password === '' || password == null){
    errors.push('Password is required')
    password_input.parentElement.classList.add('incorrect')
  }
  if(repeatPassword === '' || repeatPassword == null){
    errors.push('Repeat Password')
    repeat_password_input.parentElement.classList.add('incorrect')
  }
  if(password.length < 3){
    errors.push('Password must have at least 3 characters')
    password_input.parentElement.classList.add('incorrect')
  }
  if(password !== repeatPassword){
    errors.push('Password does not match repeated password')
    password_input.parentElement.classList.add('incorrect')
    repeat_password_input.parentElement.classList.add('incorrect')
  }


  return errors;
}

function getLoginFormErrors(email, password){
  let errors = []

  if(email === '' || email == null){
    errors.push('Email is required')
    email_input.parentElement.classList.add('incorrect')
  }
  if(password === '' || password == null){
    errors.push('Password is required')
    password_input.parentElement.classList.add('incorrect')
  }

  return errors;
}

const allInputs = [firstname_input, email_input, password_input, repeat_password_input].filter(input => input != null)

allInputs.forEach(input => {
  input.addEventListener('input', () => {
    error_message.style.display = 'none';
    if(input.parentElement.classList.contains('incorrect')){
      input.parentElement.classList.remove('incorrect')
      error_message.innerText = ''
    }    
  })
})

//TODO submit button disable on wrong inputs
// username validation for keyup and ajax check
firstname_input.onkeyup = (e) => {
  // console.log(firstname_input.value);
  let username = firstname_input.value;
  if(username.length < 3){
    firstname_input.parentElement.classList.add('incorrect');
    error_message.style.display = 'block';
    error_message.innerText = 'Username must have at least 3 characters';
  } else if(/^[a-zA-Z0-9]*$/.test(username) === false){
    firstname_input.parentElement.classList.add('incorrect');
    error_message.style.display = 'block'; 
    error_message.innerText = 'Username must be letters and numbers only';   
  } else {
    error_message.style.display = 'none';
    firstname_input.parentElement.classList.remove('incorrect');
    //goto ajax
    $.ajax({
      url: 'libs/check_available.php',
      method: 'POST',
      data: {
        username: username
      },
      success: (data) => {
        if(data){
          console.log(data);
        }
      }
    })
  }
} 

// email validation
email_input.onkeyup = (e) => {
  console.log(email_input.value);
}

// password validation
password_input.onkeyup = (e) => {
  console.log(password_input.value);
}
repeat_password_input.onkeyup = (e) => {
  console.log(repeat_password_input.value);
}
