let CardArray = [];
let pagesArray = getAllArrayInEveryPage(CardArray);
let currentArray = [];
let searchArray = [];
let sortArr = [];
let currentPage = 1;

let isSortButtonClick = false;
let isSearchButtonClick = false;

let previous_page_button = document.getElementById("previous-page-button");
let next_page_button = document.getElementById("next-page-button");
let first_page_button = document.getElementById("first-page-button");
let last_page_button = document.getElementById("last-page-button");

let button_search = document.getElementById("button-search");
let button_cancle = document.getElementById("cancel-search");
async function getCards() {
  let CardArray;
  try {
    const response = await fetch("Catalog/medicines.json");
    const card = await response.json();
    console.log(card);
    CardArray = card;
  } catch (error) {
    console.error("Ошибка при получениипользователей", error);
  }
  return CardArray;
}

function generateHTMLBlocks(dataArray) {
  console.log(dataArray);
  let promotion = "Акция";
  let basket = "В корзину";
  let cancel = "Отмена";
  let goBasket = "Перейти в корзину";
  let currenLanguage = window.location.hash.substring(1);
  if (currenLanguage == "en") {
    promotion = "Promotion";
    basket = "To Basket";
    cancel = "Cancel";
    goBasket = "Go to basket";
  }
  let htmlBlocks = "";
  let count = 0;
  console.log(dataArray);
  dataArray.forEach((data) => {
    count++;
    htmlBlocks += `
    <div class="card-container2">
                <div>
                  <img
                    class="card-medicamets-img"
                    src="${data.img_path}"
                    alt=""
                  />
                  <img src="" alt="" />
                </div>
                <div class="card-container-information">
                  <div>
                    <p class="price">${data.price}$</p>
                    <p class="promotion lng-promotion">${promotion}</p>
                  </div>
                  <p class="medicamet-description lng-${data.idItem}Name">
                    ${data.name}
                  </p>
                  <p class="medicamet-description lng-${data.idItem}Discription">
                  ${data.discription}
                </p>
                  <div class="star-container">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="17"
                      viewBox="0 0 16 17"
                      fill="none"
                    >
                      <path
                        d="M7.10326 2.31698C7.47008 1.57374 8.52992 1.57374 8.89674 2.31699L10.1185 4.79249C10.2641 5.08763 10.5457 5.2922 10.8714 5.33953L13.6033 5.7365C14.4235 5.85568 14.751 6.86365 14.1575 7.44219L12.1807 9.3691C11.945 9.59884 11.8375 9.92984 11.8931 10.2542L12.3598 12.9751C12.4999 13.792 11.6424 14.4149 10.9088 14.0293L8.46534 12.7446C8.17402 12.5915 7.82598 12.5915 7.53466 12.7446L5.09119 14.0293C4.35756 14.4149 3.50013 13.792 3.64024 12.9751L4.1069 10.2542C4.16254 9.92984 4.05499 9.59884 3.81931 9.3691L1.8425 7.44219C1.24898 6.86365 1.57649 5.85568 2.39671 5.7365L5.12859 5.33953C5.4543 5.2922 5.73587 5.08763 5.88153 4.79249L7.10326 2.31698Z"
                        fill="#FF6633"
                      />
                    </svg>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="17"
                      viewBox="0 0 16 17"
                      fill="none"
                    >
                      <path
                        d="M7.10326 2.31698C7.47008 1.57374 8.52992 1.57374 8.89674 2.31699L10.1185 4.79249C10.2641 5.08763 10.5457 5.2922 10.8714 5.33953L13.6033 5.7365C14.4235 5.85568 14.751 6.86365 14.1575 7.44219L12.1807 9.3691C11.945 9.59884 11.8375 9.92984 11.8931 10.2542L12.3598 12.9751C12.4999 13.792 11.6424 14.4149 10.9088 14.0293L8.46534 12.7446C8.17402 12.5915 7.82598 12.5915 7.53466 12.7446L5.09119 14.0293C4.35756 14.4149 3.50013 13.792 3.64024 12.9751L4.1069 10.2542C4.16254 9.92984 4.05499 9.59884 3.81931 9.3691L1.8425 7.44219C1.24898 6.86365 1.57649 5.85568 2.39671 5.7365L5.12859 5.33953C5.4543 5.2922 5.73587 5.08763 5.88153 4.79249L7.10326 2.31698Z"
                        fill="#FF6633"
                      />
                    </svg>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="17"
                      viewBox="0 0 16 17"
                      fill="none"
                    >
                      <path
                        d="M7.10326 2.31698C7.47008 1.57374 8.52992 1.57374 8.89674 2.31699L10.1185 4.79249C10.2641 5.08763 10.5457 5.2922 10.8714 5.33953L13.6033 5.7365C14.4235 5.85568 14.751 6.86365 14.1575 7.44219L12.1807 9.3691C11.945 9.59884 11.8375 9.92984 11.8931 10.2542L12.3598 12.9751C12.4999 13.792 11.6424 14.4149 10.9088 14.0293L8.46534 12.7446C8.17402 12.5915 7.82598 12.5915 7.53466 12.7446L5.09119 14.0293C4.35756 14.4149 3.50013 13.792 3.64024 12.9751L4.1069 10.2542C4.16254 9.92984 4.05499 9.59884 3.81931 9.3691L1.8425 7.44219C1.24898 6.86365 1.57649 5.85568 2.39671 5.7365L5.12859 5.33953C5.4543 5.2922 5.73587 5.08763 5.88153 4.79249L7.10326 2.31698Z"
                        fill="#FF6633"
                      />
                    </svg>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="17"
                      viewBox="0 0 16 17"
                      fill="none"
                    >
                      <path
                        d="M7.10326 2.31698C7.47008 1.57374 8.52992 1.57374 8.89674 2.31699L10.1185 4.79249C10.2641 5.08763 10.5457 5.2922 10.8714 5.33953L13.6033 5.7365C14.4235 5.85568 14.751 6.86365 14.1575 7.44219L12.1807 9.3691C11.945 9.59884 11.8375 9.92984 11.8931 10.2542L12.3598 12.9751C12.4999 13.792 11.6424 14.4149 10.9088 14.0293L8.46534 12.7446C8.17402 12.5915 7.82598 12.5915 7.53466 12.7446L5.09119 14.0293C4.35756 14.4149 3.50013 13.792 3.64024 12.9751L4.1069 10.2542C4.16254 9.92984 4.05499 9.59884 3.81931 9.3691L1.8425 7.44219C1.24898 6.86365 1.57649 5.85568 2.39671 5.7365L5.12859 5.33953C5.4543 5.2922 5.73587 5.08763 5.88153 4.79249L7.10326 2.31698Z"
                        fill="#BFBFBF"
                      />
                    </svg>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="17"
                      viewBox="0 0 16 17"
                      fill="none"
                    >
                      <path
                        d="M7.10326 2.31698C7.47008 1.57374 8.52992 1.57374 8.89674 2.31699L10.1185 4.79249C10.2641 5.08763 10.5457 5.2922 10.8714 5.33953L13.6033 5.7365C14.4235 5.85568 14.751 6.86365 14.1575 7.44219L12.1807 9.3691C11.945 9.59884 11.8375 9.92984 11.8931 10.2542L12.3598 12.9751C12.4999 13.792 11.6424 14.4149 10.9088 14.0293L8.46534 12.7446C8.17402 12.5915 7.82598 12.5915 7.53466 12.7446L5.09119 14.0293C4.35756 14.4149 3.50013 13.792 3.64024 12.9751L4.1069 10.2542C4.16254 9.92984 4.05499 9.59884 3.81931 9.3691L1.8425 7.44219C1.24898 6.86365 1.57649 5.85568 2.39671 5.7365L5.12859 5.33953C5.4543 5.2922 5.73587 5.08763 5.88153 4.79249L7.10326 2.31698Z"
                        fill="#BFBFBF"
                      />
                    </svg>
                  </div>
                  <div class="card-basket">
                    <div class="count-items2">
                      <button class="button-minus"></button>
                      <p id="${data.idItem}">${data.count}</p>
                      <button class="button-plus"></button>
                    </div>
                    <button class="basket">${basket}</button>
                  </div>
                  <div class="go-to-basket">
                  <button class="cancel">${cancel}</button>
                  <button class="go-basket">${goBasket}</button>
                </div>
                </div>
              </div>
    `;
  });
  return htmlBlocks;
}
let currentUser;
let parentElement = document.getElementById("card-flex-conainer");
window.onload = async function (e) {
  TranslateElement();
  if (localStorage.getItem("cards") == null) {
    CardArray = await getCards();
    localStorage.setItem("cards", JSON.stringify(CardArray));
    console.log(localStorage.getItem("cards"));
  } else {
    CardArray = JSON.parse(localStorage.getItem("cards"));
  }
  console.log(CardArray);
  translateCard();
  currentArray = CardArray;
  pagesArray = getAllArrayInEveryPage(CardArray);
  let htmlBlocks = generateHTMLBlocks(pagesArray[currentPage - 1]);
  parentElement.innerHTML = htmlBlocks;
  replacementCountValue();
  addEventOnCard();

  if (localStorage.getItem("current-user") != null) {
    console.log("Пользователь есть");
    currentUser = JSON.parse(localStorage.getItem("current-user"));
    document.getElementById("nickName-person").innerHTML = currentUser.nickname;
    document.getElementById("name-person").innerHTML = currentUser.firstName;
    document.getElementById("email-person").innerHTML = currentUser.email;
    document.getElementById("phone-person").innerHTML = currentUser.phone;
    console.log("srtrs");
    document.getElementById("header-sign-in").style.display = "none";
    document.querySelector(".header-person-icon").style.display = "block";
    console.log(currentUser.iconSrc);
    if (currentUser.iconSrc == undefined) {
      document.querySelector(".header-person-icon").children[0].src =
        "/Registration/PersonIcon/default-icon.png";
    } else {
      document.querySelector(".header-person-icon").children[0].src =
        currentUser.iconSrc;
    }
  } else {
    console.log("Пользователя нет");
  }
};

