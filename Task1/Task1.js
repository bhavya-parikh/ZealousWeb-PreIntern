const dateTimeInputElement = document.getElementById("dateTimeInput");
const remainingTimeElement = document.getElementById("remainingTimeDisplay");
const bodyElement = document.getElementsByTagName("body");
let countdownInterval = null;

function startCountDown() {
  const selectedDateAndTime = dateTimeInputElement.value;
  const targetDate = new Date(selectedDateAndTime);

  if (!selectedDateAndTime) {
    alert("Please select a date and time first!");
  } else if (targetDate < new Date()) {
    alert(
      "The selected date and time is in the past. Please select a future time."
    );
  } else {
    if (validOldTimerExist()) {
      const overrideOldTimer = confirm(
        "Old Timer exists. Do you want to override it?"
      );
      if (!overrideOldTimer) {
        return;
      } else {
        clearExistingTimer();
        document.cookie = `selectedDateAndTime=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;`;
      }
    }

    alert("Countdown Started");
    document.cookie = `selectedDateAndTime=${targetDate}; expires=${targetDate};`;

    countdownInterval = setInterval(() => {
      const now = new Date();
      const remainingTime = targetDate - now;

      if (remainingTime > 0) {
        const days = Math.floor(remainingTime / (1000 * 60 * 60 * 24));
        const hours = Math.floor(
          (remainingTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
        );
        const minutes = Math.floor(
          (remainingTime % (1000 * 60 * 60)) / (1000 * 60)
        );
        const seconds = Math.floor((remainingTime % (1000 * 60)) / 1000);

        remainingTimeElement.innerHTML = `${days} Days ${hours} Hours ${minutes} Minutes ${seconds} Seconds`;
      } else {
        clearInterval(countdownInterval);
        remainingTimeElement.innerHTML = "Time’s up!";
        bodyElement[0].style.backgroundColor = "red";
      }
    }, 1000);
  }
}

function validOldTimerExist() {
  const cookies = document.cookie.split("; ");
  const selectedDateCookie = cookies.find((cookie) =>
    cookie.startsWith("selectedDateAndTime=")
  );

  if (selectedDateCookie) {
    const targetDate = new Date(selectedDateCookie.split("=")[1]);

    if (targetDate > new Date()) {
      return targetDate;
    } else {
      return false;
    }
  }
  return false;
}

function clearExistingTimer() {
  if (countdownInterval) {
    clearInterval(countdownInterval);
    countdownInterval = null;
  }
}

window.onload = function () {
  let targetDate = validOldTimerExist();

  if (targetDate) {
    clearExistingTimer();

    countdownInterval = setInterval(() => {
      const now = new Date();
      const remainingTime = targetDate - now;

      if (remainingTime > 0) {
        const days = Math.floor(remainingTime / (1000 * 60 * 60 * 24));
        const hours = Math.floor(
          (remainingTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
        );
        const minutes = Math.floor(
          (remainingTime % (1000 * 60 * 60)) / (1000 * 60)
        );
        const seconds = Math.floor((remainingTime % (1000 * 60)) / 1000);

        remainingTimeElement.innerHTML = `${days} Days ${hours} Hours ${minutes} Minutes ${seconds} Seconds`;
      } else {
        clearInterval(countdownInterval);
        remainingTimeElement.innerHTML = "Time’s up!";
      }
    }, 1000);
  }
};
