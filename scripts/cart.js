document.addEventListener("DOMContentLoaded", function () {
	const atcBtn = document.querySelector(".buy-btn");
	const notifyDiv = document.querySelector(".notify");

	atcBtn.addEventListener("click", function () {
		notifyDiv.style.top = "2rem";

		setTimeout(function () {
			notifyDiv.style.top = "-100%";
		}, 2000);
	});

	const minusButtons = document.querySelectorAll(
		".product-btns button:first-child"
	);
	const plusButtons = document.querySelectorAll(
		".product-btns button:last-child"
	);

	const quantityElements = document.querySelectorAll(".product-btns p.quantity");

	const priceElements = document.querySelectorAll(".product-price p");

	const totalPriceElement = document.querySelector(".price-details p");

	const products = Array.from(priceElements).map((priceElement, index) => {
		const price = parseInt(priceElement.textContent.slice(1));
		const quantity = parseInt(quantityElements[index].textContent);
		return { price, quantity };
	});

	function updateProduct(index, operation) {
		const product = products[index];

		if (operation === "increment") {
			product.quantity++;
		} else if (operation === "decrement" && product.quantity > 1) {
			product.quantity--;
		}

		quantityElements[index].textContent = product.quantity;

		const newProductPrice = product.quantity * product.price;

		priceElements[index].textContent = `${newProductPrice} $`;

		updateTotalPrice();
	}

	function updateTotalPrice() {
		const newTotalPrice = products.reduce(
			(acc, product) => acc + product.quantity * product.price,
			0
		);
		totalPriceElement.textContent = `${newTotalPrice} $`;
	}

	plusButtons.forEach((button, index) => {
		button.addEventListener("click", () => updateProduct(index, "increment"));
	});

	minusButtons.forEach((button, index) => {
		button.addEventListener("click", () => updateProduct(index, "decrement"));
	});

	updateTotalPrice();

	const removeButtons = document.querySelectorAll(".remove-btn");

	function removeProduct(index) {
		const removedProduct = products.splice(index, 1)[0];

		removeButtons[index].closest(".product").remove();

		updateTotalPrice();

		showNotification(
			`Removed ${removedProduct.quantity} ${
				removedProduct.quantity > 1 ? "items" : "item"
			}`
		);
	}

	function showNotification(message) {
		const notifyElement = document.querySelector(".notify");
		notifyElement.textContent = message;
		notifyElement.style.top = "10%";
		setTimeout(() => {
			notifyElement.style.top = "-100%";
		}, 2000);
	}

	removeButtons.forEach((button, index) => {
		button.addEventListener("click", () => removeProduct(index));
	});
});
