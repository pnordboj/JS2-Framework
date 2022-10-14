import { isLoggedIn } from "../js/tab.js";
import { displayError } from "./error/error.mjs";

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

/**
 * getPosts calls the API and returns the JSON array
 * that displaysPosts uses to return the data as HTML for the user to view.
 */

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
        htmlAll.innerHTML = displayError('error', error);
    }
};

/**
 * displayPosts returns all the posts in the API as HTML
 * And is also being used for the search function and filters.
 */

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
                    <img src="${post.media}" id="post-image" alt=" ">
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

/**
 * @return The filters is WIP
 */

// Filters WIP
const filterByComments = () => {
    const filter = storeData.sort((a, b) => {
        return new Date(a.comments) - new Date(b.comments);
    });
    console.log(filter);
    displayPosts(filter);
}

const filterByReactions = () => {
    const filter = storeData.sort((a, b) => {
        return b.reactions - a.reactions;
    });
    displayPosts(filter);
}

const filterByDate = () => {
    const filter = storeData.sort((a, b) => {
        return new Date(a.created) - new Date(b.created);
    });
    displayPosts(filter);
}

const clearFilter = {
    getPosts
}

const filterCommentsHtml = document.querySelector("#filter-comments");
const filterReactHtml = document.querySelector("#filter-reactions");
const filterDateHtml = document.querySelector("#filter-date");
const filterClearButton = document.querySelector("#clear-button");

if (filterCommentsHtml.checked) {
    filterByComments();
} else if (filterReactHtml.checked) {
    filterByReactions();
} else if (filterDateHtml.checked) {
    filterByDate();
}

filterCommentsHtml.addEventListener("click", filterByComments);
filterDateHtml.addEventListener("click", filterByDate);
filterReactHtml.addEventListener("click", filterByReactions);
filterClearButton.addEventListener("click", clearFilter);

if (isLoggedIn() === true) {
    getPosts();
} else {
    console.log("auto login has not happened, due to the",
    "user never having logged in before!");
}