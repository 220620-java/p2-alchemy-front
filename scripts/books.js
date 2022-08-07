const api = `https://www.googleapis.com/books/v1/volumes?q=`;
const volumesAPI=`https://www.googleapis.com/books/v1/volumes/`
var volid =``;
const volquery= volumesAPI +volid;
const key = `key=AIzaSyB96fJBOycKGpt_-yifVN0GYrYau4FnVew`;
//var paginationapi=`&startIndex=${one}&maxResults=${five}`;
//this url is a test url below

var arr = new Array();
//cats
arr.push(`a921PQAACAAJ?`);
//flowers
arr.push(`GxXGDwAAQBAJ?`);
//wind
arr.push(`UY_MAwAAQBAJ?`);


//volquery+key for single book page


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

function userShelves(books){
    books = Object.values(books);
    //console.log(books[0]);
    //console.log(books[1]);
    console.log(books[2]);
    let barray=books[2];
    console.log(barray.length);
    console.log(barray[1].volumeInfo.title);
   // console.log(barray[i]["volumeInfo"]["title"]);
    for (let i=0 ;i<barray.length;i++) {
        // create a row for each pet
       // let tr = document.createElement('tr');
        console.log(barray[i].volumeInfo.title);
       // let petNeeds = petNeedsString(pet.needs);
       // tr.innerHTML = `
           // <td>${barray[i].volumeInfo.title}</td>
           // <td>${barray[i].volumeInfo.industryIdentifiers[0].identifier}</td>
          //  <td>${barray[i].volumeInfo.authors[0]}</td>
          //  <td><img src="${barray[i].volumeInfo.imageLinks.smallThumbnail}" width="25" height="25" /></td>
      //  `;
       // this can go up there ^ <td><button type="button" id="adopt_${pet.id}">Adopt</button></td>
      //// document.getElementById("emp_body").appendChild(tr);
       // document.getElementById('adopt_'+pet.id).addEventListener('click', adoptPet);
    }
}
//getData();

function displayshelves(arrays){
    for(let i=0;i<arrays.length;i++){
        volid=arrays[i];

            let apiURL = volumesAPI+volid+key;
            let books= getData(apiURL);
            userShelves(books);

         volid=``;
        
    }
}
displayshelves(arr);

async function processUsers(array){
    let result;
    let promises = [];
    for(let i = 0; i < array.length; i++){
        promises.push(make_api_call(user_list[i].Id));
    }
    result = await Promise.all(promises);
    for(let i = 0; i < user_list.length; i++){
        user_list[i]['result'] = result[i];
    }
    return user_list;
}