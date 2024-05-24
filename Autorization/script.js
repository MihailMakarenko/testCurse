window.onload = function () {
  TranslateElement();
};

let login = document.getElementById("login");
let password = document.getElementById("password");

document.getElementById("logIn").onclick = function (e) {
  console.log(JSON.parse(sessionStorage.getItem("users")));
  let userArray = [];
  let isSearchUser = false;
  userArray = JSON.parse(sessionStorage.getItem("users"));
  if (userArray != null && userArray.length == 0) {
    userArray = arrayUsers;
  } else {
    if (userArray != null && userArray.length != 0) {
      console.log(userArray);
      if (login.value != "" && password.value != "") {
        isSearchUser = userArray.some(
          (user) =>
            (user.phone == login.value ||
              user.email == login.value ||
              user.nickname == login.value) &&
            user.password == password.value
        );
        if (isSearchUser) {
          if (document.referrer != null) {
            if (
              document.referrer.substring(23, document.referrer.length) ==
              "Autorization/index.html"
            ) {
              sessionStorage.setItem(
                "current-user",
                JSON.stringify(
                  userArray[
                    userArray.findIndex(
                      (user) =>
                        (user.phone == login.value ||
                          user.email == login.value ||
                          user.nickname == login.value) &&
                        user.password == password.value
                    )
                  ]
                )
              );
              window.location.href = "index.html";
            } else {
              sessionStorage.setItem(
                "current-user",
                JSON.stringify(
                  userArray[
                    userArray.findIndex(
                      (user) =>
                        (user.phone == login.value ||
                          user.email == login.value ||
                          user.nickname == login.value) &&
                        user.password == password.value
                    )
                  ]
                )
              );
              history.back();
            }

            // sessionStorage.setItem("current-user");
          } else {
            window.location.href = "index.html";
          }
        } else {
          document.getElementById("myModal").style.display = "block";
        }
      }
    }
  }
};

document.getElementById("button-ok").onclick = function (e) {
  document.getElementById("myModal").style.display = "none";
};

login.onkeyup = function (e) {
  login.value = login.value.trim();
  changeSpan(login);
};

password.onkeyup = function (e) {
  password.value = password.value.trim();
  changeSpan(password);
};

function changeSpan(element) {
  if (element.value.length == 0) {
    element.nextElementSibling.style.display = "block";
  } else {
    element.nextElementSibling.style.display = "none";
  }
}

document.getElementById("Registration").onclick = function (e) {
  window.location.href = "Registration/index.html";
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

document.getElementById("button-theme").onclick = function (e) {
  changeTheme();
};

function goHome() {
  window.location.href = "index.html";
}

function back() {
  window.history.back();
}

function TranslateElement() {
  if (window.location.hash.substring(1) == "ru") {
    document.getElementById("login").placeholder = "Телефон, почта или ник";
    document.getElementById("password").placeholder = "Пароль";
  }
}
