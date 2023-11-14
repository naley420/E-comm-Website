document.addEventListener("DOMContentLoaded", function () {
	const atcBtn = document.querySelector(".atc-btn");
	const notifyDiv = document.querySelector(".notify");

	atcBtn.addEventListener("click", function () {
		notifyDiv.style.top = "2rem";

		setTimeout(function () {
			notifyDiv.style.top = "-100%";
		}, 2000);
	});

	const quantityElement = document.querySelector(".quantity");
	const priceElement = document.querySelector(".product-price");

	let productPrice = parseFloat(priceElement.innerHTML.replace("$", ""));

	let quantity = 1;

	function updateDisplay() {
		quantityElement.textContent = quantity;
		priceElement.textContent = `${productPrice * quantity}$`;
	}

	document
		.querySelector(".product-btns button:last-child")
		.addEventListener("click", function () {
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
});
