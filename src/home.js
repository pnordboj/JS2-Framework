/**
 * home.js combines all the javascript files together for the index.html page
 */

import './js/Authenticate/login.js';
import './js/Authenticate/register.js';
import './js/createPost.js';
import './js/search.js';
import './js/tab.js';
import './js/error/error.mjs';

import { autoLogin } from './js/Authenticate/login.js';

// Checks if the access key is stored in localStorage and logs inn automatically
// Look at login.js line 49 - 59

function checkLogin() {
    autoLogin();
}
checkLogin();