document.getElementById('submitButton').addEventListener('click', sendLog);


function getUserId(userObj, username) {
  if (username == userObj.username)
    localStorage.setItem("id", userObj.id);
}

function callAPIgetUser(id, username, getUserId) {
  const xhttp = new XMLHttpRequest();

  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      const userObj = JSON.parse(xhttp.responseText);
      getUserId(userObj, username);
    }
  };
  xhttp.open("GET", "http://localhost:8080/api/users/" + id, true);
  xhttp.send();
}


function sendLog() {
  let usernameValue = document.getElementById('username').value;
  let passwordValue = document.getElementById('password').value;

  let xhttp = new XMLHttpRequest();

  const userObj = {
    username: usernameValue,
    password: passwordValue
  };

  const notifyDiv = document.querySelector(".notify");
  const notifyMsg = document.querySelector(".notify p");

  let user = JSON.stringify(userObj);

  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      let isLoggedIn = true;

      for (let i = 1; i < 20; i++)
        callAPIgetUser(i, usernameValue, getUserId);

      localStorage.setItem("loggedIn", isLoggedIn);
      localStorage.setItem("username", usernameValue);
      window.location.href = '../index.html';
    }
    else {
      notifyDiv.style.top = "4rem";
      notifyMsg.innerHTML = "Username or password is incorrect";

      setTimeout(function () {
        notifyDiv.style.top = "-100%";
      }, 4000);
    }
  };

  xhttp.open("POST", "http://localhost:8080/api/auth/login", true);
  xhttp.setRequestHeader("Content-type", "application/json");
  xhttp.send(user);
}

