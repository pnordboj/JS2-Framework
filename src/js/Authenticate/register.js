import { displayError } from '../error/error.mjs';

const url = `https://nf-api.onrender.com/api/v1/social/auth/register`;
const registerUser = document.querySelector("#registerUser");

registerUser.onclick = async function () {
    try {
        const username = document.getElementById("loginForm")[0].value;
        const email = document.getElementById("loginForm")[1].value;
        const password = document.getElementById("loginForm")[2].value;
        const html = document.querySelector("#registerLogin-error")

        if (username.length === 0) {
            html.innerHTML = ` <div class="alert alert-danger">
            Error, Username is required!
            </div>
            `;
            return
        }

        if (checkEmail(email.length, 0) === false) {
            html.innerHTML = ` <div class="alert alert-danger">
            Error, Email Adress is required!
            </div>
            `;
            return
        }

        function checkEmail(email) {
            const regEx = /\S+@\S+\.\S+\*@(noroff|stud.noroff).no$/;
            const match = regEx.test(email);
            return match;
        }

        if (password.length < 8) {
            html.innerHTML = ` <div class="alert alert-danger">
            Error, Password is required and must be atleast 8 characters long!
            </div>
            `;
            return
        }

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