'use strict';

const loginModal = document.getElementById('login-modal');
const mainContent = document.getElementById('main-content');
const logoutBtn = document.getElementById('btn-logout');

let currentUser = JSON.parse(getFromStorage('currentUser'));

///////////////////////////////////////////////////////////////
// WELCOME PAGE AFTER LOGIN
if (currentUser) {
  // Hide login modal
  loginModal.style.display = 'none';

  // Adjust welcome message when login successfully
  mainContent.firstElementChild.textContent = `Welcome ${currentUser.firstName}`;
} else {
  // Hide logout button and welcome message before login
  mainContent.style.display = 'none';
}
///////////////////////////////////////////////////////////////
// LOGOUT BUTTON CLICKED EVENT
logoutBtn.addEventListener('click', function () {
  // Remove current user from local storage
  localStorage.removeItem('currentUser');

  // Navigate to login page
  window.location.href = './pages/login.html';
});
