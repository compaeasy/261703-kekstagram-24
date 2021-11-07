import { isEscKey } from './helper.js';

//Находим большое изображение
const bigPicture = document.querySelector('.big-picture');
const closeButton = bigPicture.querySelector('.big-picture__cancel');
let closeHandler = undefined;
const closeModal = () => {
  bigPicture.classList.add('hidden');
  document.body.classList.remove('modal-open');
  document.removeEventListener('keydown', closeHandler);
};

closeHandler = (evt) => {
  if(isEscKey(evt)) {
    evt.preventDefault();
    closeModal();
  }
};

//Функция заполнения комментариев
const makeComments = (comments) => {
  const commentsContainer = bigPicture.querySelector('.social__comments');
  commentsContainer.innerHTML = '';

  for (const comment of comments) {
    const liElement = document.createElement('li');
    liElement.classList.add('social__comment');
    const img = document.createElement('img');
    img.classList.add('social__picture');
    img.width=35;
    img.height=35;
    img.src = comment.avatar;
    img.alt = comment.name;
    liElement.appendChild(img);
    const pElement = document.createElement('p');
    pElement.classList.add('social__text');
    pElement.textContent = comment.message;
    liElement.appendChild(pElement);
    commentsContainer.appendChild(liElement);
  }
};


const picturesContainer = document.querySelector('.pictures');
const renderBigPicturePreview = (picture) => {
  //Отрисовываем большое фото

  const bigPictureImg = bigPicture.querySelector('.big-picture__img').querySelector('img');
  //Подставляем адрес
  bigPictureImg.src =  picture.url;

  bigPicture.querySelector('.likes-count').textContent = picture.likes;
  bigPicture.querySelector('.comments-count').textContent = picture.comments.length;
  makeComments(picture.comments);
  bigPicture.querySelector('.social__caption').textContent = picture.description;
  bigPicture.classList.remove('hidden');
  document.body.classList.add('modal-open');
  bigPicture.querySelector('.social__comment-count').classList.add('hidden');
  bigPicture.querySelector('.comments-loader').classList.add('hidden');
  document.addEventListener('keydown', closeHandler);
};

const addOpenHandler = (pictures) => {
  picturesContainer.addEventListener('click', (evt) => {
    if (evt.target.classList.contains('picture__img')){
      const id = parseInt(evt.target.dataset.id, 10);
      const picture = pictures.find((it)=> it.id === id);
      if (picture) {
        renderBigPicturePreview(picture);
      }
    }
  });
  closeButton.addEventListener('click', closeModal);

};


export { addOpenHandler };
