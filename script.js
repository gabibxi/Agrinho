const words = [
    "RECICLAR", "ENERGIA", "SOLAR", "REUSO", "COMPOSTAGEM",
    "ECOSSISTEMA", "BIODIVERSIDADE", "PRESERVAR", "DESENVOLVIMENTO",
    "SUSTENTAVEL", "POLUICAO", "AQUECIMENTO", "CLIMA", "CONSCIENTIZAR",
    "FLORESTA", "AGUA", "REDUZIR", "PEGADA", "CARBONO", "NATURAL",
    "ORGÂNICO", "RENOVAVEL"
];

let selectedWord = '';
let guessedWord = [];
let remainingGuesses = 6;
let usedLetters = [];
let gameEnded = false;

const wordDisplay = document.getElementById('word-display');
const remainingGuessesSpan = document.getElementById('remaining-guesses');
const usedLettersSpan = document.getElementById('used-letters');
const keyboardDiv = document.getElementById('keyboard');
const messageDiv = document.getElementById('message');
const restartButton = document.getElementById('restart-button');

function initializeGame() {
    selectedWord = words[Math.floor(Math.random() * words.length)];
    guessedWord = Array(selectedWord.length).fill('_');
    remainingGuesses = 6;
    usedLetters = [];
    gameEnded = false;
    messageDiv.textContent = '';
    restartButton.style.display = 'none';

    updateDisplay();
    createKeyboard();
}

function updateDisplay() {
    wordDisplay.textContent = guessedWord.join(' ');
    remainingGuessesSpan.textContent = remainingGuesses;
    usedLettersSpan.textContent = usedLetters.join(', ');
}

function createKeyboard() {
    keyboardDiv.innerHTML = '';
    for (let i = 65; i <= 90; i++) {
        const letter = String.fromCharCode(i);
        const button = document.createElement('button');
        button.textContent = letter;
        button.classList.add('key');
        button.addEventListener('click', () => handleGuess(letter));
        keyboardDiv.appendChild(button);
    }
}

function handleGuess(letter) {
    if (gameEnded || usedLetters.includes(letter)) {
        return;
    }

    usedLetters.push(letter);
    let found = false;

    for (let i = 0; i < selectedWord.length; i++) {
        if (selectedWord[i] === letter) {
            guessedWord[i] = letter;
            found = true;
        }
    }

    if (!found) {
        remainingGuesses--;
    }

    updateDisplay();
    checkGameStatus();
    disableKey(letter);
}

function disableKey(letter) {
    const keys = document.querySelectorAll('.key');
    keys.forEach(key => {
        if (key.textContent === letter) {
            key.classList.add('disabled');
            key.disabled = true;
        }
    });
}

function checkGameStatus() {
    if (guessedWord.join('') === selectedWord) {
        messageDiv.textContent = `Parabéns! Você acertou a palavra: ${selectedWord}!`;
        messageDiv.style.color = '#28a745';
        endGame(true);
    } else if (remainingGuesses === 0) {
        messageDiv.textContent = `Que pena! Você perdeu. A palavra era: ${selectedWord}.`;
        messageDiv.style.color = '#d9534f';
        endGame(false);
    }
}

function endGame(win) {
    gameEnded = true;
    const keys = document.querySelectorAll('.key');
    keys.forEach(key => {
        key.disabled = true;
        key.classList.add('disabled');
    });
    restartButton.style.display = 'block';
}

restartButton.addEventListener('click', initializeGame);

initializeGame();