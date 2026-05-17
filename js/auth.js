function checkLogin() {
    const user = localStorage.getItem('loggedInUser');

    if(!user) {
        alert('Please login first');
        window.location.href = 'pos.html';
        return false;
    }
    return true;
}

function logout() {
    localStorage.removeItem('loggedInUser');
    window.location.href = 'pos.html';
}

// function getCurrentUser() {
//     return localStorage.getItem('loggedInUser');
// }