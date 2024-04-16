window.onload = () => {
  let inputs = document.getElementsByTagName("input");
  let textareas = document.getElementsByTagName("textarea");
  for (let i = 0; i < inputs.length; i++) {
    inputs[i].addEventListener("change", (event) => {
      if (event.target.id == "desterity") {
        changeDisplacement(parseInt(event.target.value));
        changeInitiative(parseInt(event.target.value));
      }
      saveChange(event.target.id, event.target.value);
    });
  }
  for (let i = 0; i < textareas.length; i++) {
    textareas[i].addEventListener("change", (event) => {
      saveChange(event.target.id, event.target.value);
      changeInitiative(parseInt(event.target.value));
    });
  }

  loadData();
};

async function saveChange(id, newValue) {
  console.log(`ID: ${id} || Value: ${newValue}`);
  let host =
    window.location.protocol +
    "//" +
    window.location.host +
    window.location.pathname;
  let charName = window.location.pathname.split("/")[2];
  let url = host;
  let json = { id: id, value: newValue };
  let alterCheck = await fetch(url, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(json),
  })
    .then(function (res) {
      console.log(res.body);
      return res.json();
    })
    .catch(function (err) {
      console.log(err);
      return null;
    });
  console.log(alterCheck);
}

async function loadData() {
  let host =
    window.location.protocol +
    "//" +
    window.location.host +
    window.location.pathname;
  let url = host + "/json";
  console.log(url);
  let data = await fetch(url, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  })
    .then(function (res) {
      console.log(res.body);
      return res.json();
    })
    .catch(function (err) {
      console.log(err);
      return null;
    });
  for (let i = 0; i < data.character.length; i++) {
    let element = document.getElementById(data.character[i].id);
    element.value = data.character[i].value;
    if (data.character[i].id == "desterity") {
      changeDisplacement(parseInt(data.character[i].value));
      changeInitiative(parseInt(data.character[i].value));
    }
  }
}

function changeDisplacement(desterity) {
  if (desterity >= 1) {
    let displacement = Math.trunc(5 + desterity / 2);
    document.getElementById("deslocamento_value").children[0].innerText =
      displacement;
  } else {
    document.getElementById("deslocamento_value").children[0].innerText = "5";
  }
}

function changeInitiative(desterity) {
  if (desterity >= 1) {
    document.getElementById(
      "iniciativa_value"
    ).children[0].innerText = `1d20 + ${desterity}`;
  } else {
    document.getElementById(
      "iniciativa_value"
    ).children[0].innerText = `1d20 + 0`;
  }
}
