const urlPost = `https://nf-api.onrender.com/api/v1/social/posts`;
const htmlAll = document.querySelector("#all-posts");

export async function getAllPosts() {
    try {
        const optionsPosts = {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${localStorage.getItem("access-token")}`,
            },
        }
        const response = await fetch(urlPost, optionsPosts);
        const data = await response.json();
        console.log(data);
        htmlAll.innerHTML = ``;
        for(let i = 0; i < data.length; i++) {
            htmlAll.innerHTML =
                `
                <div class="col mt-2">
                    <div class="card">
                        <div class="card-header">
                        ${data[i].title}
                        </div>
                        <div class="card-body">
                        ${data[i].body}
                        </div>
                        <div class="card-footer">
                        <a href="post/?id=${data[i].id}" class="btn btn-primary">Read more</a>
                        </div>
                    </div>
                </div>
                `;
        }
    } catch (error)
    {   
        console.log(error);
        html.innerHTML = displayError('error', error);
    }
}


// Reply to post --WIP--

/*

const form = document.querySelector('#reply-form');
function noRefresh(event) {
    event.preventDefault();
}

form.addEventListener('submit', noRefresh);
const replyPostButton = document.querySelector("#replyPostButton");
replyPostButton.onclick = async function replyPost(dataform) {
    try {
        const url = `https://nf-api.onrender.com/api/v1/social/posts/${data[i].id}/comment`;
        
        const bodyText = document.getElementById("reply-text").form[0].value;

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
*/