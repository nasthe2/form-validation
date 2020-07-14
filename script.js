const form = document.querySelector(".form");

form.addEventListener("submit", (e) => {
  e.preventDefault();
});

function validation() {
  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const phone = document.getElementById("phone").value;
  
  nameValidation(name);
}

function nameValidation(name) {
  const noNumber = name.match(/\d/) === null;
  const isFullName = name.trim().split(' ').length === 3;
  let upperCaseFixes = 0;
  name.trim().split(' ').forEach(item => {
    item[0] === item[0].toUpperCase() ? upperCaseFixes : upperCaseFixes++;
  });

  console.log(noNumber, isFullName, upperCaseFixes);
  console.log(noNumber && isFullName && !upperCaseFixes);

  if (noNumber && isFullName && !upperCaseFixes) {
    return true
  } else {
    alert('опа');
  }
}