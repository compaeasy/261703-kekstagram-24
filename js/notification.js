const errorTemplate = document.querySelector('#error').content;
const successTemplate = document.querySelector('#success').content;
const messageTemplate = document.querySelector('#messages').content;

const showError = () => {
  const errorElement = errorTemplate.cloneNode(true);
  const errorFragment = document.createDocumentFragment();
  errorElement.appendChild(errorElement);
  document.body.appendChild(errorFragment);
};

const showSuccess = () => {
  const successElement = successTemplate.cloneNode(true);
  const successFragment = document.createDocumentFragment();
  successElement.appendChild(successElement);
  document.body.appendChild(successFragment);
};

const showMessage = () => {
  const messageElement = messageTemplate.cloneNode(true);
  const messageFragment = document.createDocumentFragment();
  messageElement.appendChild(messageElement);
  document.body.appendChild(messageFragment);
};

export {showError, showSuccess, showMessage};
