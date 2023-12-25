const userId = localStorage.getItem('userUpdateId');

function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

function checkReg(username, email, password, address, phone) {
  if (username == "" || email == "" || password == "" || address == "" || phone == "")
    return "Please fill out all the required fields";
  if (!isValidEmail(email))
    return "Please enter a valid email";
  return "OK";
};

function getUser() {
  var xhttp = new XMLHttpRequest();

  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      const user = JSON.parse(xhttp.responseText);
      usernameInital = user.username;
      emailInital = user.email;
      phoneInital = user.phone;
      addressInital = user.address;
    }
  }

  xhttp.open("GET", "http://localhost:8080/api/users/" + userId, true);
  xhttp.send();
};

function sendReg() {
  const usernameUpdate = document.getElementById('username').value;
  const emailUpdate = document.getElementById('email').value;
  const passwordUpdate = document.getElementById('password').value;
  const phoneUpdate = document.getElementById('phone').value;
  const addressUpdate = document.getElementById('address').value;

  if (checkReg(usernameUpdate, emailUpdate, passwordUpdate, phoneUpdate, addressUpdate) == "OK") {
    const userObj = {
      username: usernameUpdate,
      email: emailUpdate,
      password: passwordUpdate,
      address: addressUpdate,
      phone: phoneUpdate
    };

    const user = JSON.stringify(userObj);

    var xhttp = new XMLHttpRequest();

    const username = 'admin';
    const password = 'admin';
    const base64Credentials = btoa(username + ':' + password);

    xhttp.onreadystatechange = function () {
      if (this.readyState == 4 && this.status == 200) {
        window.location.href = './admin.html';
      }

    };

    xhttp.open("PUT", "http://localhost:8080/api/users/" + userId, true);
    xhttp.setRequestHeader("Content-type", "application/json");
    xhttp.setRequestHeader('Authorization', 'Basic ' + base64Credentials);
    xhttp.send(user);
  }

  else {
    const notifyDiv = document.querySelector(".notify");
    const notifyMsg = document.querySelector(".notify p");
    notifyDiv.style.top = "2rem";

    notifyMsg.innerHTML = checkReg(usernameUpdate, emailUpdate, passwordUpdate, phoneUpdate, addressUpdate);

    setTimeout(() => {
      notifyDiv.style.top = "-100%";
    }, 4500);
  }
}

let usernameInital = "";
let emailInital = "";
let passwordInital = "";
let phoneInital = "";
let addressInital = "";

getUser(userId);

const usernameValue = document.getElementById('username');
const emailValue = document.getElementById('email');
const passwordValue = document.getElementById('password');
const phoneValue = document.getElementById('phone');
const addressValue = document.getElementById('address');

setTimeout(() => {
  usernameValue.value = usernameInital;
  emailValue.value = emailInital;
  passwordValue.value = passwordInital;
  phoneValue.value = phoneInital;
  addressValue.value = addressInital;
}, 200);


document.getElementById('submitButton').addEventListener('click', sendReg);
