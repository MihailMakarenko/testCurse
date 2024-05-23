if (sessionStorage.getItem("users") == null) {
  let arrayUsers = getUsers();
}
let currentUser;
function getUsers() {
  fetch("/Registration/data.json")
    .then((response) => response.json())
    .then((users) => {
      // console.log(users);
      sessionStorage.setItem("users", JSON.stringify(users));
      console.log(sessionStorage);
      return (usersArray = users);
    })
    .catch((error) => {
      console.error("Ошибка при получениипользователей", error);
    });
}

//Функция ранодомно перемешивает массив с карточками для слайдера
async function shuffleSlidesArray(SlidesArray2) {
  for (let i = SlidesArray2.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [SlidesArray2[i], SlidesArray2[j]] = [SlidesArray2[j], SlidesArray2[i]];
  }
  return SlidesArray2;
}

function translateArray() {
  let hash = window.location.hash;
  hash = hash.substring(1);
  console.log(hash);
  if (hash == "ru") {
    for (let i = 0; i < SlidesArray.length; i++) {
      SlidesArray[i].name = LanguagesArr["name-" + SlidesArray[i].id][hash];
      SlidesArray[i].review = LanguagesArr["review-" + SlidesArray[i].id][hash];
    }
  }
}

async function getSlides() {
  let SlidesArray;
  try {
    const response = await fetch("Review.json");
    const slide = await response.json();
    SlidesArray = slide;
  } catch (error) {
    console.error("Ошибка при получениипользователей", error);
  }
  return SlidesArray;
}
let buttonStarted = document.getElementById("get-started");
let SlidesArray = [];
window.onload = async function (e) {
  SlidesArray = await getSlides();
  SlidesArray = await shuffleSlidesArray(SlidesArray);
  translateArray();
  // console.log(SlidesArray);
  let htmlBlocks = generateHTMLBlocks(SlidesArray);
  document.getElementById("first-swiper").innerHTML = htmlBlocks;

  if (localStorage.getItem("dark")) {
    changeTeme();
    let arrSlides = document.querySelectorAll("background-color-slide");
    arrSlides.forEach((element) => {
      element.classList.toggle("background-color-slide-dark");
    });
  }

  if (sessionStorage.getItem("current-user") != null) {
    console.log("Пользователь есть");
    currentUser = JSON.parse(sessionStorage.getItem("current-user"));
    document.getElementById("nickName-person").innerHTML =
      ": " + currentUser.nickname;
    document.getElementById("name-person").innerHTML =
      ": " + currentUser.firstName;
    document.getElementById("email-person").innerHTML =
      ": " + currentUser.email;
    document.getElementById("phone-person").innerHTML =
      ": " + currentUser.phone;
    if (currentUser.iconSrc == undefined) {
      document.getElementById("avatar").src =
        "/Registration/PersonIcon/default-icon.png";
    } else {
      document.getElementById("avatar").src = currentUser.iconSrc;
    }
    if (currentUser.isAdmin == true) {
      deleteSectionForAdmin();
      console.log(buttonStarted.children[0].textContent);
      document.getElementById("basket-ahcors").style.display = "none";
      if (window.location.hash.substring(1) == "ru") {
        buttonStarted.children[0].textContent = "Для вас";
        document.getElementById("adminPanel").children[0].textContent =
          "Админ панель";
      } else {
        buttonStarted.children[0].textContent = "For you";
        document.getElementById("adminPanel").children[0].textContent =
          "Admin Panel";
      }
      // buttonStarted.children[0].textContent = "For you";
      buttonStarted.classList.toggle("lng-get-started");
      buttonStarted.classList.toggle("lng-for-you");
    }

    document.getElementById("anchor-login").style.display = "none";
    document.querySelector(".header-person-icon").style.display = "block";
  } else {
    console.log("Пользователя нет");
  }
};

