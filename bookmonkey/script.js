const apiUrl = "http://localhost:4730/";
const books =
  (await getBooksData()) || JSON.parse(localStorage.getItem("books")) || [];

console.log(books);
renderBooks();
console.log(location.href);
console.log("search= " + location.search);
//SCORLL LINK VBBLABLA
if (location.hash) {
  console.log(location.hash);
  console.log(document.querySelector(location.hash));
  const target = document.querySelector(location.hash);
  target.scrollIntoView();
}
// if (location.search.includes("?where=")) {
//   console.log("href= " + location.href);
//   location.href = location.search.replace("?where=", "#");
//   // location.replace("?where=", "#");

//   console.log("href= " + location.href);
// }

async function getBooksData() {
  try {
    const response = await fetch(apiUrl + "books");
    const booksFromApi = await response.json();

    localStorage.setItem("books", JSON.stringify(booksFromApi));

    return booksFromApi;
  } catch (error) {
    console.log(error);
  }
}
//Alternative to async function
// function getBooksData() {
//   fetch(apiUrl + "books")
//     .then(function (response) {
//       if (response.status === 200) {
//         return response.json();
//       } else {
//         return "Nix";
//       }
//     })
//     .then((booksFromApi) => {
//       books.push(...booksFromApi);
//     })
//     .catch(function (error) {
//       console.error(error);
//     });
// }

function renderBooks() {
  const booksList = document.querySelector("#books-list");

  for (const book of books) {
    const listEl = document.createElement("li");
    listEl.id = "link" + book.isbn;

    const bookTitle = document.createElement("h3");
    bookTitle.innerText = book.title;

    const bookAuthor = document.createElement("p");
    bookAuthor.innerText = book.author;

    const bookLink = document.createElement("a");
    bookLink.innerText = "More";
    bookLink.href = `/book.html?isbn=${book.isbn}`;

    listEl.append(bookTitle, bookAuthor, bookLink);
    booksList.append(listEl);
  }
}
