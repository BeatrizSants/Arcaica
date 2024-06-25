const arrowKeys = ['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'];
let currentPlayerCombo = [];
let currentRobotCombo = [];
let userCombo = [];
let robotCombo = [];
let playerScore = 0;
let robotScore = 0;
let timeLeft = 30;
let timerInterval;

const playerComboElement = document.getElementById('combo');
const playerTimerElement = document.getElementById('timer');
const playerScoreElement = document.getElementById('score');

const robotComboElement = document.getElementById('robot-combo');
const robotTimerElement = document.getElementById('robot-timer');
const robotScoreElement = document.getElementById('robot-score');

const playerSpinner = document.getElementById('player-spinner');
const robotSpinner = document.getElementById('robot-spinner');

const keyPressSound = createAudioElement('sounds/popsound_note_success.ogg');
const comboCompleteSound = createAudioElement('sounds/bellsound_combo_success.wav');
const missSound = createAudioElement('sounds/heavybellsound_note_fail.wav');
const gameOverSound = createAudioElement('sounds/WhistleSound_game_over.wav');

const robotKeyPressSound = createAudioElement('sounds/popsound_note_success.ogg');
const robotComboCompleteSound = createAudioElement('sounds/bellsound_combo_success.wav');
const robotMissSound = createAudioElement('sounds/heavybellsound_note_fail.wav');
const robotGameOverSound = createAudioElement('sounds/WhistleSound_game_over.wav');

let currentPlayerSpeed = 5; // Initial speed in seconds
let currentRobotSpeed = 5; // Initial speed in seconds

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

function createAudioElement(src) {
    const audio = new Audio();
    audio.src = src;
    return audio;
}

function getRandomCombo() {
    const combo = [];
    for (let i = 0; i < 4; i++) {
        const randomIndex = Math.floor(Math.random() * arrowKeys.length);
        combo.push(arrowKeys[randomIndex]);
    }
    return combo;
}

function displayPlayerCombo(combo, userProgress = []) {
    playerComboElement.innerHTML = combo.map((key, index) => {
        const isPressed = userProgress[index] === key;
        const imageUrl = isPressed ? pressedArrowImages[key] : arrowImages[key];
        return `<img src="${imageUrl}" class="arrow" alt="${key}">`;
    }).join(' ');
}

function displayRobotCombo(combo, robotProgress = []) {
    robotComboElement.innerHTML = combo.map((key, index) => {
        const isPressed = robotProgress[index] === key;
        const imageUrl = isPressed ? pressedArrowImages[key] : arrowImages[key];
        return `<img src="${imageUrl}" class="arrow" alt="${key}">`;
    }).join(' ');
}

function startGame() {
    playerScore = 0;
    robotScore = 0;
    timeLeft = 30;
    updatePlayerScore();
    updateRobotScore();
    updateTimer();
    currentPlayerCombo = getRandomCombo();
    currentRobotCombo = getRandomCombo();
    displayPlayerCombo(currentPlayerCombo);
    displayRobotCombo(currentRobotCombo);
    userCombo = [];
    robotCombo = [];
    document.addEventListener('keydown', handleKeyPress);
    timerInterval = setInterval(() => {
        timeLeft--;
        updateTimer();
        if (timeLeft <= 0) {
            endGame();
        }
    }, 1000);

    setTimeout(() => {
        playRobotTurn();
    }, 1000);
}

function handleKeyPress(event) {
    if (arrowKeys.includes(event.key)) {
        playSound(keyPressSound);
        userCombo.push(event.key);
        displayPlayerCombo(currentPlayerCombo, userCombo);
        if (!checkLastKeyPress(userCombo, currentPlayerCombo)) {
            playSound(missSound);
            userCombo = [];
            displayPlayerCombo(currentPlayerCombo);
        }
        if (userCombo.length === currentPlayerCombo.length) {
            if (arraysEqual(userCombo, currentPlayerCombo)) {
                playerScore++;
                updatePlayerScore();
                playSound(comboCompleteSound);
                currentPlayerCombo = getRandomCombo();
                displayPlayerCombo(currentPlayerCombo);
                userCombo = [];
                growSpinner(playerSpinner); // Grow player spinner
                increaseSpinnerSpeed(playerSpinner, --currentPlayerSpeed); // Increase player spinner speed
            } else {
                userCombo = [];
                displayPlayerCombo(currentPlayerCombo);
            }
        }
    }
}

function playRobotTurn() {
    const robotKey = currentRobotCombo[robotCombo.length];
    playSound(robotKeyPressSound);
    robotCombo.push(robotKey);
    displayRobotCombo(currentRobotCombo, robotCombo);
    if (robotCombo.length === currentRobotCombo.length) {
        if (arraysEqual(robotCombo, currentRobotCombo)) {
            robotScore++;
            updateRobotScore();
            playSound(robotComboCompleteSound);
            currentRobotCombo = getRandomCombo();
            displayRobotCombo(currentRobotCombo);
            robotCombo = [];
            growSpinner(robotSpinner); // Grow robot spinner
            increaseSpinnerSpeed(robotSpinner, --currentRobotSpeed); // Increase robot spinner speed
        } else {
            robotCombo = [];
            displayRobotCombo(currentRobotCombo);
        }
    }
    if (timeLeft > 0) {
        setTimeout(() => {
            playRobotTurn();
        }, 1000);
    }
}

function playSound(audio) {
    audio.pause();
    audio.currentTime = 0;
    audio.play();
}

function checkLastKeyPress(userCombo, currentPlayerCombo) {
    const lastIndex = userCombo.length - 1;
    return userCombo[lastIndex] === currentPlayerCombo[lastIndex];
}

function arraysEqual(a, b) {
    return JSON.stringify(a) === JSON.stringify(b);
}

function updatePlayerScore() {
    playerScoreElement.textContent = `Combos: ${playerScore}`;
}

function updateRobotScore() {
    robotScoreElement.textContent = `Robot Combos: ${robotScore}`;
}

function updateTimer() {
    playerTimerElement.textContent = `Time: ${timeLeft}s`;
    robotTimerElement.textContent = `Robot Time: ${timeLeft}s`;
}

function endGame() {
    clearInterval(timerInterval);
    document.removeEventListener('keydown', handleKeyPress);
    playSound(gameOverSound);
    gameOverSound.onended = function() {
        alert(`Game over! Player's score is ${playerScore}. Robot's score is ${robotScore}`);
    };
}

// Function to grow the spinner
function growSpinner(spinner) {
    let currentWidth = parseInt(window.getComputedStyle(spinner).width);
    spinner.style.width = `${currentWidth + 15}px`;
}

// Function to increase spinner speed
function increaseSpinnerSpeed(spinner, speed) {
    spinner.style.animationDuration = `${speed}s`;
}

window.onload = startGame;
