const newLi = (input) => { // 1
    const list = document.getElementById("currency-list")
    const inputField = document.getElementById("currency")
    
    if (input.trim() !== "") {
        const li = document.createElement("li")

        li.textContent = input

        const delButton = newDelButton(() => list.removeChild(li))
        li.appendChild(delButton)

        list.appendChild(li)
        inputField.value = ""
    }
}

const newDelButton = (action) => { // 2
    const delButton = document.createElement("button")
        delButton.textContent = "X"
        delButton.classList.add("delButton")
        delButton.addEventListener("click", action)
        return delButton
}

const startsWithPrefix = (element, searchWord) => { // 3A
    return element.textContent.toLowerCase().startsWith(searchWord.toLowerCase())
}

const checkPrefix = (list, searchWord) => { // 3B
    return list.filter(item => startsWithPrefix(item, searchWord))
}

document.getElementById("button").addEventListener("click", () => {
        const inputField = document.getElementById("currency")
        newLi(inputField.value)
    }
)

document.getElementById("currency").addEventListener("keypress", (event) => {
        if (event.key === "Enter") {
            event.preventDefault()
            const inputField = document.getElementById("currency")
            newLi(inputField.value)
        }
    }
)

document.getElementById("search").addEventListener("input", (event) => {
        const list = document.getElementById("currency-list")
        const listItems = Array.from(list.getElementsByTagName("li"))
        const searchWord = document.getElementById("search").value
        if (searchWord === "") {
            listItems.forEach(item => (item.style.display = ""))    
        } else {
            match = checkPrefix(listItems, searchWord)
            listItems.forEach(item => (item.style.display = "none"))
            match.forEach(item => (item.style.display = ""))
        }
        
    }
)