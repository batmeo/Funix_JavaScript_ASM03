'use strict';

const firstName = document.getElementById('input-firstname');
const lastName = document.getElementById('input-lastname');
const username = document.getElementById('input-username');
const password = document.getElementById('input-password');
const confirmedPassword = document.getElementById('input-password-confirm');
const registerBtn = document.getElementById('btn-submit');

const KEY = 'USER_ARRAY';
let userArr = JSON.parse(getFromStorage(KEY)) || [];

///////////////////////////////////////////////////////////////
// CHECK VALID DATA IN REGISTER FORM
function isValidated(data) {
  const valid =
    data.firstName &&
    data.lastName &&
    data.username &&
    data.password &&
    confirmedPassword.value;

  // Check blank field
  if (!valid) alert('Please fulfill all blanks in the form');
  // Check password length < 8
  else if (data.password.length < 8)
    alert('Password must be at least 8 characters');
  // Check pw and confirmed pw are not the same
  else if (data.password !== confirmedPassword.value)
    alert("Password hasn't been confirmed");
  // Check username whether it's exist or not
  else {
    if (userArr.length !== 0) {
      for (let i = 0; i < userArr.length; i++) {
        if (userArr[i].username === data.username) {
          alert(
            'This username is already existed! Please choose another username! '
          );
          return false;
        }
      }
      return true;
    } else return true;
  }
}
///////////////////////////////////////////////////////////////
// GET DATA FROM REGISTER FORM
function getDataFromForm() {
  const data = new User(
    firstName.value,
    lastName.value,
    username.value,
    password.value
  );

  // Check valid data
  if (isValidated(data)) {
    // Add valid user into user array
    userArr.push(data);

    // Save data to local storage
    saveToStorage(KEY, JSON.stringify(userArr));

    // Navigate to login page
    window.location.href = './login.html';
  }
}
///////////////////////////////////////////////////////////////
//  REGISTER BUTTON CLICKED EVENT
registerBtn.addEventListener('click', getDataFromForm);
