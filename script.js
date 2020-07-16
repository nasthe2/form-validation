const form = document.querySelector(".form");

const delay = ms => {
  return new Promise(r => setTimeout(() => r(), ms));
};

form.addEventListener("submit", (e) => {
  e.preventDefault();
});

function validation() {  
  const data = {};

  const isNameValid = nameValidation();
  const isEmailValid = emailValidation();
  const isPhoneValid = phoneValidation();

  if (isNameValid && isEmailValid && isPhoneValid) {
    data.name = isNameValid;
    data.email = isEmailValid;
    data.phone = isPhoneValid;

    const formData = new FormData(form);

    Object.keys(data).forEach(key => formData.append(key, data[key]));
    console.log(formData);    
  }
};

function nameValidation() {
  const userName = document.getElementById("name").value.trim();
  document.getElementById("name").classList.remove("form__input-valid", "form__input-invalid");
  let nameError = document.querySelector(".error__name");
  nameError.innerHTML = "";

  const noNumber = userName.match(/\d/) === null;
  const isFullName = (userName.split(" ").length === 3) && (userName.split(" ").filter(i => i.length > 1).length === 3);
  let upperCaseFixes = 0;
  let nameValidationError = "";

  userName.trim().split(" ").forEach(item => {
    item[0] === item[0].toUpperCase() ? upperCaseFixes : upperCaseFixes++;
  });

  if (noNumber && isFullName && !upperCaseFixes) {
    document.getElementById("name").classList.add("form__input-valid");
    return userName;
  } else {
    if (!noNumber) {
      nameValidationError += "Имя не должно содержать цифр. ";
    } 
    if (!isFullName) {
      nameValidationError += "Введите фамилию, имя и отчество полностью. ";
    } 
    if (upperCaseFixes) {
      nameValidationError += "Первые символы должны быть заглавными.";
    }

    document.getElementById("name").classList.add("form__input-invalid");
    nameError.innerHTML = nameValidationError;
    return false;
  }
};

function emailValidation() {
  const userEmail = document.getElementById("email").value.trim();
  document.getElementById("email").classList.remove("form__input-valid", "form__input-invalid");
  let emailError = document.querySelector(".error__email");
  emailError.innerHTML = "";

  let emailValidationError = "";

  if (userEmail.trim().split("@")[1] === "gmail.com") {
    document.getElementById("email").classList.add("form__input-valid");
    return userEmail;
  } else {
    emailValidationError += "Ваш Email должен принадлежать домену gmail.com.";

    document.getElementById("email").classList.add("form__input-invalid");
    emailError.innerHTML = emailValidationError;
    return false;
  }  
};

function phoneValidation() {
  const userPhone = document.getElementById("phone").value.trim();
  document.getElementById("phone").classList.remove("form__input-valid", "form__input-invalid");
  let phoneError = document.querySelector(".error__phone");
  phoneError.innerHTML = "";

  let phoneValidationError = "";

  if (userPhone.match(/^(8|\+7|07)\d{10}$/)) {
    document.getElementById("phone").classList.add("form__input-valid");
    return userPhone;
  } else {
    phoneValidationError += "Ваш телефон не соответствует формату.";
    
    phoneError.innerHTML = phoneValidationError;
    document.getElementById("phone").classList.add("form__input-invalid");
    return false;
  }  
};

document.querySelector(".form").addEventListener("paste",
function (event) {
  event.preventDefault();
  let clipboard = event.clipboardData;
  let input = clipboard.getData("Text");
  event.target.value = input.trim();
}, false);

document.getElementById("phone").addEventListener("paste",
function (event) {
  event.preventDefault();
  let clipboard = event.clipboardData;
  let phone = clipboard.getData("Text");
  event.target.value = phone.replace(/[^+0-9]/gim, "");
}, false);

