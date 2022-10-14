export function displayError(message) {
    /**
     * set the inner html of the error class to message
     * @return {String}
     * **/
    if(!message) {
        message = "Unknown error has occured"
    }
    return `<div class="error">${message}</div>`;
} 