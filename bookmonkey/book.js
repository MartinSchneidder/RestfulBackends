const apiUrl = "http://localhost:4730/";
const button = document.getElementById("button_back");
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

/**
 * creates li-Parent for the Data Array
 * @param {*} Data Array
 * @returns li-Element with appended children from Data-Array
 */
function liAppend(Data) {
  const listEl = document.createElement("li");

  Data.forEach((element) => {
    listEl.append(element);
  });

  return listEl;
}
function renderBook() {
  //====create ELEMENTS
  const div_book = document.querySelector("#book");

  const bookTitle = document.createElement("h1");
  bookTitle.innerText = state.book.title;

  const bookSubtitle = document.createElement("h3");
  bookSubtitle.innerText = state.book.subtitle;

  const bookAuthor = document.createElement("p");
  bookAuthor.innerText = "von '" + state.book.author + "'";

  const bookIsbn = document.createElement("p");
  bookIsbn.classList.add("p_identifier");
  bookIsbn.innerText = "ISBN: ";
  const bookIsbnData = document.createElement("p");
  bookIsbnData.innerText = state.book.isbn;

  const bookAbstract = document.createElement("p");
  bookAbstract.innerText = state.book.abstract;
  //.innerHtml würde manche Formatierung besser darstellen, öffnet aber Sicherheitslücken

  const bookPublisher = document.createElement("p");
  bookPublisher.classList.add("p_identifier");
  bookPublisher.innerText = "Publisher: ";
  const bookPublisherData = document.createElement("p");
  bookPublisherData.innerText = state.book.publisher;

  const bookPrice = document.createElement("p");
  bookPrice.classList.add("p_identifier");
  bookPrice.innerText = "Price: ";
  const bookPriceData = document.createElement("p");
  bookPriceData.innerText = state.book.price;

  const bookNumPages = document.createElement("p");
  bookNumPages.classList.add("p_identifier");
  bookNumPages.innerText = "Pages: ";
  const bookNumPagesData = document.createElement("p");
  bookNumPagesData.innerText = state.book.numPages;

  const bookCover = document.createElement("img");
  bookCover.src = state.book.cover;

  //====append ELEMENTS
  div_book.append(
    liAppend([bookTitle]),
    liAppend([bookSubtitle]),
    liAppend([bookAuthor]),
    liAppend([bookIsbn, bookIsbnData]),
    liAppend([bookAbstract]),
    liAppend([bookPublisher, bookPublisherData]),
    liAppend([bookPrice, bookPriceData]),
    liAppend([bookNumPages, bookNumPagesData]),
    bookCover
    // liAppend([bookCover])
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

button.addEventListener("click", () => {});
