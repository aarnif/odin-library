const myLibrary = [];
const books = document.getElementById("books");
const overlay = document.getElementById("overlay");
const modal = document.getElementById("modal");
const newBookButton = document.getElementById("new-book");
const cancelButton = document.getElementById("cancel-button");
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

function deleteBookFromLibrary(bookIndex) {
  myLibrary.splice(bookIndex, 1);
}

function addRemoveBookIconItem(index) {
  const removeBookItem = document.createElement("li");
  const trashIcon = document.createElement("img");

  trashIcon.classList.add("remove-icon");
  trashIcon.src = "assets/icons/trash-can-outline.svg";
  trashIcon.setAttribute("data", index);

  trashIcon.addEventListener("click", (e) => {
    const bookIndex = e.target.getAttribute("data");
    handleDeleteBookFromLibrary(bookIndex);
  });

  removeBookItem.appendChild(trashIcon);

  return removeBookItem;
}

function addReadIconItem(index) {
  const findBook = myLibrary[index];
  const readBookItem = document.createElement("li");
  const readIcon = document.createElement("img");
  const unReadIcon = document.createElement("img");

  readIcon.classList.add("read-icon");
  readIcon.src = "assets/icons/book-check.svg";

  unReadIcon.classList.add("read-icon");
  unReadIcon.src = "assets/icons/book-cancel.svg";

  readBookItem.addEventListener("click", (e) => {
    findBook.read = !findBook.read;
    console.log(`Read book: ${findBook.title}`);
    updateLibrary();
    console.log(myLibrary);
  });

  findBook.read
    ? readBookItem.appendChild(readIcon)
    : readBookItem.appendChild(unReadIcon);

  return readBookItem;
}

function createBookCard(book, index) {
  const bookCard = document.createElement("div");
  bookCard.setAttribute("data", index);
  bookCard.classList.add("book-card");
  const bookCardItems = document.createElement("ul");
  bookCardItems.classList.add("book-card-items");

  for (const key in book) {
    const bookCardItem = document.createElement("li");
    if (key === "title") {
      const title = document.createElement("h2");
      title.classList.add("book-title");
      title.textContent = book[key];
      bookCardItem.appendChild(title);
    } else if (key === "author") {
      const author = document.createElement("h3");
      author.classList.add("book-author");
      author.textContent = `By ${book[key]}`;
      bookCardItem.appendChild(author);
    } else if (key === "read") {
      const read = document.createElement("p");
      read.classList.add("book-read");
      read.textContent = `${key[0].toUpperCase() + key.slice(1)}: ${
        book[key] ? "read" : "not read"
      }`;
      bookCardItem.appendChild(read);
    } else if (key === "pages") {
      const pages = document.createElement("p");
      pages.classList.add("book-pages");
      pages.textContent = `Length: ${book[key]} pages`;
      bookCardItem.appendChild(pages);
    }
    bookCardItems.appendChild(bookCardItem);
  }

  const bookCardIcons = document.createElement("ul");
  bookCardIcons.classList.add("book-card-icons");

  const readBookItem = addReadIconItem(index);
  const removeBookItem = addRemoveBookIconItem(index);

  bookCardIcons.appendChild(readBookItem);
  bookCardIcons.appendChild(removeBookItem);
  bookCard.appendChild(bookCardItems);
  bookCard.appendChild(bookCardIcons);
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

function showNewBookModal() {
  overlay.classList.toggle("active");
  modal.classList.toggle("active");
}

function hideNewBookModal() {
  modal.classList.toggle("active");
  overlay.classList.toggle("active");
}

function handleAddBookToLibrary(title, author, pages, read) {
  addBookToLibrary(title, author, parseInt(pages), read);
  console.log(`Add book: ${title}`);
  console.log(myLibrary);
  hideNewBookModal();
  updateLibrary();
}

function handleDeleteBookFromLibrary(bookIndex) {
  const removedBook = myLibrary[bookIndex];
  console.log(`Remove book: ${removedBook.title}`);
  deleteBookFromLibrary(bookIndex);
  updateLibrary();
  console.log(myLibrary);
}

newBookButton.addEventListener("click", showNewBookModal);
cancelButton.addEventListener("click", hideNewBookModal);

form.addEventListener("submit", (event) => {
  event.preventDefault();
  handleAddBookToLibrary(
    event.target.title.value,
    event.target.author.value,
    event.target.pages.value,
    event.target.read.checked
  );
  event.target.title.value = "";
  event.target.author.value = "";
  event.target.pages.value = "";
  event.target.read.checked = false;
});

addBookToLibrary("The Great Gatsby", "F. Scott Fitzgerald", 218, true);
addBookToLibrary("1984", "George Orwell", 328, false);
addBookToLibrary("To Kill a Mockingbird", "Harper Lee", 281, true);
addBookToLibrary("The Catcher in the Rye", "J.D. Salinger", 234, false);
addBookToLibrary("Pride and Prejudice", "Jane Austen", 432, true);

console.log(myLibrary);

window.onload = () => displayLibrary();
