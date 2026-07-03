const lazyImages = document.querySelectorAll('.swiper-slide img[loading="lazy"]'); // Get all images with the loading="lazy" attribute
function addLoadedClass(image) { // Function to add class to image parent after it is loaded
   const parentElement = image.parentElement;
   if (image.complete) { // Check if the image is loaded
      parentElement.classList.add('loaded');
   } else {
      image.addEventListener('load', function() { // Add a load event to add the class after the image has loaded
         parentElement.classList.add('loaded');
      });
   }
}
lazyImages.forEach(addLoadedClass); // Loop through all the images and call the addLoadedClass function for each one

/* === */
const smallSliderElement = document.querySelector('#small-slider');
const bigSliderElement = document.querySelector('#big-slider');

let smallSliderInstance;
let bigSliderInstance;

if (smallSliderElement) {
   smallSliderInstance = new Swiper(smallSliderElement, {
      loop: true,
      spaceBetween: 19,
      slidesPerView: 4,
      freeMode: true,
      watchSlidesProgress: true,
      preloadImages: false,
      lazy: {
         loadOnTransitionStart: false,
         loadPrewNext: false,
      },
      watchSlidesVisibility: true,
      watchOverflow: true,
   });
}

if (bigSliderElement) {
   bigSliderInstance = new Swiper(bigSliderElement, {
      loop: true,
      effect: 'fade',
      spaceBetween: 10,
      watchSlidesProgress: true,
      preloadImages: false,
      lazy: {
         loadOnTransitionStart: false,
         loadPrewNext: false,
      },
      watchSlidesVisibility: true,
      watchOverflow: true,
      navigation: {
         nextEl: '.swiper-button-next',
         prevEl: '.swiper-button-prev',
      },
      pagination: {
         el: '#swiper-pagination',
         clickable: true,
      },
      thumbs: {
         swiper: smallSliderInstance,
      },
   });
}