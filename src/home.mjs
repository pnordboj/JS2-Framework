import './functions/Authenticate/login.js';
import './functions/Authenticate/register.js';
import './functions/createPost.js';
import './functions/search.js';
import './functions/tab.js';
import './functions/error/error.js';

import { autoLogin } from './functions/Authenticate/login.js';

// Checks if the access key is stored in localStorage and logs inn automatically
// Look at login.js line 49 - 59

function checkLogin() {
    autoLogin();
}
checkLogin();