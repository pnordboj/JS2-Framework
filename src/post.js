/**
 * post.js combines all the javascript files together for the post.html page
 */

import "./js/viewPost.js";

const logoutButton = document.querySelector("#logout");

function autoLogin() {
  if (isLoggedIn() === true) {
    const html = document.querySelector("#loggedInUser");
    html.innerHTML = `
        <div class="shadow p-2 bg-body rounded" style="width: rem10;">
            Welcome: ${localStorage.getItem("username")}
        </div>
        `;
    logoutButton.classList.replace("d-none", "d-flex");
  }
}

autoLogin();

function isLoggedIn() {
  return Boolean(localStorage.getItem("access-token"));
}

logoutButton.onclick = function logout() {
  localStorage.clear();
  window.location.href = "/";
};