const productId = localStorage.getItem('productUpdateId');

function isNumber(value) {
  return !isNaN(parseFloat(value)) && isFinite(value);
}

function getProduct() {
  var xhttp = new XMLHttpRequest();

  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      const product = JSON.parse(xhttp.responseText);
      nameInital = product.name;
      descriptionInital = product.description;
      quantityInital = product.quantity;
      priceInital = product.price;
      textureInital = product.texture;
      weightInital = product.weight;
      sizeInital = product.size;
      categoryInital = product.categoryName;
    }
  }

  xhttp.open("GET", "http://localhost:8080/api/products/" + productId, true);
  xhttp.send();
};

function checkForm(nameValue, descriptionValue, quantityValue, priceValue, textureValue, weightValue, sizeValue, categoryValue) {
  if (nameValue == "" || descriptionValue == "" || quantityValue == "" || priceValue == "" || textureValue == "" || weightValue == "" || sizeValue == "" || categoryValue == "")
    return "Please fill out all the required fields";

  if (!isNumber(quantityValue) || !isNumber(priceValue) || !isNumber(weightValue))
    return "Quantity or Price or Weight must be a number";

  return "OK";
};

function sendForm() {
  const nameUpdate = document.getElementById('name').value;
  const descriptionUpdate = document.getElementById('description').value;
  const quantityUpdate = document.getElementById('quantity').value;
  const priceUpdate = document.getElementById('price').value;
  const textureUpdate = document.getElementById('texture').value;
  const weightUpdate = document.getElementById('weight').value;
  const sizeUpdate = document.getElementById('size').value;
  const categoryUpdate = document.getElementById('category').value;

  const username = 'admin';
  const password = 'admin';
  const base64Credentials = btoa(username + ':' + password);

  if (checkForm(nameUpdate, descriptionUpdate, quantityUpdate, priceUpdate, textureUpdate, weightUpdate, sizeUpdate, categoryUpdate) == "OK") {
    const productObj = {
      name: nameUpdate,
      description: descriptionUpdate,
      quantity: quantityUpdate,
      price: priceUpdate,
      texture: textureUpdate,
      weight: weightUpdate,
      size: sizeUpdate,
      categoryName: categoryUpdate
    };

    const product = JSON.stringify(productObj);

    var xhttp = new XMLHttpRequest();

    xhttp.onreadystatechange = function () {
      if (this.readyState == 4 && this.status == 200) {
        window.location.href = './admin.html';
      }
    };

    xhttp.open("PUT", "http://localhost:8080/api/products/" + productId, true);
    xhttp.setRequestHeader("Content-type", "application/json");
    xhttp.setRequestHeader('Authorization', 'Basic ' + base64Credentials);
    xhttp.send(product);
  }

  else {
    const notifyDiv = document.querySelector(".notify");
    const notifyMsg = document.querySelector(".notify p");
    notifyDiv.style.top = "2rem";

    notifyMsg.innerHTML = checkForm(nameUpdate, descriptionUpdate, quantityUpdate, priceUpdate, textureUpdate, weightUpdate, sizeUpdate, categoryUpdate);

    setTimeout(() => {
      notifyDiv.style.top = "-100%";
    }, 4500);
  }
}

let nameInital = "";
let descriptionInital = "";
let quantityInital = "";
let priceInital = "";
let textureInital = "";
let weightInital = "";
let sizeInital = "";
let categoryInital = "";

getProduct(productId);

const nameValue = document.getElementById('name');
const descriptionValue = document.getElementById('description');
const quantityValue = document.getElementById('quantity');
const priceValue = document.getElementById('price');
const textureValue = document.getElementById('texture');
const weightValue = document.getElementById('weight');
const sizeValue = document.getElementById('size');
const categoryValue = document.getElementById('category');

setTimeout(() => {
  nameValue.value = nameInital;
  descriptionValue.value = descriptionInital;
  quantityValue.value = quantityInital;
  priceValue.value = priceInital;
  textureValue.value = textureInital;
  weightValue.value = weightInital;
  sizeValue.value = sizeInital;
  categoryValue.value = categoryInital;
}, 200);

const submitButton = document.getElementById('submitButton');
submitButton.addEventListener('click', sendForm);
