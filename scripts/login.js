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