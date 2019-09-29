const form = document.querySelector("form#addForm");
form.setAttribute("novalidate", true);
form.elements.navn.addEventListener("focus", e => {
    form.elements.navn.classList.remove("notValid");
});
form.elements.navn.addEventListener("blur", e => {
    if (form.elements.navn.checkValidity()) {
        form.elements.navn.classList.remove("notValid");
    } else {
        form.elements.navn.classList.add("notValid");
    }
});

form.elements.listen.addEventListener("focus", e => {
    form.elements.listen.classList.remove("notValid");
});
form.elements.listen.addEventListener("blur", e => {
    if (form.elements.listen.checkValidity()) {
        form.elements.listen.classList.remove("notValid");
    } else {
        form.elements.listen.classList.add("notValid");
    }
});

form.elements.navn.addEventListener("blur", e => {
    if ((form.elements.navn.checkValidity() || form.elements.listen.checkValidity())) { document.querySelector(".submit").classList.remove("hide");
    } else {
        form.elements.navn.classList.add("notValid");
    }
});

form.addEventListener("submit", e => {
  e.preventDefault();

  post();
});

function get() {
  fetch("https://huskeliste-c619.restdb.io/rest/huskeliste", {
    method: "get",
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "x-apikey": "5d90d1ef1ce70f637985513d",
      "cache-control": "no-cache"
    }
  })
    .then(e => e.json())
    .then(things => {
      things.forEach(addNewThing);
    });
}
get();

function addNewThing(thing) {
  const template = document.querySelector("template").content;
  const copy = template.cloneNode(true);
  copy.querySelector("article.listen").dataset.thingid = thing._id;
  copy.querySelector("h1").textContent = thing.name;
  copy.querySelector("h2").textContent = thing.input;
  copy.querySelector(".delete").addEventListener("click", () => {
    deleteIt(thing._id);
  });
  document.querySelector("#app").prepend(copy);
}

function post() {
  const data = {
    name: form.elements.navn.value,
    input: form.elements.listen.value,
  };

  const postData = JSON.stringify(data);
  fetch("https://huskeliste-c619.restdb.io/rest/huskeliste", {
    method: "post",
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "x-apikey": "5d90d1ef1ce70f637985513d",
      "cache-control": "no-cache"
    },
    body: postData
  })
    .then(res => res.json())
    .then(data => {
      addNewThing(data);
    });
}

function deleteIt(id) {
     fetch("https://huskeliste-c619.restdb.io/rest/huskeliste/" + id, {
    method: "delete",
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "x-apikey": "5d90d1ef1ce70f637985513d",
      "cache-control": "no-cache"
    }
  })
    .then(e => e.json())
    .then(data => {
      document.querySelector(`.listen[data-thingid="${id}"]`).remove();
         e.preventDefault();
    });
}

//document.querySelector(".add").addEventListener("click", post);
