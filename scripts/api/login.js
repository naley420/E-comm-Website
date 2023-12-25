document.getElementById('submitButton').addEventListener('click', sendLog);


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
      const userResponse = JSON.parse(xhttp.responseText);

      if (userResponse.id == 1) {
        localStorage.setItem('isAdmin', 'true');
      }
      else {
        localStorage.setItem('isAdmin', 'false');
      }

      localStorage.setItem("loggedIn", isLoggedIn);
      localStorage.setItem("id", userResponse.id);
      localStorage.setItem("username", userResponse.username);


      if (localStorage.getItem("queue") == "true") {
        window.location.href = "./product.html";
      }
      else {
        window.location.href = '../index.html';
      }
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
