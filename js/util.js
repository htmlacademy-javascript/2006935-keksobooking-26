const ALERT_SHOW_TIME = 5000;


// Функция, возвращающая случайное целое число из переданного диапазона включительно (принёс Кекс).

function getRandomPositiveInteger (valueFirst, valueSecond) {

  const lower = Math.ceil(Math.min(Math.abs(valueFirst), Math.abs(valueSecond)));
  const upper = Math.floor(Math.max(Math.abs(valueFirst), Math.abs(valueSecond)));
  const result = Math.random() * (upper - lower + 1) + lower;

  return Math.floor(result);
}


// Функция, возвращающая случайное число с плавающей точкой из переданного диапазона включительно.

function getRandomPositiveFloat (valueFirst, valueSecond, decimalPlaces) {

  const lower = Math.min(Math.abs(valueFirst), Math.abs(valueSecond));
  const upper = Math.max(Math.abs(valueFirst), Math.abs(valueSecond));
  const result = Math.random() * (upper - lower) + lower;

  return Number(result.toFixed(Math.abs(decimalPlaces)));
}

function showAlert (message) {
  const alertTemplate = document.querySelector('#alert')
    .content
    .querySelector('.alert-container');

  const alertContainer = alertTemplate.cloneNode(true);
  alertContainer.textContent = `${message}`;
  document.body.appendChild(alertContainer);

  const alertContainerElement = document.querySelector('.alert-container');
  if (alertContainerElement){
    setTimeout(() => alertContainerElement.remove(), ALERT_SHOW_TIME);
  }
}


function debounce (callback, timeoutDelay = 500) {
  let timeoutId;
  return (...rest) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
  };
}


export {getRandomPositiveInteger, getRandomPositiveFloat, showAlert, debounce};
