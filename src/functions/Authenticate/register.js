import { displayError } from '../error/error.js';

const url = `https://nf-api.onrender.com/api/v1/social/auth/register`;
const registerUser = document.querySelector("#registerUser");

registerUser.onclick = async function() {
    try {
        const username = document.getElementById("login-form")[0].value;
        const email = document.getElementById("login-form")[1].value;
        const password = document.getElementById("login-form")[2].value;
        const options = {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
            },
            body: JSON.stringify({
                username: username,
                email: email,
                password: password,
            }),
        }
        console.log(options);
        const html = document.querySelector("#all-posts")
        const response = await fetch(url, options);
        const data = await response.json();
        if (!response.ok) {
            localStorage.setItem("access-token", data.accessToken);
            html.innerHTML = `
            <div class="alert alert-success">
                Account Registerd! You can now login with your Email and Password!
            </div>
            `;
        } else {
            html.innerHTML = `
            <div class="alert alert-danger">
                Provided information is incorrect, Please try again!
            </div>
            `;
        }
    } catch(error) {
        console.log(error);
        htmlLoggedIn.innerHTML = displayError('Error', error);
    }
}