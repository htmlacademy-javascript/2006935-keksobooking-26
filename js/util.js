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


const showAlert = (message) => {
  const alertContainer = document.createElement('div');
  alertContainer.style.zIndex = '100';
  alertContainer.style.position = 'absolute';
  alertContainer.style.top = '0';
  alertContainer.style.right = '0';
  alertContainer.style.marginTop = '2px';
  alertContainer.style.padding = '10px 3px';
  alertContainer.style.fontSize = '30px';
  alertContainer.style.textAlign = 'center';
  alertContainer.style.color = '#ffffff';
  alertContainer.style.backgroundColor = 'tomato';
  alertContainer.style.borderRadius = '15px';

  alertContainer.textContent = message;

  document.body.append(alertContainer);

  setTimeout(() => {
    alertContainer.remove();
  }, ALERT_SHOW_TIME);
};


export {getRandomPositiveInteger, getRandomPositiveFloat, showAlert};
