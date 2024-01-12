const testp = document.getElementById("testp");

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
