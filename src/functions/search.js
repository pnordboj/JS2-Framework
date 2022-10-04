import { displayError } from "./error/error.js";

let url = 'https://nf-api.onrender.com/api/v1/social/posts';
const searchButton = document.querySelector("#searchButton");
const htmlAll = document.querySelector("#all-posts");
let storeData = [];

searchButton.addEventListener("input", (e) => {
    const value = e.target.value.toLowerCase()
    const filtered = storeData.filter((post) => {
        return (
            post.title.toLowerCase().includes(value) || 
            post.body.toLowerCase().includes(value)
        );
    });
    displayPosts(filtered);
});

const getPosts = async () => {
    try {
        const options = {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${localStorage.getItem("access-token")}`,
            }
        }
        const response = await fetch(url, options);
        storeData = await response.json();
        console.log(storeData);
        displayPosts(storeData);
    } catch (error)
    {   
        console.log(error);
        html.innerHTML = displayError('error', error);
    }
};

const displayPosts = (data) => {
    const htmlCard = data.map((post) => {
        return `
            <div class="col mt-2">
                <div class="card">
                    <div class="card-header">
                    ${post.title}
                    </div>
                    <div class="card-body">
                    ${post.body}
                    <br>
                    <br>
                    <hr>
                    <b>Tags:</b> ${post.tags}
                    </div>
                    <div class="card-footer">
                    
                    <a href="post/?id=${post.id}" class="btn btn-primary">View Post</a>
                    </div>
                </div>
            </div>
            `;
        }).join('');
        htmlAll.innerHTML = htmlCard;
};

getPosts();