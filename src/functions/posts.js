const urlPost = `https://nf-api.onrender.com/api/v1/social/posts`;
const htmlAll = document.querySelector("#all-posts");

async function getAllPosts() {
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
        for(let i = 0; i < data.length; i++) {
        htmlAll.innerHTML +=
            `
            <div class="col mt-2">
                <div class="card">
                    <div class="card-header">
                    ${data[i].title}
                    </div>
                    <div class="card-body">
                    ${data[i].body}
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