//  Функция получает массив объектов с сервера
const getData = (onSuccess, onFail) => {
  fetch('https://24.javascript.pages.academy/kekstagram/data')
    .then((response) => response.json())
    .then((posts) => {
      onSuccess(posts);
    })
    .catch(() => {
      onFail('Не загрузить данные с сервера.');
    });

};

// Функция отправляет данные из формы на сервер
const sendData = (body, onSuccess, onFail) => fetch(
  'https://24.javascript.pages.academy/kekstagram',
  {
    method: 'POST',
    body,
  },
)
  .then((response) => {
    if (response.ok) {
      onSuccess();
    } else {
      onFail();
    }
  })
  .catch(() => {
    onFail();
  });

export {getData, sendData};
