const hexa = document.getElementById("hexa");
const button_randomColor = document.getElementById("button_randomColor");
const showColor = document.getElementById("showColor");
const header = document.getElementById("header");

const red = document.getElementById("red");
const green = document.getElementById("green");
const blue = document.getElementById("blue");

let color = "";

red.oninput = draw;
green.oninput = draw;
blue.oninput = draw;

button_randomColor.addEventListener("click", () => {
  fetch("https://dummy-apis.netlify.app/api/color")
    .then((Response) => Response.json())
    .then((data) => {
      red.value = data.rgb.r;
      green.value = data.rgb.g;
      blue.value = data.rgb.b;
      draw();
    });
});

function draw() {
  color =
    "#" +
    (Number(red.value).toString(16).length < 2
      ? "0" + Number(red.value).toString(16)
      : Number(red.value).toString(16)) +
    (Number(green.value).toString(16).length < 2
      ? "0" + Number(green.value).toString(16)
      : Number(green.value).toString(16)) +
    (Number(blue.value).toString(16).length < 2
      ? "0" + Number(blue.value).toString(16)
      : Number(blue.value).toString(16));
  showColor.style.background = color;
  hexa.innerText = color;
  header.style.background = color + "30";
}

draw();
