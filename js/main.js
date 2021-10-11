// Прописываем имена
const NAMES = ['Дмитрий','Констанция','Виктор','Ванесса','Георгий','Ариана','Николай','Джордж'];

// Прописываем идентификаторы описания
const NUMBERS_COUNT= [ '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25' ];

// Прописываем поле аватары
const AVATAR = [ 'img/avatar-2.svg', 'img/avatar-3.svg', 'img/avatar-4.svg', 'img/avatar-5.svg', 'img/avatar-6.svg' ];

// Названия фотографий
const ADRESS_PHOTOS = [ 'photos/1.jpg', 'photos/2.jpg', 'photos/3.jpg', 'photos/4.jpg', 'photos/5.jpg', 'photos/6.jpg', 'photos/7.jpg', 'photos/8.jpg', 'photos/9.jpg',
  'photos/10.jpg', 'photos/11.jpg', 'photos/12.jpg', 'photos/13.jpg', 'photos/14.jpg', 'photos/15.jpg', 'photos/16.jpg', 'photos/17.jpg', 'photos/18.jpg', 'photos/19.jpg',
  'photos/20.jpg','photos/21.jpg', 'photos/22.jpg', 'photos/23.jpg', 'photos/24.jpg', 'photos/25.jpg' ];

// Описание фото
const DESCRIPTION_PHOTO = ['1. Пляж', '2. Дорога на пляж', '3. Океан', '4. Девушка Фотограф', '5. Плов с супом',
  '6. Ламба', '7. Клубника', '8. Морс', '9. Девушка в бикини', '10. Обувь', '11. Забор', '12. Ауди', '13. Овощной салат', '14. Киса', '15. Отдых', '16. Небо', '17. Ансамбль'
  , '18. Ретро машина', '19. Ночной поход', '20. Отель', '21. Куриное блюдо', '22. Закат на море', '23. Краб', '24. Концерт', '25. Бегемот'];

const MESSAGES = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!',
];

const SIMILAR_DESCRIPTION_COUNT = 8;

// eslint-disable-next-line no-unused-vars
const getRandomInt = (min, max) => {
  if (min < 0) {
    throw new Error('Min не должен быть меньше 0');
  }
  if (max < 0) {
    throw new Error('Max не должен быть меньше 0');
  }
  if (max <= min) {
    throw new Error('Mim должен быть меньше max');
  }
  return Math.floor(Math.random() * (max - min + 1) + min);
};


// eslint-disable-next-line no-unused-vars
const checkMaxStringLength = (value, maxLength) => value.length > maxLength;


// Рандомное число
const getRandomInteger = (min, max) => {
  if (min <= 0 && max < min) {
    throw new SyntaxError('Неверный интервал, минимальное значение должно быть больше или равно 0 и меньше максимального значения');
  }
  else {
    const rand = min + Math.random() * (max + 1 - min);
    return Math.floor(rand);
  }
};


// Функция поиска случайного элемента в массиве
const getRandomArrayElement = (elements) => elements[_.random(0, elements.length - 1)];

// Индекс вызова переменных
const createGeneration = () => {
  const getComments = () => ({
    id: getRandomArrayElement(NUMBERS_COUNT),
    avatar: getRandomArrayElement(AVATAR),
    message: MESSAGES[_.random(0, MESSAGES.length - 1)],
    name: NAMES[_.random(0, NAMES.length - 1)],
  });


  // eslint-disable-next-line no-unused-vars
  return {

    id: getRandomArrayElement(NUMBERS_COUNT),
    url: getRandomArrayElement(ADRESS_PHOTOS),
    description: getRandomArrayElement(DESCRIPTION_PHOTO),
    likes: getRandomInteger(15, 200),
    comments: getComments(),
  };
};

// eslint-disable-next-line no-unused-vars
const createDescriptions = () => Array.from({length: SIMILAR_DESCRIPTION_COUNT}, createGeneration);

const descriptions = createDescriptions();
// eslint-disable-next-line no-console
console.log(descriptions);


getRandomInt(2, 5);


// eslint-disable-next-line no-unused-vars
const checkMaxStringLength = (value, maxLength) => value.length > maxLength;

checkMaxStringLength('Каждый охотник желает знать где сидит фазан', 140);

