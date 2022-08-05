let apiUrl = 'http://localhost:8080';
let loggedInUser;

// retrieve the currently logged in user from the back end
async function getLoggedInUser() {
    let userId = sessionStorage.getItem('alchemyapp-id');
    if (userId) {
        let resp = await fetch(apiUrl+'/users/'+userId, {
            headers:new Headers({
                'Auth':sessionStorage.getItem('alchemyapp-tkn')
            })
        });
        
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

function showLoggedInDisplay() {
	document.getElementById('nav-books').hidden=true;
    document.getElementById('nav-login').hidden=true;
    document.getElementById('nav-logout').hidden=false;
    document.getElementById('myBookcase').hidden=false;

    document.getElementById('nav-logout').addEventListener('click', logOut);
}

function showLoggedOutDisplay() {
	document.getElementById('nav-books').hidden=false;
    document.getElementById('nav-login').hidden=false;
    document.getElementById('nav-logout').hidden=true;
    document.getElementById('nav-bookcase').hidden=true;

    document.getElementById('nav-logout').removeEventListener('click', logOut);
}

function logOut() {
    loggedInUser = null;
    sessionStorage.clear();
    showLoggedOutDisplay();
    if (window.location.href.includes('bookcase.html' || 'shelf.html')) {
        window.location.href='./index.html';
    }
}