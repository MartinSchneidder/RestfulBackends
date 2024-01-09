const button_getQ = document.getElementById("button_getQ");
const p_quote = document.getElementById("p_quote");
const p_author = document.getElementById("p_author");

function loadQuote() {
  fetch("https://dummy-apis.netlify.app/api/quote")
    .then((Response) => Response.json())
    .then((data) => {
      p_quote.innerText = data.quote;
      p_author.innerText = "- " + data.author;
    });
}

button_getQ.addEventListener("click", () => {
  loadQuote();
});
