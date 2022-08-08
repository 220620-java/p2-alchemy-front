let userInfo;

document.onload = getUser();
	
//sent http request to get user object from backend
async function getUser() {
	let apiUrl = 'http://localhost:8080';
    let userId = JSON.parse(sessionStorage.getItem('alchemy-id'));
    if (userId) {
        let resp = await fetch(apiUrl+'/users/'+userId);
        
        if (resp.ok) {
            userInfo = await resp.json();
        }
				displayUser(userInfo);
    }
}

function displayUser(userInfo) {
	let pageTitle = document.getElementById('page-title');
	pageTitle.innerHTML = `<a href="index.html" class="text-white">Alchemy Books</a> - ${userInfo.username}'s Profile`;

	let userDetails = document.getElementById('user-details');
	userDetails.innerHTML = `
		<h2 class="text-white">Your Account Details</h2>
		<h3 class="text-white">Username: ${userInfo.username}</h3>
		<h3 class="text-white">User ID: ${userInfo.id}</h3>
		<h3 class="text-white">Name: ${userInfo.firstName} ${userInfo.lastName}</h3>
	`;

	let bookcase = document.getElementById('bookcase');
	bookcase.innerHTML = `<h2><a class="text-white" href="shelves.html">View your shelves here!</a></h2>`;
}