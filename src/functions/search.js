import { displayError } from "./error/error.js";

let url = 'https://nf-api.onrender.com/api/v1/social/posts';
const searchButton = document.querySelector("#searchButton");
const htmlAll = document.querySelector("#all-posts");
var storeData = [];


searchButton.addEventListener("input", (e) => {
    let value = e.target.value
    if (value && value.trim().length > 0) {
        value = value.trim().toLowerCase()
        search(storeData.filter(post => {
            return post.body.includes(value)
        }))
    } else {

    }
})

async function search(result) {
    try {
        const options = {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${localStorage.getItem("access-token")}`,
            }
        }
        const response = await fetch(url, options);
        storeData = await response.json();
        for (const post of result) {
            htmlAll.innerHTML =
                `
                <div class="col mt-2">
                    <div class="card">
                        <div class="card-header">
                        ${post.title}
                        </div>
                        <div class="card-body">
                        ${post.body}
                        </div>
                        <div class="card-footer">
                        <a href="post/?id=${post.id}" class="btn btn-primary">Read more</a>
                        </div>
                    </div>
                </div>
                `;
        }
    } catch (error) {
        displayError(error, 'error');
        console.log('error message: ', error);
    }
}