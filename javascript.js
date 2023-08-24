const myLibrary = [];

function Book(title, author, pages, read) {
  this.title = title,
  this.author = author,
  this.pages = pages,
  this.read = read
}

const addBook = document.querySelector(".add-book");
const dialog = document.querySelector("dialog");
const closeDialog = document.querySelector(".closeDialog")
const overlay = document.querySelector(".overlay");
const title = document.querySelector("form .title");
const author = document.querySelector("form .author");
const pages = document.querySelector("form input[type='number']");
const read = document.querySelector(".checkbox input[type='checkbox']");
const form = document.querySelector("form");
const bookContainer = document.querySelector(".book-container");

addBook.onclick = () => {
  dialog.showModal();
  overlay.style.display = 'block';
};

closeDialog.onclick = () => {
  dialog.close();
  overlay.style.display = 'none';
};

form.addEventListener('submit', (event) => {
  event.preventDefault();

  myLibrary.push(new Book(title.value, author.value, pages.value, read.checked? "read" : "not read"))
  // const book = document.createElement('div');
  // book.innerHTML =
  // `<div class="title">${title.value}</div>
  // <div class="author">${author.value}</div>
  // <div class="pages">${pages.value}</div>
  // <div class="read">${read.checked? "read" : "not read"}</div>
  // <button class="remove-book"><p>&#10060;</p></button>`;
  // bookContainer.appendChild(book).className = "book";
  form.reset();
  dialog.close();
  overlay.style.display = 'none';
  printBooks();
});

const printBooks = () => {
  bookContainer.replaceChildren();
    myLibrary.forEach((book,index) =>{
    const bookDiv = document.createElement('div');
    bookDiv.dataset.id = index;
    bookDiv.innerHTML =`
    <div class="title">${book.title}</div>
    <div class="author">${book.author}</div>
    <div class="pages">${book.pages}</div>
    <div class="read">${book.read}</div>
    <button class="remove-book">&#10060;</button>
    `;
    bookContainer.appendChild(bookDiv).className = "book";
  })
};

bookContainer.addEventListener('click', (e) => {
  console.log(e.target.parentNode.dataset.id);
  if (e.target.className === "read") {
    e.target.innerText = e.target.innerText === 'read'? 'not read' : 'read';
  } else if(e.target.className === "remove-book") {
    myLibrary.splice(e.target.parentNode.dataset.id, 1);
    printBooks();
  }
})