function translateCard() {
  let hash = window.location.hash.substring(1);
  if (hash == "en") {
    CardArray.forEach((element) => {
      element.name = LanguagesArr[element.idItem + "Name"][hash];
      element.discription = LanguagesArr[element.idItem + "Discription"][hash];
    });
  }
}

function replacementCountValue() {
  let count = parentElement.querySelectorAll(".count-items2");
  count.forEach((element) => {
    let childItem = element.childNodes[3];
    if (childItem.textContent == "undefined") {
      childItem.textContent = "0";
    }

    CardArray.forEach((element2) => {
      if (childItem.id == element2.idItem && element2.isClouse == true) {
        console.log(element.parentNode);
        element.parentNode.nextElementSibling.style.display = "flex";
        element.parentNode.style.display = "none";
      }
    });
  });
}

document.getElementById("button-catalog").onclick = function (e) {
  if (document.getElementById("header-menu").style.display == "block") {
    document.getElementById("header-menu").style.display = "none";
  } else {
    document.getElementById("header-menu").style.display = "block";
  }
};

function getAllArrayInEveryPage(dataArray) {
  let arrPage = [];
  let countPage = Math.floor(dataArray.length / 4);
  let remainder = dataArray.length % 4;
  for (let i = 0; i < countPage; i++) {
    arrPage.push(dataArray.slice(i * 4, (i + 1) * 4));
  }
  if (remainder != 0) {
    if (dataArray.length == 1) {
      arrPage.push(dataArray);
    } else {
      arrPage.push(
        dataArray.slice(dataArray.length - remainder, dataArray.length)
      );
    }
  }
  return arrPage;
}

