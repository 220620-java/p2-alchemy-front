getLoggedInUser().then(setup);

function setup() {
    if (loggedInUser) {
        showShelves();
    } else {
        window.location.href='./index.html';
    }
}

async function showShelves() {
    let apiUrl = 'http://localhost:8080';
    let categoryTable = document.getElementById('categoryTable');
    let resp = await fetch(apiUrl+'/category/all');
    let categories = await resp.json();
    // gets list of all categories in database
    for (let category of categories) {
        // create a row for each pet
        let td = document.getElementById('categoryRow');
        //
        td.innerHTML += `
            <button type="button" id="shelf" onClick="selectShelf(this)" value="${category.id}">${category.categoryName}</button>
        `;
    }
}

function selectShelf(element) {
    let bookTable=document.getElementById('bookTable');
    //reset inner html so previous books are not shown
    bookTable.innerHTML=``;
    bookTable.innerHTML=`
        <h3 class="col-12">Books On Your Shelf<h3>
    `;
    let shelf=element.getAttribute('value');
    let books = loggedInUser.shelves;
    for(let book of books) {
        if(JSON.stringify(book.category.id)== shelf) {
            let card = document.createElement('div');
            card.classList.add('card');
            card.innerHTML = `
                <a class="bookLink" id="${book.bookISBN}" onClick="setVolId(this)" href="book.html"><img class="card-img-top" src="${book.bookCover}" alt="book cover"></a>
            `;
            bookTable.appendChild(card);
        }
    }
}

function setVolId(element) {
    localStorage.setItem('bookId', element.id);
}