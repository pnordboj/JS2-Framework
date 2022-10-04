const queryString = document.location.search;
const params = new URLSearchParams(queryString);
const id = params.get("id");

const replyButton = document.querySelector("#reply-button");
const form = document.querySelector('#reply-form');

async function viewPost() {
    try {
        const postTitle = document.querySelector("#post-title");
        const postBody = document.querySelector("#post-body");
        const postFooter = document.querySelector("#post-footer");
        const postComments = document.querySelector("#post-comments");
        const url = `https://nf-api.onrender.com/api/v1/social/posts/${id}?_author=true&_comments=true&_reactions=true`;
        const options = {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${localStorage.getItem("access-token")}`,
            },
        }
        const response = await fetch(url, options);
        const data = await response.json();
        console.log(data);
        postTitle.innerHTML = data.title;
        postBody.innerHTML = `${data.body} <br> 
        <img src="${data.media}" class="img-fluid rounded" style="width: 50%;" alt=" ">
        <br> <b>Tags:</b> ${data.tags}`;
        postFooter.innerHTML = `
            Posted by <img alt=" " class="img-fluid rounded" style="width: 8%;" src="${data.author.avatar}" > ${data.author.name} on ${data.created}
        <div class="card-footer">
            ${data.reactions.map((reaction) => `
                <button class="btn btn-outline-primary" type="button" id="reaction-${reaction.postId}">${reaction.symbol}x${reaction.count}</button>
            `).join('')}
        </div>
        `;
        for(const comment of data.comments) {
            postComments.innerHTML += `
            <div class="card mb-3 rounded">
                <div class="card-body">
                    <p class="card-text">${comment.body}</p>
                </div>
                <div class="card-footer rounded text-muted">
                    Posted by ${comment.owner} on ${data.created}
                </div>
            </div>
            `;
        }
        
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
        const bodyText = document.getElementById("reply-form")[1].value;
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
        setTimeout(function(){ window.location.href = `/post/?id=${id}`; }, 1000)
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