first_page_button.onclick = function (e) {
  addCountIteamInArray();
  currentPage = 1;
  DrawCards();
  first_page_button.disabled = true;
  next_page_button.disabled = false;
  last_page_button.disabled = false;
  previous_page_button.disabled = true;
};

previous_page_button.onclick = function (e) {
  if (currentPage > 1) {
    addCountIteamInArray();
    currentPage--;
    next_page_button.disabled = false;
    last_page_button.disabled = false;
    DrawCards();
  }
  if (currentPage === 1) {
    previous_page_button.disabled = true;
    first_page_button.disabled = true;
  }
};

next_page_button.onclick = function (e) {
  if (currentPage < pagesArray.length) {
    addCountIteamInArray();
    currentPage++;
    first_page_button.disabled = false;
    previous_page_button.disabled = false;
    DrawCards();
  }
  if (currentPage === pagesArray.length) {
    next_page_button.disabled = true;
    last_page_button.disabled = true;
  }
};

last_page_button.onclick = function (e) {
  // console.log("rstrstarst");
  addCountIteamInArray();
  currentPage = pagesArray.length;
  DrawCards();
  last_page_button.disabled = true;
  next_page_button.disabled = true;
  first_page_button.disabled = false;
  previous_page_button.disabled = false;
};

function DrawCards() {
  let card_flex_container = document.getElementById("card-flex-conainer");
  card_flex_container.innerHTML = "";
  getActualCountValue();
  pagesArray = getAllArrayInEveryPage(currentArray);
  let htmlBlocks = generateHTMLBlocks(pagesArray[currentPage - 1]);
  card_flex_container.innerHTML = htmlBlocks;
  replacementCountValue();
  document.getElementById("number_page").textContent = currentPage;
  addEventOnCard();
}

