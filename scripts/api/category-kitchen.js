loadText();

function loadText() {
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      console.log(JSON.parse(xhttp.responseText));
      var products = JSON.parse(xhttp.responseText);

      var output = '';

      var productWithId3 = products.find(function (product) {
        return product.id === 3;
      });

      console.log(productWithId3);

      if (productWithId3) {
        output +=
          '<div class="product normal">' +
          '<a href="/product/2">' +
          '<div class="product-header">' +
          '<img src="' + productWithId3.image + '" alt="">' +
          '</div>' +

          '<div class="product-details">' +
          '<p>' + productWithId3.name + '</p>' +

          '<p class="item-price">' +
          '' + productWithId3.price + '' +
          '$' +
          '</p>' +
          '</div>' +
          '</a>' +
          '</div>'
      }

      document.getElementsByClassName("products-grid")[0].innerHTML += output;
    }
  }

  xhttp.open("GET", "http://localhost:8080/api/categories/1/products", true);
  xhttp.send();
};


