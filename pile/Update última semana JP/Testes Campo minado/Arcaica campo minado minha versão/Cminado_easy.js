const board = document.getElementById("board");
const resetButton = document.getElementById("reset-button");
const difficultyLevel = document.getElementById("difficulty-level");
const timerDisplay = document.getElementById("timer");
const flagCountDisplay = document.getElementById("flag-count");

let size, minesCount;
let mines = new Set();
let flagsPlaced = 0;
let flagsLeft = 0; 
let timer = 0;
let timerInterval;
let firstClick = false;
let revealedCount = 0;

const levels = {
    easy: { size: 8, minesCount: 10 },
    medium: { size: 12, minesCount: 20 },
    hard: { size: 16, minesCount: 40 }
};

const clickSound = new Audio('Sounds Cminado/popsound_clickbomb_safe.ogg');
const flagSound = new Audio('Sounds Cminado/Flagsound_sticked_in.wav');
const removeFlagSound = new Audio('Sounds Cminado/Flagsound_sticked_out.wav');
const bombSound = new Audio('Sounds Cminado/Explosionsound_dr.mp3');
const noFlagsSound = new Audio('Sounds Cminado/Noflag_beep.ogg'); 

function createBoard() {
    const level = levels[difficultyLevel.value];
    size = level.size;
    minesCount = level.minesCount;
    flagsLeft = minesCount; 
    flagsPlaced = 0;

    board.innerHTML = "";
    mines.clear();
    firstClick = false;
    revealedCount = 0;

    while (mines.size < minesCount) {
        const randomPosition = Math.floor(Math.random() * (size * size));
        mines.add(randomPosition);
    }

    for (let i = 0; i < size * size; i++) {
        const cell = document.createElement("div");
        cell.className = "cell";
        cell.addEventListener("click", revealCell);
        cell.addEventListener("contextmenu", markCell);
        board.appendChild(cell);
    }

    board.style.gridTemplateColumns = `repeat(${size}, 1fr)`;
    board.style.gridTemplateRows = `repeat(${size}, 1fr)`;

    updateFlagCountDisplay();
}

function playSound(sound) {
    sound.currentTime = 0;
    sound.play();
}

function revealCell(event) {
    if (!firstClick) {
        startTimer();
        firstClick = true;
    }

    const cell = event.target;
    const index = Array.from(board.children).indexOf(cell);

    if (cell.classList.contains("revealed")) {
        return;
    }

    if (mines.has(index)) {
        playSound(bombSound);
        cell.textContent = "💣";
        cell.classList.add("bomb");
        stopTimer();

        setTimeout(() => {
            alert("Game Over! Você encontrou uma bomba.");
            window.location.href = "pagina_derrota.html"; // Redireciona para a página de derrota
        }, 500);
        return;
    }

    const adjacentIndices = getAdjacentIndices(index);
    const adjacentMinesCount = adjacentIndices.filter(i => mines.has(i)).length;

    playSound(clickSound);
    cell.textContent = adjacentMinesCount;
    cell.classList.add("revealed");
    revealedCount++;

    if (adjacentMinesCount === 0) {
        adjacentIndices.forEach(i => {
            if (!board.children[i].classList.contains("revealed")) {
                revealCell({ target: board.children[i] });
            }
        });
    }

    checkWinCondition();
}

function markCell(event) {
    event.preventDefault();
    const cell = event.target;

    if (cell.classList.contains("revealed")) {
        return;
    }

    if (flagsLeft <= 0 && cell.textContent !== "🚩") {
        playSound(noFlagsSound); 
        return; 
    }

    if (cell.textContent === "🚩") {
        playSound(removeFlagSound);
        cell.textContent = "";
        flagsPlaced--;
        flagsLeft++;
    } else {
        playSound(flagSound);
        cell.textContent = "🚩";
        flagsPlaced++;
        flagsLeft--;
    }

    updateFlagCountDisplay();
    checkWinCondition();
}

function getAdjacentIndices(index) {
    const row = Math.floor(index / size);
    const col = index % size;
    const adjacent = [];

    for (let i = -1; i <= 1; i++) {
        for (let j = -1; j <= 1; j++) {
            if (i === 0 && j === 0) continue;
            const r = row + i;
            const c = col + j;
            if (r >= 0 && r < size && c >= 0 && c < size) {
                adjacent.push(r * size + c);
            }
        }
    }

    return adjacent;
}

function checkWinCondition() {
    if (revealedCount === size * size - minesCount) {
        stopTimer();

        setTimeout(() => {
            alert("Parabéns! Você venceu o jogo.");
            window.location.href = "pagina_vitoria.html"; // Redireciona para a página de vitória
        }, 500);
    }
}

function resetGame() {
    clearInterval(timerInterval);
    timer = 0;
    timerDisplay.textContent = "Tempo: 0s";
    createBoard();
}

function startTimer() {
    timerInterval = setInterval(() => {
        timer++;
        timerDisplay.textContent = `Tempo: ${timer}s`;
    }, 1000);
}

function stopTimer() {
    clearInterval(timerInterval);
}

function updateFlagCountDisplay() {
    flagCountDisplay.textContent = `Bandeirolas restantes: ${flagsLeft}`;
}

createBoard();
resetButton.addEventListener("click", resetGame);
difficultyLevel.addEventListener("change", resetGame);
