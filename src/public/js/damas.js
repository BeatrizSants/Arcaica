document.addEventListener("DOMContentLoaded", () => {
  const singlePlayerTitle = document.getElementById("single-player-title");
  const multiPlayerTitle = document.getElementById("multi-player-title");
  const singlePlayerSection = document.getElementById("single-player");
  const multiPlayerSection = document.getElementById("multi-player");
  const singlePlayerPlayButton = document.getElementById("single-player-play");
  const difficultySelect = document.getElementById("difficulty-select");

  const multiPlayerPlayButton = document.getElementById("multi-player-play");
  const modeSelect = document.getElementById("mode-select");
  const modeLabel = document.getElementById("mode-label");

  singlePlayerTitle.addEventListener("click", () => {
    singlePlayerSection.classList.add("active");
    multiPlayerSection.classList.remove("active");
    singlePlayerTitle.classList.add("active");
    multiPlayerTitle.classList.remove("active");
  });

  multiPlayerTitle.addEventListener("click", () => {
    multiPlayerSection.classList.add("active");
    singlePlayerSection.classList.remove("active");
    multiPlayerTitle.classList.add("active");
    singlePlayerTitle.classList.remove("active");
  });

  singlePlayerPlayButton.addEventListener("click", () => {
    const selectedDifficulty = difficultySelect.value;
    if (selectedDifficulty === "easy") {
      window.location.href = "/jd-easy";
    } else if (selectedDifficulty === "medium") {
      window.location.href = "/jd-medium";
    } else if (selectedDifficulty === "hard") {
      window.location.href = "/jd-hard";
    }
  });

  modeSelect.addEventListener("input", () => {
    if (modeSelect.value === "0") {
      modeLabel.textContent = "Offline";
    } else {
      modeLabel.textContent = "Online";
    }
  });

  multiPlayerPlayButton.addEventListener("click", () => {
    const selectedMode = modeSelect.value;
    if (selectedMode === "0") {
      window.location.href = "/jd-offline";
    } else {
      window.location.href = "/jd-online";
    }
  });

  // Default to showing the single player section
  singlePlayerTitle.click();
});
const selectWrapper = document.querySelector(".custom-select-wrapper");
const selectTrigger = selectWrapper.querySelector(".custom-select-trigger");
const customOptions = selectWrapper.querySelectorAll(".custom-option");
const originalSelect = selectWrapper.querySelector(".custom-select");

selectTrigger.addEventListener("click", () => {
  selectWrapper.classList.toggle("open");
});

customOptions.forEach((option) => {
  option.addEventListener("click", () => {
    const value = option.getAttribute("data-value");
    const text = option.textContent;
    originalSelect.value = value;
    selectTrigger.textContent = text;
    selectWrapper.classList.remove("open");
  });
});

document.addEventListener("click", (e) => {
  if (!selectWrapper.contains(e.target)) {
    selectWrapper.classList.remove("open");
  }
});
