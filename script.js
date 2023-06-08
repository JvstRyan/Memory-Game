const start = document.querySelector('.start')
const gameBoard = document.querySelector('.game-board');
const timerElement = document.getElementById('timer');
const colors = ['red', 'blue', 'green', 'yellow', 'purple', 'orange', 'pink', 'cyan', 'red', 'blue', 'green', 'yellow', 'purple', 'orange', 'pink', 'cyan'];
let timer;
let flippedCards = [];
let matchedPairs = 0;

function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

function createCards() {
    shuffle(colors);
    colors.forEach(color => {
        const card = document.createElement('div');
        card.classList.add('card');
        card.dataset.color = color;
        card.addEventListener('click', flipCard);
        gameBoard.appendChild(card);
    });
}

function flipCard() {
    if (flippedCards.length < 2) {
        this.style.backgroundColor = this.dataset.color;
        this.classList.add('flipped');
        flippedCards.push(this);
        if (flippedCards.length === 2) {
            setTimeout(checkMatch, 1000);
        }
    }
}

function checkMatch() {
    if (flippedCards[0].dataset.color === flippedCards[1].dataset.color) {
        matchedPairs++;
        if (matchedPairs === colors.length / 2) {
            clearInterval(timer);
            alert('You won!');
        }
    } else {
        flippedCards.forEach(card => {
            card.style.backgroundColor = '#ccc';
            card.classList.remove('flipped');
        });
    }
    flippedCards = [];
}

function startTimer() {
    let timeRemaining = 60;
    timerElement.textContent = timeRemaining;
    timer = setInterval(() => {
        timeRemaining--;
        timerElement.textContent = timeRemaining;
        if (timeRemaining <= 0) {
            clearInterval(timer);
            alert('Time is up!');
            location.reload();
        }
    }, 1000);
}
start.addEventListener('click', () => {
  start.classList.add('hidden')
  createCards();
  startTimer();
})


