import { renderPictures } from './picture.js';
import { debounce } from './utils/debounce.js';
import { getRandomPosts} from './util.js';
const minPicturesFilter = document.querySelector('.img-filters');

// Функция показывает блок с фильтром
const showFilters = () => {
  minPicturesFilter.classList.remove('img-filters--inactive');
};

// Функция очищает страницу от миниатюр фотографий
const removeMinPictures = () => {
  document.querySelectorAll('.picture').forEach((element) => {
    element.remove();
  });
};

// Функция сортировки
const comparePosts = (postA, postB) => postB.comments.length - postA.comments.length;

// Функция сортировки по популярности
const sortByPopular = (pictures) => pictures.slice().sort(comparePosts);

// Функция выполняет сортировку миниатюр выбранным способом
const sortPictures = (filterName, pictures) => {
  switch (filterName) {
    case 'filter-default':
      removeMinPictures();
      renderPictures(pictures);
      break;
    case 'filter-random':
      removeMinPictures();
      renderPictures(getRandomPosts(pictures));
      break;
    case 'filter-discussed':
      removeMinPictures();
      renderPictures(sortByPopular(pictures));
      break;
  }
};

// Функция убирает дребезг
const onSortButtonClick = debounce(sortPictures);

// Функция работы фильтра
const sortMinPictures = (pictures) => {
  minPicturesFilter.addEventListener('click', (evt) => {
    if (evt.target.classList.contains('img-filters__button') && !evt.target.classList.contains('img-filters__button--active')) {
      document.querySelector('.img-filters__button--active').classList.remove('img-filters__button--active');
      evt.target.classList.add('img-filters__button--active');
      const filterName = evt.target.id;
      onSortButtonClick(filterName, pictures);
    }
  });
};

export { showFilters, sortMinPictures };
