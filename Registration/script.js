let phoneInput = document.getElementById("phone");
let emailInput = document.getElementById("email");
let birthdayInput = document.getElementById("BirthdayID");
let nameInput = document.getElementById("first-name");
let surnameInput = document.getElementById("second-name");
let lastNameInput = document.getElementById("last-name");
let nickNameInput = document.getElementById("nickname");
let passwordInput = document.getElementById("password-input");
let repeatPasswordInput = document.getElementById("password-repeat-input");
let generateNicknameButton = document.getElementById("generate-nickname");
let generatePasswordButton = document.getElementById("generate-password");
let buttonRegistration = document.getElementById(
  "floating-button-registration"
);

// маска ввода для телефона
let usersArray = [];
function getUsers() {
  fetch("data.json")
    .then((response) => response.json())
    .then((users) => {
      // console.log(users);
      sessionStorage.setItem("users", JSON.stringify(users));
      console.log(sessionStorage);
      return (usersArray = users);
      // console.log(usersArray.length);
    })
    .catch((error) => {
      console.error("Ошибка при получениипользователей", error);
    });
}
window.onload = function (e) {
  if (sessionStorage.getItem("users") == undefined) {
    getUsers();
  } else {
    usersArray = JSON.parse(sessionStorage.getItem("users"));
  }
};

function inputphone(e, phone) {
  function stop(evt) {
    evt.preventDefault();
  }
  let key = e.key,
    v = phone.value;
  not = key.replace(/([0-9])/, 1);
  // Error.log("Ошибка");
  if (not == 1 || "Backspace" === not) {
    if ("Backspace" != not) {
      if (v.length < 5 || v === "") {
        phone.value = "+375(";
      }
      if (v.length === 7) {
        phone.value = v + ")";
      }
      if (v.length === 11) {
        phone.value = v + "-";
      }
      if (v.length === 14) {
        phone.value = v + "-";
      }
    }
  } else {
    stop(e);
  }
}

function updateFieldError(input, isValid, errorMessageRu, errorMessageEn) {
  let errorSpan = input.nextElementSibling;
  console.log(input.value);
  if (input.value.length == 0) {
    errorSpan.style.display = "block";
    if (window.location.hash.substring(1) == "ru") {
      errorSpan.textContent = "Обязательное поле";
    } else {
      errorSpan.textContent = "Obligatory field";
    }
  } else {
    if (isValid) {
      errorSpan.style.display = "none";
      errorSpan.classList.remove("error-span");
    } else {
      errorSpan.style.display = "block";
      if (window.location.hash.substring(1) == "ru") {
        errorSpan.textContent = errorMessageRu;
      } else {
        errorSpan.textContent = errorMessageEn;
      }
      errorSpan.classList.add("error-span");
    }
  }
}
// Проверка ввода номера телефона
function isUniquePhoneNumber(phoneNumber) {
  return usersArray.some((person) => person.phone == phoneNumber);
}
document.querySelector("#phone").onkeydown = function (e) {
  inputphone(e, document.querySelector("#phone"));
};

function validatePhoneNumber(phoneNumber) {
  return phoneNumber.length === 17;
}
phoneInput.onkeyup = function (e) {
  if (isUniquePhoneNumber(phoneInput.value)) {
    updateFieldError(
      phoneInput,
      false,
      "Такой номер телефона уже зарегистрирован",
      "This phone number has already been registered"
    );
  } else {
    let isPhoneValid = validatePhoneNumber(phoneInput.value);
    updateFieldError(
      phoneInput,
      isPhoneValid,
      "Длинна номера должна быть 17 символов",
      "The phone number must be 17 characters long"
    );
  }
};
// Проверка ввода почты
function validateEmail(email) {
  var re =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}

function isUniqueEmail(email) {
  return usersArray.some((person) => person.email == email);
}
emailInput.onkeyup = function (e) {
  if (isUniqueEmail(emailInput.value)) {
    updateFieldError(
      emailInput,
      false,
      "Пользователь с такой почтой существует",
      "A user with this email exists"
    );
  } else {
    let isEmailValid = validateEmail(emailInput.value);
    updateFieldError(
      emailInput,
      isEmailValid,
      "Неправильный адрес почты",
      "Incorrect email address"
    );
  }
};

// Проверка ввода дня рождения
function validateBirthday(Birthday) {
  let birthday = new Date(Birthday);
  let age = Date.now() - birthday.getTime();
  let ageDate = new Date(age);
  let years = Math.abs(ageDate.getUTCFullYear() - 1970);
  console.log(years > 16);
  return years >= 16;
}
birthdayInput.onkeyup = function (e) {
  let isBerthdayValid = validateBirthday(birthdayInput.value);
  updateFieldError(
    birthdayInput,
    isBerthdayValid,
    "Вам должно быть 16 лет",
    "You must be 16 years old"
  );
};

