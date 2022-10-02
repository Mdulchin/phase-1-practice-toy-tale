let addToy = false;
const toyCollection = document.getElementById('toy-collection')
const toyUrl = "http://localhost:3000/toys"

document.addEventListener('DOMContentLoaded', () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });

fetch(toyUrl)
.then(res => res.json())
.then(data => renderToys(data))

function renderToys(toysArray){
toysArray.forEach(toy => {
const toyCard = document.createElement('card')
const likeButton = document.createElement('button')

likeButton.className = 'like-btn'
likeButton.id = "toy_id"
likeButton.innerText = "Like ❤️"
toyCard.className = 'card'
toyCard.innerHTML = `
  <h2>${toy.name}</h2>
  <img src="${toy.image}" class="toy-avatar" />
  <p>${toy.likes} Likes</p>
`
toyCard.append(likeButton)
toyCollection.append(toyCard)


likeButton.addEventListener('click', (e) => {
    e.preventDefault()
   
    let newNumberOfLikes = parseInt(e.target.previousElementSibling.innerText) + 1
    fetch(`http://localhost:3000/toys/${toy.id}`, {
      method: "PATCH",
      headers: {
          'Content-Type': "application/json",
          Accept: "application/json",
      },
      body: JSON.stringify({
        "likes": newNumberOfLikes
      })
     
    })
    .then(res => res.json())
    .then(data => {e.target.previousElementSibling.innerText = `${newNumberOfLikes} Likes`})
  
    })
  })
}

const newToy = document.createElement('card')
const form = document.querySelector('.add-toy-form')
const newToyName = document.getElementsByClassName('input-text')[0]
const newToyImage = document.getElementsByClassName('input-text')[1]
form.addEventListener('submit', (e) => {
  e.preventDefault()
fetch(toyUrl, {
  method: "POST", 
  headers:
{
  "Content-Type": "application/json",
  Accept: "application/json",
},

body: JSON.stringify({
  "name": newToyName.value,
  "image": newToyImage.value,
  "likes": 0
})
})
toyCollection.append(newToy)
})
})
// btn.addEventListener('click', () => {
//   addlikes()
// })
// function addLikes(){
//   fetch(toyUrl + id, { 
//     method: "PATCH",
//     headers:
//     {
//       "Content-Type": "application/json",
//       Accept: "application/json",
//     },
    
//     body: JSON.stringify({
//       "likes": newNumberOfLikes
//     })
//     .then(res => res.json)
//     .then(data => )

//   })
 

// }
// })