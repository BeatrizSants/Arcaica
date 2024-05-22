//preloadImages

//pop-up include
w3.includeHTML();

//troca background
document.addEventListener("DOMContentLoaded", function () {
  const background = document.getElementById("background");
  const buttons = background.querySelectorAll(".button");
  buttons.forEach(function (button) {
    button.addEventListener("mouseover", function () {
      const imgUrl = button.getAttribute("data-img");
      background.style.backgroundImage = "url(" + imgUrl + ")";
    });

    button.addEventListener("mouseout", function () {
      background.style.backgroundImage = "url(img/All_Page.png)";
    });
  });
});

//onclick pop-up
function showpopup(id) {
  var element = document.getElementById(id);

  element.style.display = "flex"; /*popup aparece */

  element.classList.add("show-popup");
  if (id === "popupLog") {
    var b1 = document.getElementById("b1");
    var b2 = document.getElementById("b2");
    if (b1) {
      b1.style.display = "block";
      b1.style.pointerEvents = "auto"; // Make interactive
    }
    if (b2) {
      b2.style.pointerEvents = "auto"; // Make interactive
    }
  }
}
function hidepopup(id) {
  var element = document.getElementById(id);
  element.classList.remove("show-popup");

  if (id === "popupLog") {
    var b1 = document.getElementById("b1");
    var b2 = document.getElementById("b2");
    if (b1) {
      b1.style.display = "none";
      b1.style.pointerEvents = "none"; // Make non-interactive
    }
    if (b2) {
      b2.style.display = "none";
      b2.style.pointerEvents = "none"; // Make non-interactive
    }
  }
}

//onclik game page
function opengames() {
  window.location.href = "../game_selection/game_selection.html";
}

//troca login e registro
function register(id) {
  document.getElementById("b1").style.display = "none";
  showpopup(id);
}
function login(id) {
  document.getElementById("b2").style.display = "none";
  showpopup(id);
}

//turn on/off

function toggleEfect(button) {
  let turn = button.closest(".turn");
  turn.classList.toggle("off"); //off é adicionado a turn ou removido se já estiver presente
}
