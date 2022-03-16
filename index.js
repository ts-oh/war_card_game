let deckId
const cardsContainer = document.querySelector("#cards")
const newDeckBtn = document.querySelector("#new-deck")
const drawCardBtn = document.querySelector("#draw-cards")
const outputArea = document.querySelector("#output-msg")

function clearOutput () {
    outputArea.textContent = ""
    outputArea.style.display = 'none'
}

newDeckBtn.addEventListener("click", () => {
    fetch("https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1")
    .then(res => res.json())
    .then(data => {
        console.log(data)
        deckId = data.deck_id
        outputArea.style.display = 'flex'
        outputArea.textContent = "New Deck Created!"
        setTimeout(clearOutput, 2500)
    })
})

drawCardBtn.addEventListener("click", () => {
    fetch(`https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=2`)
        .then(res => res.json())
        .then(data => {
            console.log(data.cards)
            cardsContainer.childNodes[1].innerHTML = `
                <img src=${data.cards[0].image} class="card" />
            `
            cardsContainer.childNodes[3].innerHTML = `
            <img src=${data.cards[1].image} class="card" />
            `
            console.log(cardsContainer)
        })
})
