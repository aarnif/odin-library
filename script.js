const myLibrary = [];
const books = document.getElementById("books");

function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
}

function addBookToLibrary(title, author, pages, read) {
  const newBook = new Book(title, author, pages, read);
  myLibrary.push(newBook);
}

function createBookCard(book) {
  const bookCard = document.createElement("div");
  const bookCardItems = document.createElement("ul");

  for (const key in book) {
    const bookCardItem = document.createElement("li");
    if (key === "read") {
      bookCardItem.textContent = `${key}: ${book[key] ? "read" : "not read"}`;
    } else {
      bookCardItem.textContent = `${key}: ${book[key]}`;
    }
    bookCardItems.appendChild(bookCardItem);
  }

  bookCard.appendChild(bookCardItems);
  return bookCard;
}

function displayBooks() {
  const books = document.getElementById("books");
  myLibrary.forEach((book) => {
    const listElement = document.createElement("li");
    const bookCard = createBookCard(book);
    bookCard.setAttribute("data", book.title);
    listElement.appendChild(bookCard);
    books.appendChild(listElement);
  });
}

addBookToLibrary("The Great Gatsby", "F. Scott Fitzgerald", 218, true);
addBookToLibrary("1984", "George Orwell", 328, false);
addBookToLibrary("To Kill a Mockingbird", "Harper Lee", 281, true);
addBookToLibrary("The Catcher in the Rye", "J.D. Salinger", 234, false);
addBookToLibrary("Pride and Prejudice", "Jane Austen", 432, true);

console.log(myLibrary);

window.onload = () => displayBooks();