function goPage(number) {
  console.log("trtrtrrtrtr");
  console.log(JSON.parse(sessionStorage.getItem("current-user")));
  if (currentUser != null && currentUser.isAdmin == true) {
    if (number == 0) {
      window.location.href = "/PageWorkers/index.html";
    } else {
      window.location.href = "/Adminpanel/index.html";
    }
  }
}

// получает html код для вставки слайдов в слайдер
function generateHTMLBlocks(dataArray) {
  let htmlBlocks = "";
  dataArray.forEach((data) => {
    htmlBlocks += `
    <div class="swiper-slide background-color-milck">
    <div class="background-color-slide background-color-milck">
      <div class="slide-inner">
        <div
          class="main-fifth-container-slider-panel-container-star-container"
        >
          <img src="img/Star.png" alt="" />
          <img src="img/Star.png" alt="" />
          <img src="img/Star.png" alt="" />
          <img src="img/Star.png" alt="" />
          <img src="img/Star.png" alt="" />
        </div>
        <p id="lng-review-${data.id}" class="quick lng-great-product-love">
          ${data.review}
        </p>
      </div>
      <p id="lng-name-${data.id}" class="Zander lng-simon">${data.name}</p>
      <img class="slide-circle" src="img/slide-circle.png" alt="" />
    </div>
  </div>
    `;
  });
  return htmlBlocks;
}

const swiper = new Swiper(".img-slider", {
  spaceBetween: 11,
  slidesPerView: 2, // this
  centeredSlides: true,
  initialSlides: 1,
  loop: true,
});

const swiper2 = new Swiper(".swiper-second", {
  // slidesPerView: 4.67,
  slidesPerView: 3,
  spaceBetween: 10,
  // centeredSlides: true,
  initialSlide: 1,
  loop: true,

  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },

  slidesPerGroup: 3,
});

function changeSwiper2(x) {
  if (x.matches) {
    swiper2.params.slidesPerView = 1;
    swiper2.params.slidesPerGroup = 1;
    swiper2.update();
    console.log(swiper2.slidesPerGroup);
  } else {
    (swiper2.params.slidesPerView = 3), swiper2.update();
  }
}

var x = window.matchMedia("(max-width: 768px)");
changeSwiper2(x); // Вызов функции прослушивателя во время выполнения
x.addListener(changeSwiper2);

// Нажатие на бургер меню
document.addEventListener("DOMContentLoaded", function () {
  document.getElementById("burger").addEventListener("click", function () {
    document.querySelector("div").classList.toggle("open");
    document.querySelector("body").classList.toggle("body-scroll");
  });
});

document.addEventListener("DOMContentLoaded", function () {
  document.getElementById("blackOverId").addEventListener("click", function () {
    document.querySelector("div").classList.toggle("open");
    document.querySelector("body").classList.toggle("body-scroll");
  });
});

// Смена темы
function changeTeme() {
  document.body.classList.toggle("dark-theme-color");
  let ancors_reads = document.querySelectorAll(".read-more");
  let card_line = document.querySelectorAll(".main-eight-container-card-line");
  ancors_reads.forEach((element) => {
    element.classList.toggle("dark-theme-color");
  });

  card_line.forEach((element) => {
    element.classList.toggle("light-theme-color");
  });

  let card_background = document.querySelectorAll(".background-color-milck");
  card_background.forEach((element) => {
    element.classList.toggle("background-color-slide-dark");
  });

  let background_color_ancors = document.querySelectorAll(
    ".background-color-anchors"
  );
  background_color_ancors.forEach((element) => {
    element.classList.toggle("background-color-anchors-light");
  });

  let background_color_ancors_line = document.querySelectorAll(".line");
  background_color_ancors_line.forEach((element) => {
    element.classList.toggle("background-color-anchors-light_line");
  });

  let header_button_burger_dark = document.querySelectorAll(
    ".header-button-burger"
  );
  header_button_burger_dark.forEach((element) => {
    element.classList.toggle("background-color-anchors-light_line");
  });

  document.querySelector(".manual").classList.toggle("manual-class");
  document
    .getElementById("header-catalog-first")
    .classList.toggle("manual-class");
  document
    .getElementById("header-catalog-second")
    .classList.toggle("manual-class");
  document.getElementById("loop-first").classList.toggle("manual-class-second");
  document
    .getElementById("loop-second")
    .classList.toggle("manual-class-second");
  // background_color_manual.forEach((element) => {
  //   element.classList.toggle("manual-class");
  // });

  let transpilots = document.querySelectorAll(".transpilots");
  transpilots.forEach((element) => {
    element.classList.toggle("transpilots-class");
  });

  let check_marks = document.querySelectorAll(".check-mark");
  check_marks.forEach((element) => {
    element.classList.toggle("check-marks-class");
  });
}

