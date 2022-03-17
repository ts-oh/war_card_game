let deckId;
let computerPoints = 0;
let playerPoints = 0;

const cardsContainer = document.querySelector("#cards");
const newDeckBtn = document.querySelector("#new-deck");
const drawCardBtn = document.querySelector("#draw-cards");
const outputArea = document.querySelector("#deckdraw");
const resultOutput = document.querySelector("#result");
const remainOutput = document.querySelector("#remain");
const compScoreOutput = document.querySelector("#computer-score");
const playerScoreOutput = document.querySelector("#player-score");

newDeckBtn.addEventListener("click", drawNewDeck);

function drawNewDeck() {
  fetch("https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1")
    .then((res) => res.json())
    .then((data) => {
      deckId = data.deck_id;
      outputArea.textContent = `Cards remaining: ${data.remaining}`;
      clearOutputs();
      displayScore();
      drawCardBtn.addEventListener("click", drawNewCards);
    });
}

function drawNewCards() {
  fetch(`https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=2`)
    .then((res) => res.json())
    .then((data) => {
      outputArea.textContent = "";
      outputArea.textContent = `Cards remaining: ${data.remaining}`;

      if (data.remaining === 0) {
        drawCardBtn.removeEventListener("click", drawNewCards);
      }

      cardsContainer.childNodes[1].innerHTML = `
                <img src=${data.cards[0].image} class="card" />
            `;
      cardsContainer.childNodes[3].innerHTML = `
            <img src=${data.cards[1].image} class="card" />
            `;
      const roundWinnerOutput = compareCards(
        data.cards[0].value,
        data.cards[1].value
      );
      resultOutput.textContent = roundWinnerOutput;
      remainingCards(data.remaining);
    });
}

function remainingCards(num) {
  const gameWinnerOutput = declareWinner();
  if (num === 0) {
    if (gameWinnerOutput) {
      resultOutput.textContent = gameWinnerOutput;
    }
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
    computerPoints++;
    displayScore();
    return "Computer Wins!";
  } else if (cardValues[card2] > cardValues[card1]) {
    playerPoints++;
    displayScore();
    return "Player Wins!";
  }
}

function displayScore() {
  compScoreOutput.textContent = `Computer score: ${computerPoints}`;
  playerScoreOutput.textContent = `Player score: ${playerPoints}`;
}

function declareWinner() {
  if (computerPoints > playerPoints) {
    return "COMPUTER WINS WAR!";
  } else if (playerPoints > computerPoints) {
    return "PLAYER WINS WAR!";
  } else {
    return "NO WINNER...";
  }
}

function clearOutputs() {
  computerPoints = 0;
  playerPoints = 0;
  remainOutput.textContent = "";
  resultOutput.textContent = "";
  compScoreOutput.textContent = "";
  playerScoreOutput.textContent = "";
}
