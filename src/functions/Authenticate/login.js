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

        getAllPosts();
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
        getAllPosts();
    }
}

export async function getAllPosts() {
    try {
        const urlPost = `https://nf-api.onrender.com/api/v1/social/posts`;
        const htmlAll = document.querySelector("#all-posts");
        const optionsPosts = {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${localStorage.getItem("access-token")}`,
            },
        }
        const response = await fetch(urlPost, optionsPosts);
        const data = await response.json();
        console.log(data);
        htmlAll.innerHTML = ``;
        for(let i = 0; i < data.length; i++) {
            htmlAll.innerHTML +=
                `
                <div class="col mt-2">
                    <div class="card">
                        <div class="card-header">
                        ${data[i].title}
                        </div>
                        <div class="card-body">
                        ${data[i].body}
                        </div>
                        <div class="card-footer">
                        <a href="post/?id=${data[i].id}" class="btn btn-primary">Read more</a>
                        </div>
                    </div>
                </div>
                `;
        }
    } catch (error)
    {   
        console.log(error);
        html.innerHTML = displayError('error', error);
    }
}