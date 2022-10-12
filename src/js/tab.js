// Used to switch between View feed, Create Post and Search post

const htmlViewFeed = document.getElementById('view-feed-tab');
const htmlCreatePost = document.querySelector("#create-post-tab");
const htmlloginForm = document.querySelector("#loginForm");

const createPost = document.getElementById("create-post");
const viewFeed = document.getElementById("all-posts");
const searchForm = document.querySelector("#search-form");
/**
 * Used to check if the user has logged inn and received a user token from the API.
 * @returns true or false boolean
 * @example
 * if(isLoggedIn() === true)
 *      // Do something...
 */
function isLoggedIn() {
    return Boolean(localStorage.getItem('access-token'));
}

if (isLoggedIn() === true) {
    htmlloginForm.style.display = "none";
}
/** 
 * Check if the clicked tab is active or not, 
 * by checking if the classList contains active, 
 * if not it assign active the class and removes it from the other class
*/
htmlViewFeed.onclick = function() {
    if (htmlViewFeed.classList.contains("active")) {
        viewFeed.style.display = "flex";
        searchForm.classList.add = "d-flex";
        searchForm.style.display = "flex";
        createPost.style.display = "none";
    } else {
        htmlViewFeed.classList.add("active")
        viewFeed.style.display = "flex";
        searchForm.classList.add = "d-flex";
        searchForm.style.display = "flex";
        createPost.style.display = "none";
        if (htmlCreatePost.classList.contains("active")) {
            htmlCreatePost.classList.remove("active")
        }
    }
}

htmlCreatePost.onclick = function() {
    if (htmlCreatePost.classList.contains("active")) {
        createPost.style.display = "block";
        viewFeed.style.display = "none";
        searchForm.style.display = "none";
        searchForm.classList.remove = "d-flex";
    } else {
        htmlCreatePost.classList.add("active")
        createPost.style.display = "block";
        viewFeed.style.display = "none";
        searchForm.style.display = "none";
        searchForm.classList.remove = "d-flex";
        if (htmlViewFeed.classList.contains("active")) {
            htmlViewFeed.classList.remove("active")
        }
    }
}