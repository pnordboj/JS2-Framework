// Used to switch between View feed, Create Post and Search post

/**
 * Tab.js is used to switch between View Post and Create Post
 */

const htmlViewFeed = document.getElementById("view-feed-tab");
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
export function isLoggedIn() {
  return Boolean(localStorage.getItem("access-token"));
}

if (isLoggedIn() === true) {
  htmlloginForm.style.display = "none";
}
/**
 * Check if the clicked tab is active or not,
 * by checking if the classList contains active,
 * if not it assign active the class and removes it from the other class
 */
htmlViewFeed.onclick = function () {
  if (htmlViewFeed.classList.contains("active")) {
    viewFeed.style.display = "flex";
    searchForm.classList.replace("d-none", "d-flex");
    createPost.style.display = "none";
  } else {
    htmlViewFeed.classList.add("active");
    viewFeed.style.display = "flex";
    searchForm.classList.replace("d-none", "d-flex");
    createPost.style.display = "none";
    if (htmlCreatePost.classList.contains("active")) {
      htmlCreatePost.classList.remove("active");
    }
  }
};

htmlCreatePost.onclick = function () {
  if (htmlCreatePost.classList.contains("active")) {
    createPost.style.display = "block";
    viewFeed.style.display = "none";
    searchForm.classList.replace("d-flex", "d-none");
  } else {
    htmlCreatePost.classList.add("active");
    createPost.style.display = "block";
    viewFeed.style.display = "none";
    searchForm.classList.replace("d-flex", "d-none");
    if (htmlViewFeed.classList.contains("active")) {
      htmlViewFeed.classList.remove("active");
    }
  }
};
