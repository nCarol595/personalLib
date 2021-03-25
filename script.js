//function to toggle popup
function togglePopup() {
    document.getElementById("case").style.display = "block";
}

//Function to Hide Popup
function div_hide() {
    document.getElementById("case").style.display = "none";
}
let library;

//constructor for book
class Book {
    constructor(title, author, pages, status) {
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.status = status;
    }
}

let form = document.querySelector("form");
let tableBody = document.getElementById("bookish");
let table = document.querySelector("table");

//adds book to library
function addBookToLibrary() {
    //Maybe change the pages input to numerical input only

    let title = document.getElementById("title").value;
    let author = document.getElementById("author").value;
    let pages = document.getElementById("pages").value;
    let status = document.getElementById("status").value;
    if (title.length === 0 || author.length === 0) {
        alert("Please, fill all the fields");
        return;
    }
    const entry = new Book(title, author, pages, status);
    library.push(entry);
    updateLocalStorage();
}

function changeStatus(book) {
    if (library[book].status === "read") {
        library[book].status = "not read";
    } else library[book].status = "read";

}

function deleteBook(currentBook) {
    library.splice(currentBook, currentBook + 1);
}

function findBook(libraryArray, position) {
    if (libraryArray.length === 0 || libraryArray === null) {
        return;
    }
    let pos = libraryArray.map(function(e) { return e.title; }).indexOf(position);
    return pos;
}

function updateLocalStorage() {
    localStorage.setItem("library", JSON.stringify(library));
}

function checkLocalStorage() {
    if (localStorage.getItem('library') === null) {
        library = [];
    } else {
        library = JSON.parse(localStorage.getItem('library'));
    }
}

function render() {
    checkLocalStorage();
    tableBody.innerHTML = '';
    library.forEach(book => {

        let htmlBook = `<tr><td>${book.title} </td>
            <td> ${book.author} </td>
        <td>${book.pages}</td>
            <td> <button class="status-button"> ${book.status}</button></td><td><button class="delete">delete</button></td></tr>`;
        tableBody.insertAdjacentHTML("afterbegin", htmlBook);
    });
}

render();

//Event Listeners
form.addEventListener("submit", (e) => {
    e.preventDefault();
    addBookToLibrary();
    render();
    div_hide();
});

table.addEventListener("click", (e) => {
    let currentTarget = e.target.parentNode.parentNode.childNodes[0];
    if (e.target.innerHTML === "delete") {
        //if (confirm(`are you sure you want to delete ${currentTarget.innerText}`))
        deleteBook(findBook(library, currentTarget.innerText));
    }
    if (e.target.classList.contains("status-button")) {
        let dor = currentTarget.innerText;
        dor = dor.toString();
        changeStatus(findBook(library, dor));
    }
    updateLocalStorage();
    render();
});