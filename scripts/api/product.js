const productImgSrc = document.querySelector(".big-img img");
const productName = document.getElementsByClassName("product-big-name")[0];
const productDescription = document.getElementsByClassName("product-spec")[0];
const productStock = document.getElementsByClassName("product-stock")[0];
const productPrice = document.getElementsByClassName("product-price")[0];
const productTexture = document.getElementsByClassName("product-texture")[0];
const productWeight = document.getElementsByClassName("product-weight")[0];
const productSize = document.getElementsByClassName("product-size")[0];

loadProduct(localStorage.getItem("productId"));

let stock = 0;

function loadProduct(id) {
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      productImgSrc.src = `../css/resources/products/product-${id}.png`;
      const product = JSON.parse(xhttp.responseText);
      productName.innerHTML = product.name;
      productDescription.innerHTML = product.description;
      productStock.innerHTML = `Stock: ${product.quantity}`;
      stock = product.quantity;
      productPrice.innerHTML = `${product.price} $`;
      productTexture.innerHTML = product.texture;
      productWeight.innerHTML = product.weight;
      if (product.texture !== "Liquid") productWeight.innerHTML += "kg";
      else productWeight.innerHTML += "ml";
      productSize.innerHTML = product.size;

    }
  }

  xhttp.open("GET", "http://localhost:8080/api/products/" + id, true);
  xhttp.send();
};

setTimeout(() => {
  const atcBtn = document.querySelector(".atc-btn");
  const buyBtn = document.querySelector(".buy-btn");
  const notifyDiv = document.querySelector(".notify");


  localStorage.setItem("queue", false);
  if (localStorage.getItem("loggedIn") == "true") {
    atcBtn.addEventListener("click", function () {
      notifyDiv.style.top = "2rem";

      setTimeout(function () {
        notifyDiv.style.top = "-100%";
      }, 2000);
    });

    buyBtn.addEventListener("click", function () {
      notifyDiv.style.top = "2rem";

      setTimeout(function () {
        notifyDiv.style.top = "-100%";
      }, 2000);
    });
  }
  else {
    atcBtn.addEventListener("click", function () {
      window.location.href = "./login.html"
    });

    buyBtn.addEventListener("click", function () {
      window.location.href = "./login.html"
    });

    localStorage.setItem("queue", true);
  }

  const quantityElement = document.querySelector(".quantity");

  let quantity = 1;

  function updateDisplay() {
    quantityElement.textContent = quantity;
  }

  document
    .querySelector(".product-btns button:last-child")
    .addEventListener("click", function () {
      if (quantity < stock)
        quantity++;
      updateDisplay();
    });

  document
    .querySelector(".product-btns button:first-child")
    .addEventListener("click", function () {
      if (quantity > 1) {
        quantity--;
        updateDisplay();
      }
    });

  updateDisplay();
}, 100);



