let deckId;
const cardsContainer = document.querySelector("#cards");
const newDeckBtn = document.querySelector("#new-deck");
const drawCardBtn = document.querySelector("#draw-cards");
const outputArea = document.querySelector("#deckdraw");
const resultOutput = document.querySelector("#result");
const remainOutput = document.querySelector("#remain");

newDeckBtn.addEventListener("click", drawNewDeck);
//drawCardBtn.addEventListener("click", drawNewCards);

function drawNewDeck() {
  fetch("https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1")
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      deckId = data.deck_id;
      outputArea.textContent = `Cards remaining: ${data.remaining}`;
      remainOutput.textContent = "";
      resultOutput.textContent = "";
      drawCardBtn.addEventListener("click", drawNewCards);
    });
}

function drawNewCards() {
  fetch(`https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=2`)
    .then((res) => res.json())
    .then((data) => {
      outputArea.textContent = "";
      console.log(data.cards[0], data.cards[1]);
      outputArea.textContent = `Cards remaining: ${data.remaining}`;
      // remainingCards(data.remaining);
      if (data.remaining === 0) {
        drawCardBtn.removeEventListener("click", drawNewCards);
      }
      cardsContainer.childNodes[1].innerHTML = `
                <img src=${data.cards[0].image} class="card" />
            `;
      cardsContainer.childNodes[3].innerHTML = `
            <img src=${data.cards[1].image} class="card" />
            `;
      const winnerOutput = compareCards(
        data.cards[0].value,
        data.cards[1].value
      );
      resultOutput.textContent = winnerOutput;
    });
}

function remainingCards(num) {
  if (num === 0) {
    drawCardBtn.removeEventListener("click", drawNewCards);
  }
}

const cardValues = {
  2: 2,
  3: 3,
  4: 4,
  5: 5,
  6: 6,
  7: 7,
  8: 8,
  9: 9,
  10: 10,
  JACK: 11,
  QUEEN: 12,
  KING: 13,
  ACE: 14,
};

function compareCards(card1, card2) {
  if (cardValues[card1] === cardValues[card2]) {
    return "WAR!";
  } else if (cardValues[card1] > cardValues[card2]) {
    return "Computer Wins!";
  } else if (cardValues[card2] > cardValues[card1]) {
    return "Player Wins!";
  }
}
