const queryString = document.location.search;
const params = new URLSearchParams(queryString);
const id = params.get("id");

const replyButton = document.querySelector("#reply-button");
const form = document.querySelector('#reply-form');

async function viewPost() {
    try {
        const postTitle = document.querySelector("#post-title");
        const postBody = document.querySelector("#post-body");
        const url = `https://nf-api.onrender.com/api/v1/social/posts/${id}`;
        const options = {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${localStorage.getItem("access-token")}`,
            },
        }
        const response = await fetch(url, options);
        const data = await response.json();
        postTitle.innerHTML = data.title;
        postBody.innerHTML = data.body;
    } catch (error) {
        console.log(error);
    }
}

viewPost();


function noRefresh(event) {
    event.preventDefault();
}

form.addEventListener('submit', noRefresh);

replyButton.onclick = function(dataform) {
    try {
        const url = `https://nf-api.onrender.com/api/v1/social/posts/${id}/comment`;
        const bodyText = document.getElementById("reply-form")[0].value;
        console.log(bodyText);
        const fd = new FormData(form);
        for(const name in dataform) {
            fd.append(name, dataform[name]);
        }

        const options = {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${localStorage.getItem("access-token")}`,
                'Content-type': 'application/json',
            },
            body: JSON.stringify({
                body: bodyText,
            }),
        };
        console.log(options)
        fetch(url, options)
        .then((response) => response.json())
        .then((json) => console.log(json));
    } catch (error) {
        console.log(error);
    }
}

const updateButton = document.querySelector("#update-button");

updateButton.onclick = async function() {
    const url = `https://nf-api.onrender.com/api/v1/social/posts/${id}`;
    const titleText = document.getElementById("reply-form")[0].value;
    const bodyText = document.getElementById("reply-form")[1].value;
    const options = {
        method: 'PUT',
        headers: {
            Authorization: `Bearer ${localStorage.getItem("access-token")}`,
            'Content-type': 'application/json',
        },
        body: JSON.stringify({
            title: titleText,
            body: bodyText,
        }),
    }
    const response = await fetch(url, options);
    const data = await response.json();
    console.log(data);
    window.location.href = "../";
}

const deleteButton = document.querySelector("#delete-button");

deleteButton.onclick = async function() {
    const url = `https://nf-api.onrender.com/api/v1/social/posts/${id}`;
    const options = {
        method: 'DELETE',
        headers: {
            Authorization: `Bearer ${localStorage.getItem("access-token")}`,
        },
    }
    const response = await fetch(url, options);
    const data = await response.json();
    window.location.href = "../";
}