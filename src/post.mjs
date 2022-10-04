import './functions/ViewPost.js';
import './functions/Authenticate/login.js';

function autoLogin() {
    if (isLoggedIn() === true) {
        const html = document.querySelector("#loggedInUser")
        html.innerHTML = `
            <div class="shadow p-2 bg-body rounded" style="width: rem10;">
                Welcome: ${localStorage.getItem('username')}
            </div>
            `;
    }
}

autoLogin();

function isLoggedIn() {
    return Boolean(localStorage.getItem('access-token'));    
}