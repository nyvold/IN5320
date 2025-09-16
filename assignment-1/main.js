// step 1
const newCurrencyLi = (currency) => { 
    const list = document.getElementById("currency-list")
    const inputField = document.getElementById("currency")
    
    if (currency.trim() !== "") {
        const li = document.createElement("li")

        li.textContent = currency

        const delButton = newDelButton(() => list.removeChild(li))
        li.appendChild(delButton)

        list.appendChild(li)
        inputField.value = ""
    }
}

document.getElementById("currency-button").addEventListener("click", () => {
        const inputField = document.getElementById("currency")
        newCurrencyLi(inputField.value)
    }
)

document.getElementById("currency").addEventListener("keypress", (event) => {
        if (event.key === "Enter") {
            const inputField = document.getElementById("currency")
            newCurrencyLi(inputField.value)
        }
    }
)

// step 2
const newDelButton = (action) => {
    const delButton = document.createElement("button")
        delButton.textContent = "X"
        delButton.classList.add("delButton")
        delButton.addEventListener("click", action)
        return delButton
}

// step 3
const startsWithPrefix = (element, searchWord) => { // 3A
    return element.textContent.toLowerCase().startsWith(searchWord.toLowerCase())
}

const filterByPrefix = (list, searchWord) => { // 3B
    return list.filter(item => startsWithPrefix(item, searchWord))
}

// step 4
document.getElementById("currency-search").addEventListener("input", (event) => {
        const list = document.getElementById("currency-list")
        const listItems = Array.from(list.getElementsByTagName("li"))
        const searchWord = document.getElementById("currency-search").value
        if (searchWord === "") {
            listItems.forEach(item => (item.style.display = ""))    
        } else {
            match = filterByPrefix(listItems, searchWord)
            listItems.forEach(item => (item.style.display = "none"))
            match.forEach(item => (item.style.display = ""))
        }
    }
)

// step 5
let validCountries = []
window.addEventListener("DOMContentLoaded", async () => { 
    const response = await fetch('https://d6wn6bmjj722w.population.io/1.0/countries/')
    if(!response.ok) {throw new Error(`response unsuccessful with code: ${response.status}`)}
    
    data = await response.json()
    validCountries = data.countries

    console.log(validCountries)
})

const fetchPopulation = async (country) => {
    const response = await fetch(`https://d6wn6bmjj722w.population.io/1.0/population/${country}/today-and-tomorrow/`)
    if(!response.ok) {throw new Error(`response unsuccessful with code: ${response.status}`)}

    data = await response.json()
    population = data.total_population[0].population
    console.log(population)
    return population
    
}

const newCountryLi = async (country) => {
    const list = document.getElementById("country-list")
    const inputField = document.getElementById("country")
    const errorDiv = document.getElementById("country-error")
    
    if (country.trim() !== "" && validCountries.includes(country)) {
        const population = await fetchPopulation(country)
        const li = document.createElement("li")

        li.textContent = `${country} - ${population}`

        const delButton = newDelButton(() => list.removeChild(li))
        li.appendChild(delButton)

        list.appendChild(li)
        inputField.value = ""
        errorDiv.textContent = ""
    } else {
        errorDiv.textContent = `${country} is not a supported country`
        errorDiv.style.visibility = "visible"
        setTimeout(() => {
            errorDiv.style.visibility = "hidden"
        }, 4000)
    }
}

document.getElementById("country-button").addEventListener("click", () => {
        const inputField = document.getElementById("country")
        newCountryLi(inputField.value)
    }
)

document.getElementById("country").addEventListener("keypress", (event) => {
        if (event.key === "Enter") {
            event.preventDefault()
            const inputField = document.getElementById("country")
            newCountryLi(inputField.value)
        }
    }
)

document.getElementById("country-search").addEventListener("input", (event) => {
        const list = document.getElementById("country-list")
        const listItems = Array.from(list.getElementsByTagName("li"))
        const searchWord = document.getElementById("country-search").value
        if (searchWord === "") {
            listItems.forEach(item => (item.style.display = ""))    
        } else {
            match = filterByPrefix(listItems, searchWord)
            listItems.forEach(item => (item.style.display = "none"))
            match.forEach(item => (item.style.display = ""))
        }
        
    }
)
