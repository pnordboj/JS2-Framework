/**
 * register.js handles the registration function for the website 
 * also storing data into localStorage
 */

import { displayError } from '../error/error.mjs';

const url = `https://nf-api.onrender.com/api/v1/social/auth/register`;
const registerUser = document.querySelector("#registerUser");

registerUser.onclick = async function () {
    try {
        const username = document.getElementById("loginForm")[0].value;
        const email = document.getElementById("loginForm")[1].value;
        const password = document.getElementById("loginForm")[2].value;
        const html = document.querySelector("#registerLogin-error")
        /**
         * Check is the username is longer than 3 characters
         * @param {String} username
         * @return {Boolean}
         * **/
        if (username.length < 4) {
            html.innerHTML = ` <div class="alert alert-danger">
            Error, Username is invalid, username must be longer then 3 characters!
            </div>
            `;
            return
        }

        /**
         * Check if the email contains an @ and a valid email domain
         * valid email domain is noroff.no or stud.noroff.no
         * @param {String} email
         * @return {Boolean}
         **/

        if (checkEmail(email) === false) {
            html.innerHTML = ` <div class="alert alert-danger">
            Error! Email Adress is invalid or missing!
            <br>
            Email Address must be: 
            <br>
            <b>user@noroff.no</b> or <b>user@stud.noroff.no</b>
            </div>
            `;
            return
        }

        function checkEmail(email) {
            const regEx = /\@(noroff|stud.noroff)\.no$/i;
            const match = regEx.test(email);
            console.log(match)
            return match;
        }

        /**
         * Check if password is 8 characters or longer
         * @param {String} password
         * @return {Boolean}
         **/

        if (password.length < 8) {
            html.innerHTML = ` <div class="alert alert-danger">
            Error, Password is required and must be atleast 8 characters long!
            </div>
            `;
            return
        }

        /**
         * Format data to JSON, and fetch the url, after fetched check status. 
         * If correct status set localstorage, and return url data.
         * @param {String} url
         * @param {Object} options
         * @return {Object}
         */

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