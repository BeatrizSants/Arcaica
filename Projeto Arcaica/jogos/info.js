w3.includeHTML();
function gamereturn() {
  window.location.href = "../game_selection/game_selection.html";
}

function showpopup(id) {
  var element = document.getElementById(id);

  element.style.display = "flex"; /*popup aparece */

  element.classList.add("show-popup");
}
function hidepopup(id) {
  var element = document.getElementById(id);
  element.classList.remove("show-popup");
}
