loadUsers();
loadProducts();

function loadUsers() {
  var xhttp = new XMLHttpRequest();

  const username = 'admin';
  const password = 'admin';

  const base64Credentials = btoa(username + ':' + password);

  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      const users = JSON.parse(xhttp.responseText);
      let userOutput = "";

      for (let i = 0; i < users.length; i++) {
        userOutput +=
          '<tr>' +
          '<td class="user-id">' + users[i].id + '</td>' +
          '<td class="user-username">' + users[i].username + '</td>' +
          '<td class="user-email">' + users[i].email + '</td>' +
          '<td class="user-address">' + users[i].address + '</td>' +
          '<td class="user-phone">' + users[i].phone + '</td>' +
          '<td class="user-action">' +
          '<button class="user-update-btn"><i class="fa-solid fa-pen-to-square"></i></button>' +
          '<button class="user-delete-btn"><i class="fa-solid fa-trash"></i></button>' +
          '</td>' +
          '</tr>'
      }

      document.getElementsByClassName("table-data")[0].innerHTML += userOutput;
    }
  }

  xhttp.open("GET", "http://localhost:8080/api/users", true);
  xhttp.setRequestHeader('Authorization', 'Basic ' + base64Credentials);
  xhttp.send();
}

function loadProducts() {
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      const products = JSON.parse(xhttp.responseText);
      let productOutput = "";

      for (let i = 0; i < products.length; i++) {
        let image_url = `../css/resources/products/product-${products[i].id}.png`;
        productOutput +=
          '<tr>' +
          '<td class="product-id">' + products[i].id + '</td>' +
          '<td class="product-img"><img src="' + image_url + '" alt="" srcset=""></td>' +
          '<td class="product-name">' + products[i].name + '</td>' +
          '<td class="product-description">' + products[i].description + '</td >' +
          '<td class="product-price">' + products[i].price + '</td>' +
          '<td class="product-quantity">' + products[i].quantity + '</td>' +
          '<td class="product-size">' + products[i].size + '</td>' +
          '<td class="product-texture">' + products[i].texture + '</td>' +
          '<td class="product-weight">' + products[i].weight + '</td>' +
          '<td class="product-category">' + products[i].categoryName + '</td>' +
          '<td class="product-action">' +
          '<button class="product-update-btn"><i class="fa-solid fa-pen-to-square"></i></button>' +
          '<button class="product-delete-btn"><i class="fa-solid fa-trash"></i></button>' +
          '</td>' +
          '</tr>'
      }

      document.getElementsByClassName("table-data")[1].innerHTML += productOutput;
    }
  }

  xhttp.open("GET", "http://localhost:8080/api/products", true);
  xhttp.send();
};

function deleteUser(id) {
  var xhttp = new XMLHttpRequest();

  const username = 'admin';
  const password = 'admin';

  const base64Credentials = btoa(username + ':' + password);

  xhttp.open("DELETE", "http://localhost:8080/api/users/" + id, true);
  xhttp.setRequestHeader('Authorization', 'Basic ' + base64Credentials);
  xhttp.send();
};

function deleteProduct(id) {
  var xhttp = new XMLHttpRequest();

  const username = 'admin';
  const password = 'admin';

  const base64Credentials = btoa(username + ':' + password);

  xhttp.open("DELETE", "http://localhost:8080/api/products/" + id, true);
  xhttp.setRequestHeader('Authorization', 'Basic ' + base64Credentials);
  xhttp.send();
};

setTimeout(() => {
  const userDeleteBtns = document.getElementsByClassName("user-delete-btn");
  const productDeleteBtns = document.getElementsByClassName("product-delete-btn");

  for (let i = 0; i < userDeleteBtns.length; i++) {
    userDeleteBtns[i].addEventListener('click', function () {
      const rowId = this.closest('tr').querySelector('td:first-child').textContent;
      deleteUser(rowId);
      window.location.reload();
    });
  };

  for (let i = 0; i < productDeleteBtns.length; i++) {
    productDeleteBtns[i].addEventListener('click', function () {
      const rowId = this.closest('tr').querySelector('td:first-child').textContent;
      deleteProduct(rowId);
      setTimeout(() => { window.location.reload(); }, 200)
    });
  };


  const userAddBtn = document.getElementsByClassName("user-add-btn");
  const productAddBtn = document.getElementsByClassName("product-add-btn");

  userAddBtn[0].addEventListener("click", () => {
    window.location.href = "../pages/add-user.html"
  });
  productAddBtn[0].addEventListener("click", () => {
    window.location.href = "../pages/add-product.html"
  });

  const userUpdateBtns = document.getElementsByClassName("user-update-btn");
  const productUpdateBtns = document.getElementsByClassName("product-update-btn");

  for (let i = 0; i < userUpdateBtns.length; i++) {
    userUpdateBtns[i].addEventListener('click', function () {
      const rowId = this.closest('tr').querySelector('td:first-child').textContent;
      localStorage.setItem("userUpdateId", rowId);
      window.location.href = "../pages/update-user.html"
    });
  };

  for (let i = 0; i < productUpdateBtns.length; i++) {
    productUpdateBtns[i].addEventListener('click', function () {
      const rowId = this.closest('tr').querySelector('td:first-child').textContent;
      localStorage.setItem("productUpdateId", rowId);
      window.location.href = "../pages/update-product.html"
    });
  };
}, 400);