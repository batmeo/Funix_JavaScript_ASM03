'use strict';

const username = document.getElementById('input-username');
const password = document.getElementById('input-password');
const loginBtn = document.getElementById('btn-submit');

const KEY = 'USER_ARRAY';
let userArr = JSON.parse(getFromStorage(KEY)) || [];
let currentUser;

///////////////////////////////////////////////////////////////
// CHECK VALID USERNAME AND PASSWORD

///////////////////////////////////////////////////////////////
// LOGIN FUNCTION
function login() {
  // Check valid username and password
  const valid = username.value && password.value;
  if (!valid) alert('Please input your username and password');
  else {
    // Get the current user if login successfully
    currentUser = userArr.find(user => user.username === username.value);
    if (currentUser?.password === password.value) {
      // Save current user to local storage
      saveToStorage('currentUser', JSON.stringify(currentUser));
      window.location.href = '../index.html';
    } else {
      alert('Your username and password are wrong!');
      return false;
    }
  }
}
// Save current user to local storage

///////////////////////////////////////////////////////////////
//  LOGIN BUTTON CLICKED EVENT
loginBtn.addEventListener('click', login);
