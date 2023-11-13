document.addEventListener("DOMContentLoaded", function () {
	const atcBtn = document.querySelector(".atc-btn");
	const notifyDiv = document.querySelector(".notify");

	atcBtn.addEventListener("click", function () {
		// Show the notify div
		notifyDiv.style.top = "2rem";

		// Set a timeout to hide the notify div after 2 seconds
		setTimeout(function () {
			notifyDiv.style.top = "-100%"; // Slide it back up
		}, 2000);
	});

	// Get relevant elements
	const quantityElement = document.querySelector(".quantity");
	const priceElement = document.querySelector(".product-price");

	// Extract initial product price from the innerHTML
	let productPrice = parseFloat(priceElement.innerHTML.replace("$", ""));

	// Initial quantity value
	let quantity = 1;

	// Function to update the display
	function updateDisplay() {
		quantityElement.textContent = quantity;
		priceElement.textContent = `${productPrice * quantity}$`;
	}

	// Event listener for the + button
	document
		.querySelector(".product-btns button:last-child")
		.addEventListener("click", function () {
			// Increase quantity and update display
			quantity++;
			updateDisplay();
		});

	// Event listener for the - button
	document
		.querySelector(".product-btns button:first-child")
		.addEventListener("click", function () {
			// Ensure quantity is not less than 1
			if (quantity > 1) {
				// Decrease quantity and update display
				quantity--;
				updateDisplay();
			}
		});

	// Initial display update
	updateDisplay();
});
