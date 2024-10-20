const nameInput = document.getElementById("nameInput");
const emailInput = document.getElementById("emailInput");
const ageInput = document.getElementById("ageInput");
const genderInput = document.getElementById("genderInput");

const nameErrorMsg = document.getElementById("nameErrorMsg");
const emailErrorMsg = document.getElementById("emailErrorMsg");
const ageErrorMsg = document.getElementById("ageErrorMsg");
const genderErrorMsg = document.getElementById("genderErrorMsg");

function validateForm() {
  nameErrorMsg.innerText = "";
  emailErrorMsg.innerText = "";
  ageErrorMsg.innerText = "";
  genderErrorMsg.innerText = "";

  let isValid = true;

  if (!nameInput.value.trim()) {
    nameErrorMsg.innerText = "Please enter your name.";
    isValid = false;
  }

  if (!validateEmail(emailInput.value)) {
    emailErrorMsg.innerText = "Please enter a valid email.";
    isValid = false;
  }

  if (ageInput.value < 18) {
    ageErrorMsg.innerText = "Age must be greater than or equal to 18.";
    isValid = false;
  }

  if (!genderInput.value) {
    genderErrorMsg.innerText = "Please select your gender.";
    isValid = false;
  }

  if (isValid) {
    storeFormData();
  }

  return isValid;
}

function validateEmail(email) {
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailPattern.test(email);
}

function storeFormData() {
  const formData = {
    name: nameInput.value,
    email: emailInput.value,
    age: ageInput.value,
    gender: genderInput.value,
  };

  localStorage.setItem("formData", JSON.stringify(formData));
  alert("Form submitted and data stored in localStorage!");
}
