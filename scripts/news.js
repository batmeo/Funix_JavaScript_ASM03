'use strict';

const newsContainer = document.getElementById('news-container');
const prevBtn = document.getElementById('btn-prev');
const nextBtn = document.getElementById('btn-next');
const pageNum = document.getElementById('page-num');
const pagination = document.querySelector('.pagination');

const apiKey = 'a38c8edfd34846ea8803498bdf7c46ed';

let currentPage = 1;
let totalNews;

const getNews = async function (country, category, pageSize, page) {
  try {
    const response = await fetch(
      `https://newsapi.org/v2/top-headlines?country=${country}&category=${category}&pageSize=${pageSize}&page=${page}&apiKey=${apiKey}`
    );
    const data = await response.json();
    totalNews = data.totalResults;

    // Give an error when no results found and hide the pagination
    if (totalNews === 0) {
      pagination.classList.add('invisible');
      throw new Error(alert('No results found, please input another keyword'));
    } else pagination.classList.remove('invisible');

    console.log(data);
    displayNews(data);
  } catch (error) {
    console.log(error);
  }
};

///////////////////////////////////////////////////////////////
// Display news function
function displayNews(data) {
  let html = '';
  data.articles.forEach(function (element) {
    html += `<div class="card flex-row flex-wrap">
    <div class="card mb-3" style="">
  <div class="row no-gutters">
  <div class="col-md-4">
  <img src="${element.urlToImage}" onerror="this.src='https://thumbs.dreamstime.com/b/no-image-available-icon-photo-camera-flat-vector-illustration-132483141.jpg'"
  class="card-img"
  alt="${element.title}">
  </div>
  <div class="col-md-8">
  <div class="card-body">
  <h5 class="card-title">${element.title}</h5>
  <p class="card-text">${element.description}</p>
  <a href="${element.url}/"
  class="btn btn-primary">View</a>
  </div>
  </div>
  </div>
  </div>
  </div>`;
  });

  newsContainer.innerHTML = html;
}

///////////////////////////////////////////////////////////////
// Previous button clicked event
prevBtn.addEventListener('click', function () {
  currentPage--;
  init();
});

///////////////////////////////////////////////////////////////
// Next button clicked event
nextBtn.addEventListener('click', function () {
  currentPage++;
  init();
});

///////////////////////////////////////////////////////////////
// Initialize page
function init() {
  newsContainer.innerHTML = '';

  // Get category and page size from local storage or initialize default value
  let setting = JSON.parse(getFromStorage('setting')) || {
    category: 'general',
    pageSize: 5,
  };

  // Calculate a number of pages
  const numPages = Math.ceil(totalNews / setting.pageSize);

  // Hide previous button at the first page
  if (currentPage === 1) {
    prevBtn.classList.add('invisible');
  } else if (currentPage === numPages) {
    // Hide next button at the last page
    nextBtn.classList.add('invisible');
  } else {
    // Unhide at remaining pages
    prevBtn.classList.remove('invisible');
    nextBtn.classList.remove('invisible');
  }

  // Page changing in HTML
  pageNum.textContent = currentPage;

  // Get news
  getNews('gb', setting.category, setting.pageSize, currentPage);
}

init();
