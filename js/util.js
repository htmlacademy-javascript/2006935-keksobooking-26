const ALERT_SHOW_TIME = 5000;
const SLICE_VALUE = 10;


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

// Здесь лучше темплейтом? В чём разница такого подхода и шаблона в этой ситуации?
const showAlert = (message) => {
  const alertContainer = document.createElement('div');
  alertContainer.classList.add('alert-container');
  alertContainer.textContent = message;

  document.body.append(alertContainer);

  if (alertContainer){
    setTimeout(() => {
      alertContainer.remove();
    }, ALERT_SHOW_TIME);
  }
};


function debounce (callback, timeoutDelay = 500) {
  let timeoutId;
  return (...rest) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
  };
}


function getSlicedData (data) {
  return data.slice(0, SLICE_VALUE);
}


export {getRandomPositiveInteger, getRandomPositiveFloat, showAlert, debounce, getSlicedData};
