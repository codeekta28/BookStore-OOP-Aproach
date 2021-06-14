console.log("this is index file");

// collectData class
class collectData {
    constructor(title, author, price) {
        this.title = title;
        this.author = author;
        this.price = price;
    }
}

// UI Class
class UI {
    static displayBook() {
        const books = Store.getBooks();
        books.forEach((book) => {
            UI.addBooksToList(book);
        })
    }
    static addBooksToList(book) {
        const tBody = document.querySelector("#bookList");
        const tRow = document.createElement("tr");
        tRow.innerHTML = `<td>${book.title}</td>
                        <td>${book.author}</td>
                        <td>${book.price}</td>
                        <td> <a href="" class = "btn btn-danger btn-sm delete">X</td>`
        tBody.appendChild(tRow);
    }
    static showAlert(message, alertStatus) {
        let alertDiv = document.createElement("div");
        alertDiv.className = `alert alert-${alertStatus} my-3 text-capitalize`;
        alertDiv.appendChild(document.createTextNode(message));
        let container = document.querySelector(".container");
        let form = document.querySelector(".bookForm");
        container.insertBefore(alertDiv, form);
        setTimeout(() => {
            alertDiv.remove();
        }, 3000);
    }

    static clearFields() {
        document.querySelector("#title").value = "";
        document.querySelector("#author").value = "";
        document.querySelector("#price").value = "";
    }
    static deleteBook(el) {
        if (el.classList.contains("delete")) {
            el.parentElement.parentElement.remove();
        }
    }
}

// store class
class Store {
    // getBooks
    static getBooks() {
        let books;
        if (localStorage.getItem("books") === null) {
            books = [];
        } else {
            books = JSON.parse(localStorage.getItem("books"));
        }
        return books;
    }
    // addBooks
    static addBooks(book) {
        const books = Store.getBooks();
        books.push(book);
        localStorage.setItem("books", JSON.stringify(books));
    }
    // removeBooks
    static removeBooks(price) {
        const books = Store.getBooks();
        books.forEach((book, index) => {
            // console.log("book",book);
            if (book.price === price) {
                // console.log("deleted");
                books.splice(index, 1);
            }
            localStorage.setItem("books", JSON.stringify(books));
        })
    }
}



// displayBook event
document.addEventListener("DOMContentLoaded", UI.displayBook())

// add form event
document.querySelector("#bookForm").addEventListener("submit", (e) => {
    e.preventDefault();
    // collect data from user
    let uTitle = document.querySelector("#title").value;
    let uAuthor = document.querySelector("#author").value;
    let uPrice = document.querySelector("#price").value;
    // validation
    if (uTitle == "" || uAuthor == "" || uPrice == "") {
        UI.showAlert("Dont keep the box empty", "danger");
    } else {
        // Instantiate the class
        let book = new collectData(uTitle, uAuthor, uPrice);
        // display the books in UI
        UI.addBooksToList(book);
        // book added msg
        UI.showAlert("Book Added", "success");
        // Add book to localStore
        Store.addBooks(book);
        // clear fields
        UI.clearFields();
    }


})

// remove book event
document.querySelector("#bookList").addEventListener("click", (e) => {
    e.preventDefault();
    // delete from UI
    UI.deleteBook(e.target);
    // delete from store  
    Store.removeBooks(e.target.parentElement.previousElementSibling.textContent);
//    alert msg to remove
    UI.showAlert("Book Removed","success");


})
