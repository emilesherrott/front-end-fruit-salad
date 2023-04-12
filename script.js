const fruitForm = document.querySelector("#inputSection form")
const fruitList = document.querySelector("#fruitSection ul")
const fruitNutrition = document.querySelector("#nutritionSection p")
const imageList = document.querySelector("#imageSection ul")

let protein = 0
const fruitProtein = {}

fruitForm.addEventListener("submit", extractFruit)

function extractFruit(e) {
    e.preventDefault()
    // Async function for data
    fetchFruitData(e.target.fruitInput.value)
    // Async function for images
    fetchImageData(e.target.fruitInput.value)
    e.target.fruitInput.value = ""
}


// ! FRUITYAPI Functionality
async function fetchFruitData(fruit) {
    try {
        const response = await fetch(`https://fruity-api.onrender.com/fruits/${fruit}`)
        if(response.ok){
            const data = await response.json()
            addFruit(data)
        } else {
            throw `Error: no ${fruit} found on FruityAPI. Status code: ${response.status}`
        }
    } catch (e) {
        console.log(e)
    }
}

function addFruit(fruit) {
    console.log(fruit)
    const li = document.createElement("li")
    li.textContent = fruit['name']
    li.addEventListener("click", removeFruit, {once:true})
    fruitList.appendChild(li)

    // Adds a key to fruitProtein object of fruit name with value of the protein level
    fruitProtein[fruit.name] = fruit['nutritions']['protein']

    protein += fruit['nutritions']['protein']
    fruitNutrition.textContent = `The total amount of protien in your fruit salad is: ${protein.toFixed(1)}g`
}

function removeFruit(e) {
    // Stores to name of a fruit to the variable fruitName
    const fruitName = e.target.textContent
    // Update the value of protein based of the fruitProtein object key
    protein -= fruitProtein[fruitName]
    // Updates the value of fruitNutritions textContent
    fruitNutrition.textContent = `The total amount of protien in your fruit salad is: ${protein.toFixed(1)}g`
    // Removes the key from the fruitProtein object
    delete fruitProtein[fruitName]
    // Deletes the node element
    e.target.remove()
}




// ! PIXABAY Functionality
async function fetchImageData(fruit) {
    try {
        const response = await fetch(`https://pixabay.com/api/?q=${fruit}+fruit&key=<YOUR-API-KEY-HERE>`)
        if(response.ok) {
            const data = await response.json()
            addImage(data)
        } else {
            throw `Error: no images of ${fruit} found on PixaBayAPI. Status code: ${response.status}`
        }
    } catch (e) {
        console.log(e)
    }
}

function addImage(fruit) {
    console.log(fruit)
    // Dig into response data to extract imageURL
    const imageURL = fruit['hits'][0]['previewURL']
    const altValue = fruit['hits'][0]['tags']
    const li = document.createElement("li")
    // Removes bullet points
    li.style.listStyleType = 'none'
    const img = document.createElement("img")
    img.src = imageURL
    img.alt = altValue

    li.appendChild(img)
    imageList.appendChild(li)
}