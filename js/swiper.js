//main_page
//visual_main
var visual_swiper = new Swiper(".visual_main", {
  pagination: {
    el: ".swiper-pagination",
    type: "progressbar",
  },
  loop: true,
  autoplay: {
    delay: 2000,
  },
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
});

// new
var new_swiper = new Swiper(".new", {
  scrollbar: {
    el: ".swiper-scrollbar",
    hide: false,
  },
  loop: true,

  autoplay: {
    delay: 2000,
  },
  slidesPerView: 3,
  // spaceBetween: 10,
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
});

// best

let swiper = new Swiper( '.best.swiper-container.two', {
  pagination: '.swiper-pagination',
  paginationClickable: true,
  effect: 'coverflow',
  loop: true,
  centeredSlides: true,
  slidesPerView: 'auto',
  pauseOnMouseEnter:'true',
  coverflow: {
    rotate: 0,
    stretch: 100,
    depth: 150,
    modifier: 1.5,
    slideShadows : false,
  },
  autoplay: {
    delay: 2000,
  },
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
} );

//detail_page

// review_image

var review_image_swiper = new Swiper(".review_image", {
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
  slidesPerView: 5,
});
