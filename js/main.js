//메뉴호버하면 엘엔비 생기게! 이제는 애니메이션이 되게!!! 그러나 너무 한 술에 모든 것을 하려 하면 욕심이지. 나중에 하겠어.
//샵 메뉴에
document.getElementById('gnb_shop').addEventListener('mouseover', function(){
  document.getElementById('shop_lnb').classList.remove('hidden')
})
document.getElementById('gnb_shop').addEventListener('mouseout', function(){
  document.getElementById('shop_lnb').classList.add('hidden')
})

// 호버되어서 나타난 메뉴 자체에
// document.getElementById('shop_lnb').addEventListener('mouseover', function(){
//   document.getElementById('shop_lnb').classList.remove('hidden')
// })
// document.getElementById('shop_lnb').addEventListener('mouseout', function(){
//   document.getElementById('shop_lnb').classList.add('hidden')
// })
//issue_contents

// 바깥 탭
const issueTabList = document.querySelectorAll(
  ".issue_contents .issue_list li"
);

for (var i = 0; i < issueTabList.length; i++) {
  issueTabList[i]
    .querySelector(".issue_btn")
    .addEventListener("click", function (e) {
      e.preventDefault();
      for (var j = 0; j < issueTabList.length; j++) {
        issueTabList[j].classList.remove("is_on_issue");
      }
      this.parentNode.classList.add("is_on_issue");
    });
}
//안쪽 탭
//침실

//거실
//주방
//책상

// 롤링 배너 복제본 생성
let roller = document.querySelector(".rolling-list");
roller.id = "roller1";

let clone = roller.cloneNode(true);
clone.id = "roller2";
document.querySelector(".instagram_wrap").appendChild(clone);

document.querySelector("#roller1").style.left = "0px";
document.querySelector("#roller2").style.left =
  document.querySelector(".rolling-list ul").offsetWidth + "px";

roller.classList.add("original");
clone.classList.add("clone");

//////////////////////////////////
// Params
let mainSliderSelector = ".main-slider",
  navSliderSelector = ".nav-slider",
  interleaveOffset = 0.5;

// Main Slider
let mainSliderOptions = {
  loop: true,
  speed: 1000,
  autoplay: {
    delay: 3000,
  },
  loopAdditionalSlides: 10,
  grabCursor: true,
  watchSlidesProgress: true,
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
  on: {
    init: function () {
      this.autoplay.stop();
    },
    imagesReady: function () {
      this.el.classList.remove("loading");
      this.autoplay.start();
    },
    slideChangeTransitionEnd: function () {
      let swiper = this,
        captions = swiper.el.querySelectorAll(".caption");
      for (let i = 0; i < captions.length; ++i) {
        captions[i].classList.remove("show");
      }
      swiper.slides[swiper.activeIndex]
        .querySelector(".caption")
        .classList.add("show");
    },
    progress: function () {
      let swiper = this;
      for (let i = 0; i < swiper.slides.length; i++) {
        let slideProgress = swiper.slides[i].progress,
          innerOffset = swiper.width * interleaveOffset,
          innerTranslate = slideProgress * innerOffset;

        swiper.slides[i].querySelector(".slide-bgimg").style.transform =
          "translateX(" + innerTranslate + "px)";
      }
    },
    touchStart: function () {
      let swiper = this;
      for (let i = 0; i < swiper.slides.length; i++) {
        swiper.slides[i].style.transition = "";
      }
    },
    setTransition: function (speed) {
      let swiper = this;
      for (let i = 0; i < swiper.slides.length; i++) {
        swiper.slides[i].style.transition = speed + "ms";
        swiper.slides[i].querySelector(".slide-bgimg").style.transition =
          speed + "ms";
      }
    },
  },
};
let mainSlider = new Swiper(mainSliderSelector, mainSliderOptions);

// Navigation Slider
let navSliderOptions = {
  loop: true,
  loopAdditionalSlides: 10,
  speed: 1000,
  spaceBetween: 5,
  slidesPerView: 5,
  centeredSlides: true,
  touchRatio: 0.2,
  slideToClickedSlide: true,
  direction: "vertical",
  on: {
    imagesReady: function () {
      this.el.classList.remove("loading");
    },
    click: function () {
      mainSlider.autoplay.stop();
    },
  },
};

let navSlider = new Swiper(navSliderSelector, navSliderOptions);

// Matching sliders
mainSlider.controller.control = navSlider;
navSlider.controller.control = mainSlider;
