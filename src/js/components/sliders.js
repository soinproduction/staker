import {responsiveSwiper} from "../functions/scripts/responsiveSwiper.js";
import Swiper from 'swiper/bundle';
import vars from '../_vars.js'
import {fadeOut} from "../functions/customFunctions.js";

const {clientsSliders, logoSliders, exampleSliders} = vars

function addSrcForGallery(parents) {
  const items = parents.querySelectorAll('.swiper-slide');
  items.forEach(item => {

    if(item.querySelector('img')) {
      const imgSrc = item.querySelector('img').getAttribute('data-src');
      item.setAttribute('data-src', imgSrc);
    }

  });
}


for (const clientsSlider of clientsSliders) {
  responsiveSwiper(Swiper, "(min-width:576px)", clientsSlider, {
    grid        : {
      rows: 4,
      fill: "column",
    },
    loop        : true,
    loopedSlides: 50,
    speed       : 5000,
    autoplay    : {
      delay: 0,
    },
    breakpoints : {
      320: {
        slidesPerView: 3,
      },
      480: {
        slidesPerView: 4,
      },
    }
  });
}


for (const logoSlider of logoSliders) {
  const pagination = logoSlider.parentNode.querySelector('.swiper-pagination');

  new Swiper(logoSlider, {
    slidesPerView: 6,
    spaceBetween : 15,
    pagination   : {
      el       : pagination,
      clickable: true,
    },
    speed        : 1500,
    autoplay     : {
      delay: 1000,
    },
    breakpoints  : {
      320 : {
        slidesPerView: 4,
      },
      481 : {
        slidesPerView: 5,
      },
      576 : {
        slidesPerView: 6,
      },
      768 : {
        slidesPerView: 4,
      },
      1025: {
        slidesPerView: 5,
      },
      1241: {
        slidesPerView: 6,
      },
    }
  });

  addSrcForGallery(logoSlider)
}


for (const exampleSlider of exampleSliders) {
  const pagination = exampleSlider.querySelector('.swiper-pagination');
  const nextBtn = exampleSlider.querySelector('.arrow-button-next');
  const prevBtn = exampleSlider.querySelector('.arrow-button-prev');

  new Swiper(exampleSlider.querySelector('.swiper-container'), {
    slidesPerView: 1,
    spaceBetween : 15,
    pagination   : {
      el       : pagination,
      clickable: true,
    },
    navigation   : {
      nextEl: nextBtn,
      prevEl: prevBtn,
    },
    speed        : 2500,
    autoplay     : {
      delay: 3000,
    },
  });

  addSrcForGallery(exampleSlider)
}


