function displayError(message) {
    if(!message) {
        message = "Unknown error has occured"
    }
    return `<div class="error">${message}</div>`;
} 