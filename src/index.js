let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });

  //Function to show toys
  function showToys() {
    const toysDiv = document.querySelector("#toy-collection");
    fetch("http://localhost:3000/toys")
      .then((res) => res.json())
      .then((toys) => {
        toys.forEach((toy) => {
          const card = document.createElement("div");
          card.classList.add("card");
          card.innerHTML = `
            <h2>${toy.name}</h2>
            <img src="${toy.image}" class="toy-avatar"/>
            <p>Likes: ${toy.likes ? toy.likes : 0}</p>
            <button class="button">LIKE</button>
    
          `;
          toysDiv.appendChild(card);
          const likeBtn = card.querySelector(".button");
          likeBtn.addEventListener("click", () => {
            console.log(toy.likes);
            console.log(toy);
            toy.likes++;
            addLikes(toy);
            console.log(toy.likes);
          });
        });
      });
  }

  //Function to add new toy
  function addNewToy() {
    const form = document.querySelector(".add-toy-form");
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const formData = new FormData(form);
      const data = Object.fromEntries(formData);
      console.log(formData);
      fetch("http://localhost:3000/toys", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(data),
      });
    });
  }

  //Function to add likes
  function addLikes(toy) {
    fetch(`http://localhost:3000/toys/${toy.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ likes: toy.likes }),
    });
  }

  showToys();
  addNewToy();
});
