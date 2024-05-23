// перемещение по якарям
const anchors = document.querySelectorAll('a[href*="#"]');

for (let anchor of anchors) {
  anchor.addEventListener("click", function (e) {
    document.querySelector("div").classList.toggle("open");
    document.querySelector("body").classList.toggle("body-scroll");
    e.preventDefault();

    const blockID = anchor.getAttribute("href").substr(1);

    document.getElementById(blockID).scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  });
}

// всплывающее меню
function myFunction() {
  document.getElementById("myDropdown").classList.toggle("show");
}

window.onclick = function (event) {
  if (!event.target.matches(".dropbtn")) {
    var dropdowns = document.getElementsByClassName("dropdown-content");
    for (var i = 0; i < dropdowns.length; i++) {
      var openDropdown = dropdowns[i];
      if (openDropdown.classList.contains("show")) {
        openDropdown.classList.remove("show");
      }
    }
  }
};

// анимация при прокрутке страницы
(function () {
  var square = document.querySelector(".square");

  var observer = new IntersectionObserver((entries) => {
    // этот класс отслеживает когда елемент пересекает видимую областьь

    entries.forEach((entry) => {
      //  если целевой элемент пересекает видимую часть области то ему добавляется класс
      if (
        typeof getCurrentAnimationPreference === "function" &&
        !getCurrentAnimationPreference()
      ) {
        return;
      }

      if (entry.isIntersecting) {
        entry.target.classList.add("square-animation");
      }
    });
  });

  observer.observe(square); // отслеживание елемента
})();

// изменение картинки и музыки при нажатии на кнопки
var images = [
  "images/first.png",
  "images/16.png",
  "images/15.png",
  "images/14.png",
  "images/first.png",
  "images/16.png",
  "images/15.png",
  "images/14.png",
  "images/first.png",
  "images/16.png",
];
var sounds = [
  "Xassa.mp3",
  "MiyaGi.mp3",
  "Xassa.mp3",
  "MiyaGi.mp3",
  "Xassa.mp3",
  "MiyaGi.mp3",
  "Xassa.mp3",
  "MiyaGi.mp3",
  "Xassa.mp3",
  "MiyaGi.mp3",
];
var myImage = document.getElementById("myImage");
var myAudio = document.getElementById("myAudio");

function playPause() {
  if (myAudio.paused) {
    myAudio.play();
  } else {
    myAudio.pause();
  }
}

function changeImageAndSound() {
  var randomIndex = Math.floor(Math.random() * 10);
  myImage.src = images[randomIndex];
  myAudio.src = sounds[randomIndex];
  myAudio.play();
}

document.getElementById("button-theme").onclick = function (e) {
  changeTheme();
};

if (localStorage.getItem("dark")) {
  changeTheme();
}

function changeTheme() {
  document.querySelector("body").classList.toggle("dark-theme");
  if (document.body.classList.value == "dark-theme") {
    document.getElementById("manula-color").style.fill = "white";
    localStorage.setItem("dark", "dark");
  } else {
    document.getElementById("manula-color").style.fill = "black";
    localStorage.removeItem("dark");
  }
}

function back() {
  window.history.back();
}
