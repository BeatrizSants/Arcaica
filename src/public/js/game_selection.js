//pop-up include
w3.includeHTML();

//swiper carousel
var swiper = new Swiper(".mySwiper", {
  slidesPerView: 3,
  spaceBetween: 23,
  slidesPerGroup: 1,
  loop: true,
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
});

function homereturn() {
  window.location.href = "../";
}

//troca background
document.addEventListener("DOMContentLoaded", function () {
  const background = document.getElementById("background");
  const imageOverlay = document.getElementById("image-overlay");
  const buttonClasses = ["button", "swiper-button-next", "swiper-button-prev"];

  buttonClasses.forEach(function (buttonClass) {
    const buttons = background.querySelectorAll(`.${buttonClass}`);
    buttons.forEach(function (button) {
      button.addEventListener("mouseover", function () {
        const imgUrl = button.getAttribute("data-img");
        imageOverlay.style.backgroundImage = "url(" + imgUrl + ")";
        imageOverlay.style.opacity = 1;
      });

      button.addEventListener("mouseout", function () {
        background.style.backgroundImage = "url(../img/Gselect_all_page.png)";
        imageOverlay.style.opacity = 0;
      });
    });
  });
});

document.addEventListener("DOMContentLoaded", function () {
  // Seleciona todos os elementos de cartão desejados
  const cards = document.querySelectorAll(".card-container");

  // Seleciona o elemento com a classe 'name'
  const nameDiv = document.querySelector(".name");

  // Adiciona o ouvinte de evento para o evento mouseover
  cards.forEach(function (card) {
    card.addEventListener("mouseover", function () {
      const imgSrc = card.getAttribute("data-img");
      nameDiv.style.backgroundImage = `url(${imgSrc})`;
      nameDiv.style.opacity = "1"; // Torna a div name visível
    });
    card.addEventListener("mouseout", function () {
      nameDiv.style.opacity = "0"; // Torna a div name invisível
    });
  });

  // Seleciona todos os elementos com a classe 'front'
  const frontCards = document.querySelectorAll(".front");

  // Itera sobre cada elemento com a classe 'front' para definir o estilo de fundo
  frontCards.forEach(function (frontCard) {
    const imgSrc = frontCard.getAttribute("data-img");
    frontCard.style.backgroundImage = `url(${imgSrc})`;
  });
});
function showpopup(id) {
  var element = document.getElementById(id);

  element.style.display = "flex"; /*popup aparece */

  element.classList.add("show-popup");
}
function hidepopup(id) {
  var element = document.getElementById(id);
  element.classList.remove("show-popup");
}