// Проверка ввода имени
function isValidName(name) {
  // Проверяем, что имя состоит только из букв (английских и русских)
  return /^[a-zA-Zа-яА-Я]+$/.test(name);
}
nameInput.onkeyup = function (e) {
  if (!isValidName(nameInput.value)) {
    updateFieldError(
      nameInput,
      false,
      "Имя не может содержать цифр",
      "The name cannot contain numbers"
    );
  } else {
    updateFieldError(
      nameInput,
      nameInput.value.length > 2,
      "Имя не может быть меньше трех символов",
      "The name cannot be less than three characters"
    );
  }
};

// Проверка ввода фамилии
surnameInput.onkeyup = function (e) {
  if (!isValidName(surnameInput.value)) {
    updateFieldError(
      surnameInput,
      false,
      "Фамилия не может содержать цифр",
      "Last name cannot contain numbers"
    );
  } else {
    updateFieldError(
      surnameInput,
      surnameInput.value.length > 2,
      "Фамилия не может быть меньше двух символов",
      "Last name cannot be less than two characters"
    );
  }
};

function containsAny(arr) {
  let str = document.getElementById("password-input").value;
  console.log(str);
  for (let i = 0; i < str.length; i++) {
    let bool = arr.some((x) => x == str[i]);
    if (bool) {
      return true;
    }
  }
  return false;
}

// Проверка ввода пароля
function isPasswordValid(surnameInput) {
  if (
    document.querySelector("#password-input").value.length > 8 &&
    containsAny(alphabet) &&
    containsAny(alphabetUpper) &&
    containsAny(numbers) &&
    containsAny(specialCharacters)
  ) {
    return true;
  }
}

passwordInput.onkeyup = function (e) {
  passwordInput.type = "password";
  let isValid = isPasswordValid(passwordInput.value);
  updateFieldError(
    passwordInput,
    isValid,
    "Пароль должен быть не менее 8 символов, содержать буквы, цифры и спецсимволы",
    "The password must be at least 8 characters and contain letters, numbers and special characters"
  );
  if (isValid && isPasswordMatch()) {
    // console.log("Они одинаковые");
    updateFieldError(repeatPasswordInput, true, "");
  } else {
    updateFieldError(
      repeatPasswordInput,
      false,
      "Пароли должны совпадать",
      "Passwords must match"
    );
  }
};

// проверка ввода повтора пароля
function isPasswordMatch() {
  return passwordInput.value == repeatPasswordInput.value;
}
repeatPasswordInput.onkeyup = function (e) {
  let isPreviousPassordValid = isPasswordValid(passwordInput.value);
  let isMatch = isPasswordMatch();
  if (!isPreviousPassordValid) {
    updateFieldError(
      repeatPasswordInput,
      false,
      "В прошлом поле введен не корректный пароль",
      "The password entered in the previous field is incorrect."
    );
  } else {
    updateFieldError(
      repeatPasswordInput,
      isMatch,
      "Пароли должны совпадать",
      "Passwords must match"
    );
  }
};

// Проверка ввода ника

function isValidNickname(nickname) {
  console.log(usersArray);
  return usersArray.some((nick) => nick.nickname == nickname);
}

nickNameInput.onkeyup = function (e) {
  updateFieldError(
    nickNameInput,
    !isValidNickname(nickNameInput.value),
    "Пользователь с таким ником уже существует",
    "A user with this nickname already exists"
  );
};

// генерация ника
function generateNickName() {
  const adjectives = ["Quick", "Silent", "Brave", "Smart", "Strong", "Cunning"];
  const nouns = ["Tiger", "Owl", "Hawk", "Lion", "Wolf", "Fox"];

  // Выбираем случайный прилагательное и существительное
  const adjective = adjectives[Math.floor(Math.random() * adjectives.length)];
  const noun = nouns[Math.floor(Math.random() * nouns.length)];

  // Формируем уникальный ник
  let nickname = `${adjective}${noun}${usersArray.length + 1}`;

  // Проверяем, что ник уникален
  while (usersArray.some((user) => user.nickname === nickname)) {
    nickname = `${adjective}${noun}${usersArray.length + 1}`;
  }

  return nickname;
}
generateNicknameButton.onclick = function (e) {
  nickNameInput.value = generateNickName();
  updateFieldError(
    nickNameInput,
    !isValidNickname(nickNameInput.value),
    "Пользователь с таким ником уже существует",
    "A user with this nickname already exists"
  );
  console.log(nickNameInput.value);
};

// генерация пароля

