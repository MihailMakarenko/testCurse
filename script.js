const swiper = new Swiper(".img-slider", {
  // slidesPerView: 2,
  spaceBetween: 11,
  slidesPerView: 2, // this
  centeredSlides: true,
  initialSlides: 1,
  loop: true,
});

const swiper2 = new Swiper(".swiper-second", {
  slidesPerView: 4.67,
  spaceBetween: 10,
  initialSlide: 0,
  loop: true,
});

// const mq = window.matchMedia("(max-width: 768px)");

// if (mq.matches) {
//   swiper2.params.slidesPerView = 3;
//   swiper2.update();
// }

function myFunction(x) {
  if (x.matches) {
    swiper2.params.slidesPerView = 3;
    swiper2.update();
  } else {
    (swiper2.params.slidesPerView = 4.67), swiper2.update();
  }
}

var x = window.matchMedia("(max-width: 768px)");
myFunction(x); // Вызов функции прослушивателя во время выполнения
x.addListener(myFunction);
