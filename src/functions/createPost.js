
async function createPost(dataform) {
    try {
        const url = 'https://nf-api.onrender.com/api/v1/social/posts';
        const form = document.querySelector('#create-post-form');
        
        const titleText = document.getElementById("title-post-text").form[0].value;
        const bodyText = document.getElementById("title-post-text").form[1].value;

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
                title: titleText,
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

const form = document.querySelector("#create-post-form");

function noRefresh(event) {
    event.preventDefault();
}

form.addEventListener('submit', noRefresh);

const createPostButton = document.querySelector("#createPostButton");

createPostButton.onclick = function() {
    createPost()
};