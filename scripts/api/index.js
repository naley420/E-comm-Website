const cartBtn = document.getElementById("cartLink");

const checkLog = localStorage.getItem("loggedIn");
const userId = localStorage.getItem("id");

const username = "admin";
const password = "admin";
const base64Credentials = btoa(username + ':' + password);

if (checkLog == "true") {
  cartBtn.addEventListener("click", createCart(userId));
}

function createCart(id) {
  var xhttp = new XMLHttpRequest();

  const username = 'admin';
  const password = 'admin';

  const base64Credentials = btoa(username + ':' + password);

  xhttp.open("POST", "http://localhost:8080/api/users/" + id + "/carts", true);
  xhttp.setRequestHeader('Authorization', 'Basic ' + base64Credentials);
  xhttp.send();
}

