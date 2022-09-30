//import './functions/Authenticate/login.js';
import './functions/Authenticate/register.js';
import {login} from './functions/Authenticate/register.js';
import './functions/createPost.js';
import './functions/posts.js';
import './functions/search.js';
import './functions/tab.js';
import './functions/error/error.js';

function isLoggedIn() {
    return Boolean(localStorage.getItem('access-token'));
    
  }
  
console.log(isLoggedIn())

function checkLogin() {
    if (isLoggedIn() === true) {
        login();
    }
}
checkLogin();

/*
Object { title: "Hello!", body: "This will be removed", tags: [], media: "", created: "2022-09-30T08:06:02.724Z", updated: "2022-09-30T08:06:02.724Z", id: 629, _count: {…} }
​
_count: Object { comments: 0, reactions: 0 }
​
body: "This will be removed"
​
created: "2022-09-30T08:06:02.724Z"
​
id: 629
​
media: ""
​
tags: Array []
​
title: "Hello!"
​
updated: "2022-09-30T08:06:02.724Z"
​
<prototype>: Object { … }
*/