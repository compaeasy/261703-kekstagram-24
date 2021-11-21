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

// Максимальная длина строки
const checkMaxStringLength = (value, maxLength) => value.length <= maxLength;

// Функция поиска случайного элемента в массиве
const getRandomArrayElement = (elements) => elements[getRandomInt(0, elements.length - 1)];

const shuffleArray = (posts) => posts.slice().sort(() => Math.random() - 0.5);

// Функция возвращает 10 рандомных элементов массива
const getRandomPosts = (posts) => shuffleArray(posts).slice(0, 10);

export {getRandomInt, checkMaxStringLength, getRandomArrayElement, getRandomPosts };

