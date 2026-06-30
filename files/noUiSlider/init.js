var ageSlider = document.getElementById('age-slider');
var heightSlider = document.getElementById('height-slider');
var weightSlider = document.getElementById('weight-slider');

noUiSlider.create(ageSlider, {
   start: [25, 40],
   connect: true,
   step: 1,
   range: {
      'min': 18,
      'max': 48
   },
   format: {
      to: function (value) {
         return Math.round(value);
      },
      from: function (value) {
         return Number(value);
      }
   },
   tooltips: true
});

noUiSlider.create(heightSlider, {
   start: [145, 185],
   connect: true,
   step: 1,
   range: {
      'min': 130,
      'max': 200
   },
   format: {
      to: function (value) {
         return Math.round(value);
      },
      from: function (value) {
         return Number(value);
      }
   },
   tooltips: true
});

noUiSlider.create(weightSlider, {
   start: [50, 90],
   connect: true,
   step: 1,
   range: {
      'min': 34,
      'max': 110
   },
   format: {
      to: function (value) {
         return Math.round(value);
      },
      from: function (value) {
         return Number(value);
      }
   },
   tooltips: true
});