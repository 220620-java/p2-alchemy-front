const api = `https://www.googleapis.com/books/v1/volumes?q=`;
const volumesAPI=`https://www.googleapis.com/books/v1/volumes/`
//var volid = getVolId();
var volid;
const volquery= volumesAPI +volid;
const key = `?key=AIzaSyB96fJBOycKGpt_-yifVN0GYrYau4FnVew`;

//volquery+key for single book page
//document.onload = getData;

function getData(apiURL) {
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
                return response;
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

function getVolId(element) {
    console.log(element.value);
    volId = element.value;
    console.log(volid);
}

function showBook() {

}

document.getElementById('bookLink').addEventListener('click', getVolId(element));