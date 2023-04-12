(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
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
},{}]},{},[1]);
