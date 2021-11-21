import { checkMaxStringLength } from './util.js';
import { isEscKey } from './helper.js';
import { initSlider, handleRemoveSlider } from './slider.js';
import { sendData } from './api.js';


const MAX_LENGTH = 140;
const MAX_HASHTAGS = 5;
const MAX_LENGTH_HASHTAGS = 20;
const FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];
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
const uploadPhotoPreviewImgElement = uploadPhotoPreviewElement.querySelector('img');

const checkDuplicates = (array) => (new Set(array)).size !== array.length;
const validateComment = () => {
  if (checkMaxStringLength(descriptionElement.value, MAX_LENGTH)) {
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
};


let closeHandler = undefined;
let openPopupHandler = undefined;

const closeUploadPopup = () => {
  imgUploadOverlayElement.classList.add('hidden');
  document.body.classList.remove('modal-open');
  document.removeEventListener('keydown', closeHandler);
  imgUploadInputElement.removeEventListener('change', openPopupHandler);
  imgUploadInputElement.addEventListener('change', openPopupHandler);
  form.reset();
  handleRemoveSlider();
  uploadPhotoPreviewElement.style.transform = 'scale(1)';
  scaleValueElement.value = 100;

};

closeHandler = (evt) => {
  if (isEscKey(evt)&&evt.target.tagName!=='TEXTAREA') {

    evt.preventDefault();
    closeUploadPopup();

  }
};

const openPopup = () => {
  imgUploadOverlayElement.classList.remove('hidden');
  document.body.classList.add('modal-open');
  document.addEventListener('keydown', closeHandler);
  initSlider();
  imgUploadCancelButtonElement.addEventListener('click', () => {
    closeUploadPopup();
  });

  const file = imgUploadInputElement.files[0];
  const fileName = file.name.toLowerCase();
  const matches = FILE_TYPES.some((item) => fileName.endsWith(item));

  if (matches) {
    uploadPhotoPreviewImgElement.src = URL.createObjectURL(file);
  }

};
openPopupHandler = () => {
  openPopup();
};

// Функция убирает сообщение об успешной загрузке изображения
const closeSuccessPopup = () => {
  const successPopup = document.querySelector('.success');
  successPopup.remove();
  document.removeEventListener('keydown', onSuccessPopupEscKeydown);
  document.removeEventListener('click', onOuterSuccessPopupClick);
};

function onSuccessPopupButtonClick () {
  closeSuccessPopup();
}

function onSuccessPopupEscKeydown (evt) {
  if (isEscKey(evt)) {
    closeSuccessPopup();
  }
}

function onOuterSuccessPopupClick (evt) {
  if (!evt.target.closest('.success__inner')) {
    closeSuccessPopup();
  }
}

// Функция показывает сообщение об успешной загрузке изображения
const showSuccessPopup = () => {
  const successTemplate = document.querySelector('#success').content;
  const successPattern = successTemplate.querySelector('.success');
  const successPopup = successPattern.cloneNode(true);

  successPopup.querySelector('.success__button').addEventListener('click', onSuccessPopupButtonClick);

  document.addEventListener('click', onOuterSuccessPopupClick);

  document.addEventListener('keydown', onSuccessPopupEscKeydown);

  document.body.appendChild(successPopup);
};

// Функция убирает сообщение об ошибке при загрузке изображения
const closeFailPopup = () => {
  document.querySelector('.error').remove();
  document.removeEventListener('keydown', onFailPopupEscKeydown);
  document.removeEventListener('click', onOuterFailPopupClick);
};

function onFailPopupButtonClick () {
  closeFailPopup();
}

function onFailPopupEscKeydown (evt) {
  if (isEscKey(evt)) {
    closeFailPopup();
  }
}

function onOuterFailPopupClick (evt) {
  if (!evt.target.closest('.error__inner')) {
    closeFailPopup();
  }
}

// Функция показывает сообщение об ошибке при загрузке изображения
const showFailPopup = () => {
  const failTemplate = document.querySelector('#error').content;
  const failPattern = failTemplate.querySelector('.error');
  const failPopup = failPattern.cloneNode(true);

  failPopup.querySelector('.error__button').addEventListener('click', onFailPopupButtonClick);

  document.addEventListener('click', onOuterFailPopupClick);

  document.addEventListener('keydown', onFailPopupEscKeydown);

  document.body.appendChild(failPopup);
};
// Функция отправки формы
const setUserFormSubmit = () => {
  form.addEventListener('submit', (evt) => {
    evt.preventDefault();

    sendData(
      new FormData(evt.target),
      showSuccessPopup,
      showFailPopup,
    );
    closeUploadPopup();
  });
};

const initForm = () => {
  imgUploadInputElement.addEventListener('change', openPopupHandler);
  imgUploadCancelButtonElement.addEventListener('click', () => {
    closeUploadPopup();
  });
  initValidation();
  initEffects();
  setUserFormSubmit();
};

export { initForm, uploadPhotoPreviewElement };
