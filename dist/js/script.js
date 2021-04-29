"use strict";

$('.projects__slider').slick({
  infinite: true,
  slidesToShow: 4,
  slidesToScroll: 1,
  responsive: [{
    breakpoint: 873,
    settings: {
      slidesToShow: 3,
      slidesToScroll: 1
    }
  }, {
    breakpoint: 644,
    settings: {
      slidesToShow: 2,
      slidesToScroll: 1
    }
  }, {
    breakpoint: 501,
    settings: {
      slidesToShow: 1,
      slidesToScroll: 1
    }
  }, {
    breakpoint: 361,
    settings: {
      arrows: false,
      slidesToShow: 1,
      slidesToScroll: 1,
      dots: true
    }
  }]
});