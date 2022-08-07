//import axios from 'axios';
//const http = require('http');
function Login(){
	var username = document.getElementById('username');
	var password = document.getElementById('password');
 
 
	if(username.value == "" || password.value == ""){
		document.getElementById('error').innerHTML = "<center class='text-warning'>Please Enter Proper Credientials</center>";
	}else{
		if(username.value == "admin" && password.value == "admin"){
			document.getElementById('error').innerHTML = "";
			username.value = "";
			password.value = "";
			window.location = "home.html";
		}else{
			document.getElementById('error').innerHTML = "<center class='text-danger'>Invalid Username or Password</center>";
		}
	}



// we will dynamically switch the api string once we get static strings to work.
const getUsers = () => {
	axios.get('http://localhost:8080/users/id/4')
	.then(response => {
	 const users = response.data;
	 console.log(`GET users`, users);
   })
	.catch(error => console.error(error));
   };
   getUsers();


}