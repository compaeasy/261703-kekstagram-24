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

getRandomInt(2, 5);


// eslint-disable-next-line no-unused-vars
const checkMaxStringLength = (value, maxLength) => value.length > maxLength;

checkMaxStringLength('Каждый охотник желает знать где сидит фазан', 140);
