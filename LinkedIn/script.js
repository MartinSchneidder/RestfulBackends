const cardWindow = document.getElementById("cardWindow");
const p_pending = document.getElementById("p_pending");
const b_reset = document.getElementById("b_reset");

//**============================   MAIN   ============================**//
const state = {
  pending: 0,
};

function render() {
  p_pending.innerText = state.pending;
}

function init() {
  for (let index = 0; index < 8; index++) {
    createCard();
  }
  render();
}
//**============================   EVENTS   ============================**//
b_reset.addEventListener("click", () => {
  state.pending = 0;
  render();
});
//**============================   FUNCTIONS   ============================**//
function createCard() {
  //Elemente
  const new_article = document.createElement("article");
  const new_imageBackground = document.createElement("img");
  const new_imagePicture = document.createElement("img");
  const new_buttonClose = document.createElement("button");
  const new_buttonConnect = document.createElement("button");
  const new_divCenter = document.createElement("div");
  const new_paramName = document.createElement("p");
  const new_paramTitle = document.createElement("p");
  const new_paramConnections = document.createElement("p");

  //Set attributes
  new_article.className += " card";
  new_imageBackground.className += " background";
  new_imagePicture.className += " picture";
  new_imagePicture.alt = "Porträt";
  new_buttonClose.className += " button_close";
  new_buttonClose.addEventListener("click", () => {
    new_article.remove();
    createCard();
  });
  new_buttonConnect.className += " button_connect";
  new_buttonConnect.innerText = "Connect";

  //*****************EKELHAFT wiesoooooooo nochmal?
  new_buttonConnect.addEventListener("click", () => {
    if (new_buttonConnect.innerText === "Connect") {
      state.pending++;
      new_buttonConnect.innerText = "Pending...";
      render();
    } else {
      state.pending--;
      new_buttonConnect.innerText = "Connect";
      render();
    }
  });

  new_divCenter.className += " center";
  new_paramName.className += " name";
  new_paramTitle.className += " title";
  new_paramConnections.className += " mutualConnections";

  //Append
  cardWindow.append(new_article);

  new_article.append(
    new_imageBackground,
    new_imagePicture,
    new_buttonClose,
    new_divCenter
  );

  new_divCenter.append(
    new_paramName,
    new_paramTitle,
    new_paramConnections,
    new_buttonConnect
  );

  fetch("https://dummy-apis.netlify.app/api/contact-suggestions?count=2")
    .then((response) => response.json())
    .then((data) => {
      // console.log(data);
      if (data[0].backgroundImage) {
        new_imageBackground.src =
          "https://source.unsplash.com/random/" + Math.random(); //data[0].backgroundImage; //<- KEIN RANDOM PICTURE
      } else {
        new_imageBackground.src = "/background.jpeg";
        console.log("NO BACKGROUND");
      }
      if (data[0].picture) {
        new_imagePicture.src = data[0].picture;
      } else {
        new_imagePicture.src = "/picture.jpeg";
        console.log("NO PICTURE");
      }
      new_paramName.innerText =
        data[0].name.title + " " + data[0].name.first + " " + data[0].name.last;
      new_paramTitle.innerText = data[0].title;
      new_paramConnections.innerText = data[0].mutualConnections;
    });
}
function fun_click_connect_pending(a) {}

init();

//WHAT TO DO PLAN
//init ->build a card DONE
//  ->build 8 cards   DONE
//load data in cards  DONE

//connect-> pending++
//close -> pending--
//  ->close card
//  ->new card
//restbutton->reset pending
