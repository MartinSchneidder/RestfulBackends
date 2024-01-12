const testp = document.getElementById("testp");
const backid = document.getElementById("backid");

function loadData() {
  fetch("https://pokeapi.co/api/v2/pokemon/ditto")
    .then((Response) => Response.json())
    .then((data) => {
      document.body.append(
        document.createTextNode(data.abilities[0].ability.name)
      );
    });
}
loadData();
testp.innerText = "HELLO WORLD";
backid.style.backgroundImage =
  "url(https://img.freepik.com/free-photo/vintage-wood-box_1421-601.jpg?size=626&ext=jpg)";