function getActualCountValue() {
  currentArray.forEach((element) => {
    CardArray.forEach((element2) => {
      if (element.idItem == element2.idItem) {
        element.count = element2.count;
      }
    });
  });
}

function addEventOnCard() {
  let buttons_plus = document.querySelectorAll(".button-plus");

  let buttons_minus = document.querySelectorAll(".button-minus");

  let basket = document.querySelectorAll(".basket");

  let cancel = document.querySelectorAll(".cancel");
  // Добавляем обработчик событий для каждой кнопки
  buttons_plus.forEach((button) => {
    button.addEventListener("click", (event) => {
      let temp = event.target;
      let temp2 = temp.parentNode.children[1];
      if (Number(temp2.textContent) < 99) {
        temp2.textContent = Number(temp2.textContent) + 1;
      }
    });
  });

  buttons_minus.forEach((button) => {
    button.addEventListener("click", (event) => {
      let temp = event.target;
      let temp2 = temp.parentNode.children[1];
      if (Number(temp2.textContent) >= 1) {
        temp2.textContent = Number(temp2.textContent) - 1;
      }
    });
  });

  basket.forEach((button) => {
    button.addEventListener("click", (event) => {
      let temp = event.target;
      if (currentUser == undefined) {
        modal.style.display = "block";
        document.getElementById(
          "message-user-not-defined-black"
        ).style.display = "block";
        document.querySelector("body").style.overflow = "hidden";
      } else {
        let button2 = temp.parentNode.parentNode;
        console.log(button2.children[4].childNodes[1].childNodes[3].id);
        CardArray.forEach((element) => {
          if (
            element.idItem ==
              button2.children[4].childNodes[1].childNodes[3].id &&
            button2.children[4].childNodes[1].childNodes[3].textContent != 0
          ) {
            document.getElementById("circle-text").textContent =
              parseInt(
                button2.children[4].childNodes[1].childNodes[3].textContent
              ) + parseInt(document.getElementById("circle-text").textContent);
            console.log(element.count);
            element.isClouse = true;
            button2.children[4].style.display = "none";
            button2.children[5].style.display = "flex";
          }
          console.log(element.count);
        });
      }
    });
  });

  cancel.forEach((button) => {
    button.addEventListener("click", (event) => {
      event.target.parentNode.parentNode.childNodes[9].style.display = "flex";
      button.parentNode.style.display = "none";
      document.getElementById("circle-text").textContent =
        document.getElementById("circle-text").textContent -
        event.target.parentNode.parentNode.childNodes[9].childNodes[1]
          .childNodes[3].textContent;

      CardArray.forEach((element) => {
        console.log(
          event.target.parentNode.parentNode.childNodes[9].childNodes[1]
            .childNodes[3].id
        );
        if (
          element.idItem ==
          event.target.parentNode.parentNode.childNodes[9].childNodes[1]
            .childNodes[3].id
        ) {
          element.isClouse = false;
        }
      });
    });
  });
}

