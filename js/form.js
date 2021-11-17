import { checkMaxStringLength } from './util.js';

const MAX_LENGTH = 140;
const MAX_HASHTAGS = 5;
const MAX_LENGTH_HASHTAGS = 20;
const HASHTAGS_RE = /[~`!@_()$%^&*+=\-[\]\\';,./{}|\\":<>?]/g;

const form = document.querySelector('.img-upload__form');
const hashtagsElement = form.querySelector('.text__hashtags');
const descriptionElement = form.querySelector('.text__description');
const imgUploadInputElement = form.querySelector('.img-upload__input');
const imgUploadOverlayElement = form.querySelector('.img-upload__overlay');
const imgUploadCancelButtonElement = form.querySelector('.img-upload__cancel');

const buttonScaleSmallerElement = form.querySelector('.scale__control--smaller');
const buttonScaleBiggerElement = form.querySelector('.scale__control--bigger');
const scaleValueElement = form.querySelector('.scale__control--value');
const uploadPhotoPreviewElement = form.querySelector('.img-upload__preview');
const effectLevelSliderElement = form.querySelector('.effect-level__slider');
const effectLevelValueElement = form.querySelector('.effect-level__value');

const checkDuplicates = (array) => (new Set(array)).size !== array.length;
const validateComment = () => {
  if (checkMaxStringLength(MAX_LENGTH, descriptionElement.value)) {
    descriptionElement.setCustomValidity('');
    descriptionElement.classList.remove('text__description--error');
  } else {
    descriptionElement.setCustomValidity(`до ${MAX_LENGTH} символов`);
    descriptionElement.classList.add('text__description--error');
  }
  descriptionElement.reportValidity();
};

const validateHashtags = () => {
  hashtagsElement.value = hashtagsElement.value.replace(/\s+/g, ' ');
  const hashArray = hashtagsElement.value.toLowerCase().split(' ');
  let error = '';

  hashArray.forEach((hash) => {
    if (!hash.startsWith('#')) {
      error = 'хеш-тег должен начинаться с решётки #';
    }

    if (hash === '#') {
      error = 'хеш-тег не может состоять только из одной решётки';
    }

    if (HASHTAGS_RE.test(hash)) {
      error = 'хештег не может содержать пробелы, спецсимволы (@, $ и т. п.)';
    }

    if (hash.length > MAX_LENGTH_HASHTAGS) {
      error = `не больше ${MAX_LENGTH_HASHTAGS} символов`;
    }

    if (checkDuplicates(hashArray)) {
      error = 'хеш-теги не могут повторяться';
    }

    if (hashArray.length > MAX_HASHTAGS) {
      error = `не больше ${MAX_HASHTAGS} тегов`;
    }
  });

  if (!error) {
    hashtagsElement.setCustomValidity('');
    hashtagsElement.classList.remove('text__hashtags--error');
  } else if (hashArray[0] === '') {
    hashtagsElement.setCustomValidity('');
    hashtagsElement.classList.remove('text__hashtags--error');
    hashtagsElement.value = hashtagsElement.value.trim();
  } else {
    hashtagsElement.setCustomValidity(error);
    hashtagsElement.classList.add('text__hashtags--error');
  }
  hashtagsElement.reportValidity();

};

const initValidation = () => {
  hashtagsElement.addEventListener('input', () => {
    validateHashtags();
  });
  descriptionElement.addEventListener('input', () => {
    validateComment();
  });
};

const changeScale = (high) => {
  let scaleValue = parseInt(scaleValueElement.value, 10);
  if (high) {
    if (scaleValue < 100) {
      scaleValue += 25;
      scaleValueElement.value = `${scaleValue}%`;
    }
  } else {
    if (scaleValue > 25) {
      scaleValue -= 25;
      scaleValueElement.value = `${scaleValue}%`;
    }
  }
  uploadPhotoPreviewElement.style.transform = `scale(${scaleValue / 100})`;
};

const initEffects = () => {
  buttonScaleSmallerElement.addEventListener('click', () => changeScale(false));
  buttonScaleBiggerElement.addEventListener('click', () => changeScale(true));
  noUiSlider.create(effectLevelSliderElement, {
    range: {
      min: 0,
      max: 100,
    },
    start: 80,
    step: 1,
    connect: 'lower',
    format: {
      to: function (value) {
        if (Number.isInteger(value)) {
          return value.toFixed(0);
        }
        return value.toFixed(1);
      },
      from: function (value) {
        return parseFloat(value);
      },
    },
  });

  effectLevelSliderElement.noUiSlider.on('update', (values, handle) => {
    effectLevelValueElement.value = values[handle];
  });
};

document.addEventListener('keydown', (evt) => {
  if (evt.key === 'Escape') {
    evt.preventDefault();
  }
});

const openUploadPopup = () => {
  imgUploadOverlayElement.classList.remove('hidden');
  document.body.classList.add('modal-open');
};

const closeUploadPopup = () => {
  imgUploadOverlayElement.classList.add('hidden');
  document.body.classList.remove('modal-open');
};
const initForm = () => {
  imgUploadInputElement.addEventListener('change', () => {
    openUploadPopup();
  });
  imgUploadCancelButtonElement.addEventListener('click', () => {
    closeUploadPopup();
  });
  initValidation();
  initEffects();
};

//Module 10 task-1

// const SCALE_VALUE_STEP = 25;

// const rescaleUploadPhoto = (value, el) => {
//   el.style.cssText = `transform: scale(${value / 100})`;
// };

// buttonScaleSmallerElement.addEventListener('click', () => {
//   if (!(scaleValueElement.value <= 25)) {
//     scaleValueElement.value = scaleValueElement.value - SCALE_VALUE_STEP;
//   }

//   rescaleUploadPhoto(scaleValueElement.value, uploadPhotoPreview);
// });

// buttonScaleBiggerElement.addEventListener('click', () => {
//   if (!(scaleValueElement.value >= 100)) {
//     scaleValueElement.value = Number(scaleValueElement.value) + SCALE_VALUE_STEP;
//   }

//   rescaleUploadPhoto(Number(scaleValueElement.value), uploadPhotoPreview);
// });

// const createSlider = () => {
//   noUiSlider.create(effectsSliderContainer, {
//     range: {
//       min: 0,
//       max: 100,
//     },
//     start: 100,
//     step: 1,
//   });

//   addHiddenClass(effectLevel);
// };

// const changeSliderOptions = (minValue, maxValue, stepValue, startValue) => {
//   effectsSliderContainer.noUiSlider.updateOptions({
//     range: {
//       min: minValue,
//       max: maxValue,
//     },
//     start: startValue,
//     step: stepValue,
//   });
// };

export { initForm, uploadPhotoPreviewElement };