let alphabetUpper = [
  "A",
  "B",
  "C",
  "D",
  "E",
  "F",
  "G",
  "H",
  "I",
  "J",
  "K",
  "L",
  "M",
  "N",
  "O",
  "P",
  "Q",
  "R",
  "S",
  "T",
  "U",
  "V",
  "W",
  "X",
  "Y",
  "Z",
];
let alphabet = [
  "a",
  "b",
  "c",
  "d",
  "e",
  "f",
  "g",
  "h",
  "i",
  "j",
  "k",
  "l",
  "m",
  "n",
  "o",
  "p",
  "q",
  "r",
  "s",
  "t",
  "u",
  "v",
  "w",
  "x",
  "y",
  "z",
];
let numbers = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
let specialCharacters = [
  "!",
  "@",
  "#",
  "$",
  "%",
  "^",
  "&",
  "*",
  "(",
  ")",
  "-",
  "_",
  "=",
  "+",
  "[",
  "]",
  "{",
  "}",
  ";",
  ":",
  ",",
  ".",
  "<",
  ">",
  "/",
  "?",
  "|",
  "~",
  "`",
];

let ollArray = [alphabetUpper, alphabet, specialCharacters, numbers];

function generatePassword() {
  function generatePasswordLetter(arr) {
    let number = Math.floor(Math.random() * arr.length);
    return arr[number];
  }

  let lengthPassword = Math.floor(Math.random() * (20 - 8 + 1)) + 8;
  let password = [];
  let str = "";
  for (let i = 0; i < 4; i++) {
    let index = Math.floor(Math.random() * lengthPassword);
    if (password[i] == null) {
      password[i] = generatePasswordLetter(ollArray[i]);
    }
  }
  for (let i = 0; i < lengthPassword; i++) {
    if (password[i] == null) {
      password[i] = generatePasswordLetter(
        ollArray[Math.floor(Math.random() * 4)]
      );
    }
    str += password[i];
  }
  return str;
}
generatePasswordButton.onclick = function (e) {
  let password = generatePassword();
  passwordInput.value = password;
  repeatPasswordInput.value = password;
  passwordInput.nextElementSibling.style.display = "none";
  repeatPasswordInput.nextElementSibling.style.display = "none";
  passwordInput.type = "text";
};

var modal = document.getElementById("myModal");
var link = document.getElementById("myLink");
var span = document.getElementsByClassName("close")[0];
span.onclick = function () {
  modal.style.display = "none";
};

link.onclick = function () {
  modal.style.display = "block";
};

window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
};

document.getElementById("Agree").onclick = function (e) {
  modal.style.display = "none";
  document.getElementById("checkbox-user-agreement").checked = true;
};
let Person;
buttonRegistration.onclick = function (e) {
  console.log(usersArray.length + " users");
  let errors = Array.from(document.querySelectorAll(".error-span")).filter(
    (el) => window.getComputedStyle(el).display !== "none"
  );
  let countErrors = errors.length;

  let obligations = Array.from(
    document.querySelectorAll(".Obligatory-field")
  ).filter((el) => window.getComputedStyle(el).display !== "none");
  let countObligations = obligations.length;

  console.log(countErrors);
  console.log(countObligations);
  if (
    countErrors == 0 &&
    countObligations == 0 &&
    document.getElementById("checkbox-user-agreement").checked == true
  ) {
    Person = {
      phone: document.getElementById("phone").value,
      email: document.getElementById("email").value,
      birthday: document.getElementById("BirthdayID").value,
      firstName: document.getElementById("first-name").value,
      secondName: document.getElementById("second-name").value,
      LastName: document.getElementById("last-name").value,
      nickname: document.getElementById("nickname").value,
      password: document.getElementById("password-input").value,
    };

    usersArray.push(Person);
    console.log(usersArray.length + " users");
    console.log(Person);
    console.log("Все ок");
    document.getElementById("finish-modal").style.display = "block";
    document.querySelector("body").classList.add("bodyOverflow");
    sessionStorage.setItem("users", JSON.stringify(usersArray));
  }
  console.log(usersArray.length + " users");
};

document.getElementById("button-continue").onclick = function (e) {
  sessionStorage.setItem("current-user", JSON.stringify(Person));
  console.log(sessionStorage);
  window.location.href = "/MainPage/index.html";
};

document.getElementById("button-exit").onclick = function (e) {
  window.history.back();
  window.history.back();
};

console.log(document.getElementById("Enter"));
document.getElementById("Enter").onclick = function (e) {
  console.log("rstrst");
  window.location.href = "/Autorization/index.html";
};

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

function goHome() {
  window.location.href = "/MainPage/index.html";
}

function back() {
  window.history.back();
}
