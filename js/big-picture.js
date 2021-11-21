import { isEscKey } from './helper.js';

const COMMENTS_PER_STEP = 5;

//Находим большое изображение
const bigPicture = document.querySelector('.big-picture');
const commentsContainer = bigPicture.querySelector('.social__comments');
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

const createCommentElement = (comment) =>{
  const liElement = document.createElement('li');
  liElement.classList.add('social__comment');
  const img = document.createElement('img');
  img.classList.add('social__picture');
  img.width= 35;
  img.height= 35;
  img.src = comment.avatar;
  img.alt = comment.name;
  liElement.appendChild(img);
  const pElement = document.createElement('p');
  pElement.classList.add('social__text');
  pElement.textContent = comment.message;
  liElement.appendChild(pElement);
  return liElement;
};

const showComments = (comments) => {
  for (const comment of comments) {

    commentsContainer.appendChild(createCommentElement(comment));
  }
};

//Функция заполнения комментариев
const renderComments = (comments) => {
  const totalCommentCount = comments.length;
  commentsContainer.innerHTML = '';
  const showMoreButtonElement =  bigPicture.querySelector('.comments-loader');
  showMoreButtonElement.classList.remove('hidden');
  let commentCount = 0;
  const commentCountElement = bigPicture.querySelector('.social__comment-count') ;
  const showNextComments = () => {
    const commentsForShow = comments.splice(0, COMMENTS_PER_STEP);
    if(commentsForShow.length > 0){
      showComments(commentsForShow);
      commentCount += commentsForShow.length;


    }
    if(comments.length === 0){
      showMoreButtonElement.removeEventListener('click', showNextComments);
      showMoreButtonElement.classList.add('hidden');
    }
    commentCountElement.innerHTML = `${commentCount} из <span class="comments-count">${totalCommentCount}</span> комментариев`;
  };

  showMoreButtonElement.addEventListener('click', showNextComments);
  showNextComments();
};


const picturesContainer = document.querySelector('.pictures');
const renderBigPicturePreview = (picture) => {
  //Отрисовываем большое фото

  const bigPictureImg = bigPicture.querySelector('.big-picture__img').querySelector('img');
  //Подставляем адрес
  bigPictureImg.src =  picture.url;

  bigPicture.querySelector('.likes-count').textContent = picture.likes;
  bigPicture.querySelector('.comments-count').textContent = picture.comments.length;
  renderComments(picture.comments);
  bigPicture.querySelector('.social__caption').textContent = picture.description;
  bigPicture.classList.remove('hidden');
  document.body.classList.add('modal-open');
  bigPicture.querySelector('.comments-loader');
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
