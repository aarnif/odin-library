const myLibrary = [];
const books = document.getElementById("books");
const overlay = document.getElementById("overlay");
const modal = document.getElementById("modal");
const newBookButton = document.getElementById("new-book");
const form = document.getElementById("book-form");

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

function addRemoveBookButtonItem(index) {
  const removeBookItem = document.createElement("li");
  const removeBookButton = document.createElement("button");
  removeBookButton.setAttribute("data", index);
  removeBookButton.textContent = "Remove";

  removeBookButton.addEventListener("click", (e) => {
    const bookIndex = e.target.getAttribute("data");
    const removedBook = myLibrary[bookIndex];
    console.log(`Remove book: ${removedBook.title}`);
    myLibrary.splice(index, 1);
    updateLibrary();
    console.log(myLibrary);
  });

  removeBookItem.appendChild(removeBookButton);

  return removeBookItem;
}

function addReadButtonItem(index) {
  const findBook = myLibrary[index];
  const readBookItem = document.createElement("li");
  const readBookButton = document.createElement("button");
  readBookButton.setAttribute("data", index);
  readBookButton.textContent = !findBook.read ? "Read" : "Not Read";

  readBookButton.addEventListener("click", (e) => {
    findBook.read = !findBook.read;
    console.log(`Read book: ${findBook.title}`);
    updateLibrary();
    console.log(myLibrary);
  });

  readBookItem.appendChild(readBookButton);

  return readBookItem;
}

function createBookCard(book, index) {
  const bookCard = document.createElement("div");
  bookCard.setAttribute("data", index);
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

  const removeBookItem = addRemoveBookButtonItem(index);
  const readBookItem = addReadButtonItem(index);

  bookCardItems.appendChild(removeBookItem);
  bookCardItems.appendChild(readBookItem);
  bookCard.appendChild(bookCardItems);
  return bookCard;
}

function displayLibrary() {
  const books = document.getElementById("books");
  myLibrary.forEach((book, index) => {
    const listElement = document.createElement("li");
    const bookCard = createBookCard(book, index);
    listElement.appendChild(bookCard);
    books.appendChild(listElement);
  });
}

function updateLibrary() {
  books.innerHTML = "";
  displayLibrary();
}

function newBookModal() {
  overlay.style.visibility = "visible";
  modal.style.visibility = "visible";
}

function removeBookModal() {
  modal.style.visibility = "hidden";
  overlay.style.visibility = "hidden";
}

function submitBookToLibrary(title, author, pages, read) {
  addBookToLibrary(title, author, parseInt(pages), read);
  console.log(`Add book: ${title}`);
  console.log(myLibrary);
  removeBookModal();
  updateLibrary();
}

newBookButton.addEventListener("click", newBookModal);

form.addEventListener("submit", (event) => {
  event.preventDefault();
  submitBookToLibrary(
    event.target.title.value,
    event.target.author.value,
    event.target.pages.value,
    event.target.read.checked
  );
});

addBookToLibrary("The Great Gatsby", "F. Scott Fitzgerald", 218, true);
addBookToLibrary("1984", "George Orwell", 328, false);
addBookToLibrary("To Kill a Mockingbird", "Harper Lee", 281, true);
addBookToLibrary("The Catcher in the Rye", "J.D. Salinger", 234, false);
addBookToLibrary("Pride and Prejudice", "Jane Austen", 432, true);

console.log(myLibrary);

window.onload = () => displayLibrary();
