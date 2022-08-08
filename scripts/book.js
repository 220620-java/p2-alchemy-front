const api = `https://www.googleapis.com/books/v1/volumes?q=`;
const volumesAPI=`https://www.googleapis.com/books/v1/volumes/`
//var volid = getVolId();
var volId;
const key = `?key=AIzaSyB96fJBOycKGpt_-yifVN0GYrYau4FnVew`;

//volquery+key for single book page
document.onload = getVolId();

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
        if (xhttp.readyState === 4) {
            if (xhttp.status === 200) {
                // Ready state is DONE, HTTP status code is "OK"
                var response = xhttp.responseText;
                response = JSON.parse(response);
                showBook(response);
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

function getVolId() {
    volId = localStorage.getItem('bookId');
    console.log(volId);
    let volquery = volumesAPI + volId + key; 
    getData(volquery);
}

function showBook(response) {
    let book = Object.values(response);
    console.log(book);
    let barray=book[4];

    document.getElementById('bookDetails').innerHTML = `
        <div class="col-sm-12 col-md-4">
            <img id="singleBookImg" src="${barray.imageLinks.thumbnail}" alt="${barray.title} book cover" />
        </div>
        <div class="col-sm-0 col-md-1"></div>
        <div class="col-sm-12 col-md-7 mt-5 text-white">
            <h2><span class="font-weight-bold">Title:</span> ${barray.title}</h2>
            <h3><span class="font-weight-bold">Author:</span> ${barray.authors[0]}</h3>
            <h3><span class="font-weight-bold">Publisher:</span> ${barray.publisher}</h3>
            <h3><span class="font-weight-bold">Date Published:</span> ${barray.publishedDate}</h3>
            <p><span class="font-weight-bold">Description:</span><br /> ${barray.description}</p>
        </div>
    `;
}