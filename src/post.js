/**
 * post.js combines all the javascript files together for the post.html page
 */

import "./js/viewPost.js";
import "./js/Authenticate/login.js";

function autoLogin() {
  if (isLoggedIn() === true) {
    const html = document.querySelector("#loggedInUser");
    html.innerHTML = `
            <div class="shadow p-2 bg-body rounded" style="width: rem10;">
                Welcome: ${localStorage.getItem("username")}
            </div>
            `;
  }
}

autoLogin();

function isLoggedIn() {
  return Boolean(localStorage.getItem("access-token"));
}
