document.getElementById('submitButton').addEventListener('click', sendReg);

function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

function checkReg(username, email, password, confirmPassword, address, phone) {
  if (username == "" || email == "" || password == "" || confirmPassword == "" || address == "" || phone == "")
    return "Please fill out all the required fields";
  if (password != confirmPassword)
    return "The password does not match the confirm password";
  if (!isValidEmail(email))
    return "Please enter a valid email";
  return "OK";
};

function sendReg() {
  const usernameValue = document.getElementById('username').value;
  const emailValue = document.getElementById('email').value;
  const passwordValue = document.getElementById('password').value;
  const confirmPasswordValue = document.getElementById('confirmPassword').value;
  const phoneValue = document.getElementById('phone').value;
  const addressValue = document.getElementById('address').value;

  if (checkReg(usernameValue, emailValue, passwordValue, confirmPasswordValue, phoneValue, addressValue) == "OK") {
    const userObj = {
      username: usernameValue,
      email: emailValue,
      password: passwordValue,
      address: addressValue,
      phone: phoneValue
    };

    const user = JSON.stringify(userObj);

    let xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
      if (this.readyState == 4 && this.status == 200) {
        const notifyDiv = document.querySelector(".notify");
        const notifyMsg = document.querySelector(".notify p");

        const responseText = xhttp.responseText;
        if (responseText == "Username is already registered" || responseText == "Email is already registered") {
          notifyMsg.innerHTML = responseText;
          notifyDiv.style.top = "2rem";
          setTimeout(function () {
            notifyDiv.style.top = "-100%";
          }, 4000);
        }
        else {
          window.location.href = 'login.html';
        }
      }
    };

    xhttp.open("POST", "http://localhost:8080/api/auth/register", true);
    xhttp.setRequestHeader("Content-type", "application/json");
    xhttp.send(user);
  }
  else {
    const notifyDiv = document.querySelector(".notify");
    const notifyMsg = document.querySelector(".notify p");
    notifyDiv.style.top = "2rem";

    notifyMsg.innerHTML = checkReg(usernameValue, emailValue, passwordValue, confirmPasswordValue, phoneValue, addressValue);

    setTimeout(() => {
      notifyDiv.style.top = "-100%";
    }, 4500);
  }
}

