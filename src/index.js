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
            <p>Likes: ${toy.likes}</p>
            <button class="button">LIKE</button>
          `;
          toysDiv.appendChild(card);
          console.log(card);
        });
      });
  }
  showToys();
});
