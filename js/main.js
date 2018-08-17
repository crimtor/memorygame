const cards = document.querySelectorAll('.memory-card');

let card1, card2;
let hasCardBeenFlipped = false;
let delayBoard = false;


function flipCard() {
  if (delayBoard) return;
  if (this === card1) return;

  this.classList.add('flip');

  if (!hasCardBeenFlipped) {
    hasCardBeenFlipped = true;
    card1 = this;
    return;
  }

  card2 = this;
  delayBoard = true;

  checkIfMatch();
}

function checkIfMatch() {
  let isMatch = card1.dataset.name === card2.dataset.name;
  isMatch ? disableCards() : unflipCards();
}

function disableCards() {
  card1.removeEventListener('click', flipCard);
  card2.removeEventListener('click', flipCard);

  resetBoard();
}

function unflipCards() {
  setTimeout(() => {
    card1.classList.remove('flip');
    card2.classList.remove('flip');

    resetBoard();
  }, 750);
}

function resetBoard() {
  hasCardBeenFlipped = false;
  delayBoard = false;
  card1 = null;
  card2 = null;
}

(function shuffle() {
  cards.forEach(card => {
    let ramdomPos = Math.floor(Math.random() * 12);
    card.style.order = ramdomPos;
  });
})();

cards.forEach(card => card.addEventListener('click', flipCard));
