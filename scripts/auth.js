let loggedInUser;

// retrieve the currently logged in user from the back end
async function getLoggedInUser() {
    let apiUrl = 'http://localhost:8080';
    let userId = JSON.parse(sessionStorage.getItem('alchemy-id'));
    if (userId) {
        let resp = await fetch(apiUrl+'/users/'+userId);
        
        if (resp.ok) {
            loggedInUser = await resp.json();
        }
    }

    if (loggedInUser) {
        showLoggedInDisplay();
    } else {
        showLoggedOutDisplay();
    }
}

// hides/shows links when logged in
function showLoggedInDisplay() {
    document.getElementById('loginLink').hidden=true;
    document.getElementById('logoutBtn').hidden=false;
    document.getElementById('myShelves').hidden=false;
    document.getElementById('profile').hidden=false;

    document.getElementById('logoutBtn').addEventListener('click', logOut);
}
// hides/shows linkes when logged out
function showLoggedOutDisplay() {
    document.getElementById('loginLink').hidden=false;
    document.getElementById('logoutBtn').hidden=true;
    document.getElementById('myShelves').hidden=true;
    document.getElementById('profile').hidden=true;

    document.getElementById('logoutBtn').removeEventListener('click', logOut);
}

function logOut() {
    loggedInUser = null;
    sessionStorage.clear();
    showLoggedOutDisplay();
    if (window.location.href.includes('books.html')) {
        window.location.href='./index.html';
    }
}