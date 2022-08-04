let apiUrl = 'http://localhost:8080';
let loggedInUser;

// retrieve the currently logged in user from the back end
async function getLoggedInUser() {
	//change here -----------------------------------------------------------------
    let userId = sessionStorage.getItem('petapp-id');
    if (userId) {
        let resp = await fetch(apiUrl+'/users/'+userId, {
            headers:new Headers({
				//change here -----------------------------------------------------------------
                'Auth':sessionStorage.getItem('petapp-tkn')
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
    document.getElementById('loginLink').hidden=true;
    document.getElementById('logoutBtn').hidden=false;
    //change here -----------------------------------------------------------------
    document.getElementById('myPetsLink').hidden=false;

    document.getElementById('logoutBtn').addEventListener('click', logOut);
}

function showLoggedOutDisplay() {
    document.getElementById('loginLink').hidden=false;
    document.getElementById('logoutBtn').hidden=true;
    //change here -----------------------------------------------------------------
    document.getElementById('myPetsLink').hidden=true;

    document.getElementById('logoutBtn').removeEventListener('click', logOut);
}

function logOut() {
    loggedInUser = null;
    sessionStorage.clear();
    showLoggedOutDisplay();
    //change here -----------------------------------------------------------------
    if (window.location.href.includes('mypets.html')) {
        window.location.href='./index.html';
    }
}