document.getElementById("button-theme").onclick = function (e) {
  changeTeme();
  console.log(document.body.classList.value);
  if (document.body.classList.value == "dark-theme-color") {
    localStorage.setItem("dark", "dark");
  } else {
    localStorage.removeItem("dark");
  }
};

// затемнение при нажатие на карту
document.addEventListener("DOMContentLoaded", function () {
  document.getElementById("map-button").addEventListener("click", function () {
    document
      .getElementById("footer-map-container")
      .classList.toggle("footer-map-visible");
    document.querySelector("body").classList.toggle("body-scroll");
    document
      .getElementById("blackOver-two")
      .classList.toggle("blackOver-two-button");
  });
});

document.addEventListener("DOMContentLoaded", function () {
  document
    .getElementById("blackOver-two")
    .addEventListener("click", function () {
      document
        .getElementById("footer-map-container")
        .classList.toggle("footer-map-visible");
      document.querySelector("body").classList.toggle("body-scroll");
      document
        .getElementById("blackOver-two")
        .classList.toggle("blackOver-two-button");
    });
});

document.addEventListener("DOMContentLoaded", function () {
  console.log("stdts");
  document
    .getElementById("button-close")
    .addEventListener("click", function () {
      document
        .getElementById("footer-map-container")
        .classList.toggle("footer-map-visible");
      document.querySelector("body").classList.toggle("body-scroll");
      document
        .getElementById("blackOver-two")
        .classList.toggle("blackOver-two-button");
    });
});

// прокуртка по якарям
const anchors = document.querySelectorAll('a[href*="#"]');

for (let anchor of anchors) {
  anchor.addEventListener("click", function (e) {
    if (window.innerWidth < 768) {
      document.querySelector("div").classList.toggle("open");
      document.querySelector("body").classList.toggle("body-scroll");
    }
    e.preventDefault();

    const blockID = anchor.getAttribute("href").substr(1);

    document.getElementById(blockID).scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  });
}

// обработка нажатия на карту
let button_map = document.getElementById("map-button");
button_map.onclick = function (e) {
  let img = button_map.childNodes[1].src;
  if (img == "http://127.0.0.1:52167/img/map-icon.png") {
    button_map.childNodes[1].src = "http://127.0.0.1:52167/img/map-img2.png";
  } else {
    button_map.childNodes[1].src = "http://127.0.0.1:52167/img/map-icon.png";
  }
  console.log(button_map.childNodes[1].src);
};

function exit() {
  sessionStorage.removeItem("current-user");
  location.reload();
}

function deleteSectionForAdmin() {
  document.querySelector(".main-six-container").style.display = "none";
  document.querySelector(".main-left-text").style.display = "none";
  document.querySelector(".main-right-icons").style.margin = "auto";
  document.querySelector(".main-right-icons").style.marginTop = "20px";
  document.querySelector(".main-right-icons").style.marginBottom = "20px";
  document.querySelector(".card").style.minHeight = "340px";
  let array = document.querySelectorAll(".card");
  array.forEach((elements) => {
    elements.style.minHeight = "340px";
  });
  document.querySelector(".main-container-first-icon-grid").style.display =
    "none";
  document.getElementById("loop").style.display = "none";
  document.querySelector(".lng-well-ask-you").style.display = "none";
  document.querySelector(".lng-your-selected").style.display = "none";
  document.querySelector(".lng-chat-with").style.display = "none";
}
