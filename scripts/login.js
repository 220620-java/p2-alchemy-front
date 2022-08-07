let apiUrl = 'http://localhost:8080'
getLoggedInUser().then(setup);

function setup() {
    if (!loggedInUser) {
        let loginBtn = document.getElementById('loginBtn');
        loginBtn.addEventListener('click', login);
    } else {
        window.location.href='./index.html';
    }
}


async function login() {
    let msgSpan = document.getElementById('msg');
    msgSpan.innerText='';

    let username = document.getElementById('username').value;
    let password = document.getElementById('password').value;

    let credentials = {username:username, password:password};

    let resp = await fetch(apiUrl+'/users/login', {
        method:'POST',
        body:JSON.stringify(credentials),
        headers:new Headers({
            'Content-Type':'application/json'
        })
    });

    if (resp.status===200) {
        loggedInUser = await resp.json();
        if (loggedInUser) {
            sessionStorage.setItem('alchemy-id', loggedInUser.id);
            window.location.href='./index.html';
        }
    } else {
        msgSpan.innerText = 'Incorrect credentials. Please try again.';
    }
}

async function register() {
    let registerSpan = document.getElementById('registerSpan');
    //registerSpan.innerText='';

    let newUsername = document.getElementById('registerUsername').value;
    let newPassword = document.getElementById('registerPassword').value;
    let firstName = document.getElementById('registerFirstName').value;
    let lastName = document.getElementById('registerLastName').value;

    let userRegistration = {username:newUsername, password:newPassword, firstname:firstName, lastname:lastName};
    let registrationResp = await fetch(apiUrl+'/users', {
        method:'POST',
        body:JSON.stringify(userRegistration),
        headers:new Headers({
            'Content-Type':'application/json'
        })
    });
    if (resp.status===201) {
        registerSpan.innerText='Account Registered';
    } else {
        registerSpan.innerText='Username already exists';
    }
}