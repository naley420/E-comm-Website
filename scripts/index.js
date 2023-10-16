document.addEventListener("DOMContentLoaded", function () {
	// Function to handle the scroll event
	function handleScroll() {
		const header = document.querySelector(".header");
		const logo = document.querySelector(".logo");
		const logoSrc = "../css/resources/logo-white.png";
		const scrolledLogoSrc = "../css/resources/logo.png";
		const navLinks = document.querySelectorAll(".nav-list a");
		const scrollY = window.scrollY;
		const searchInput = document.querySelector(".search-header .search-input");
		const searchBtn = document.querySelector(".search-header .search-btn");
		const userIcon = document.querySelector(".user-icon");
		const cartIcon = document.querySelector(".cart-icon");

		if (scrollY > 0) {
			header.style.backgroundColor = "white";
			header.style.color = "black";
			logo.src = scrolledLogoSrc;
			searchBtn.style.color = "black";
			searchInput.style.borderColor = "black";
			userIcon.style.color = "black";
			cartIcon.style.color = "black";

			// Change the color of the <a> tags when scrolling
			navLinks.forEach(function (link) {
				link.style.color = "black";
			});
		} else {
			header.style.backgroundColor = "transparent";
			header.style.color = "white";
			logo.src = logoSrc;
			searchBtn.style.color = "white";
			searchInput.style.borderColor = "white";
			userIcon.style.color = "white";
			cartIcon.style.color = "white";

			// Revert the color of the <a> tags when at the top
			navLinks.forEach(function (link) {
				link.style.color = "white";
			});
		}
	}

	// Attach the scroll event listener to the window
	window.addEventListener("scroll", handleScroll);

	// Call the function once to set the initial style
	handleScroll();

	const slides = document.querySelectorAll(".slide");
	let currentSlide = 0;

	// Function to show a specific slide
	function showSlide(slideIndex) {
		if (slideIndex < 0) {
			slideIndex = slides.length - 1;
		} else if (slideIndex >= slides.length) {
			slideIndex = 0;
		}

		slides.forEach((slide) => (slide.style.display = "none"));
		slides[slideIndex].style.display = "block";
		currentSlide = slideIndex;
	}

	// Function to change slides automatically every 5 seconds
	function autoChangeSlide() {
		showSlide(currentSlide + 1);
	}

	// Initialize slider
	showSlide(currentSlide);

	// Set an interval to change slides every 5 seconds
	setInterval(autoChangeSlide, 5000);
});
