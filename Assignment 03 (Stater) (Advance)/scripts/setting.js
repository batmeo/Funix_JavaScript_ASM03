'use strict';

const inputCategory = document.getElementById('input-category');
const inputPageSize = document.getElementById('input-page-size');
const saveSetting = document.getElementById('btn-submit');

let setting = {};

saveSetting.addEventListener('click', function () {
  if (inputPageSize.value === '') {
    alert('Pls input page size ');
  } else {
    // Get category from input
    setting.category = inputCategory.value.toLowerCase();

    // Get page size from input
    setting.pageSize = inputPageSize.value;

    // Save setting to local storage
    saveToStorage('setting', JSON.stringify(setting));

    // Navigate to news page
    window.location.href = './news.html';
  }
});
