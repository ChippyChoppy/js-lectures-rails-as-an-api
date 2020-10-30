const BASE_URL = "http://localhost:3000/api/v1"

/********** DOM Elements **********/ 
const toggleSwitch = document.querySelector("#toggle-dark-mode")
const animalForm = document.querySelector("#animal-form")
const animalList = document.querySelector("#animal-list")

/********** Event Listeners **********/
toggleSwitch.addEventListener("click", handleToggleDarkMode)
animalForm.addEventListener("submit", handleAnimalFormSubmit)
animalList.addEventListener("click", handleAnimalListClick)

/********** Event Handlers **********/ 
function handleToggleDarkMode() {
  document.body.classList.toggle("dark-mode")
}

// Create Animal
function handleAnimalFormSubmit(event) {
  // Step 0: always prevent default for form submit events
  event.preventDefault()

  // Step 1: get user input from the form input fields
  const animalObj = {
    name: event.target.name.value,
    imageUrl: event.target.image_url.value,
    description: event.target.description.value,
    donations: 0
  }

  // Do (POST /animals) Fetch Request...
  fetch(`${BASE_URL}/animals`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(animalObj),
  })
    .then(response => response.json())
    .then(newAnimalObj => {
      // And Slap Z On (or Off) the DOM

      // Step 2: slap it on the DOM
      renderOneAnimal(newAnimalObj)
      console.log('Success:', newAnimalObj);
    })


  // (optional) Step 3: clear the input fields
  event.target.reset()
}

function handleAnimalListClick(event) {
  if (event.target.matches(".delete-button")) {
    
    // Delete Animal
    const button = event.target
    
    // traverse the DOM to find elements we care about, relative to the button
    const card = button.closest(".card")

    const id = card.dataset.id

    // DELETE /animals/5
    fetch(`${BASE_URL}/animals/${id}`, {
    method: 'DELETE',
  })
    .then(response => response.json())
    .then(data => {
      console.log('Success:', data);
    })

    // remove the animal card
    card.remove()

  } else if (event.target.dataset.action === "donate") {
    // Update Animal
    const button = event.target
    
    // traverse the DOM to find elements we care about, relative to the button
    const card = button.closest(".card")
    const id = card.dataset.id
    const donationCountSpan = card.querySelector(".donation-count")
    
    // get the donation amount from the DOM
    const donationCount = parseInt(donationCountSpan.textContent) + 10

    // optimistic rendering!
    // donationCountSpan.textContent = donationCount + 10

    fetch(`${BASE_URL}/animals/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ 
        donations: donationCount
      }),
    })
      .then(response => response.json())
      .then(updatedAnimal => {
        // update the DOM
        // pessimistic rendering!
        donationCountSpan.textContent = updatedAnimal.donations
      })
  }
}

/********** Render Functions **********/ 
// takes one animal object and creates the necessary DOM elements
function renderOneAnimal(animalObj) {
  // step 1. create the outer element using createElement (& assign necessary attributes)
  const card = document.createElement("li")
  card.className = "card"
  card.dataset.id = animalObj.id

  // step 2. use innerHTML to create all of its children
  card.innerHTML = `
  <div class="image">
    <img src="${animalObj.imageUrl}" alt="${animalObj.name}">
    <button class="button delete-button" data-action="delete">X</button>
  </div>
  <div class="content">
    <h4>${animalObj.name}</h4>
    <div class="donations">
      $<span class="donation-count">${animalObj.donations}</span> Donated
    </div>
    <p class="description">${animalObj.description}</p>
  </div>
  <button class="button donate-button" data-action="donate">
    Donate $10
  </button>
  `

  // step 3. slap it on the DOM!
  animalList.append(card)
}

function renderAllAnimals(animalData) {
  // .forEach takes a callback function (function definition/reference); renderOneAnimal is a function reference
  animalData.forEach(renderOneAnimal)
}

/********** Initial Render **********/
function initialize() {
  fetch(`${BASE_URL}/animals`)
    .then(response => response.json())
    .then(animalArray => {
      renderAllAnimals(animalArray)
    })
}


initialize()

