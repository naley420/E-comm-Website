loadProducts();

function loadProducts() {
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      const products = JSON.parse(xhttp.responseText);
      let output = "";

      for (let i = 0; i < products.length; i++) {
        if (products[i].categoryName == "Furnitures") {
          let image_url = `../css/resources/products/product-${i + 1}.png`;
          output +=
            '<div class="product normal">' +
            // '<a href="product.html">' +
            '<div class="product-header">' +
            '<img src="' + image_url + '" alt="">' +
            '</div>' +

            '<div class="product-details">' +
            '<p class="product-name">' + products[i].name + '</p>' +

            '<p class="item-price">' +
            '' + products[i].price + '' +
            '$' +
            '</p>' +
            '</div>' +
            // '</a>' +
            '</div>'
        }
      }
      document.getElementsByClassName("products-grid")[0].innerHTML += output;
    }
  }

  xhttp.open("GET", "http://localhost:8080/api/products", true);
  xhttp.send();
};

function getProductId(productName) {
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      const products = JSON.parse(xhttp.responseText);
      for (let i = 0; i < products.length; i++) {
        if (productName == products[i].name) {
          localStorage.setItem("productId", products[i].id);
        }
      }
    }
  }
  xhttp.open("GET", "http://localhost:8080/api/products", true);
  xhttp.send();
}

setTimeout(() => {
  const allProducts = document.getElementsByClassName("product normal");

  for (let i = 0; i < allProducts.length; i++) {
    allProducts[i].addEventListener("click", () => {
      const productName = allProducts[i].querySelector(".product-name").innerHTML;
      getProductId(productName);
      setTimeout(() => {
        window.location.assign("product.html");
      }, 200);
    })
  }
}, 100);
