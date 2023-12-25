const isAdmin = localStorage.getItem('isAdmin');

if (isAdmin == "false") {
  window.location.href = "./error.html";
}