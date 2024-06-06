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
  window.location.href = "../home/home.html";
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
        background.style.backgroundImage = "url(img/Gselect_all_page.png)";
        imageOverlay.style.opacity = 0;
      });
    });
  });
});
