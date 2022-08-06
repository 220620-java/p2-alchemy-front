getLoggedInUser().then(setup);

function setup() {
    if (loggedInUser) {
        showShelves();
    } else {
        window.location.href='./index.html';
    }
}

async function showShelves() {
    let categoryTable = document.getElementById('categoryTable');
    let resp = await fetch(apiUrl+'/category/all');
    let categories = await resp.json();

    for (let category of categories) {
        // create a row for each pet
        let tr = document.createElement('tr');
        //
        tr.innerHTML = `
            <td><button type="button" id="shelf" onClick="selectShelf(this)" value="${category.id}">${category.categoryName}</button></td>
        `;
        categoryTable.appendChild(tr);
    }
}

function selectShelf(element) {
    let bookTable=document.getElementById('bookTable');
    //reset inner html so previous books are not shown
    bookTable.innerHTML=``;
    bookTable.innerHTML=`<tr>
        <th>Books<th>
    <tr>`;
    let shelf=element.getAttribute('value');
    let books = loggedInUser.shelves;
    for(let book of books) {
        if(JSON.stringify(book.category.id)== shelf) {
            let tr = document.createElement('tr');
            tr.innerHTML = `
                <td>${book.bookISBN}</td>
            `;
            bookTable.appendChild(tr);
        }
    }
}
