// Used to switch between View feed, Create Post and Search post

const htmlViewFeed = document.getElementById('view-feed-tab');
const htmlCreatePost = document.querySelector("#create-post-tab");
const htmlSearchPost = document.querySelector("#search-post-tab");
const htmlloginForm = document.querySelector("#loginForm");

const createPost = document.getElementById("create-post");
const viewFeed = document.getElementById("all-posts");

function isLoggedIn() {
    return Boolean(localStorage.getItem('access-token'));
}

if (isLoggedIn() === true) {
    htmlloginForm.style.display = "none";
}

htmlViewFeed.onclick = function() {
    if (htmlViewFeed.classList.contains("active")) {
        viewFeed.style.display = "flex";
        createPost.style.display = "none";
    } else {
        htmlViewFeed.classList.add("active")
        viewFeed.style.display = "flex";
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
    } else {
        htmlCreatePost.classList.add("active")
        createPost.style.display = "block";
        viewFeed.style.display = "none";
        if (htmlViewFeed.classList.contains("active")) {
            htmlViewFeed.classList.remove("active")
        }
    }
}