const cartId = localStorage.getItem("id");
const totalPriceElement = document.getElementById("total");
const clearBtn = document.getElementById("clear-btn");
const buyBtn = document.getElementById("buy-btn");
const notifyDiv = document.querySelector(".notify");
const notifyMsg = document.querySelector(".notify p");

let totalPrice = 0;

function loadProducts() {
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      const cart = JSON.parse(xhttp.responseText);
      const products = cart.productDtos;

      const uniqueProducts = {};

      for (const product of products) {
        const key = product.id;

        if (uniqueProducts.hasOwnProperty(key)) {
          uniqueProducts[key].quantity++;
          uniqueProducts[key].allPrice += product.price;
        } else {
          uniqueProducts[key] = {
            id: product.id,
            name: product.name,
            price: product.price,
            stock: product.quantity,
            quantity: 1,
            allPrice: product.price
          };
        }
      }

      const resultArray = Object.values(uniqueProducts);

      let output = "";

      for (const product of resultArray) {
        const image_url = `../css/resources/products/product-${product.id}.png`
        totalPrice += product.allPrice
        output +=
          '<div class="product">' +
          '<div class="product-img">' +
          '<img src="' + image_url + '" alt="">' +
          '</div>' +
          '<div class="product-details">' +
          '<a href="./product.html">' + product.name + '</a>' +
          '<span class="product-stock hidden">' + product.stock + '</span>' +
          '<span class="product-id hidden">' + product.id + '</span>' +
          '<div class="product-btns">' +
          '<button class="decrease">-</button>' +
          '<p class="product-quantity">' + product.quantity + '</p>' +
          '<button class="increase">+</button>' +
          '</div>' +
          '</div>' +
          '<div class="product-price">' +
          '<p>' + product.allPrice + ' $ </p>' +
          '</div>' +
          '<button class="remove-btn">Remove</button>' +
          '</div>' +
          '</div>'
      }
      document.getElementsByClassName("product-side")[0].innerHTML += output;
    }
  }
  xhttp.open("GET", "http://localhost:8080/api/carts/" + cartId, true);
  xhttp.send();
};

function clearProduct() {
  var xhttp = new XMLHttpRequest();

  const username = 'admin';
  const password = 'admin';
  const base64Credentials = btoa(username + ':' + password);

  xhttp.open("DELETE", "http://localhost:8080/api/carts/" + cartId + "/products", true);
  xhttp.setRequestHeader('Authorization', 'Basic ' + base64Credentials);
  xhttp.send();

  setTimeout(() => {
    window.location.reload();
  }, 200);
};

function removeProduct(id) {
  var xhttp = new XMLHttpRequest();

  const url = `http://localhost:8080/api/carts/${cartId}/products/${id}`;

  const username = 'admin';
  const password = 'admin';
  const base64Credentials = btoa(username + ':' + password);

  xhttp.open("DELETE", url, true);
  xhttp.setRequestHeader('Authorization', 'Basic ' + base64Credentials);
  xhttp.send();

  setTimeout(() => {
    window.location.reload();
  }, 200)
}

function notifySuccess() {
  notifyMsg.innerHTML = "Buying successfully";
  notifyDiv.style.top = "2rem";

  setTimeout(function () {
    notifyDiv.style.top = "-100%";
  }, 2000);
}

function notifyFailure() {
  notifyMsg.innerHTML = "Cart is empty";
  notifyDiv.style.top = "2rem";

  setTimeout(function () {
    notifyDiv.style.top = "-100%";
  }, 2000);
}

function notifyOutOfStock() {
  notifyMsg.innerHTML = "Out Of Stock";
  notifyDiv.style.top = "2rem";

  setTimeout(function () {
    notifyDiv.style.top = "-100%";
  }, 2000);
}

function increasePrice(price) {
  totalPrice += price;
  totalPriceElement.innerHTML = `$ ${totalPrice}`;
}

function decreasePrice(price) {
  totalPrice -= price;
  totalPriceElement.innerHTML = `$ ${totalPrice}`;
}

loadProducts();

setTimeout(() => {
  const removeBtns = document.getElementsByClassName("remove-btn");
  const increaseBtns = document.getElementsByClassName("increase");
  const decreaseBtns = document.getElementsByClassName("decrease");

  totalPriceElement.innerHTML = `$ ${totalPrice}`;

  clearBtn.addEventListener("click", () => {
    if (totalPrice == 0) {
      notifyFailure();
    }
    else {
      clearProduct();
    }
  });

  for (let i = 0; i < removeBtns.length; i++) {
    removeBtns[i].addEventListener('click', function (event) {
      const productDiv = event.target.closest('.product');
      const productIdElement = productDiv.querySelector('.product-id');
      const productId = productIdElement.innerHTML;
      removeProduct(productId);
    });
  }

  for (let i = 0; i < increaseBtns.length; i++) {
    increaseBtns[i].addEventListener("click", function (event) {
      const productDiv = event.target.closest('.product');
      const productStockElement = productDiv.querySelector(".product-stock");
      const productQuantityElement = productDiv.querySelector(".product-quantity");

      let stockQuantity = parseFloat(productStockElement.innerHTML);
      let currQuantity = parseFloat(productQuantityElement.innerHTML);

      if (currQuantity < stockQuantity) {
        let changedQuantity = currQuantity + 1;
        productQuantityElement.innerHTML = changedQuantity;

        const basePriceElement = productDiv.querySelector('.product-price p');
        let basePrice = parseFloat(basePriceElement.innerHTML) / currQuantity;
        let changedPrice = basePrice * changedQuantity;
        basePriceElement.innerHTML = `${changedPrice} $`;

        increasePrice(basePrice);
      }
      else {
        notifyOutOfStock();
      }
    })
  }

  for (let i = 0; i < decreaseBtns.length; i++) {
    decreaseBtns[i].addEventListener("click", function (event) {
      const productDiv = event.target.closest('.product');
      const productQuantityElement = productDiv.querySelector(".product-quantity");

      let currQuantity = parseFloat(productQuantityElement.innerHTML);

      if (currQuantity > 1) {
        let changedQuantity = currQuantity - 1;
        productQuantityElement.innerHTML = changedQuantity;

        const basePriceElement = productDiv.querySelector('.product-price p');
        let basePrice = parseFloat(basePriceElement.innerHTML) / currQuantity;
        let changedPrice = basePrice * changedQuantity;
        basePriceElement.innerHTML = `${changedPrice} $`;

        decreasePrice(basePrice);
      }
    })
  }

  buyBtn.addEventListener("click", () => {
    if (totalPrice == 0) {
      notifyFailure();
    }
    else {
      notifySuccess();
      setTimeout(() => {
        clearProduct();
      }, 2000);
    }
  });
}, 200);
