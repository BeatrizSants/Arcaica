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

// Audio elements for player
const keyPressSound = createAudioElement('sounds/popsound_note_success.ogg');
const comboCompleteSound = createAudioElement('sounds/bellsound_combo_success.wav');
const missSound = createAudioElement('sounds/heavybellsound_note_fail.wav');
const gameOverSound = createAudioElement('sounds/WhistleSound_game_over.wav');

// Audio elements for robot opponent
const robotKeyPressSound = createAudioElement('sounds/popsound_note_success.ogg');
const robotComboCompleteSound = createAudioElement('sounds/bellsound_combo_success.wav');
const robotMissSound = createAudioElement('sounds/heavybellsound_note_fail.wav');
const robotGameOverSound = createAudioElement('sounds/WhistleSound_game_over.wav');

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

    // Start robot's turn with 1 second delay
    setTimeout(() => {
        playRobotTurn();
    }, 1000);
}

function handleKeyPress(event) {
    if (arrowKeys.includes(event.key)) {
        keyPressSound.play();
        userCombo.push(event.key);
        displayPlayerCombo(currentPlayerCombo, userCombo);
        // Check if the latest key pressed is incorrect
        if (!checkLastKeyPress(userCombo, currentPlayerCombo)) {
            missSound.play();
            userCombo = []; // Reset user's combo if incorrect key is pressed
            displayPlayerCombo(currentPlayerCombo);
        }
        // Check if user completed the full combo
        if (userCombo.length === currentPlayerCombo.length) {
            if (arraysEqual(userCombo, currentPlayerCombo)) {
                playerScore++;
                updatePlayerScore();
                comboCompleteSound.play();
                currentPlayerCombo = getRandomCombo();
                displayPlayerCombo(currentPlayerCombo);
                userCombo = [];
            } else {
                userCombo = []; // Reset user's combo if incorrect full combo
                displayPlayerCombo(currentPlayerCombo);
            }
        }
    }
}

function playRobotTurn() {
    const robotKey = currentRobotCombo[robotCombo.length];
    robotKeyPressSound.play();
    robotCombo.push(robotKey);
    displayRobotCombo(currentRobotCombo, robotCombo); // Update robot's display with pressed keys
    // Check if robot completed the full combo
    if (robotCombo.length === currentRobotCombo.length) {
        if (arraysEqual(robotCombo, currentRobotCombo)) {
            robotScore++;
            updateRobotScore();
            robotComboCompleteSound.play();
            currentRobotCombo = getRandomCombo();
            displayRobotCombo(currentRobotCombo);
            robotCombo = [];
        } else {
            robotCombo = []; // Reset robot's combo if incorrect full combo
            displayRobotCombo(currentRobotCombo);
        }
    }
    // Continue robot's turn until timer is over
    if (timeLeft > 0) {
        setTimeout(() => {
            playRobotTurn();
        }, 1000); // 1 second delay between each key press by the robot
    }
}

function checkLastKeyPress(userCombo, currentPlayerCombo) {
    const lastIndex = userCombo.length - 1;
    return userCombo[lastIndex] === currentPlayerCombo[lastIndex];
}

function arraysEqual(a, b) {
    return JSON.stringify(a) === JSON.stringify(b);
}

function updatePlayerScore() {
    playerScoreElement.textContent = `Score: ${playerScore}`;
}

function updateRobotScore() {
    robotScoreElement.textContent = `Robot Score: ${robotScore}`;
}

function updateTimer() {
    playerTimerElement.textContent = `Time: ${timeLeft}s`;
    robotTimerElement.textContent = `Robot Time: ${timeLeft}s`;
}

function endGame() {
    clearInterval(timerInterval);
    document.removeEventListener('keydown', handleKeyPress);
    gameOverSound.play();
    // Reset robot's combo display to unpressed state visually
    displayRobotCombo(currentRobotCombo);
    gameOverSound.onended = function() {
        alert(`Game over! Player's score is ${playerScore}. Robot's score is ${robotScore}`);
    };
}

// Start the game when the page loads
window.onload = startGame;
