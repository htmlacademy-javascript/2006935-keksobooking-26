const submitButton = document.querySelector('.ad-form__submit');

const successTemplate = document.querySelector('#success')
  .content
  .querySelector('.success');
const successElement = successTemplate.cloneNode(true);

const errorTemplate = document.querySelector('#error')
  .content
  .querySelector('.error');
const errorElement = errorTemplate.cloneNode(true);
const errorButtonElement = errorElement.querySelector('.error__button');


function setSuccessMessage () {
  document.body.append(successElement);
  successElement.addEventListener('click', () => {
    successElement.remove();
  },
  {once: true});

  document.addEventListener('keydown', (evt) => {
    if (evt.key === 'Escape') {
      evt.preventDefault();
      successElement.remove();
    }
  },
  {once: true});
}


function onErrorButtonClick (evt) {
  if (evt.target === errorButtonElement) {
    evt.preventDefault();
    errorElement.remove();
    document.removeEventListener('click', onErrorButtonClick);
  }
}


function setErrorMessage () {
  document.body.append(errorElement);

  errorElement.addEventListener('click', () => {
    errorElement.remove();
  },
  {once: true});

  document.addEventListener('keydown', (evt) => {
    if (evt.key === 'Escape') {
      evt.preventDefault();
      errorElement.remove();
    }
  },
  {once: true});

  document.addEventListener('click', onErrorButtonClick);
}


const blockSubmitButton = () => {
  submitButton.disabled = true;
  submitButton.textContent = 'Отправляю...';
};

const unblockSubmitButton = () => {
  submitButton.disabled = false;
  submitButton.textContent = 'Опубликовать';
};

export{setSuccessMessage, setErrorMessage, blockSubmitButton, unblockSubmitButton};
