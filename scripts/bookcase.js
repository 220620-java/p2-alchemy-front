let apiUrl = 'http://localhost:8080';

document.getElementById('shelf1')
  .innerHTML = getBooks();

function getBooks() {
  //make call to backend to retrieve the first five isbn numbers for that category
  let isbns = [];
  for(let shelf = 1; shelf <= 3; shelf++) {
      //call getIsbn(shelf)
  }

  //make call to google api using the isbn #s returned from the backend
}

async function getIsbn(shelf) {
  let userId = sessionStorage.getItem('alchemyapp-id');

  let resp = await fetch(apiUrl + '/users/' + userId + '/shelves/' + shelf);
}