import { displayError } from '../error/error.js';

const urlLogin = `https://nf-api.onrender.com/api/v1/social/auth/login`;
const htmlLoggedIn = document.querySelector("#loggedInUser");
const loginUser = document.querySelector("#loginUser");

loginUser.onclick = async function() {
    try {
        const email = document.getElementById("login-form")[0].value;
        const password = document.getElementById("login-form")[1].value;
        
        const options = {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
            },
            body: JSON.stringify({
                email: email,
                password: password,
            }),
        }

        fetch(urlLogin, options)
        .then((response) => response.json())
        .then((json) => {
            return json
        })
        .then(function (data) {
            htmlLoggedIn.innerHTML = `
            <div class="shadow p-2 bg-body rounded" style="width: rem10;">
                Welcome: ${data.name}
            </div>
            `;
            localStorage.setItem("username", data.name);
            localStorage.setItem("access-token", data.accessToken);
        })
    } catch(error) {
        console.log(error);
        htmlLoggedIn.innerHTML = displayError('Error', error);
    }
}

function isLoggedIn() {
    return Boolean(localStorage.getItem('access-token'));
}

export function autoLogin() {
    if (isLoggedIn() === true) {
        const html = document.querySelector("#loggedInUser")
        html.innerHTML = `
            <div class="shadow p-2 bg-body rounded" style="width: rem10;">
                Welcome: ${localStorage.getItem('username')}
            </div>
            `;
    }
}