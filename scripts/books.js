var api = "https://www.googleapis.com/books/v1/volumes?q=";
var isbn ="";
var Isbnquery= isbn +"+isbn"
var key = "&key=AIzaSyB96fJBOycKGpt_-yifVN0GYrYau4FnVew"
//this url is a test url below

//apiURL = "https://www.googleapis.com/books/v1/volumes?q=water&key=&key=AIzaSyB96fJBOycKGpt_-yifVN0GYrYau4FnVew";

/*
    MUST BE FILLED IN TO CUSTOMIZE EXAMPLE
*/
// Endpoint you are sending a GET request to


document.getElementById('getData').onclick =getData();

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
    
    document.getElementById("getData").click()=getData();
  }
});

   
function getData() {
    // If using input for identifiers, etc.
    // For example, if using PokeAPI, this may be the Pokemon's ID.
   
    var apiURL = api + userInput+ key;
    

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


  function isObject(val){
    if(val===null){
        return false;
    }
    return (typeof val ==='object');


}
function objProps(obj){
    for(let val in obj){
        if(isObject(obj[val])){
            objProps(obj[val]);
        }else{
            console.log(val,obj[val]);
        }
    }
    

}


  
function populateData(response) {
    //var dataSection = document.getElementById('data');
    //console.log(response.items[0].volumeInfo.authors);//authors
    //console.log(response.items[0].volumeInfo.industryIdentifiers[0]);//grabs the isbn 13 
var  output = objProps(response);

   

 
  
   

    
    /*
        Process data from the API to display on the page.
    */

}
