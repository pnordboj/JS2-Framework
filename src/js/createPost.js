/**
 * createPosts.js contains the method createPost, 
 * the function that makes it possible to create a post on the web page.
 */

async function createPost() {
    try {
        const url = 'https://nf-api.onrender.com/api/v1/social/posts';
        const titleText = document.getElementById("title-post-text").form[0].value;
        const bodyText = document.getElementById("title-post-text").form[1].value;
        const tagText = document.getElementById("title-post-text").form[2].value;

        /**
         * Gets value from titleText, bodyText and tagText.
         * Then JSON.stringifies the value and sends it to the API endpoint https://nf-api.onrender.com/api/v1/social/posts.
         * after the value is stringified it posts the post to the users feed
         * @param {String} titleText
         * @param {String} bodyText
         * @param {String} tagText
         * @return {post} Function creates a new post
         */

        const options = {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${localStorage.getItem("access-token")}`,
                'Content-type': 'application/json',
            },
            body: JSON.stringify({
                title: titleText,
                body: bodyText,
                tags: tagText,
            }),
        };
        fetch(url, options)
        .then((response) => response.json())
        .then((json) => console.log(json));
    } catch (error) {
        console.log(error);
    }
}

const form = document.querySelector("#create-post-form");

function noRefresh(event) {
    /**
     * Prevents page from refreshing instantly when the button create-post-form is clicked.
     */
    event.preventDefault();
}

form.addEventListener('submit', noRefresh);

const createPostButton = document.querySelector("#createPostButton");

createPostButton.onclick = function() {
    /** 
     * When the button createPostButton is clicked the createPost method is activated
     * @param {String} createPost
     * Correctly posts posts to the API endpoint
     * And refreshes the page after 1 second, to make sure the function posts the data correctly.
     */
    createPost()
    setTimeout(function(){ window.location.href = "/"; }, 1000);
};