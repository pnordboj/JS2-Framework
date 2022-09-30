import '../src/functions/ViewPost.js';
import {login} from '../src/functions/Authenticate/register.js';

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