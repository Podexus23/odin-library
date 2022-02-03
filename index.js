class Book {
  static myLibrary = [];

  constructor(title, author, pages, read = false) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
  }

  static addBookToLibrary(book) {
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
    this.myLibrary.push(book)
  }

  static addBooksOnPage() {
    if (this.myLibrary.length != 0) {
      this.myLibrary.forEach(this.createBookOnPage)
    } else return 'Sorry there is no books';
  }

  static readValidation(event) {
    let id = event.target.parentNode.dataset.id;
    if (event.target.textContent == 'not read yet') {
      event.target.textContent = 'read';
      Book.myLibrary[id].read = true
    } else {
      event.target.textContent = 'not read yet';
      Book.myLibrary[id].read = false;
    }
  }

  static createBookOnPage(book, id) {
    const library = document.querySelector('.library');
    const bookDiv = document.createElement('div');
    const closeButton = document.createElement('button')
    let place = this;

    bookDiv.classList.add('book')
    bookDiv.dataset.id = id
    closeButton.classList.add('book-close-button')
    closeButton.textContent = 'X'
    bookDiv.append(closeButton)
    for (let attribute in book) {
      const div = document.createElement('div');
      div.classList.add(`book-${attribute}`)
      if (attribute == 'pages') div.textContent = `${book[attribute]} pages`
      else div.textContent = book[attribute];
      if (attribute == 'read') {
        (book[attribute]) ? div.textContent = 'read': div.textContent = "not read yet";
        div.addEventListener('click', Book.readValidation)
      }
      bookDiv.append(div)
    }
    library.append(bookDiv)
    closeButton.addEventListener('click', (e) => {
      let removable = e.target.parentNode
      removable.remove()
      delete Book.myLibrary[id]
    })
  }


}
// const libraryDiv = document.querySelector('.library');
let hobbit = new Book('The Hobbit', 'J.R.R Tolkien', 295);
let batman = new Book('Batman. The Dark Knight Returns', 'Frank Miller', 213, true);
Book.addBookToLibrary(hobbit)
Book.addBookToLibrary(batman)
Book.addBooksOnPage()
console.log(Book.myLibrary)

const addButton = document.querySelector('.add-book');
const modalWindow = document.querySelector('.modal')
const submitBookButton = document.querySelector('.new-book-submit');
let form = document.querySelector('form');

addButton.addEventListener('click', (e) => {
  modalWindow.style.visibility = 'visible';
})

form.addEventListener('submit', (e) => {
  let newBook = new Book(form[0].value, form[1].value, form[2].value, form[3].checked)
  Book.addBookToLibrary(newBook);
  Book.createBookOnPage(newBook, Book.myLibrary.length - 1);
  e.preventDefault();
  form.reset();
  modalWindow.style.visibility = 'hidden';
})

modalWindow.addEventListener('click', (e) => {
  if (e.target == modalWindow) modalWindow.style.visibility = 'hidden';
})