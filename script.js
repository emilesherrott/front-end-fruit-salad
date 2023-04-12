const fruitForm = document.querySelector("#inputSection form")
const fruitList = document.querySelector("#fruitSection ul")
const fruitNutrition = document.querySelector("#nutritionSection p")

let protein = 0

fruitForm.addEventListener("submit", extractFruit)

function extractFruit(e) {
    e.preventDefault()
    fetchFruitData(e.target.fruitInput.value)
    e.target.fruitInput.value = ""
}

function fetchFruitData(fruit) {
    fetch(`https://fruity-api.onrender.com/fruits/${fruit}`)
        .then(processResponse)
        .then(data => addFruit(data))
        .catch(e => console.log(e))
}

function processResponse(resp){
    if(resp.ok){
        return resp.json()
    } else {
        throw "Item not found in the fruit API"
    }
}

function addFruit(fruit) {
    console.log(fruit)
    const li = document.createElement("li")
    li.textContent = fruit['name']
    li.addEventListener("click", removeFruit, {once:true})
    fruitList.appendChild(li)

    protein += Math.round(fruit['nutritions']['protein'] * 10) / 10
    // rounded = Math.round(number * 10) / 10
    fruitNutrition.textContent = "The total amount of protien in your fruit salad is: " + protein
}

function removeFruit(e) {
    e.target.remove()
}