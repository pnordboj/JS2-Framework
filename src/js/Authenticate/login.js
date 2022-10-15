/**
 * login.js handles the login functions for the web site
 * Also handles the autologin feature that the page provides.
 */

import { displayError } from '../error/error.mjs';

const urlLogin = `https://nf-api.onrender.com/api/v1/social/auth/login`;
const htmlLoggedIn = document.querySelector("#loggedInUser");
const loginUser = document.querySelector("#loginUser");
const logoutButton = document.querySelector("#logout")

/**
 * Shows the login-form if user is NOT loggin
 * refreshes page if user is logged in and displays posts
 * 
 */

loginUser.onclick = async function() {
    try {
        const email = document.getElementById("login-form")[0].value;
        const password = document.getElementById("login-form")[1].value;
        const html = document.querySelector("#registerLogin-error")

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

        if (password.length < 8) {
            html.innerHTML = ` <div class="alert alert-danger">
            Error, Password is required and must be atleast 8 characters long!
            </div>
            `;
            return
        }

        /**
         * Run a fetch request to check if the user credentials are valid
         * @param {String} email
         * @param {String} password
         * @return {Boolean}
         * **/
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

        /** 
         * The fetch function returns a promise of a response body
         * @type {Response}
         * **/

        fetch(urlLogin, options)
        .then((response) => response.json())
        .then((json) => {
            return json
        })

        /** 
         * process the response body as json and extract the access-token value
         * @type {String}
         * **/

        .then(function (data) {
            if(data.name === 'undefined') {
                html.innerHTML = ` <div class="alert alert-danger">
                    User is not authorized, make sure the credentials are correct
                    <br>
                    And that the user exists!
                </div>
                `;
                return
            } else {
                htmlLoggedIn.innerHTML = `
                <div class="shadow p-2 bg-body rounded" style="width: rem10;">
                    Welcome: ${data.name}
                </div>
            `;
            }
            /** 
             * Return the access-token value as the result of the promise
             * @return {String}
             * **/
            localStorage.setItem("username", data.name);
            localStorage.setItem("access-token", data.accessToken);
            setTimeout(function(){ window.location.href = "/"; }, 500);
        })
    } catch(error) {
        console.log(error);
        htmlLoggedIn.innerHTML = displayError('Error', error);
    }
}

/** 
 * Checks if the logged in status is stored in localStorage
 * @return {Boolean}
 * **/

function isLoggedIn() {
    const html = document.querySelector("#registerLogin-error")
    if (localStorage.getItem('access-token') === 'undefined') {
        localStorage.clear;
        html.innerHTML = ` <div class="alert alert-danger">
                    User is not authorized, make sure the credentials are correct
                    <br>
                    And that the user exists!
                </div>
                `;
        return false
    } else if (localStorage.getItem('access-token') !== 'undefined') {
        return Boolean(localStorage.getItem('access-token'));
    }
}

/**
 * autorun if the isLoggedIn function returns true
 * If true then append to the logged in HTML body
 * **/

export function autoLogin() {
    if (isLoggedIn() === true) {
        const tabs = document.getElementById('tab');
        tabs.classList.replace("d-none", "d-flex");

        const searchForm = document.getElementById('search-form');
        searchForm.classList.replace("d-none", "d-flex");

        const loginContainer = document.querySelector("#loginContainer")
        loginContainer.innerHTML = '';
        /**
         * Get the username from localStorage
         **/
        const html = document.querySelector("#loggedInUser")
        html.innerHTML = `
        <div class="shadow p-2 bg-body rounded" style="width: rem10;">
            Welcome: ${localStorage.getItem('username')}
        </div>
        `;
        logoutButton.classList.replace("d-none", "d-flex");
    }
}

logoutButton.onclick = function logout() {
    localStorage.clear();
    window.location.href = "/";
}