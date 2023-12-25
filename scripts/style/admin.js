const loggedIn = localStorage.getItem('loggedIn');

const loginLink = document.getElementById('loginLink');
const logoutLink = document.getElementById('logoutLink');

if (loggedIn == "true") {
  loginLink.classList.add('hidden');
  logoutLink.classList.remove('hidden');
} else {
  loginLink.classList.remove('hidden');
  logoutLink.classList.add('hidden');
}

logoutLink.addEventListener("click", () => {
  localStorage.setItem('loggedIn', false);
  localStorage.setItem('isAdmin', false);
})

