const loggedIn = localStorage.getItem('loggedIn');
const checkAdmin = localStorage.getItem('isAdmin');

const loginLink = document.getElementById('loginLink');
const logoutLink = document.getElementById('logoutLink');
const cartLink = document.getElementById('cartLink');
const adminLink = document.getElementById('adminLink');
const categoryLink = document.getElementById('categoryLink');

if (loggedIn == "true") {
  loginLink.classList.add('hidden');
  cartLink.classList.remove('hidden');
  logoutLink.classList.remove('hidden');
} else {
  loginLink.classList.remove('hidden');
  cartLink.classList.add('hidden');
  logoutLink.classList.add('hidden');
}

if (checkAdmin == "true") {
  cartLink.classList.add('hidden');
  categoryLink.classList.add('hidden');
  adminLink.classList.remove('hidden');

}
else {
  cartLink.classList.remove('hidden');
  categoryLink.classList.remove('hidden');
  adminLink.classList.add('hidden');
}

logoutLink.addEventListener("click", () => {
  localStorage.setItem('loggedIn', false);
  localStorage.setItem('isAdmin', false);
})
