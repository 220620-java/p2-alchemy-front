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

    let username = document.getElementById('usernameInput').value;
    let password = document.getElementById('passwordInput').value;

    let credentials = {username:username, password:password};

    let resp = await fetch(apiUrl+'/auth', {
        method:'POST',
        body:JSON.stringify(credentials),
        headers:new Headers({
            'Content-Type':'application/json'
        })
    });

    if (resp.status===200) {
        loggedInUser = await resp.json();
        if (loggedInUser) {
			//change here -----------------------------------------------------------------
            sessionStorage.setItem('alchemyapp-tkn', resp.headers.get('Auth'));
            sessionStorage.setItem('alchemyapp-id', loggedInUser.id);
            window.location.href='./index.html';
        }
    } else {
        msgSpan.innerText = 'Incorrect credentials. Please try again.';
    }
}