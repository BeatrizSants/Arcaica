function register() {
  document.getElementById("b1").style.display = "none";
  document.getElementById("b2").style.display = "flex";
}
function login() {
  document.getElementById("b1").style.display = "flex";
  document.getElementById("b2").style.display = "none";
}

function showpopup(){
      var element = document.getElementById("b1");
      element.classList.add("show-popup");
}

function hidepopup(){
      var element = document.getElementById("b1")
      element.classList.remove("show-popup")
}
function registropopup(){
    var element = document.getElementById("b2");
    element.classList.add("registropopup");
}
function fecharpopup(){
    var element = document.getElementById("b2");
    element.classList.remove("registropopup");
}