const swiper = new Swiper(".img-slider", {
  spaceBetween: 11,
  slidesPerView: 2,
  centeredSlides: true,
  initialSlides: 1,
  loop: true,
});

function changeSwiper2(x) {
  if (x.matches) {
    swiper.params.slidesPerView = 1;
    swiper.update();
    console.log(swiper.slidesPerGroup);
  } else {
    (swiper.params.slidesPerView = 2), swiper.update();
  }
}

var x = window.matchMedia("(max-width: 900px)");
changeSwiper2(x); // Вызов функции прослушивателя во время выполнения
x.addListener(changeSwiper2);
