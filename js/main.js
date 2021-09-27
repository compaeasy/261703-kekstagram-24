function randomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// eslint-disable-next-line no-console
console.log(randomNumber(0, 15));


// eslint-disable-next-line no-unused-vars
const maxStringValue = function (name) {
  if (name.length < 6) {
    // eslint-disable-next-line no-console
    console.log(' Покупает шоколадные конфеты');
    return true;
  } else {
    // eslint-disable-next-line no-console
    console.log(' Не покупает шоколадные конфеты');
    return false;
  }
};

maxStringValue('Анастасия');

