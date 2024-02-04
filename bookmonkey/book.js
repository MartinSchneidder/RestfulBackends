const apiUrl = "http://localhost:4730/";
const state = {
  isbn: 0,
  book: {},
};
init();

//=============================================//
function init() {
  const querystring = new Url_to_queryString(location.search);
  state.isbn = querystring.isbn;

  getBookData();
}
function render() {
  renderBook();
}
//==================

/**
 *  USAGE: var x = new Url_to_queryString(location.search)
 *  THEN x.'attribute from url'
 * @param {*} querystring >location.serach
 * @returns
 */
function Url_to_queryString(querystring) {
  if (querystring == "") {
    return;
  }
  const wertestring = querystring.slice(1);
  const paare = wertestring.split("&");
  let paar, name, wert;
  paare.forEach((element) => {
    paar = element.split("=");
    // paar = [isbn,1234]
    name = paar[0];
    wert = paar[1];
    // name = name.replace("+", " ");
    // wert = wert.replace("+", " ");

    this[name] = wert;
  });
}

//creates li-Parent for the input
function liAppend(input) {
  const listEl = document.createElement("li");
  listEl.append(input);
  return listEl;
}
function renderBook() {
  //====create ELEMENTS
  const div_book = document.querySelector("#book");

  const bookTitle = document.createElement("h1");
  bookTitle.innerText = state.book.title;

  const bookSubtitle = document.createElement("p");
  bookSubtitle.innerText = state.book.subtitle;

  const bookAuthor = document.createElement("p");
  bookAuthor.innerText = "von '" + state.book.author + "'";

  const bookIsbn = document.createElement("p");
  bookIsbn.innerText = "ISBN: " + state.book.isbn;

  const bookAbstract = document.createElement("p");
  bookAbstract.innerText = state.book.abstract;

  const bookPublisher = document.createElement("p");
  bookPublisher.innerText = "Publisher: " + state.book.publisher;

  const bookPrice = document.createElement("p");
  bookPrice.innerText = "Price: " + state.book.price;

  const bookNumPages = document.createElement("p");
  bookNumPages.innerText = "Pages: " + state.book.numPages;

  const bookCover = document.createElement("img");
  bookCover.src = state.book.cover;

  //====append ELEMENTS
  div_book.append(
    liAppend(bookTitle),
    liAppend(bookSubtitle),
    liAppend(bookAuthor),
    liAppend(bookIsbn),
    liAppend(bookAbstract),
    liAppend(bookPublisher),
    liAppend(bookPrice),
    liAppend(bookNumPages),
    liAppend(bookCover)
  );
}

// get bookdata from api with given isbn
function getBookData() {
  fetch(apiUrl + "books/" + state.isbn)
    .then(function (response) {
      if (response.status === 200) {
        return response.json();
      } else {
        return "Nix";
      }
    })
    .then((bookFromApi) => {
      state.book = bookFromApi;
      render();
    })
    .catch(function (error) {
      console.error(error);
    });
}
