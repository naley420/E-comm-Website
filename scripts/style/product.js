const loggedIn = localStorage.getItem('loggedIn');

const loginLink = document.getElementById('loginLink');
const logoutLink = document.getElementById('logoutLink');
const cartLink = document.getElementById('cartLink');

if (loggedIn == "true") {
	loginLink.classList.add('hidden');
	cartLink.classList.remove('hidden');
	logoutLink.classList.remove('hidden');
} else {
	loginLink.classList.remove('hidden');
	cartLink.classList.add('hidden');
	logoutLink.classList.add('hidden');
}

logoutLink.addEventListener("click", () => {
	localStorage.setItem('loggedIn', false);
	localStorage.setItem('isAdmin', false);

})

