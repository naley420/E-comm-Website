loadProducts();

function loadProducts() {
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      const products = JSON.parse(xhttp.responseText);
      let output = "";

      for (let i = 0; i < products.length; i++) {
        let image_url = `../css/resources/products/product-${i + 1}.png`;
        output +=
          '<div class="product normal">' +
          '<a href="product.html">' +
          '<div class="product-header">' +
          '<img src="' + image_url + '" alt="">' +
          '</div>' +

          '<div class="product-details">' +
          '<p>' + products[i].name + '</p>' +

          '<p class="item-price">' +
          '' + products[i].price + '' +
          '$' +
          '</p>' +
          '</div>' +
          '</a>' +
          '</div>'
      }
      document.getElementsByClassName("products-grid")[0].innerHTML += output;
    }
  }

  xhttp.open("GET", "http://localhost:8080/api/products", true);
  xhttp.send();
};

