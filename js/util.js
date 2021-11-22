// Максимальная длина строки
const checkMaxStringLength = (value, maxLength) => value.length <= maxLength;

const shuffleArray = (posts) => posts.slice().sort(() => Math.random() - 0.5);

// Функция возвращает 10 рандомных элементов массива
const getRandomPosts = (posts) => shuffleArray(posts).slice(0, 10);

export {checkMaxStringLength, getRandomPosts };

