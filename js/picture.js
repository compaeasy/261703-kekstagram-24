const renderPictures = (pictures) => {
  const picturesContainer = document.querySelector('.pictures');
  const template = document.querySelector('#picture').content;
  const picturesFragment = document.createDocumentFragment();

  pictures.forEach((picture) => {
    const picturesElement = template.cloneNode(true);
    const pictureImgElement = picturesElement.querySelector('.picture__img');
    const pictureCommentsElement = picturesElement.querySelector('.picture__comments');
    const pictureLikesElement = picturesElement.querySelector('.picture__likes');
    pictureImgElement.src = picture.url;
    pictureImgElement.alt = picture.description;
    pictureImgElement.dataset.id = picture.id;
    pictureCommentsElement.textContent = picture.comments.length;
    pictureLikesElement.textContent = picture.likes;
    picturesFragment.appendChild(picturesElement);
  });
  picturesContainer.appendChild(picturesFragment);

};

export { renderPictures };
