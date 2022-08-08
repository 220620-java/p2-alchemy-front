var api = `https://www.googleapis.com/books/v1/volumes?q=`;
var isbn =``;
var Isbnquery= isbn +`+isbn`;
var key = `&key=AIzaSyB96fJBOycKGpt_-yifVN0GYrYau4FnVew`;
var paginationapi=`&startIndex=${one}&maxResults=${five}`;
//this url is a test url below

//apiURL = "https://www.googleapis.com/books/v1/volumes?q=water&key=&key=AIzaSyB96fJBOycKGpt_-yifVN0GYrYau4FnVew";

/*
    MUST BE FILLED IN TO CUSTOMIZE EXAMPLE
*/
// Endpoint you are sending a GET request to


document.getElementById('getData').onclick =getData;//call this as a callback

// Get the input field
var userInput = document.getElementById('dataInput');
const output = document.getElementById('data');


// Execute a function when the user presses a key on the keyboard
userInput.addEventListener("keypress", function(event) {
  // If the user presses the "Enter" key on the keyboard
  if (event.key === "Enter") {
    // Cancel the default action, if needed
    event.preventDefault();
    // Trigger the button element with a click
    
    document.getElementById("getData").onclick=getData;
  }
});

   
function getData() {
    // If using input for identifiers, etc.
    // For example, if using PokeAPI, this may be the Pokemon's ID.
   
    var apiURL = api + userInput.value+ key;
    

    // 4 steps to making an AJAX call
    // STEP 1: Create an XML Http Request object
    var xhttp = new XMLHttpRequest();

    // STEP 2: Set a callback function for the readystatechange event
    xhttp.onreadystatechange = receiveData;

    // STEP 3: Open the request
  
    xhttp.open('GET', apiURL);
 
    // STEP 4: Send the request
    xhttp.send();

    // This needs to be an inner function so that it has closure to xhttp.
    function receiveData() {
        /*
            Different ready states of an XMLHttpRequest object
            0: UNSENT
            1: OPENED
            2: HEADERS RECEIVED
            3: LOADING
            4: DONE
        */
        console.log(apiURL);
        // Emptying out the div before inserting new data.
        document.getElementById("data").innerHTML = "";
        if (xhttp.readyState === 4) {
            if (xhttp.status === 200) {
                // Ready state is DONE, HTTP status code is "OK"
                var response = xhttp.responseText;
                response = JSON.parse(response);
                populateData(response);

            } else {
                // Ready state is DONE but status code is not "OK"
                /*
                    Handle error
                */
            }
        } else {
            // Ready state is not DONE
            /*
                Can have some sort of "loading" action
            */
        }
    }
}

/*
  function isObject(val){
    if(val===null){
        return false;
    }
    return (typeof val ==='object');


}
function objProps(obj){
    for(let val in obj){
        if(isObject(obj[val])){
            if(obj)
            objProps(obj[val]);
        }else{
            console.log(val,obj[val]);
        }
    }
    

}
*/

let currentStart = 0;
let numberPerPage = 15;

//button.addEventListener('click', nextPage); //add a next page button 

function nextPage() {
    currentStart += numberPerPage;

    showBooks();
}
var five =5;
var one =1;
async function showBooks() {
    let resp = await fetch(apiUrl);
    if (resp.ok) {
       let books = await resp.json();
       displayBooks(books);

   }
}
/*
function displayBooks(books) {
    for (let book of books) {
        let title = book[2].volumeInfo.title;
        let authors = book[2].volumeInfo.authors;
        let pageCount = book[2].volumeInfo.pageCount;
        let categories = book[2].volumeInfo.categories;

        for (let category of categories) {
            let li = document.createElement('li');
            li.innerText = category;
        }
    }
}
*/
/*
function displayBooks(books){
    for(let i=0;i<books.length;i++){
        let title = books.items[i].volumeInfo.title;
        let authors = books.items[i].volumeInfo.authors;
        let pageCount = books.items[i].volumeInfo.pageCount;
        let categories = books.items[i].volumeInfo.categories;

        
    }

}
*/


async function getPets() {
    let resp = await fetch(apiUrl+'/pets');

    if (resp.ok) {
        let pets = await resp.json();
        showPets(pets);
    }
}

function showPets(books) {
    books = Object.values(books);
    //console.log(books[0]);
    //console.log(books[1]);
    console.log(books[2]);
    let barray=books[2];
    console.log(barray.length);
    console.log(barray[1].volumeInfo.title);
   // console.log(barray[i]["volumeInfo"]["title"]);
   let dark = true;
    for (let i=0 ;i< barray.length;i++) {
        // create a row for each pet
        console.log(barray[i].id);
        let tr = document.createElement('tr');
        console.log(barray[i].volumeInfo.title);
       // let petNeeds = petNeedsString(pet.needs);
        tr.innerHTML = `
            <td>${barray[i].volumeInfo.title}</td>
            <td>${barray[i].volumeInfo.industryIdentifiers[0].identifier}</td>
            <td>${barray[i].volumeInfo.authors[0]}</td>
            <td><img src="${barray[i].volumeInfo.imageLinks.smallThumbnail}" width="25" height="25" /></td>
            <td><button id ="buttons">add</button></td>
        `;
        // ✅ Set Style Attributes on Element
    
       
       // this can go up there ^ <td><button type="button" id="adopt_${pet.id}">Adopt</button></td>
       document.getElementById("emp_body").appendChild(tr);
       // document.getElementById('adopt_'+pet.id).addEventListener('click', adoptPet);
    }
    var btn = document.getElementById("buttons").onclick=buttonclick;
    btn.setAttribute(
        'style',
        'background-color:black; color:grey;',
    );
    function buttonclick(){
        console.log("hello");
    }




    
}

async function putBook(isbn) {
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










  
function populateData(response) {
    //var dataSection = document.getElementById('data');
    //console.log(response.items[0].volumeInfo.authors);//authors
    //console.log(response.items[0].volumeInfo.industryIdentifiers[0]);//grabs the isbn 13 
//var  output = objProps(response);

showPets(response);

 
  
   

    
    /*
        Process data from the API to display on the page.
    */

}
