const arrowKeys = ['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'];
let currentCombo = [];
let userCombo = [];
let score = 0;
let timeLeft = 30;
let timerInterval;

const comboElement = document.getElementById('combo');
const timerElement = document.getElementById('timer');
const scoreElement = document.getElementById('score');
const keyPressSound = document.getElementById('keyPressSound');
const comboCompleteSound = document.getElementById('comboCompleteSound');
const missSound = document.getElementById('missSound');
const gameOverSound = document.getElementById('gameOverSound');

const arrowImages = {
    'ArrowUp': 'Img all/Uparrow_baseform.png',
    'ArrowDown': 'Img all/Downarrow_baseform.png',
    'ArrowLeft': 'Img all/Leftarrow_baseform.png',
    'ArrowRight': 'Img all/Rightarrow_baseform.png'
};
const pressedArrowImages = {
    'ArrowUp': 'Img all/Uparrow_pressedform.png',
    'ArrowDown': 'Img all/Downarrow_pressedform.png',
    'ArrowLeft': 'Img all/Leftarrow_pressedform.png',
    'ArrowRight': 'Img all/Rightarrow_pressedform.png'
};

function getRandomCombo() {
    const combo = [];
    for (let i = 0; i < 4; i++) {
        const randomIndex = Math.floor(Math.random() * arrowKeys.length);
        combo.push(arrowKeys[randomIndex]);
    }
    return combo;
}

function displayCombo(combo, userProgress = []) {
    comboElement.innerHTML = combo.map((key, index) => {
        const isPressed = userProgress[index] === key;
        const imageUrl = isPressed ? pressedArrowImages[key] : arrowImages[key];
        return `<img src="${imageUrl}" class="arrow" alt="${key}">`;
    }).join(' ');
}

function startGame() {
    score = 0;
    timeLeft = 30;
    updateScore();
    updateTimer();
    currentCombo = getRandomCombo();
    displayCombo(currentCombo);
    userCombo = [];
    document.addEventListener('keydown', handleKeyPress);
    timerInterval = setInterval(() => {
        timeLeft--;
        updateTimer();
        if (timeLeft <= 0) {
            endGame();
        }
    }, 1000);
}

function handleKeyPress(event) {
    if (arrowKeys.includes(event.key)) {
        keyPressSound.play();
        userCombo.push(event.key);
        displayCombo(currentCombo, userCombo);
        // Check if the latest key pressed is incorrect
        if (!checkLastKeyPress(userCombo)) {
            missSound.play();
            userCombo = []; // Reset user's combo if incorrect key is pressed
            displayCombo(currentCombo);
        }
        // Check if user completed the full combo
        if (userCombo.length === currentCombo.length) {
            if (arraysEqual(userCombo, currentCombo)) {
                score++;
                updateScore();
                comboCompleteSound.play();
                currentCombo = getRandomCombo();
                displayCombo(currentCombo);
                userCombo = [];
            } else {
                userCombo = []; // Reset user's combo if incorrect full combo
                displayCombo(currentCombo);
            }
        }
    }
}

function checkLastKeyPress(userCombo) {
    const lastIndex = userCombo.length - 1;
    return userCombo[lastIndex] === currentCombo[lastIndex];
}

function arraysEqual(a, b) {
    return JSON.stringify(a) === JSON.stringify(b);
}

function updateScore() {
    scoreElement.textContent = `Score: ${score}`;
}

function updateTimer() {
    timerElement.textContent = `Time: ${timeLeft}s`;
}

function endGame() {
    clearInterval(timerInterval);
    document.removeEventListener('keydown', handleKeyPress);
    gameOverSound.play();
    gameOverSound.onended = function() {
    alert(`Game over! Your score is ${score}`);
};
}

// Start the game when the page loads
window.onload = startGame;
