/**
 * search.js handles users searching for posts and filters
 */

import { isLoggedIn } from "../js/tab.js";
import { displayError } from "./error/error.mjs";

let url = 'https://nf-api.onrender.com/api/v1/social/posts';
const searchButton = document.querySelector("#searchButton");
const htmlAll = document.querySelector("#all-posts");
let storeData = [];

/** 
 * Update the value of url on the search
 * @param {String} ev event
 **/

searchButton.addEventListener("input", (e) => {
    const value = e.target.value.toLowerCase()
    /**
     * Capture the change in input value and make a query to the API url
     * @param {String} value Fetching query for the data in the backend
     */
    const filtered = storeData.filter((post) => {
        return (
            /** 
             * @return post.title.toLowerCase().match(value) != null
             * @return post.body.toLowerCase().match(value) != null
             * Reference: https://stackoverflow.com/questions/61323656/how-to-search-by-title-defined-in-array
            */
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
        /**
         * Fetch all posts
         * storeData stores the data retrieved from the url of the api
         * @return displayPosts(storeData) in the Fetch api this returns the post's data
         * After it is stored it can be used as a global variable and refrenced later on
         */
        storeData = await response.json();
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

/** 
 * displayPosts returns all the posts filtered
 * by number of comments, reactions and the date the post was created, from old to new
 * it also uses the search button in case a query was made
 * @param {Object} data storeData
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
                    <br>
                    <b>Reactions:</b> ${post._count.reactions}
                    <b>Comments:</b> ${post._count.comments}
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
 * Filters for comments, reactions and date creation
 */

const filterByComments = () => {
    /**
     * Comments are filterd by the count value from the API, form high to low
     * @return displayPosts(filter) the filtered data is displayed on the frontend
     */
    const filter = storeData.sort((a, b) => {
        return a._count.comments < b._count.comments;
    });
    displayPosts(filter);
}

const filterByReactions = () => {
    /**
     * Reactions are filterd by the count value from the API, from high to low
     * @return displayPosts(filter) the filtered data is displayed on the frontend
     */
    const filter = storeData.sort((a, b) => {
        return a._count.reactions < b._count.reactions;
    });
    displayPosts(filter);
}

const filterByDate = () => {
    /**
     * Posts are filtered by the date it was created from old to new
     * @return displayPosts(filter) the filtered data is displayed on the frontend
     */
    const filter = storeData.sort((a, b) => {
        return new Date(a.created) - new Date(b.created);
    });
    displayPosts(filter);
}

const clearFilter = (event) => {
    /**
     * clearFilter resets the filters, once they are selected or query began
     */
    event.preventDefault();
    filterCommentsHtml.checked = false;
    filterDateHtml.checked = false;
    filterReactHtml.checked = false;
    getPosts();
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
}