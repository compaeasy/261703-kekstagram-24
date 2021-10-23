import { getRandomInt, getRandomArrayElement } from './util.js';

const SIMILAR_DESCRIPTION_COUNT = 25;

// Прописываем имена
const NAMES = ['Дмитрий','Констанция','Виктор','Ванесса','Георгий','Ариана','Николай','Джордж'];

// Прописываем идентификаторы описания
const NUMBERS_COUNT= [ '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25' ];

// Прописываем поле аватары
const AVATARS = [ 'img/avatar-2.svg', 'img/avatar-3.svg', 'img/avatar-4.svg', 'img/avatar-5.svg', 'img/avatar-6.svg' ];

// Названия фотографий
const ADRESS_PHOTOS = [ 'photos/1.jpg', 'photos/2.jpg', 'photos/3.jpg', 'photos/4.jpg', 'photos/5.jpg', 'photos/6.jpg', 'photos/7.jpg', 'photos/8.jpg', 'photos/9.jpg',
  'photos/10.jpg', 'photos/11.jpg', 'photos/12.jpg', 'photos/13.jpg', 'photos/14.jpg', 'photos/15.jpg', 'photos/16.jpg', 'photos/17.jpg', 'photos/18.jpg', 'photos/19.jpg',
  'photos/20.jpg','photos/21.jpg', 'photos/22.jpg', 'photos/23.jpg', 'photos/24.jpg', 'photos/25.jpg' ];

// Описание фото
const DESCRIPTIONS_PHOTO = ['1. Пляж', '2. Дорога на пляж', '3. Океан', '4. Девушка Фотограф', '5. Плов с супом',
  '6. Ламба', '7. Клубника', '8. Морс', '9. Девушка в бикини', '10. Обувь', '11. Забор', '12. Ауди', '13. Овощной салат', '14. Киса', '15. Отдых', '16. Небо', '17. Ансамбль'
  , '18. Ретро машина', '19. Ночной поход', '20. Отель', '21. Куриное блюдо', '22. Закат на море', '23. Краб', '24. Концерт', '25. Бегемот'];

// Описание ответов
const MESSAGES = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!',
];

const getComments = () => ({
  id: getRandomArrayElement(NUMBERS_COUNT),
  avatar: getRandomArrayElement(AVATARS),
  message: getRandomArrayElement(MESSAGES),
  name: getRandomArrayElement(NAMES),
});

const createPicture = () => ({

  id: getRandomArrayElement(NUMBERS_COUNT),
  url: getRandomArrayElement(ADRESS_PHOTOS),
  description: getRandomArrayElement(DESCRIPTIONS_PHOTO),
  likes: getRandomInt(15, 200),
  comments: getComments(),
});

// Описание
const createPictures= () => Array.from({length: SIMILAR_DESCRIPTION_COUNT}, createPicture);

export { createPictures };


