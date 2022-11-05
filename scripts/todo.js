'use strict';
const taskInput = document.getElementById('input-task');
const addBtn = document.getElementById('btn-add');
const toDoList = document.getElementById('todo-list');

let currentUser = JSON.parse(getFromStorage('currentUser'));
let todoArr = JSON.parse(getFromStorage('todoArr')) || [];

///////////////////////////////////////////////////////////////
// Display todo list

///////////////////////////////////////////////////////////////
// Request login
if (currentUser) {
  displayToDoList();
} else {
  alert('Please login first');

  // Navigate to login page in case user hasn't logged in
  window.location.href = './login.html';
}
// Delete Task
if (toDoList.childNodes.length !== 0) {
  document.querySelectorAll('.close').forEach(function (el) {
    el.addEventListener('click', function (e) {
      // Find index of item need to delete
      let delIndex = todoArr.findIndex(
        item =>
          item.owner === currentUser.username &&
          item.task === e.target.parentElement.textContent.slice(0, -1)
      );

      // Delete item
      todoArr.splice(delIndex, 1);

      saveToStorage('todoArr', JSON.stringify(todoArr));
      displayToDoList();
      location.reload();
    });
  });
}

function displayToDoList() {
  let html = '';
  todoArr
    .filter(el => el.owner === currentUser.username)
    .forEach(function (element) {
      html += `<li class= ${element.isDone ? 'checked' : ''}>${
        element.task
      }<span class="close">×</span></li>`;
    });

  toDoList.innerHTML = html;
}
// Mark task
toDoList.childNodes.forEach(function (el) {
  el.addEventListener('click', function (e) {
    //Choose target different from close span
    if (e.target !== el.lastChild) {
      // Mark finished task or unfinished task
      e.target.classList.toggle('checked');

      // Find index of marked task
      const index = todoArr.findIndex(
        item =>
          item.owner === currentUser.username &&
          item.task === e.target.textContent.slice(0, -1)
      );

      // Change the state of task
      e.target.classList.contains('checked')
        ? (todoArr[index].isDone = true)
        : (todoArr[index].isDone = false);

      // Save to local storage
      saveToStorage('todoArr', JSON.stringify(todoArr));
    }
  });
});

// Adding task button clicked event
addBtn.addEventListener('click', function () {
  // Check blank input and get a new task
  if (taskInput.value.trim().length === 0) {
    alert('Please input todo title!');
  } else {
    const newTask = new Task(taskInput.value, currentUser.username);

    // Add new task into array
    todoArr.push(newTask);

    // Reset input field
    taskInput.value = '';

    // Display tasks
    displayToDoList();

    // Save to local storage
    saveToStorage('todoArr', JSON.stringify(todoArr));
    location.reload();
  }
});
