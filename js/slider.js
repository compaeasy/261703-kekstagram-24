import {uploadPhotoPreviewElement} from './form.js';

const slider = document.querySelector('.effect-level__slider');
const effectsButtonElement = document.querySelectorAll('.effects__radio');
const effectsListElement = document.querySelector('.effects__list');
const effectLevelElement = document.querySelector('.effect-level__value');

const photoFilterOptions = {
  'none': { style: 'none', min: 0, max: 1, step: 1 },
  'chrome': { style: 'grayscale', min: 0, max: 1, step: 0.1 },
  'sepia': { style: 'sepia', min: 0, max: 1, step: 0.1 },
  'marvin': { style: 'invert', min: 0, max: 100, step: 1 },
  'phobos': { style: 'blur', min: 0, max: 3, step: 0.1 },
  'heat': { style: 'brightness', min: 1, max: 3, step: 0.1 },
};

let imageFilter = 'none';

noUiSlider.create(slider, {
  range: {
    min: 0,
    max: 1,
  },
  start: 1,
  step: 0.1,
  connect: 'lower',
});

const setFilter = (evt) => {
  slider.style.display = evt.target.id === 'effect-none' ? 'none' : 'block';
  imageFilter = evt.target.value;
  uploadPhotoPreviewElement.className = `effects__preview--${imageFilter}`;
  slider.noUiSlider.updateOptions({
    range: {
      min:photoFilterOptions[imageFilter].min,
      max: photoFilterOptions[imageFilter].max,
    },
    step: photoFilterOptions[imageFilter].step,
    start: photoFilterOptions[imageFilter].max,
  });
};

slider.noUiSlider.on('update', (___, handle, values) => {
  const photoFilter = photoFilterOptions[imageFilter].style;
  effectLevelElement.value = values[handle];

  switch (imageFilter) {
    case 'chrome':
    case 'sepia':
    case 'heat':
      uploadPhotoPreviewElement.style.filter = `${photoFilter}(${values[handle]})`;
      break;
    case 'marvin':
      uploadPhotoPreviewElement.style.filter = `${photoFilter}(${values[handle]}%)`;
      break;
    case 'phobos':
      uploadPhotoPreviewElement.style.filter = `${photoFilter}(${values[handle]}px)`;
      break;
    default:
      uploadPhotoPreviewElement.style.filter = '';
      effectLevelElement.value = '';
  }
});

effectsListElement.addEventListener('change', (evt) => {
  setFilter(evt);
});

const setDefaultFilter = () => {
  effectsButtonElement.forEach((button) => {
    if (button.id === 'effect-none') {
      button.setAttribute('checked', 'checked');
    }

    slider.style.display = 'none';
    uploadPhotoPreviewElement.className = '';
    uploadPhotoPreviewElement.style = '';
  });
};

export {setDefaultFilter};
