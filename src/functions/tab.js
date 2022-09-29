// Used to switch between View feed, Create Post and Search post

const htmlViewFeed = document.getElementById('view-feed-tab');
const htmlCreatePost = document.querySelector("#create-post-tab");
const htmlSearchPost = document.querySelector("#search-post-tab");

const createPost = document.getElementById("create-post");
const viewFeed = document.getElementById("all-posts");

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
        } else if (htmlSearchPost.classList.contains("active")) {
            htmlSearchPost.classList.remove("active")
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
        } else if (htmlSearchPost.classList.contains("active")) {
            htmlSearchPost.classList.remove("active")
        }
    }
}

htmlSearchPost.onclick = function() {
    if (htmlSearchPost.classList.contains("active")) {
        return
    } else {
        htmlSearchPost.classList.add("active")
        if (htmlCreatePost.classList.contains("active")) {
            htmlCreatePost.classList.remove("active")
        } else if (htmlViewFeed.classList.contains("active")) {
            htmlViewFeed.classList.remove("active")
        }
    }
}