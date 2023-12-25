const submitButton = document.getElementById('submitButton');

submitButton.addEventListener('click', sendForm);

function isNumber(value) {
  return !isNaN(parseFloat(value)) && isFinite(value);
}

function checkForm(nameValue, descriptionValue, quantityValue, priceValue, textureValue, weightValue, sizeValue, categoryValue) {
  if (nameValue == "" || descriptionValue == "" || quantityValue == "" || priceValue == "" || textureValue == "" || weightValue == "" || sizeValue == "" || categoryValue == "")
    return "Please fill out all the required fields";
  if (!isNumber(quantityValue) || !isNumber(priceValue) || !isNumber(weightValue))
    return "Quantity or Price or Weight must be a number";
  return "OK";
};

function sendForm() {
  const nameValue = document.getElementById('name').value;
  const descriptionValue = document.getElementById('description').value;
  const quantityValue = document.getElementById('quantity').value;
  const priceValue = document.getElementById('price').value;
  const textureValue = document.getElementById('texture').value;
  const weightValue = document.getElementById('weight').value;
  const sizeValue = document.getElementById('size').value;
  const categoryValue = document.getElementById('category').value;

  const username = 'admin';
  const password = 'admin';
  const base64Credentials = btoa(username + ':' + password);

  if (checkForm(nameValue, descriptionValue, quantityValue, priceValue, textureValue, weightValue, sizeValue, categoryValue) == "OK") {
    const productObj = {
      name: nameValue,
      description: descriptionValue,
      quantity: quantityValue,
      price: priceValue,
      texture: textureValue,
      weight: weightValue,
      size: sizeValue,
      categoryName: categoryValue
    };

    const product = JSON.stringify(productObj);

    var xhttp = new XMLHttpRequest();

    xhttp.onreadystatechange = function () {
      if (this.readyState == 4 && this.status == 201) {
        window.location.href = './admin.html';
      }
    };

    xhttp.open("POST", "http://localhost:8080/api/products", true);
    xhttp.setRequestHeader("Content-type", "application/json");
    xhttp.setRequestHeader('Authorization', 'Basic ' + base64Credentials);
    xhttp.send(product);
  }

  else {
    const notifyDiv = document.querySelector(".notify");
    const notifyMsg = document.querySelector(".notify p");
    notifyDiv.style.top = "2rem";

    notifyMsg.innerHTML = checkForm(nameValue, descriptionValue, quantityValue, priceValue, textureValue, weightValue, sizeValue, categoryValue);

    setTimeout(() => {
      notifyDiv.style.top = "-100%";
    }, 4500);
  }
}

