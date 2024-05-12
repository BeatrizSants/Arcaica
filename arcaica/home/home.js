//pop-up
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
}
function hidepopup(id) {
  var element = document.getElementById(id);

  element.classList.remove("show-popup");
}

//onclik games
function opengames() {
  window.location.href = "../game_selection/game_selection.html";
}
