const myLibrary = [];

function Book(title, author, pages, read = false) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
}

let hobbit = new Book('The Hobbit', 'J.R.R Tolkien', 295);
let batman = new Book('Batman. The Dark Knight Returns', 'Frank Miller', 213, true);

addBookToLibrary(hobbit)
addBookToLibrary(batman)

function addBookToLibrary(book) {
  Object.defineProperty(book, 'info', {
    value: function () {
      if (this.read) {
        return `${this.title} by ${this.author}, ${this.pages} pages, already read`
      } else {
        return `${this.title} by ${this.author}, ${this.pages} pages, not read yet`
      }
    },
    enumerable: false,
    writable: true,
  })
  myLibrary.push(book)
}
//page generation
const library = document.querySelector('.library');
addBooksOnPage(myLibrary)

function addBooksOnPage(library) {
  if (library.length != 0) {
    library.forEach(createBookOnPage)
  }
}

function createBookOnPage(book, id) {
  let bookAttributes = Object.keys(book);
  let bookDiv = document.createElement('div');
  let closeButton = document.createElement('button')
  bookDiv.classList.add('book')
  bookDiv.dataset.id = id
  closeButton.classList.add('book-close-button')
  closeButton.textContent = 'X'
  bookDiv.append(closeButton)
  for (let attribute in book) {
    let div = document.createElement('div');
    div.classList.add(`book-${attribute}`)
    if (attribute == 'pages') div.textContent = `${book[attribute]} pages`
    else div.textContent = book[attribute];
    if (attribute == 'read') {
      (book[attribute]) ? div.textContent = 'read': div.textContent = "not read yet";
      div.addEventListener('click', readValidation)
    }
    bookDiv.append(div)
  }
  library.append(bookDiv)
  closeButton.addEventListener('click', (e) => {
    let removable = e.target.parentNode
    removable.remove()
    delete myLibrary[id]
  })


}

//modal window
const addButton = document.querySelector('.add-book');
const modalWindow = document.querySelector('.modal')
const submitBookButton = document.querySelector('.new-book-submit');
let form = document.querySelector('form');

addButton.addEventListener('click', (e) => {
  modalWindow.style.visibility = 'visible';
})

form.addEventListener('submit', (e) => {
  let newBook = new Book(form[0].value, form[1].value, form[2].value, form[3].checked)
  addBookToLibrary(newBook);
  createBookOnPage(newBook, myLibrary.length - 1);
  e.preventDefault();
  form.reset();
  modalWindow.style.visibility = 'hidden';
})

modalWindow.addEventListener('click', (e) => {
  if (e.target == modalWindow) modalWindow.style.visibility = 'hidden';
})

//read status

function readValidation(event) {
  let id = event.target.parentNode.dataset.id;
  if (event.target.textContent == 'not read yet') {
    event.target.textContent = 'read';
    myLibrary[id].read = true
  } else {
    event.target.textContent = 'not read yet';
    myLibrary[id].read = false;
  }
}