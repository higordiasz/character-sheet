window.onload = () => {
  loadData("char1");
  loadData("char2");
  loadData("char3");
  loadData("char4");

  let host = window.location.protocol + "//" + window.location.host;
  let url = host + "/events";
  console.log(url);
  const eventSource = new EventSource(url);
  eventSource.onmessage = function (event) {
    const data = JSON.parse(event.data);
    updateData(data.name, data.variables);
  };
};

async function loadData(name) {
  let host =
    window.location.protocol +
    "//" +
    window.location.host +
    window.location.pathname;
  let url = host + `/json?name=${name}`;
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
  console.log(data);
  for (let i = 0; i < data.character.length; i++) {
    let element = document.getElementById(`${name}_${data.character[i].id}`);
    if (element != null) {
      element.value = data.character[i].value;
      if (data.character[i].id == "desterity") {
        changeDisplacement(parseInt(data.character[i].value), name);
        changeInitiative(parseInt(data.character[i].value), name);
      }
    }
  }
}

function updateData(name, variables) {
  if (!Array.isArray(variables)) return;
  for (let i = 0; i < variables.length; i++) {
    let element = document.getElementById(`${name}_${variables[i].id}`);
    if (element != null) {
      element.value = variables[i].value;
      if (variables[i].id == "desterity") {
        changeDisplacement(parseInt(variables[i].value), name);
        changeInitiative(parseInt(variables[i].value), name);
      }
    }
  }
}

function changeDisplacement(desterity, name) {
  if (desterity >= 1) {
    let displacement = Math.trunc(5 + desterity / 2);
    document.getElementById(
      name + "_deslocamento_value"
    ).children[0].innerText = displacement;
  } else {
    document.getElementById(
      name + "_deslocamento_value"
    ).children[0].innerText = "5";
  }
}

function changeInitiative(desterity, name) {
  if (desterity >= 1) {
    document.getElementById(
      name + "_iniciativa_value"
    ).children[0].innerText = `1d20 + ${desterity}`;
  } else {
    document.getElementById(
      name + "_iniciativa_value"
    ).children[0].innerText = `1d20 + 0`;
  }
}
