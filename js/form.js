import { checkMaxStringLength } from './util.js';

const MAX_LENGTH = 140;
const MAX_HASHTAGS = 5;
const MAX_LENGTH_HASHTAGS = 20;
const HASHTAGS_RE = /[~`!@_()$%^&*+=\-[\]\\';,./{}|\\":<>?]/g;

const form = document.querySelector('.img-upload__form');
const hashtagsElement = form.querySelector('.text__hashtags');
const descriptionElement = form.querySelector('.text__description');
const imgUploadInputElement = document.querySelector('.img-upload__input');
const imgUploadOverlayElement = document.querySelector('.img-upload__overlay');
const imgUploadCancelButtonElement = document.querySelector('.img-upload__cancel');
// eslint-disable-next-line no-undef

const checkDuplicates = (array) => (new Set(array)).size !== array.length;
// eslint-disable-next-line no-unused-vars
const validateComment = () => {
  // eslint-disable-next-line no-undef
  if (checkMaxStringLength(MAX_LENGTH, descriptionElement.value)) {
    descriptionElement.setCustomValidity('');
    descriptionElement.classList.remove('text__description--error');
  } else {
    descriptionElement.setCustomValidity(`до ${MAX_LENGTH} символов`);
    descriptionElement.classList.add('text__description--error');
  }
  descriptionElement.reportValidity();
};

// eslint-disable-next-line no-unused-vars
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
  hashtagsElement.addEventListener('input', () =>{
    validateHashtags();
  });
  descriptionElement.addEventListener('input', () => {
    validateComment();
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
};

export { initForm };
