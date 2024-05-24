let PersonArray = [];
let tableId = document.getElementById("myTable");

window.onload = function (e) {
  PersonArray = JSON.parse(localStorage.getItem("users"));
  console.log("srtrstrt");
  console.log(PersonArray);
  printUsers(arrayUsers);
};

function generateHTMLBlocks(dataArray) {
  console.log(dataArray);
  let htmlBlocks = "";
  dataArray.forEach((data) => {
    htmlBlocks += `
      <tr>
      <th>${data.phone}</th>
      <th>${data.nickname}</th>
      <th>${data.email}</th>
      <th>${data.birthday}</th>
      <th>${data.firstName}</th>
      <th>${data.secondName}</th>
      <th>${data.password}</th>
    </tr>
      `;
  });
  return htmlBlocks;
}
let previouseArray = [];

function sortArrayByField(arr, field) {
  console.log(arr);
  arr.sort(function (a, b) {
    if (a[field] < b[field]) {
      return -1;
    } else if (a[field] > b[field]) {
      return 1;
    } else {
      return 0;
    }
  });
}
// Переменная состояния для отслеживания порядка сортировки
var sortOrder = "asc";

function sortTable(nameField) {
  console.log(nameField);
  console.log(PersonArray);

  // Изменение порядка сортировки при каждом нажатии на кнопку
  if (sortOrder === "asc") {
    sortArrayByField(PersonArray, nameField);
    sortOrder = "desc";
  } else {
    sortArrayByField(PersonArray, nameField);
    PersonArray.reverse(); // Обратный порядок сортировки
    sortOrder = "asc";
  }

  printUsers(PersonArray);
}

function searchTable() {
  let arrayUsers = PersonArray.filter((user) =>
    user.nickname.includes(document.getElementById("searchInput").value)
  );
  printUsers(arrayUsers);
}

function printUsers(users) {
  document.getElementById("tbody-table").innerHTML = "";
  let htmlBlocks = generateHTMLBlocks(users);
  document.getElementById("tbody-table").innerHTML = htmlBlocks;
}

window.onload = function () {
  PersonArray = JSON.parse(localStorage.getItem("users"));
  console.log("srtrstrt");
  console.log(PersonArray);
  let htmlBlocks = generateHTMLBlocks(PersonArray);
  document.getElementById("tbody-table").innerHTML = htmlBlocks;
};

function back() {
  window.location.href = "index.html";
}

document.getElementById("button-theme").onclick = function (e) {
  changeTheme();
};
if (localStorage.getItem("dark")) {
  changeTheme();
}
function changeTheme() {
  document.querySelector("body").classList.toggle("dark-theme");
  document.getElementById("manula-color").classList.toggle("dark-theme-manual");
  if (document.body.classList.value == "dark-theme") {
    localStorage.setItem("dark", "dark");
  } else {
    localStorage.removeItem("dark");
  }
}
