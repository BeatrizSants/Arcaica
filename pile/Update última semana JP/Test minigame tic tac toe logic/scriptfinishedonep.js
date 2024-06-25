const arrowKeys = ['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'];
let currentCombo = [];
let userCombo = [];
let score = 0;
let timeLeft = 30;
let timerInterval;

const comboElement = document.getElementById('combo');
const timerElement = document.getElementById('timer');
const scoreElement = document.getElementById('score');

// Define audio elements with initial source set to prevent undefined errors
const keyPressSound = createAudioElement('sounds/popsound_note_success.ogg'); // Change 1: Created dynamically with initial source
const comboCompleteSound = createAudioElement('sounds/bellsound_combo_success.wav'); // Change 2: Created dynamically with initial source
const missSound = createAudioElement('sounds/heavybellsound_note_fail.wav'); // Change 3: Created dynamically with initial source
const gameOverSound = createAudioElement('sounds/WhistleSound_game_over.wav'); // Change 4: Created dynamically with initial source

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

// Function to create audio elements dynamically with a specified source
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
        playSound(keyPressSound); // Change 5: Play key press sound
        userCombo.push(event.key);
        displayCombo(currentCombo, userCombo);
        // Check if the latest key pressed is incorrect
        if (!checkLastKeyPress(userCombo)) {
            playSound(missSound); // Change 6: Play miss sound on incorrect key press
            userCombo = []; // Reset user's combo if incorrect key is pressed
            displayCombo(currentCombo);
        }
        // Check if user completed the full combo
        if (userCombo.length === currentCombo.length) {
            if (arraysEqual(userCombo, currentCombo)) {
                score++;
                updateScore();
                playSound(comboCompleteSound); // Change 7: Play combo complete sound
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

// Function to play audio and handle rapid playback
function playSound(audio) {
    audio.pause(); // Pause the audio if it's playing
    audio.currentTime = 0; // Reset audio to start from beginning
    audio.play(); // Play the audio
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
    playSound(gameOverSound); // Change 8: Play game over sound
    gameOverSound.onended = function() {
        alert(`Game over! Your score is ${score}`);
    };
}

// Start the game when the page loads
window.onload = startGame;
