'use strict';

// Get data from local storage
function getFromStorage(key) {
  return localStorage.getItem(key);
}

// Save data {key: value} to local storage
function saveToStorage(key, value) {
  localStorage.setItem(key, value);
}
