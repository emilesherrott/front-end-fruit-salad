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

async function fetchFruitData(fruit) {
    try {
        const response = await fetch(`https://fruity-api.onrender.com/fruits/${fruit}`)
        if(response.ok){
            const data = await response.json()
            addFruit(data)
        } else {
            throw "Error not a  fruit! Status code = " + response.status
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

    protein += Math.round(fruit['nutritions']['protein'] * 10) / 10
    fruitNutrition.textContent = "The total amount of protien in your fruit salad is: " + protein + "g"
}

function removeFruit(e) {
    e.target.remove()
}