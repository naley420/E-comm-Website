document.getElementById('submitButton').addEventListener('click', sendLog);


function sendLog() {
  let usernameValue = document.getElementById('username').value;
  let passwordValue = document.getElementById('password').value;

  let xhttp = new XMLHttpRequest();

  const userObj = {
    username: usernameValue,
    password: passwordValue
  };

  let user = JSON.stringify(userObj);

  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      let isLoggedIn = true;
      localStorage.setItem("loggedIn", isLoggedIn);
      localStorage.setItem("username", usernameValue);
      window.location.href = '../index.html';
    }
    else {
      const notifyDiv = document.querySelector(".notify");
      const notifyMsg = document.querySelector(".notify p");
      notifyDiv.style.top = "4rem";
      notifyMsg.style.color = "red";
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
