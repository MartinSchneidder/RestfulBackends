const input = document.getElementById("input");
const input_form = document.getElementById("form_input");
const btn_add = document.getElementById("btn_add");
const list = document.getElementById("list");
const btn_rmvdone = document.getElementById("btn_rmvdone");

const radio = document.querySelectorAll("input[type=radio");
const radio_all = document.getElementById("radio_all");
const radio_open = document.getElementById("radio_open");
const radio_done = document.getElementById("radio_done");

//**============================   MAIN   ============================**//
const state = {
  filter: "all", //all, open, done
  toDoArr: [],
};
const url = "http://localhost:4730/todos";

function render() {
  console.log("render this");
  console.log(state.toDoArr);
  list.innerText = ""; // delete old list
  //Set an filtered Array
  const filtered_toDoArr = state.toDoArr.filter((todo) => {
    switch (state.filter) {
      case "open":
        //done_status = false
        return todo.done_status ? false : true;
      case "done":
        //done_status = true
        return todo.done_status ? true : false;

      default: //case "all"
        return todo;
    }
  });

  //Render the filtered ToDoList
  filtered_toDoArr.forEach((obj) => {
    list.append(createNewToDoObject(obj));
  });

  console.log("=======================RENDER===========================");
}
function init() {
  //get DATA from API
  loadToDos(url).then(() => {
    listDefault();
    render();
  });
}

//**============================   EVENTS   ============================**//

//-------  INUPUT FORM SUBMIT NEW TASK  -------//
input_form.addEventListener("submit", (event) => {
  event.preventDefault();
  inputNewToDo();
});

//-------  BUTTON ADD NEW TASK  -------//
btn_add.addEventListener("click", () => {
  inputNewToDo();
});

//-------  BUTTON REMOVE DONE TASKS  -------//
btn_rmvdone.addEventListener("click", () => {
  //SYNC API //Delete all done tasks from api
  console.log(state.toDoArr, "before remove");
  let deleteArr = state.toDoArr.filter((e) => e.done_status == true);
  deleteArr.forEach((element) => {
    deleteRequest(url + "/" + element.id);
  });

  //SYNC STATE //!!!!!!!!!!!!!!!Maybe get data from api back?
  state.toDoArr = state.toDoArr.filter((e) => e.done_status == false);

  radio_all.checked = true; //to see whats left
  state.filter = "all";

  render();
  console.log(state.toDoArr, "after remove");
});

//-------  RADIOBUTTONS FILTER  -------//
radio.forEach((radioBTN) => {
  radioBTN.addEventListener("click", () => {
    switch (radioBTN.id) {
      case "radio_all":
        state.filter = "all";
        render();
        break;
      case "radio_open":
        state.filter = "open";
        render();
        break;
      case "radio_done":
        state.filter = "done";
        render();
        break;

      default:
        state.filter = "all";
        render();
        break;
    }
  });
});

function openNav() {
  document.getElementById("mySidebar").style.width = "250px";
  document.getElementById("mainList").style.marginLeft = "250px";
}

function closeNav() {
  document.getElementById("mySidebar").style.width = "0";
  document.getElementById("mainList").style.marginLeft = "0";
}

//**============================   FUNCTIONS   ============================**//
function listDefault() {
  if (state.toDoArr == null || state.toDoArr.length == 0) {
    state.toDoArr = [{ id: 0, desc: "default", done_status: false }];
  }
}

function createNewToDoObject(toDo) {
  //ListElement
  const new_li = document.createElement("li");
  //Checkbox
  const new_checkbox = document.createElement("input");
  new_checkbox.type = "checkbox";
  new_checkbox.id = toDo.id;
  new_checkbox.checked = toDo.done_status;
  //Label
  const new_label = document.createElement("label");
  new_label.innerText = toDo.desc;
  new_label.htmlFor = new_checkbox.id;
  //Append
  new_li.appendChild(new_checkbox);
  new_li.appendChild(new_label);

  //The Checkbox changes the Done_Status
  new_checkbox.addEventListener("click", () => {
    //checkboxesStatus change
    toDo.done_status = !toDo.done_status;

    //Storage sync
    localStorage.setItem("List", JSON.stringify(state.toDoArr));
    render();
  });

  return new_li;
}

function inputNewToDo() {
  input.value = input.value.trim();

  //WARNING ON NO INPUT
  if (input.value == "") {
    input.value = "";
    return console.warn("NO INPUT");
  }

  //DUBLICATE CHECK
  if (!noDuplicates(state.toDoArr)) {
    console.log("dublicate?");
    return;
  }

  // Change Radiobutton when on Done -> to All on new Input
  if (radio_done.checked == true) {
    radio_all.checked = true;
    state.filter = "all";
  }

  //create new ToDoObj
  let todo = {
    //id: new Date().getTime(), //ID FROM TIME
    desc: input.value,
    done_status: false,
  };

  let request = {
    method: "POST",
    body: JSON.stringify(todo),
    headers: { "Content-Type": "application/json" },
  };

  //SYNC API
  request.body = JSON.stringify(todo);
  postToApi(url, request);

  input.value = "";
  input.focus();

  render();
}

//Check for Dublicates
function noDuplicates(arr) {
  let dublicat = false;
  arr.forEach((ToDo) => {
    if (input.value.toUpperCase() == ToDo.desc.toUpperCase()) {
      console.warn("Dublicat");
      dublicat = true;
    }
  });
  if (dublicat == true) {
    alert("No duplicate tasks allowed!");
    return false;
  }
  return true;
}

//***** LOAD TODOs FROM API *****//
function loadToDos(url) {
  return fetch(url)
    .then((Response) => Response.json())
    .then((data) => {
      state.toDoArr = data;
      console.log("fetched data");
    })
    .catch((error) => {
      console.error("Anfragefehler: ", error.message);
    });
}

//TEMPLATES
// *****USE THE DATA AFTER LOAD
// loadToDos(url).then(() => {
//   console.log("after fetch data do this");
// });
// *****

//***** CREATE TODOs IN THE API (REQUEST) *****//

// //DATA
// let postData = {
//   desc: input.value,
//   done_status: false,
// };
//REQUEST
// let request = {
//   method: "POST",
//   body: JSON.stringify(postData),
//   headers: { "Content-Type": "application/json" },
// };

/*POST-REQUEST*/
function postToApi(url, options) {
  fetch(url, options)
    .then((data) => data.json())
    .then((data) => {
      console.log("SEND: ");
      console.log(data);
      //SYNC STATE
      state.toDoArr.push(data);
      console.log(state.toDoArr);
      render();
    });
}
//TEMPLATE
// *****SEND DATA
// postToApi(url, request);
// *****

/*DELETE-REQUEST */
function deleteRequest(urlID) {
  fetch(urlID, {
    method: "DELETE",
    headers: {
      "Content-type": "application/json",
    },
  });
  console.log(urlID);
}
//TEMPLATE //
//deleteRequest(url + "/" + id);

init();

//TODO
//Default-ToDo is not persistent
//seems RENDER is used too much
