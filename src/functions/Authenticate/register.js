const params = {
    name: 'patricknj',
    email: 'PatJoh55304@stud.noroff.no',
    password: '220197Pn'
}

const options = {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify(params)
}

const url = `https://nf-api.onrender.com/api/v1/social/auth/register`;
const html = document.querySelector(".callApiBody");
const callApiBtn = document.querySelector("#loggedInUser");

async function getApi() {
    try {
        const response = await fetch(url, options)
        const data = await response.json();
        console.log(data);
        if (data.message == 'Profile already exists') {
            login();
        }

    } catch (error) {
        console.log(error);
        html.innerHTML = displayError('Error', error);
    }
}

callApiBtn.onclick = function() {
    getApi();
}

// Object { statusCode: 400, error: "Bad Request", message: "Profile already exists" }