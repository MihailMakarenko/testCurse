console.log(localStorage.getItem("language"));
let allLanguages = ["en", "ru"];
const select = document.querySelector("select");
select.addEventListener("change", changeURLlng);
console.log(window.location.hash);
function changeURLlng() {
  console.log("pfw");
  let lng = select.value;
  console.log(lng);
  localStorage.setItem("language", lng);
  location.href = window.location.pathname + "#" + lng;
  location.reload();
}

function changeLanguage() {
  let hash = window.location.hash.substring(1);
  if (localStorage.getItem("language") != null) {
    if (localStorage.getItem("language") != hash) {
      hash = localStorage.getItem("language");
      // localStorage.setItem("language", hash);
    }
  }

  if (hash == "ru") {
    location.href = window.location.pathname + "#ru";
  } else {
    location.href = window.location.pathname + "#en";
  }

  // document.querySelector(".switch-lng").value = hash;
  // document.querySelector(".switch-lng").textContent = hash;
  // console.log(document.querySelector(".switch-lng").textContent);
  // console.log(document.querySelector(".switch-lng").value);

  // document.querySelector(".switch-lng").dispatchEvent(new Event("change"));

  select.value = hash;
  console.log(select.value);
  console.log(LanguagesArr);
  let lng_str = document.querySelectorAll("[class*='lng-']");
  for (let i = 0; i < lng_str.length; i++) {
    let str = lng_str[i].classList;
    for (let j = 0; j < str.length; j++) {
      if (str[j].includes("lng-")) {
        if (LanguagesArr[str[j].substring(4)][hash]) {
          lng_str[i].innerHTML = LanguagesArr[str[j].substring(4)][hash];
        }
      }
    }
  }
}

changeLanguage();
