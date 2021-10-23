const renderPictures = (pictures) => {
  const picturesContainer = document.querySelector('.pictures');
  const template = document.querySelector('#picture').content;
  const picturesFragment = document.createDocumentFragment();

  pictures.forEach(({ url, likes, comments }) => {
    const picturesElement = template.cloneNode(true);
    picturesElement.querySelector('.picture__img').src = url;
    picturesElement.querySelector('.picture__comments').textContent = likes;
    picturesElement.querySelector('.picture__likes').textContent = comments.length;
    picturesFragment.appendChild(picturesElement);
  });
  picturesContainer.appendChild(picturesFragment);

};

export { renderPictures };