button_search.addEventListener("click", (event) => {
  let title = document.getElementById("header-search").value;
  // console.log(title);
  if (isSortButtonClick) {
    searchArray = sortArr.filter((card) =>
      card.name.toLowerCase().includes(title.toLowerCase())
    );
  } else {
    searchArray = CardArray.filter((card) =>
      card.name.toLowerCase().includes(title.toLowerCase())
    );
  }

  if (checkCountItemInArray(searchArray)) {
    isSearchButtonClick = true;
  }
});

button_cancle.addEventListener("click", (event) => {
  addCountIteamInArray();
  StateCard(CardArray);
  button_cancle.style.display = "none";
  document.getElementById("header-search").value = "";
  isSearchButtonClick = false;
  isSortButtonClick = false;
});

function defaultStatePagination() {
  first_page_button.disabled = true;
  previous_page_button.disabled = true;
  next_page_button.disabled = false;
  last_page_button.disabled = false;
}

function StateCard(array) {
  defaultStatePagination();
  currentPage = 1;
  currentArray = array;
  DrawCards();
}

let tablets = document.getElementById("tablets");
let spray = document.getElementById("spray");
let ointment = document.getElementById("ointment");

tablets.onclick = function (e) {
  sortingArray("Таблетки");
  // addCountIteamInArray();
};

spray.onclick = function (e) {
  sortingArray("Спрей");
  // addCountIteamInArray();
};

ointment.onclick = function (e) {
  sortingArray("Мазь");
  // addCountIteamInArray();
};

function sortingArray(sortParametr) {
  if (isSearchButtonClick == true) {
    sortArr = searchArray.filter((card) => card.type == sortParametr);
  } else {
    sortArr = CardArray.filter((card) => card.type == sortParametr);
  }

  if (checkCountItemInArray(sortArr)) {
    isSortButtonClick = true;
  }
}

function checkCountItemInArray(array) {
  if (array.length > 0) {
    // console.log(array.length);
    addCountIteamInArray();
    StateCard(array);
    button_cancle.style.display = "block";
    if (array.length <= 4) {
      next_page_button.disabled = true;
      last_page_button.disabled = true;
    }
    return true;
  } else {
    console.log("Нужно обработать то что карточки не найдены");
    return false;
  }
}

let elements = [];

function addCountIteamInArray() {
  // console.log(CardArray);
  let count = parentElement.querySelectorAll(".count-items2");
  count.forEach((element) => {
    let childItem = element.childNodes[3];
    currentArray.forEach((element2) => {
      if (childItem.id == element2.idItem) {
        element2.count = childItem.textContent;
      }
    });
  });
  console.log(currentArray);
}

function addInAllArray(array) {
  array.forEach((element) => {
    currentArray.forEach((element2) => {
      if (element.idItem == element2.idItem) {
        element.count = element2.count;
      }
    });
  });
}

document.getElementById("button-theme").onclick = function () {
  changeTheme();
};

if (localStorage.getItem("dark")) {
  changeTheme();
}

function changeTheme() {
  document.querySelector("body").classList.toggle("dark-theme");
  document
    .getElementById("section-contriner-id")
    .classList.toggle("section-contriner-id-background");
  let elements = document.querySelectorAll(".theme-pagination");
  console.log("rstartartartartart");
  console.log(elements.length);
  elements.forEach((element) => {
    element.classList.toggle("dark-theme-white");
  });

  if (document.body.classList.value == "dark-theme") {
    localStorage.setItem("dark", "dark");
  } else {
    localStorage.removeItem("dark");
  }
}

function goHome() {
  window.location.href = "index.html";
}

function exit() {
  localStorage.removeItem("current-user");
  location.reload();
}
var modal = document.getElementById("message-user-not-defined");
var span = document.getElementsByClassName("close")[0];
span.onclick = function () {
  modal.style.display = "none";
  document.getElementById("message-user-not-defined-black").style.display =
    "none";
  document.querySelector("body").style.overflow = "scroll";
};

function TranslateElement() {
  if (window.location.hash.substring(1) == "ru") {
    document.getElementById("header-search").placeholder = "Поиск";
  }
}
