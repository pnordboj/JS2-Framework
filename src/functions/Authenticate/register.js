import { getAllPosts } from "../posts.js";

const params = {
    name: 'patricknj',
    email: 'PatJoh55304@stud.noroff.no',
    password: '220197Pn'
}

const options = {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify(params)
}

const url = `https://nf-api.onrender.com/api/v1/social/auth/register`;
const html = document.querySelector(".callApiBody");
const callApiBtn = document.querySelector("#loggedInUser");

async function getApi() {
    try {
        const response = await fetch(url, options)
        const data = await response.json();
        console.log(data);
        if (data.message == 'Profile already exists') {
            login();
            getAllPosts();
        }

    } catch (error) {
        console.log(error);
        html.innerHTML = displayError('Error', error);
    }
}

callApiBtn.onclick = function() {
    getApi();
}

// Object { statusCode: 400, error: "Bad Request", message: "Profile already exists" }

const urlLogin = `https://nf-api.onrender.com/api/v1/social/auth/login`;
const htmlProfile = document.querySelector("#profileInfo");
const htmlLoggedIn = document.querySelector("#loggedInUser");

const paramsLogin = {
    email: 'PatJoh55304@stud.noroff.no',
    password: '220197Pn'
}

const optionsLogin = {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify(paramsLogin)
}

export async function login() {
    try {
        const response = await fetch(urlLogin, optionsLogin);
        const data = await response.json();
        console.log(data)
        localStorage.setItem("access-token", data.accessToken);
        console.log(localStorage.getItem("access-token"));
        htmlLoggedIn.innerHTML = `
        <div class="shadow p-2 mb-2 bg-body rounded" style="width: rem10;">
            Welcome! ${data.name}
        </div>
        `;
        getAllPosts();
    } catch(error) {
        console.log(error);
        htmlLoggedIn.innerHTML = displayError('Error', error);
    }
}